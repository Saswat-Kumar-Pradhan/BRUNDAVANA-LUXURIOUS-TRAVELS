# BRUNDAVANA LUXURIOUS TRAVELS 🚗✨

> **"Luxury Travel. Budget Price."**
> A modern, production-quality frontend website for a premier Bengaluru-based car cab, airport transfer, and outstation chauffeur travel business.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Zero database, paid APIs, or backend required — 100% config-driven.

---

## 🌟 Highlights & Features

- **Royal Gold & Midnight Theme**: Curated gold palette (`#D4AF37`, `#F3D98B`, `#A8851F`) with dark mode (`#0B0B0F`) and light mode (`#FFFDF7`).
- **Zero-Flash Theme Toggle**: Smoothly switches between Light, Dark, and System (`prefers-color-scheme`) using `next-themes`.
- **Instant Interactive Fare Calculator**:
  - Distance slider & numerical input.
  - Round trip calculation rule: `billableKm = max(actualKm, minKmPerDay × days)`.
  - One-way outstation with configurable minimum distance.
  - Driver allowance (bata), night halt surcharge, and transparent toll notes.
  - Animated live number count-up for total fare.
  - **Smart Natural Language Search**: Type `"innova 300 km"`, `"sedan 2 days 450 km"`, or `"Puri to Bhubaneswar"` and the calculator auto-fills itself!
  - 1-click **Book on WhatsApp** with a pre-filled quote, **Call Now**, and **Copy Quote** (with celebration feedback).
- **Outstation Route Animation**: Moving chauffeur cab graphic traveling along an animated highway path connecting Bengaluru with top getaways (Mysore, Coorg, Ooty, Tirupati, etc.).
- **Fleet Showcase**: Category filters (Sedan, SUV, Innova Crysta, Tempo Traveller, Luxury) with detailed capacity specs (seats, luggage, AC) and automatic gold-bordered vector placeholders if an image is missing.
- **Micro-Animations & Counters**: Animated stats strip (65,000+ Travelers, 2.4M+ KM, 120+ Routes, 4.9★ Rating) using Framer Motion (respects `prefers-reduced-motion`).
- **Comprehensive Sections**:
  - Sticky glassmorphism Navbar with mobile slide-in drawer
  - Hero with pulsing availability badge and mini quick-booking card
  - 8-point "Why Choose Us" trust grid
  - 6 Core Travel Services
  - Popular Routes searchable filter grid
  - 4-step How It Works
  - Auto-sliding Testimonial Carousel with swipe support
  - Animated FAQ Accordion
  - 24x7 Contact desk, tap-to-call links, and validated inquiry form
  - Luxury Footer and Mobile Sticky Action Bar
- **Enterprise SEO & PWA**:
  - JSON-LD `TaxiService` and `LocalBusiness` schema for Google rich results
  - Next.js dynamic Open Graph and Twitter cards
  - `sitemap.xml`, `robots.txt`, and PWA `manifest.webmanifest`

---

## 🚀 Quick Start Guide

### 1. Installation

Ensure you have **Node.js 20+** installed:

```bash
# Clone the repository
git clone https://github.com/Saswat-Kumar-Pradhan/BRUNDAVANA-LUXURIOUS-TRAVELS.git
cd BRUNDAVANA-LUXURIOUS-TRAVELS

# Install all dependencies
npm install
```

### 2. Development Mode

Start the local Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

Test and build the optimized production output:

```bash
npm run build
npm start
```

### 4. Running Unit Tests

Run the test suite verifying fare calculation rules and query parsing:

```bash
npm test
```

---

## 🎨 How to Customize (Config-Driven)

All business details, rates, and vehicles live in typed files in `/src/config/`:

