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
}

const BASE_URL = "https://cdi-be.cmlabs.dev";

export function InternalAudit({ data, filesData }: InternalAuditProps) {
  return (
    <section
      id="internal-audit"
      aria-labelledby="internal-audit-heading"
      className="pt-16 pb-20 bg-[#091A24] text-white scroll-mt-10"
    >
      <div className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-44 2xl:px-48">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-8">
          <div className="md:col-span-2">
            <h2
              id="internal-audit-heading"
              className="text-2xl md:text-[38px] md:leading-[44px] font-medium mb-4"
            >
              {data.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base text-[11px] md:text-[12px] leading-normal md:leading-[24px] text-justify text-neutral-300"
              dangerouslySetInnerHTML={{ __html: data.content || "" }}
            />
          </div>

          <div className="md:col-span-3">
            <Image
              src={data.file_url}
              alt={data.title || "Internal audit unit graph"}
              width={800}
              height={450}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {filesData.map((file) => {
          const viewUrl = `${BASE_URL}/file/preview/default/${file.type}/${file.unique_key}/${file.name}`;
          const downloadUrl = `${BASE_URL}/file/download/default/${file.type}/${file.unique_key}/`;

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