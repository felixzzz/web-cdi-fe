import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CompanyProfileProps {
  id?: string;
  title: string;
  subtitle: string;
  itemTitle: string;
  itemSize: string;
  itemViewUrl: string;
  itemDownloadUrl: string;
}

export const Downloads: React.FC<CompanyProfileProps> = ({
  id,
  title,
  subtitle,
  itemTitle,
  itemSize,
  itemViewUrl,
  itemDownloadUrl,
}) => {
  return (
    <section
      id={id}
      className="py-28 bg-neutral-3"
      aria-labelledby="company-profile-title"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <h2
          id="company-profile-title"
          className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-4 text-center"
        >
          {title}
        </h2>
        <div className="content primary !text-neutral-8  mb-16">
          <p className="ql-align-center">{subtitle}</p>
        </div>

        <article className="py-8 border-b border-b-neutral-5 flex lg:items-center justify-between flex-col lg:flex-row gap-y-2 lg:gap-y-0">
          <div>
            <h3 className="text-neutral-13 mb-2 text-lg font-medium">
              {itemTitle}
            </h3>
            <div className="flex items-center text-base text-neutral-8 gap-3">
              <div className="flex items-baseline gap-3">
                <span>{itemSize}</span>
                <span>.</span>
              </div>
              <Image
                src="https://chandradaya-investasi.com/assets/frontend/icons/ic_filepdf.svg"
                width={28}
                height={20}
                alt="See all icon"
                className="inline-block"
              />
            </div>
          </div>

          <div className="flex lg:items-center gap-8 w-full lg:w-fit">
            <Link
              href={itemViewUrl}
              className="flex items-center gap-2 text-blue-base font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://chandradaya-investasi.com/assets/frontend/icons/ic_eye.svg"
                width={20}
                height={20}
                alt="See all icon"
                className="inline-block"
              />
              View
            </Link>
            <Link
              href={itemDownloadUrl}
              className="flex items-center gap-2 text-blue-base font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://chandradaya-investasi.com/assets/frontend/icons/ic_download_file.svg"
                width={20}
                height={20}
                alt="Download icon"
                className="inline-block"
              />
              Download
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
};
