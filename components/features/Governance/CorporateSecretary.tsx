import Image from "next/image";
import React from "react";
import {
  ApiFileResponse,
  GovernanceSection,
} from "@/types/Governances/Governance";
import { FileDownloadCTA } from "./FileDownloadCTA";

interface CorporateSecretaryProps {
  sectionData: GovernanceSection;
  personData: GovernanceSection;
  filesData: ApiFileResponse;
}

const BASE_URL = "https://chandradaya-investasi.com";

export function CorporateSecretary({
  sectionData,
  personData,
  filesData,
}: CorporateSecretaryProps) {
  return (
    <section
      id="corporate-secretary"
      aria-labelledby="corporate-secretary-heading"
      className="pt-20 bg-[#091A24] text-white"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <aside className="lg:col-span-2">
            <div className="relative aspect-square w-full rounded-[20px] overflow-hidden mb-6">
              <Image
                src={personData.file_url}
                alt={personData.title || "Corporate Secretary"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="mb-3 font-medium text-lg lg:text-[22px]">
              {personData.title}
            </h3>
            <p className="prose prose-invert prose-base content text-sm lg:text-base !font-light !text-white">
              {personData.content}
            </p>
          </aside>

          <main className="lg:col-span-3">
            <h2
              id="corporate-secretary-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {sectionData.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base"
              dangerouslySetInnerHTML={{ __html: sectionData.content || "" }}
            />

            {/* Render file downloads dynamically */}
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
          </main>
        </div>
      </div>
    </section>
  );
}