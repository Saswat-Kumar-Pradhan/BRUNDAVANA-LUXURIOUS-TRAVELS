"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { routesConfig, RouteItem } from "@/config/routes";
import { siteConfig } from "@/config/site";
import {
  Search,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";

export function PopularRoutesSection() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Routes" },
    { id: "weekend", label: "Weekend Getaways" },
    { id: "hill-station", label: "Hill Stations" },
    { id: "pilgrimage", label: "Temple Circuits" },
    { id: "beach", label: "Coastal & Beaches" },
    { id: "airport", label: "Airport Fast Track" },
  ];

  const filteredRoutes = routesConfig.filter((route) => {
    const matchesCat =
      activeCategory === "all" || route.category === activeCategory;
    const matchesSearch =
      route.title.toLowerCase().includes(query.toLowerCase()) ||
      route.to.toLowerCase().includes(query.toLowerCase()) ||
      route.from.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="routes" className="py-20 sm:py-28 relative bg-surface/50">
      <Container>
        <Reveal direction="up">
          <SectionHeading
            badge="Popular Highway Destinations"
            title="Searchable Travel"
            titleHighlight="Routes"
            subtitle="Explore frequently booked outstation corridors from Bengaluru. Transparent flat rates with no hidden driver surprises."
          />
        </Reveal>

        {/* Search & Category Filter */}
        <Reveal direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            {/* Search input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search city e.g. Mysore, Coorg, Ooty..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-surface-card border border-border focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-foreground outline-none transition-all placeholder:text-foreground/40"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeCategory === cat.id
                      ? "bg-[#D4AF37] text-[#0B0B0F] border-[#D4AF37]"
                      : "bg-surface-card text-foreground/75 border-border hover:border-[#D4AF37]/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route, index) => (
            <Reveal
              key={route.id}
              direction="up"
              delay={index * 0.05}
              className="h-full"
            >
              <div className="h-full rounded-2xl p-6 glass-panel border border-[#D4AF37]/25 hover:border-[#D4AF37]/65 gold-card-hover flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/10 text-[#C5A03A] dark:text-[#F3D98B] border border-[#D4AF37]/20">
                      {route.category}
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      {route.distanceKm} KM
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {route.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-foreground/60 mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{route.estimatedDuration}</span>
                  </div>

                  <p className="text-xs text-foreground/75 leading-relaxed mb-4">
                    {route.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {route.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-surface-card border border-border text-foreground/70"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-foreground/50 block">One-Way from</span>
                    <span className="font-serif text-lg font-black text-[#C5A03A] dark:text-[#F3D98B]">
                      ₹{route.startingPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Brundavana Luxurious Travels, I want to book a cab for ${route.title} (${route.distanceKm} km).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-foreground hover:text-[#0B0B0F] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Book Route</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
