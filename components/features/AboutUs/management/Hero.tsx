"use client";

import Image from "@/components/shared/SafeImage";
import React, { useEffect } from "react";

interface HeroProps {
  imageSrc: string;
  title: string;
  subtitle: string | null;
  iconSrc: string;
}

export const Hero: React.FC<HeroProps> = ({
  imageSrc,
  title,
  subtitle,
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
        className="overlay-history absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(#0000, #07151e72 85%, #07161fcc 92%, #091a24)",
        }}
      />

      <section className="container mx-auto  ">
        <div className="text-white grid lg:grid-cols-2 gap-2 relative z-[1] items-end">
          <div>
            <h1
              className="text-2xl leading-6 lg:text-[52px] lg:leading-[60px] font-medium max-w-2xl"
              id="home_banner_title"
            >
              {title}
            </h1>
            <div
              className="content max-w-2xl text-xs lg:text-base !text-neutral-4"
              dangerouslySetInnerHTML={{ __html: subtitle || "" }}
            />
          </div>

          <div className="flex items-center gap-10">
            <div className="h-[2px] w-full bg-[#BFBFBF] hidden lg:block relative overflow-hidden">
                          <div className="absolute h-full w-full bg-[#47C1EA] animate-run" />
                        </div>
                        <Image
                          width={46}
                          height={46}
                          alt="icon"
                          title="icon"
                          className="bg-cover"
                          src={iconSrc}
                        />
          </div>
        </div>
      </section>
    </div>
  );
};