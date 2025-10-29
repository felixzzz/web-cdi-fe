import Image from "next/image";
import React from "react";
import { FileText, Eye, Download } from "lucide-react";

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
              className="content"
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

        <div className="mt-8 flex flex-col gap-8">
          <div className="button-gradient-custom">
            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] font-medium">{data.cta.title}</h3>
              <div className="flex items-center text-base text-white gap-3">
                <div className="flex items-baseline gap-3">
                  <span>{data.cta.fileSize}</span>
                  <span>.</span>
                </div>
                <FileText
                  size={16}
                  className="inline-block"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="flex lg:items-center gap-8 w-full lg:w-fit">
              <a
                href={data.cta.viewUrl}
                className="flex items-center gap-2 text-white font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye size={16} aria-hidden="true" /> View
              </a>
              <a
                href={data.cta.downloadUrl}
                className="flex items-center gap-2 text-white font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={16} aria-hidden="true" /> Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
