"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Car, Calculator, PhoneCall, Sparkles } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Choose Route & Vehicle",
      description:
        "Select your pickup and destination along with the ideal car: Swift Dzire, Innova Crysta, SUV, or Tempo Traveller.",
      icon: <Car className="w-6 h-6 text-[#D4AF37]" />,
    },
    {
      step: "02",
      title: "Calculate Instant Fare",
      description:
        "Get transparent per-km billing instantly. Review exact billable km, driver allowance, and zero hidden surcharge rules.",
      icon: <Calculator className="w-6 h-6 text-[#D4AF37]" />,
    },
    {
      step: "03",
      title: "Confirm on Call or WhatsApp",
      description:
        "Share your itinerary with 1-click on WhatsApp or phone. Receive immediate driver assignment and cab details.",
      icon: <PhoneCall className="w-6 h-6 text-[#D4AF37]" />,
    },
    {
      step: "04",
      title: "Ride in Chauffeur Luxury",
      description:
        "Your sanitized, AC cab arrives on time at your doorstep. Relax in plush seats while our vetted chauffeur handles the drive.",
      icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative">
      <Container>
        <Reveal direction="up">
          <SectionHeading
            badge="Seamless Booking Experience"
            title="How It"
            titleHighlight="Works"
            subtitle="Four straightforward steps to secure an executive chauffeur car for your family, business, or vacation."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, index) => (
            <Reveal
              key={s.step}
              direction="up"
              delay={index * 0.1}
              className="h-full"
            >
              <div className="h-full p-6 sm:p-7 rounded-2xl glass-panel border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 gold-card-hover flex flex-col justify-between group relative overflow-hidden">
                <div className="font-serif text-5xl font-black text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-colors absolute top-4 right-4 select-none">
                  {s.step}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mb-2.5">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 text-[11px] font-bold uppercase tracking-wider text-[#C5A03A] dark:text-[#F3D98B]">
                  Step {s.step}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
