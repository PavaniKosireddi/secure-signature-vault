import { useState, useCallback } from "react";
import { API_ENDPOINTS, isBackendConfigured, checkBackendHealth } from "@/config/api";

export type VerificationStatus = "idle" | "uploading" | "preprocessing" | "tamper-check" | "siamese-analysis" | "complete" | "error";
export type ResultType = "genuine" | "forged" | "tampered" | null;

export interface VerificationResult {
  type: ResultType;
  siameseScore: number;
  tamperScore: number;
  confidence: number;
  processingTime: number;
  details: {
    strokeConsistency: number;
    pressurePattern: number;
    spatialAlignment: number;
    pixelAnomalies: number;
  };
  isSimulated?: boolean;
}

export interface DemoSignature {
  id: string;
  name: string;
  type: "reference" | "genuine" | "forged" | "tampered";
  image: string;
  description: string;
}

// Convert image file/URL to base64
const imageToBase64 = async (imageSource: string | File): Promise<string> => {
  if (imageSource instanceof File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(imageSource);
    });
  }
  
  // If it's already a data URL or base64
  if (imageSource.startsWith('data:')) {
    return imageSource;
  }
  
  // If it's a URL (like SVG), fetch and convert
  try {
    const response = await fetch(imageSource);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    throw new Error("Failed to convert image to base64");
  }
};

