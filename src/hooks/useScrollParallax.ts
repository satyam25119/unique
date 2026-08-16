"use client";

import { useState, useEffect, useCallback, type CSSProperties } from "react";

/**
 * Hook that applies a scroll-based parallax translateY effect.
 *
 * @param speed  Multiplier for the scroll offset (default 0.1). Clamped to [-0.5, 0.5].
 * @returns A tuple [callbackRef, style] to attach to the target element.
 */
export function useScrollParallax(speed = 0.1) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [transform, setTransform] = useState<CSSProperties["transform"]>("translateY(0px)");
  const clampedSpeed = Math.max(-0.5, Math.min(0.5, speed));

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    const el = element;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (isVisible) {
          const scrollY = window.scrollY;
          const offset = scrollY * clampedSpeed;
          setTransform(`translateY(${offset.toFixed(2)}px)`);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [element, clampedSpeed]);

  const style: CSSProperties = {
    transform,
    willChange: "transform",
  };

  return { ref, style };
}
