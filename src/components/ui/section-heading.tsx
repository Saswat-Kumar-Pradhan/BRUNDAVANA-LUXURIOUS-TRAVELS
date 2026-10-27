import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col mb-14 sm:mb-20",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && (
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.22em] border border-[#D4AF37]/35 bg-[#D4AF37]/8 text-[#B89230] dark:text-[#E6CA65] mb-5 shadow-sm">
          <span className="text-[#D4AF37] text-[9px]">✦</span>
          <span>{badge}</span>
          <span className="text-[#D4AF37] text-[9px]">✦</span>
        </div>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-[0.03em] text-foreground leading-[1.12]">
        {title}{" "}
        {titleHighlight && (
          <span className="gold-gradient-text drop-shadow-sm font-extrabold">
            {titleHighlight}
          </span>
        )}
      </h2>

      {/* Haute Horlogerie Keyline with Diamond Center */}
      <div
        className={cn(
          "flex items-center gap-3 my-5 w-48 sm:w-64",
          isCenter ? "mx-auto" : ""
        )}
      >
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
        <span className="text-[#D4AF37] text-[10px] select-none">✦</span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
      </div>

      {subtitle && (
        <p className="max-w-2xl text-sm sm:text-base text-foreground/70 font-normal leading-relaxed tracking-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
