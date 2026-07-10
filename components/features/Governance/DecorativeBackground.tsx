import Image from "next/image";
import React from "react";
import { GovernanceSection } from "@/types/Governances/Governance";

interface RiskManagementProps {
  data: GovernanceSection;
}

export function RiskManagement({ data }: RiskManagementProps) {
  const activeGradient = "linear-gradient(#051119, #091a24)";

  const BACKGROUND_IMAGE_URL = data.file_url;
  const TITLE = data.title || "Risk Management";
  const CONTENT_HTML = data.content || "";

  return (
    <section
      id="risk-management"
      aria-labelledby="risk-management-heading"
      className="bg-[#091A24] py-20 text-white relative overflow-hidden scroll-mt-10"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt={TITLE || "Abstract background pattern"}
        title={TITLE || "Abstract background pattern"}
        fill
        className="object-contain object-right z-[1]"
        priority
      />

      <div
        className="absolute inset-0 overlay-business z-0"
        style={{ backgroundImage: activeGradient }}
      ></div>

      <div className="container mx-auto   relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-8">
          <div>
            <h2
              id="risk-management-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>
            <span
              className="max-w-full prose prose-invert prose-base text-sm lg:text-base leading-snug md:leading-loose text-justify text-neutral-300"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}