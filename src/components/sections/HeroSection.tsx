import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVerify = () => {
    document.getElementById("verify")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen pt-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 subtle-grid opacity-40" />
      
      <div className="container relative mx-auto px-4 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-sm mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>AI-Powered Signature Authentication</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Forgery-Resilient Signature{" "}
            <span className="underline-accent">Verification</span>{" "}
            Using Deep Learning
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Combining Siamese Metric Learning with Digital Tamper Detection to authenticate 
            signatures and defend against skilled forgery attacks.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button size="lg" className="group" onClick={scrollToVerify}>
              Start Verification
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToDemo}>
              <Play className="h-4 w-4" />
              View Demo
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div 
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-10 border-t border-border"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif font-semibold text-foreground">99.7%</div>
              <div className="text-sm text-muted-foreground mt-1">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif font-semibold text-foreground">&lt;100ms</div>
              <div className="text-sm text-muted-foreground mt-1">Latency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif font-semibold text-foreground">2-Layer</div>
              <div className="text-sm text-muted-foreground mt-1">Defense</div>
            </div>
          </motion.div>
        </div>

        {/* Signature illustration */}
        <motion.div 
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="paper-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm font-medium text-success">Verified Authentic</span>
            </div>
            
            <div className="aspect-[3/1] bg-secondary/50 rounded border border-border flex items-center justify-center">
              <svg viewBox="0 0 300 80" className="w-3/4 signature-animate">
                <path
                  d="M30 55 Q50 25 75 50 T120 45 T165 52 T210 38 T255 48 T280 42"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  className="text-foreground"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Siamese Match: <span className="font-mono text-foreground">97.2%</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Tamper Score: <span className="font-mono text-success">2.1%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
