"use client";

import { Link } from "@/i18n/navigation";
import { ReactNode, useEffect } from "react";

export interface HeroProps {
  videoSrc: string;
  preTitle: string;
  title: string;
  subtitle: string | null;
  linkHref: string;
  linkText: ReactNode;
  linkIcon: ReactNode;
}

export const Hero = ({
  videoSrc,
  preTitle,
  title,
  subtitle,
  linkHref,
  linkText,
  linkIcon,
}: HeroProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("finishProgressBar"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="relative overflow-hidden aspect-square lg:aspect-video w-full py-[5%] lg:py-[8%] flex items-end">
      <div
        className="overlay-history absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: "linear-gradient(#18214700, #1821478f)",
        }}
      />

      <video
        className="absolute top-0 left-0 right-0 bottom-0 w-full aspect-square lg:aspect-video object-cover"
        src={videoSrc}
        autoPlay
        loop
        playsInline
        muted
      />

      {/* <section
         className="max-w-7xl container mx-auto   relative z-[1]"
         aria-labelledby="home_banner_title"
       ></section> */}

      <div className="overlay-banner h-full w-full absolute left-0 right-0 top-0 bottom-0" />
      <section
        // className="container mx-auto   relative z-[2]"
        className="container mx-auto   relative z-[2]"
        aria-labelledby="home_banner_title"
      >
        <div className="text-white grid lg:flex-col gap-0 lg:gap-2 items-end">
          <div className="mb-0 max-w-3xl">
            <p className="max-w-md text-xs lg:text-lg font-light !text-neutral-300 uppercase">
              {preTitle}
            </p>

            <h1
              className="text-2xl leading-6 lg:text-[52px] lg:leading-[58px] font-medium lg:mb-6 w-full md:max-w-lg lg:max-w-2xl"
              id="home_banner_title"
            >
              {title}
            </h1>
          </div>

          <div className="flex flex-col gap-2 lg:gap-4 lg:flex-row items-center lg:justify-between">
            <div
              className="lg:max-w-md w-full text-sm lg:text-base !text-neutral-200"
              dangerouslySetInnerHTML={{ __html: subtitle || "" }}
            />
            <div className="flex items-center justify-start lg:justify-end gap-2 w-full">
              <div className="h-[2px] w-3/5 bg-[#BFBFBF] hidden lg:block relative overflow-hidden">
                <div className="absolute h-full w-full bg-[#47C1EA] animate-run" />
              </div>

              <Link
                title={title}
                href={linkHref}
                className="bg-white text-[#151718] px-3 py-[5px] lg:px-5 lg:py-[6px] border border-neutral-950 rounded-full whitespace-nowrap gap-4 flex items-center w-fit text-xs lg:text-base"
              >
                {linkText}
                {linkIcon}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};
