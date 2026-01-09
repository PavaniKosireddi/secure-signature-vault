import { motion } from "framer-motion";
import { ArrowRight, Shield, Fingerprint, ScanLine, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVerify = () => {
    document.getElementById("verify")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      
      <div className="container relative mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Shield className="h-4 w-4" />
              <span>Advanced AI-Powered Security</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-foreground">Forgery-Resilient</span>
              <br />
              <span className="text-gradient">Signature</span>
              <br />
              <span className="text-foreground">Authentication</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-muted-foreground max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Advanced AI system combining Siamese Metric Learning with Digital Tamper Detection 
              to authenticate signatures and defend against sophisticated forgery attacks.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="hero" size="xl" className="group" onClick={scrollToVerify}>
                Start Verification
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="glow" size="xl" onClick={scrollToDemo}>
                <Play className="h-5 w-5" />
                Try Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">99.7%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">&lt;0.1s</div>
                <div className="text-sm text-muted-foreground">Verification Time</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">2-Layer</div>
                <div className="text-sm text-muted-foreground">Defense System</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Visual */}
          <motion.div 
            className="relative lg:h-[600px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative h-full flex items-center justify-center">
              {/* Main Card */}
              <div className="relative glass-card p-8 w-full max-w-md animate-float">
                {/* Scanning Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
                </div>

                {/* Signature Preview Area */}
                <div className="relative aspect-[3/2] bg-secondary/50 rounded-lg border border-border/50 mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 80" className="w-3/4 opacity-80">
                      <path
                        d="M20 50 Q40 20 60 45 T100 40 T140 50 T180 35"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-foreground"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  
                  {/* Scan Lines */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
                </div>

                {/* Status Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="h-5 w-5 text-success" />
                      <span className="text-sm font-medium text-success">Siamese Match</span>
                    </div>
                    <span className="text-sm font-mono text-success">98.7%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30">
                    <div className="flex items-center gap-2">
                      <ScanLine className="h-5 w-5 text-success" />
                      <span className="text-sm font-medium text-success">Tamper Check</span>
                    </div>
                    <span className="text-sm font-mono text-success">Clear</span>
                  </div>
                </div>

                {/* Final Verdict */}
                <div className="mt-4 p-4 rounded-lg bg-success/20 border border-success/40 text-center">
                  <div className="text-lg font-bold text-success">✓ AUTHENTIC</div>
                  <div className="text-xs text-success/80">Signature verified successfully</div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 p-3 glass-card"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -left-4 p-3 glass-card"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Fingerprint className="h-6 w-6 text-cyan-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}