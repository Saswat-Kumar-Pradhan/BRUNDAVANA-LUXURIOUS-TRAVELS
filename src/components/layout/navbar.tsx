"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "HOME", href: "#hero" },
    { id: "about", label: "ABOUT", href: "#about" },
    { id: "features", label: "FEATURES", href: "#benefits" },
    { id: "fleet", label: "FLEET", href: "#fleet" },
    { id: "booking", label: "BOOK NOW", href: "#booking-console" },
    { id: "contact", label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0B0E]/90 backdrop-blur-md py-3.5 shadow-xl border-b border-zinc-800/60"
          : "bg-transparent py-5 sm:py-7 border-b border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Left: Yellow Taxi Silhouette Icon (Matching Reference Picture) */}
        <Link
          href="#hero"
          onClick={() => setActiveNav("home")}
          aria-label={`${siteConfig.brand.name} - Home`}
          className="group flex items-center gap-3 select-none active:scale-95 transition-transform"
        >
          <svg
            viewBox="0 0 84 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 sm:h-8 w-auto text-[#F7BF17]"
            aria-hidden="true"
          >
            {/* Speed trails behind taxi */}
            <line x1="4" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="15.5" x2="18" y2="15.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="5" y1="21" x2="24" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

            {/* Taxi Rooftop Light */}
            <path d="M44 5 H54 L52 9.5 H42 Z" fill="currentColor" />

            {/* Aerodynamic Taxi Body Silhouette */}
            <path
              d="M23 20.5 C23 16.5 26 14.5 30 14.5 L37 14.5 L44 9.5 H58 L67 14.5 L75 15.5 C78 15.5 80.5 17.5 80.5 20.5 L79.5 24 C79.5 25 78.5 26 77 26 H71.5 C71.5 23 69 20.5 66 20.5 C63 20.5 60.5 23 60.5 26 H43.5 C43.5 23 41 20.5 38 20.5 C35 20.5 32.5 23 32.5 26 H25 C23.5 26 23 25 23 24 Z"
              fill="currentColor"
            />

            {/* Front & Rear Wheels */}
            <circle cx="38" cy="25" r="4" fill="#0B0B0E" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="66" cy="25" r="4" fill="#0B0B0E" stroke="currentColor" strokeWidth="1.8" />

            {/* Tinted Windows */}
            <path d="M44.5 11.5 H50.5 V15.5 H39.5 Z" fill="#0B0B0E" />
            <path d="M52.5 11.5 H57 L63 15.5 H52.5 Z" fill="#0B0B0E" />
          </svg>

          <span className="font-heading font-black text-sm tracking-[0.2em] text-[#F7BF17] hidden xs:inline uppercase">
            Brundavana
          </span>
        </Link>

        {/* Right: Desktop Navigation Links (Exact Match To Reference Picture) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            if (isActive) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className="bg-[#F7BF17] text-black font-extrabold text-xs tracking-wider uppercase px-5 py-1.5 rounded-full shadow-md transition-all active:scale-95"
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className="text-white hover:text-[#F7BF17] text-xs font-bold tracking-widest uppercase transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="md:hidden w-10 h-10 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white flex items-center justify-center active:scale-95 hover:border-[#F7BF17]"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-[#F7BF17]" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </Container>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0B0B0E]/98 backdrop-blur-2xl border-b border-zinc-800/80 px-6 py-6 space-y-4 shadow-2xl"
          >
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setActiveNav(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block py-2 text-sm font-bold tracking-widest uppercase transition-colors ${
                    isActive
                      ? "text-[#F7BF17]"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
