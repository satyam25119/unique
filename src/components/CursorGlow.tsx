"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();

    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 128}px, ${e.clientY - 128}px)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-[1]"
      style={{
        background:
          "radial-gradient(circle, rgba(240,90,0,0.06) 0%, transparent 70%)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
