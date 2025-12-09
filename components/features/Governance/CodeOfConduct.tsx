import React from "react";
import {
  ApiFileResponse,
  GovernanceSection,
} from "@/types/Governances/Governance";
import { FileDownloadCTA } from "./FileDownloadCTA";

interface CodeOfConductProps {
  data: GovernanceSection;
  filesData: ApiFileResponse;
  locale: string
}

export function CodeOfConduct({ data, filesData, locale }: CodeOfConductProps) {
  return (
    <section
      id="code-of-conduct"
      aria-labelledby="code-of-conduct-heading"
      className="py-20 bg-[#091A24] text-white scroll-mt-10"
    >
      <div className="container mx-auto  ">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-8">
          <div className="md:col-span-4">
            <h2
              id="code-of-conduct-heading"
              className="text-2xl md:text-[38px] md:leading-[44px] font-medium mb-4"
            >
              {data.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base text-sm md:text-base leading-snug md:leading-loose text-justify"
              dangerouslySetInnerHTML={{ __html: data.content || "" }}
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