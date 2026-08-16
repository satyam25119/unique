"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState<number>(0);
  const initialized = useRef(false);

  const updateProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? scrollY / docHeight : 0;
    setProgress(Math.min(Math.max(pct, 0), 1));
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      // Set initial progress without triggering effect re-run
      requestAnimationFrame(updateProgress);
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px]"
      aria-hidden="true"
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(to right, transparent 0%, #F05A00 30%, #FF8C3A 100%)",
          boxShadow: "0 0 8px rgba(240, 90, 0, 0.6)",
        }}
      />
    </div>
  );
}
