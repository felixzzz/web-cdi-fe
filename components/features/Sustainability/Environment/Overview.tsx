import { SustainabilityEnvironmentSection } from "@/types/Sustainabilitys/Environment";
import React from "react";

interface EnvResponsibilityProps {
  data: SustainabilityEnvironmentSection;
}

export function EnvironmentalResponsibility({ data }: EnvResponsibilityProps) {
  return (
    <div className="py-20 bg-[#091A24]">
      <section
        aria-labelledby="env-responsibility-heading"
        className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-44 2xl:px-48"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <h2
            id="env-responsibility-heading"
            className="text-2xl leading-6 md:text-[52px] md:leading-[60px] font-medium text-[#47C1EA] max-w-[580px]"
          >
            {data.title || "Environmental Responsibility"}
          </h2>

          <div
          className="max-w-full prose prose-invert prose-base text-[11px] md:text-[12px] leading-normal md:leading-[24px] text-justify text-neutral-200"
            dangerouslySetInnerHTML={{ __html: data.content || "" }}
          >
          </div>
        </div>
      </section>
    </div>
  );
}