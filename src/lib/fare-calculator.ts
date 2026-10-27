import { Vehicle } from "@/config/fleet";
import { RouteItem } from "@/config/routes";
import { siteConfig } from "@/config/site";

export type TripType =
  | "outstation-roundtrip"
  | "outstation-oneway"
  | "local-package"
  | "city";

export interface FareCalculationInput {
  tripType: TripType;
  vehicleId: string;
  distanceKm: number;
  days: number;
  nightHalt: boolean;
  packageType?: "4h40k" | "8h80k" | "12h120k";
  pickupLocation?: string;
  dropLocation?: string;
  travelDate?: string;
}

export interface FareCalculationResult {
  vehicle: Vehicle;
  tripType: TripType;
  actualKm: number;
  billableKm: number;
  ratePerKm: number;
  kmFare: number;
  days: number;
  driverBataPerDay: number;
  totalDriverBata: number;
  nightCharge: number;
  basePackageFare?: number;
  subtotal: number;
  estimatedTotal: number;
  breakdownNotes: string[];
}

/**
 * Calculates fare according to business logic.
 *
 * Example sanity test:
 * Sedan, 2 days, 400 km total, ₹15/km, 300 km/day min, ₹500 bata/day:
 * - billable km = max(400, 300 * 2) = max(400, 600) = 600 km
 * - km charge = 600 * ₹15 = ₹9,000
 * - driver bata = 2 * ₹500 = ₹1,000
 * - night charge = 0 (unless selected)
 * - total = ₹9,000 + ₹1,000 = ₹10,000.
 */
export function calculateFare(
  input: FareCalculationInput,
  vehicles: Vehicle[]
): FareCalculationResult {
  const vehicle =
    vehicles.find((v) => v.id === input.vehicleId) || vehicles[0];

  const actualKm = Math.max(1, Math.round(input.distanceKm || 0));
  const days = Math.max(1, Math.round(input.days || 1));
  const ratePerKm = vehicle.ratePerKm;
  const driverBataPerDay = vehicle.driverBataPerDay;

  let billableKm = actualKm;
  let kmFare = 0;
  let totalDriverBata = 0;
  let nightCharge = 0;
  let basePackageFare = 0;
  const breakdownNotes: string[] = [];

  if (input.tripType === "outstation-roundtrip") {
    const minKmThreshold = vehicle.minKmPerDay * days;
    billableKm = Math.max(actualKm, minKmThreshold);
    kmFare = billableKm * ratePerKm;
    totalDriverBata = driverBataPerDay * days;

    if (billableKm > actualKm) {
      breakdownNotes.push(
        `Minimum daily limit applied: ${days} day(s) × ${vehicle.minKmPerDay} km = ${minKmThreshold} km`
      );
    } else {
      breakdownNotes.push(`Actual distance exceeded minimum daily threshold (${actualKm} km)`);
    }

    if (input.nightHalt) {
      // Night halts typically apply for each night spent (days - 1, or at least 1)
      const nights = Math.max(1, days - 1);
      nightCharge = vehicle.nightCharge * nights;
      breakdownNotes.push(`Night halt charge: ${nights} night(s) × ₹${vehicle.nightCharge}`);
    }
  } else if (input.tripType === "outstation-oneway") {
    // One way: billable km is max(actualKm, oneWayMinKm)
    const minThreshold = vehicle.oneWayMinKm || 250;
    const baseKm = Math.max(actualKm, minThreshold);
    const returnMultiplier = vehicle.returnEmptyMultiplier || 1.0;
    billableKm = Math.round(baseKm * returnMultiplier);
    kmFare = billableKm * ratePerKm;
    totalDriverBata = driverBataPerDay * 1; // 1-day allowance for one-way

    if (actualKm < minThreshold) {
      breakdownNotes.push(`One-way minimum distance applied (${minThreshold} km)`);
    }
    if (returnMultiplier > 1.0) {
      breakdownNotes.push(`Return route empty travel factor (${returnMultiplier}x)`);
    }
    if (input.nightHalt) {
      nightCharge = vehicle.nightCharge;
      breakdownNotes.push(`Late night arrival charge: ₹${vehicle.nightCharge}`);
    }
  } else if (input.tripType === "local-package") {
    const pkg = input.packageType || "8h80k";
    let pkgKm = 80;
    let pkgCost = 2400;

    if (vehicle.hourlyPackages) {
      if (pkg === "4h40k") {
        pkgKm = 40;
        pkgCost = vehicle.hourlyPackages.fourHours40Km;
      } else if (pkg === "12h120k") {
        pkgKm = 120;
        pkgCost = vehicle.hourlyPackages.twelveHours120Km;
      } else {
        pkgKm = 80;
        pkgCost = vehicle.hourlyPackages.eightHours80Km;
      }
    }

    basePackageFare = pkgCost;
    const extraKm = Math.max(0, actualKm - pkgKm);
    const extraKmRate = vehicle.hourlyPackages?.extraKmRate || ratePerKm;
    const extraKmFare = extraKm * extraKmRate;

    billableKm = pkgKm + extraKm;
    kmFare = basePackageFare + extraKmFare;
    totalDriverBata = 0; // included in local package base

    breakdownNotes.push(
      `Package base: ${pkg === "4h40k" ? "4 Hrs / 40 KM" : pkg === "12h120k" ? "12 Hrs / 120 KM" : "8 Hrs / 80 KM"} (₹${pkgCost})`
    );
    if (extraKm > 0) {
      breakdownNotes.push(
        `Extra km driven: ${extraKm} km × ₹${extraKmRate}/km = ₹${extraKmFare}`
      );
    }
  } else {
    // City ride (point-to-point)
    billableKm = Math.max(10, actualKm);
    kmFare = billableKm * ratePerKm;
    totalDriverBata = 0; // Included in city rates
    breakdownNotes.push(`City ride rate: ${billableKm} km × ₹${ratePerKm}/km`);
  }

  const subtotal = kmFare + totalDriverBata + nightCharge;
  const estimatedTotal = Math.round(subtotal);

  return {
    vehicle,
    tripType: input.tripType,
    actualKm,
    billableKm,
    ratePerKm,
    kmFare,
    days,
    driverBataPerDay,
    totalDriverBata,
    nightCharge,
    basePackageFare,
    subtotal,
    estimatedTotal,
    breakdownNotes,
  };
}

