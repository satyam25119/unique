"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ChevronDown,
  HardHat,
  Phone,
  CalendarCheck,
  Network,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { siteConfig, stats } from "@/lib/data";
import { useCounter } from "@/hooks/useGSAP";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import MeshGradientHero from "@/components/MeshGradientHero";

const Custom3DViewer = dynamic(() => import("@/components/Custom3DViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
    </div>
  ),
});

function StatCounter({ value, suffix, label, icon: IconName }: (typeof stats)[0]) {
  const counterRef = useCounter(value);
  const iconMap: Record<string, React.ReactNode> = {
    Calendar: <CalendarCheck className="w-5 h-5" />,
    ProjectDiagram: <Network className="w-5 h-5" />,
    Users: <span className="text-lg">👥</span>,
    Globe: <MapPin className="w-5 h-5" />,
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="text-center"
    >
      <div className="text-brand mb-2 flex justify-center">{iconMap[IconName]}</div>
      <div className="flex items-baseline justify-center gap-0.5">
        <span
          ref={counterRef}
          className="text-3xl md:text-4xl font-bold text-white tabular-nums counter-glow"
        >
          0
        </span>
        <span className="text-3xl md:text-4xl font-bold text-brand">
          {suffix}
        </span>
      </div>
      <p className="text-white/50 text-sm mt-1">{label}</p>
    </motion.div>
  );
}

export default function HeroSection({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [mounted] = useState(true);
  const { ref: bgRef, style: bgStyle } = useScrollParallax(0.05);
  const { ref: statsRef, style: statsStyle } = useScrollParallax(-0.02);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#07070D] bg-mesh-gradient">
      {/* Decorative UE Watermark */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-black text-stroke select-none pointer-events-none z-[1] leading-none tracking-tighter">UE</span>
      {/* Animated Scan Line */}
      <div className="hero-scan-line" />
      <MeshGradientHero />

      {/* Background gradient layers */}
      <div className="absolute inset-0" ref={bgRef} style={bgStyle}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(240,90,0,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(0,201,122,0.05),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(255,208,0,0.04),transparent)]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 text-brand text-xs font-semibold uppercase tracking-wider"
            >
              <HardHat className="w-3.5 h-3.5" />
              Trusted Crane & Engineering Partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
            >
              <span className="text-white">Unique</span>
              <br />
              <span className="bg-gradient-to-r from-brand via-brand-light to-safety bg-clip-text text-transparent text-glow-animate text-glow-brand">
                Engineering
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl"
            >
              Expert crane erection, mechanical systems & maintenance
              solutions across Delhi NCR and Pan-India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => onNavigate("services")}
                className="hover-glow-sm inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-brand/25 hover:shadow-brand/40 transition-all"
              >
                <HardHat className="w-4 h-4" /> Our Services
              </button>
              <a
                href={siteConfig.phoneHref}
                className="hover-glow-sm inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              >
                <Phone className="w-4 h-4" /> Get a Quote
              </a>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              {[
                { icon: CalendarCheck, text: "10+ Years Experience" },
                { icon: Network, text: "150+ Projects" },
                { icon: MapPin, text: "Pan-India" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-white/40 text-xs"
                >
                  <badge.icon className="w-3.5 h-3.5 text-brand/60" />
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-[350px] sm:h-[450px] lg:h-[550px]"
          >
            {mounted && (
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
                  </div>
                }
              >
                <Custom3DViewer />
              </Suspense>
            )}
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          ref={statsRef}
          style={statsStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm border-t border-t-transparent relative before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand/30 before:to-transparent"
        >
          {/* Decorative number "10" */}
          <span className="number-highlight text-white top-4 right-6 hidden lg:block">10</span>
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
          {/* Certified & Trusted Badge */}
          <div className="hidden md:flex col-span-4 items-center justify-center gap-2 pt-4 border-t border-white/[0.04] mt-2">
            <CheckCircle className="w-3.5 h-3.5 text-success/70" />
            <span className="text-white/30 text-xs font-medium">Certified &amp; Trusted Partner</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
