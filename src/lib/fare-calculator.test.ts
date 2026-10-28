import { describe, it, expect } from "vitest";
import {
  calculateFare,
  parseSmartSearch,
  generateWhatsAppBookingUrl,
} from "./fare-calculator";
import { fleetConfig } from "@/config/fleet";
import { routesConfig } from "@/config/routes";

describe("Fare Calculator", () => {
  it("calculates fare according to exact sanity test from spec", () => {
    // Spec: Sedan, 2 days, 400 km total, ₹15/km, 300 km/day min, ₹500 bata/day
    // billable km = max(400, 600) = 600 -> 600 * 15 = 9000 + 1000 bata = ₹10,000
    const result = calculateFare(
      {
        tripType: "outstation-roundtrip",
        vehicleId: "sedan",
        distanceKm: 400,
        days: 2,
        nightHalt: false,
      },
      fleetConfig
    );

    expect(result.actualKm).toBe(400);
    expect(result.days).toBe(2);
    expect(result.ratePerKm).toBe(15);
    expect(result.billableKm).toBe(600); // max(400, 300 * 2) = 600
    expect(result.kmFare).toBe(9000); // 600 * 15
    expect(result.totalDriverBata).toBe(1000); // 2 * 500
    expect(result.nightCharge).toBe(0);
    expect(result.estimatedTotal).toBe(10000);
  });

  it("calculates round trip when actual km exceeds minimum km", () => {
    // Sedan, 2 days, 750 km actual distance -> 750 > 600 min -> billable is 750
    const result = calculateFare(
      {
        tripType: "outstation-roundtrip",
        vehicleId: "sedan",
        distanceKm: 750,
        days: 2,
        nightHalt: false,
      },
      fleetConfig
    );

    expect(result.billableKm).toBe(750);
    expect(result.kmFare).toBe(750 * 15); // 11250
    expect(result.totalDriverBata).toBe(1000); // 2 * 500
    expect(result.estimatedTotal).toBe(12250);
  });

  it("adds night halt charge correctly for multi-day trips", () => {
    // 3 days, 1000 km, night halt true -> 2 nights * 400 = 800
    const result = calculateFare(
      {
        tripType: "outstation-roundtrip",
        vehicleId: "sedan",
        distanceKm: 1000,
        days: 3,
        nightHalt: true,
      },
      fleetConfig
    );

    expect(result.billableKm).toBe(1000); // 1000 > 900
    expect(result.kmFare).toBe(15000); // 1000 * 15
    expect(result.totalDriverBata).toBe(1500); // 3 * 500
    expect(result.nightCharge).toBe(800); // 2 nights * 400
    expect(result.estimatedTotal).toBe(17300);
  });

  it("calculates one-way outstation fare with minimum threshold", () => {
    // Sedan one-way: 150 km, but min is 250 km -> billable is 250 km
    const result = calculateFare(
      {
        tripType: "outstation-oneway",
        vehicleId: "sedan",
        distanceKm: 150,
        days: 1,
        nightHalt: false,
      },
      fleetConfig
    );

    expect(result.billableKm).toBe(250);
    expect(result.kmFare).toBe(250 * 15); // 3750
    expect(result.totalDriverBata).toBe(500);
    expect(result.estimatedTotal).toBe(4250);
  });

  it("calculates local hourly package with extra km", () => {
    // Local 8h/80km package with 95 km driven
    const result = calculateFare(
      {
        tripType: "local-package",
        vehicleId: "sedan",
        packageType: "8h80k",
        distanceKm: 95,
        days: 1,
        nightHalt: false,
      },
      fleetConfig
    );

    // Sedan base 8h/80km is 2400. 15 km extra * 15/km = 225. Total = 2625
    expect(result.basePackageFare).toBe(2400);
    expect(result.estimatedTotal).toBe(2625);
  });
});

describe("Smart Search Parser", () => {
  it("parses vehicle and distance correctly: 'innova 300 km'", () => {
    const parsed = parseSmartSearch("innova 300 km", fleetConfig, routesConfig);
    expect(parsed.detectedVehicleId).toBe("innova-crysta");
    expect(parsed.detectedDistanceKm).toBe(300);
  });

  it("parses vehicle, days, and distance: 'sedan 2 days 450 km'", () => {
    const parsed = parseSmartSearch(
      "sedan 2 days 450 km",
      fleetConfig,
      routesConfig
    );
    expect(parsed.detectedVehicleId).toBe("sedan");
    expect(parsed.detectedDays).toBe(2);
    expect(parsed.detectedDistanceKm).toBe(450);
  });

  it("parses route name: 'Puri to Bhubaneswar'", () => {
    const parsed = parseSmartSearch(
      "Puri to Bhubaneswar",
      fleetConfig,
      routesConfig
    );
    expect(parsed.detectedRoute?.id).toBe("puri-bhubaneswar");
    expect(parsed.detectedDistanceKm).toBe(60);
  });

  it("parses destination keyword: 'mysore'", () => {
    const parsed = parseSmartSearch("mysore", fleetConfig, routesConfig);
    expect(parsed.detectedRoute?.id).toBe("blr-mysore");
    expect(parsed.detectedDistanceKm).toBe(145);
  });
});

describe("WhatsApp URL Generation", () => {
  it("generates a valid WhatsApp URL with encoded booking details", () => {
    const url = generateWhatsAppBookingUrl({
      vehicleName: "Executive Sedan",
      tripType: "Outstation Round Trip",
      distanceKm: 400,
      days: 2,
      estimatedFare: 10000,
      pickupLocation: "Indiranagar, Bengaluru",
      dropLocation: "Mysore Palace",
    });

    expect(url).toContain("https://wa.me/919348716399");
    expect(url).toContain("text=");
    expect(decodeURIComponent(url)).toContain("Executive Sedan");
    expect(decodeURIComponent(url)).toContain("10,000");
  });
});
