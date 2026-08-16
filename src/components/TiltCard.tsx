"use client";

import { useRef, useState, useCallback, useEffect, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltMax?: number;
}

export default function TiltCard({ children, className = "", tiltMax = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDesktopRef = useRef(false);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.15s ease-out",
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  useEffect(() => {
    isDesktopRef.current = window.innerWidth >= 768;
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isDesktopRef.current || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateY = (mouseX / (rect.width / 2)) * tiltMax;
      const rotateX = -(mouseY / (rect.height / 2)) * tiltMax;
      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      });
      const glareX = 50 - (mouseX / rect.width) * 100;
      const glareY = 50 - (mouseY / rect.height) * 100;
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const maxDist = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
      const opacity = Math.max(0, 1 - distance / maxDist) * 0.15;
      setGlareStyle({
        opacity,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25), transparent 60%)`,
      });
    },
    [tiltMax],
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.4s ease-out",
    });
    setGlareStyle({ opacity: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-card-inner relative">
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 transition-opacity duration-200"
          style={glareStyle}
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  );
}
