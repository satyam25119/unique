"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryItems, type GalleryItem } from "@/lib/data";
import {
  X, Expand, ExternalLink,
} from "lucide-react";

const categories = [
  { key: "all", label: "All Projects" },
  { key: "crane", label: "Crane Erection" },
  { key: "gearbox", label: "Gearbox" },
  { key: "electrical", label: "VFD & Electrical" },
  { key: "amc", label: "AMC & Service" },
  { key: "safety", label: "Safety" },
];
const categoryColors: Record<string, string> = {
  crane: "from-brand/30 to-brand/5",
  gearbox: "from-yellow-500/20 to-yellow-500/5",
  electrical: "from-blue-500/20 to-blue-500/5",
  amc: "from-emerald-500/20 to-emerald-500/5",
  safety: "from-red-500/20 to-red-500/5",
};

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-[#111118] rounded-2xl border border-white/[0.08] overflow-hidden max-w-2xl w-full shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] bg-black/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={"/gallery/gallery-" + item.id + ".webp"}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className={"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r " + (categoryColors[item.category] || "from-brand/30 to-brand/5") + " text-white backdrop-blur-sm border border-white/10"}>
              {item.category}
            </span>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
          <p className="text-brand text-sm font-medium mb-3">{item.subtitle}</p>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            {item.description}
          </p>
          <div className="flex gap-3">
            <a
              href="tel:+918076441377"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-light text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-brand/25 btn-press"
            >
              <ExternalLink className="w-4 h-4" /> Enquire Now
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/[0.08] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [visibleItems, setVisibleItems] = useState<GalleryItem[]>([]);
  const allFiltered = filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  // Stagger-render items to avoid Turbopack parsing issue with AnimatePresence
  const [batchIndex, setBatchIndex] = useState(0);
  const BATCH_SIZE = 4;

  useEffect(() => {
    const items = [...allFiltered];
    const batch = items.slice(0, BATCH_SIZE);
    setVisibleItems(batch);
    setBatchIndex(BATCH_SIZE);
  }, [allFiltered, BATCH_SIZE]);

  const hasMore = batchIndex < allFiltered.length;

  return (
    <div className="bg-[#07070D] py-16 md:py-24 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0 h-px" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-brand/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" /> Our Work{" "}
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="reveal-text text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Project Gallery
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            &quot;Real projects. Real results. Across India.&quot;
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setFilter(cat.key); setBatchIndex(0); }}
              className={
                "px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 " +
                (filter === cat.key
                  ? "bg-gradient-to-r from-brand to-brand-light text-white shadow-lg shadow-brand/25"
                  : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10")
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-center text-white/25 text-xs mb-8">
          Showing {Math.min(visibleItems.length, allFiltered.length)} of {allFiltered.length} projects
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visibleItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onClick={() => setLightbox(item)}
              className="card-shimmer glass-glow group relative aspect-[4/3] rounded-2xl cursor-pointer overflow-hidden hover-lift"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={"/gallery/gallery-" + item.id + ".webp"}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-brand/0 group-hover:border-brand/60 transition-all duration-500 pointer-events-none rounded-tl-sm" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-brand/0 group-hover:border-brand/60 transition-all duration-500 pointer-events-none rounded-br-sm" />

              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-semibold text-sm mb-0.5 truncate">{item.title}</h4>
                <p className="text-brand/80 text-xs font-medium truncate">{item.subtitle}</p>
              </div>

              <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Expand className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() => { setBatchIndex((prev) => prev + BATCH_SIZE); }}
            className="mx-auto mt-8 inline-flex items-center gap-2 text-brand text-sm font-medium hover:text-brand-light transition-colors"
          >
            Load More Projects ({Math.max(0, allFiltered.length - visibleItems.length)} remaining)
          </button>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
