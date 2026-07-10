
import Image from "next/image";
import React from "react";
import { ApiDataItem } from "@/types/Sustainabilitys/Environment";

interface EnergyEmissionProps {
  data: ApiDataItem;
}

const gradientStyle =
  "linear-gradient(rgb(9, 26, 36), rgba(9, 26, 36, 0.3) 8%, rgba(9, 26, 36, 0.153) 25%, rgba(9, 26, 36, 0) 75%, rgba(9, 26, 36, 0.4) 82%, rgb(9, 26, 36))";

export function EnergyEmission({ data }: EnergyEmissionProps) {
  const BACKGROUND_IMAGE_URL = data.image;
  const TITLE = data.title || "Energy & Emission"; 
  const CONTENT_HTML = data.content || ""; 

  return (
    <section
      aria-labelledby="energy-heading"
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt={TITLE} 
        title={TITLE} 
        fill
        className="object-cover z-0 object-[20%_center] lg:object-[65%_center]"
        priority
      />

      <div
        className="absolute inset-0 overlay-business z-[1] bg-black/30 lg:bg-transparent"
        style={{ backgroundImage: gradientStyle }}
      ></div>

      <div className="container mx-auto   relative z-20">
        <div
          className={`lg:max-w-[45%] ${
            data.align === "right" ? "ms-auto" : "me-auto"
          }`}
        >
          <h2
            id="energy-heading"
            className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-6 text-blue-lighter"
          >
            {TITLE}
          </h2>

          <div
          className="max-w-2xl prose prose-invert prose-base text-sm lg:text-base leading-snug lg:leading-loose text-justify"
            dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
          ></div>
        </div>
      </div>
    </section>
  );
}