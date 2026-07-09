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
        // className="z-0 object-[20%_center] lg:object-[65%_center]"
      className="relative overflow-hidden aspect-[4/4] lg:aspect-video w-full py-[5%] lg:py-[8%] flex items-end bg-cover bg-[position:80%_center] lg:bg-[position:100%_center] bg-cover lg:bg-[length:100%_auto]"
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
              className="max-w-2xl prose prose-invert prose-base text-xs sm:text-sm lg:text-base text-white leading-relaxed lg:leading-loose text-justify"
              // className="max-w-full prose prose-invert prose-base text-justify"
              dangerouslySetInnerHTML={{ __html: subtitle || "" }}
            />
          </div>

          <div className="flex items-center gap-10">
            <div className="h-[2px] w-full bg-[#BFBFBF] hidden lg:block relative overflow-hidden">
              <div className="absolute h-full w-full bg-[#47C1EA] animate-run" />
            </div>
            <Image
            title="icon"
              width={42}
              height={42}
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