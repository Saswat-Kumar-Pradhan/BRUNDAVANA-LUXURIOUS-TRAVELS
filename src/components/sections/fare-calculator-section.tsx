"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { fleetConfig, Vehicle } from "@/config/fleet";
import { routesConfig, RouteItem } from "@/config/routes";
import { siteConfig } from "@/config/site";
import {
  calculateFare,
  parseSmartSearch,
  generateWhatsAppBookingUrl,
  generateQuoteSummaryText,
  TripType,
} from "@/lib/fare-calculator";
import {
  Search,
  Calculator,
  Car,
  Calendar,
  Moon,
  MessageCircle,
  Phone,
  Copy,
  Check,
  Sparkles,
  Info,
  ShieldAlert,
  ArrowRight,
  Sliders,
  MapPin,
} from "lucide-react";

export function FareCalculatorSection() {
  // Input states
  const [tripType, setTripType] = useState<TripType>("outstation-roundtrip");
  const [vehicleId, setVehicleId] = useState<string>("sedan");
  const [distanceKm, setDistanceKm] = useState<number>(400);
  const [days, setDays] = useState<number>(2);
  const [nightHalt, setNightHalt] = useState<boolean>(false);
  const [packageType, setPackageType] = useState<"4h40k" | "8h80k" | "12h120k">("8h80k");
  const [selectedRouteId, setSelectedRouteId] = useState<string>("");

  // Smart search state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFeedback, setSearchFeedback] = useState<string>("");

  // Feedback states
  const [copied, setCopied] = useState<boolean>(false);

  // Selected route object
  const currentRoute = routesConfig.find((r) => r.id === selectedRouteId);

  // Calculated fare
  const fareResult = useMemo(() => {
    return calculateFare(
      {
        tripType,
        vehicleId,
        distanceKm,
        days,
        nightHalt,
        packageType,
      },
      fleetConfig
    );
  }, [tripType, vehicleId, distanceKm, days, nightHalt, packageType]);

  // Animated Count-Up for Total Fare
  const [displayedFare, setDisplayedFare] = useState<number>(fareResult.estimatedTotal);
  const prevFareRef = useRef<number>(fareResult.estimatedTotal);

  useEffect(() => {
    const start = prevFareRef.current;
    const end = fareResult.estimatedTotal;
    const duration = 500;
    const startTime = performance.now();

    const animateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const factor = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * factor);
      setDisplayedFare(current);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setDisplayedFare(end);
        prevFareRef.current = end;
      }
    };

    requestAnimationFrame(animateNumber);
  }, [fareResult.estimatedTotal]);

  // Handle route dropdown selection
  const handleRouteChange = (routeId: string) => {
    setSelectedRouteId(routeId);
    if (!routeId) return;

    const r = routesConfig.find((item) => item.id === routeId);
    if (r) {
      // For roundtrip, double distance or use suggested days
      const tripKm = tripType === "outstation-roundtrip" ? r.distanceKm * 2 : r.distanceKm;
      setDistanceKm(tripKm);
      if (r.suggestedDays && tripType === "outstation-roundtrip") {
        setDays(r.suggestedDays);
      }
      if (r.popularVehicleId) {
        setVehicleId(r.popularVehicleId);
      }
      setSearchFeedback(`Selected route: ${r.title} (${r.distanceKm} km one-way)`);
    }
  };

  // Smart search trigger
  const handleSmartSearch = (queryText: string) => {
    setSearchQuery(queryText);
    if (!queryText.trim()) {
      setSearchFeedback("");
      return;
    }

    const parsed = parseSmartSearch(queryText, fleetConfig, routesConfig);

    if (parsed.detectedVehicleId) {
      setVehicleId(parsed.detectedVehicleId);
    }
    if (parsed.detectedDistanceKm) {
      setDistanceKm(parsed.detectedDistanceKm);
    }
    if (parsed.detectedDays) {
      setDays(parsed.detectedDays);
    }
    if (parsed.detectedTripType) {
      setTripType(parsed.detectedTripType);
    }
    if (parsed.detectedRoute) {
      setSelectedRouteId(parsed.detectedRoute.id);
    }

    if (parsed.rawMatchedTerms.length > 0) {
      setSearchFeedback(`Parsed: ${parsed.rawMatchedTerms.join(" • ")}`);
    } else {
      setSearchFeedback("Could not detect vehicle/route keywords. Try 'innova 300 km' or 'Puri to Bhubaneswar'");
    }
  };

  // Copy Quote action with confetti
  const handleCopyQuote = async () => {
    const text = generateQuoteSummaryText(
      fareResult,
      currentRoute ? currentRoute.title : undefined
    );
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#F3D98B", "#D4AF37", "#A8851F"],
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const whatsAppUrl = generateWhatsAppBookingUrl({
    vehicleName: `${fareResult.vehicle.name} (${fareResult.vehicle.yearModel || fareResult.vehicle.categoryLabel})`,
    tripType:
      tripType === "outstation-roundtrip"
        ? "Outstation (Round Trip)"
        : tripType === "outstation-oneway"
        ? "Outstation (One-Way)"
        : tripType === "local-package"
        ? `Local Package (${packageType})`
        : "City Ride",
    distanceKm: fareResult.actualKm,
    days: fareResult.days,
    estimatedFare: fareResult.estimatedTotal,
    driverBata: fareResult.totalDriverBata,
    nightCharge: fareResult.nightCharge,
    pickupLocation: currentRoute ? currentRoute.from : "Bengaluru",
    dropLocation: currentRoute ? currentRoute.to : undefined,
    notes: `Billable: ${fareResult.billableKm} km @ ₹${fareResult.ratePerKm}/km`,
  });

  const chips = [
    { label: "innova 300 km", query: "innova 300 km" },
    { label: "sedan 2 days 450 km", query: "sedan 2 days 450 km" },
    { label: "Puri to Bhubaneswar", query: "Puri to Bhubaneswar" },
    { label: "Bangalore to Mysore", query: "Bangalore to Mysore" },
    { label: "Ertiga SUV 3 days 800 km", query: "ertiga 3 days 800 km" },
    { label: "Tempo 2 days 600 km", query: "tempo 2 days 600 km" },
  ];

  return (
    <section id="fare-calculator" className="py-20 sm:py-28 relative">
      <Container>
        <Reveal direction="up">
          <SectionHeading
            badge="Instant Transparent Estimation"
            title="Instant Fare"
            titleHighlight="Calculator"
            subtitle="Plan with 100% pricing certainty. Use our AI-friendly smart search or configure trip details below to get an instant quote."
          />
        </Reveal>

        {/* Smart Search Bar */}
        <Reveal direction="up" delay={0.1}>
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative rounded-2xl glass-panel border border-[#D4AF37]/40 shadow-xl overflow-hidden focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/30 transition-all">
              <div className="flex items-center px-4 py-3.5">
                <Search className="w-5 h-5 text-[#D4AF37] shrink-0 mr-3" />
                <input
                  type="text"
                  placeholder="Smart Search: Type e.g. 'sedan 2 days 450 km', 'innova 300 km', or 'Puri to Bhubaneswar'..."
                  value={searchQuery}
                  onChange={(e) => handleSmartSearch(e.target.value)}
                  className="w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-foreground/45 outline-none font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchFeedback("");
                    }}
                    className="text-xs px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 text-foreground/70"
                  >
                    Clear
                  </button>
                )}
              </div>

              {searchFeedback && (
                <div className="px-4 py-2 bg-[#D4AF37]/10 border-t border-[#D4AF37]/20 text-xs font-semibold text-[#C5A03A] dark:text-[#F3D98B] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{searchFeedback}</span>
                </div>
              )}
            </div>

            {/* Suggestion Chips */}
            <div className="flex items-center flex-wrap gap-2 mt-3 px-1">
              <span className="text-xs text-foreground/50 font-medium mr-1">
                Suggestions:
              </span>
              {chips.map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSmartSearch(chip.query)}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-border/80 bg-surface/80 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-foreground/80 hover:text-foreground transition-all"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Main Calculator Body: Controls + Breakdown Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <Reveal direction="up" delay={0.15} className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-[#D4AF37]/25 shadow-xl space-y-6">
              {/* Trip Type Tabs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-2.5">
                  1. Select Trip Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "outstation-roundtrip", label: "Outstation (Round Trip)" },
                    { id: "outstation-oneway", label: "Outstation (One-Way)" },
                    { id: "local-package", label: "Local Hourly Package" },
                    { id: "city", label: "City Ride" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setTripType(tab.id as TripType)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-center flex flex-col items-center justify-center border ${
                        tripType === tab.id
                          ? "bg-[#D4AF37] text-[#0B0B0F] border-[#D4AF37] shadow-md font-bold"
                          : "bg-surface-card text-foreground/75 border-border hover:border-[#D4AF37]/40"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-2.5">
                  2. Choose Vehicle
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fleetConfig.map((veh) => (
                    <div
                      key={veh.id}
                      onClick={() => setVehicleId(veh.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        vehicleId === veh.id
                          ? "border-[#D4AF37] bg-[#D4AF37]/10 ring-1 ring-[#D4AF37] shadow-sm"
                          : "border-border bg-surface-card hover:border-[#D4AF37]/40"
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-foreground block">
                          {veh.name}
                        </span>
                        <span className="text-[11px] text-foreground/60">
                          {veh.seats} Seats • ₹{veh.ratePerKm}/km
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#C5A03A] dark:text-[#F3D98B]">
                          ₹{veh.ratePerKm}
                        </span>
                        <span className="text-[10px] text-foreground/50 block">/km</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Route Fast-Fill Dropdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-2">
                  Auto-fill Distance from Popular Route (Optional)
                </label>
                <div className="relative">
                  <select
                    value={selectedRouteId}
                    onChange={(e) => handleRouteChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-surface-card border border-border focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-foreground outline-none transition-all cursor-pointer"
                  >
                    <option value="">-- Or choose a popular route --</option>
                    {routesConfig.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.title} ({r.distanceKm} km one-way)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Distance Slider & Input (for outstation or city) */}
              {tripType !== "local-package" ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Estimated Travel Distance (KM)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={10}
                        max={3000}
                        step={10}
                        value={distanceKm}
                        onChange={(e) =>
                          setDistanceKm(Math.max(1, parseInt(e.target.value) || 0))
                        }
                        className="w-24 px-2.5 py-1 text-right text-sm font-bold bg-surface-card border border-[#D4AF37]/50 rounded-lg text-foreground focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      />
                      <span className="text-xs font-semibold text-foreground/70">KM</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={20}
                    max={1500}
                    step={10}
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(parseInt(e.target.value, 10))}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-foreground/50 mt-1">
                    <span>20 km</span>
                    <span>300 km</span>
                    <span>600 km</span>
                    <span>1,000 km</span>
                    <span>1,500 km</span>
                  </div>
                </div>
              ) : (
                /* Local Package Tier Selector */
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-2">
                    Local Hourly Package Tier
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "4h40k", label: "4 Hrs / 40 KM" },
                      { id: "8h80k", label: "8 Hrs / 80 KM" },
                      { id: "12h120k", label: "12 Hrs / 120 KM" },
                    ].map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() =>
                          setPackageType(pkg.id as "4h40k" | "8h80k" | "12h120k")
                        }
                        className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                          packageType === pkg.id
                            ? "bg-[#D4AF37] text-[#0B0B0F] border-[#D4AF37] font-bold"
                            : "bg-surface-card text-foreground/80 border-border hover:border-[#D4AF37]/50"
                        }`}
                      >
                        {pkg.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Number of Days (Round-trip) & Night Halt Extras */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {tripType === "outstation-roundtrip" && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground/70 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Trip Duration (Days)
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDays(Math.max(1, days - 1))}
                        className="w-9 h-9 rounded-lg border border-border bg-surface-card flex items-center justify-center font-bold text-foreground hover:border-[#D4AF37]"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={days}
                        onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center py-1.5 font-bold text-sm bg-surface-card border border-border rounded-lg text-foreground focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setDays(days + 1)}
                        className="w-9 h-9 rounded-lg border border-border bg-surface-card flex items-center justify-center font-bold text-foreground hover:border-[#D4AF37]"
                      >
                        +
                      </button>
                      <span className="text-xs text-foreground/60 ml-1">Day(s)</span>
                    </div>
                  </div>
                )}

                {/* Night Halt Checkbox */}
                <div className="flex items-center gap-3 pt-4 sm:pt-6">
                  <input
                    type="checkbox"
                    id="nightHaltCheck"
                    checked={nightHalt}
                    onChange={(e) => setNightHalt(e.target.checked)}
                    className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37] accent-[#D4AF37] cursor-pointer"
                  />
                  <label
                    htmlFor="nightHaltCheck"
                    className="text-xs sm:text-sm font-semibold text-foreground cursor-pointer flex items-center gap-1.5"
                  >
                    <Moon className="w-4 h-4 text-[#D4AF37]" />
                    Includes Overnight / Night Halt
                  </label>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Breakdown & Total Card (5 cols) */}
          <Reveal direction="up" delay={0.25} className="lg:col-span-5">
            <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-[#D4AF37]/45 shadow-2xl relative overflow-hidden">
              {/* Gold Top Header Glow */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F3D98B] via-[#D4AF37] to-[#A8851F]" />

              <div className="flex items-center justify-between pb-4 border-b border-border/80">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A03A] dark:text-[#F3D98B] block">
                    Transparent Fare Breakdown
                  </span>
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {fareResult.vehicle.name}
                  </h3>
                </div>
                <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/15 text-[#C5A03A] dark:text-[#F3D98B] border border-[#D4AF37]/30">
                  ₹{fareResult.ratePerKm}/km
                </div>
              </div>

              {/* Itemized Line Items */}
              <div className="py-4 space-y-2.5 text-xs sm:text-sm border-b border-border/80">
                <div className="flex justify-between items-center text-foreground/80">
                  <span>Actual Distance Entered:</span>
                  <span className="font-semibold text-foreground">
                    {fareResult.actualKm} KM
                  </span>
                </div>

                <div className="flex justify-between items-center text-foreground/80">
                  <span className="flex items-center gap-1">
                    Billable Distance:
                    <Info className="w-3 h-3 text-[#D4AF37]" />
                  </span>
                  <span className="font-bold text-foreground">
                    {fareResult.billableKm} KM
                  </span>
                </div>

                <div className="flex justify-between items-center text-foreground/80">
                  <span>Base KM Charge ({fareResult.billableKm} km × ₹{fareResult.ratePerKm}):</span>
                  <span className="font-semibold text-foreground">
                    ₹{fareResult.kmFare.toLocaleString("en-IN")}
                  </span>
                </div>

                {fareResult.totalDriverBata > 0 && (
                  <div className="flex justify-between items-center text-foreground/80">
                    <span>
                      Driver Allowance / Bata ({fareResult.days} Day(s) × ₹{fareResult.driverBataPerDay}):
                    </span>
                    <span className="font-semibold text-foreground">
                      ₹{fareResult.totalDriverBata.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {fareResult.nightCharge > 0 && (
                  <div className="flex justify-between items-center text-foreground/80">
                    <span>Night Halt Charge:</span>
                    <span className="font-semibold text-foreground">
                      ₹{fareResult.nightCharge.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {/* Calculation Explanations */}
                {fareResult.breakdownNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-surface-card border border-border text-[11px] text-foreground/70"
                  >
                    • {note}
                  </div>
                ))}
              </div>

              {/* Total Estimated Fare with Animated Count-Up */}
              <div className="py-5 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/60 block mb-1">
                  Total Estimated Fare
                </span>
                <div className="font-serif text-4xl sm:text-5xl font-black text-[#C5A03A] dark:text-[#F3D98B] tracking-tight">
                  ₹{displayedFare.toLocaleString("en-IN")}
                </div>
                <p className="text-[11px] text-foreground/60 mt-1.5">
                  Toll gates, airport parking & interstate tax extra as per actual receipts.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                {/* Book on WhatsApp */}
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-gradient-btn w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/25"
                >
                  <MessageCircle className="w-5 h-5 fill-current text-[#0B0B0F]" />
                  <span>Book this Fare on WhatsApp</span>
                </a>

                {/* Call & Copy Quote Secondary Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${siteConfig.contact.primaryPhone}`}
                    className="py-2.5 px-3 rounded-xl border border-border hover:border-[#D4AF37] bg-surface-card text-xs font-semibold text-foreground flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Call Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyQuote}
                    className="py-2.5 px-3 rounded-xl border border-border hover:border-[#D4AF37] bg-surface-card text-xs font-semibold text-foreground flex items-center justify-center gap-1.5 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Copy Quote</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
