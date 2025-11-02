import Image from "next/image";
import React from "react";
import { Eye, Download } from "lucide-react";

const data = {
  section: {
    title: "Internal Audit Unit",
    contentHtml: `
      <p>CDI Group established an Internal Audit Unit to assist Management in preparing and managing a systematic and orderly approach in implementing its monitoring and evaluation duties on internal control, risk management and corporate governance.</p>
      <p>Structure and position, duties, responsibilities, authority, as well as requirements and the Code of Conduct of Internal Auditor are set forth in the Internal Audit Charter. Internal Audit Charter was approved by the Decree of the Board of Directors as well as Board of Commissioner, and is used.</p>
    `,
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/MVFzUEt2c2NxWFM2YnRBd1FGRS95Y0xyRHJMVkZhUlR3UkdRZ3Z3ZXRmMWRNUnZVWHJUQUpYeHFyRENVUHRvcQ.webp",
  },
  cta: {
    title: "Internal Audit Charter",
    fileSize: "652.98 KB",
    viewUrl:
      "https://chandradaya-investasi.com/file/preview/default/internal_audit/Internal_Audit_01/Internal Audit Charter",
    downloadUrl:
      "https://chandradaya-investasi.com/file/download/default/internal_audit/Internal_Audit_01/",
  },
};

export function InternalAudit() {
  return (
    <section
      id="internal-audit-unit"
      aria-labelledby="internal-audit-heading"
      className="pt-16 pb-20 bg-[#091A24] text-white"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-8">
          <div className="lg:col-span-2">
            <h2
              id="internal-audit-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {data.section.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base"
              dangerouslySetInnerHTML={{ __html: data.section.contentHtml }}
            />
          </div>

          <div className="lg:col-span-3">
            <Image
              src={data.section.imageUrl}
              alt="Grafik atau bagan unit audit internal"
              width={800}
              height={450}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <div
          className="mt-8 p-6 flex flex-col md:flex-row md:items-center md:justify-between w-full
                      border 
                      bg-[linear-gradient(#d6f5ff29,#091a2429)] 
                      rounded-lg"
          style={{
            borderColor: "color-mix(in oklab, #676869 40%, transparent)",
          }}
        >
          <div className="flex flex-col gap-2 mb-4 md:mb-0">
            <h3 className="text-2xl font-medium">{data.cta.title}</h3>
            <div className="flex items-center text-base text-white gap-2">
              <span className="text-sm">{data.cta.fileSize}</span>
              <span className="text-sm">.</span>
              <Image
                src="https://chandradaya-investasi.com/assets/frontend/icons/ic_filepdf_white.svg"
                width={26}
                height={20}
                alt="See all icon"
                className="inline-block"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={data.cta.viewUrl}
              className="flex items-center gap-2 text-white font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Eye size={20} /> View
            </a>
            <a
              href={data.cta.downloadUrl}
              className="flex items-center gap-2 text-white font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={20} /> Download
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
