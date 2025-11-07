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

const BASE_URL = "https://chandradaya-investasi.com";

export function InternalAudit({ data, filesData }: InternalAuditProps) {
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
              {data.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base"
              dangerouslySetInnerHTML={{ __html: data.content || "" }}
            />
          </div>

          <div className="lg:col-span-3">
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