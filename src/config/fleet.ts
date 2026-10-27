export type VehicleCategory =
  | "all"
  | "sedan"
  | "suv"
  | "premium"
  | "van";

export interface Vehicle {
  id: string;
  name: string;
  yearModel: string;
  category: "sedan" | "suv" | "premium" | "van";
  categoryLabel: string;
  unitsAvailable?: number;
  seats: number;
  luggageBags: number;
  hasAC: boolean;
  ratePerKm: number; // in INR
  minKmPerDay: number; // in km
  driverBataPerDay: number; // in INR
  nightCharge: number; // in INR (per night halt)
  oneWayMinKm: number; // in km for one-way outstation trips
  returnEmptyMultiplier?: number;
  hourlyPackages?: {
    fourHours40Km: number;
    eightHours80Km: number;
    twelveHours120Km: number;
    extraKmRate: number;
    extraHourRate: number;
  };
  imagePath: string;
  tag?: string;
  description: string;
  highlights: string[];
}

export const fleetCategories: Array<{ id: VehicleCategory; label: string }> = [
  { id: "all", label: "All Vehicles" },
  { id: "premium", label: "Innova Hycross & Crysta" },
  { id: "suv", label: "Carens Clavis & Rumion" },
  { id: "van", label: "Force Urbania 2026" },
  { id: "sedan", label: "Maruti Dzire 2026/2020" },
];

