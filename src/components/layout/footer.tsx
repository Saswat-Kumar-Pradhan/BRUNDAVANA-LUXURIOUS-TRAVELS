"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative bg-[#0B0B0E] text-white pt-16 pb-24 sm:pb-12 overflow-hidden border-t border-zinc-900">
      {/* Background Subtle Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-900/40 via-[#0B0B0E] to-[#0B0B0E] pointer-events-none"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-zinc-800/80">
          {/* Column 1: Brand Logo, Text & Yellow Social Icons (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo size="md" />

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Brundavana Luxurious Travels delivers executive chauffeur and taxi services across Bengaluru, airport corridors, and Karnataka outstation routes with complete comfort and transparent rates.
            </p>

            {/* Row of Yellow Round Social / Chat Icons (Exact Dribbble Style) */}
            <div className="flex items-center gap-3 pt-1">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#F7BF17] hover:bg-white text-black flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>

              {/* Phone */}
              <a
                href={`tel:${siteConfig.contact.primaryPhone}`}
                aria-label="Call Helpline"
                className="w-9 h-9 rounded-full bg-[#F7BF17] hover:bg-white text-black flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4 fill-current" />
              </a>

              {/* YouTube SVG */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#F7BF17] hover:bg-white text-black flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#F7BF17] hover:bg-white text-black flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#F7BF17] hover:bg-white text-black flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Pages (3 cols) */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#hero" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#benefits" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#booking-console" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources / 2026 Fleet (3 cols) */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#fleet" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Toyota Innova Hycross Hybrid (2 Units)
                </Link>
              </li>
              <li>
                <Link href="#fleet" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Toyota Innova Crysta 2026
                </Link>
              </li>
              <li>
                <Link href="#fleet" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Toyota Rumion 2026
                </Link>
              </li>
              <li>
                <Link href="#fleet" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Kia Carens Clavis Top Model 2026
                </Link>
              </li>
              <li>
                <Link href="#fleet" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Force Urbania 2026 (14 Seater)
                </Link>
              </li>
              <li>
                <Link href="#fleet" className="text-zinc-400 hover:text-[#F7BF17] transition-colors">
                  Maruti Suzuki Dzire (2026 & 2020)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Work Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Work Hours
            </h4>
            <div className="space-y-2">
              <p className="font-heading text-xl font-black text-[#F7BF17]">
                24/7
              </p>
              <p className="font-heading text-sm font-bold text-white">
                <a href={`tel:${siteConfig.contact.primaryPhone}`} className="hover:text-[#F7BF17] transition-colors">
                  {siteConfig.contact.primaryPhoneDisplay}
                </a>
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                Our Support and Sales team is available 24 /7 to answer your queries and dispatch executive cabs.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Matching Dribbble Reference) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            All Right Reserved © 2026 {siteConfig.brand.name}. {siteConfig.brand.slogan}
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-[#F7BF17] transition-colors inline-flex items-center gap-1"
            >
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <Link href="#privacy" className="hover:text-[#F7BF17] transition-colors">
              Privacy policy
            </Link>
            <Link href="#terms" className="hover:text-[#F7BF17] transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#F7BF17] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
