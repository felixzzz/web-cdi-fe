"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GovernanceSection } from "@/types/Governances/Governance";
import { useTranslations } from "next-intl";

interface PolicyProps {
  data: GovernanceSection;
}


export function Policy({ data }: PolicyProps) {
  const t = useTranslations('Investor.Governance')
  const TITLE = data.title || "Policy";
  const CONTENT_HTML = data.content || "";
  const LINK_URL = `/governance/policy`;
  // const LINK_URL = `${process.env.NEXT_PUBLIC_URL_LP}/governance/policy`;

  const handleLinkClick = () => {
    window.dispatchEvent(new Event("startProgressBar"));
  };

  return (
    <section
      id="policy"
      aria-labelledby="policy-heading"
      className="bg-[#051119] py-20 text-white scroll-mt-10"
    >
      <div className="container mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-8">
          <div className="lg:col-span-3">
            <h2
              id="policy-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>
            <span
              className="max-w-full prose prose-invert prose-base text-sm lg:text-base leading-snug lg:leading-loose text-justify"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            />

            <Link
              onClick={handleLinkClick}
              href={LINK_URL}
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-white flex items-center gap-2 w-fit mt-8"
            >
              {t('see_title')}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="lg:col-span-2"></div>
        </div>
      </div>
    </section>
  );
}