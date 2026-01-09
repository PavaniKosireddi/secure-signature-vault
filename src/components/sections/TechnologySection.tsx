import { Brain, Layers, GitCompare, ScanSearch, Lock, Zap } from "lucide-react";

const technologies = [
  {
    icon: Brain,
    title: "Siamese Neural Network",
    description: "Twin CNN architecture with shared weights learns signature similarity space for precise metric learning.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: GitCompare,
    title: "Triplet Loss Training",
    description: "Anchor-positive-negative pairs ensure genuine signatures cluster together while forgeries are pushed apart.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    icon: Layers,
    title: "ResNet-18 Backbone",
    description: "Pretrained deep feature extractor captures fine-grained signature characteristics and stroke patterns.",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
  },
  {
    icon: ScanSearch,
    title: "Tamper Detection CNN",
    description: "Dedicated binary classifier detects copy-paste, overlay, and digitally manipulated signatures.",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    icon: Lock,
    title: "PCA Compression",
    description: "Dimensionality reduction preserves discriminative features while optimizing storage and speed.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    icon: Zap,
    title: "Real-time Fusion",
    description: "Dual-layer decision system combines verification and tamper analysis for instant authentication.",
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
  },
];

export function TechnologySection() {
  return (
    <section id="technology" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Brain className="h-4 w-4" />
            <span>Deep Learning Architecture</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Powered by Advanced</span>
            <br />
            <span className="text-gradient">AI Technology</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Our system combines state-of-the-art deep learning techniques to achieve 
            unparalleled accuracy in signature verification and forgery detection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.title}
              className="group glass-card p-6 hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${tech.bgColor} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <tech.icon className={`h-6 w-6 ${tech.color}`} />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {tech.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="mt-16 glass-card p-8">
          <h3 className="text-xl font-semibold text-center mb-8">System Architecture Flow</h3>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {[
              { label: "Input", sublabel: "Signature Image" },
              { label: "Preprocess", sublabel: "Normalize & Augment" },
              { label: "Tamper Check", sublabel: "CNN Analysis" },
              { label: "Siamese Net", sublabel: "Feature Extraction" },
              { label: "PCA", sublabel: "Compression" },
              { label: "Decision", sublabel: "Auth Result" },
            ].map((step, index) => (
              <div key={step.label} className="flex items-center">
                <div className="text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-secondary border border-border flex items-center justify-center mb-2 group-hover:border-primary/30 transition-colors">
                    <span className="text-2xl md:text-3xl font-bold text-gradient">{index + 1}</span>
                  </div>
                  <div className="text-sm font-medium text-foreground">{step.label}</div>
                  <div className="text-xs text-muted-foreground">{step.sublabel}</div>
                </div>
                
                {index < 5 && (
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
