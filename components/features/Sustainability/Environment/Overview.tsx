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
        className="container mx-auto px-4 lg:px-24 xl:px-8 2xl:px-44"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <h2
            id="env-responsibility-heading"
            className="text-2xl leading-6 md:text-[52px] md:leading-[60px] font-medium text-[#47C1EA] max-w-[580px]"
          >
            {data.title || "Environmental Responsibility"}
          </h2>

          <div
          className="max-w-full prose prose-invert prose-base text-justify"
            dangerouslySetInnerHTML={{ __html: data.content || "" }}
          >
          </div>
        </div>
      </section>
    </div>
  );
}