export interface SmartSearchResult {
  detectedVehicleId?: string;
  detectedDistanceKm?: number;
  detectedDays?: number;
  detectedTripType?: TripType;
  detectedRoute?: RouteItem;
  detectedRouteName?: string;
  rawMatchedTerms: string[];
}

/**
 * Parses freeform natural language queries like:
 * - "innova 300 km"
 * - "sedan 2 days 450 km"
 * - "Puri to Bhubaneswar"
 * - "blr to mysore 2 days"
 * - "ertiga round trip 600km"
 */
export function parseSmartSearch(
  query: string,
  vehicles: Vehicle[],
  routes: RouteItem[]
): SmartSearchResult {
  const normalized = query.toLowerCase().trim();
  const matchedTerms: string[] = [];

  let detectedVehicleId: string | undefined;
  let detectedDistanceKm: number | undefined;
  let detectedDays: number | undefined;
  let detectedTripType: TripType | undefined;
  let detectedRoute: RouteItem | undefined;
  let detectedRouteName: string | undefined;

  if (!normalized) {
    return { rawMatchedTerms: [] };
  }

  // 1. Check for Popular Route match first (e.g. "puri to bhubaneswar", "bangalore to mysore", "ooty", "coorg")
  for (const route of routes) {
    const routeTitle = route.title.toLowerCase();
    const from = route.from.toLowerCase();
    const to = route.to.toLowerCase();
    const routeId = route.id.toLowerCase();

    // Check if query contains routeId, title, or from and to
    if (
      normalized.includes(routeId) ||
      normalized.includes(routeTitle) ||
      (normalized.includes(from) && normalized.includes(to)) ||
      normalized.includes(to)
    ) {
      detectedRoute = route;
      detectedRouteName = `${route.from} to ${route.to}`;
      detectedDistanceKm = route.distanceKm;
      if (route.suggestedDays) {
        detectedDays = route.suggestedDays;
      }
      if (route.popularVehicleId) {
        detectedVehicleId = route.popularVehicleId;
      }
      matchedTerms.push(route.title);
      break;
    }
  }

  // 2. Check for vehicle matches
  for (const v of vehicles) {
    const vName = v.name.toLowerCase();
    const vId = v.id.toLowerCase();
    const vCategory = v.category.toLowerCase();
    const yearModel = (v.yearModel || "").toLowerCase();

    const isMatch =
      normalized.includes(vId) ||
      normalized.includes(vName) ||
      normalized.includes(vCategory) ||
      yearModel.split(/[\/, ]+/).some((token) => token.length > 2 && normalized.includes(token)) ||
      (vId === "innova-crysta" && (normalized.includes("innova") || normalized.includes("crysta"))) ||
      (vId === "innova-hycross" && normalized.includes("hycross")) ||
      (vId === "carens-clavis" && (normalized.includes("carens") || normalized.includes("clavis"))) ||
      (vId === "toyota-rumion" && normalized.includes("rumion")) ||
      (vId === "urbania" && normalized.includes("urbania")) ||
      (vId === "sedan" && (normalized.includes("sedan") || normalized.includes("dzire")));

    if (isMatch) {
      detectedVehicleId = v.id;
      matchedTerms.push(v.name);
      break;
    }
  }

  // 3. Extract distance (e.g. "300 km", "450km", "600 kms")
  const distanceRegex = /(\d+)\s*(?:km|kms|kilometer|kilometers)/i;
  const distMatch = normalized.match(distanceRegex);
  if (distMatch && distMatch[1]) {
    detectedDistanceKm = parseInt(distMatch[1], 10);
    matchedTerms.push(`${detectedDistanceKm} km`);
  }

  // 4. Extract days (e.g. "2 days", "3 day", "1day")
  const daysRegex = /(\d+)\s*(?:days|day|d)\b/i;
  const daysMatch = normalized.match(daysRegex);
  if (daysMatch && daysMatch[1]) {
    detectedDays = parseInt(daysMatch[1], 10);
    matchedTerms.push(`${detectedDays} day(s)`);
  }

  // 5. Detect trip type
  if (normalized.includes("one way") || normalized.includes("oneway") || normalized.includes("drop")) {
    detectedTripType = "outstation-oneway";
    matchedTerms.push("One-Way");
  } else if (
    normalized.includes("round trip") ||
    normalized.includes("roundtrip") ||
    normalized.includes("return")
  ) {
    detectedTripType = "outstation-roundtrip";
    matchedTerms.push("Round Trip");
  } else if (normalized.includes("local") || normalized.includes("hourly") || normalized.includes("rental")) {
    detectedTripType = "local-package";
    matchedTerms.push("Local Package");
  } else if (normalized.includes("city")) {
    detectedTripType = "city";
    matchedTerms.push("City Ride");
  }

  return {
    detectedVehicleId,
    detectedDistanceKm,
    detectedDays,
    detectedTripType,
    detectedRoute,
    detectedRouteName,
    rawMatchedTerms: matchedTerms,
  };
}

