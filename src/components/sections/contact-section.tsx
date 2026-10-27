"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
} from "lucide-react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Outstation Trip");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMsg = [
      `*NEW INQUIRY VIA WEBSITE CONTACT FORM*`,
      `----------------------------------------`,
      `👤 *Name:* ${name}`,
      `📞 *Phone:* ${phone}`,
      `🚗 *Interested In:* ${service}`,
      message ? `💬 *Message:* ${message}` : "",
      `----------------------------------------`,
      `Sent from Brundavana Luxurious Travels website.`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
      formattedMsg
    )}`;

    setSubmitted(true);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative bg-surface/50">
      <Container>
        <Reveal direction="up">
          <SectionHeading
            badge="Always At Your Service"
            title="Get In"
            titleHighlight="Touch"
            subtitle="Connect with our Bengaluru operations desk anytime. We operate 24 hours a day, 365 days a year."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Map (5 cols) */}
          <Reveal direction="up" delay={0.1} className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-[#D4AF37]/30 shadow-xl space-y-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Bengaluru Head Office
              </h3>

              {/* Contact details list */}
              <div className="space-y-4 text-xs sm:text-sm">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-foreground/60 block">
                      Phone (Tap to Call)
                    </span>
                    <a
                      href={`tel:${siteConfig.contact.primaryPhone}`}
                      className="font-bold text-foreground hover:text-[#D4AF37] transition-colors block text-base"
                    >
                      {siteConfig.contact.primaryPhoneDisplay}
                    </a>
                    <a
                      href={`tel:${siteConfig.contact.secondaryPhone}`}
                      className="text-xs text-foreground/80 hover:text-[#D4AF37] transition-colors"
                    >
                      Alt: {siteConfig.contact.secondaryPhoneDisplay}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-foreground/60 block">
                      WhatsApp Quick Booking
                    </span>
                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-foreground hover:text-emerald-500 transition-colors block text-base"
                    >
                      {siteConfig.contact.whatsappNumberDisplay}
                    </a>
                    <span className="text-[11px] text-foreground/60">
                      Typical reply time: Under 2 mins
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-foreground/60 block">
                      Corporate & Invoicing Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-semibold text-foreground hover:text-[#D4AF37] transition-colors break-all"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-foreground/60 block">
                      Dispatch Station
                    </span>
                    <p className="font-medium text-foreground leading-snug">
                      {siteConfig.contact.address.full}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-foreground/60 block">
                      Working Hours
                    </span>
                    <p className="font-bold text-[#C5A03A] dark:text-[#F3D98B]">
                      {siteConfig.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Iframe Placeholder */}
            <div className="rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-lg h-56 relative bg-surface-card">
              <iframe
                title="Brundavana Luxurious Travels Location Map"
                src={siteConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] contrast-[1.05]"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/75 text-white text-[10px] font-semibold backdrop-blur-sm pointer-events-none">
                📍 Indiranagar, Bengaluru
              </div>
            </div>
          </Reveal>

          {/* Contact Inquiry Form (7 cols) */}
          <Reveal direction="up" delay={0.2} className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-10 glass-panel border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A03A] dark:text-[#F3D98B] block mb-1">
                  Online Inquiry
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  Send Us A Message
                </h3>
                <p className="text-xs sm:text-sm text-foreground/70 mt-1">
                  Fill in your details below. Clicking submit will immediately draft and send this booking via WhatsApp to our active dispatcher.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-surface-card border border-border focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-foreground outline-none transition-all placeholder:text-foreground/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-surface-card border border-border focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-foreground outline-none transition-all placeholder:text-foreground/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-surface-card border border-border focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-foreground outline-none transition-all"
                  >
                    <option value="Outstation Trip (Round Trip)">Outstation Trip (Round Trip)</option>
                    <option value="Outstation Trip (One-Way Drop)">Outstation Trip (One-Way Drop)</option>
                    <option value="Airport Transfer (KIA)">Airport Transfer (Kempegowda KIA)</option>
                    <option value="Local Hourly Rental">Local Hourly Rental (4h/8h/12h)</option>
                    <option value="Wedding / Event Luxury Fleet">Wedding / Event Luxury Fleet</option>
                    <option value="Tour Package (Coorg, Ooty, Mysore)">Tour Package (Coorg, Ooty, Mysore)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/80 mb-1.5">
                    Trip Itinerary & Special Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your pickup location, dates, preferred vehicle, number of passengers, or any specific requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm bg-surface-card border border-border focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-foreground outline-none transition-all placeholder:text-foreground/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="gold-gradient-btn w-full py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/25"
                >
                  <Send className="w-4 h-4 text-[#0B0B0F]" />
                  <span>Submit & Connect on WhatsApp</span>
                </button>

                {submitted && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>WhatsApp chat opened! Our representative is responding to you.</span>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
