import Image from "next/image";
import React from "react";
import { FileText, Eye, Download } from "lucide-react";
import Link from "next/link";
import { SustainabilityGovernanceSection } from "@/types/Sustainabilitys/Governance";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/KzIvM0t1dnphOGtpY291aXFYZ3JBa2t6ckk0L0d5MkpiSDhDSkhmcWtUbUpLQkg4anl1K1hxbmlJL05vd0NFT2EyRkdDSGg2WW00Q3hTajZhdUhpSG00MnR4b0l6bU13L0Qzb2Jtcm1CT009.webp";
const CTA_TITLE = "Our Code of Conduct";
const CTA_SIZE = "1.96 MB";
const CTA_VIEW_URL =
  "https://chandradaya-investasi.com/file/preview/default/sustainability-content/01jrak1nnftn7p0gt11ew631y8/Our Code of Conduct";
const CTA_DOWNLOAD_URL =
  "https://chandradaya-investasi.com/file/download/default/sustainability-content/01jrak1nnftn7p0gt11ew631y8/Our Code of Conduct";

interface governanceProps {
  data: SustainabilityGovernanceSection;
}

export function BusinessEthics({ data }: governanceProps) {
  return (
    <section
      aria-labelledby="business-ethics-heading"
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Abstract background for business ethics section"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business-2 z-10"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div className="flex flex-col gap-8 lg:max-w-[45%] me-auto">
          <div>
            <h2
              id="business-ethics-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {data.title || "Governance"}
            </h2>
            <div
              className="content !text-neutral-50 text-base"
              dangerouslySetInnerHTML={{ __html: data.content || "" }}
            ></div>
          </div>

          <div className="button-gradient-custom !flex-col !items-start lg:min-w-[50%] lg:w-fit">
            <div className="flex flex-col gap-2 pb-2 border-b border-b-neutral-9 mb-2 w-full">
              <h3 className="text-[22px] font-medium">{CTA_TITLE}</h3>
              <div className="flex items-center text-base text-white gap-3">
                <div className="flex items-baseline gap-3">
                  <span>{CTA_SIZE}</span>
                  <span>.</span>
                </div>
                <FileText size={16} className="inline-block" />
              </div>
            </div>
            <div className="flex items-center gap-8 w-full justify-center">
              <Link
                href={CTA_VIEW_URL}
                className="flex items-center gap-2 text-white font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye size={16} /> View
              </Link>
              <a
                href={CTA_DOWNLOAD_URL}
                className="flex items-center gap-2 text-white font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} /> Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
