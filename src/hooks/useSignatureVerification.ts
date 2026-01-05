import { useState, useCallback } from "react";

export type VerificationStatus = "idle" | "uploading" | "preprocessing" | "tamper-check" | "siamese-analysis" | "complete";
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
}

export interface DemoSignature {
  id: string;
  name: string;
  type: "reference" | "genuine" | "forged" | "tampered";
  image: string;
  description: string;
}

export function useSignatureVerification() {
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [progress, setProgress] = useState(0);

  const simulateProcessing = useCallback(async (
    referenceImage: string, 
    testImage: string,
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
    };

    setStatus("complete");
    setResult(verificationResult);
    
    return verificationResult;
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setProgress(0);
  }, []);

  return {
    status,
    result,
    progress,
    verify: simulateProcessing,
    reset,
  };
}