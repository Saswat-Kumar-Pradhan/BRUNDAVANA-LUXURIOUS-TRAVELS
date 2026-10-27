"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between bg-[#0B0B0E] text-white overflow-hidden pt-28 sm:pt-36 lg:pt-40"
    >
      {/* Background Subtle Skyline Atmosphere & Night Amber Ambient Light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/60 via-[#0B0B0E] to-[#0B0B0E] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[#F7BF17]/10 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Main Content Area */}
      <Container className="relative z-10 flex-1 flex items-center pb-8 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full">
          {/* Left Text Column: Clean, Spacious, High-Contrast */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left z-20">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-white leading-[1.04] tracking-tight mb-6"
            >
              Your Ride,
              <span className="block text-[#F7BF17] mt-1.5">
                Anytime – Anywhere
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-lg mb-9"
            >
              Book Your Cab In Seconds And Travel With Comfort, Reliability, And Peace Of Mind. Executive 2026 fleet ready 24x7 in Bengaluru.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Link
                href="#booking-console"
                className="bg-[#F7BF17] hover:bg-[#E2AD0A] text-black px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg hover:shadow-[#F7BF17]/40 transition-all active:scale-95 cursor-pointer"
              >
                Book A Taxi
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Giant Borderless Luxury Yellow Car Cutout (Matching Picture) */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex items-end justify-center lg:justify-end mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative w-full max-w-[680px] lg:max-w-[850px] aspect-[16/9] lg:aspect-[16/9.5] flex items-end"
            >
              <Image
                src="/images/dribbble/hero_car_transparent.png"
                alt="Brundavana Luxury Yellow Taxi"
                fill
                priority
                className="object-contain object-bottom-right drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Bottom Subtle Transition into Cream Section */}
      <div className="w-full h-4 bg-gradient-to-b from-transparent to-[#FAF7EB]/10 pointer-events-none" />
    </section>
  );
}
