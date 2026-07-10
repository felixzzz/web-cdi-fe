"use client";

import {Link} from "@/i18n/navigation";
import Image from "@/components/shared/SafeImage";
import {ChevronRight, CalendarDays, UserPen} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect} from "react";

type BreadcrumbItem = {
    href: string;
    label: string;
};

type NewsDetailProps = {
    breadcrumbs: BreadcrumbItem[];
    articleTitle: string;
    publishDate: string;
    rawPublishDate?: string;
    updatedDate?: string;
    rawUpdatedDate?: string;
    shareUrl: string;
    featureImageUrl: string;
    articleContent: string;
};

const shareIcons = [
    {
        name: "Copy",
        hrefBase: "#",
        iconSrc:
            "/assets/icons/ic_share_copy_rounded.svg",
    },
    {
        name: "LinkedIn",
        hrefBase: "https://www.linkedin.com/shareArticle?mini=true&url=",
        iconSrc:
            "/assets/icons/ic_share_linkedin_rounded.svg",
    },
    {
        name: "X/Twitter",
        hrefBase: "https://x.com/intent/tweet?url=",
        iconSrc:
            "/assets/icons/ic_share_x_rounded.svg",
    },
    {
        name: "Facebook",
        hrefBase: "https://www.facebook.com/sharer/sharer.php?u=",
        iconSrc:
            "/assets/icons/ic_share_fb_rounded.svg",
    },
];

