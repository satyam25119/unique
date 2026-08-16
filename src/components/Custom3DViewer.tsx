"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export default function Custom3DViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;

    // Detect mobile once on mount (don't update on resize to avoid jarring changes)
    isMobileRef.current = window.innerWidth < 768;
    const isMobile = isMobileRef.current;

    const resize = () => {
      const dprCap = isMobile ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio, dprCap);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;
    };
    const handleMouseLeave = () => { mouseActive = false; };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Parse hex to rgb components
    const hexToRgb = (hex: string): [number, number, number] => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    // Primary particles - brighter, faster (reduced on mobile)
    const particles: Particle[] = [];
    const colors = ["#F05A00", "#FFD000", "#00C97A", "#ffffff", "#FF7A2E"];
    const primaryCount = isMobile ? 15 : 40;
    for (let i = 0; i < primaryCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.5 + Math.random() * 0.5,
      });
    }

    // Secondary particles - dimmer, slower, parallax depth (reduced on mobile)
    const bgParticles: Particle[] = [];
    const bgCount = isMobile ? 8 : 25;
    for (let i = 0; i < bgCount; i++) {
      bgParticles.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500,
        z: 200 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 0.3,
        color: colors[Math.floor(Math.random() * 3)], // Only brand colors, no white
        opacity: 0.15 + Math.random() * 0.2,
      });
    }

    // Gear shape with gradient fill
    const drawGear = (cx: number, cy: number, outerR: number, innerR: number, teeth: number, rotation: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      const step = (Math.PI * 2) / teeth;
      for (let i = 0; i < teeth; i++) {
        const a1 = step * i;
        const a2 = a1 + step * 0.3;
        const a3 = a1 + step * 0.5;
        const a4 = a1 + step * 0.8;
        if (i === 0) ctx.moveTo(Math.cos(a1) * innerR, Math.sin(a1) * innerR);
        else ctx.lineTo(Math.cos(a1) * innerR, Math.sin(a1) * innerR);
        ctx.lineTo(Math.cos(a2) * outerR, Math.sin(a2) * outerR);
        ctx.lineTo(Math.cos(a3) * outerR, Math.sin(a3) * outerR);
        ctx.lineTo(Math.cos(a4) * innerR, Math.sin(a4) * innerR);
      }
      ctx.closePath();

      // Gradient fill
      const [r, g, b] = hexToRgb(color);
      const gearGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, outerR);
      gearGrad.addColorStop(0, `rgba(${r},${g},${b},${alpha * 2})`);
      gearGrad.addColorStop(1, `rgba(${r},${g},${b},${alpha * 0.3})`);
      ctx.fillStyle = gearGrad;
      ctx.fill();

      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 4})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    // Connection lines between nearby primary particles
    const drawConnections = (cx: number, cy: number) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const opacity = (1 - dist / 90) * 0.12;
            ctx.beginPath();
            ctx.moveTo(cx + particles[i].x, cy + particles[i].y);
            ctx.lineTo(cx + particles[j].x, cy + particles[j].y);
            ctx.strokeStyle = `rgba(240,90,0,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Orbiting ring with traveling dot
    const drawOrbitRing = (cx: number, cy: number, scale: number, t: number) => {
      const rx = 160 * scale;
      const ry = 90 * scale;
      const rotation = t * 0.1;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      // Dashed elliptical orbit
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.setLineDash([8, 12]);
      ctx.strokeStyle = "rgba(240,90,0,0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Second orbit ring
      ctx.beginPath();
      ctx.ellipse(0, 0, rx * 0.7, ry * 1.3, Math.PI / 6, 0, Math.PI * 2);
      ctx.setLineDash([4, 16]);
      ctx.strokeStyle = "rgba(0,201,122,0.08)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
      ctx.setLineDash([]);

      // Traveling dot on main orbit
      const dotAngle = t * 0.6;
      const dotX = Math.cos(dotAngle) * rx;
      const dotY = Math.sin(dotAngle) * ry;

      // Dot glow
      const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12);
      dotGlow.addColorStop(0, "rgba(240,90,0,0.4)");
      dotGlow.addColorStop(1, "transparent");
      ctx.fillStyle = dotGlow;
      ctx.fillRect(dotX - 12, dotY - 12, 24, 24);

      // Dot core
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#F05A00";
      ctx.fill();

      // Second traveling dot on secondary orbit
      const dotAngle2 = -t * 0.4 + 2;
      const rx2 = rx * 0.7;
      const ry2 = ry * 1.3;
      const rot2 = Math.PI / 6;
      const dx2 = Math.cos(dotAngle2) * rx2;
      const dy2 = Math.sin(dotAngle2) * ry2;
      const fdx2 = dx2 * Math.cos(rot2) - dy2 * Math.sin(rot2);
      const fdy2 = dx2 * Math.sin(rot2) + dy2 * Math.cos(rot2);

      ctx.beginPath();
      ctx.arc(fdx2, fdy2, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,201,122,0.6)";
      ctx.fill();

      ctx.restore();
    };

    // Central pulsing glow
    const drawCenterGlow = (cx: number, cy: number, t: number) => {
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.8);
      const radius = 80 + pulse * 40;
      const alpha = 0.06 + pulse * 0.04;

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      glow.addColorStop(0, `rgba(240,90,0,${alpha})`);
      glow.addColorStop(0.5, `rgba(255,122,46,${alpha * 0.3})`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Tiny bright core
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8);
      coreGlow.addColorStop(0, `rgba(255,200,150,${0.3 + pulse * 0.2})`);
      coreGlow.addColorStop(1, "transparent");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();
    };

    // Update particles with mouse repulsion
    const updateParticle = (p: Particle, cx: number, cy: number) => {
      const px = cx + p.x;
      const py = cy + p.y;

      if (mouseActive) {
        const mdx = px - mouseX;
        const mdy = py - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 120 && mDist > 0) {
          const force = (120 - mDist) / 120 * 0.8;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }
      }

      // Damping
      p.vx *= 0.98;
      p.vy *= 0.98;

      // Minimum velocity
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const minSpeed = p.size > 1.5 ? 0.15 : 0.05;
      if (speed < minSpeed) {
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;
      }

      p.x += p.vx;
      p.y += p.vy;

      const bound = p.z > 200 ? 250 : 200;
      if (p.x > bound) p.x = -bound;
      if (p.x < -bound) p.x = bound;
      if (p.y > bound) p.y = -bound;
      if (p.y < -bound) p.y = bound;
    };

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      const mainScale = Math.min(w, h) / 500;

      // Background gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
      bgGrad.addColorStop(0, "rgba(240,90,0,0.05)");
      bgGrad.addColorStop(0.5, "rgba(240,90,0,0.02)");
      bgGrad.addColorStop(1, "transparent");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Center glow
      drawCenterGlow(cx, cy, time);

      // Background (parallax) particles - draw first
      bgParticles.forEach((p) => {
        updateParticle(p, cx, cy);
        const scale = 300 / (300 + p.z);
        const [r, g, b] = hexToRgb(p.color);
        ctx.beginPath();
        ctx.arc(cx + p.x * scale, cy + p.y * scale, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity * scale})`;
        ctx.fill();
      });

      // Orbit rings
      drawOrbitRing(cx, cy, mainScale, time);

      // Main gear
      drawGear(cx, cy, 100 * mainScale, 80 * mainScale, 12, time * 0.5, "#F05A00", 0.04);

      // Inner gear
      drawGear(cx, cy, 55 * mainScale, 42 * mainScale, 8, -time * 0.8, "#FFD000", 0.03);

      // Small outer gear
      drawGear(cx + 130 * mainScale, cy - 50 * mainScale, 30 * mainScale, 24 * mainScale, 10, time * 0.7, "#00C97A", 0.03);

      // Connection lines (skip on mobile for performance)
      if (!isMobile) {
        drawConnections(cx, cy);
      }

      // Primary particles
      particles.forEach((p) => {
        updateParticle(p, cx, cy);
        const scale = 200 / (200 + p.z);
        const [r, g, b] = hexToRgb(p.color);
        const screenX = cx + p.x * scale;
        const screenY = cy + p.y * scale;
        const screenSize = p.size * scale;

        // Particle glow
        if (p.size > 1.5) {
          const pGlow = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, screenSize * 3);
          pGlow.addColorStop(0, `rgba(${r},${g},${b},${p.opacity * 0.15})`);
          pGlow.addColorStop(1, "transparent");
          ctx.fillStyle = pGlow;
          ctx.beginPath();
          ctx.arc(screenX, screenY, screenSize * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle core
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.fill();
      });

      // Orbiting dots on circular path (skip on mobile for performance)
      const orbitDotCount = isMobile ? 0 : 5;
      for (let i = 0; i < orbitDotCount; i++) {
        const angle = time * 0.3 + (i * Math.PI * 2) / 5;
        const ox = cx + Math.cos(angle) * 150 * mainScale;
        const oy = cy + Math.sin(angle) * 100 * mainScale;
        const dotColor = ["#F05A00", "#FFD000", "#00C97A", "#FF7A2E", "#ffffff"][i];
        const [r, g, b] = hexToRgb(dotColor);

        // Dot glow
        const dGlow = ctx.createRadialGradient(ox, oy, 0, ox, oy, 10);
        dGlow.addColorStop(0, `rgba(${r},${g},${b},0.3)`);
        dGlow.addColorStop(1, "transparent");
        ctx.fillStyle = dGlow;
        ctx.beginPath();
        ctx.arc(ox, oy, 10, 0, Math.PI * 2);
        ctx.fill();

        // Dot core
        ctx.beginPath();
        ctx.arc(ox, oy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full canvas-container"
      style={{ display: "block" }}
    />
  );
}
