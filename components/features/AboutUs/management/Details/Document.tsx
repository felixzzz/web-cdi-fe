import React from "react";
import { Link } from "@/i18n/navigation";
import { DownloadItem } from "@/types/AboutUs/Management";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface DocumentDownloadProps {
  title?: string;
  items: DownloadItem[];
}

export const DocumentDownload: React.FC<DocumentDownloadProps> = ({
  title = "Document",
  items,
}) => {
  const t = useTranslations("Management");
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="document-download-title"
      className="container mx-auto   my-16"
    >
      <h2
        id="document-download-title"
        className="text-2xl lg:text-3xl font-medium text-neutral-13"
      >
        {title}
      </h2>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <article
            key={item.title}
            className="py-8 border-b border-b-neutral-5 flex lg:items-center justify-between flex-col lg:flex-row gap-y-2 lg:gap-y-0"
          >
            <div>
              <h3 className="text-neutral-13 mb-2 text-lg font-medium">
                {item.title}
              </h3>
              <div className="flex items-center text-base text-neutral-8 gap-3">
                <div className="flex items-baseline gap-3">
                  <span>{item.size}</span>
                  <span>.</span>
                </div>
                <Image
                  src="/assets/icons/ic_filepdf.svg"
                  width={28}
                  height={20}
                  alt={`${item.format} file icon`}
                  className="inline-block"
                />
              </div>
            </div>

            <div className="flex items-end gap-8 w-fit">
              <Link
                href={item.viewUrl}
                className="flex items-center gap-2 text-[#2474A5] font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/icons/ic_eye.svg"
                  width={20}
                  height={20}
                  alt="View icon"
                  className="inline-block"
                />
                {t("download_view")}
              </Link>
              <Link
                href={item.downloadUrl}
                className="flex items-center gap-2 text-[#2474A5] font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/icons/ic_download_file.svg"
                  width={20}
                  height={20}
                  alt="Download icon"
                  className="inline-block"
                />
                {t("download_download")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
