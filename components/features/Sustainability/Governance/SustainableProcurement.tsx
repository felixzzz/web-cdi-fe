import React from "react";
import { ApiDataItem } from "@/types/Sustainabilitys/Governance"; 

interface SustainableProcurementProps {
  data: ApiDataItem;
}

export function SustainableProcurement({ data }: SustainableProcurementProps) {
  const TITLE = data.title;
  const INTRO_TEXT = data.content || "";
  const procurementPoints = data.content_json || [];

  return (
    <section
      aria-labelledby="procurement-heading"
      className="py-28 text-white bg-[#051119] !bg-blue-dark-black relative"
    >
      <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-44 2xl:px-44 relative z-[1]">
        <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2 items-center">
          <h2
            id="procurement-heading"
            className="text-2xl md:text-[38px] md:leading-[44px] font-medium"
          >
            {TITLE}
          </h2>
          <div
            className="max-w-3xl prose prose-invert prose-base text-neutral-200"
            dangerouslySetInnerHTML={{ __html: INTRO_TEXT }}
          ></div>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {procurementPoints.map((point, index) => (
            <li key={index} className="flex gap-4 items-start">
              <div
              className="max-w-3xl prose prose-invert prose-base text-justify"
                dangerouslySetInnerHTML={{ __html: point.description }}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}