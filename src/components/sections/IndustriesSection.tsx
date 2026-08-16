"use client";

import { motion } from "framer-motion";
import {
  Building,
  Warehouse,
  Route,
  HardHat,
  Factory,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { industries } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Building,
  Warehouse,
  Route,
  HardHat,
  Factory,
  Zap,
};

// Bento layout classes — first two cards are larger, last four are standard
const bentoClasses = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
];

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function IndustriesSection() {
  return (
    <section className="py-20 md:py-28 bg-[#07070D] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_70%_30%,rgba(240,90,0,0.03),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(240,90,0,0.02),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none dot-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative number "06" */}
        <span className="number-highlight text-white -top-8 -left-4 hidden lg:block">06</span>
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" /> Industries We Serve{" "}
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white mb-4">
            Industries That Trust Us
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-[15px]">
            From construction sites to power plants, our engineering expertise
            spans across major industrial sectors in India.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {industries.map((ind, i) => {
            const Icon = iconMap[ind.icon] || Building;
            return (
              <motion.div
                key={ind.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className={`${bentoClasses[i] || ""} group`}
              >
                <div className="glass-glow card-shimmer hover-glow-sm relative h-full p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-brand/20 transition-all duration-500 overflow-hidden gradient-border">
                  {/* Hover accent glow */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand/0 to-transparent group-hover:via-brand/50 transition-all duration-500" />

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-5 h-5 text-brand/60" />
                  </div>

                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/10 text-brand flex items-center justify-center mb-5 group-hover:bg-brand/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(240,90,0,0.15)] transition-all duration-500">
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-white font-semibold mb-2 text-[15px] md:text-base group-hover:text-brand-light transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {ind.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
