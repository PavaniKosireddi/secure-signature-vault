import { useState, useCallback } from "react";
import { Upload, FileSignature, Shield, AlertTriangle, CheckCircle2, XCircle, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VerificationStatus = "idle" | "uploading" | "analyzing" | "complete";
type ResultType = "genuine" | "forged" | "tampered" | null;

interface VerificationResult {
  type: ResultType;
  siameseScore: number;
  tamperScore: number;
  confidence: number;
}

export function VerificationSection() {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [testImage, setTestImage] = useState<string | null>(null);
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [dragOver, setDragOver] = useState<"reference" | "test" | null>(null);

  const handleDrop = useCallback((e: React.DragEvent, type: "reference" | "test") => {
    e.preventDefault();
    setDragOver(null);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === "reference") {
          setReferenceImage(result);
        } else {
          setTestImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: "reference" | "test") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === "reference") {
          setReferenceImage(result);
        } else {
          setTestImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const simulateVerification = useCallback(() => {
    if (!referenceImage || !testImage) return;

    setStatus("uploading");
    setResult(null);

    setTimeout(() => {
      setStatus("analyzing");
      
      setTimeout(() => {
        // Simulate random result for demo
        const random = Math.random();
        let resultType: ResultType;
        let siameseScore: number;
        let tamperScore: number;

        if (random > 0.6) {
          resultType = "genuine";
          siameseScore = 0.92 + Math.random() * 0.07;
          tamperScore = 0.02 + Math.random() * 0.05;
        } else if (random > 0.3) {
          resultType = "forged";
          siameseScore = 0.35 + Math.random() * 0.25;
          tamperScore = 0.05 + Math.random() * 0.1;
        } else {
          resultType = "tampered";
          siameseScore = 0.6 + Math.random() * 0.2;
          tamperScore = 0.75 + Math.random() * 0.2;
        }

        setResult({
          type: resultType,
          siameseScore: Math.min(siameseScore, 0.99),
          tamperScore: Math.min(tamperScore, 0.99),
          confidence: resultType === "genuine" ? siameseScore : (1 - siameseScore),
        });
        setStatus("complete");
      }, 2000);
    }, 1000);
  }, [referenceImage, testImage]);

  const resetVerification = () => {
    setReferenceImage(null);
    setTestImage(null);
    setStatus("idle");
    setResult(null);
  };

  return (
    <section id="verify" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <FileSignature className="h-4 w-4" />
            <span>Live Verification</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Verify Your</span>{" "}
            <span className="text-gradient">Signature</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Upload a reference signature and test signature to perform instant AI-powered 
            authentication with dual-layer forgery detection.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            {/* Upload Areas */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Reference Signature */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Reference Signature (Known Genuine)
                </label>
                <div
                  className={cn(
                    "relative aspect-[3/2] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden",
                    dragOver === "reference" 
                      ? "border-primary bg-primary/10" 
                      : referenceImage 
                        ? "border-success/50 bg-success/5" 
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  )}
                  onDragOver={(e) => { e.preventDefault(); setDragOver("reference"); }}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={(e) => handleDrop(e, "reference")}
                  onClick={() => document.getElementById("reference-input")?.click()}
                >
                  <input
                    id="reference-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, "reference")}
                  />
                  
                  {referenceImage ? (
                    <img src={referenceImage} alt="Reference" className="w-full h-full object-contain p-4" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <Upload className="h-10 w-10 mb-3" />
                      <span className="text-sm font-medium">Drop or click to upload</span>
                      <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Test Signature */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Test Signature (To Verify)
                </label>
                <div
                  className={cn(
                    "relative aspect-[3/2] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden",
                    dragOver === "test" 
                      ? "border-primary bg-primary/10" 
                      : testImage 
                        ? "border-primary/50 bg-primary/5" 
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                  )}
                  onDragOver={(e) => { e.preventDefault(); setDragOver("test"); }}
                  onDragLeave={() => setDragOver(null)}
                  onDrop={(e) => handleDrop(e, "test")}
                  onClick={() => document.getElementById("test-input")?.click()}
                >
                  <input
                    id="test-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileSelect(e, "test")}
                  />
                  
                  {testImage ? (
                    <img src={testImage} alt="Test" className="w-full h-full object-contain p-4" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                      <Upload className="h-10 w-10 mb-3" />
                      <span className="text-sm font-medium">Drop or click to upload</span>
                      <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="hero"
                size="lg"
                onClick={simulateVerification}
                disabled={!referenceImage || !testImage || status === "uploading" || status === "analyzing"}
                className="min-w-[200px]"
              >
                {status === "uploading" || status === "analyzing" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {status === "uploading" ? "Uploading..." : "Analyzing..."}
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    Verify Signature
                  </>
                )}
              </Button>
              
              {(referenceImage || testImage || result) && (
                <Button variant="outline" size="lg" onClick={resetVerification}>
                  <RotateCcw className="h-5 w-5" />
                  Reset
                </Button>
              )}
            </div>

            {/* Results */}
            {result && (
              <div className="animate-scale-in">
                <div className="h-px bg-border mb-8" />
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Siamese Score */}
                  <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">Siamese Match</span>
                    </div>
                    <div className="text-3xl font-bold text-gradient mb-2">
                      {(result.siameseScore * 100).toFixed(1)}%
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-1000"
                        style={{ width: `${result.siameseScore * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Tamper Score */}
                  <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <div className={cn(
                        "p-2 rounded-lg",
                        result.tamperScore > 0.5 ? "bg-destructive/10" : "bg-success/10"
                      )}>
                        <AlertTriangle className={cn(
                          "h-5 w-5",
                          result.tamperScore > 0.5 ? "text-destructive" : "text-success"
                        )} />
                      </div>
                      <span className="font-medium">Tamper Detection</span>
                    </div>
                    <div className={cn(
                      "text-3xl font-bold mb-2",
                      result.tamperScore > 0.5 ? "text-destructive" : "text-success"
                    )}>
                      {(result.tamperScore * 100).toFixed(1)}%
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          result.tamperScore > 0.5 ? "bg-destructive" : "bg-success"
                        )}
                        style={{ width: `${result.tamperScore * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Final Verdict */}
                  <div className={cn(
                    "p-6 rounded-xl border",
                    result.type === "genuine" 
                      ? "bg-success/10 border-success/30" 
                      : result.type === "forged" 
                        ? "bg-destructive/10 border-destructive/30"
                        : "bg-warning/10 border-warning/30"
                  )}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={cn(
                        "p-2 rounded-lg",
                        result.type === "genuine" 
                          ? "bg-success/20" 
                          : result.type === "forged" 
                            ? "bg-destructive/20"
                            : "bg-warning/20"
                      )}>
                        {result.type === "genuine" ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : result.type === "forged" ? (
                          <XCircle className="h-5 w-5 text-destructive" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        )}
                      </div>
                      <span className="font-medium">Final Verdict</span>
                    </div>
                    <div className={cn(
                      "text-2xl font-bold uppercase mb-1",
                      result.type === "genuine" 
                        ? "text-success" 
                        : result.type === "forged" 
                          ? "text-destructive"
                          : "text-warning"
                    )}>
                      {result.type === "genuine" ? "✓ Authentic" : result.type === "forged" ? "✗ Forged" : "⚠ Tampered"}
                    </div>
                    <div className={cn(
                      "text-sm",
                      result.type === "genuine" 
                        ? "text-success/80" 
                        : result.type === "forged" 
                          ? "text-destructive/80"
                          : "text-warning/80"
                    )}>
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
