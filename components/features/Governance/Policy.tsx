import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GovernanceSection } from "@/types/Governances/Governance";

interface PolicyProps {
  data: GovernanceSection;
}

const LINK_URL = "https://chandradaya-investasi.com/governance/policy";

export function Policy({ data }: PolicyProps) {
  const TITLE = data.title || "Policy";
  const CONTENT_HTML = data.content || "";

  return (
    <section
      id="policy"
      aria-labelledby="policy-heading"
      className="bg-[#051119] py-20 text-white"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-8">
          <div className="lg:col-span-3">
            <h2
              id="policy-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            />

            <Link
              href={LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-white flex items-center gap-2 w-fit mt-8"
            >
              See All
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="lg:col-span-2"></div>
        </div>
      </div>
    </section>
  );
}