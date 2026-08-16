"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, GripVertical } from "lucide-react";

const projects = [
  {
    title: "EOT Crane Erection — Noida",
    location: "Noida, UP",
    category: "Crane Erection",
    description:
      "Complete 10T EOT crane erection and commissioning at a manufacturing facility with zero downtime.",
  },
  {
    title: "Gearbox Overhaul — Delhi NCR",
    location: "Gurgaon, HR",
    category: "Gearbox",
    description:
      "Full gearbox overhaul and realignment for heavy-duty industrial application, restoring peak performance.",
  },
  {
    title: "VFD Panel Installation",
    location: "Faridabad, HR",
    category: "Electrical",
    description:
      "Custom VFD panel design, installation, and integration for energy-efficient motor control.",
  },
  {
    title: "Tower Crane Dismantling",
    location: "Mumbai, MH",
    category: "Crane Dismantling",
    description:
      "Safe and systematic dismantling of a 12T tower crane from a high-rise construction site.",
  },
  {
    title: "Safety Device Retrofit",
    location: "Pune, MH",
    category: "Safety Devices",
    description:
      "Retrofit of modern safety devices including load limiters, anti-collision systems, and limit switches.",
  },
  {
    title: "Industrial AMC Setup",
    location: "Chennai, TN",
    category: "AMC",
    description:
      "Comprehensive annual maintenance contract covering 15+ cranes with 24/7 emergency support.",
  },
];

const beforeGradients = [
  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)",
  "linear-gradient(135deg, #1c1c1c 0%, #2a2a3a 50%, #12121c 100%)",
  "linear-gradient(135deg, #181825 0%, #1e1e30 50%, #0e0e18 100%)",
  "linear-gradient(135deg, #1a1a28 0%, #20203a 50%, #10101c 100%)",
  "linear-gradient(135deg, #1c1c2a 0%, #1a1a2e 50%, #0d0d15 100%)",
  "linear-gradient(135deg, #1b1b29 0%, #222238 50%, #111119 100%)",
];

const afterGradients = [
  "linear-gradient(135deg, rgba(240,90,0,0.3) 0%, #0A0A0F 60%, rgba(240,90,0,0.1) 100%)",
  "linear-gradient(135deg, rgba(240,90,0,0.25) 0%, #0A0A0F 50%, rgba(240,90,0,0.15) 100%)",
  "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, #0A0A0F 60%, rgba(240,90,0,0.1) 100%)",
  "linear-gradient(135deg, rgba(240,90,0,0.2) 0%, #0A0A0F 50%, rgba(16,185,129,0.15) 100%)",
  "linear-gradient(135deg, rgba(239,68,68,0.2) 0%, #0A0A0F 60%, rgba(240,90,0,0.15) 100%)",
  "linear-gradient(135deg, rgba(240,90,0,0.25) 0%, #0A0A0F 40%, rgba(59,130,246,0.1) 100%)",
];

const categoryColors: Record<string, string> = {
  "Crane Erection": "bg-brand/20 text-brand border-brand/30",
  Gearbox: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Electrical: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Crane Dismantling": "bg-red-500/20 text-red-400 border-red-500/30",
  "Safety Devices": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  AMC: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function BeforeAfterSlider({ index }: { index: number }) {
  const [position, setPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={sliderRef}
      className="relative aspect-[4/3] w-full cursor-col-resize select-none overflow-hidden rounded-xl"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Before layer */}
      <div
        className="absolute inset-0"
        style={{ background: beforeGradients[index] }}
      >
        {/* Decorative elements for before state */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 opacity-20">
            <div className="w-16 h-1 bg-white/30 rounded" />
            <div className="w-12 h-1 bg-white/20 rounded" />
            <div className="w-14 h-1 bg-white/25 rounded" />
          </div>
        </div>
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white/40 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
          Before
        </span>
      </div>

      {/* After layer (clipped) */}
      <div
        className="absolute inset-0"
        style={{
          background: afterGradients[index],
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        {/* Decorative elements for after state */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand/40" />
            <div className="w-8 h-0.5 bg-brand/30 rounded" />
            <div className="w-5 h-5 rounded-md border border-brand/30 bg-brand/10" />
          </div>
        </div>
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-brand/80 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
          After
        </span>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-white/70"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        {/* Circular handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/40 border-2 border-white">
          <GripVertical className="w-4 h-4 text-gray-700" />
        </div>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export default function ProjectShowcaseSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-brand bg-brand/10 border border-brand/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            Featured Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Engineering Excellence{" "}
            <span className="bg-gradient-to-r from-brand to-orange-400 bg-clip-text text-transparent">
              in Action
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/50 leading-relaxed">
            Explore our real-world project transformations — from initial assessment to
            completed execution. Drag the slider to see the difference.
          </p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] card-shimmer hover-glow-sm transition-all duration-300"
            >
              {/* Before/after slider */}
              <BeforeAfterSlider index={idx} />

              {/* Card content */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${categoryColors[project.category] || "bg-white/10 text-white/60 border-white/10"}`}
                  >
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-white/40">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white leading-snug mb-2 group-hover:text-brand/90 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
