"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { blogPosts } from "@/lib/data";
import { Factory, Cog, Zap, Calendar, Clock, ArrowRight } from "lucide-react";

const blogIcons: Record<string, React.ReactNode> = {
  Factory: <Factory className="w-8 h-8" />,
  Cog: <Cog className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
};

const readTimes = ["5 min read", "3 min read", "4 min read"];

export default function BlogSection() {
  return (
    <div className="bg-[#0A0A0F] py-16 md:py-24 relative overflow-hidden">
      <div className="dot-pattern absolute inset-0 opacity-[0.03] pointer-events-none" />
      {/* grid-bg overlay */}
      <div className="grid-bg absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4 floating-animation">
              <span className="w-8 h-px bg-brand" /> From Our Desk
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">
              Latest Insights
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-shimmer glass-glow group rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-brand/20 transition-all duration-500 overflow-hidden hover:translate-y-[-4px] card-hover-zoom"
            >
              <div className="h-40 relative overflow-hidden rounded-t-2xl">
                {/* Blog image with fallback gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-white/[0.02]" />
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover-scale-sm"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Gradient overlay at bottom for readability */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/80 to-transparent pointer-events-none" />
                {/* Fallback icon behind image */}
                <div className="absolute inset-0 flex items-center justify-center text-brand/20 pointer-events-none">
                  {blogIcons[post.icon]}
                </div>
                {/* Featured badge - first card only */}
                {i === 0 && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-brand to-brand-light text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-brand/30 z-10">Featured</span>
                )}
              </div>
              <div className="p-6 reveal-fade">
                <span className="inline-block bg-brand/10 text-brand text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                  {post.tag}
                </span>
                <h3 className="font-semibold mb-2 transition-colors line-clamp-2 text-gradient-brand">
                  {post.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-3 text-white/30">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/20">
                      <Clock className="w-3 h-3" /> {readTimes[i] || "3 min read"}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-brand/60 group-hover:text-brand transition-colors font-medium">
                    Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
