"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  ShieldCheck,
  Landmark,
  Headset,
  HardHat,
  Globe2,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

interface StatRing {
  value: number;
  suffix: string;
  label: string;
  fill: number; // 0–100
  decimals?: number;
}

const statRings: StatRing[] = [
  { value: 10, suffix: "+", label: "Years Experience", fill: 100 },
  { value: 150, suffix: "+", label: "Projects Completed", fill: 85 },
  { value: 75, suffix: "+", label: "Trusted Clients", fill: 70 },
  { value: 12, suffix: "+", label: "States Served", fill: 60 },
  { value: 99.5, suffix: "%", label: "Client Satisfaction", fill: 99.5, decimals: 1 },
];

interface Badge {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const badges: Badge[] = [
  { icon: ShieldCheck, title: "ISO Certified", desc: "Internationally recognised quality standards" },
  { icon: Landmark, title: "Government Approved", desc: "Trusted by central & state agencies" },
  { icon: Headset, title: "24/7 Support", desc: "Round-the-clock service & maintenance" },
  { icon: HardHat, title: "Safety Compliant", desc: "Zero-incident track record on-site" },
  { icon: Globe2, title: "Pan-India Network", desc: "Operations across 12+ states nationwide" },
  { icon: Zap, title: "Rapid Response Team", desc: "Mobilised within 4 hours, anywhere" },
];

/* ──────────────────────────────────────────────
   Animated counter hook (requestAnimationFrame)
   ────────────────────────────────────────────── */

function useAnimatedCounter(target: number, isInView: boolean, decimals: number = 0): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // ms
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Number((eased * target).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, target, decimals]);

  return count;
}

/* ──────────────────────────────────────────────
   SVG Progress Ring Component
   ────────────────────────────────────────────── */

function ProgressRing({ stat, index }: { stat: StatRing; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const size = 160;        // SVG viewBox
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // stroke-dashoffset: full circle when offset=circumference, 0 when filled
  const offset = circumference - (isInView ? (stat.fill / 100) : 0) * circumference;

  const counter = useAnimatedCounter(stat.value, isInView, stat.decimals ?? 0);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Ring */}
      <div className="relative w-36 h-36 md:w-44 md:h-44">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full -rotate-90"
          fill="none"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`ringGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F05A00" />
              <stop offset="100%" stopColor="#FF8C3A" />
            </linearGradient>
          </defs>
          {/* Animated progress */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#ringGrad-${index})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2.2, delay: index * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* Center counter */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl md:text-4xl font-extrabold text-white counter-glow leading-none">
            {counter}
            <span className="text-brand text-xl md:text-2xl">{stat.suffix}</span>
          </span>
        </div>
      </div>

      {/* Label */}
      <span className="text-white/50 text-sm md:text-base text-center leading-tight max-w-[140px]">
        {stat.label}
      </span>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Achievement Badge Card
   ────────────────────────────────────────────── */

function BadgeCard({ badge, index }: { badge: Badge; index: number }) {
  const Icon = badge.icon;

  return (
    <motion.div
      className="glass-glow hover-glow-sm group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-card p-4 md:p-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Icon container */}
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
        <Icon className="w-5 h-5 text-brand" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <h4 className="text-sm font-semibold text-white leading-tight">{badge.title}</h4>
        <p className="text-xs text-white/40 mt-0.5 truncate">{badge.desc}</p>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Animated Progress Bar
   ────────────────────────────────────────────── */

function BottomBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated fill */}
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: "linear-gradient(90deg, #F05A00, #FF8C3A, #FFD000)",
        }}
        initial={{ width: "0%" }}
        animate={isInView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Glow overlay while animating */}
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full blur-sm"
        style={{
          background: "linear-gradient(90deg, rgba(240,90,0,0.4), rgba(255,140,58,0.2), rgba(255,208,0,0.1))",
        }}
        initial={{ width: "0%" }}
        animate={isInView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Main Section
   ────────────────────────────────────────────── */

export default function AchievementsSection() {
  return (
    <section className="relative bg-[#07070D] py-20 md:py-28 overflow-hidden">
      {/* Section divider at top */}
      <div className="absolute top-0 left-0 right-0 section-divider" aria-hidden />

      {/* ── Background effects ── */}
      {/* Radial brand glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(240,90,0,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      {/* Decorative number */}
      <span className="number-highlight text-white select-none" aria-hidden>
        150
      </span>

      {/* ── Content wrapper ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" />
            Our Achievements
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 reveal-text">
            Numbers That <span className="text-brand">Speak</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Over a decade of engineering excellence, delivering trusted solutions to industries
            across India with unwavering commitment to quality and safety.
          </p>
        </motion.div>

        {/* ── Progress Rings Row ── */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-14 mb-20 md:mb-28">
          {statRings.map((stat, i) => (
            <ProgressRing key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* ── Achievement Badges Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16 md:mb-20">
          {badges.map((badge, i) => (
            <BadgeCard key={badge.title} badge={badge} index={i} />
          ))}
        </div>

        {/* ── Bottom Progress Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <p className="text-white/70 text-sm md:text-base font-medium">
              <span className="text-brand font-bold">150+</span> Projects and Growing
            </p>
            <p className="text-white/40 text-xs">
              Delivering excellence across India since 2014
            </p>
          </div>
          <BottomBar />
        </motion.div>
      </div>
    </section>
  );
}
