import Image from "next/image";
import React from "react";
import {
  ApiFileResponse,
  GovernanceSection,
} from "@/types/Governances/Governance";
import { FileDownloadCTA } from "./FileDownloadCTA";

interface InternalAuditProps {
  data: GovernanceSection;
  filesData: ApiFileResponse;
  locale: string
}

export function InternalAudit({ data, filesData, locale }: InternalAuditProps) {
  return (
    <section
      id="internal-audit"
      aria-labelledby="internal-audit-heading"
      className="pt-16 pb-20 bg-[#091A24] text-white scroll-mt-10"
    >
      <div className="container mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-8">
          <div className="lg:col-span-2">
            <h2
              id="internal-audit-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {data.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base text-sm lg:text-base leading-snug lg:leading-loose text-justify text-neutral-300"
              dangerouslySetInnerHTML={{ __html: data.content || "" }}
            />
          </div>

          <div className="lg:col-span-3">
            <Image
              src={data.file_url}
              alt={data.title || "Internal audit unit graph"}
              title={data.title || "Internal audit unit graph"}
              width={800}
              height={450}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {filesData.map((file) => {
          const viewUrl = `${process.env.NEXT_PUBLIC_URL}/file/preview/${locale}/${file.type}/${file.unique_key}/${file.name}`;
          const downloadUrl = `${process.env.NEXT_PUBLIC_URL}/file/download/${locale}/${file.type}/${file.unique_key}/`;

          return (
            <FileDownloadCTA
              key={file.id}
              title={file.name}
              fileSize={file.file.size}
              // format={file.file.format}
              viewUrl={viewUrl}
              downloadUrl={downloadUrl}
            />
          );
        })}
      </div>
    </section>
  );
}