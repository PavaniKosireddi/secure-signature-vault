import { motion } from "framer-motion";
import { Upload, ScanSearch, Brain, ShieldCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Signatures",
    description: "Upload a reference signature and the signature you want to verify. Supports PNG, JPG, and SVG formats.",
  },
  {
    icon: ScanSearch,
    number: "02",
    title: "Tamper Detection",
    description: "Our CNN analyzes pixel-level inconsistencies to detect digital manipulation, copy-paste, and overlay attacks.",
  },
  {
    icon: Brain,
    number: "03",
    title: "Siamese Analysis",
    description: "The Siamese neural network compares signature embeddings to detect skilled forgeries based on writing style.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Authentication Result",
    description: "Receive a comprehensive verdict with confidence scores, detailed metrics, and actionable insights.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ArrowRight className="h-4 w-4" />
            <span>Process Flow</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-foreground">How It</span>{" "}
            <span className="text-gradient">Works</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our dual-layer authentication pipeline ensures comprehensive protection 
            against both physical and digital forgery attempts.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="glass-card p-6 h-full hover:border-primary/30 transition-all duration-300 group">
                  {/* Number Badge */}
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {step.number}
                  </div>
                  
                  <div className="pt-4">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 transition-transform duration-300 group-hover:scale-110">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 h-8 items-center justify-center z-10 -translate-y-1/2">
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}