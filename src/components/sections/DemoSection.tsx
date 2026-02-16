import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, XCircle, AlertTriangle, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSignatureVerification } from "@/hooks/useSignatureVerification";

interface DemoSignature {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
}

import referenceGenuineSvg from "@/assets/signatures/reference-genuine.svg";
import testGenuineSvg from "@/assets/signatures/test-genuine.svg";
import testForgedSvg from "@/assets/signatures/test-forged.svg";
import testTamperedSvg from "@/assets/signatures/test-tampered.svg";

const demoSignatures: DemoSignature[] = [
  {
    id: "genuine",
    name: "Genuine Signature",
    type: "genuine",
    image: testGenuineSvg,
    description: "Authentic signature from the same person",
  },
  {
    id: "forged",
    name: "Skilled Forgery",
    type: "forged",
    image: testForgedSvg,
    description: "Carefully imitated signature by another person",
  },
  {
    id: "tampered",
    name: "Digital Tampering",
    type: "tampered",
    image: testTamperedSvg,
    description: "Copy-pasted signature with digital manipulation",
  },
];

export function DemoSection() {
  const [selectedDemo, setSelectedDemo] = useState<DemoSignature | null>(null);
  const { status, result, progress, verify, reset } = useSignatureVerification();

  const handleRunDemo = async () => {
    if (!selectedDemo) return;
    
    await verify(
      referenceGenuineSvg,
      selectedDemo.image
    );
  };

  const handleReset = () => {
    reset();
    setSelectedDemo(null);
  };

  const getStatusText = () => {
    switch (status) {
      case "uploading": return "Uploading signatures...";
      case "preprocessing": return "Preprocessing images...";
      case "tamper-check": return "Running tamper detection CNN...";
      case "siamese-analysis": return "Analyzing with Siamese network...";
      case "complete": return "Analysis complete";
      default: return "Ready";
    }
  };

  return (
    <section id="demo" className="relative py-24 overflow-hidden bg-card/30">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4" />
            <span>Interactive Demo</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-foreground">Try the</span>{" "}
            <span className="text-gradient">Demo</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Experience how our AI system detects genuine signatures, skilled forgeries, 
            and digital tampering in real-time.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Reference + Demo Selection */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Reference Signature */}
              <div className="glass-card p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Reference Signature (Known Genuine)</h3>
                <div className="aspect-[3/2] rounded-lg bg-secondary/50 border border-success/30 flex items-center justify-center overflow-hidden">
                  <img src={referenceGenuineSvg} alt="Reference signature" className="w-3/4 opacity-90" />
                </div>
                <p className="text-xs text-muted-foreground mt-3">This is the authentic signature used for comparison</p>
              </div>

              {/* Demo Selection */}
              <div className="glass-card p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Select Test Case</h3>
                <div className="grid gap-3">
                  {demoSignatures.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => {
                        setSelectedDemo(demo);
                        reset();
                      }}
                      disabled={status !== "idle" && status !== "complete"}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200",
                        selectedDemo?.id === demo.id
                          ? "bg-primary/10 border-primary/50"
                          : "bg-secondary/30 border-border hover:border-primary/30 hover:bg-secondary/50",
                        status !== "idle" && status !== "complete" && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="w-24 h-16 rounded-lg bg-secondary/50 border border-border flex items-center justify-center overflow-hidden shrink-0">
                        <img src={demo.image} alt={demo.name} className="w-full opacity-80" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{demo.name}</div>
                        <div className="text-sm text-muted-foreground">{demo.description}</div>
                      </div>
                      {selectedDemo?.id === demo.id && (
                        <div className="ml-auto">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Results Panel */}
            <motion.div 
              className="glass-card p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Verification Results</h3>
              
              {/* Status Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{getStatusText()}</span>
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
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Verdict Card */}
                    <div className={cn(
                      "p-6 rounded-xl border text-center",
                      result.type === "genuine" 
                        ? "bg-success/10 border-success/30" 
                        : result.type === "forged" 
                          ? "bg-destructive/10 border-destructive/30"
                          : "bg-warning/10 border-warning/30"
                    )}>
                      <div className={cn(
                        "inline-flex p-3 rounded-full mb-3",
                        result.type === "genuine" 
                          ? "bg-success/20" 
                          : result.type === "forged" 
                            ? "bg-destructive/20"
                            : "bg-warning/20"
                      )}>
                        {result.type === "genuine" ? (
                          <CheckCircle2 className="h-8 w-8 text-success" />
                        ) : result.type === "forged" ? (
                          <XCircle className="h-8 w-8 text-destructive" />
                        ) : (
                          <AlertTriangle className="h-8 w-8 text-warning" />
                        )}
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
                      <div className="text-sm text-muted-foreground">
                        Confidence: {(result.confidence * 100).toFixed(1)}% • {result.processingTime}ms
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <div className="text-sm text-muted-foreground mb-2">Siamese Match</div>
                        <div className="text-2xl font-bold text-gradient">{(result.siameseScore * 100).toFixed(1)}%</div>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                        <div className="text-sm text-muted-foreground mb-2">Tamper Score</div>
                        <div className={cn(
                          "text-2xl font-bold",
                          result.tamperScore > 0.5 ? "text-destructive" : "text-success"
                        )}>{(result.tamperScore * 100).toFixed(1)}%</div>
                      </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="p-4 rounded-xl bg-secondary/20 border border-border">
                      <div className="text-sm font-medium text-foreground mb-3">Detailed Analysis</div>
                      <div className="grid gap-2">
                        {[
                          { label: "Stroke Consistency", value: result.details.strokeConsistency },
                          { label: "Pressure Pattern", value: result.details.pressurePattern },
                          { label: "Spatial Alignment", value: result.details.spatialAlignment },
                          { label: "Pixel Anomalies", value: result.details.pixelAnomalies, inverse: true },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground w-32">{item.label}</span>
                            <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full transition-all duration-500",
                                  item.inverse
                                    ? item.value > 0.3 ? "bg-destructive" : "bg-success"
                                    : item.value > 0.7 ? "bg-success" : item.value > 0.4 ? "bg-warning" : "bg-destructive"
                                )}
                                style={{ width: `${item.value * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-muted-foreground w-12 text-right">
                              {(item.value * 100).toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-64 flex flex-col items-center justify-center text-muted-foreground"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                      <Play className="h-8 w-8" />
                    </div>
                    <p className="text-sm">Select a test case and run verification</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={handleRunDemo}
                  disabled={!selectedDemo || (status !== "idle" && status !== "complete")}
                >
                  <Play className="h-4 w-4" />
                  Run Verification
                </Button>
                {result && (
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}