### 1. Contact Details & Phone Numbers
Open [`src/config/site.ts`](file:///Users/saswat/Developer/BRUNDAVANA-LUXURIOUS-TRAVELS/src/config/site.ts):
```ts
export const siteConfig = {
  brand: {
    name: "BRUNDAVANA LUXURIOUS TRAVELS",
    tagline: "Luxury Travel. Budget Price.",
    homeCity: "Bengaluru, Karnataka",
  },
  contact: {
    primaryPhone: "+919482154789",          // Dialable tel: format
    primaryPhoneDisplay: "+91 94821 54789", // Visual display
    whatsappNumber: "919482154789",         // WhatsApp international format
    email: "bookings@brundavanatravels.com",
    address: { ... },
  },
  ...
};
```
Changing any number here updates the Navbar, Hero, Contact section, WhatsApp links, and Footer everywhere!

---

### 2. Vehicle Rates, Fleet & Rules
Open [`src/config/fleet.ts`](file:///Users/saswat/Developer/BRUNDAVANA-LUXURIOUS-TRAVELS/src/config/fleet.ts):
```ts
{
  id: "sedan",
  name: "Executive Sedan",
  models: "Swift Dzire / Toyota Etios / Hyundai Aura",
  ratePerKm: 15,          // Edit ₹ per km
  minKmPerDay: 300,       // Minimum daily km limit
  driverBataPerDay: 500,  // Driver daily allowance in ₹
  nightCharge: 400,       // Night halt fee in ₹
  seats: 4,
  luggageBags: 3,
  imagePath: "/images/vehicles/sedan.jpg",
}
```

---

### 3. Popular Routes
Open [`src/config/routes.ts`](file:///Users/saswat/Developer/BRUNDAVANA-LUXURIOUS-TRAVELS/src/config/routes.ts):
- Add, edit, or adjust distances, travel duration, or starting prices for any city route.

---

### 4. How to Add or Replace Vehicle Images
Place your vehicle photos directly in the `public/images/vehicles/` directory:
- `sedan.jpg` → Executive Sedan (Swift Dzire / Etios)
- `innova.jpg` → Toyota Innova Crysta
- `suv.jpg` → Family SUV (Ertiga / Carens)
- `tempo.jpg` → Luxury Tempo Traveller
- `hatchback.jpg` → Economy Hatchback
- `luxury.jpg` → VIP Luxury Sedan (Camry / Mercedes)

> **Graceful Fallback**: If an image file does not exist, the card automatically falls back to a gold-bordered vector silhouette card so the UI never breaks!

---

### 5. How to Replace the Logo
1. Simply overwrite [`public/logo.svg`](file:///Users/saswat/Developer/BRUNDAVANA-LUXURIOUS-TRAVELS/public/logo.svg) with your own SVG vector logo.
2. The `<Logo />` component in [`src/components/ui/logo.tsx`](file:///Users/saswat/Developer/BRUNDAVANA-LUXURIOUS-TRAVELS/src/components/ui/logo.tsx) references the branding.

---

## 🧪 Verified Sanity Test (Vitest)

Formula implemented in [`src/lib/fare-calculator.ts`](file:///Users/saswat/Developer/BRUNDAVANA-LUXURIOUS-TRAVELS/src/lib/fare-calculator.ts):
$$\text{Billable KM} = \max(\text{Actual KM}, \text{Min KM/Day} \times \text{Days})$$
$$\text{Total Fare} = (\text{Billable KM} \times \text{Rate/KM}) + (\text{Driver Bata/Day} \times \text{Days}) + \text{Night Charge}$$

**Example Sanity Check**:
- Vehicle: Sedan (₹15/km, 300 km/day min, ₹500 driver bata/day)
- Trip: 2 days, 400 km round trip
- $\text{Billable KM} = \max(400, 300 \times 2) = 600\text{ km}$
- $\text{Base KM Charge} = 600 \times 15 = ₹9,000$
- $\text{Driver Bata} = 2 \times 500 = ₹1,000$
- **Total Estimated Fare = ₹10,000** ✅ (Verified by unit test)

---

## 📱 Mobile & Accessibility Standards

- Mobile-first responsive layout (320px to 1920px+).
- Minimum 44px touch targets.
- iOS safe-area bottom padding for sticky bar.
- WCAG AA contrast compliance in both Dark & Light modes.
- Keyboard accessible navigation & visible gold focus rings.

---

## 📄 License
Private commercial license for **BRUNDAVANA LUXURIOUS TRAVELS**.
