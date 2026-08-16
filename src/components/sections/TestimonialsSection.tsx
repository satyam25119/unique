"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const maxIndex = Math.max(0, testimonials.length - 3);

  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  const visible = testimonials.slice(current, current + 3);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#07070D] to-[#0A0A0F] relative overflow-hidden">
      {/* Decorative blurred orange circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/[0.03] rounded-full blur-3xl pointer-events-none" />
      {/* Additional decorative blurred orange circle (w-64 h-64) */}
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      {/* Dot-pattern overlay */}
      <div className="dot-pattern absolute inset-0 opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" /> Client Reviews{" "}
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-white/30 text-sm max-w-md mx-auto">Trusted by 75+ clients across India for crane and engineering excellence.</p>
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-shimmer glass-glow glass-card-enhanced hover-glow-sm card-3d-tilt group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-brand/15 flex flex-col transition-all duration-300 hover:scale-[1.02] relative"
            >
              {/* Large decorative quote mark */}
              <span className="absolute top-4 left-6 text-6xl text-brand/10 select-none pointer-events-none">❝</span>

              <div className="reveal-fade relative z-10 flex flex-col flex-1">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-brand/20 mb-3" strokeWidth={1.5} />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`w-4 h-4 ${
                        si < Math.floor(t.rating)
                          ? "text-safety fill-safety badge-pulse"
                          : si < t.rating
                          ? "text-safety fill-safety/50"
                          : "text-white/10"
                      }`}
                      style={{ animationDelay: `${si * 0.15}s` }}
                    />
                  ))}
                </div>

                <p className="text-white/50 text-sm leading-[1.75] flex-1 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06] mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand/20">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-white text-sm font-semibold truncate">{t.name}</h5>
                    <p className="text-white/30 text-xs truncate">{t.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: 1 card carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3 }}
              className="card-shimmer glass-glow glass-card-enhanced hover-glow-sm card-3d-tilt p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] relative"
            >
              {/* Large decorative quote mark (mobile) */}
              <span className="absolute top-4 left-6 text-6xl text-brand/10 select-none pointer-events-none">❝</span>

              <div className="reveal-fade relative z-10">
                <Quote className="w-7 h-7 text-brand/20 mb-3" strokeWidth={1.5} />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`w-4 h-4 ${
                        si < Math.floor(testimonials[current].rating)
                          ? "text-safety fill-safety badge-pulse"
                          : "text-white/10"
                      }`}
                      style={{ animationDelay: `${si * 0.15}s` }}
                    />
                  ))}
                </div>
                <p className="text-white/50 text-sm leading-[1.75] mb-5">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold text-sm">
                    {testimonials[current].initials}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-white text-sm font-semibold truncate">{testimonials[current].name}</h5>
                    <p className="text-white/30 text-xs truncate">{testimonials[current].title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-10 h-10 rounded-full bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 disabled:opacity-20 transition-all disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "bg-brand w-8" : "bg-white/15 hover:bg-white/30 w-2"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={current >= maxIndex}
            className="w-10 h-10 rounded-full bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 disabled:opacity-20 transition-all disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
