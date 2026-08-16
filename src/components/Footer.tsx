"use client";

import { useState, useCallback } from "react";
import { siteConfig, navItems, services } from "@/lib/data";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  HardHat,
  MessageCircle,
  Instagram,
  Linkedin,
  ArrowUp,
  ChevronRight,
  Youtube,
  Send,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = useCallback(async () => {
    if (!email.trim() || subscribing || subscribed) return;

    setSubscribing(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        setSubscribed(true);
        toast.success(data.message);
      } else {
        toast.error(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubscribing(false);
    }
  }, [email, subscribing, subscribed]);

  const serviceLinks = services.slice(0, 5);
  const quickLinks = navItems.filter((n) => !n.cta);

  return (
    <footer className="bg-[#05050A] border-t border-white/[0.04] relative">
      {/* Gradient line at top of footer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      {/* CTA Strip */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand to-brand-light" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_80%_at_90%_50%,rgba(255,208,0,0.1),transparent_60%)]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Have a Project? Let&apos;s Build It.
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Get expert engineering consultation and a free quote today.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 bg-white text-brand-dark px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/95 transition-all shadow-xl btn-press"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <button
                onClick={() => onNavigate("contact")}
                className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/30 transition-all border border-white/30 btn-press backdrop-blur-sm"
              >
                <Mail className="w-4 h-4" /> Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center shadow-lg shadow-brand/20">
                <HardHat className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <div className="font-bold text-white text-base leading-tight tracking-tight">
                  Unique
                </div>
                <div className="text-[10px] text-brand-light uppercase tracking-[0.25em] leading-tight font-semibold">
                  Engineering
                </div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-[1.75] mb-6">
              Expert crane erection, mechanical systems, and maintenance
              solutions across Delhi NCR and Pan-India since 2010. Your
              trusted partner for industrial excellence.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { icon: MessageCircle, href: siteConfig.whatsappLink, label: "WhatsApp", bg: "bg-whatsapp/15 hover:bg-whatsapp/25 text-whatsapp" },
                { icon: Instagram, href: "#", label: "Instagram", bg: "bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white" },
                { icon: Linkedin, href: "#", label: "LinkedIn", bg: "bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white" },
                { icon: Youtube, href: "#", label: "YouTube", bg: "bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl ${social.bg} flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-brand" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.section}>
                  <button
                    onClick={() => onNavigate(item.section)}
                    className="group flex items-center gap-1.5 text-white/40 hover:text-brand text-sm transition-colors duration-300 footer-link-draw"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand/60" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-brand" />
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s.slug}>
                  <button
                    onClick={() => onNavigate("services")}
                    className="group flex items-center gap-1.5 text-white/40 hover:text-brand text-sm transition-colors duration-300 footer-link-draw"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand/60" />
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-brand" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Phone, value: siteConfig.phone, href: siteConfig.phoneHref },
                { icon: Mail, value: siteConfig.email, href: siteConfig.emailHref },
                { icon: MapPin, value: siteConfig.location },
                { icon: Clock, value: siteConfig.hours },
              ].map((item) => (
                <li key={item.value} className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand/20 transition-colors">
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-white/40 hover:text-brand text-sm transition-colors duration-300 leading-relaxed"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white/40 text-sm leading-relaxed">
                      {item.value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-14 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Stay Updated</h4>
              <p className="text-white/40 text-sm">Get the latest engineering insights</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 sm:w-64 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand/40 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                disabled={subscribing || subscribed}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors duration-300 shrink-0 btn-press ${subscribed ? "bg-success/80 text-white cursor-default" : "bg-brand hover:bg-brand-light text-white"} disabled:opacity-70`}
              >
                {subscribing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : subscribed ? (
                  <Send className="w-3.5 h-3.5" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                {subscribing ? "Subscribing..." : subscribed ? "Subscribed! ✓" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/25 text-xs">
            {siteConfig.copyright}
          </span>
          <div className="flex items-center gap-4">
            <span className="text-white/15 text-xs hidden sm:inline">
              Crafted with precision
            </span>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-brand/20 text-white/30 hover:text-brand flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 border border-white/[0.06] hover:border-brand/30"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
