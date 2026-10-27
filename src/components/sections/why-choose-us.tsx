"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import {
  Clock,
  ShieldCheck,
  BadgeCheck,
  Crown,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-5 h-5 text-[#D4AF37]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />,
  BadgeCheck: <BadgeCheck className="w-5 h-5 text-[#D4AF37]" />,
  Crown: <Crown className="w-5 h-5 text-[#D4AF37]" />,
};

const romanNumerals = ["I", "II", "III", "IV"];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-12 sm:py-16 relative">
      <Container>
        <Reveal direction="up">
          <SectionHeading
            badge="The Brundavana Standard"
            title="Why Travel"
            titleHighlight="With Us"
            subtitle="Engineered for travelers who demand punctuality, pristine 2026 vehicles, and 100% billing honesty."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {siteConfig.trustPoints.map((point, index) => (
            <Reveal
              key={point.id}
              direction="up"
              delay={index * 0.05}
              className="h-full"
            >
              <div className="h-full p-5 sm:p-6 rounded-2xl bespoke-card flex flex-col justify-between group relative overflow-hidden">
                <span className="font-serif text-2xl font-bold text-foreground/10 absolute top-4 right-5 select-none group-hover:text-[#D4AF37]/20 transition-colors">
                  {romanNumerals[index]}
                </span>

                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/12 border border-[#D4AF37]/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    {iconMap[point.icon] || <Crown className="w-5 h-5 text-[#D4AF37]" />}
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-foreground mb-1.5 tracking-wide">
                    {point.title}
                  </h3>

                  <p className="text-xs text-foreground/70 leading-relaxed font-normal">
                    {point.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-[#C5A059] dark:text-[#E6CA65]">
                  <span>Pillar {romanNumerals[index]}</span>
                  <span className="text-[8px]">✦</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
