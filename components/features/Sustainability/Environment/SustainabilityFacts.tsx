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
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                className="max-w-2xl prose prose-invert prose-base"
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