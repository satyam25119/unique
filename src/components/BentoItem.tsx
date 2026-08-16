"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface BentoItemProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  index?: number;
  onClick?: () => void;
  variant?: "default" | "accent" | "dark";
}

export default function BentoItem({
  title,
  subtitle,
  icon,
  children,
  className = "",
  index = 0,
  onClick,
  variant = "default",
}: BentoItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const bgClasses = {
    default: "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]",
    accent: "bg-brand/[0.08] border-brand/[0.2] hover:bg-brand/[0.12]",
    dark: "bg-black/40 border-white/[0.05] hover:bg-black/60",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      className={`card-shimmer glass-glow group relative rounded-2xl border p-6 transition-all duration-500 cursor-pointer ${
        bgClasses[variant]
      } ${onClick ? "hover:scale-[1.02] hover:shadow-xl hover:shadow-brand/5" : "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_30px_rgba(0,0,0,0.3)]"} ${className}`}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 left-0 w-8 h-px bg-brand/40 rounded-full" />
      <div className="absolute top-0 left-0 w-px h-8 bg-brand/40 rounded-full" />
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/0 to-brand/0 group-hover:from-brand/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:bg-brand/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand/20 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-brand-light transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-white/40 text-sm mb-3">{subtitle}</p>
        )}
        {children && <div className="mt-2">{children}</div>}
      </div>
    </motion.div>
  );
}
