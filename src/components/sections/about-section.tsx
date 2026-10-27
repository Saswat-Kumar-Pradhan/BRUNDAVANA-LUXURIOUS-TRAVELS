"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF7EB] text-[#111114] relative overflow-hidden">
      {/* Decorative Yellow Circles on the right (matching Dribbble Screenshot 1) */}
      <div
        aria-hidden="true"
        className="absolute top-12 -right-10 w-36 h-36 rounded-full bg-[#F7BF17] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-36 right-16 w-14 h-14 rounded-full bg-[#F7BF17] pointer-events-none"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: 4 Vertical Rounded Pill Photo Slices */}
          <div className="lg:col-span-6 flex items-center justify-center gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-16 sm:w-22 h-64 sm:h-88 rounded-full overflow-hidden relative shadow-xl border-2 border-white"
            >
              <Image
                src="/images/dribbble/hero_car.jpg"
                alt="Yellow Luxury Cab"
                fill
                className="object-cover object-left"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-16 sm:w-22 h-76 sm:h-96 rounded-full overflow-hidden relative shadow-2xl border-2 border-white -mt-6"
            >
              <Image
                src="/images/vehicles/suv.jpg"
                alt="Executive Chauffeur Ride"
                fill
                className="object-cover object-center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 sm:w-22 h-72 sm:h-92 rounded-full overflow-hidden relative shadow-xl border-2 border-white"
            >
              <Image
                src="/images/vehicles/innova.jpg"
                alt="Toyota Innova Highway Journey"
                fill
                className="object-cover object-center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-16 sm:w-22 h-60 sm:h-80 rounded-full overflow-hidden relative shadow-lg border-2 border-white mt-4"
            >
              <Image
                src="/images/dribbble/fleet_suv.jpg"
                alt="Yellow Luxury Car"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </div>

          {/* Right: Text and Black Pill Button */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#111114] tracking-tight mb-6">
              About Us
            </h2>

            <p className="text-sm sm:text-base text-zinc-700 font-normal leading-relaxed mb-5">
              {siteConfig.brand.name} is Bengaluru&apos;s premier chauffeur and travel company, engineered for travelers who seek uncompromised luxury without the inflated luxury price tag.
            </p>

            <p className="text-sm sm:text-base text-zinc-700 font-normal leading-relaxed mb-8">
              Our 2026 fleet includes executive sedans and family MPVs: Toyota Innova Hycross Hybrid (2 units), Innova Crysta, Toyota Rumion, Kia Carens Clavis (Top Model 2026), Force Urbania (14-seater), and Maruti Suzuki Dzire. Driven exclusively by vetted, polite highway chauffeurs.
            </p>

            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="rounded-full bg-black hover:bg-zinc-800 text-white px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              Read More
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
