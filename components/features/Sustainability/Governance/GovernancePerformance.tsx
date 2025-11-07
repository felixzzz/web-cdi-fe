import { ApiDataItem } from "@/types/Sustainabilitys/Governance";
import Image from "next/image";
import React from "react";

interface GovernancePerformanceProps {
  data: ApiDataItem;
}

const customGradient =
  "linear-gradient(#091a24, #091a244d 8%, #091a2427 25%, #091a2400 75%, #091a2466 82%, #091a24)";

export function GovernancePerformance({ data }: GovernancePerformanceProps) {
  const BACKGROUND_IMAGE_URL = data.image;
  const TITLE = data.title;
  const CONTENT_HTML = data.content || "";

  return (
    <section
      aria-labelledby="governance-heading"
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt={TITLE}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div
        className="absolute inset-0 overlay-business z-[1]"
        style={{ backgroundImage: customGradient }}
      ></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div
          className={`lg:max-w-[45%] ${
            data.align === "right" ? "ms-auto" : "me-auto"
          }`}
        >
          <h2
            id="governance-heading"
            className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-6 text-blue-lighter"
          >
            {TITLE}
          </h2>

          <div
            className="max-w-3xl prose prose-invert prose-base"
            dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
          ></div>
        </div>
      </div>
    </section>
  );
}