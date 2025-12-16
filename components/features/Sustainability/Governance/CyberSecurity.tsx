import Image from "next/image";
import React from "react";
import { ApiDataItem } from "@/types/Sustainabilitys/Governance"; 

interface CyberSecurityProps {
  data: ApiDataItem;
}

export function CyberSecurity({ data }: CyberSecurityProps) {
  const BACKGROUND_IMAGE_URL = data.image;
  const TITLE = data.title;
  const INTRO_TEXT = data.content || "";
  const keyPoints = data.content_json || [];

  return (
    <section
      aria-labelledby="cyber-security-heading"
      className="py-28 text-white bg-[#051119] !bg-blue-dark-black relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt={TITLE}
        title={TITLE}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business-darkest z-10"></div>

      <div className="container mx-auto   relative z-20">
        <div className="mb-16 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <h2
            id="cyber-security-heading"
            className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium lg:col-span-2"
          >
            {TITLE}
          </h2>
          <span
            className="lg:col-span-2 w-full lg:max-w-[80%] prose prose-invert prose-base text-justify text-sm lg:text-base leading-snug lg:leading-loose"
            dangerouslySetInnerHTML={{ __html: INTRO_TEXT }}
          />
        </div>

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {keyPoints.map((point) => (
            <li key={point.title} className="flex gap-4 items-start">
              <div className="flex flex-col gap-4">
                <h3 className="text-[22px] font-medium text-blue-lighter">
                  {point.title}
                </h3>
                <span
                  className="max-w-3xl prose prose-invert prose-base text-justify text-sm lg:text-base leading-snug lg:leading-loose"
                  dangerouslySetInnerHTML={{ __html: point.description }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}