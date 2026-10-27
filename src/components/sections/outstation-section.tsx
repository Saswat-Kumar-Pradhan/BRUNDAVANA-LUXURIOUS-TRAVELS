"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { routesConfig, RouteItem } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { Navigation, Car, ArrowRight } from "lucide-react";

export function OutstationSection() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedRoute, setSelectedRoute] = useState<RouteItem>(routesConfig[0]);

  return (
    <section id="routes" className="py-12 sm:py-16 relative overflow-hidden">
      <Container>
        <Reveal direction="up">
          <SectionHeading
            badge="Intercity & Holiday Corridors"
            title="Outstation"
            titleHighlight="Travel"
            subtitle="Hit the highway with vetted highway chauffeurs. Transparent per-km rates with zero hidden charges."
          />
        </Reveal>

        {/* Visual Route Track Showcase */}
        <Reveal direction="up" delay={0.1}>
          <div className="rounded-2xl p-5 sm:p-7 glass-panel border border-[#D4AF37]/35 shadow-xl relative overflow-hidden mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Route Summary */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C5A059] dark:text-[#E6CA65] mb-1.5">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Live Route Selector</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {selectedRoute.from} <span className="text-[#D4AF37]">→</span> {selectedRoute.to}
                  </h3>

                  <p className="text-xs text-foreground/75 leading-relaxed mb-4">
                    {selectedRoute.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 mb-4">
                    <div className="p-2.5 rounded-xl bg-surface-card border border-border">
                      <span className="text-[10px] uppercase tracking-wider text-foreground/60 block">
                        One-Way Distance
                      </span>
                      <span className="text-base font-bold text-foreground">
                        {selectedRoute.distanceKm} KM
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-surface-card border border-border">
                      <span className="text-[10px] uppercase tracking-wider text-foreground/60 block">
                        Estimated Time
                      </span>
                      <span className="text-xs font-bold text-foreground truncate block">
                        {selectedRoute.estimatedDuration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <a
                    href="#fare-calculator"
                    className="gold-gradient-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Check Fare</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Brundavana Luxurious Travels, I want to book an outstation ride for ${selectedRoute.title} (${selectedRoute.distanceKm} km).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-surface-card hover:border-[#D4AF37] text-foreground transition-all"
                  >
                    Book on WhatsApp
                  </a>
                </div>
              </div>

              {/* Animated Highway Route Graphic */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl bg-[#09090C] border border-[#D4AF37]/25 relative min-h-[220px]">
                <div className="w-full relative py-3">
                  {/* Origin & Destination Labels */}
                  <div className="flex items-center justify-between mb-4 px-2 sm:px-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">Pickup</span>
                        <span className="text-xs font-bold text-white">{selectedRoute.from}</span>
                      </div>
                    </div>

                    <div className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5E2B3] text-[11px] font-bold">
                      {selectedRoute.distanceKm} KM Highway
                    </div>

                    <div className="flex items-center gap-1.5 text-right">
                      <div>
                        <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">Destination</span>
                        <span className="text-xs font-bold text-white">{selectedRoute.to}</span>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                    </div>
                  </div>

                  {/* Track Graphic */}
                  <div className="relative w-full h-16 flex items-center justify-center px-2">
                    <svg viewBox="0 0 500 60" className="w-full h-14" fill="none">
                      <path
                        d="M 15 30 Q 120 10, 250 30 T 485 30"
                        stroke="#22222A"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 15 30 Q 120 10, 250 30 T 485 30"
                        stroke="#D4AF37"
                        strokeWidth="2.5"
                        strokeDasharray="5 5"
                        strokeLinecap="round"
                      />
                    </svg>

                    {!shouldReduceMotion ? (
                      <motion.div
                        animate={{ x: ["-40%", "40%"], y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" }}
                        className="absolute z-20 flex flex-col items-center pointer-events-none"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#09090C] border-2 border-[#D4AF37] flex items-center justify-center text-[#F5E2B3] shadow-md">
                          <Car className="w-4 h-4" />
                        </div>
                      </motion.div>
                    ) : (
                      <div className="absolute z-20 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-[#09090C] border-2 border-[#D4AF37] flex items-center justify-center text-[#F5E2B3]">
                          <Car className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Route Buttons */}
                  <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-center gap-1.5">
                    {routesConfig.slice(0, 6).map((route) => (
                      <button
                        key={route.id}
                        type="button"
                        onClick={() => setSelectedRoute(route)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                          selectedRoute.id === route.id
                            ? "bg-[#D4AF37] text-[#09090C]"
                            : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700"
                        }`}
                      >
                        {route.to}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
