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
    <header className="relative overflow-hidden aspect-[4/4] lg:aspect-video w-full py-[5%] lg:py-[8%] flex items-end">
      <video
        className="absolute top-0 left-0 right-0 bottom-0 w-full aspect-[4/4] lg:aspect-video object-cover"
        src={videoSrc}
        autoPlay
        loop
        playsInline
        muted
      />

      <div className="overlay-banner h-full w-full absolute left-0 right-0 top-0 bottom-0" />

      <section
        className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]"
        aria-labelledby="home_banner_title"
      >
        <div className="text-white grid lg:grid-cols-2 gap-2 items-end">
          <div>
            <p className="max-w-md text-xs lg:text-base !text-neutral-6 uppercase">
              {preTitle}
            </p>

            <h1
              className="text-2xl leading-6 lg:text-[52px] lg:leading-[60px] font-medium lg:mb-6 max-w-2xl"
              id="home_banner_title"
            >
              {title}
            </h1>

            <div
              className="max-w-md text-xs lg:text-base !text-neutral-4"
              dangerouslySetInnerHTML={{ __html: subtitle || "" }}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* <div className="h-[2px] w-full bg-[#BFBFBF] hidden lg:block relative overflow-hidden">
              <div className="absolute h-full bg-blue-lighter animate-colorChange" />
            </div> */}
            <div className="h-[2px] w-full bg-[#BFBFBF] hidden lg:block relative overflow-hidden">
              <div className="absolute h-full w-full bg-[#47C1EA] animate-run" />
            </div>

            <Link
              href={linkHref}
              className="bg-white  text-[#151718] px-3 py-[5px] lg:px-4 lg:py-[5px] border border-neutral-950 rounded-full whitespace-nowrap gap-4 flex items-center w-fit text-xs lg:text-base"
            >
              {linkText}
              {linkIcon}
            </Link>
          </div>
        </div>
      </section>
    </header>
  );
};