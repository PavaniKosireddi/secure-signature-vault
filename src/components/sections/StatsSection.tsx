import { motion } from "framer-motion";

const stats = [
  {
    value: "99.7%",
    label: "Detection Accuracy",
    description: "Precision in signature verification",
  },
  {
    value: "<0.5%",
    label: "False Accept Rate",
    description: "Minimal forged signature acceptance",
  },
  {
    value: "<100ms",
    label: "Processing Time",
    description: "Real-time verification speed",
  },
  {
    value: "50K+",
    label: "Training Samples",
    description: "Signatures from SVC2004 & SCUT",
  },
];

export function StatsSection() {
  return (
    <section className="relative py-16 border-y border-border bg-secondary/30">
      <div className="container relative mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
