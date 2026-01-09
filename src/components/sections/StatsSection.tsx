import { motion } from "framer-motion";
import { TrendingUp, Shield, Zap, Target } from "lucide-react";

const stats = [
  {
    icon: Target,
    value: "99.7%",
    label: "Detection Accuracy",
    description: "Industry-leading precision in signature verification",
  },
  {
    icon: Shield,
    value: "<0.5%",
    label: "False Accept Rate",
    description: "Minimal risk of accepting forged signatures",
  },
  {
    icon: Zap,
    value: "<100ms",
    label: "Processing Time",
    description: "Real-time verification for seamless integration",
  },
  {
    icon: TrendingUp,
    value: "50K+",
    label: "Signatures Processed",
    description: "Trained on extensive signature datasets",
  },
];

export function StatsSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass-card p-6 h-full transition-all duration-300 hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                    <div className="font-medium text-foreground mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}