"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { servicesConfig } from "@/config/services";
import { siteConfig } from "@/config/site";
import {
  Compass,
  Plane,
  Clock,
  Car,
  Gem,
  Palmtree,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6 text-[#D4AF37]" />,
  Plane: <Plane className="w-6 h-6 text-[#D4AF37]" />,
  Clock: <Clock className="w-6 h-6 text-[#D4AF37]" />,
  Car: <Car className="w-6 h-6 text-[#D4AF37]" />,
  Gem: <Gem className="w-6 h-6 text-[#D4AF37]" />,
  Palmtree: <Palmtree className="w-6 h-6 text-[#D4AF37]" />,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28 relative bg-surface/40">
      <Container>
        <Reveal direction="up">
          <SectionHeading
            badge="Executive Chauffeur Offerings"
            title="Tailored Travel"
            titleHighlight="Services"
            subtitle="From punctual dawn airport drops to multi-day interstate pilgrimages, experience uncompromising luxury at honest per-km rates."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesConfig.map((service, index) => (
            <Reveal
              key={service.id}
              direction="up"
              delay={index * 0.1}
              className="h-full"
            >
              <div className="h-full rounded-3xl p-7 sm:p-8 glass-panel border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 gold-card-hover flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-xl">
                {/* Gold Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent group-hover:via-[#D4AF37] transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {serviceIcons[service.iconName] || <Car className="w-6 h-6 text-[#D4AF37]" />}
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#C5A03A] dark:text-[#F3D98B] border border-[#D4AF37]/30">
                        {service.badge}
                      </span>
                      <span className="text-xs font-semibold text-foreground/80 mt-1">
                        {service.startingPrice}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed mb-6">
                    {service.fullDesc}
                  </p>

                  {/* Feature Checkpoints */}
                  <ul className="space-y-2 mb-6 border-t border-border/60 pt-4">
                    {service.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-foreground/80"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-[11px] text-foreground/60 italic">
                    {service.recommendedVehicles}
                  </span>

                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Brundavana Luxurious Travels, I am interested in booking: ${service.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-foreground hover:text-[#0B0B0F] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Book Now</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
