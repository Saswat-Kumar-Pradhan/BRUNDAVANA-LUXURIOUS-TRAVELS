export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  startingPrice: string;
  badge: string;
  features: string[];
  recommendedVehicles: string;
}

export const servicesConfig: ServiceItem[] = [
  {
    id: "outstation",
    title: "Outstation Trips (One-Way & Round Trip)",
    shortDesc: "Intercity highway travel with transparent per-km billing and seasoned highway chauffeurs.",
    fullDesc:
      "Whether it is an emergency one-way drop or a multi-day family holiday across South India, our outstation cabs provide unmatched reliability, pristine interiors, and courteous drivers.",
    iconName: "Compass",
    startingPrice: "From ₹12/km",
    badge: "Most Popular",
    features: [
      "Transparent per-km rate with zero surge",
      "One-way drops & multi-day round trips",
      "No hidden driver charges; clear daily bata",
      "Complimentary luggage carrier on request",
    ],
    recommendedVehicles: "Sedan, Ertiga SUV, Innova Crysta",
  },
  {
    id: "airport-transfers",
    title: "Airport & Railway Transfers",
    shortDesc: "Punctual, 24x7 doorstep pickups and drops to Kempegowda Int'l Airport (KIA) & Bengaluru stations.",
    fullDesc:
      "Avoid surge prices and endless app cancellations. Pre-book your airport taxi with live flight tracking, polite chauffeur meet-and-greet, and generous luggage capacity.",
    iconName: "Plane",
    startingPrice: "From ₹999 Flat",
    badge: "24x7 Guaranteed",
    features: [
      "Real-time flight arrival & delay tracking",
      "Zero midnight surge pricing guarantee",
      "Doorstep pickup across all Bengaluru pin codes",
      "Luggage assistance included",
    ],
    recommendedVehicles: "Swift Dzire, Toyota Etios, Innova Crysta",
  },
  {
    id: "local-hourly",
    title: "Local Hourly Rental Packages",
    shortDesc: "Hire a premium cab with chauffeur on standby for business meetings, shopping, or city tours.",
    fullDesc:
      "Keep the car waiting while you attend meetings or go shopping. Flexible packages: 4 Hours / 40 KM, 8 Hours / 80 KM, or 12 Hours / 120 KM with affordable extension rates.",
    iconName: "Clock",
    startingPrice: "From ₹1,100 / 4 Hrs",
    badge: "Flexible City Hire",
    features: [
      "Multiple stops with zero waiting hassles",
      "Dedicated professional chauffeur on standby",
      "Air-conditioned executive comfort",
      "Customizable hours & extended km",
    ],
    recommendedVehicles: "Sedan, Innova Crysta, Luxury Sedan",
  },
  {
    id: "city-rides",
    title: "Point-to-Point City Rides",
    shortDesc: "Fast, comfortable point-to-point transfers across Bengaluru without cancellation dread.",
    fullDesc:
      "Need a smooth ride to Electronic City, Whitefield, MG Road, or Manyata Tech Park? Travel in style with AC comfort and fixed upfront estimates.",
    iconName: "Car",
    startingPrice: "From ₹499",
    badge: "Zero Cancellations",
    features: [
      "Clean, sanitized, smoke-free interiors",
      "Immediate dispatch or scheduled advance ride",
      "Cash, UPI, or Corporate Invoice payment",
      "GPS tracking for rider safety",
    ],
    recommendedVehicles: "Hatchback, Sedan",
  },
  {
    id: "wedding-events",
    title: "Wedding & VIP Event Fleet",
    shortDesc: "Luxury chauffeur cars & VIP convoys for weddings, high-profile corporate delegates, and VIP galas.",
    fullDesc:
      "Make an unforgettable grand entrance with our pristine executive fleet. From flower-decorated bride & groom luxury sedans to guest convoys and airport guest shuttles.",
    iconName: "Gem",
    startingPrice: "Custom VIP Quotes",
    badge: "Royal Experience",
    features: [
      "Flower decoration & ceremonial ribbons ready",
      "Uniformed, experienced executive chauffeurs",
      "Multi-vehicle convoy coordination support",
      "Backup standby car guarantee",
    ],
    recommendedVehicles: "Toyota Camry, Mercedes-Benz, Innova Crysta, Tempo Traveller",
  },
  {
    id: "tour-packages",
    title: "South India Holiday & Temple Tours",
    shortDesc: "Curated weekend & multi-day holiday packages to Coorg, Ooty, Mysore, Tirupati, and Chikmagalur.",
    fullDesc:
      "Relax and leave the navigation to our experienced tour drivers. We handle highway permits, sightseeing routes, and recommend the best authentic local dining stops.",
    iconName: "Palmtree",
    startingPrice: "From ₹3,499 / Day",
    badge: "Curated Itineraries",
    features: [
      "Customizable sightseeing stops & photography breaks",
      "Pilgrimage special darshan timing coordination",
      "Drivers fluent in Kannada, Hindi, English, Tamil & Telugu",
      "Hotel & resort doorstep drop",
    ],
    recommendedVehicles: "Innova Crysta, Ertiga SUV, Tempo Traveller",
  },
];
