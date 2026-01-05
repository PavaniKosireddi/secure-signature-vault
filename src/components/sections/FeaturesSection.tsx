import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Fingerprint, 
  ScanLine, 
  Gauge, 
  Database, 
  Lock,
  Building2,
  GraduationCap,
  Landmark,
  FileCheck
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Dual-Layer Protection",
    description: "Combined Siamese verification and tamper detection provides comprehensive defense against all forgery types.",
  },
  {
    icon: Fingerprint,
    title: "Behavioral Analysis",
    description: "Goes beyond visual similarity to analyze writing style, stroke dynamics, and signature patterns.",
  },
  {
    icon: ScanLine,
    title: "Copy-Paste Detection",
    description: "Detects digitally manipulated signatures including overlays, resizing, and background mismatches.",
  },
  {
    icon: Gauge,
    title: "Real-time Processing",
    description: "Sub-second verification times enable seamless integration into high-throughput workflows.",
  },
  {
    icon: Database,
    title: "Scalable Architecture",
    description: "PCA compression and optimized embeddings ensure efficient storage and rapid retrieval.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption and secure processing for sensitive identity verification.",
  },
];

const applications = [
  { icon: Landmark, title: "Banking & Finance", description: "Transaction authorization" },
  { icon: FileCheck, title: "Legal Documents", description: "Contract authentication" },
  { icon: GraduationCap, title: "Academic", description: "Certificate validation" },
  { icon: Building2, title: "Enterprise", description: "Corporate ID systems" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24">
      <div className="container relative mx-auto px-4">
        {/* Features */}
        <div className="max-w-2xl mb-16">
          <motion.p
            className="text-sm font-medium text-primary mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Features
          </motion.p>
          
          <motion.h2 
            className="font-serif text-3xl md:text-4xl font-semibold mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Enterprise-Grade Security
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Built for real-world deployment with robust features that meet the 
            highest standards of identity verification security.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="paper-card p-6 hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Applications */}
        <div className="max-w-2xl mb-10">
          <h3 className="font-serif text-2xl font-semibold mb-2">Industry Applications</h3>
          <p className="text-muted-foreground text-sm">Trusted across multiple sectors for critical identity verification.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {applications.map((app, index) => (
            <motion.div
              key={app.title}
              className="p-5 rounded-md bg-secondary/40 border border-border hover:border-primary/30 transition-colors text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <app.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h4 className="font-semibold text-foreground mb-1">{app.title}</h4>
              <p className="text-sm text-muted-foreground">{app.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance Metrics */}
        <div className="paper-card p-8">
          <h3 className="font-serif text-xl font-semibold text-center mb-8">Performance Metrics</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "<0.5%", label: "False Acceptance Rate (FAR)" },
              { value: "<1%", label: "False Rejection Rate (FNR)" },
              { value: "0.75%", label: "Equal Error Rate (EER)" },
              { value: "99.2%", label: "Detection Accuracy" },
            ].map((metric, index) => (
              <motion.div 
                key={metric.label} 
                className="text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="text-3xl font-serif font-semibold text-foreground mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
