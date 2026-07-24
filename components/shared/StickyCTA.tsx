"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const StickyCTA = () => {
  const t = useTranslations("StickyCTA");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link 
        href="/contact-us"
        className="flex items-center justify-center gap-2.5 bg-[#2474A5] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#1d628b] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-medium text-sm md:text-base group"
        aria-label={t("title")}
      >
        <svg 
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
        <span>{t("title")}</span>
      </Link>
    </div>
  );
};
