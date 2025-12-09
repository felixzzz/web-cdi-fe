// components/YourFolder/FileDownloadCTA.tsx
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface FileDownloadCTAProps {
  title: string;
  fileSize: string;
  viewUrl: string;
  downloadUrl: string;
}

export function FileDownloadCTA({
  title,
  fileSize,
  viewUrl,
  downloadUrl,
}: FileDownloadCTAProps) {
  const t = useTranslations('Investor.Governance')
  return (
    <div
      className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between w-full
      border 
      bg-[linear-gradient(#d6f5ff29,#091a2429)] 
      rounded-lg"
      style={{
        borderColor: "color-mix(in oklab, #676869 40%, transparent)",
      }}
    >
      <div className="flex flex-col gap-2 mb-4 lg:mb-0">
        <h3 className="text-2xl font-medium">{title}</h3>
        <div className="flex items-center text-base text-white gap-2">
          <span className="text-sm">{fileSize}</span>
          <span className="text-sm">.</span>
          <Image
            src="/assets/icons/ic_filepdf_white.svg"
            width={16}
            height={16}
            alt="PDF icon"
            className="inline-block"
          />
          <span className="font-medium text-sm">PDF</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <a
          href={viewUrl}
          className="flex items-center gap-2 text-white font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/icons/ic_eye_white.svg"
            width={20}
            height={20}
            alt="View icon"
          />{" "}
          {t('download_view')}
        </a>
        <a
          href={downloadUrl}
          className="flex items-center gap-2 text-white font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/assets/icons/ic_download_file_white.svg"
            width={20}
            height={20}
            alt="Download icon"
            />{" "}
            {t('download_download')}
        </a>
      </div>
    </div>
  );
}