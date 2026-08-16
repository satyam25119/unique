"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, X } from "lucide-react";
import { faqs } from "@/lib/data";
import type { FAQ } from "@/lib/data";

function FAQItem({ item, isOpen, onToggle }: { item: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="card-shimmer hover-border-gradient group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-brand/15 transition-all duration-300 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 md:p-6 text-left"
        aria-expanded={isOpen}
      >
        {/* Plus/X icon */}
        <span className="shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand transition-colors group-hover:bg-brand/20">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </motion.span>
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-white font-semibold text-sm md:text-[15px] leading-snug">
              {item.question}
            </h3>
          </div>
          <span className="inline-flex text-[10px] font-semibold uppercase tracking-wider text-brand/70 bg-brand/5 border border-brand/10 px-2 py-0.5 rounded-full">
            {item.category}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-[4.25rem]">
              <div className="border-t border-white/[0.05] pt-4">
                <p className="text-white/45 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return faqs;
    const q = search.toLowerCase();
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
    );
  }, [search]);

  const handleToggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0F] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_30%_60%,rgba(240,90,0,0.03),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none grid-bg" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" /> FAQs{" "}
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-[15px]">
            Find answers to common questions about our services, process, and
            capabilities.
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-8 backdrop-blur-card rounded-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-brand/30 focus:bg-white/[0.06] transition-all"
          />
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-3">
          {filtered.length > 0 ? (
            filtered.map((faq, i) => (
              <FAQItem
                key={faq.question}
                item={faq}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-white/30 text-sm">
                No questions match your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
