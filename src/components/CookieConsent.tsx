"use client";

import { useSyncExternalStore, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "cookie-consent";

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === null;
  } catch {
    return true;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

function setConsented() {
  try {
    localStorage.setItem(STORAGE_KEY, "accepted");
  } catch {
    // Storage unavailable
  }
  listeners.forEach((l) => l());
}

export default function CookieConsent() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleAccept = useCallback(() => {
    setConsented();
  }, []);

  const handleLearnMore = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4"
        >
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 p-4 sm:p-5 shadow-2xl">
              {/* Cookie icon */}
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[#F05A00]/15">
                <Cookie className="w-5 h-5 text-[#F05A00]" />
              </div>

              {/* Text content */}
              <p className="flex-1 text-sm text-gray-300 leading-relaxed">
                We use cookies to enhance your experience. By continuing to visit
                this site you agree to our use of cookies.{" "}
                <button
                  type="button"
                  onClick={handleLearnMore}
                  className="text-[#F05A00] hover:text-[#FF7A33] underline underline-offset-2 transition-colors"
                >
                  Learn more
                </button>
              </p>

              {/* Accept button */}
              <button
                type="button"
                onClick={handleAccept}
                className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-[#F05A00] hover:bg-[#D94E00] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
