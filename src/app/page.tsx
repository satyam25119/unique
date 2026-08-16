"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TickerStrip from "@/components/sections/TickerStrip";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const ProductsSection = dynamic(() => import("@/components/sections/ProductsSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const GallerySection = dynamic(() => import("@/components/sections/GallerySection"), { ssr: false, loading: () => <SectionSkeleton /> });
const BlogSection = dynamic(() => import("@/components/sections/BlogSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const ProcessTimelineSection = dynamic(() => import("@/components/sections/ProcessTimelineSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const IndustriesSection = dynamic(() => import("@/components/sections/IndustriesSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const PartnersTicker = dynamic(() => import("@/components/sections/PartnersTicker"), { ssr: false, loading: () => <SectionSkeleton /> });
const CTABanner = dynamic(() => import("@/components/sections/CTABanner"), { ssr: false, loading: () => <SectionSkeleton /> });
const AchievementsSection = dynamic(() => import("@/components/sections/AchievementsSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const ProjectShowcaseSection = dynamic(() => import("@/components/sections/ProjectShowcaseSection"), { ssr: false, loading: () => <SectionSkeleton /> });
const ServiceAreasSection = dynamic(() => import("@/components/sections/ServiceAreasSection"), { ssr: false, loading: () => <SectionSkeleton /> });
import {
  MessageCircle, Phone, Factory, Cog, Zap, Wrench, Shield,
  HardHat, Timer, Settings, MapPin, Award, ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useGSAPReveal } from "@/hooks/useGSAP";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import PageLoader from "@/components/PageLoader";
import CursorGlow from "@/components/CursorGlow";
import TiltCard from "@/components/TiltCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import AIChatWidget from "@/components/AIChatWidget";
import CookieConsent from "@/components/CookieConsent";

function SectionSkeleton() {
  return (
    <div className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-white/5 rounded-full mx-auto" />
          <div className="h-8 w-64 bg-white/5 rounded-lg mx-auto" />
          <div className="h-3 w-48 bg-white/5 rounded-full mx-auto" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-white/[0.02] border border-white/[0.04]" />
          ))}
        </div>
      </div>
    </div>
  );
}

const sections = ["home", "about", "products", "services", "gallery", "blog", "contact"] as const;
type Section = (typeof sections)[number];

const homeServices = [
  { title: "Crane Erection & Dismantling", desc: "Professional setup and dismantling of overhead, EOT, and tower cranes at industrial sites.", Icon: Factory },
  { title: "Gearbox Solutions", desc: "Supply, installation, and repair of heavy-duty gearboxes for crane and industrial drives.", Icon: Cog },
  { title: "VFDs & Electrical", desc: "Variable frequency drive installation, electrical panel wiring, and commissioning services.", Icon: Zap },
  { title: "AMC & Breakdown", desc: "Annual maintenance contracts and rapid response breakdown services to minimize downtime.", Icon: Wrench },
  { title: "Safety Devices", desc: "Supply and fitment of limit switches, overload relays, and crane safety protection systems.", Icon: Shield },
  { title: "Hoist Assembly", desc: "Complete hoist unit assembly, wire rope replacement, and hook block maintenance.", Icon: HardHat },
];

const whyUsItems = [
  { title: "Timely Execution", desc: "We respect deadlines. Our team ensures projects are completed on time, every time.", Icon: Timer },
  { title: "Customized Engineering", desc: "Every solution is tailored to your specific project requirements and budget.", Icon: Settings },
  { title: "Pan-India Reach", desc: "Active across Delhi NCR and across India with a growing pan-India footprint.", Icon: MapPin },
  { title: "Decade of Experience", desc: "10+ years of hands-on expertise in crane and mechanical engineering systems.", Icon: Award },
];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<Section>("home");

  useGSAPReveal();

  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section as Section);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if ((sections as readonly string[]).includes(id)) {
              setActiveSection(id as Section);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "-80px 0px -30% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#07070D] scroll-smooth noise-bg">
      <PageLoader />
      <CursorGlow />
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      <ScrollProgressBar />

      <ErrorBoundary>
      <main className="flex-1">
        <div id="home">
          <HeroSection onNavigate={handleNavigate} />
        </div>

        <TickerStrip />
        <PartnersTicker />

        {/* About snippet */}
        <section className="py-20 md:py-28 bg-[#0A0A0F] relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(240,90,0,0.04),transparent)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
                  <span className="w-8 h-px bg-brand" /> Who We Are
                </div>
                <h2 className="reveal-text text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                  India&apos;s Trusted{" "}
                  <span className="text-brand">Crane Experts</span>
                </h2>
                <p className="reveal-text text-white/50 leading-relaxed mb-6 text-[15px]">
                  Unique Engineering, led by Pankaj Kumar, provides expert engineering &amp; crane solutions across Delhi NCR &amp; India. We deliver excellence on every project — large or small — with a commitment to safety, quality, and timely execution.
                </p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {["Safety First", "Quality Assured", "Pan-India"].map((b) => (
                    <span key={b} className="inline-flex items-center gap-1.5 bg-brand/10 text-brand text-xs font-semibold px-3.5 py-1.5 rounded-full border border-brand/20">
                      <Shield className="w-3 h-3" /> {b}
                    </span>
                  ))}
                </div>
                <button onClick={() => handleNavigate("about")} className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-brand/25 hover:shadow-brand/40 hover:-translate-y-0.5">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "10+", label: "Years", color: "text-brand", border: "border-brand/20", bg: "bg-brand/5" },
                  { val: "150+", label: "Projects", color: "text-safety", border: "border-safety/20", bg: "bg-safety/5" },
                  { val: "75+", label: "Clients", color: "text-success", border: "border-success/20", bg: "bg-success/5" },
                  { val: "12+", label: "States", color: "text-brand", border: "border-brand/20", bg: "bg-brand/5" },
                ].map((s) => (
                  <div key={s.label} className={`text-center p-5 rounded-2xl ${s.bg} ${s.border} border hover:scale-[1.03] transition-transform gradient-border`}>
                    <div className={`text-2xl font-black ${s.color} mb-1`}>{s.val}</div>
                    <div className="text-white/30 text-[10px] uppercase tracking-widest font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services on homepage */}
        <section className="py-20 md:py-28 bg-[#07070D] relative">
          <div className="absolute top-0 left-0 right-0 h-px section-divider" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-8 h-px bg-brand" /> What We Do <span className="w-8 h-px bg-brand" />
              </div>
              <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white mb-4">Our Core Services</h2>
              <p className="text-white/40 max-w-2xl mx-auto text-[15px]">Comprehensive engineering solutions for cranes, industrial machinery, and safety systems.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {homeServices.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="service-card-animate card-shimmer group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-brand/20 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand/10 transition-colors" />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:bg-brand/20 group-hover:scale-110 transition-all duration-300">
                      <s.Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-white font-semibold mb-2 group-hover:text-brand-light transition-colors text-[15px]">{s.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <button onClick={() => handleNavigate("services")} className="text-brand text-sm font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all group-hover:gap-2 underline-draw">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button onClick={() => handleNavigate("services")} className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5">
                View All Services <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20 md:py-28 bg-[#0A0A0F] relative">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-8 h-px bg-brand" /> Why Us <span className="w-8 h-px bg-brand" />
              </div>
              <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">Why Choose Unique Engineering?</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyUsItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="hover-lift"
                >
                  <TiltCard className="glass-glow group relative text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-brand/15 transition-all duration-300 h-full"
                >
                  <div className="absolute top-3 right-3 text-white/[0.07] text-xs font-black tracking-wider">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mx-auto mb-4 group-hover:bg-brand/20 group-hover:scale-110 transition-all duration-300">
                    <item.Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <h4 className="text-white font-semibold mb-2 text-sm">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <AchievementsSection />
        <ProcessTimelineSection />
        <FAQSection />
        <IndustriesSection />
        <ProjectShowcaseSection />

        <ServiceAreasSection />
        <div id="testimonials" className="scroll-mt-20"><TestimonialsSection /></div>

        <div id="about" className="scroll-mt-20"><AboutSection /></div>
        <div id="products" className="scroll-mt-20"><ProductsSection /></div>
        <div id="services" className="scroll-mt-20"><ServicesSection /></div>
        <div id="gallery" className="scroll-mt-20"><GallerySection /></div>
        <CTABanner onNavigate={handleNavigate} />
        <div id="blog" className="scroll-mt-20"><BlogSection /></div>
        <div id="contact" className="scroll-mt-20"><ContactSection /></div>
      </main>
      </ErrorBoundary>

      <Footer onNavigate={handleNavigate} />

      {/* Cookie Consent */}
      <CookieConsent />

      {/* AI Chat Assistant */}
      <AIChatWidget />

      {/* WhatsApp Float */}
      <a
        href={siteConfig.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-5 md:bottom-6 md:right-6 z-50 w-14 h-14 bg-whatsapp hover:bg-whatsapp/90 rounded-full flex items-center justify-center text-white shadow-xl shadow-whatsapp/30 hover:shadow-whatsapp/50 transition-all hover:scale-105 animate-float"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20" />
      </a>

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
        <div className="flex border-t border-white/10 bg-black/95 backdrop-blur-lg relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
          <a href={siteConfig.phoneHref} className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white text-sm font-medium active:scale-95 transition-transform">
            <Phone className="w-4 h-4 text-brand" /> Call Now
          </a>
          <div className="w-px bg-white/10" />
          <a href={siteConfig.whatsappLink} target="blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3.5 text-whatsapp text-sm font-medium active:scale-95 transition-transform">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setVisible(scrollY > 400);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 md:bottom-6 md:right-6 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/20 transition-colors flex items-center justify-center"
          style={{ boxShadow: "0 0 12px rgba(240, 90, 0, 0.15)" }}
          aria-label="Back to top"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            className="absolute inset-0 -rotate-90"
          >
            {/* Track circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2.5"
            />
            {/* Progress circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="url(#scrollGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              style={{
                filter: "drop-shadow(0 0 4px rgba(240, 90, 0, 0.6))",
                transition: "stroke-dashoffset 0.15s ease-out",
              }}
            />
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F05A00" />
                <stop offset="100%" stopColor="#FF8C3A" />
              </linearGradient>
            </defs>
          </svg>
          {/* Arrow icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative z-10"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
