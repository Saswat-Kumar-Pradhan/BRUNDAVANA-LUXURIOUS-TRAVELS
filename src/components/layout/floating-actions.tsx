"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Phone } from "lucide-react";
import { WhatsAppLogo } from "@/components/ui/whatsapp-logo";

export function FloatingActions() {
  return (
    <>
      {/* Desktop & Tablet Floating Action Dock (Identically aligned, balanced height & spacing) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center pointer-events-auto">
        {/* Unified Capsule with Call 24x7 & WhatsApp Book */}
        <div className="flex items-center gap-2 p-1.5 bg-[#0B0B0F]/95 backdrop-blur-2xl border border-[#F7BF17]/40 rounded-2xl shadow-2xl">
          {/* Call 24x7 Button */}
          <a
            href={`tel:${siteConfig.contact.primaryPhone}`}
            aria-label={`Call ${siteConfig.brand.name}`}
            className="min-h-[44px] flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#F7BF17]/30 bg-[#14141A] text-white hover:bg-zinc-800/80 hover:border-[#F7BF17] text-xs font-bold tracking-wide transition-all active:scale-95 shadow-sm"
          >
            <div className="w-5 h-5 flex items-center justify-center text-[#F7BF17] shrink-0">
              <Phone className="w-4 h-4 fill-current" />
            </div>
            <span>Call 24x7</span>
          </a>

          {/* WhatsApp Book Button */}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
              "Hello Brundavana Luxurious Travels, I want to book a cab."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book on WhatsApp"
            className="min-h-[44px] flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#F7BF17] hover:bg-[#E2AD0A] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-[#F7BF17]/30 transition-all active:scale-95"
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              <WhatsAppLogo className="w-4 h-4" size={18} />
            </div>
            <span>WhatsApp Book</span>
          </a>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar (Sticky to bottom on mobile screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0B0F]/95 backdrop-blur-xl border-t border-[#F7BF17]/30 p-2.5 px-4 flex items-center gap-2.5 shadow-2xl safe-area-bottom">
        <a
          href={`tel:${siteConfig.contact.primaryPhone}`}
          className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#F7BF17]/40 bg-[#14141A] text-white font-semibold text-xs active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-[#F7BF17]" />
          <span>Call 24x7</span>
        </a>

        <a
          href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
            "Hello Brundavana Luxurious Travels, I want to book a cab."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.2] min-h-[44px] bg-[#F7BF17] hover:bg-[#E2AD0A] text-black flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md"
        >
          <WhatsAppLogo className="w-4 h-4" size={18} />
          <span>WhatsApp Book</span>
        </a>
      </div>
    </>
  );
}
