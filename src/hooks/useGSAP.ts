"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal animation hook using IntersectionObserver instead of GSAP.
 * Adds CSS-driven fade-in-up animations to .reveal-text and .service-card-animate elements.
 */
export function useGSAPReveal() {
  useEffect(() => {
    // Inject the CSS keyframes once
    const styleId = "gsap-reveal-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .reveal-text {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-text.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .service-card-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .service-card-animate.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-fade {
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .reveal-fade.revealed {
          opacity: 1;
        }
        .reveal-scale {
          opacity: 0;
          transform: scale(0.92);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-scale.revealed {
          opacity: 1;
          transform: scale(1);
        }
        .reveal-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-left.revealed {
          opacity: 1;
          transform: translateX(0);
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-right.revealed {
          opacity: 1;
          transform: translateX(0);
        }
      `;
      document.head.appendChild(style);
    }

    // Observe all animatable elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    const selectors = [".reveal-text", ".service-card-animate", ".reveal-fade", ".reveal-scale", ".reveal-left", ".reveal-right"];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => observer.observe(el));
    });

    return () => observer.disconnect();
  }, []);
}

// Animated counter hook - uses requestAnimationFrame
export function useCounter(target: number, duration: number = 2) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggeredRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || triggeredRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          observer.disconnect();

          const startTime = performance.now();
          const dur = duration * 1000;

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / dur, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toString();

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(animate);
            } else {
              el.textContent = target.toString();
            }
          };

          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return ref;
}
