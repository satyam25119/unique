"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BentoItem from "@/components/BentoItem";
import { productCategories } from "@/lib/data";
import { Search, X, ChevronRight, Factory, Link, Cog, Zap, Shield, Wrench, ClipboardCheck, CircuitBoard, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

const iconComponents: Record<string, React.ReactNode> = {
  Factory: <Factory className="w-6 h-6" />,
  Link: <Link className="w-6 h-6" />,
  Cog: <Cog className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  ClipboardCheck: <ClipboardCheck className="w-6 h-6" />,
  CircuitBoard: <CircuitBoard className="w-6 h-6" />,
};

export default function ProductsSection() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = productCategories.filter((cat) => {
    const matchSearch =
      search === "" ||
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.items.some((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
    const matchCategory = !selectedCategory || cat.slug === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="bg-[#07070D] py-16 md:py-24 relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="noise-bg absolute inset-0 pointer-events-none" />
      {/* Dot pattern overlay */}
      <div className="dot-pattern absolute inset-0 opacity-[0.015] pointer-events-none" />
      {/* Decorative large gear icon watermark */}
      <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-[0.05]">
        <Settings className="w-80 h-80 text-brand" strokeWidth={0.5} />
      </div>
      {/* Subtle decorative radial glow top-left */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand/[0.03] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" /> Catalogue <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="reveal-text text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Products & Engineering Solutions
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            &quot;Built for precision. Designed to perform.&quot;
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder="Search products, parts, services…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 h-11 rounded-xl focus:border-brand/50"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Cards Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {productCategories.map((cat, i) => (
            <div key={cat.slug} className="relative card-shimmer">
              {/* Numbered watermark */}
              <span className="absolute -top-2 -right-1 text-6xl font-black text-white/[0.03] leading-none pointer-events-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <BentoItem
                title={cat.title}
                subtitle={cat.description}
                icon={iconComponents[cat.icon] || <Wrench className="w-6 h-6" />}
                index={i}
                variant={selectedCategory === cat.slug ? "accent" : "default"}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.slug ? null : cat.slug
                  )
                }
                className={
                  (i === 0
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-1"
                    : "") + " hover-scale-sm"
                }
              >
                <span className="text-white/30 text-xs">
                  {cat.items.length} items
                </span>
              </BentoItem>
            </div>
          ))}
        </div>

        {/* Full Inventory List */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            Complete Product List
          </h3>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-brand text-sm hover:text-brand-light flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Clear Filter
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredCategories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="card-shimmer rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:border-brand/30 transition-colors"
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.04] bg-white/[0.02]">
                  <div className="text-brand">
                    {iconComponents[cat.icon] || <Wrench className="w-5 h-5" />}
                  </div>
                  <h4 className="text-white font-semibold flex-1">
                    {cat.title}
                  </h4>
                  <span className="text-white/30 text-xs bg-white/5 px-2.5 py-1 rounded-full">
                    {cat.items.length} items
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/[0.04]">
                  {cat.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0F] hover:bg-white/[0.03] transition-colors text-white/60 text-sm group"
                    >
                      <ChevronRight className="w-3 h-3 text-brand/40 group-hover:text-brand transition-colors" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-16 text-white/30">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No products found matching your search.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