export interface BookingDetails {
  vehicleName: string;
  tripType: string;
  distanceKm: number;
  days: number;
  pickupLocation?: string;
  dropLocation?: string;
  travelDate?: string;
  estimatedFare: number;
  driverBata?: number;
  nightCharge?: number;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
}

/**
 * Builds a formatted WhatsApp booking URL with pre-filled message text.
 */
export function generateWhatsAppBookingUrl(details: BookingDetails): string {
  const number = siteConfig.contact.whatsappNumber;
  const lines = [
    `*NEW BOOKING INQUIRY - ${siteConfig.brand.name}*`,
    `----------------------------------------`,
    `🚗 *Vehicle:* ${details.vehicleName}`,
    `📍 *Trip Type:* ${details.tripType}`,
    details.pickupLocation ? `🛫 *Pickup:* ${details.pickupLocation}` : "",
    details.dropLocation ? `🛬 *Drop:* ${details.dropLocation}` : "",
    details.travelDate ? `📅 *Travel Date:* ${details.travelDate}` : "",
    `📏 *Distance:* ${details.distanceKm} KM`,
    `⏱️ *Duration:* ${details.days} Day(s)`,
    `💰 *Estimated Fare:* ₹${details.estimatedFare.toLocaleString("en-IN")}`,
    details.driverBata ? `👨‍✈️ *Driver Bata:* ₹${details.driverBata.toLocaleString("en-IN")}` : "",
    details.nightCharge ? `🌙 *Night Charge:* ₹${details.nightCharge.toLocaleString("en-IN")}` : "",
    details.customerName ? `👤 *Customer:* ${details.customerName}` : "",
    details.customerPhone ? `📞 *Phone:* ${details.customerPhone}` : "",
    details.notes ? `📝 *Notes:* ${details.notes}` : "",
    `----------------------------------------`,
    `_Note: Tolls, parking, and state entry permits extra as per actuals._`,
    `Please confirm cab availability and driver details. Thank you!`,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Generates plain text quote for clipboard copying.
 */
export function generateQuoteSummaryText(result: FareCalculationResult, routeName?: string): string {
  const tripLabel =
    result.tripType === "outstation-roundtrip"
      ? "Outstation (Round Trip)"
      : result.tripType === "outstation-oneway"
      ? "Outstation (One-Way)"
      : result.tripType === "local-package"
      ? "Local Hourly Package"
      : "City Ride";

  return `*${siteConfig.brand.name} - Instant Fare Quote*
----------------------------------------
Vehicle: ${result.vehicle.name} (${result.vehicle.yearModel})
Trip: ${tripLabel}${routeName ? ` [${routeName}]` : ""}
Distance: ${result.actualKm} km (Billable: ${result.billableKm} km @ ₹${result.ratePerKm}/km)
Days: ${result.days} Day(s)
Base KM Fare: ₹${result.kmFare.toLocaleString("en-IN")}
Driver Bata: ₹${result.totalDriverBata.toLocaleString("en-IN")}
Night Charge: ₹${result.nightCharge.toLocaleString("en-IN")}
----------------------------------------
ESTIMATED TOTAL: ₹${result.estimatedTotal.toLocaleString("en-IN")}
----------------------------------------
* Toll, parking, and state entry tax extra as per actual receipts.
* 24x7 Support: ${siteConfig.contact.primaryPhoneDisplay} | WhatsApp: ${siteConfig.contact.whatsappNumberDisplay}
Website: www.brundavanatravels.com`;
}
