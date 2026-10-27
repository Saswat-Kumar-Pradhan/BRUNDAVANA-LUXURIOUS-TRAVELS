import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { width: 140, height: 48, textScale: "text-sm", subScale: "text-[7.5px]" },
    md: { width: 180, height: 60, textScale: "text-base", subScale: "text-[8.5px]" },
    lg: { width: 240, height: 80, textScale: "text-xl", subScale: "text-[10px]" },
  };

  const current = sizeMap[size];

  return (
    <Link
      href="#hero"
      aria-label={`${siteConfig.brand.name} - Home`}
      className={`group flex items-center gap-3 select-none transition-transform active:scale-95 ${className}`}
    >
      {/* Official Brand Logo Image */}
      <div className="relative overflow-hidden rounded-xl bg-black border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.25)] flex items-center justify-center p-1">
        <Image
          src="/logo.png"
          alt="Brundavana Luxurious Travels Logo"
          width={current.width}
          height={current.height}
          className="object-contain max-h-11 sm:max-h-12 w-auto"
          priority
        />
      </div>

      {/* Brand Typography Fallback / Screen Reader */}
      <div className="hidden sm:flex flex-col text-left">
        <span className="font-serif text-sm sm:text-base font-extrabold tracking-[0.2em] bg-gradient-to-r from-[#FFF3D1] via-[#D4AF37] to-[#8C6D23] bg-clip-text text-transparent leading-none">
          BRUNDAVANA
        </span>
        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#C5A059] dark:text-[#E6CA65] font-semibold mt-1">
          {siteConfig.brand.slogan}
        </span>
      </div>
    </Link>
  );
}
