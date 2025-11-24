"use client";

import React, { useEffect, useState } from "react";

export const CookieConsent = () => {
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
      <div className="bg-white p-4 md:px-6 md:py-4 w-full md:w-[90%] lg:w-[80%] max-w-7xl mx-4 mb-4 md:mb-5 rounded-xl shadow-2xl relative">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 justify-between">
          <div className="w-full">
            <p className="text-neutral-13 font-medium text-[12px] md:text-[22px] mb-1">
              This Site Uses Cookies
            </p>
            <p className="text-xs md:text-sm text-neutral-8">
              By clicking “Accept”, you agree to the storing of cookies on your
              device to enhance site navigation, analyze site usage, and assist
              in our marketing efforts. View our{" "}
              <a
                className="text-[#2474A5] font-bold hover:underline"
                href={`${process.env.NEXT_PUBLIC_URL}/privacy-policy`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                className="text-[#2474A5] font-bold hover:underline"
                href={`${process.env.NEXT_PUBLIC_URL}/cookies-notice`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cookies Notice
              </a>{" "}
              for more information.
            </p>
          </div>
         <div className="flex items-center gap-3 w-full lg:w-auto flex-shrink-0">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none sm:w-[99px] rounded-full py-2.5 sm:py-2 bg-white border border-neutral-200 text-neutral-10 text-sm font-medium block text-center cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none sm:w-[185px] rounded-full py-2.5 sm:py-2 bg-[#2474A5] text-white text-sm font-medium block text-center cursor-pointer hover:bg-[#1d628b] transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};