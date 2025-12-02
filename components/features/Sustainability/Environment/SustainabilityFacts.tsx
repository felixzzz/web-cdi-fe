import { ApiDataItem } from "@/types/Sustainabilitys/Environment";
import Image from "next/image";
import React from "react";

interface SustainabilityFactsProps {
  data: ApiDataItem;
}

export function SustainabilityFacts({ data }: SustainabilityFactsProps) {
  const factoidData = data.content_json || [];

  return (
    <section className="py-28 text-white bg-[#091A24] bg-cover relative bg-center">
      <div className="container mx-auto   relative z-[1]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {factoidData.map((item, index) => (
            <div key={index} className="flex gap-4 items-start flex-col">
              <div className="flex shrink-0 w-[48px]">
                <Image
                  src={item.icon}
                  alt={item.title || "Fact icon"}
                  width={48}
                  height={48}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div
                  className="max-w-full prose prose-invert prose-base text-sm md:text-base leading-snug md:leading-loose text-justify text-neutral-300"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
