import React from "react";
import {
  ApiFileResponse,
  GovernanceSection,
} from "@/types/Governances/Governance";
import { FileDownloadCTA } from "./FileDownloadCTA";

interface CodeOfConductProps {
  data: GovernanceSection;
  filesData: ApiFileResponse;
}

const BASE_URL = "https://chandradaya-investasi.com";

export function CodeOfConduct({ data, filesData }: CodeOfConductProps) {
  return (
    <section
      id="code-of-conduct"
      aria-labelledby="code-of-conduct-heading"
      className="py-20 bg-[#091A24] text-white"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-8">
          <div className="lg:col-span-4">
            <h2
              id="code-of-conduct-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {data.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base"
              dangerouslySetInnerHTML={{ __html: data.content || "" }}
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