"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, Cog } from "lucide-react";
import { siteConfig } from "@/lib/data";

function GearShape({
  className,
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 10 L55 22 A30 30 0 0 1 68 28 L78 20 L82 30 L72 38 A30 30 0 0 1 78 50 L90 55 L85 65 L73 60 A30 30 0 0 1 60 72 L65 85 L55 82 L52 70 A30 30 0 0 1 50 70 A30 30 0 0 1 48 70 L45 82 L35 85 L40 72 A30 30 0 0 1 27 60 L15 65 L10 55 L22 50 A30 30 0 0 1 28 38 L18 30 L22 20 L32 28 A30 30 0 0 1 45 22 L50 10Z"
        fill="currentColor"
        opacity="0.04"
      />
      <circle cx="50" cy="50" r="16" fill="currentColor" opacity="0.06" />
    </svg>
  );
}

export default function CTABanner({
  onNavigate,
}: {
  onNavigate: (section: string) => void;
}) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.07] via-[#07070D] to-[#0A0A0F]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(240,90,0,0.06),transparent)]" />

      {/* Decorative gear shapes */}
      <GearShape
        size={280}
        className="absolute -top-16 -left-20 text-brand rotate-12 pointer-events-none"
      />
      <GearShape
        size={200}
        className="absolute -bottom-12 -right-16 text-brand -rotate-45 pointer-events-none"
      />
      <GearShape
        size={140}
        className="absolute top-1/2 right-[15%] -translate-y-1/2 text-brand/60 rotate-[30deg] pointer-events-none"
      />

      {/* Gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-glow shimmer-bg border-glow-brand rounded-3xl p-8 md:p-14 text-center relative overflow-hidden"
        >
          {/* Inner decorative gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(240,90,0,0.06),transparent)] pointer-events-none" />

          <div className="relative">
            {/* Icon badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 mb-6"
            >
              <Cog className="w-7 h-7 text-brand" strokeWidth={1.5} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
            >
              Ready to Start Your{" "}
              <span className="text-gradient-brand">Next Project?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/45 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              From crane erection to AMC — we deliver excellence across India.
              Get a free consultation today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 stagger-children"
            >
              <a
                href={siteConfig.phoneHref}
                className="btn-press hover-glow-sm inline-flex items-center gap-2.5 bg-brand hover:bg-brand-light text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-brand/25 hover:shadow-brand/40 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4" />
                Get a Free Quote
              </a>

              <button
                onClick={() => onNavigate("services")}
                className="btn-press hover-glow-sm inline-flex items-center gap-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                View Our Services
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
