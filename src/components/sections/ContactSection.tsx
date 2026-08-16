"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { siteConfig } from "@/lib/data";
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Send, CheckCircle, Timer, IndianRupee, MapPinned, Headset,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const data = {
        first_name: (form.querySelector('#first-name') as HTMLInputElement)?.value,
        last_name: (form.querySelector('#last-name') as HTMLInputElement)?.value,
        phone: (form.querySelector('#phone') as HTMLInputElement)?.value,
        email: (form.querySelector('#email') as HTMLInputElement)?.value,
        company: (form.querySelector('#company') as HTMLInputElement)?.value,
        service: (form.querySelector('#service') as HTMLSelectElement)?.value,
        location: (form.querySelector('#location') as HTMLInputElement)?.value,
        message: (form.querySelector('#message') as HTMLTextAreaElement)?.value,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        form.reset();
        toast.success("Inquiry Submitted!", {
          description: "We'll get back to you within 24 hours.",
          duration: 5000,
        });
      } else {
        setSubmitError(result.error || 'Submission failed. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#07070D] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-brand" /> Reach Out{" "}
            <span className="w-8 h-px bg-brand" />
          </div>
          <h2 className="reveal-text text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Get in Touch
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            &quot;We&apos;re one call away from solving your engineering challenge.&quot;
          </p>
        </div>

        {/* Decorative brand-colored radial circle in bottom-right */}
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand/[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full bg-brand/[0.06] blur-[60px] pointer-events-none" />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Talk to Our Engineering Team
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Available Monday to Saturday, 9 AM – 7 PM. For urgent
                breakdowns, reach us any time on WhatsApp.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Phone, label: "Phone", value: siteConfig.phone, href: siteConfig.phoneHref },
                { icon: Mail, label: "Email", value: siteConfig.email, href: siteConfig.emailHref },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with us on WhatsApp", href: siteConfig.whatsappLink },
                { icon: MapPin, label: "Location", value: siteConfig.location, href: null },
                { icon: Clock, label: "Working Hours", value: siteConfig.hours, href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">{item.label}</h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-white/50 text-sm hover:text-brand transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white/50 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={siteConfig.phoneHref}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-light text-white px-4 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp/80 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.7999!2d77.4237!3d28.5895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM1JzIyLjIiTiA3N8KwMjUnMjUuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                className="w-full h-full border-0 grayscale invert opacity-60"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="p-6 md:p-8 rounded-2xl glass-panel relative z-10">
              <h3 className="text-lg font-bold text-white mb-1">
                Send Us a Message
              </h3>
              <p className="text-white/40 text-sm mb-6">
                Fill in the form and our team will get back to you within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h4 className="text-white text-lg font-semibold mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-white/40 text-sm">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (<>
                {submitError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {submitError}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first-name" className="block text-white/60 text-xs font-medium mb-1.5">
                        First Name <span className="text-brand">*</span>
                      </label>
                      <Input
                        id="first-name"
                        name="first_name"
                        placeholder="Pankaj"
                        required
                        className="glass-input h-11 rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-white/60 text-xs font-medium mb-1.5">
                        Last Name
                      </label>
                      <Input
                        id="last-name"
                        name="last_name"
                        placeholder="Kumar"
                        className="glass-input h-11 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-white/60 text-xs font-medium mb-1.5">
                        Phone Number <span className="text-brand">*</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        required
                        className="glass-input h-11 rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white/60 text-xs font-medium mb-1.5">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        className="glass-input h-11 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-white/60 text-xs font-medium mb-1.5">
                      Company / Organisation
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="ABC Construction Pvt. Ltd."
                      className="glass-input h-11 rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-white/60 text-xs font-medium mb-1.5">
                      Service Required <span className="text-brand">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      defaultValue=""
                      className="glass-input w-full h-11 rounded-xl px-3 text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        -- Select a Service --
                      </option>
                      <option value="crane-erection">
                        Crane Erection & Dismantling
                      </option>
                      <option value="gearbox">Gearbox Supply / Repair</option>
                      <option value="vfd">VFDs & Electrical</option>
                      <option value="amc">AMC / Breakdown Service</option>
                      <option value="safety">
                        Safety Device Installation
                      </option>
                      <option value="hoist">Hoist & Wire Ropes</option>
                      <option value="other">Other / General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-white/60 text-xs font-medium mb-1.5">
                      Project Location
                    </label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Delhi, Mumbai, Pune..."
                      className="glass-input h-11 rounded-xl"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/60 text-xs font-medium mb-1.5">
                      Message / Project Details <span className="text-brand">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Briefly describe your project or requirement..."
                      required
                      rows={4}
                      className="glass-input rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand hover:bg-brand-light disabled:opacity-60 text-white h-12 rounded-xl font-semibold shadow-lg shadow-brand/25 hover:shadow-brand/40 transition-all border-glow-pulse"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                    ) : (
                      <span className="inline-flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
                    )}
                  </Button>
                </form>
              </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Response Promise */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-brand text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-brand" /> What to Expect{" "}
              <span className="w-8 h-px bg-brand" />
            </div>
            <h2 className="reveal-text text-3xl md:text-4xl font-bold text-white">
              Our Response Promise
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Timer, title: "24-Hour Response", desc: "All inquiries are acknowledged within 24 hours with a detailed reply or callback." },
              { icon: IndianRupee, title: "Free Consultation", desc: "Get a free site consultation and no-obligation quotation from our engineers." },
              { icon: MapPinned, title: "Pan-India Reach", desc: "We can mobilise our team to your site anywhere across India, quickly." },
              { icon: Headset, title: "Dedicated Support", desc: "A dedicated point of contact is assigned to every project from inquiry to handover." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
              >
                <item.icon className="w-6 h-6 text-brand mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
