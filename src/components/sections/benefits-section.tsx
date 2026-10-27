"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import {
  Gift,
  Zap,
  Clock,
  Car,
  Navigation,
  ShieldCheck,
} from "lucide-react";

export function BenefitsSection() {
  const leftBenefits = [
    {
      title: "BONUSES FOR RIDE",
      desc: "Transparent per-km rate, zero midnight surge surcharge, and driver allowance included.",
      icon: <Gift className="w-5 h-5 text-black" />,
    },
    {
      title: "EASY & QUICK BOOKING",
      desc: "One-click WhatsApp confirmation and instant fare quotes without complicated forms.",
      icon: <Zap className="w-5 h-5 text-black" />,
    },
    {
      title: "24/7 AVAILABILITY",
      desc: "Round-the-clock airport transfers and dawn outstation pickups across all Bengaluru pin codes.",
      icon: <Clock className="w-5 h-5 text-black" />,
    },
  ];

  const rightBenefits = [
    {
      title: "HOME PICKUP",
      desc: "Punctual doorstep pickup and drop with courteous chauffeurs assisting with your luggage.",
      icon: <Car className="w-5 h-5 text-black" />,
    },
    {
      title: "FAST BOOKING",
      desc: "Immediate car allocation and driver phone number shared in under 60 seconds on call.",
      icon: <ShieldCheck className="w-5 h-5 text-black" />,
    },
    {
      title: "GPS SEARCHING",
      desc: "Real-time route telemetry, monitored highway cruise, and guaranteed passenger safety.",
      icon: <Navigation className="w-5 h-5 text-black" />,
    },
  ];

  return (
    <section id="benefits" className="py-20 sm:py-28 bg-[#0B0B0E] text-white relative overflow-hidden">
      <Container>
        {/* Title: Some Benefits */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-tight">
            Some <span className="text-[#F7BF17]">Benefits</span>
          </h2>
        </div>

        {/* 3-Column Layout: Left 3 Items, Center Car Graphic, Right 3 Items */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Left 3 Benefits */}
          <div className="lg:col-span-4 space-y-8">
            {leftBenefits.map((b, i) => (
              <div key={i} className="flex items-start gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-[#F7BF17] flex items-center justify-center shrink-0 shadow-md">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-heading text-xs sm:text-sm font-extrabold tracking-wider text-[#F7BF17] mb-1 uppercase">
                    {b.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Luxury Yellow Car (Matching Screenshot 2) */}
          <div className="lg:col-span-4 flex items-center justify-center relative my-6 lg:my-0">
            <div className="relative w-full max-w-[360px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
              <Image
                src="/images/dribbble/benefits_car.jpg"
                alt="Brundavana Luxury Taxi Front"
                fill
                className="object-cover object-center brightness-105"
              />
            </div>
          </div>

          {/* Right 3 Benefits */}
          <div className="lg:col-span-4 space-y-8">
            {rightBenefits.map((b, i) => (
              <div key={i} className="flex items-start gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-[#F7BF17] flex items-center justify-center shrink-0 shadow-md">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-heading text-xs sm:text-sm font-extrabold tracking-wider text-[#F7BF17] mb-1 uppercase">
                    {b.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
