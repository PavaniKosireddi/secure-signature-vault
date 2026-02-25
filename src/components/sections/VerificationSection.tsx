import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSignature, Shield, AlertTriangle, CheckCircle2, XCircle, Loader2, RotateCcw, Info, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSignatureVerification, type VerificationResult } from "@/hooks/useSignatureVerification";
import { API_BASE_URL, isBackendConfigured } from "@/config/api";

interface PersonOption {
  id: number;
  person_name: string;
}

export function VerificationSection() {
  const [testImage, setTestImage] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [persons, setPersons] = useState<PersonOption[]>([]);
  const [loadingPersons, setLoadingPersons] = useState(false);

  const { status, result, progress, verify, reset } = useSignatureVerification();

  // Fetch available persons from DB
  useEffect(() => {
    if (isBackendConfigured()) {
      setLoadingPersons(true);
      fetch(`${API_BASE_URL}/persons`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      })
        .then((r) => r.ok ? r.json() : { persons: [] })
        .then((data) => setPersons(data.persons || []))
        .catch(() => {})
        .finally(() => setLoadingPersons(false));
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setTestImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setTestImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleVerification = useCallback(async () => {
    if (!testImage || !selectedPerson) return;
    await verify(testImage, selectedPerson);
  }, [testImage, selectedPerson, verify]);

  const resetVerification = () => {
    setTestImage(null);
    setSelectedPerson("");
    reset();
  };

  const isProcessing = status !== "idle" && status !== "complete";

  const getStatusText = () => {
    switch (status) {
      case "uploading": return "Uploading signature...";
      case "preprocessing": return "Preprocessing image...";
      case "forgery-check": return "Running forgery detection...";
      case "complete": return "Analysis complete";
      default: return "Ready";
    }
  };

  return (
    <section id="verify" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FileSignature className="h-4 w-4" />
            <span>Live Verification</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-foreground">Verify a</span>{" "}
            <span className="text-gradient">Signature</span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Select a person from the database and upload a test signature for instant AI-powered authentication.
          </motion.p>
        </div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card p-6 md:p-8">
            {/* Person Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Select Person (Reference from Database)
              </label>
              {isBackendConfigured() ? (
                <select
                  value={selectedPerson}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  disabled={isProcessing}
                  className="w-full h-10 px-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">
                    {loadingPersons ? "Loading persons..." : "-- Select a person --"}
                  </option>
                  {persons.map((p) => (
                    <option key={p.id} value={p.person_name}>
                      {p.person_name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/30 text-warning text-sm">
                  Backend not configured. Set VITE_API_URL in .env.local to connect.
                </div>
              )}
            </div>

            {/* Test Signature Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                Upload Test Signature
              </label>
              <div
                className={cn(
                  "relative aspect-[3/2] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden",
                  dragOver
                    ? "border-primary bg-primary/10"
                    : testImage
                      ? "border-primary/50 bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary/50"
                )}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("test-input")?.click()}
              >
                <input
                  id="test-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                {testImage ? (
                  <img src={testImage} alt="Test" className="w-full h-full object-contain p-4" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <Upload className="h-10 w-10 mb-3" />
                    <span className="text-sm font-medium">Drop or click to upload test signature</span>
                    <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
                  </div>
                )}
              </div>
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <motion.div
                className="mb-6 p-4 rounded-xl bg-secondary/30 border border-border"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-muted-foreground">{getStatusText()}</span>
                  </div>
                  <span className="font-mono text-primary">{progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="hero"
                size="lg"
                onClick={handleVerification}
                disabled={!testImage || !selectedPerson || isProcessing}
                className="min-w-[200px]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    Verify Signature
                  </>
                )}
              </Button>

              {(testImage || result) && (
                <Button variant="outline" size="lg" onClick={resetVerification}>
                  <RotateCcw className="h-5 w-5" />
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

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
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
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-cyan-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.siameseScore * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>

                    {/* Tamper Score */}
                    <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <div className={cn("p-2 rounded-lg", result.tamperScore > 0.5 ? "bg-destructive/10" : "bg-success/10")}>
                          <AlertTriangle className={cn("h-5 w-5", result.tamperScore > 0.5 ? "text-destructive" : "text-success")} />
                        </div>
                        <span className="font-medium">Tamper Detection</span>
                      </div>
                      <div className={cn("text-3xl font-bold mb-2", result.tamperScore > 0.5 ? "text-destructive" : "text-success")}>
                        {(result.tamperScore * 100).toFixed(1)}%
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className={cn("h-full", result.tamperScore > 0.5 ? "bg-destructive" : "bg-success")}
                          initial={{ width: 0 }}
                          animate={{ width: `${result.tamperScore * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>

                    {/* Final Verdict */}
                    <div className={cn(
                      "p-6 rounded-xl border",
                      result.type === "genuine" ? "bg-success/10 border-success/30" :
                      result.type === "forged" ? "bg-destructive/10 border-destructive/30" :
                      "bg-warning/10 border-warning/30"
                    )}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className={cn(
                          "p-2 rounded-lg",
                          result.type === "genuine" ? "bg-success/20" :
                          result.type === "forged" ? "bg-destructive/20" :
                          "bg-warning/20"
                        )}>
                          {result.type === "genuine" ? <CheckCircle2 className="h-5 w-5 text-success" /> :
                           result.type === "forged" ? <XCircle className="h-5 w-5 text-destructive" /> :
                           <AlertTriangle className="h-5 w-5 text-warning" />}
                        </div>
                        <span className="font-medium">Final Verdict</span>
                      </div>
                      <div className={cn(
                        "text-2xl font-bold uppercase mb-1",
                        result.type === "genuine" ? "text-success" :
                        result.type === "forged" ? "text-destructive" : "text-warning"
                      )}>
                        {result.type === "genuine" ? "✓ Authentic" : result.type === "forged" ? "✗ Forged" : "⚠ Tampered"}
                      </div>
                      <div className={cn(
                        "text-sm",
                        result.type === "genuine" ? "text-success/80" :
                        result.type === "forged" ? "text-destructive/80" : "text-warning/80"
                      )}>
                        Confidence: {(result.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Info className="h-5 w-5 text-primary" />
                      <span className="font-medium">Detailed Analysis</span>
                      <span className="text-xs text-muted-foreground ml-auto">Processing time: {result.processingTime}ms</span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: "Stroke Consistency", value: result.details.strokeConsistency },
                        { label: "Pressure Pattern", value: result.details.pressurePattern },
                        { label: "Spatial Alignment", value: result.details.spatialAlignment },
                        { label: "Pixel Anomalies", value: result.details.pixelAnomalies, inverse: true },
                      ].map((item) => (
                        <div key={item.label} className="p-3 rounded-lg bg-secondary/50">
                          <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                              <motion.div
                                className={cn(
                                  "h-full",
                                  item.inverse
                                    ? item.value > 0.3 ? "bg-destructive" : "bg-success"
                                    : item.value > 0.7 ? "bg-success" : item.value > 0.4 ? "bg-warning" : "bg-destructive"
                                )}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value * 100}%` }}
                                transition={{ duration: 0.8 }}
                              />
                            </div>
                            <span className="text-sm font-mono">{(item.value * 100).toFixed(0)}%</span>
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
