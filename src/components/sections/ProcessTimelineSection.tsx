"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ProcessTimelineSection() {
  return (
    <section className="py-20 md:py-28 bg-[#07070D] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_20%,rgba(240,90,0,0.03),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(240,90,0,0.02),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none dot-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" /> How We Work{" "}
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white mb-4">
            Our Process
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-[15px]">
            A streamlined 5-step approach to deliver excellence on every project,
            from first assessment to ongoing support.
          </p>
        </div>

        {/* Desktop: Horizontal timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="hidden md:block relative"
        >
          {/* Connecting line */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent">
            {/* Pulsing dot on line */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_10px_rgba(240,90,0,0.6)]"
              animate={{
                left: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="grid grid-cols-5 gap-4 relative">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className="flex flex-col items-center relative"
              >
                {/* Dot on line */}
                <div className="relative z-10 w-[10px] h-[10px] rounded-full bg-brand border-2 border-[#07070D] shadow-[0_0_8px_rgba(240,90,0,0.4)] mb-6" />
                {/* Card */}
                <div className="card-shimmer glass-glow group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-brand/20 transition-all duration-500 text-center w-full">
                  <div className="text-3xl font-black text-brand/20 mb-3 select-none">
                    {step.num}
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: Vertical timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="md:hidden relative pl-8"
        >
          {/* Vertical line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand/30 to-transparent">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_rgba(240,90,0,0.5)]"
              animate={{
                top: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="flex flex-col gap-6">
            {processSteps.map((step) => (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className="relative"
              >
                {/* Dot on line */}
                <div className="absolute -left-8 top-6 w-[10px] h-[10px] rounded-full bg-brand border-2 border-[#07070D] shadow-[0_0_8px_rgba(240,90,0,0.4)]" />
                {/* Card */}
                <div className="card-shimmer glass-glow group relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-brand/20 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-black text-brand/20 shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="text-white font-semibold mb-1.5 text-sm">
                        {step.title}
                      </h3>
                      <p className="text-white/40 text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
