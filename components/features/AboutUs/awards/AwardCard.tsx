import React from "react";
import Image from "next/image";
import { ArrowRight, ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

export interface Award {
  year: string;
  date?: string;
  title: string;
  description: string;
  awarder: string;
  imageUrl: string;
  category?: string;
}

interface AwardCardProps {
  award: Award;
  onReadMore: (award: Award) => void;
  onImageClick: (imageUrl: string) => void;
  showReadMore?: boolean;
  showAwards?: boolean;
}

export const AwardCard: React.FC<AwardCardProps> = ({
  award,
  onReadMore,
  onImageClick,
  showReadMore = false,
  showAwards = false,
}) => {
  const t = useTranslations("AboutUs");
  const formatDate = (dateString?: string) => {
    if (!dateString) return award.year;
    try {
      return new Date(dateString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <div
          className="w-full cursor-pointer group"
          onClick={() => {
            if (award.imageUrl) onImageClick(award.imageUrl);
          }}
        >
          {award.imageUrl ? (
            <Image
              src={award.imageUrl}
              alt={`Image for ${award.title}`}
              width={400}
              height={444}
              className="aspect-[9/10] object-cover rounded-xl border-2 border-blue-dark outline-2 outline-[#f8f192c4] bg-white w-full hover:opacity-95 transition-opacity"
            />
          ) : (
            <div className="aspect-[9/10] w-full rounded-xl border-2 border-blue-dark bg-neutral-800 flex flex-col items-center justify-center text-neutral-500">
              <ImageIcon size={48} className="mb-2 opacity-50" />
              <p className="text-sm font-medium">No Image Available</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-start">
        <p className="text-sm text-neutral-400 mb-1">
          {formatDate(award.date)}
        </p>

        <h3 className="text-2xl font-medium text-white mb-4">{award.title}</h3>

        <div
          className={clsx(
            "mb-4 text-neutral-400 content leading-normal md:leading-[24px] text-justify",
            showAwards ? "text-sm md:text-[14px]" : "text-sm md:text-base line-clamp-5"
          )}
          dangerouslySetInnerHTML={{ __html: award.description }}
        />

        {showAwards && (
          <div>
            <h3 className="text-md font-medium text-white">
              {t('Awarded')}
            </h3>
            <div
              className={clsx(
                "mb-4 text-neutral-400 content  leading-normal md:leading-[24px] text-justify",
                showAwards ? "text-sm md:text-[14px]" : "text-sm md:text-base"
              )}
              dangerouslySetInnerHTML={{ __html: award.awarder }}
            />
          </div>
        )}

        {showReadMore && (
          <button
            onClick={() => onReadMore(award)}
            className="text-[#47C1EA] flex items-center gap-2 cursor-pointer hover:text-[#3ab0d8] transition-colors w-fit"
          >
            {t("Read_More")}
            <ArrowRight size={24} />
          </button>
        )}
      </div>
    </article>
  );
};
