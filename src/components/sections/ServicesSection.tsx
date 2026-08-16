"use client";

import { motion } from "framer-motion";
import BentoItem from "@/components/BentoItem";
import { services, processSteps, industries, stats } from "@/lib/data";
import { useCounter } from "@/hooks/useGSAP";
import {
  Factory, Cog, Zap, Wrench, Shield, HardHat, CheckCircle, ArrowRight,
  Building, Warehouse, Route, Timer, Settings, MapPin, Award, Calendar, User,
} from "lucide-react";

const iconComponents: Record<string, React.ReactNode> = {
  Factory: <Factory className="w-6 h-6" />,
  Cog: <Cog className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  HardHat: <HardHat className="w-6 h-6" />,
};

const industryIcons: Record<string, React.ReactNode> = {
  Building: <Building className="w-5 h-5" />,
  Warehouse: <Warehouse className="w-5 h-5" />,
  Route: <Route className="w-5 h-5" />,
  HardHat: <HardHat className="w-5 h-5" />,
};

const whyIcons: Record<string, React.ReactNode> = {
  Timer: <Timer className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
};

export default function ServicesSection() {
  return (
    <div className="bg-[#0A0A0F]">
      {/* Stats */}
      <section className="py-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-brand/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold">
                  <span className="text-gradient-animated">{s.value}</span>
                  <span className="text-brand">{s.suffix}</span>
                </div>
                <p className="text-white/40 text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-brand" /> Core Services{" "}
              <span className="w-8 h-px bg-brand" />
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Everything We Do
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              End-to-end crane and engineering solutions for industrial, construction, and infrastructure sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ring-brand rounded-2xl p-0.5">
            {services.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="service-card-animate card-shimmer glass-glow group rounded-2xl bg-white/[0.03] border border-white/[0.06] border-t-0 hover:bg-white/[0.05] hover:border-brand/20 hover:border-t-brand/30 transition-all duration-500 overflow-hidden relative"
              >
                <div className="text-white/[0.03] text-4xl font-black absolute top-4 right-5 select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                      {iconComponents[service.icon]}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-brand-light transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-white/50 text-sm">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-brand" /> Our Process{" "}
              <span className="w-8 h-px bg-brand" />
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">
              How We Deliver Every Project
            </h2>
          </div>
          <div className="relative">
            {/* Horizontal connecting line on desktop */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-brand/20 via-brand/10 to-brand/5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-brand group-hover:text-brand-light transition-colors">
                    {step.num}
                  </span>
                </div>
                <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">
                  {step.description}
                </p>
                {i < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand/30 z-10" />
                )}
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="grid-bg absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-brand" /> Industries{" "}
              <span className="w-8 h-px bg-brand" />
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">
              Sectors We Serve
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <BentoItem
                key={ind.title}
                title={ind.title}
                subtitle={ind.description}
                icon={industryIcons[ind.icon]}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
