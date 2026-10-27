import type { Metadata, Viewport } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFDF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0F" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brundavanatravels.com"),
  title: {
    default: `${siteConfig.brand.name} | ${siteConfig.brand.tagline}`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  keywords: [
    "Bengaluru taxi service",
    "outstation cabs Bengaluru",
    "luxury chauffeur Bangalore",
    "Innova Crysta rental Bengaluru",
    "Bangalore to Mysore cab",
    "Bangalore to Coorg taxi",
    "airport taxi Kempegowda KIA",
    "wedding car rental Bengaluru",
    "Tempo Traveller rental Bangalore",
    "Brundavana Luxurious Travels",
    "budget luxury car rental",
  ],
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  publisher: siteConfig.brand.name,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.brundavanatravels.com",
    title: `${siteConfig.brand.name} - ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    siteName: siteConfig.brand.name,
    images: [
      {
        url: "/images/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand.name} Luxury Fleet`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand.name} - ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    images: ["/images/brand/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: siteConfig.brand.name,
    image: "https://www.brundavanatravels.com/logo.svg",
    telephone: siteConfig.contact.primaryPhone,
    email: siteConfig.contact.email,
    url: "https://www.brundavanatravels.com",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.state,
      postalCode: siteConfig.contact.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9727,
      longitude: 77.6402,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      { "@type": "City", name: "Bengaluru" },
      { "@type": "State", name: "Karnataka" },
      { "@type": "State", name: "Tamil Nadu" },
      { "@type": "State", name: "Kerala" },
      { "@type": "State", name: "Andhra Pradesh" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Chauffeur & Cab Rental Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Outstation Cab Trips (One-Way & Round Trip)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bengaluru Airport Transfer (KIA)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local Hourly Rental Packages",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding & VIP Luxury Convoy",
          },
        },
      ],
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${jakarta.variable} font-sans`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
