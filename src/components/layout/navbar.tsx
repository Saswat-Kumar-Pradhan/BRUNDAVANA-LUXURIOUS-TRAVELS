"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#0B0B0E]/90 backdrop-blur-md py-3.5 shadow-xl border-b border-zinc-800/60"
        : "bg-transparent py-5 sm:py-7 border-b border-transparent"
        }`}
    >
      <Container className="flex items-center justify-between">
        {/* Left: Brand Logo Image (/images/brand/logo.png) & Text */}
        <Link
          href="#hero"
          onClick={() => setActiveNav("home")}
          aria-label={`${siteConfig.brand.name} - Home`}
          className="group flex items-center gap-2.5 select-none active:scale-95 transition-transform"
        >
          <Image
            src="/images/brand/logo.png"
            alt="Brundavana Luxurious Travels Logo"
            width={52}
            height={52}
            className="h-8 sm:h-9 w-auto object-contain"
            priority
          />
          <div className="flex flex-col text-left">
            <span className="font-heading font-black text-xs sm:text-sm tracking-[0.16em] text-[#F7BF17] uppercase leading-tight">
              Brundavana
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.22em] text-white/90 uppercase leading-tight">
              Luxurious Travels
            </span>
          </div>
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
                  className={`block py-2 text-sm font-bold tracking-widest uppercase transition-colors ${isActive
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
