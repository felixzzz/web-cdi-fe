"use client";

import { useTranslations } from "next-intl";
import { BookOpen, ExternalLink } from "lucide-react";

export type Reference = {
  id?: string | number;
  title: string;
  url: string;
  publisherName?: string;
  publisher_name?: string;
};

export type ArticleReferencesProps = {
  references?: Reference[];
  title?: string;
  className?: string;
};

export const ArticleReferences = ({
  references,
  title,
  className = "",
}: ArticleReferencesProps) => {
  const t = useTranslations("Media");

  if (!references || references.length === 0) {
    return null;
  }

  const sectionTitle = title || t("article_sources");

  return (
    <section
      aria-label="Article References"
      className={`mt-10 mb-8 p-5 sm:p-6 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={18} className="text-[#2474A5] shrink-0" />
        <h3 className="text-sm sm:text-base font-bold tracking-wide text-neutral-900 uppercase">
          {sectionTitle}
        </h3>
      </div>

      <ol className="list-decimal pl-5 space-y-3 text-sm text-neutral-700 leading-relaxed">
        {references.map((ref, index) => {
          const publisher = ref.publisherName || ref.publisher_name;
          const key = ref.id || index;

          return (
            <li key={key} className="pl-1">
              {publisher && (
                <strong className="font-semibold text-neutral-900 mr-1.5">
                  {publisher}:
                </strong>
              )}
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2474A5] font-medium hover:underline inline-flex items-center gap-1 group transition-colors"
              >
                <span>{ref.title}</span>
                <ExternalLink
                  size={13}
                  className="inline-block shrink-0 opacity-70 group-hover:opacity-100 transition-opacity text-[#2474A5]"
                />
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default ArticleReferences;
