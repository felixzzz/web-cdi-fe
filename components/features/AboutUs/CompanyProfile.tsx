import React from "react";
import Image from "next/image";
import { CompanyProfileResponse } from "@/types/AboutUs/About";
import { useTranslations } from "next-intl";

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
  const baseUrl = "https://cdi-be.cmlabs.dev";

  const t = useTranslations("AboutUs");

  return (
    <section
      id={id}
      className="py-28 bg-neutral-3"
      aria-labelledby="company-profile-title"
    >
      <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44">
        <h2
          id="company-profile-title"
          className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-4 text-center"
        >
          {title}
        </h2>
        <div className="content primary !text-neutral-500 text-center mb-16">
          <p className="ql-align-center">{subtitle}</p>
        </div>

        {data &&
          data.length > 0 &&
          data.map((item) => {
            const itemViewUrl = `${baseUrl}/file/preview/default/${item.type}/${item.unique_key}/`;
            const itemDownloadUrl = `${baseUrl}/file/download/default/${item.type}/${item.unique_key}/`;

            return (
              <article
                key={item.ulid}
                className="py-8 border-b border-b-neutral-5 flex lg:items-center justify-between flex-col md:flex-row gap-y-2 md:gap-y-0"
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
                        src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_filepdf.svg"
                        width={28}
                        height={20}
                        alt="PDF icon"
                        className="inline-block"
                      />
                    )}
                  </div>
                </div>

                <div className="flex lg:items-center gap-8 w-full md:w-fit">
                  <a
                    href={itemViewUrl}
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
                    {t("company_profile_view")}
                  </a>
                  <a
                    href={itemDownloadUrl}
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
                    {t("company_profile_download")}
                  </a>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
};
