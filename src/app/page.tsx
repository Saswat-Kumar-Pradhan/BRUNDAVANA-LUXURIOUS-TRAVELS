import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { FleetSection } from "@/components/sections/fleet-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BookingConsoleSection } from "@/components/sections/booking-console-section";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0B0B0E] text-foreground antialiased selection:bg-[#F7BF17]/40 selection:text-black">
      {/* 1. Header with Official Logo, Nav & CTAs */}
      <Navbar />

      {/* Main Content Area matching exact Dribbble design flow */}
      <main className="flex-1">
        {/* Section 1 (Dark): Hero with "Your Ride, Anytime – Anywhere" & Luxury Vehicle */}
        <HeroSection />

        {/* Section 2 (Cream): About Us with 4 vertical rounded pill photo slices */}
        <AboutSection />

        {/* Section 3 (Dark): Some Benefits with centered Yellow Taxi & 6 Key Pillars */}
        <BenefitsSection />

        {/* Section 4 (Cream): Find Your Perfect Ride with Yellow Half-Circle & 2026 Fleet Tiers */}
        <FleetSection />

        {/* Section 5 (Dark): Our Happy Clients with Watermark Quotes & Pagination */}
        <TestimonialsSection />

        {/* Section 6 (Cream): Your Ride is Just a Click Away with Rounded Booking Console */}
        <BookingConsoleSection />
      </main>

      {/* Section 7 (Dark): Footer matching Dribbble layout */}
      <Footer />

      {/* Floating Call & WhatsApp Desk for 24x7 Conversions */}
      <FloatingActions />
    </div>
  );
}
