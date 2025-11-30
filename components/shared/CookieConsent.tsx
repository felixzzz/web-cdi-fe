"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export const CookieConsent = () => {
  const t = useTranslations("Cookies");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section
      className="z-[100] fixed inset-0 bg-[#00000085] h-full w-full flex items-end justify-center"
      id="popup-cookie-confirmation"
    >
      <div className="bg-white p-4 md:px-8 md:py-4 w-full md:w-[90%] lg:w-[80%] mx-4 mb-4 md:mb-5 rounded-xl shadow-2xl relative">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between">
          <div className="w-full">
            <p className="text-neutral-13 font-medium text-[12px] md:text-[22px] mb-1">
              {t("title")}
            </p>
            <p className="text-xs md:text-sm text-neutral-600 w-full max-w-none md:max-w-7xl">
              {t("description")}{" "}
              {t.rich("more_info_text", {
                privacy_policy: (chunks) => (
                  <a
                    className="text-[#2474A5] font-bold hover:underline"
                    href={`${process.env.NEXT_PUBLIC_URL_LP}/privacy-policy`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {chunks}
                  </a>
                ),
                cookies_notice: (chunks) => (
                  <a
                    className="text-[#2474A5] font-bold hover:underline"
                    href={`${process.env.NEXT_PUBLIC_URL_LP}/cookies-notice`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-fit flex-shrink-0">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none sm:w-[99px] rounded-full py-4 sm:py-2 bg-white border border-neutral-200 text-neutral-10 text-sm font-medium block text-center cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              {t("decline")}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none sm:w-[185px] rounded-full py-4 sm:py-2 bg-[#2474A5] text-white text-sm font-medium block text-center cursor-pointer hover:bg-[#1d628b] transition-colors"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
