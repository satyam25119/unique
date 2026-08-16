"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Globe,
  Clock,
  Network,
  ArrowRight,
} from "lucide-react";

/* ---------- City data ---------- */
interface City {
  name: string;
  x: number;
  y: number;
  projects: string;
}

const cities: City[] = [
  { name: "Delhi NCR", x: 100, y: 62, projects: "120+ Projects" },
  { name: "Noida", x: 108, y: 58, projects: "35+ Projects" },
  { name: "Faridabad", x: 98, y: 72, projects: "28+ Projects" },
  { name: "Lucknow", x: 115, y: 92, projects: "18+ Projects" },
  { name: "Jaipur", x: 62, y: 82, projects: "22+ Projects" },
  { name: "Ahmedabad", x: 42, y: 108, projects: "40+ Projects" },
  { name: "Mumbai", x: 52, y: 142, projects: "95+ Projects" },
  { name: "Pune", x: 58, y: 158, projects: "55+ Projects" },
  { name: "Hyderabad", x: 100, y: 170, projects: "45+ Projects" },
  { name: "Bangalore", x: 108, y: 195, projects: "60+ Projects" },
  { name: "Chennai", x: 132, y: 208, projects: "38+ Projects" },
  { name: "Kolkata", x: 148, y: 118, projects: "30+ Projects" },
];

/* ---------- Stats data ---------- */
const stats = [
  {
    icon: MapPin,
    label: "12+ States",
    desc: "Operating across India",
  },
  {
    icon: Globe,
    label: "50+ Cities",
    desc: "Nationwide presence",
  },
  {
    icon: Network,
    label: "Pan-India Network",
    desc: "Connected partners",
  },
  {
    icon: Clock,
    label: "24hr Response",
    desc: "Quick turnaround time",
  },
];

/* ---------- Animation variants ---------- */
const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const dotVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

/* ---------- Simplified India SVG Path ---------- */
const indiaPath =
  "M 88 14 C 92 6, 104 4, 112 9 L 120 12 L 128 22 L 132 34 L 128 42 L 136 52 L 142 64 L 150 78 L 154 94 L 158 112 L 156 130 L 152 148 L 144 164 L 136 180 L 128 196 L 120 214 L 112 234 L 104 248 L 96 244 L 88 230 L 80 214 L 72 198 L 62 178 L 52 160 L 44 140 L 36 120 L 30 100 L 26 82 L 32 66 L 42 52 L 52 40 L 62 30 L 72 20 Z";

/* ======================================================================== */
export default function ServiceAreasSection() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="service-areas"
      className="py-20 md:py-28 bg-[#07070D] relative overflow-hidden"
    >
      {/* ---------- Background effects ---------- */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(240,90,0,0.04),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      {/* Decorative number "07" */}
      <span className="number-highlight text-white -top-8 -left-4 hidden lg:block">
        07
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* ========== Section Header ========== */}
        <motion.div
          className="text-center mb-14"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" /> Service Areas{" "}
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pan-India Engineering Coverage
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-[15px]">
            From metropolitan hubs to industrial corridors, Unique Engineering
            serves clients across India with reliable equipment and expert
            support.
          </p>
        </motion.div>

        {/* ========== Map + Stats Grid ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-14 items-center">
          {/* ---- India Map ---- */}
          <div className="relative flex justify-center">
            {/* Radial glow behind the map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(240,90,0,0.06),transparent_70%)] pointer-events-none" />

            <svg
              viewBox="0 0 180 260"
              className="w-full max-w-[500px] h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* India outline */}
              <path
                d={indiaPath}
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                strokeLinejoin="round"
              />

              {/* Location dots */}
              {cities.map((city, i) => (
                <motion.g
                  key={city.name}
                  custom={i}
                  variants={dotVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  onMouseEnter={() => setHoveredCity(city.name)}
                  onMouseLeave={() => setHoveredCity(null)}
                  className="cursor-pointer"
                >
                  {/* Ping ring */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="8"
                    fill="none"
                    stroke="rgba(240,90,0,0.3)"
                    strokeWidth="1"
                    className="animate-ping"
                  />
                  {/* Outer glow */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="6"
                    fill="rgba(240,90,0,0.15)"
                  />
                  {/* Core dot */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="3"
                    fill="#F05A00"
                  />
                </motion.g>
              ))}

              {/* Tooltip */}
              {hoveredCity && (() => {
                const city = cities.find((c) => c.name === hoveredCity);
                if (!city) return null;
                return (
                  <g>
                    <rect
                      x={city.x - 48}
                      y={city.y - 32}
                      width="96"
                      height="28"
                      rx="6"
                      fill="rgba(240,90,0,0.15)"
                      stroke="rgba(240,90,0,0.4)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={city.x}
                      y={city.y - 14}
                      textAnchor="middle"
                      fill="white"
                      fontSize="8"
                      fontFamily="system-ui, sans-serif"
                      fontWeight="600"
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* ---- Stats Sidebar ---- */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="glass-glow hover-glow-sm rounded-xl p-4 lg:p-5 bg-white/[0.02] border border-white/[0.06] transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold">
                        {stat.label}
                      </h4>
                      <p className="text-white/35 text-xs mt-0.5">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========== Bottom CTA ========== */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            delay: 1.0,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
        >
          <p className="text-white/50 text-[15px]">
            Don&apos;t see your location?{" "}
            <a
              href="#contact"
              className="text-brand font-medium hover:underline inline-flex items-center gap-1 group"
            >
              We travel anywhere in India
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
