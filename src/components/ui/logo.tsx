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
    sm: { imgClass: "h-7 sm:h-8", titleClass: "text-xs", subtitleClass: "text-[7.5px]" },
    md: { imgClass: "h-8 sm:h-9", titleClass: "text-xs sm:text-sm", subtitleClass: "text-[8px] sm:text-[9px]" },
    lg: { imgClass: "h-10 sm:h-11", titleClass: "text-sm sm:text-base", subtitleClass: "text-[9px] sm:text-[10px]" },
  };

  const current = sizeMap[size];

  return (
    <Link
      href="#hero"
      aria-label={`${siteConfig.brand.name} - Home`}
      className={`group inline-flex items-center gap-2.5 select-none active:scale-95 transition-transform ${className}`}
    >
      <Image
        src="/images/brand/logo.png"
        alt="Brundavana Luxurious Travels Logo"
        width={52}
        height={52}
        className={`${current.imgClass} w-auto object-contain shrink-0`}
        priority
      />

      <div className="flex flex-col text-left">
        <span className={`font-heading font-black ${current.titleClass} tracking-[0.16em] text-[#F7BF17] uppercase leading-tight`}>
          Brundavana
        </span>
        <span className={`font-bold ${current.subtitleClass} tracking-[0.22em] text-white/90 uppercase leading-tight`}>
          Luxurious Travels
        </span>
      </div>
    </Link>
  );
}
