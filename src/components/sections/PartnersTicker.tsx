"use client";

import { motion } from "framer-motion";

const partners = [
  "Tata Steel",
  "L&T Construction",
  "Reliance Industries",
  "Adani Ports",
  "JSW Steel",
  "Shapoorji Pallonji",
  "DLF Limited",
  "Godrej & Boyce",
  "Ultratech Cement",
  "NTPC Limited",
  "SAIL",
  "Power Grid Corp",
];

const row1 = partners.slice(0, 6);
const row2 = partners.slice(6);

function TickerRow({
  items,
  reverse,
}: {
  items: string[];
  reverse: boolean;
}) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `ticker 40s linear infinite ${reverse ? "reverse" : "normal"}`,
        }}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex-shrink-0 glass-card-enhanced hover-glow-sm px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-brand/30 hover:bg-white/[0.06] transition-all duration-300 group"
          >
            <span className="text-white/50 text-sm font-medium tracking-wide group-hover:text-white/70 transition-colors whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersTicker() {
  return (
    <section className="py-16 md:py-20 bg-[#07070D] relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Faint radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(240,90,0,0.03),transparent)] pointer-events-none" />
      {/* Subtle shimmer background */}
      <div className="absolute inset-0 shimmer-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-3 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" />
            Trusted By Industry Leaders
            <span className="w-8 h-px bg-brand" />
          </div>
          <p className="text-white/30 text-sm max-w-lg mx-auto">
            Delivering engineering excellence to India&apos;s top industrial
            and infrastructure companies
          </p>
        </motion.div>

        {/* Ticker rows */}
        <div className="space-y-4">
          <TickerRow items={row1} reverse={false} />
          <TickerRow items={row2} reverse={true} />
        </div>
      </div>
    </section>
  );
}
