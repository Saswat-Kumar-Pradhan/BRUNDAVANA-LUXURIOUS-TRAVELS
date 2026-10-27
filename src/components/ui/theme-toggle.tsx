"use client";

import React, { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-border/40 bg-surface/40 flex items-center justify-center opacity-60">
        <Sun className="w-4 h-4 text-foreground/40" />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Toggle theme (Current: ${theme})`}
        className="w-9 h-9 rounded-xl border border-border/80 bg-surface/80 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all duration-200 text-foreground focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4 text-[#F3D98B]" />
        ) : theme === "light" ? (
          <Sun className="w-4 h-4 text-[#D4AF37]" />
        ) : (
          <Laptop className="w-4 h-4 text-[#D4AF37]" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-36 rounded-xl border border-border/80 bg-surface shadow-xl shadow-black/20 p-1.5 z-50 flex flex-col gap-1 backdrop-blur-lg animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => {
                setTheme("light");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                theme === "light"
                  ? "bg-[#D4AF37]/15 text-[#D4AF37] font-semibold"
                  : "hover:bg-foreground/5 text-foreground/80"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Light
            </button>
            <button
              type="button"
              onClick={() => {
                setTheme("dark");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                theme === "dark"
                  ? "bg-[#D4AF37]/15 text-[#D4AF37] font-semibold"
                  : "hover:bg-foreground/5 text-foreground/80"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              Dark
            </button>
            <button
              type="button"
              onClick={() => {
                setTheme("system");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                theme === "system"
                  ? "bg-[#D4AF37]/15 text-[#D4AF37] font-semibold"
                  : "hover:bg-foreground/5 text-foreground/80"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              System
            </button>
          </div>
        </>
      )}
    </div>
  );
}
