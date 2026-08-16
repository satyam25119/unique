"use client";

import { Factory, Cog, Zap, Wrench, Shield, MapPin } from "lucide-react";

const items = [
  { icon: Factory, text: "Crane Erection & Dismantling" },
  { icon: Cog, text: "Gearboxes & Drives" },
  { icon: Zap, text: "VFDs & Electrical" },
  { icon: Wrench, text: "AMC Services" },
  { icon: Shield, text: "Safety Devices" },
  { icon: MapPin, text: "Pan-India Projects" },
];

export default function TickerStrip() {
  return (
    <div className="bg-brand/10 relative overflow-hidden marquee-mask">
      {/* Subtle divider line above */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      {/* Subtle divider line below */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

      {/* Left gradient fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#07070D] to-transparent z-10 pointer-events-none" />
      {/* Right gradient fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#07070D] to-transparent z-10 pointer-events-none" />

      <div className="ticker-animate flex gap-12 whitespace-nowrap w-max py-3">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-brand/80 text-sm font-medium"
          >
            <item.icon className="w-4 h-4" />
            {item.text}
          </span>
        ))}
      </div>
      {/* Animated glow line divider */}
      <div className="glow-line" />
    </div>
  );
}