import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ApiDataItem } from "@/types/Sustainabilitys/Governance";
import { useTranslations } from "next-intl";

interface BusinessEthicsProps {
  data: ApiDataItem;
}

export function BusinessEthics({ data }: BusinessEthicsProps) {
  const t = useTranslations('Investor.Sustainability.Governance')
  if (!data) {
    return null;
  }
  const { title, content, image, file_information_en, ulid } = data;
  const fileInfo = file_information_en;

  const ctaViewUrl = `https://cdi-be.cmlabs.dev/file/preview/default/sustainability-content/${ulid}/${fileInfo?.title}`;
  const ctaDownloadUrl = `https://cdi-be.cmlabs.dev/file/download/default/sustainability-content/${ulid}/${fileInfo?.title}`;
  return (
    <section
      aria-labelledby="business-ethics-heading"
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={image}
        alt={title || "Business Ethics"}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business-2 z-10"></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44 relative z-20">
        <div className="flex flex-col gap-8 md:max-w-[45%] me-auto">
          <div>
            <h2
              id="business-ethics-heading"
              className="text-2xl md:text-[38px] md:leading-[44px] font-medium mb-4"
            >
              {title || "Business Ethics"}
            </h2>
            <div
              className="max-w-2xl prose prose-invert prose-base text-justify"
              dangerouslySetInnerHTML={{ __html: content || "" }}
            ></div>
          </div>

          {fileInfo && (
            <div
              className="button-gradient-custom p-4 !flex-col !items-start md:min-w-[50%] md:w-fit 
              border 
              bg-[linear-gradient(#d6f5ff29,#091a2429)] 
              rounded-lg"
              style={{
                borderColor: "color-mix(in oklab, #676869 40%, transparent)",
              }}
            >
              <div className="flex flex-col gap-2 pb-2 border-b border-b-neutral-9 mb-2 w-full">
                <h3 className="text-[22px] font-medium">{fileInfo.title}</h3>
                <div className="flex items-center text-base text-white gap-3">
                  <div className="flex items-baseline gap-3">
                    <span>{fileInfo.size}</span>
                    <span>.</span>
                  </div>
                  <Image
                    src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_filepdf_white.svg"
                    width={28}
                    height={20}
                    alt="See all icon"
                    className="inline-block"
                  />
                </div>
              </div>
              <div className="flex items-center gap-8 w-full justify-center">
                <Link
                  href={ctaViewUrl}
                  className="flex items-center gap-2 text-white font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_eye_white.svg"
                    width={28}
                    height={20}
                    alt="See all icon"
                    className="inline-block"
                  />
                {t('download_view')}
                </Link>
                <a
                  href={ctaDownloadUrl}
                  className="flex items-center gap-2 text-white font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_download_file_white.svg"
                    width={28}
                    height={20}
                    alt="See all icon"
                    className="inline-block"
                  />{" "}
                  {t('download_download')}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
