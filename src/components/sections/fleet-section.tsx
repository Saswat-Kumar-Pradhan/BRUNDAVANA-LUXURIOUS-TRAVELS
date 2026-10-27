"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function FleetSection() {
  const tiers = [
    {
      title: "Economy Class",
      subtitle: "Maruti Suzuki Dzire (2026 & 2020 Editions)",
      rate: "₹14/km",
      desc: "Perfect for airport drops, couples, and swift city commutes. 4 seats, 3 bags, chilled dual AC.",
      image: "/images/vehicles/sedan.jpg",
      vehicleName: "Maruti Suzuki Dzire (2026/2020)",
    },
    {
      title: "Standard Class",
      subtitle: "Toyota Rumion 2026 & Kia Carens Clavis (Top Model 2026)",
      rate: "₹17/km",
      desc: "Spacious 6-seater cruisers with ventilated seats, flexible 3rd row, and ample holiday luggage space.",
      image: "/images/vehicles/suv.jpg",
      vehicleName: "Toyota Rumion 2026 / Kia Carens Clavis",
    },
    {
      title: "Business Class",
      subtitle: "Toyota Innova Crysta 2026, 2x Hycross Hybrid, Force Urbania 2026",
      rate: "₹22/km",
      desc: "Highway emperors with ottoman captain lounge chairs, whisper-quiet hybrid, or 14-seater luxury van.",
      image: "/images/vehicles/innova.jpg",
      vehicleName: "Innova Crysta 2026 / Hycross Hybrid / Urbania",
    },
  ];

  return (
    <section id="fleet" className="py-20 sm:py-28 bg-[#FAF7EB] text-[#111114] relative overflow-hidden">
      {/* Decorative Yellow Circles on the right (matching Screenshot 2) */}
      <div
        aria-hidden="true"
        className="absolute top-16 right-20 w-12 h-12 rounded-full bg-[#F7BF17] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-36 -right-12 w-32 h-32 rounded-full bg-[#F7BF17] pointer-events-none"
      />

      <Container className="relative z-10">
        {/* Title: Find Your Perfect Ride */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#111114] tracking-tight">
            Find Your <span className="text-[#111114]">Perfect Ride</span>
          </h2>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Yellow Half-Circle with Big Yellow SUV Graphic (Screenshot 2) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Yellow Half Circle Backdrop */}
            <div
              aria-hidden="true"
              className="absolute -left-16 sm:-left-24 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full bg-[#F7BF17] -z-0 pointer-events-none"
            />

            <div className="relative z-10 w-full max-w-[440px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/dribbble/fleet_suv.jpg"
                alt="Find Your Perfect Ride"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right: 3 Vehicle Tiers */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Vehicle Thumbnail */}
                <div className="relative w-36 sm:w-44 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-100 bg-stone-50">
                  <Image
                    src={tier.image}
                    alt={tier.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Info & Book Button */}
                <div className="flex-1 flex flex-col justify-between h-full text-center sm:text-left">
                  <div>
                    <h3 className="font-heading text-lg font-black text-[#111114] leading-tight">
                      {tier.title}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 mt-0.5">
                      {tier.subtitle}
                    </p>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                    <span className="font-heading text-sm font-extrabold text-[#111114]">
                      {tier.rate}
                    </span>

                    <a
                      href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Brundavana Luxurious Travels, I want to book: ${tier.vehicleName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#F7BF17] hover:bg-[#E2AD0A] text-black px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-md transition-all active:scale-95 shadow-sm"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
