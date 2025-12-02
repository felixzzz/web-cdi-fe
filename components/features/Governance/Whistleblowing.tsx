"use client";

import Image from "next/image";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GovernanceSection } from "@/types/Governances/Governance"; // Import the type
import { useTranslations } from "next-intl";

interface WhistleblowingProps {
  data: GovernanceSection;
}

export function Whistleblowing({ data }: WhistleblowingProps) {
  const t = useTranslations("Investor.Governance");
  // Use data from props.
  const TITLE = data.title || "Whistleblowing";
  const CONTENT_HTML = data.content || "";
  const IMAGE_URL = data.file_url;
  const IMAGE_ALT = data.title || "Whistleblowing concept illustration";
  const LINK_URL = `/governance/whistleblowing`;
  // const LINK_URL = `${process.env.NEXT_PUBLIC_URL_LP}/governance/whistleblowing`;

  const handleLinkClick = () => {
    window.dispatchEvent(new Event("startProgressBar"));
  };

  return (
    <section
      id="whistleblowing"
      aria-labelledby="whistleblowing-heading"
      className="bg-[#091A24] py-20 text-white scroll-mt-10"
    >
      <div className="container mx-auto  ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-8 ">
          <div className="md:col-span-3">
            <h2
              id="whistleblowing-heading"
              className="text-2xl md:text-[38px] md:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base text-sm md:text-base leading-snug md:leading-loose text-justify"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            />
            <Link
              onClick={handleLinkClick}
              href={LINK_URL}
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-white flex items-center gap-2 w-fit mt-8"
            >
              {t("cta_whistle")}
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="md:col-span-2">
            <Image
              src={IMAGE_URL}
              alt={IMAGE_ALT}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
