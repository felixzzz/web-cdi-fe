import React from "react";
import Image from "next/image";
import { CompanyProfileResponse } from "@/types/AboutUs/About";

interface CompanyProfileProps {
  id?: string;
  title: string;
  subtitle: string;
  data: CompanyProfileResponse;
}

export const CompanyProfile: React.FC<CompanyProfileProps> = ({
  id,
  title,
  subtitle,
  data,
}) => {
  const baseUrl = "https://chandradaya-investasi.com";

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
        <div className="content primary !text-neutral-8 text-center mb-16">
          <p className="ql-align-center">{subtitle}</p>
        </div>

        {data && data.length > 0 && data.map((item) => {
          const itemViewUrl = `${baseUrl}/file/preview/default/${item.type}/${item.unique_key}/`;
          const itemDownloadUrl = `${baseUrl}/file/download/default/${item.type}/${item.unique_key}/`;

          return (
            <article
              key={item.ulid}
              className="py-8 border-b border-b-neutral-5 flex lg:items-center justify-between flex-col lg:flex-row gap-y-2 lg:gap-y-0"
            >
              <div>
                <h3 className="text-neutral-13 mb-2 text-lg font-medium">
                  {item.name}
                </h3>
                <div className="flex items-center text-base text-neutral-8 gap-3">
                  <div className="flex items-baseline gap-3">
                    <span>{item.file.size}</span>
                    <span>.</span>
                  </div>
                  {item.file.format === "pdf" && (
                    <Image
                      src="https://chandradaya-investasi.com/assets/frontend/icons/ic_filepdf.svg"
                      width={28}
                      height={20}
                      alt="PDF icon"
                      className="inline-block"
                    />
                  )}
                </div>
              </div>

              <div className="flex lg:items-center gap-8 w-full lg:w-fit">
                <a
                  href={itemViewUrl}
                  className="flex items-center gap-2 text-blue-base font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="https://chandradaya-investasi.com/assets/frontend/icons/ic_eye.svg"
                    width={20}
                    height={20}
                    alt="View icon"
                    className="inline-block"
                  />
                  View
                </a>
                <a
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
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};