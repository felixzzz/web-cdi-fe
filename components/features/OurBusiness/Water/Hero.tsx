"use client";

import Image from "next/image";
import React, { useEffect } from "react";

interface HeroProps {
  imageSrc: string;
  title: string;
  iconSrc: string;
}

export const Hero: React.FC<HeroProps> = ({
  imageSrc,
  title,
  iconSrc,
}) => {
  useEffect(() => {
          const timer = setTimeout(() => {
            window.dispatchEvent(new Event("finishProgressBar"));
          }, 100);
      
          return () => clearTimeout(timer);
        }, []);

  return (
    <div
      className="relative overflow-hidden aspect-[4/3] lg:aspect-video w-full py-[5%] lg:py-[8%] flex items-end bg-cover"
      style={{ backgroundImage: `url("${imageSrc}")` }}
    >
      <div
        className="overlay-history absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: "linear-gradient(#18214700, #1821478f)",
        }}
      />
      <div className="overlay-banner h-full w-full absolute left-0 right-0 top-0 bottom-0" />

      <section className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44">
        <div className="text-white grid md:grid-cols-2 gap-2 relative z-[1] items-end">
          <div>
            <h1
              className="text-2xl leading-6 md:text-[52px] md:leading-[60px] font-medium max-w-2xl"
              id="home_banner_title"
            >
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-10">
            <div className="h-[2px] w-full bg-[#BFBFBF] hidden md:block relative overflow-hidden">
                          <div className="absolute h-full w-full bg-[#47C1EA] animate-run" />
                        </div>
                        <Image
                                      width={46}
                                      height={46}
                                      alt="icon"
                                      className="bg-cover"
                                      src={iconSrc}
                                    />
          </div>
        </div>
      </section>
    </div>
  );
};