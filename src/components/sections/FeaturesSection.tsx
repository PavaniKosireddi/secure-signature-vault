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
  {
    icon: Landmark,
    title: "Banking & Finance",
    description: "Transaction authorization and document verification",
  },
  {
    icon: FileCheck,
    title: "Legal Documents",
    description: "Contract and agreement authentication",
  },
  {
    icon: GraduationCap,
    title: "Academic",
    description: "Certificate and credential validation",
  },
  {
    icon: Building2,
    title: "Enterprise",
    description: "Corporate identity verification systems",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container relative mx-auto px-4">
        {/* Features Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" />
            <span>Key Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Enterprise-Grade</span>{" "}
            <span className="text-gradient">Security</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Built for real-world deployment with robust features that meet the 
            highest standards of identity verification security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card p-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Applications */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-foreground">Industry</span>{" "}
            <span className="text-gradient">Applications</span>
          </h2>
          
          <p className="text-muted-foreground">
            Trusted across multiple sectors for critical identity verification needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {applications.map((app, index) => (
            <div
              key={app.title}
              className="group text-center p-6 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-400/20 mb-4 transition-transform duration-300 group-hover:scale-110">
                <app.icon className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {app.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {app.description}
              </p>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="mt-24 glass-card p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-foreground">Performance</span>{" "}
              <span className="text-gradient">Metrics</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "<0.5%", label: "False Acceptance Rate (FAR)" },
              { value: "<1%", label: "False Rejection Rate (FNR)" },
              { value: "0.75%", label: "Equal Error Rate (EER)" },
              { value: "99.2%", label: "Detection Accuracy" },
            ].map((metric, index) => (
              <div key={metric.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
