"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { navItems, siteConfig, services, productCategories, faqs, blogPosts, timeline, coreValues, processSteps, whyUs } from "@/lib/data";
import {
  Menu,
  X,
  Phone,
  HardHat,
  Search,
  ChevronRight,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchItem {
  title: string;
  description: string;
  section: string;
  category: string;
}

const searchData: SearchItem[] = [
  { title: "Home", description: "Unique Engineering – Crane & Engineering Solutions", section: "home", category: "Section" },
  { title: "About Us", description: "Engineering excellence since 2010, our team, vision, mission and core values", section: "about", category: "Section" },
  { title: "Products", description: "Crane erection, wire ropes, gearboxes, VFDs, safety devices, hoist spares, motors and AMC services", section: "products", category: "Section" },
  { title: "Services", description: "Our engineering services, process steps, industries served and why choose us", section: "services", category: "Section" },
  { title: "Gallery", description: "Our completed projects across India – crane erection, gearbox, VFD and safety installations", section: "gallery", category: "Section" },
  { title: "Blog", description: "Engineering insights, crane safety tips and technology updates", section: "blog", category: "Section" },
  { title: "Contact Us", description: "Get in touch with our engineering team – phone, email, WhatsApp, or form", section: "contact", category: "Section" },
  { title: "Frequently Asked Questions", description: "Common questions about our crane and engineering services", section: "about", category: "FAQ" },
  ...services.map((s) => ({ title: s.title, description: s.subtitle, section: "services", category: "Service" })),
  ...productCategories.map((p) => ({ title: p.title, description: p.description, section: "products", category: "Product Category" })),
  ...productCategories.flatMap((p) => p.items.map((item) => ({ title: item, description: `Part of ${p.title}`, section: "products", category: "Product" }))),
  ...faqs.map((f) => ({ title: f.question, description: f.answer, section: "about", category: "FAQ" })),
  ...blogPosts.map((b) => ({ title: b.title, description: b.excerpt, section: "blog", category: "Blog" })),
  ...timeline.map((t) => ({ title: `${t.year} — ${t.title}`, description: t.description, section: "about", category: "Timeline" })),
  ...coreValues.map((v) => ({ title: v.title, description: v.description, section: "about", category: "Core Value" })),
  ...processSteps.map((p) => ({ title: p.title, description: p.description, section: "services", category: "Process" })),
  ...whyUs.map((w) => ({ title: w.title, description: w.description, section: "services", category: "Why Us" })),
];

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return searchData
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [searchQuery]);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setHighlightedIndex(-1);
  }, []);

  const handleNav = useCallback(
    (section: string) => {
      onNavigate(section);
      setMobileOpen(false);
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [onNavigate]
  );

  const navigateToResult = useCallback(
    (item: SearchItem) => {
      closeSearch();
      handleNav(item.section);
    },
    [closeSearch, handleNav]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close search when clicking outside
  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        const target = e.target as HTMLElement;
        if (!target.closest('[aria-label="Search"]')) {
          closeSearch();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen, closeSearch]);

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-brand-dark via-brand to-brand-light text-white text-xs py-1.5 px-4 text-center tracking-wide font-medium hidden md:block relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <span className="relative z-10 inline-flex items-center gap-2">
          <Phone className="w-3 h-3" />
          Call us: {siteConfig.phone} &nbsp;&bull;&nbsp; Mon–Sat: 9 AM – 7 PM &nbsp;&bull;&nbsp;
          <span className="animate-pulse">Free Consultation Available</span>
        </span>
      </div>

      {/* Main Nav */}
      <header
        className={`fixed top-0 md:top-7 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-heavy bg-black/75 border-b border-white/[0.08] shadow-2xl shadow-black/30"
            : "bg-gradient-to-b from-black/40 to-transparent"
        } ${mobileOpen ? "!bg-black/95 !top-0 !backdrop-blur-2xl" : ""}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center shadow-lg shadow-brand/30 group-hover:shadow-brand/50 group-hover:scale-105 transition-all duration-300">
                <HardHat className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-white text-[15px] leading-tight tracking-tight">
                  Unique
                </div>
                <div className="text-[10px] text-brand-light uppercase tracking-[0.25em] leading-tight font-semibold">
                  Engineering
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <li key={item.section}>
                  <button
                    onClick={() => handleNav(item.section)}
                    className={`relative px-3.5 xl:px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 group ${
                      activeSection === item.section
                        ? "text-white"
                        : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    {item.cta ? (
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-brand to-brand-light hover:from-brand-light hover:to-brand text-white px-4 py-2 rounded-lg font-semibold shadow-lg shadow-brand/25 hover:shadow-brand/40 transition-all duration-300 btn-press">
                        {item.label}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="relative z-10">{item.label}</span>
                    )}
                    {/* Active indicator pill */}
                    {activeSection === item.section && !item.cta && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/[0.08] rounded-lg border border-white/[0.08]"
                        style={{
                          boxShadow: "0 0 15px rgba(240,90,0,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {/* Hover underline effect for non-CTA */}
                    {!item.cta && activeSection !== item.section && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-brand/60 group-hover:w-6 transition-all duration-300" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop Social Links */}
            <div className="hidden xl:flex items-center gap-1">
              {[
                { Icon: Linkedin, href: "https://linkedin.com/company/unique-engineering", label: "LinkedIn" },
                { Icon: Instagram, href: "https://instagram.com/uniqueengineering", label: "Instagram" },
                { Icon: Youtube, href: "https://youtube.com/@uniqueengineering", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-brand hover:bg-brand/10 hover:border-brand/20 transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            {/* Right: Search + Mobile Toggle */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:flex w-9 h-9 rounded-lg bg-white/[0.06] items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] transition-all duration-300"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  mobileOpen
                    ? "bg-brand text-white"
                    : "bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white"
                }`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="hidden md:block overflow-hidden border-t border-white/[0.06]"
              >
                <div className="py-3 relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setHighlightedIndex(-1);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          closeSearch();
                        } else if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setHighlightedIndex((prev) =>
                            prev < searchResults.length - 1 ? prev + 1 : 0
                          );
                        } else if (e.key === "ArrowUp") {
                          e.preventDefault();
                          setHighlightedIndex((prev) =>
                            prev > 0 ? prev - 1 : searchResults.length - 1
                          );
                        } else if (e.key === "Enter") {
                          e.preventDefault();
                          const idx = highlightedIndex >= 0 ? highlightedIndex : 0;
                          if (searchResults[idx]) {
                            navigateToResult(searchResults[idx]);
                          }
                        }
                      }}
                      placeholder="Search services, products..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] text-white text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-brand/40 placeholder:text-white/25 transition-colors"
                      autoFocus
                    />
                  </div>

                  {/* Search Dropdown */}
                  {searchQuery.trim() && (
                    <div
                      ref={searchDropdownRef}
                      className="absolute top-full left-0 right-0 mt-1 bg-[#111118] border border-white/[0.08] rounded-xl max-h-80 overflow-y-auto z-50"
                    >
                      {searchResults.length > 0 ? (
                        searchResults.map((item, i) => (
                          <button
                            key={`${item.title}-${i}`}
                            onClick={() => navigateToResult(item)}
                            onMouseEnter={() => setHighlightedIndex(i)}
                            className={`w-full text-left px-4 py-3 text-sm cursor-pointer transition-colors flex items-start gap-3 border-b border-white/[0.04] last:border-b-0 ${
                              i === highlightedIndex
                                ? "text-white bg-white/[0.05]"
                                : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                            }`}
                          >
                            <span className="shrink-0 inline-block text-[10px] font-semibold uppercase tracking-wider text-brand/60 bg-brand/10 px-1.5 py-0.5 rounded mt-0.5">
                              {item.category}
                            </span>
                            <div className="min-w-0">
                              <div className="font-medium truncate">{item.title}</div>
                              <div className="text-white/40 text-xs truncate mt-0.5">{item.description}</div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center text-white/40 text-sm">
                          No results found for &ldquo;{searchQuery}&rdquo;
                        </div>
                      )}
                    </div>
                  )}

                  {!searchQuery.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#111118] border border-white/[0.08] rounded-xl z-50">
                      <div className="px-4 py-4 text-center text-white/30 text-sm">
                        Start typing to search...
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-white/[0.06]"
            >
              <div className="px-4 py-5 space-y-1.5 max-h-[70vh] overflow-y-auto">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => handleNav(item.section)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-between group ${
                      activeSection === item.section
                        ? "bg-brand/15 text-brand-light border border-brand/25 shadow-lg shadow-brand/5"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent"
                    } ${item.cta ? "!bg-gradient-to-r !from-brand !to-brand-light !text-white !border-0 mt-4 shadow-lg shadow-brand/25" : ""}`}
                  >
                    <span>{item.label}</span>
                    {!item.cta && (
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${activeSection === item.section ? "text-brand" : "text-white/20"}`} />
                    )}
                  </motion.button>
                ))}

                {/* Mobile Social Links */}
                <div className="flex items-center gap-2 px-4">
                  {[
                    { Icon: Linkedin, href: "https://linkedin.com/company/unique-engineering", label: "LinkedIn" },
                    { Icon: Instagram, href: "https://instagram.com/uniqueengineering", label: "Instagram" },
                    { Icon: Youtube, href: "https://youtube.com/@uniqueengineering", label: "YouTube" },
                    { Icon: Mail, href: siteConfig.emailHref, label: "Email" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-brand hover:bg-brand/10 hover:border-brand/20 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>

                {/* Mobile Contact Quick Actions */}
                <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-2">
                  <a
                    href={siteConfig.phoneHref}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.04] transition-all text-sm"
                  >
                    <Phone className="w-4 h-4 text-brand" />
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
