import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, XCircle, AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSignatureVerification, type DemoSignature } from "@/hooks/useSignatureVerification";

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
    dataset: "SVC2004",
  },
  {
    id: "forged",
    name: "Skilled Forgery",
    type: "forged",
    image: testForgedSvg,
    description: "Carefully imitated by another person",
    dataset: "SCUT-MMSIG",
  },
  {
    id: "tampered",
    name: "Digital Tampering",
    type: "tampered",
    image: testTamperedSvg,
    description: "Copy-pasted with digital manipulation",
    dataset: "Custom Tamper",
  },
];

export function DemoSection() {
  const [selectedDemo, setSelectedDemo] = useState<DemoSignature | null>(null);
  const { status, result, progress, verify, reset } = useSignatureVerification();

  const handleRunDemo = async () => {
    if (!selectedDemo) return;
    
    await verify(
      referenceGenuineSvg,
      selectedDemo.image,
      selectedDemo.type as "genuine" | "forged" | "tampered"
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
    <section id="demo" className="relative py-24">
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <motion.p
            className="text-sm font-medium text-primary mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Interactive Demo
          </motion.p>
          
          <motion.h2 
            className="font-serif text-3xl md:text-4xl font-semibold mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Try the Demo
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Experience how our AI detects genuine signatures, skilled forgeries, 
            and digital tampering in real-time.
          </motion.p>
        </div>

        <div className="max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Reference + Demo Selection */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Reference Signature */}
              <div className="paper-card p-6">
                <div className="text-sm font-medium text-muted-foreground mb-3">Reference Signature</div>
                <div className="aspect-[3/2] rounded-md bg-secondary/50 border border-success/30 flex items-center justify-center overflow-hidden">
                  <img src={referenceGenuineSvg} alt="Reference signature" className="w-3/4 opacity-90" />
                </div>
                <p className="text-xs text-muted-foreground mt-3">Known genuine signature for comparison</p>
              </div>

              {/* Demo Selection */}
              <div className="paper-card p-6">
                <div className="text-sm font-medium text-muted-foreground mb-4">Select Test Case</div>
                <div className="space-y-3">
                  {demoSignatures.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => {
                        setSelectedDemo(demo);
                        reset();
                      }}
                      disabled={status !== "idle" && status !== "complete"}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-md border text-left transition-all",
                        selectedDemo?.id === demo.id
                          ? "bg-primary/5 border-primary/40"
                          : "bg-secondary/30 border-border hover:border-primary/30",
                        status !== "idle" && status !== "complete" && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="w-20 h-14 rounded bg-secondary/50 border border-border flex items-center justify-center overflow-hidden shrink-0">
                        <img src={demo.image} alt={demo.name} className="w-full opacity-80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground text-sm">{demo.name}</div>
                        <div className="text-xs text-muted-foreground">{demo.description}</div>
                        <div className="text-xs text-primary mt-1">Dataset: {demo.dataset}</div>
                      </div>
                      {selectedDemo?.id === demo.id && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Results Panel */}
            <motion.div 
              className="paper-card p-6"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-sm font-medium text-muted-foreground mb-4">Verification Results</div>
              
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{getStatusText()}</span>
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
              </div>

              {/* Results */}
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-4"
                  >
                    {/* Verdict */}
                    <div className={cn(
                      "p-5 rounded-md border text-center",
                      result.type === "genuine" 
                        ? "bg-success/8 border-success/30" 
                        : result.type === "forged" 
                          ? "bg-destructive/8 border-destructive/30"
                          : "bg-warning/8 border-warning/30"
                    )}>
                      <div className="mb-2">
                        {result.type === "genuine" ? (
                          <CheckCircle2 className="h-8 w-8 text-success mx-auto" />
                        ) : result.type === "forged" ? (
                          <XCircle className="h-8 w-8 text-destructive mx-auto" />
                        ) : (
                          <AlertTriangle className="h-8 w-8 text-warning mx-auto" />
                        )}
                      </div>
                      <div className={cn(
                        "text-xl font-serif font-semibold uppercase",
                        result.type === "genuine" ? "text-success" : result.type === "forged" ? "text-destructive" : "text-warning"
                      )}>
                        {result.type === "genuine" ? "Authentic" : result.type === "forged" ? "Forged" : "Tampered"}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {(result.confidence * 100).toFixed(1)}% confidence • {result.processingTime}ms
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-md bg-secondary/40 border border-border">
                        <div className="text-xs text-muted-foreground mb-1">Siamese Match</div>
                        <div className="text-2xl font-serif font-semibold text-foreground">
                          {(result.siameseScore * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div className="p-4 rounded-md bg-secondary/40 border border-border">
                        <div className="text-xs text-muted-foreground mb-1">Tamper Score</div>
                        <div className={cn(
                          "text-2xl font-serif font-semibold",
                          result.tamperScore > 0.5 ? "text-destructive" : "text-success"
                        )}>
                          {(result.tamperScore * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Dataset info */}
                    <div className="p-3 rounded-md bg-primary/5 border border-primary/20">
                      <div className="text-xs text-primary font-medium">Model trained on: {result.dataset.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{result.dataset.description}</div>
                    </div>

                    {/* Details */}
                    <div className="p-4 rounded-md bg-secondary/30 border border-border">
                      <div className="text-sm font-medium text-foreground mb-3">Analysis Details</div>
                      <div className="space-y-2">
                        {[
                          { label: "Stroke Consistency", value: result.details.strokeConsistency },
                          { label: "Pressure Pattern", value: result.details.pressurePattern },
                          { label: "Spatial Alignment", value: result.details.spatialAlignment },
                          { label: "Pixel Anomalies", value: result.details.pixelAnomalies, inverse: true },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground w-28">{item.label}</span>
                            <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full transition-all",
                                  item.inverse
                                    ? item.value > 0.3 ? "bg-destructive" : "bg-success"
                                    : item.value > 0.7 ? "bg-success" : item.value > 0.4 ? "bg-warning" : "bg-destructive"
                                )}
                                style={{ width: `${item.value * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-muted-foreground w-10 text-right">
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
                    <div className="w-12 h-12 rounded-md bg-secondary/50 flex items-center justify-center mb-3">
                      <Play className="h-5 w-5" />
                    </div>
                    <p className="text-sm">Select a test case and run verification</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <Button
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
