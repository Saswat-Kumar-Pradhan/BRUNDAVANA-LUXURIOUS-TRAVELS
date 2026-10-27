"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { ChevronDown, PhoneCall } from "lucide-react";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(siteConfig.faqs[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative">
      <Container>
        <Reveal direction="up">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Clear & Honest"
            titleHighlight="Answers"
            subtitle="Everything you need to know about outstation billing, airport transfers, chauffeur etiquette, and toll transparency."
          />
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {siteConfig.faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <Reveal key={faq.id} direction="up" delay={index * 0.05}>
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "glass-panel border-[#D4AF37]/50 shadow-md ring-1 ring-[#D4AF37]/20"
                      : "bg-surface-card border-border hover:border-[#D4AF37]/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-foreground">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 bg-[#D4AF37] text-[#0B0B0F] border-[#D4AF37]"
                          : "text-foreground"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-border/60 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Have more questions banner */}
        <div className="mt-12 text-center">
          <p className="text-sm text-foreground/70 mb-3">
            Have a custom query or specific group itinerary?
          </p>
          <a
            href={`tel:${siteConfig.contact.primaryPhone}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C5A03A] dark:text-[#F3D98B] hover:underline"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Speak directly with our 24x7 Helpdesk ({siteConfig.contact.primaryPhoneDisplay})</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
