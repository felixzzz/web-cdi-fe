import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DownloadItem } from "@/types/AboutUs/Management";
import { useTranslations } from "next-intl";

interface DownloadsProps {
  id?: string;
  title: string;
  subtitle: string;
  items: DownloadItem[];
}

export const Downloads: React.FC<DownloadsProps> = ({
  id,
  title,
  subtitle,
  items,
}) => {
  const t = useTranslations("Management")
  return (
    <section
      id={id}
      className="py-28 bg-neutral-3"
      aria-labelledby={`${id || "downloads"}-title`}
    >
      <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-44 2xl:px-44">
        <h2
          id={`${id || "downloads"}-title`}
          className="font-medium text-2xl md:text-[38px] md:leading-[44px] mb-4 text-center"
        >
          {title}
        </h2>
        <div 
        // className="content primary !text-neutral-8  mb-16"
        className="prose prose-invert prose-base text-neutral-500 mb-16" 
        >
          <div
            className="ql-align-center"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        </div>

        {items.map((item) => (
          <article
            key={item.title}
            className="py-8 border-b border-b-neutral-5 flex md:items-center justify-between flex-col md:flex-row gap-y-2 md:gap-y-0"
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
                  src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_filepdf.svg"
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
                className="flex items-center gap-2 text-blue-base font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_eye.svg"
                  width={20}
                  height={20}
                  alt="View icon"
                  className="inline-block"
                />
                {t('download_view')}
              </Link>
              <Link
                href={item.downloadUrl}
                className="flex items-center gap-2 text-blue-base font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_download_file.svg"
                  width={20}
                  height={20}
                  alt="Download icon"
                  className="inline-block"
                />
                {t('download_download')}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};