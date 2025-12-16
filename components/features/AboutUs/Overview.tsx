import React from "react";
import Image from "next/image";

interface OverviewSectionProps {
  id?: string;
  bgImageUrl: string;
  logoSrc: string;
  logoAlt: string;
  youtubeVideoId: string;
  videoTitle: string;
  logoWidth: number;
  logoHeight: number;
  eyebrowText: string;
  mainImageUrl: string;
  mainImageAlt: string;
  mainImageWidth: number;
  mainImageHeight: number;
  children: React.ReactNode;
}

export const Overview: React.FC<OverviewSectionProps> = ({
  id,
  bgImageUrl,
  logoSrc,
  logoAlt,
  logoWidth,
  logoHeight,
  eyebrowText,
  mainImageUrl,
  mainImageAlt,
  mainImageWidth,
  mainImageHeight,
  youtubeVideoId,
  videoTitle,
  children,
}) => {
  const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?loop=1&controls=0`;

  return (
    <section
      id={id}
      className="py-20 bg-[#091A24] relative"
      aria-labelledby="overview-title"
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-contain bg-no-repeat bg-right"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
        aria-hidden="true"
      />

      <div className="container mx-auto   relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6">
            <Image
              src={logoSrc}
              alt={logoAlt}
              title={logoAlt}
              width={logoWidth}
              height={logoHeight}
              className="h-20 w-auto mb-4"
            />

            <h2
              id="overview-title"
              className="text-[#47C1EA] text-[22px] leading-[33px] font-medium mb-[10px]"
            >
              {eyebrowText}
            </h2>

            <div className="content text-justify break-words w-full max-w-full">{children}</div>
          </div>

          <div className="lg:col-span-6">
            <Image
              src={mainImageUrl}
              alt={mainImageAlt}
              title={mainImageAlt}
              width={mainImageWidth}
              height={mainImageHeight}
              className="w-full lg:w-[80%] rounded-xl ms-auto"
            />
          </div>
        </div>
      </div>
      <div
        className="bg-blue-dark relative py-12 lg:py-20"
        aria-label={videoTitle} 
      >
        <div className="container mx-auto  ">
          <figure className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-xl"
              src={embedUrl}
              title={videoTitle} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </figure>
        </div>
      </div>
    </section>
  );
};
