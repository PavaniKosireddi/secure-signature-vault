import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileSignature, Shield, AlertTriangle, CheckCircle2,
  XCircle, Loader2, RotateCcw, Info, User, WifiOff, Eye, Scissors
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSignatureVerification, type VerificationResult } from "@/hooks/useSignatureVerification";
import { API_BASE_URL, isBackendConfigured, checkBackendHealth } from "@/config/api";

interface PersonOption {
  id: number;
  name: string;
}

type VerifyMode = "forgery" | "tamper";

export function VerificationSection() {
  const [testImage, setTestImage]         = useState<string | null>(null);
  const [dragOver, setDragOver]           = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [persons, setPersons]             = useState<PersonOption[]>([]);
  const [loadingPersons, setLoadingPersons] = useState(false);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [mode, setMode]                   = useState<VerifyMode>("forgery");

  const { status, result, progress, verify, reset } = useSignatureVerification();

  const checkAndFetch = useCallback(async () => {
    if (!isBackendConfigured()) { setBackendOnline(false); return; }
    setCheckingHealth(true);
    const healthy = await checkBackendHealth();
    setBackendOnline(healthy);
    setCheckingHealth(false);
    if (healthy) {
      setLoadingPersons(true);
      try {
        const res = await fetch(`${API_BASE_URL}/persons`, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (res.ok) {
          const data = await res.json();
          setPersons(data.persons || []);
        }
      } catch { /* ignore */ }
      setLoadingPersons(false);
    }
  }, []);

  useEffect(() => { checkAndFetch(); }, [checkAndFetch]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
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
    if (!testImage) return;
    if (mode === "forgery" && !selectedPerson) return;
    await verify(testImage, selectedPerson, undefined, mode);
  }, [testImage, selectedPerson, verify, mode]);

  const resetVerification = () => {
    setTestImage(null);
    setSelectedPerson("");
    reset();
  };

  // When switching mode, reset results
  const handleModeChange = (newMode: VerifyMode) => {
    setMode(newMode);
    reset();
    setTestImage(null);
    setSelectedPerson("");
  };

  const isProcessing = status !== "idle" && status !== "complete";

  const getStatusText = () => {
    switch (status) {
      case "uploading":     return "Uploading signature...";
      case "preprocessing": return "Preprocessing image...";
      case "forgery-check": return mode === "tamper" ? "Running tamper analysis..." : "Running forgery detection...";
      case "complete":      return "Analysis complete";
      default:              return "Ready";
    }
  };

  const canVerify = testImage && !isProcessing && backendOnline &&
    (mode === "tamper" || (mode === "forgery" && selectedPerson));

  return (
    <section id="verify" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <FileSignature className="h-4 w-4" />
            <span>Live Verification</span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          >
            <span className="text-foreground">Verify a</span>{" "}
            <span className="text-gradient">Signature</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            Choose a verification mode — detect skilled forgeries or digital tampering.
          </motion.p>
        </div>

        {/* ── Mode Tabs ── */}
        <motion.div
          className="max-w-3xl mx-auto mb-6"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
        >
          <div className="flex rounded-xl overflow-hidden border border-border bg-secondary/30 p-1 gap-1">
            <button
              onClick={() => handleModeChange("forgery")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200",
                mode === "forgery"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Eye className="h-4 w-4" />
              Forgery Detection
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                mode === "forgery" ? "bg-primary-foreground/20" : "bg-secondary"
              )}>
                Siamese AI
              </span>
            </button>
            <button
              onClick={() => handleModeChange("tamper")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200",
                mode === "tamper"
                  ? "bg-amber-500 text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Scissors className="h-4 w-4" />
              Tamper Detection
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                mode === "tamper" ? "bg-white/20" : "bg-secondary"
              )}>
                CNN
              </span>
            </button>
          </div>

          {/* Mode description */}
          <div className={cn(
            "mt-3 px-4 py-2 rounded-lg text-xs text-center",
            mode === "forgery"
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          )}>
            {mode === "forgery"
              ? "✦ Compares signature against a stored reference to detect skilled human forgeries"
              : "✦ Analyses image pixels to detect digital manipulation — copy-paste, splicing, erasing"}
          </div>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
        >
          <div className="glass-card p-6 md:p-8">

            {/* Backend Status */}
            {backendOnline === false && (
              <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 flex items-start gap-3">
                <WifiOff className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">Backend Offline</p>
                  <p className="text-xs text-destructive/80 mt-1">
                    {!isBackendConfigured()
                      ? "Set VITE_API_URL in .env.local to connect to your Colab backend."
                      : "The Colab backend is not running. Start the notebook and run all cells."}
                  </p>
                  {isBackendConfigured() && (
                    <Button variant="outline" size="sm" className="mt-2 text-destructive border-destructive/30" onClick={checkAndFetch} disabled={checkingHealth}>
                      {checkingHealth ? <Loader2 className="h-3 w-3 animate-spin" /> : <RotateCcw className="h-3 w-3" />}
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            )}

            {backendOnline === true && (
              <div className="mb-6 p-3 rounded-xl bg-success/10 border border-success/30 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-success font-medium">Backend Connected</span>
                <span className="text-xs text-muted-foreground">• {persons.length} person(s) in database</span>
              </div>
            )}

            {/* Person selector — only for forgery mode */}
            <AnimatePresence>
              {mode === "forgery" && (
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Select Person (Reference from Database)
                  </label>
                  <select
                    value={selectedPerson}
                    onChange={(e) => setSelectedPerson(e.target.value)}
                    disabled={isProcessing || !backendOnline}
                    className="w-full h-10 px-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                  >
                    <option value="">
                      {checkingHealth ? "Connecting..." : loadingPersons ? "Loading..." : persons.length === 0 ? "No persons — add via Admin" : "-- Select a person --"}
                    </option>
                    {persons.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tamper mode note — no person needed */}
            <AnimatePresence>
              {mode === "tamper" && (
                <motion.div
                  className="mb-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-2"
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                >
                  <Scissors className="h-4 w-4 text-amber-400 shrink-0" />
                  <p className="text-xs text-amber-400">No reference person needed — just upload the signature image to check for digital manipulation.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-foreground mb-3">
                Upload {mode === "forgery" ? "Test" : ""} Signature Image
              </label>
              <div
                className={cn(
                  "relative aspect-[3/2] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden",
                  dragOver ? "border-primary bg-primary/10" :
                  testImage ? "border-primary/50 bg-primary/5" :
                  "border-border hover:border-primary/50 hover:bg-secondary/50"
                )}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("test-input")?.click()}
              >
                <input id="test-input" type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
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

            {/* Progress bar */}
            {isProcessing && (
              <motion.div
                className="mb-6 p-4 rounded-xl bg-secondary/30 border border-border"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
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
                    className={cn("h-full", mode === "tamper" ? "bg-amber-500" : "bg-gradient-to-r from-primary to-cyan-400")}
                    initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="hero"
                size="lg"
                onClick={handleVerification}
                disabled={!canVerify}
                className={cn(
                  "min-w-[200px]",
                  mode === "tamper" && "bg-amber-500 hover:bg-amber-600 text-white border-amber-500"
                )}
              >
                {isProcessing ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
                ) : mode === "forgery" ? (
                  <><Eye className="h-5 w-5" /> Detect Forgery</>
                ) : (
                  <><Scissors className="h-5 w-5" /> Detect Tampering</>
                )}
              </Button>
              {(testImage || result) && (
                <Button variant="outline" size="lg" onClick={resetVerification}>
                  <RotateCcw className="h-5 w-5" /> Reset
                </Button>
              )}
            </div>

            {/* Results */}
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <div className="h-px bg-border mb-8" />

                  <div className={cn(
                    "grid gap-6 mb-6",
                    mode === "forgery" ? "md:grid-cols-3" : "md:grid-cols-2"
                  )}>

                    {/* Forgery mode: show similarity */}
                    {mode === "forgery" && (
                      <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-2 rounded-lg bg-primary/10"><Shield className="h-5 w-5 text-primary" /></div>
                          <span className="font-medium">Similarity Score</span>
                        </div>
                        <div className="text-3xl font-bold text-gradient mb-2">{(result.siameseScore * 100).toFixed(1)}%</div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <motion.div className="h-full bg-gradient-to-r from-primary to-cyan-400" initial={{ width: 0 }} animate={{ width: `${result.siameseScore * 100}%` }} transition={{ duration: 1 }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">≥72% = Authentic</p>
                      </div>
                    )}

                    {/* Tamper mode: show tamper score */}
                    {mode === "tamper" && (
                      <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                        <div className="flex items-center gap-2 mb-4">
                          <div className={cn("p-2 rounded-lg", result.tamperScore > 0.55 ? "bg-destructive/10" : "bg-success/10")}>
                            <Scissors className={cn("h-5 w-5", result.tamperScore > 0.55 ? "text-destructive" : "text-success")} />
                          </div>
                          <span className="font-medium">Tamper Score</span>
                        </div>
                        <div className={cn("text-3xl font-bold mb-2", result.tamperScore > 0.55 ? "text-destructive" : "text-success")}>
                          {(result.tamperScore * 100).toFixed(1)}%
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <motion.div className={cn("h-full", result.tamperScore > 0.55 ? "bg-destructive" : "bg-success")} initial={{ width: 0 }} animate={{ width: `${result.tamperScore * 100}%` }} transition={{ duration: 1 }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">&gt;55% = Tampered</p>
                      </div>
                    )}

                    {/* Confidence */}
                    <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10"><Info className="h-5 w-5 text-primary" /></div>
                        <span className="font-medium">Confidence</span>
                      </div>
                      <div className="text-3xl font-bold text-gradient mb-2">{(result.confidence * 100).toFixed(1)}%</div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div className="h-full bg-gradient-to-r from-primary to-cyan-400" initial={{ width: 0 }} animate={{ width: `${result.confidence * 100}%` }} transition={{ duration: 1 }} />
                      </div>
                    </div>

                    {/* Final Verdict */}
                    <div className={cn(
                      "p-6 rounded-xl border",
                      result.type === "genuine" || result.type === "authentic" ? "bg-success/10 border-success/30" :
                      result.type === "forged"  ? "bg-destructive/10 border-destructive/30" :
                      result.type === "clean"   ? "bg-success/10 border-success/30" :
                      "bg-amber-500/10 border-amber-500/30"
                    )}>
                      <div className="flex items-center gap-2 mb-4">
                        <div className={cn(
                          "p-2 rounded-lg",
                          result.type === "genuine" || result.type === "authentic" || result.type === "clean" ? "bg-success/20" :
                          result.type === "forged" ? "bg-destructive/20" : "bg-amber-500/20"
                        )}>
                          {result.type === "genuine" || result.type === "authentic" || result.type === "clean"
                            ? <CheckCircle2 className="h-5 w-5 text-success" />
                            : result.type === "forged"
                            ? <XCircle className="h-5 w-5 text-destructive" />
                            : <AlertTriangle className="h-5 w-5 text-amber-400" />}
                        </div>
                        <span className="font-medium">Final Verdict</span>
                      </div>
                      <div className={cn(
                        "text-2xl font-bold uppercase mb-1",
                        result.type === "genuine" || result.type === "authentic" || result.type === "clean" ? "text-success" :
                        result.type === "forged" ? "text-destructive" : "text-amber-400"
                      )}>
                        {result.type === "genuine" || result.type === "authentic" ? "✓ AUTHENTIC" :
                         result.type === "forged"   ? "✗ FORGED" :
                         result.type === "clean"    ? "✓ CLEAN" :
                         "⚠ TAMPERED"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {mode === "forgery"
                          ? (result.type === "genuine" || result.type === "authentic" ? "Matches reference signature" : "Does not match reference")
                          : (result.type === "clean" ? "No digital manipulation detected" : "Digital manipulation detected")}
                      </div>
                    </div>
                  </div>

                  {/* Detailed analysis — only for forgery mode */}
                  {mode === "forgery" && (
                    <div className="p-6 rounded-xl bg-secondary/30 border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <Info className="h-5 w-5 text-primary" />
                        <span className="font-medium">Detailed Analysis</span>
                        <span className="text-xs text-muted-foreground ml-auto">Processing time: {result.processingTime}ms</span>
                      </div>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: "Stroke Consistency", value: result.details.strokeConsistency },
                          { label: "Pressure Pattern",   value: result.details.pressurePattern },
                          { label: "Spatial Alignment",  value: result.details.spatialAlignment },
                          { label: "Pixel Anomalies",    value: result.details.pixelAnomalies, inverse: true },
                        ].map((item) => (
                          <div key={item.label} className="p-3 rounded-lg bg-secondary/50">
                            <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                                <motion.div
                                  className={cn("h-full",
                                    item.inverse
                                      ? item.value > 0.3 ? "bg-destructive" : "bg-success"
                                      : item.value > 0.7 ? "bg-success" : item.value > 0.4 ? "bg-warning" : "bg-destructive"
                                  )}
                                  initial={{ width: 0 }} animate={{ width: `${item.value * 100}%` }} transition={{ duration: 0.8 }}
                                />
                              </div>
                              <span className="text-sm font-mono">{(item.value * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tamper details */}
                  {mode === "tamper" && (
                    <div className="p-6 rounded-xl bg-secondary/30 border border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <Info className="h-5 w-5 text-amber-400" />
                        <span className="font-medium">Pixel Analysis</span>
                        <span className="text-xs text-muted-foreground ml-auto">Processing time: {result.processingTime}ms</span>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { label: "Pixel Anomalies",       value: result.details.pixelAnomalies,    bad: true },
                          { label: "Edge Irregularity",     value: (result as any).edgeIrregularity ?? result.details.pixelAnomalies, bad: true },
                          { label: "Compression Artifacts", value: (result as any).compressionArtifacts ?? 0, bad: true },
                        ].map((item) => (
                          <div key={item.label} className="p-3 rounded-lg bg-secondary/50">
                            <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                                <motion.div
                                  className={cn("h-full", item.value > 0.4 ? "bg-amber-500" : "bg-success")}
                                  initial={{ width: 0 }} animate={{ width: `${item.value * 100}%` }} transition={{ duration: 0.8 }}
                                />
                              </div>
                              <span className="text-sm font-mono">{(item.value * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
