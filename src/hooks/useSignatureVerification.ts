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

// ✅ HARDCODED NGROK URL - Replace with your actual URL if it changes
const API_URL = " https://generalisable-leonardo-noncharitably.ngrok-free.dev";

export function useSignatureVerification() {
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [progress, setProgress] = useState(0);

  const verify = useCallback(async (
    referenceImage: string,
    testImage: string,
  ): Promise<VerificationResult> => {
    const startTime = Date.now();

    try {
      setStatus("uploading");
      setProgress(20);

      console.log('🔄 API URL:', API_URL);
      console.log('🔄 Sending request...');

      const response = await fetch(`${API_URL}/verify`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({
          reference: referenceImage,
          test: testImage,
        }),
      });

      console.log('📥 Response:', response.status);

      setStatus("siamese-analysis");
      setProgress(70);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error:', errorText);
        throw new Error(`Failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Data:', data);
      
      setProgress(100);

      const verificationResult: VerificationResult = {
        type: data.result as ResultType,
        siameseScore: data.siameseScore ?? 0,
        tamperScore: data.tamperScore ?? 0,
        confidence: data.confidence ?? 0,
        processingTime: data.processingTime ?? (Date.now() - startTime),
        details: {
          strokeConsistency: data.details?.strokeConsistency ?? 0,
          pressurePattern: data.details?.pressurePattern ?? 0,
          spatialAlignment: data.details?.spatialAlignment ?? 0,
          pixelAnomalies: data.details?.pixelAnomalies ?? 0,
        },
      };

      setStatus("complete");
      setResult(verificationResult);
      return verificationResult;
      
    } catch (error) {
      console.error('❌ Verification error:', error);
      setStatus("idle");
      setProgress(0);
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setProgress(0);
  }, []);

  return { status, result, progress, verify, reset };
}