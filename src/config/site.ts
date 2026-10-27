export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  trip: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "pricing" | "safety" | "services";
}

export interface SiteConfig {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    slogan: string;
    description: string;
    homeCity: string;
    establishedYear: number;
    logoText: string;
  };
  contact: {
    primaryPhone: string;
    primaryPhoneDisplay: string;
    secondaryPhone: string;
    secondaryPhoneDisplay: string;
    whatsappNumber: string;
    whatsappNumberDisplay: string;
    email: string;
    address: {
      street: string;
      area: string;
      city: string;
      state: string;
      pincode: string;
      full: string;
    };
    workingHours: string;
    googleMapsEmbedUrl: string;
  };
  stats: Array<{
    id: string;
    value: number;
    suffix: string;
    label: string;
    description: string;
  }>;
  trustPoints: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Testimonial[];
  faqs: FAQItem[];
  social: {
    instagram?: string;
    facebook?: string;
    googleBusiness?: string;
  };
  navLinks: Array<{
    label: string;
    href: string;
  }>;
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "BRUNDAVANA LUXURIOUS TRAVELS",
    shortName: "Brundavana Travels",
    tagline: "Luxury Travel. Budget Price.",
    slogan: "Any Time | On Time | In Time",
    description:
      "Bengaluru's premier chauffeur travel service. Brand new 2026 fleet including Toyota Hycross, Innova Crysta, Rumion, Kia Carens Clavis, Force Urbania, and Dzire for outstation, airport transfers, and local journeys.",
    homeCity: "Bengaluru, Karnataka",
    establishedYear: 2016,
    logoText: "BRUNDAVANA",
  },
  contact: {
    primaryPhone: "+919482154789",
    primaryPhoneDisplay: "+91 94821 54789",
    secondaryPhone: "+918861234567",
    secondaryPhoneDisplay: "+91 88612 34567",
    whatsappNumber: "919482154789",
    whatsappNumberDisplay: "+91 94821 54789",
    email: "bookings@brundavanatravels.com",
    address: {
      street: "Plot No. 42, 100 Feet Road",
      area: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      full: "Plot No. 42, 100 Feet Road, Indiranagar, Bengaluru, Karnataka - 560038",
    },
    workingHours: "24 Hours / 7 Days a Week (24x7)",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985552391206!2d77.6402377!3d12.9727488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a70a8d4239%3A0x6b107e35b71db30!2s100%20Feet%20Rd%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka%20560038!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  },
  stats: [
    {
      id: "customers",
      value: 65000,
      suffix: "+",
      label: "Travelers Served",
      description: "100% safety & punctual rides",
    },
    {
      id: "km-driven",
      value: 2400000,
      suffix: " km+",
      label: "Highway KM",
      description: "Across South India",
    },
    {
      id: "fleet-size",
      value: 2026,
      suffix: " Fleet",
      label: "Latest Models",
      description: "Hycross, Crysta, Urbania, Carens",
    },
    {
      id: "rating",
      value: 4.9,
      suffix: " ★",
      label: "Google Rating",
      description: "3,200+ authentic reviews",
    },
  ],
  trustPoints: [
    {
      id: "punctual",
      title: "Any Time | On Time | In Time",
      description: "Punctual doorstep arrival guaranteed with live flight and route tracking.",
      icon: "Clock",
    },
    {
      id: "new-fleet",
      title: "Latest 2026 Fleet",
      description: "Brand-new Toyota Hycross, Innova Crysta, Carens Clavis, and Force Urbania.",
      icon: "Crown",
    },
    {
      id: "pricing",
      title: "Zero Hidden Charges",
      description: "Clear per-km rates, fixed driver bata, and transparent toll billing.",
      icon: "BadgeCheck",
    },
    {
      id: "chauffeur",
      title: "Vetted Chauffeurs",
      description: "Courteous, verified highway professionals with deep route knowledge.",
      icon: "ShieldCheck",
    },
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Dr. Arvind Rao",
      role: "Surgeon, Manipal Hospitals",
      location: "Bengaluru",
      rating: 5,
      comment:
        "Reserved the 2026 Innova Hycross for our family trip to Coorg. The ride was whisper quiet, spotless, and the driver Mr. Ramesh was extremely polite and careful on the ghat sections. True luxury travel!",
      trip: "Bengaluru to Coorg (3 Days)",
      date: "October 2024",
    },
    {
      id: "test-2",
      name: "Rohan & Pooja Mehta",
      role: "Wedding Clients",
      location: "Bengaluru",
      rating: 5,
      comment:
        "Brundavana provided the 2026 Force Urbania and two Innova Crystas for our guest transfers from Bengaluru airport. Punctual, luxurious, and completely hassle-free.",
      trip: "Wedding Guest Conveyance",
      date: "September 2024",
    },
    {
      id: "test-3",
      name: "Karthik Subramanian",
      role: "Tech Lead, Electronic City",
      location: "Bengaluru",
      rating: 5,
      comment:
        "The fare calculator gave me the exact quote which matched my final bill down to the rupee. Booked the new Kia Carens Clavis for Tirupati. Outstanding service!",
      trip: "Bengaluru to Tirupati Outstation",
      date: "November 2024",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "How is the outstation cab fare calculated?",
      answer:
        "Outstation trips are calculated based on actual distance with a standard minimum of 300 km/day. Round trips bill max(actual km, 300 km × days) + daily driver allowance (bata). Tolls and parking extra at actuals.",
      category: "pricing",
    },
    {
      id: "faq-2",
      question: "Which vehicles are available in your 2026 fleet?",
      answer:
        "Our flagship 2026 fleet features: 2 units of Toyota Innova Hycross Hybrid, Toyota Innova Crysta 2026, Toyota Rumion 2026, Kia Carens Clavis Top Model 2026, Force Urbania Luxury 14-seater Van, and Maruti Suzuki Dzire (2026 & 2020 editions).",
      category: "services",
    },
    {
      id: "faq-3",
      question: "Are tolls, parking, and state entry permits included?",
      answer:
        "No. To maintain complete transparency with zero hidden markups, toll gates, airport parking, and interstate border entry permits are payable at actual FASTag / receipt rates.",
      category: "pricing",
    },
    {
      id: "faq-4",
      question: "How do I confirm my cab booking?",
      answer:
        "Simply calculate your fare on the website and click 'Book on WhatsApp' or tap 'Call Now'. We instantly send you the driver contact, vehicle registration number, and pickup confirmation.",
      category: "booking",
    },
  ],
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    googleBusiness: "https://maps.google.com",
  },
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "Fleet", href: "#fleet" },
    { label: "Fare Calculator", href: "#fare-calculator" },
    { label: "Routes", href: "#routes" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ],
};
