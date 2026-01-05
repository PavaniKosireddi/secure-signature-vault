import { motion } from "framer-motion";
import { Upload, ScanSearch, Brain, ShieldCheck } from "lucide-react";

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
    description: "The Siamese network compares signature embeddings to detect skilled forgeries based on writing style.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Authentication Result",
    description: "Receive a comprehensive verdict with confidence scores, detailed metrics, and dataset references.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 bg-card/50">
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            className="text-sm font-medium text-primary mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Process
          </motion.p>
          
          <motion.h2 
            className="font-serif text-3xl md:text-4xl font-semibold mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            How It Works
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Our dual-layer authentication pipeline ensures comprehensive protection 
            against both physical and digital forgery attempts.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <div className="paper-card p-6 h-full">
                <div className="text-xs font-mono text-primary mb-4">{step.number}</div>
                
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
