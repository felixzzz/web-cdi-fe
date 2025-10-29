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
        className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <h2
            id="env-responsibility-heading"
            className="text-2xl leading-6 lg:text-[52px] lg:leading-[60px] font-medium text-[#47C1EA] max-w-[580px]"
          >
            {data.title || "Environmental Responsibility"}
          </h2>

          <div
            className="content !text-neutral-50 text-base"
            dangerouslySetInnerHTML={{ __html: data.content || "" }}
          >
          </div>
        </div>
      </section>
    </div>
  );
}