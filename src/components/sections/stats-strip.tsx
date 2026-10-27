"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

function CounterItem({
  value,
  suffix,
  label,
  description,
}: {
  value: number;
  suffix: string;
  label: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const end = value;
    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easedProgress * (end - start) + start);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, value]);

  const formattedDisplay =
    value >= 1000 ? displayValue.toLocaleString("en-IN") : displayValue;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-6 rounded-2xl glass-panel border border-[#D4AF37]/20 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent group-hover:h-1 transition-all" />

      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-foreground flex items-baseline gap-1 tracking-tight">
        <span className="gold-gradient-text drop-shadow-sm">
          {formattedDisplay}
        </span>
        <span className="text-xl sm:text-2xl text-[#D4AF37] font-sans font-bold">
          {suffix}
        </span>
      </div>

      <div className="text-sm sm:text-base font-bold text-foreground mt-2">
        {label}
      </div>

      <div className="text-xs text-foreground/60 mt-1 max-w-[200px] leading-relaxed">
        {description}
      </div>
    </div>
  );
}

export function StatsStrip() {
  return (
    <section className="relative py-12 sm:py-16 -mt-8 sm:-mt-12 z-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {siteConfig.stats.map((stat) => (
            <CounterItem
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
