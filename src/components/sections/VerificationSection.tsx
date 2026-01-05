import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Shield, AlertTriangle, CheckCircle2, XCircle, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSignatureVerification } from "@/hooks/useSignatureVerification";

export function VerificationSection() {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [testImage, setTestImage] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<"reference" | "test" | null>(null);
  
  const { status, result, progress, verify, reset } = useSignatureVerification();

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

  const handleVerification = useCallback(async () => {
    if (!referenceImage || !testImage) return;
    await verify(referenceImage, testImage);
  }, [referenceImage, testImage, verify]);

  const resetVerification = () => {
    setReferenceImage(null);
    setTestImage(null);
    reset();
  };

  const isProcessing = status !== "idle" && status !== "complete";

  const getStatusText = () => {
    switch (status) {
      case "uploading": return "Uploading signatures...";
      case "preprocessing": return "Preprocessing images...";
      case "tamper-check": return "Running tamper detection...";
      case "siamese-analysis": return "Siamese network analysis...";
      case "complete": return "Analysis complete";
      default: return "Ready";
    }
  };

  return (
    <section id="verify" className="relative py-24 bg-card/50">
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <motion.p
            className="text-sm font-medium text-primary mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Live Verification
          </motion.p>
          
          <motion.h2 
            className="font-serif text-3xl md:text-4xl font-semibold mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Verify Your Signature
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Upload a reference signature and test signature to perform instant AI-powered 
            authentication with dual-layer forgery detection.
          </motion.p>
        </div>

        <motion.div 
          className="max-w-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="paper-card p-6 md:p-8">
            {/* Upload Areas */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Reference Signature */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Reference Signature
                </label>
                <div
                  className={cn(
                    "relative aspect-[3/2] rounded-md border-2 border-dashed transition-all cursor-pointer overflow-hidden",
                    dragOver === "reference" 
                      ? "border-primary bg-primary/5" 
                      : referenceImage 
                        ? "border-success/40 bg-success/5" 
                        : "border-border hover:border-primary/40 hover:bg-secondary/50"
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
                      <Upload className="h-8 w-8 mb-2" />
                      <span className="text-sm">Drop or click to upload</span>
                      <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Test Signature */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Test Signature
                </label>
                <div
                  className={cn(
                    "relative aspect-[3/2] rounded-md border-2 border-dashed transition-all cursor-pointer overflow-hidden",
                    dragOver === "test" 
                      ? "border-primary bg-primary/5" 
                      : testImage 
                        ? "border-primary/40 bg-primary/5" 
                        : "border-border hover:border-primary/40 hover:bg-secondary/50"
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
                      <Upload className="h-8 w-8 mb-2" />
                      <span className="text-sm">Drop or click to upload</span>
                      <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <motion.div 
                className="mb-6 p-4 rounded-md bg-secondary/40 border border-border"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-muted-foreground">{getStatusText()}</span>
                  </div>
                  <span className="font-mono text-primary text-xs">{progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button
                size="lg"
                onClick={handleVerification}
                disabled={!referenceImage || !testImage || isProcessing}
                className="min-w-[180px]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Verify Signature
                  </>
                )}
              </Button>
              
              {(referenceImage || testImage || result) && (
                <Button variant="outline" size="lg" onClick={resetVerification}>
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>

            {/* Results */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="h-px bg-border mb-8" />
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {/* Siamese Score */}
                    <div className="p-5 rounded-md bg-secondary/40 border border-border">
                      <div className="text-sm text-muted-foreground mb-2">Siamese Match</div>
                      <div className="text-2xl font-serif font-semibold text-foreground mb-2">
                        {(result.siameseScore * 100).toFixed(1)}%
                      </div>
                      <div className="h-1 rounded-full bg-secondary overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.siameseScore * 100}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>

                    {/* Tamper Score */}
                    <div className="p-5 rounded-md bg-secondary/40 border border-border">
                      <div className="text-sm text-muted-foreground mb-2">Tamper Detection</div>
                      <div className={cn(
                        "text-2xl font-serif font-semibold mb-2",
                        result.tamperScore > 0.5 ? "text-destructive" : "text-success"
                      )}>
                        {(result.tamperScore * 100).toFixed(1)}%
                      </div>
                      <div className="h-1 rounded-full bg-secondary overflow-hidden">
                        <motion.div 
                          className={cn("h-full", result.tamperScore > 0.5 ? "bg-destructive" : "bg-success")}
                          initial={{ width: 0 }}
                          animate={{ width: `${result.tamperScore * 100}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>

                    {/* Final Verdict */}
                    <div className={cn(
                      "p-5 rounded-md border",
                      result.type === "genuine" 
                        ? "bg-success/8 border-success/30" 
                        : result.type === "forged" 
                          ? "bg-destructive/8 border-destructive/30"
                          : "bg-warning/8 border-warning/30"
                    )}>
                      <div className="text-sm text-muted-foreground mb-2">Final Verdict</div>
                      <div className="flex items-center gap-2 mb-1">
                        {result.type === "genuine" ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : result.type === "forged" ? (
                          <XCircle className="h-5 w-5 text-destructive" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        )}
                        <span className={cn(
                          "text-lg font-serif font-semibold uppercase",
                          result.type === "genuine" ? "text-success" : result.type === "forged" ? "text-destructive" : "text-warning"
                        )}>
                          {result.type === "genuine" ? "Authentic" : result.type === "forged" ? "Forged" : "Tampered"}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(result.confidence * 100).toFixed(1)}% confidence
                      </div>
                    </div>
                  </div>

                  {/* Dataset Reference */}
                  <div className="p-4 rounded-md bg-primary/5 border border-primary/20 mb-6">
                    <div className="text-sm font-medium text-primary">Model: {result.dataset.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{result.dataset.description}</div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="p-5 rounded-md bg-secondary/30 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-foreground">Detailed Analysis</span>
                      <span className="text-xs text-muted-foreground">Processing: {result.processingTime}ms</span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: "Stroke Consistency", value: result.details.strokeConsistency },
                        { label: "Pressure Pattern", value: result.details.pressurePattern },
                        { label: "Spatial Alignment", value: result.details.spatialAlignment },
                        { label: "Pixel Anomalies", value: result.details.pixelAnomalies, inverse: true },
                      ].map((item) => (
                        <div key={item.label} className="p-3 rounded bg-secondary/50">
                          <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                              <motion.div 
                                className={cn(
                                  "h-full",
                                  item.inverse
                                    ? item.value > 0.3 ? "bg-destructive" : "bg-success"
                                    : item.value > 0.7 ? "bg-success" : item.value > 0.4 ? "bg-warning" : "bg-destructive"
                                )}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value * 100}%` }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                            <span className="text-xs font-mono text-foreground w-8 text-right">
                              {(item.value * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