const ShareButtons = ({shareUrl}: { shareUrl: string }) => (
    <div className="flex items-center gap-2">
        {shareIcons.map((icon) => (
            <a
                key={icon.name}
                href={
                    icon.name === "Copy" ? icon.hrefBase : `${icon.hrefBase}${shareUrl}`
                }
                target={icon.name === "Copy" ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={`Share on ${icon.name}`}
            >
                <Image src={icon.iconSrc} alt="" width={32} height={32}/>
            </a>
        ))}
    </div>
);

export const NewsDetail = ({
                               breadcrumbs,
                               articleTitle,
                               publishDate,
                               rawPublishDate,
                               updatedDate,
                               rawUpdatedDate,
                               shareUrl,
                               featureImageUrl,
                               articleContent,
                           }: NewsDetailProps) => {
    const t = useTranslations("Media");
    useEffect(() => {
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event("finishProgressBar"));
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="py-[5%] lg:py-[8%]">
            <section className="container mx-auto   py-36 lg:py-0">
                <div className="flex gap-1 text-neutral-10 items-center">
                    {breadcrumbs.map((item) => (
                        <div key={item.href} className="flex items-center gap-1">
                            <Link title={item.label} href={item.href} className="text-[#2474A5] font-extralight">
                                {item.label}
                            </Link>
                            <ChevronRight size={18} className="text-lg"/>
                        </div>
                    ))}
                    <span className="font-medium">{articleTitle}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 my-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                        {publishDate && (
                            <span className="flex items-center gap-1.5">
                                <CalendarDays size={15} className="shrink-0 text-neutral-400" />
                                <time dateTime={rawPublishDate || publishDate}>{publishDate}</time>
                            </span>
                        )}
                        {updatedDate && updatedDate !== publishDate && (
                            <span className="flex items-center gap-1.5 text-neutral-400">
                                <span className="hidden sm:inline">·</span>
                                <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">{t("last_updated")}</span>
                                <time dateTime={rawUpdatedDate || updatedDate}>{updatedDate}</time>
                            </span>
                        )}
                    </div>
                    <ShareButtons shareUrl={shareUrl}/>
                </div>

                <Image
                    src={featureImageUrl}
                    alt={articleTitle}
                    title={articleTitle}
                    width={1200}
                    height={675}
                    className="w-full rounded-xl mb-10 object-cover"
                    priority
                />

                <h1 className="text-neutral-13 font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-6">
                    {articleTitle}
                </h1>

                <div
                    className="max-w-full content text-justify text-neutral-900 text-[14px] leading-normal lg:leading-[24px]"
                >
                    <article className="max-w-none">
                        <div
                            dangerouslySetInnerHTML={{__html: articleContent || ''}}
                            className="
      /* Base typography */
      text-gray-700 text-lg leading-[1.9]

      /* Headings */
      [&_h1]:mt-5 [&_h1]:mb-3 [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:text-[#0A0F1A] [&_h1]:leading-[1.2]
      [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#0A0F1A] [&_h2]:leading-[1.25]
      [&_h3]:mt-4  [&_h3]:mb-1 [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#0A0F1A]
      [&_h4]:mt-3  [&_h4]:mb-1 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[#0A0F1A]

      /* Paragraph & line spacing */
      [&_p]:my-2
      [&_p]:leading-[1.9]

      /* Strong / Em */
      [&_strong]:text-[#0A0F1A] [&_strong]:font-semibold
      [&_em]:text-gray-700

      /* Links (anchor) */
      [&_a]:font-semibold
      [&_a]:text-red-600
      [&_a]:underline
      [&_a]:decoration-red-200
      [&_a]:underline-offset-4
      [&_a:hover]:text-red-700
      [&_a:hover]:decoration-red-500
      [&_a:focus-visible]:outline-none
      [&_a:focus-visible]:ring-2
      [&_a:focus-visible]:ring-red-300
      [&_a:focus-visible]:ring-offset-2
      [&_a:focus-visible]:ring-offset-white
      /* External link indicator (target=_blank) */
      [&_a[target=_blank]]:after:content-['↗']
      [&_a[target=_blank]]:after:ml-1
      [&_a[target=_blank]]:after:text-[0.9em]
      [&_a[target=_blank]]:after:opacity-70

      /* Lists */
      [&_ul]:my-6 [&_ul]:pl-6 [&_ul]:list-disc
      [&_ol]:my-6 [&_ol]:pl-6 [&_ol]:list-decimal
      [&_li]:my-2
      [&_li::marker]:text-gray-400

      /* Images */
      [&_img]:my-10
      [&_img]:rounded-2xl
      [&_img]:shadow-lg
      [&_img]:border
      [&_img]:border-gray-100

      /* Blockquote */
      [&_blockquote]:my-8
      [&_blockquote]:rounded-xl
      [&_blockquote]:border-l-4
      [&_blockquote]:border-red-300
      [&_blockquote]:bg-red-50/40
      [&_blockquote]:px-5
      [&_blockquote]:py-4
      [&_blockquote]:text-gray-700

      /* Horizontal rule */
      [&_hr]:my-10
      [&_hr]:border-gray-200

      /* Inline code */
      [&_code]:rounded-md
      [&_code]:bg-gray-100
      [&_code]:px-1.5
      [&_code]:py-0.5
      [&_code]:text-[0.95em]
      [&_code]:text-[#0A0F1A]

      /* Code blocks */
      [&_pre]:my-8
      [&_pre]:overflow-x-auto
      [&_pre]:rounded-2xl
      [&_pre]:bg-[#0A0F1A]
      [&_pre]:p-5
      [&_pre_code]:bg-transparent
      [&_pre_code]:text-gray-100
      [&_pre_code]:p-0

      /* Tables */
      [&_table]:my-10
      [&_table]:w-full
      [&_table]:border-collapse
      [&_thead_th]:bg-gray-50
      [&_th]:border [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-[#0A0F1A]
      [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top
    "
                        />
                    </article>
                </div>

                {/* Author Box */}
                <div className="mt-12 border border-neutral-100 rounded-2xl bg-neutral-50/60 p-6 flex items-center gap-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#2474A5] to-[#1a5a8a] flex items-center justify-center shadow-md">
                        <UserPen size={24} className="text-white" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-0.5">
                            {t("written_by")}
                        </p>
                        <p className="font-semibold text-neutral-800 text-base leading-snug">
                            CDI Editorial Team
                        </p>
                        <p className="text-sm text-neutral-500 mt-0.5">
                            PT Chandra Daya Investasi Tbk
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex-col text-center">
                    <p className="font-medium text-neutral-13 lg:text-lg mb-4">
                        {t("share")}
                    </p>
                    <div className="flex items-center gap-2 justify-center">
                        <ShareButtons shareUrl={shareUrl}/>
                    </div>
                </div>
            </section>
        </div>
    );
};
