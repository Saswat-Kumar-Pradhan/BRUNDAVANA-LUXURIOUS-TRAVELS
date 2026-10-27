"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { fleetConfig } from "@/config/fleet";
import {
  calculateFare,
  generateWhatsAppBookingUrl,
  TripType,
} from "@/lib/fare-calculator";
import {
  MapPin,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Plane,
  Navigation,
} from "lucide-react";

type ServiceTab = "outstation" | "airport" | "hourly";

export function BookingConsoleSection() {
  const [serviceTab, setServiceTab] = useState<ServiceTab>("outstation");
  const [tripType, setTripType] = useState<TripType>("outstation-oneway");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("sedan");

  // Input states
  const [passengerName, setPassengerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  // Distance / Duration states
  const [customDistanceKm, setCustomDistanceKm] = useState(150);
  const [hourlyPackage, setHourlyPackage] = useState<"4h" | "8h" | "12h">("8h");

  // Popular outstation quick destination chips
  const popularDestinations = [
    { name: "Mysuru", km: 150 },
    { name: "Coorg", km: 260 },
    { name: "Ooty", km: 280 },
    { name: "Tirupati", km: 250 },
    { name: "Chikmagalur", km: 245 },
    { name: "Wayanad", km: 290 },
  ];

  // Dynamic fare computation
  const fareResult = useMemo(() => {
    let effectiveKm = customDistanceKm;
    let days = 1;
    let computedTripType: TripType = tripType;

    if (serviceTab === "airport") {
      computedTripType = "city";
      effectiveKm = 45; // Standard Bengaluru Airport Corridor
    } else if (serviceTab === "hourly") {
      computedTripType = "local-package";
      effectiveKm = hourlyPackage === "4h" ? 40 : hourlyPackage === "8h" ? 80 : 120;
    } else {
      if (tripType === "outstation-roundtrip") {
        days = Math.max(2, Math.ceil((customDistanceKm * 2) / 300));
      }
    }

    const packageType =
      hourlyPackage === "4h"
        ? "4h40k"
        : hourlyPackage === "8h"
        ? "8h80k"
        : "12h120k";

    return calculateFare(
      {
        tripType: computedTripType,
        vehicleId: selectedVehicleId,
        distanceKm: effectiveKm,
        days,
        nightHalt: tripType === "outstation-roundtrip",
        packageType: serviceTab === "hourly" ? packageType : undefined,
      },
      fleetConfig
    );
  }, [serviceTab, tripType, selectedVehicleId, customDistanceKm, hourlyPackage]);

  const selectedVehicle = useMemo(() => {
    return fleetConfig.find((v) => v.id === selectedVehicleId) || fleetConfig[0];
  }, [selectedVehicleId]);

  const handleQuickDestination = (dest: { name: string; km: number }) => {
    setDropLocation(dest.name);
    setCustomDistanceKm(dest.km);
  };

  const handleBookOnWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const tripLabel =
      serviceTab === "outstation"
        ? tripType === "outstation-roundtrip"
          ? "Outstation (Round Trip)"
          : "Outstation (One Way)"
        : serviceTab === "airport"
        ? "Bengaluru Airport Transfer"
        : `Local Hourly Package (${hourlyPackage === "4h" ? "4 hrs / 40 km" : hourlyPackage === "8h" ? "8 hrs / 80 km" : "12 hrs / 120 km"})`;

    const url = generateWhatsAppBookingUrl({
      vehicleName: `${selectedVehicle.name} (${selectedVehicle.yearModel})`,
      tripType: tripLabel,
      distanceKm: fareResult.billableKm,
      days: fareResult.days,
      estimatedFare: fareResult.estimatedTotal,
      customerName: passengerName || "Customer",
      customerPhone: mobileNumber || undefined,
      pickupLocation: pickupLocation || "Bengaluru",
      dropLocation: dropLocation || (serviceTab === "airport" ? "KIA Airport" : "Bengaluru City"),
      travelDate: `${pickupDate || "Immediate"} ${pickupTime ? `at ${pickupTime}` : ""}`.trim(),
      notes: "Quick Console Booking (Transparent Pricing)",
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="booking-console"
      className="py-24 sm:py-32 lg:py-36 bg-[#FAF7EB] text-[#111114] relative overflow-hidden"
    >
      {/* Decorative Yellow Circles (matching Dribbble screenshot) */}
      <div
        aria-hidden="true"
        className="absolute top-20 left-10 w-16 h-16 rounded-full bg-[#F7BF17] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-48 -left-20 w-44 h-44 rounded-full bg-[#F7BF17] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-[#F7BF17] opacity-80 pointer-events-none"
      />

      <Container className="relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Spacious Pitch & Value Reassurances */}
          <div className="lg:col-span-5 flex flex-col items-start text-left pt-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-[#F7BF17] text-xs font-bold uppercase tracking-wider mb-5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct Chauffeur Allocation
            </span>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#111114] tracking-tight leading-[1.08] mb-6">
              Your Ride is
              <span className="block text-[#111114]">Just a Click Away</span>
            </h2>

            <p className="text-base text-zinc-700 leading-relaxed font-normal mb-8 max-w-lg">
              Book a safe, comfortable, and affordable cab instantly. Whether you&apos;re traveling within Bengaluru, heading outstation, or taking an airport transfer — we dispatch verified 2026 fleet vehicles with polite highway chauffeurs.
            </p>

            {/* Practical Service Highlights */}
            <div className="space-y-4 mb-9 w-full max-w-md">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-stone-200">
                <div className="w-9 h-9 rounded-xl bg-[#F7BF17] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-black">
                    Zero Hidden Charges
                  </h4>
                  <p className="text-xs text-zinc-600">
                    Transparent per-km billing with zero midnight surge pricing. Driver allowance included.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-stone-200">
                <div className="w-9 h-9 rounded-xl bg-[#F7BF17] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-black">
                    Prompt 24/7 Dispatch
                  </h4>
                  <p className="text-xs text-zinc-600">
                    Immediate confirmation on WhatsApp or phone with chauffeur contact in under 60s.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Helpline Button */}
            <div className="flex items-center gap-4">
              <a
                href={`tel:${siteConfig.contact.primaryPhone}`}
                className="rounded-full bg-black hover:bg-zinc-800 text-white px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#F7BF17]" />
                <span>Call Desk: {siteConfig.contact.primaryPhoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Redesigned Practical Booking Card */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] bg-[#0B0B0E] text-white p-6 sm:p-9 lg:p-10 shadow-2xl border border-zinc-800/80">
              <form onSubmit={handleBookOnWhatsApp} className="space-y-6">
                {/* 1. Practical Service Mode Tabs */}
                <div>
                  <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => {
                        setServiceTab("outstation");
                        setTripType("outstation-oneway");
                      }}
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                        serviceTab === "outstation"
                          ? "bg-[#F7BF17] text-black shadow-md font-extrabold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Outstation</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceTab("airport")}
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                        serviceTab === "airport"
                          ? "bg-[#F7BF17] text-black shadow-md font-extrabold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Plane className="w-3.5 h-3.5" />
                      <span>Airport</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceTab("hourly")}
                      className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                        serviceTab === "hourly"
                          ? "bg-[#F7BF17] text-black shadow-md font-extrabold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Local Rental</span>
                    </button>
                  </div>
                </div>

                {/* Sub-mode Toggles */}
                {serviceTab === "outstation" && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTripType("outstation-oneway")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        tripType === "outstation-oneway"
                          ? "bg-zinc-800 border-[#F7BF17] text-[#F7BF17]"
                          : "border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      One Way Trip
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType("outstation-roundtrip")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        tripType === "outstation-roundtrip"
                          ? "bg-zinc-800 border-[#F7BF17] text-[#F7BF17]"
                          : "border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      Round Trip (Min 300 km/day)
                    </button>
                  </div>
                )}

                {serviceTab === "hourly" && (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "4h", label: "4 Hrs / 40 km" },
                      { id: "8h", label: "8 Hrs / 80 km" },
                      { id: "12h", label: "12 Hrs / 120 km" },
                    ].map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setHourlyPackage(pkg.id as any)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          hourlyPackage === pkg.id
                            ? "bg-zinc-800 border-[#F7BF17] text-[#F7BF17]"
                            : "border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {pkg.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* 2. Passenger Details */}
                <div>
                  <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Passenger Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-[#FAF7EB] text-black placeholder:text-zinc-500 font-medium outline-none focus:ring-2 focus:ring-[#F7BF17]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number (+91)"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-[#FAF7EB] text-black placeholder:text-zinc-500 font-medium outline-none focus:ring-2 focus:ring-[#F7BF17]"
                    />
                  </div>
                </div>

                {/* 3. Pickup Details & Popular Destination Chips */}
                <div>
                  <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Journey Details
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="Pickup Location (e.g., Indiranagar)"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className="w-full px-4 py-3 pr-10 rounded-xl text-sm bg-[#FAF7EB] text-black placeholder:text-zinc-500 font-medium outline-none focus:ring-2 focus:ring-[#F7BF17]"
                        />
                        <MapPin className="w-4 h-4 text-zinc-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder={
                            serviceTab === "airport"
                              ? "KIA Kempegowda Airport"
                              : "Destination / Drop Location"
                          }
                          value={dropLocation}
                          onChange={(e) => setDropLocation(e.target.value)}
                          className="w-full px-4 py-3 pr-10 rounded-xl text-sm bg-[#FAF7EB] text-black placeholder:text-zinc-500 font-medium outline-none focus:ring-2 focus:ring-[#F7BF17]"
                        />
                        <MapPin className="w-4 h-4 text-zinc-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Quick Destination Chips for Outstation */}
                    {serviceTab === "outstation" && (
                      <div className="pt-1">
                        <span className="text-[11px] text-zinc-400 block mb-1.5 font-medium">
                          Popular Corridors (Tap to Autofill):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {popularDestinations.map((d) => (
                            <button
                              key={d.name}
                              type="button"
                              onClick={() => handleQuickDestination(d)}
                              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                                dropLocation === d.name
                                  ? "bg-[#F7BF17] text-black font-bold"
                                  : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-700"
                              }`}
                            >
                              {d.name} ({d.km} km)
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Date & Time Picker */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="relative">
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#FAF7EB] text-black font-medium outline-none focus:ring-2 focus:ring-[#F7BF17]"
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl text-sm bg-[#FAF7EB] text-black font-medium outline-none focus:ring-2 focus:ring-[#F7BF17]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Select Vehicle from the User's Exact 2026 Fleet */}
                <div>
                  <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Select 2026 Fleet Vehicle
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {fleetConfig.map((v) => {
                      const isSelected = selectedVehicleId === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVehicleId(v.id)}
                          className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                            isSelected
                              ? "bg-zinc-900 border-[#F7BF17] ring-1 ring-[#F7BF17]"
                              : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                          }`}
                        >
                          <div>
                            <span
                              className={`font-heading text-xs font-bold block ${
                                isSelected ? "text-white" : "text-zinc-300"
                              }`}
                            >
                              {v.name}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              {v.seats} Seater • {v.category.toUpperCase()}
                            </span>
                          </div>
                          <span className="font-heading text-xs font-black text-[#F7BF17] mt-2 block">
                            ₹{v.ratePerKm}/km
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Live Fare Breakdown Display */}
                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">
                      Selected Ride & Pricing
                    </span>
                    <span className="font-bold text-white text-sm">
                      {selectedVehicle.name} • {selectedVehicle.yearModel}
                    </span>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      {fareResult.billableKm} km billable • Driver allowance included
                    </span>
                  </div>

                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-800">
                    <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">
                      Est. Total Fare
                    </span>
                    <span className="font-heading text-2xl font-black text-[#F7BF17]">
                      ₹{fareResult.estimatedTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* 6. Action Button: Full Width Cream/White Button (Matching Dribbble Screenshot) */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#FAF7EB] hover:bg-white text-black font-heading text-sm font-black uppercase tracking-wider transition-all shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-black" />
                  <span>Book Now On WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
