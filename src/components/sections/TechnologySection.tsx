import { motion } from "framer-motion";

const technologies = [
  {
    title: "Siamese Neural Network",
    description: "Twin CNN architecture with shared weights learns a signature similarity space using metric learning principles.",
  },
  {
    title: "Triplet Loss Training",
    description: "Anchor-positive-negative pairs ensure genuine signatures cluster together while skilled forgeries are pushed apart.",
  },
  {
    title: "ResNet-18 Backbone",
    description: "Pretrained deep feature extractor captures fine-grained stroke characteristics and writing patterns.",
  },
  {
    title: "Tamper Detection CNN",
    description: "Binary classifier trained on synthetic data detects copy-paste, overlay, and digitally manipulated signatures.",
  },
  {
    title: "PCA Compression",
    description: "Dimensionality reduction preserves discriminative features while optimizing storage and inference speed.",
  },
  {
    title: "Decision Fusion",
    description: "Dual-layer system combines Siamese verification and tamper analysis for final authentication verdict.",
  },
];

const datasets = [
  {
    name: "SVC2004",
    description: "Benchmark dataset from Signature Verification Competition with genuine and skilled forged signatures.",
  },
  {
    name: "SCUT-MMSIG",
    description: "Multi-modal signatures collected via mobile and tablet devices for varied input testing.",
  },
  {
    name: "Custom Tamper Set",
    description: "Synthetically generated copy-paste forgeries, overlays, and background mismatches.",
  },
];

export function TechnologySection() {
  return (
    <section id="technology" className="relative py-24">
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            className="text-sm font-medium text-primary mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Architecture
          </motion.p>
          
          <motion.h2 
            className="font-serif text-3xl md:text-4xl font-semibold mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Deep Learning Technology
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Our system combines state-of-the-art neural network architectures for 
            robust signature verification and forgery detection.
          </motion.p>
        </div>

        {/* Tech Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.title}
              className="paper-card p-6 hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-sm font-semibold text-primary">{String(index + 1).padStart(2, '0')}</span>
              </div>
              
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {tech.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Datasets */}
        <div className="paper-card p-8">
          <h3 className="font-serif text-xl font-semibold mb-6">Training Datasets</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {datasets.map((dataset, index) => (
              <motion.div
                key={dataset.name}
                className="p-4 rounded-md bg-secondary/50 border border-border"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="font-semibold text-foreground mb-2">{dataset.name}</div>
                <p className="text-sm text-muted-foreground">{dataset.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
