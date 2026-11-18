import React from "react";
import {
  ApiFileResponse,
  GovernanceSection,
} from "@/types/Governances/Governance";
import { FileDownloadCTA } from "./FileDownloadCTA";

interface GuidelineProps {
  data?: GovernanceSection;
  filesData: ApiFileResponse;
  locale: string;
}

export function Guideline({ data, filesData, locale }: GuidelineProps) {
  const title = data?.title || (locale === "id" ? "Panduan" : "Guideline");
  const content = data?.content || "";

  return (
    <section
      id="guideline"
      aria-labelledby="guideline-heading"
      className="py-20 bg-[#051119] text-white scroll-mt-10"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-8">
          <div className="lg:col-span-4">
            <h2
              id="guideline-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {title}
            </h2>
            {content && (
              <div
                className="max-w-full prose prose-invert prose-base text-sm lg:text-base leading-snug lg:leading-loose text-justify text-neutral-300"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </div>

        {filesData && filesData.length > 0 && (
          <div className="flex flex-col gap-4">
            {filesData.map((file) => {
              const viewUrl = `${process.env.NEXT_PUBLIC_URL}/file/preview/${locale}/${file.type}/${file.unique_key}/${file.name}`;
              const downloadUrl = `${process.env.NEXT_PUBLIC_URL}/file/download/${locale}/${file.type}/${file.unique_key}/`;

              return (
                <FileDownloadCTA
                  key={file.id}
                  title={file.name}
                  fileSize={file.file?.size || ""}
                  viewUrl={viewUrl}
                  downloadUrl={downloadUrl}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
