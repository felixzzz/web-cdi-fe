import Link from "next/link";
import { ReactNode } from "react";

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
         className="max-w-7xl container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]"
         aria-labelledby="home_banner_title"
       ></section> */}

      <div className="overlay-banner h-full w-full absolute left-0 right-0 top-0 bottom-0" />
      <section
        className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44 relative z-[2]"
        aria-labelledby="home_banner_title"
      >
        <div className="text-white grid lg:flex-col gap-2 items-end">
          <div className="mb-6 lg:mb-0">
            <p className="max-w-md text-xs md:text-lg font-light !text-neutral-300 uppercase">
              {preTitle}
            </p>

            <h1
              className="text-3xl leading-snug md:text-[52px] md:leading-[60px] font-semibold md:max-w-lg lg:max-w-2xl"
              id="home_banner_title"
            >
              {title}
            </h1>
          </div>

          <div className="flex flex-col gap-4 md:flex-row items-center lg:justify-between">
            <div
              className="max-w-lg w-full text-xs md:text-lg !text-neutral-4"
              dangerouslySetInnerHTML={{ __html: subtitle || "" }}
            />
            <div className="flex items-center justify-end gap-2 w-full">
              <div className="h-[2px] w-3/5 bg-[#BFBFBF] hidden md:block relative overflow-hidden">
                <div className="absolute h-full w-full bg-[#47C1EA] animate-run" />
              </div>

              <Link
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