export function useSignatureVerification() {
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [backendAvailable, setBackendAvailable] = useState<boolean | null>(null);

  // Check if backend is available
  const checkBackend = useCallback(async (): Promise<boolean> => {
    if (!isBackendConfigured()) {
      setBackendAvailable(false);
      return false;
    }
    
    const isHealthy = await checkBackendHealth();
    setBackendAvailable(isHealthy);
    return isHealthy;
  }, []);

  // Real API verification
  const verifyWithBackend = useCallback(async (
    referenceImage: string | File,
    testImage: string | File
  ): Promise<VerificationResult> => {
    const startTime = Date.now();
    
    setStatus("uploading");
    setProgress(10);
    
    // Convert images to base64
    const [refBase64, testBase64] = await Promise.all([
      imageToBase64(referenceImage),
      imageToBase64(testImage)
    ]);
    
    setStatus("preprocessing");
    setProgress(30);
    
    // Send to backend
    const response = await fetch(API_ENDPOINTS.VERIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reference: refBase64,
        test: testBase64
      })
    });
    
    setStatus("tamper-check");
    setProgress(50);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }
    
    setStatus("siamese-analysis");
    setProgress(75);
    
    const data = await response.json();
    
    setProgress(100);
    
    const processingTime = Date.now() - startTime;
    
    const verificationResult: VerificationResult = {
      type: data.result as ResultType,
      siameseScore: data.siameseScore,
      tamperScore: data.tamperScore,
      confidence: data.confidence,
      processingTime,
      details: data.details,
      isSimulated: false
    };
    
    setStatus("complete");
    setResult(verificationResult);
    
    return verificationResult;
  }, []);

  // Simulated verification (fallback when backend unavailable)
  const simulateProcessing = useCallback(async (
    referenceImage: string | File, 
    testImage: string | File,
    demoType?: "genuine" | "forged" | "tampered"
  ): Promise<VerificationResult> => {
    const startTime = Date.now();
    
    // Simulate preprocessing
    setStatus("uploading");
    setProgress(10);
    await new Promise(r => setTimeout(r, 500));
    
    setStatus("preprocessing");
    setProgress(30);
    await new Promise(r => setTimeout(r, 600));
    
    // Simulate tamper check
    setStatus("tamper-check");
    setProgress(50);
    await new Promise(r => setTimeout(r, 700));
    
    // Simulate Siamese analysis
    setStatus("siamese-analysis");
    setProgress(75);
    await new Promise(r => setTimeout(r, 800));
    
    setProgress(100);
    
    // Generate result based on demo type or random
    let resultType: ResultType;
    let siameseScore: number;
    let tamperScore: number;
    let details: VerificationResult["details"];

    if (demoType) {
      // Demo mode with predictable results
      switch (demoType) {
        case "genuine":
          resultType = "genuine";
          siameseScore = 0.94 + Math.random() * 0.05;
          tamperScore = 0.02 + Math.random() * 0.03;
          details = {
            strokeConsistency: 0.96 + Math.random() * 0.03,
            pressurePattern: 0.93 + Math.random() * 0.05,
            spatialAlignment: 0.95 + Math.random() * 0.04,
            pixelAnomalies: 0.01 + Math.random() * 0.02,
          };
          break;
        case "forged":
          resultType = "forged";
          siameseScore = 0.35 + Math.random() * 0.2;
          tamperScore = 0.05 + Math.random() * 0.08;
          details = {
            strokeConsistency: 0.45 + Math.random() * 0.15,
            pressurePattern: 0.38 + Math.random() * 0.12,
            spatialAlignment: 0.52 + Math.random() * 0.18,
            pixelAnomalies: 0.08 + Math.random() * 0.07,
          };
          break;
        case "tampered":
          resultType = "tampered";
          siameseScore = 0.65 + Math.random() * 0.15;
          tamperScore = 0.78 + Math.random() * 0.18;
          details = {
            strokeConsistency: 0.72 + Math.random() * 0.12,
            pressurePattern: 0.68 + Math.random() * 0.15,
            spatialAlignment: 0.75 + Math.random() * 0.1,
            pixelAnomalies: 0.82 + Math.random() * 0.15,
          };
          break;
      }
    } else {
      // Random result for custom uploads
      const random = Math.random();
      if (random > 0.6) {
        resultType = "genuine";
        siameseScore = 0.92 + Math.random() * 0.07;
        tamperScore = 0.02 + Math.random() * 0.05;
        details = {
          strokeConsistency: 0.9 + Math.random() * 0.08,
          pressurePattern: 0.88 + Math.random() * 0.1,
          spatialAlignment: 0.92 + Math.random() * 0.06,
          pixelAnomalies: 0.02 + Math.random() * 0.03,
        };
      } else if (random > 0.3) {
        resultType = "forged";
        siameseScore = 0.35 + Math.random() * 0.25;
        tamperScore = 0.05 + Math.random() * 0.1;
        details = {
          strokeConsistency: 0.4 + Math.random() * 0.2,
          pressurePattern: 0.35 + Math.random() * 0.15,
          spatialAlignment: 0.5 + Math.random() * 0.2,
          pixelAnomalies: 0.1 + Math.random() * 0.1,
        };
      } else {
        resultType = "tampered";
        siameseScore = 0.6 + Math.random() * 0.2;
        tamperScore = 0.75 + Math.random() * 0.2;
        details = {
          strokeConsistency: 0.7 + Math.random() * 0.15,
          pressurePattern: 0.65 + Math.random() * 0.15,
          spatialAlignment: 0.72 + Math.random() * 0.12,
          pixelAnomalies: 0.8 + Math.random() * 0.15,
        };
      }
    }

    const processingTime = Date.now() - startTime;
    
    const verificationResult: VerificationResult = {
      type: resultType,
      siameseScore: Math.min(siameseScore, 0.99),
      tamperScore: Math.min(tamperScore, 0.99),
      confidence: resultType === "genuine" ? siameseScore : (1 - siameseScore),
      processingTime,
      details: {
        strokeConsistency: Math.min(details.strokeConsistency, 0.99),
        pressurePattern: Math.min(details.pressurePattern, 0.99),
        spatialAlignment: Math.min(details.spatialAlignment, 0.99),
        pixelAnomalies: Math.min(details.pixelAnomalies, 0.99),
      },
      isSimulated: true
    };

    setStatus("complete");
    setResult(verificationResult);
    
    return verificationResult;
  }, []);

  // Main verify function - tries backend first, falls back to simulation
  const verify = useCallback(async (
    referenceImage: string | File,
    testImage: string | File,
    demoType?: "genuine" | "forged" | "tampered"
  ): Promise<VerificationResult> => {
    setError(null);
    
    try {
      // Check backend availability
      const isAvailable = await checkBackend();
      
      if (isAvailable && !demoType) {
        // Use real backend for custom uploads
        return await verifyWithBackend(referenceImage, testImage);
      } else {
        // Use simulation for demo mode or when backend unavailable
        return await simulateProcessing(referenceImage, testImage, demoType);
      }
    } catch (err) {
      setStatus("error");
      const errorMessage = err instanceof Error ? err.message : "Verification failed";
      setError(errorMessage);
      
      // Fallback to simulation on error
      console.warn("Backend error, falling back to simulation:", errorMessage);
      return await simulateProcessing(referenceImage, testImage, demoType);
    }
  }, [checkBackend, verifyWithBackend, simulateProcessing]);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setProgress(0);
    setError(null);
  }, []);

  return {
    status,
    result,
    progress,
    error,
    backendAvailable,
    verify,
    checkBackend,
    reset,
  };
}
