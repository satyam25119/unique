"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import BentoItem from "@/components/BentoItem";
import { useCounter } from "@/hooks/useGSAP";
import {
  Shield, Star, Handshake, Lightbulb, Eye, Target,
  User, Clock, Award, Search,
} from "lucide-react";
import { coreValues, team, timeline, stats, siteConfig } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Handshake: <Handshake className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
};

const teamIconMap: Record<string, React.ReactNode> = {
  Calendar: <Clock className="w-5 h-5" />,
  ProjectDiagram: <Award className="w-5 h-5" />,
  Users: <User className="w-5 h-5" />,
  Globe: <Eye className="w-5 h-5" />,
};

function MiniStat({ value, suffix, label, icon }: (typeof stats)[0]) {
  const ref = useCounter(value);
  return (
    <div className="text-center p-3 md:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <div className="flex justify-center mb-1 text-brand">
        {teamIconMap[icon]}
      </div>
      <div className="flex items-baseline justify-center gap-0.5">
        <span ref={ref} className="text-2xl md:text-3xl font-black text-white tabular-nums">
          0
        </span>
        <span className="text-2xl md:text-3xl font-black text-brand">{suffix}</span>
      </div>
      <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [faqFilter, setFaqFilter] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!faqFilter.trim()) return faqs;
    const q = faqFilter.toLowerCase();
    return faqs.filter((f) => f.question.toLowerCase().includes(q));
  }, [faqFilter]);

  return (
    <div className="bg-[#0A0A0F]">
      {/* About Intro */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-8 h-px bg-brand" /> Who We Are
              </div>
              <h2 className="reveal-text text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Engineering Excellence
                <br />
                <span className="text-brand">Since 2010</span>
              </h2>
              <p className="reveal-text text-white/50 leading-relaxed mb-4">
                Unique Engineering is a Delhi-NCR-based engineering service provider
                specialising in crane erection and dismantling, mechanical systems,
                and maintenance solutions. Founded and led by Mr. Pankaj Kumar,
                we&apos;re committed to delivering quality, safety, and innovation
                to every project — big or small, across India.
              </p>
              <p className="reveal-text text-white/50 leading-relaxed mb-6">
                Our expertise spans industrial crane solutions, VFDs, gearboxes,
                safety devices, and comprehensive AMC services, making us a trusted
                partner for construction firms and industrial facilities nationwide.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Safety Certified", "IS Standards", "Pan-India"].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 bg-brand/10 text-brand text-xs font-semibold px-3 py-1.5 rounded-full border border-brand/20"
                  >
                    <Shield className="w-3 h-3" /> {b}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <MiniStat key={s.label} {...s} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-brand" /> Purpose & Direction
              <span className="w-8 h-px bg-brand" />
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">
              Vision & Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-brand/10 to-transparent border border-brand/20"
            >
              <Eye className="w-8 h-8 text-brand mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-white/50 leading-relaxed">
                To be India&apos;s most trusted engineering partner for complex,
                high-stakes infrastructure and industrial projects — known for
                safety, quality, and reliability. We aim to set the benchmark for
                crane and mechanical engineering services across the country.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-success/10 to-transparent border border-success/20"
            >
              <Target className="w-8 h-8 text-success mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-white/50 leading-relaxed">
                To deliver exceptional crane and engineering solutions with
                uncompromising safety standards, technical expertise, and
                client-first values. We build long-term partnerships that extend
                far beyond project completion through dedicated AMC and support
                services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-brand" /> What We Stand For
              <span className="w-8 h-px bg-brand" />
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => (
              <BentoItem
                key={v.title}
                title={v.title}
                subtitle={v.description}
                icon={iconMap[v.icon]}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-brand" /> The People
              <span className="w-8 h-px bg-brand" />
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">
              Meet Our Team
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-lg`}
                >
                  {member.initials}
                </div>
                <h4 className="text-white font-semibold mb-1">{member.name}</h4>
                <p className="text-brand text-xs font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-white/40 text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-brand" /> Our Journey
              <span className="w-8 h-px bg-brand" />
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">
              A Decade of Growth
            </h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand/50 via-brand/20 to-transparent" />
            <div className="space-y-8">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-brand border-4 border-[#0A0A0F] -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10 shadow-lg shadow-brand/30" />
                  <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="inline-block bg-brand/20 text-brand text-xs font-bold px-3 py-1 rounded-full mb-2">
                      {entry.year}
                    </span>
                    <h4 className="text-white font-semibold mb-1">
                      {entry.title}
                    </h4>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-brand" /> Common Questions
              <span className="w-8 h-px bg-brand" />
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={faqFilter}
              onChange={(e) => setFaqFilter(e.target.value)}
              placeholder="Filter questions..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white pl-10 pr-4 py-2.5 focus:outline-none focus:border-brand/40 placeholder:text-white/30 transition-colors"
            />
          </div>
          <div className="text-xs text-white/30 mb-4">
            Showing {filteredFaqs.length} of {faqs.length} questions
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {filteredFaqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 data-[state=open]:bg-white/[0.05]"
              >
                <AccordionTrigger className="text-white text-left text-sm font-medium hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/50 text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
