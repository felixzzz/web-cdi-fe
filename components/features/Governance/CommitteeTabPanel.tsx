import React, { useMemo } from "react";
import { FileDownloadCTA } from "./FileDownloadCTA";

type FileInfo = {
  id: string | number;
  title: string;
  fileSize: string;
  viewUrl: string;
  downloadUrl: string;
};

export type CommitteeTabData = {
  id: string;
  label: string;
  title: string;
  contentHtml: string;
  files: FileInfo[];
};

interface CommitteeTabPanelProps {
  tab: CommitteeTabData;
}

export const CommitteeTabPanel: React.FC<CommitteeTabPanelProps> = ({
  tab,
}) => {
  const sanitizedContent = useMemo(() => {
    if (!tab.contentHtml) return "";

    return tab.contentHtml
      .replace(/&nbsp;/g, " ")
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }, [tab.contentHtml]);

  console.log('files download')
  console.log(tab['files'])

  return (
    <div className="py-8">
      <h3 className="font-medium text-[22px] mb-3">{tab.title}</h3>

      <div
        className={`
          content 
          prose prose-invert prose-base 
          w-full max-w-full     
          break-words         
          prose-img:w-full   
          prose-img:h-auto
          prose-p:text-wrap   
          text-sm md:text-base leading-snug md:leading-loose text-justify
          text-neutral-300
        `}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      <div className="mt-8 flex flex-col gap-8 mb-6">
        {tab.files.map((file) => (
          <FileDownloadCTA
            key={file.id}
            title={file.title}
            fileSize={file.fileSize}
            viewUrl={file.viewUrl}
            downloadUrl={file.downloadUrl}
          />
        ))}
      </div>
    </div>
  );
};
