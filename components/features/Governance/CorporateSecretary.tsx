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

const BASE_URL = "https://cdi-be.cmlabs.dev";

export function CorporateSecretary({
  sectionData,
  personData,
  filesData,
}: CorporateSecretaryProps) {
  return (
    <section
      id="corporate-secretary"
      aria-labelledby="corporate-secretary-heading"
      className="pt-20 bg-[#091A24] text-white scroll-mt-10"
    >
      <div className="container mx-auto px-4 lg:px-24 xl:px-8 2xl:px-44">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
          <aside className="md:col-span-2">
            <div className="relative aspect-square w-full rounded-[20px] overflow-hidden mb-6">
              <Image
                src={personData.file_url}
                alt={personData.title || "Corporate Secretary"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className="mb-3 font-medium text-lg md:text-[22px]">
              {personData.title}
            </p>
            <p className="prose prose-invert prose-base content text-sm md:text-base !font-light !text-white">
              {personData.content}
            </p>
          </aside>

          <main className="md:col-span-3">
            <h2
              id="corporate-secretary-heading"
              className="text-2xl md:text-[38px] md:leading-[44px] font-medium mb-4"
            >
              {sectionData.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base text-justify"
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