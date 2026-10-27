"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const list = siteConfig.testimonials;

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % list.length);
  };

  const current = list[currentIdx];

  return (
    <section id="clients" className="py-24 sm:py-32 bg-[#0B0B0E] text-white relative overflow-hidden">
      {/* Giant Yellow Quotation Marks Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-6 left-8 sm:left-16 font-serif text-[180px] sm:text-[240px] text-[#F7BF17]/15 font-black leading-none select-none pointer-events-none"
      >
        “
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-8 sm:right-16 font-serif text-[180px] sm:text-[240px] text-[#F7BF17]/15 font-black leading-none select-none pointer-events-none"
      >
        ”
      </div>

      <Container className="relative z-10 max-w-4xl mx-auto">
        {/* Title: Our Happy Clients */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-white">
            Our Happy <span className="text-[#F7BF17]">Clients</span>
          </h2>
        </div>

        {/* Testimonial Body */}
        <div className="min-h-[200px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed mb-8 max-w-3xl mx-auto text-center sm:text-left">
                &ldquo;{current.comment}&rdquo;
              </p>

              {/* Author Row */}
              <div className="flex items-center justify-center sm:justify-start gap-3.5 mb-8">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border-2 border-[#F7BF17] relative shrink-0">
                  <div className="w-full h-full flex items-center justify-center bg-[#F7BF17] text-black font-black text-sm">
                    {current.name.charAt(0)}
                  </div>
                </div>

                <div className="text-left">
                  <h4 className="font-heading text-sm sm:text-base font-bold text-[#F7BF17]">
                    {current.name}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {current.role} • {current.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-lg border border-zinc-700 bg-zinc-900/80 flex items-center justify-center text-white hover:border-[#F7BF17] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="w-10 h-10 rounded-lg bg-[#F7BF17] flex items-center justify-center text-black font-bold shadow-md hover:bg-[#E2AD0A] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
