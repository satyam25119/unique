"use client";

import { useState, useEffect } from "react";
import { HardHat } from "lucide-react";

export default function PageLoader() {
  const [visible, setVisible] = useState<boolean>(true);
  const [unmount, setUnmount] = useState<boolean>(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    const unmountTimer = setTimeout(() => {
      setUnmount(true);
    }, 1900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (unmount) return null;

  return (
    <>
      <div
        className={`
          fixed inset-0 z-[9999] flex flex-col items-center justify-center
          bg-[#07070D]
          transition-all duration-500 ease-out
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"}
        `}
        aria-hidden={!visible}
      >
        {/* Logo */}
        <div className="relative mb-8">
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 rounded-xl bg-[#F05A00]/20 blur-2xl animate-pulse" />
          <div
            className="loader-logo relative w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #F05A00, #FF8C3A)",
            }}
          >
            <HardHat className="w-8 h-8 text-white" strokeWidth={1.8} />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mb-10">
          <h1 className="text-white text-xl font-bold tracking-tight">
            Unique Engineering
          </h1>
          <p className="text-[#F05A00] text-xs font-semibold tracking-[0.35em] mt-1.5 uppercase">
            Engineering
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
          <div className="loader-progress h-full bg-gradient-to-r from-[#F05A00] to-[#FF8C3A] rounded-full" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loaderPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(240, 90, 0, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px 4px rgba(240, 90, 0, 0.15);
          }
        }
        @keyframes loaderProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .loader-logo {
          animation: loaderPulse 1.5s ease-in-out infinite;
        }
        .loader-progress {
          animation: loaderProgress 1.5s ease-in-out forwards;
        }
      `}} />
    </>
  );
}
