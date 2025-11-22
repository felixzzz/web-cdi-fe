import React from "react";
import { FileDownloadCTA } from "./FileDownloadCTA";

type FileInfo = {
  id: number;
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

export const CommitteeTabPanel: React.FC<CommitteeTabPanelProps> = ({ tab }) => {
  return (
    <div className="py-8">
      <h3 className="font-medium text-[22px] mb-3">{tab.title}</h3>
      
      <div
        className={`
          content 
          prose prose-invert prose-base 
          text-justify 
          w-full max-w-full     
          break-words         
          prose-img:w-full   
          prose-img:h-auto
          prose-p:text-wrap   
        `}
        dangerouslySetInnerHTML={{ __html: tab.contentHtml }}
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