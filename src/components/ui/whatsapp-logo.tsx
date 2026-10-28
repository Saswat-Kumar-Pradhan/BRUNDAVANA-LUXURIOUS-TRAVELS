import React from "react";

interface WhatsAppLogoProps {
  className?: string;
  size?: number;
}

export function WhatsAppLogo({ className = "w-5 h-5", size = 20 }: WhatsAppLogoProps) {
  return (
    <img
      src="https://images.seeklogo.com/logo-png/16/2/whatsapp-logo-png_seeklogo-168310.png"
      alt="WhatsApp"
      width={size}
      height={size}
      className={`object-contain inline-block shrink-0 ${className}`}
      loading="eager"
    />
  );
}