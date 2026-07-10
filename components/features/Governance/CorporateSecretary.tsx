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
  locale: string
}

export function CorporateSecretary({
  sectionData,
  personData,
  filesData,
  locale,
}: CorporateSecretaryProps) {
  return (
    <section
      id="corporate-secretary"
      aria-labelledby="corporate-secretary-heading"
      className="pt-20 bg-[#091A24] text-white scroll-mt-10"
    >
      <div className="container mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <aside className="lg:col-span-2">
            <div className="relative aspect-square w-full rounded-[20px] overflow-hidden mb-6">
              <Image
                src={personData.file_url}
                alt={personData.title || "Corporate Secretary"}
                title={personData.title || "Corporate Secretary"}
                fill
                className="object-cover"
              />
            </div>
            <p className="mb-3 font-medium text-lg lg:text-[22px]">
              {personData.title}
            </p>
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
              className="mb-2 max-w-full prose prose-invert prose-base text-sm lg:text-base leading-snug lg:leading-loose text-justify text-neutral-300"
              dangerouslySetInnerHTML={{ __html: sectionData.content || "" }}
            />

            {/* Render file downloads dynamically */}
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
          </main>
        </div>
      </div>
    </section>
  );
}