export const fleetConfig: Vehicle[] = [
  {
    id: "sedan",
    name: "Maruti Suzuki Dzire",
    yearModel: "2026 & 2020 Editions",
    category: "sedan",
    categoryLabel: "Executive Sedan",
    seats: 4,
    luggageBags: 3,
    hasAC: true,
    ratePerKm: 15,
    minKmPerDay: 300,
    driverBataPerDay: 500,
    nightCharge: 400,
    oneWayMinKm: 250,
    returnEmptyMultiplier: 1.0,
    hourlyPackages: {
      fourHours40Km: 1300,
      eightHours80Km: 2300,
      twelveHours120Km: 3200,
      extraKmRate: 14,
      extraHourRate: 150,
    },
    imagePath: "/images/vehicles/sedan.jpg",
    tag: "Best Value",
    description: "Available in brand-new 2026 edition and well-maintained 2020 commercial fleet. Smooth highway cruiser for couples, airport transfers, and business commutes.",
    highlights: ["Chilled Climate AC", "Large 378L Boot Space", "High Fuel Economy", "FastTag Enabled"],
  },
  {
    id: "toyota-rumion",
    name: "Toyota Rumion",
    yearModel: "2026 Edition",
    category: "suv",
    categoryLabel: "Premium Family MPV",
    seats: 6,
    luggageBags: 4,
    hasAC: true,
    ratePerKm: 17,
    minKmPerDay: 300,
    driverBataPerDay: 500,
    nightCharge: 450,
    oneWayMinKm: 250,
    returnEmptyMultiplier: 1.0,
    hourlyPackages: {
      fourHours40Km: 1700,
      eightHours80Km: 2900,
      twelveHours120Km: 3900,
      extraKmRate: 17,
      extraHourRate: 200,
    },
    imagePath: "/images/vehicles/suv.jpg",
    tag: "Family Special",
    description: "Brand-new 2026 Toyota Rumion. Superior Toyota ride comfort, flexible 3-row seating, and roof AC vents for relaxed family holiday tours.",
    highlights: ["Toyota Reliability", "Flexible 3-Row Seating", "Rear Roof AC Vents", "Deep Cushion Seats"],
  },
  {
    id: "carens-clavis",
    name: "Kia Carens Clavis",
    yearModel: "Top Model 2026",
    category: "suv",
    categoryLabel: "Luxury Crossover",
    seats: 6,
    luggageBags: 4,
    hasAC: true,
    ratePerKm: 19,
    minKmPerDay: 300,
    driverBataPerDay: 550,
    nightCharge: 450,
    oneWayMinKm: 250,
    returnEmptyMultiplier: 1.0,
    hourlyPackages: {
      fourHours40Km: 1900,
      eightHours80Km: 3200,
      twelveHours120Km: 4400,
      extraKmRate: 19,
      extraHourRate: 200,
    },
    imagePath: "/images/vehicles/suv.jpg",
    tag: "Top Model 2026",
    description: "The all-new 2026 Kia Carens Clavis top model. Futuristic styling, captain lounge chairs, panoramic views, and premium Bose audio.",
    highlights: ["Ventilated Captain Seats", "Sky Light Ambient View", "Bose Surround Audio", "Type-C Fast Ports"],
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    yearModel: "2026 Edition",
    category: "premium",
    categoryLabel: "Gold Standard MUV",
    seats: 7,
    luggageBags: 5,
    hasAC: true,
    ratePerKm: 22,
    minKmPerDay: 300,
    driverBataPerDay: 600,
    nightCharge: 500,
    oneWayMinKm: 250,
    returnEmptyMultiplier: 1.0,
    hourlyPackages: {
      fourHours40Km: 2200,
      eightHours80Km: 3800,
      twelveHours120Km: 5200,
      extraKmRate: 22,
      extraHourRate: 250,
    },
    imagePath: "/images/vehicles/innova.jpg",
    tag: "Highway King",
    description: "The undisputed emperor of Indian highways. 2026 edition Innova Crysta with plush captain seats, silent cabin, and unmatched long-haul endurance.",
    highlights: ["Captain Lounge Seats", "Tri-Zone Climate AC", "Massive Boot Capacity", "Hill Descent Control"],
  },
  {
    id: "innova-hycross",
    name: "Toyota Innova Hycross",
    yearModel: "2026 Hybrid (2 Units)",
    unitsAvailable: 2,
    category: "premium",
    categoryLabel: "Ultra Luxury Hybrid",
    seats: 7,
    luggageBags: 5,
    hasAC: true,
    ratePerKm: 25,
    minKmPerDay: 300,
    driverBataPerDay: 650,
    nightCharge: 550,
    oneWayMinKm: 250,
    returnEmptyMultiplier: 1.0,
    hourlyPackages: {
      fourHours40Km: 2600,
      eightHours80Km: 4500,
      twelveHours120Km: 6000,
      extraKmRate: 25,
      extraHourRate: 300,
    },
    imagePath: "/images/vehicles/innova.jpg",
    tag: "2 Units in Fleet",
    description: "Two dedicated units of the 2026 Innova Hycross Hybrid in our Bengaluru garage. Whisper-quiet electric glide, ottoman recliner seats, and royal executive ride quality.",
    highlights: ["2 Units Ready for Convoy", "Ottoman Recliner Seats", "Whisper Silent Hybrid", "Panoramic Glass Roof"],
  },
  {
    id: "urbania",
    name: "Force Urbania",
    yearModel: "2026 Luxury Van",
    category: "van",
    categoryLabel: "Elite Group Van",
    seats: 14,
    luggageBags: 12,
    hasAC: true,
    ratePerKm: 30,
    minKmPerDay: 350,
    driverBataPerDay: 750,
    nightCharge: 600,
    oneWayMinKm: 300,
    returnEmptyMultiplier: 1.0,
    hourlyPackages: {
      fourHours40Km: 3800,
      eightHours80Km: 6200,
      twelveHours120Km: 8500,
      extraKmRate: 30,
      extraHourRate: 400,
    },
    imagePath: "/images/vehicles/tempo.jpg",
    tag: "VIP Group Travel",
    description: "Next-generation 2026 Force Urbania luxury van. Wide aisle, individual European-style recliner seats, high roof, and airplane-style overhead AC blowers.",
    highlights: ["European Luxury Styling", "Individual Reclining Seats", "Overhead AC Vents", "Huge Dedicated Luggage Boot"],
  },
];
