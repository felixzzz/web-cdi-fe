import Image from "next/image";
import React from "react";
import { ApiDataItem } from "@/types/Sustainabilitys/Governance";

interface AntiCorruptionProps {
  data: ApiDataItem;
}

const customGradient =
  "linear-gradient(#091a24, #091a244d 8%, #091a2427 25%, #091a2400 75%, #091a2466 82%, #091a24)";

export function AntiCorruption({ data }: AntiCorruptionProps) {
  const BACKGROUND_IMAGE_URL = data.image;
  const TITLE = data.title;
  const INTRO_TEXT = data.content || "";
  const keyPoints = data.content_json || [];

  return (
    <section
      aria-labelledby="anti-corruption-heading"
      className="text-white bg-[#091A24]"
    >
      <div className="py-20">
        <div className="container mx-auto   relative z-[1]">
          <div className="mb-16 grid grid-cols-1 gap-4 lg:grid-cols-2 items-center">
            <h2
              id="anti-corruption-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium text-blue-lighter max-w-[277px]"
            >
              {TITLE}
            </h2>
            <div
              className="max-w-2xl text-sm lg:text-base leading-snug lg:leading-loose prose prose-invert prose-base text-justify text-neutral-300"
              dangerouslySetInnerHTML={{ __html: INTRO_TEXT }}
            ></div>
          </div>
        </div>
      </div>

      <div className="py-28 text-white relative overflow-hidden">
        <Image
          src={BACKGROUND_IMAGE_URL}
          alt={TITLE} 
          title={TITLE} 
          layout="fill"
          objectFit="cover"
          className="z-0"
        />

        <div
          className="absolute inset-0 overlay-business z-[1]"
          style={{ backgroundImage: customGradient }}
        ></div>

        <div className="container mx-auto   relative z-20">
          <div
            className={`lg:max-w-[35%] ${
              data.align === "right" ? "ms-auto" : "me-auto"
            }`}
          >
            <ul className="flex flex-col gap-4">
              {keyPoints.map((point) => (
                <li key={point.title} className="flex items-start gap-2">
                  <Image
                    src="/assets/icons/ic_bold_duotone_check_circle.svg"
                    width={26}
                    height={26}
                    alt="check"
                    className="inline-block"
                  />
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-blue-lighter">
                      {point.title}
                    </h3>
                    <div
                      className="max-w-2xl prose prose-invert prose-base text-justify"
                      dangerouslySetInnerHTML={{ __html: point.description }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}