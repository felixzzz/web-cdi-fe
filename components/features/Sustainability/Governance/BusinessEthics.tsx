import Image from "next/image";
import React from "react";
import { Link } from "@/i18n/navigation";
import { ApiDataItem } from "@/types/Sustainabilitys/Governance";
import { useTranslations } from "next-intl";

interface BusinessEthicsProps {
  data: ApiDataItem;
  locale: string
}

export function BusinessEthics({ data, locale }: BusinessEthicsProps) {
  const t = useTranslations('Investor.Sustainability.Governance')
  if (!data) {
    return null;
  }
  const { title, content, image, file_information_en, ulid } = data;
  const fileInfo = file_information_en;

  const ctaViewUrl = `${process.env.NEXT_PUBLIC_URL}/file/preview/${locale}/sustainability-content/${ulid}/${fileInfo?.title}`;
  const ctaDownloadUrl = `${process.env.NEXT_PUBLIC_URL}/file/download/${locale}/sustainability-content/${ulid}/${fileInfo?.title}`;
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

      <div className="container mx-auto   relative z-20">
        <div className="flex flex-col gap-8 lg:max-w-[45%] me-auto">
          <div>
            <h2
              id="business-ethics-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {title || "Business Ethics"}
            </h2>
            <span
              className="max-w-2xl text-sm lg:text-base leading-snug lg:leading-loose prose prose-invert prose-base text-justify"
              dangerouslySetInnerHTML={{ __html: content || "" }}
            />
          </div>

          {fileInfo && (
            <div
              className="button-gradient-custom p-4 !flex-col !items-start lg:min-w-[50%] lg:w-fit 
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
                    src="/assets/icons/ic_filepdf_white.svg"
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
                    src="/assets/icons/ic_eye_white.svg"
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
                    src="/assets/icons/ic_download_file_white.svg"
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
