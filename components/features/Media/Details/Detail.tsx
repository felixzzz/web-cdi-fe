import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  href: string;
  label: string;
};

type NewsDetailProps = {
  breadcrumbs: BreadcrumbItem[];
  articleTitle: string;
  publishDate: string;
  shareUrl: string;
  featureImageUrl: string;
  articleContent: string;
};

const shareIcons = [
  {
    name: "Copy",
    hrefBase: "#",
    iconSrc:
      "https://chandradaya-investasi.com/assets/frontend/icons/ic_share_copy_rounded.svg",
  },
  {
    name: "LinkedIn",
    hrefBase: "https://www.linkedin.com/shareArticle?mini=true&url=",
    iconSrc:
      "https://chandradaya-investasi.com/assets/frontend/icons/ic_share_linkedin_rounded.svg",
  },
  {
    name: "X/Twitter",
    hrefBase: "https://x.com/intent/tweet?url=",
    iconSrc:
      "https://chandradaya-investasi.com/assets/frontend/icons/ic_share_x_rounded.svg",
  },
  {
    name: "Facebook",
    hrefBase: "https://www.facebook.com/sharer/sharer.php?u=",
    iconSrc:
      "https://chandradaya-investasi.com/assets/frontend/icons/ic_share_fb_rounded.svg",
  },
];

const ShareButtons = ({ shareUrl }: { shareUrl: string }) => (
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
        <Image src={icon.iconSrc} alt="" width={32} height={32} />
      </a>
    ))}
  </div>
);

export const NewsDetail = ({
  breadcrumbs,
  articleTitle,
  publishDate,
  shareUrl,
  featureImageUrl,
  articleContent,
}: NewsDetailProps) => {
  return (
    <div className="py-[5%] lg:py-[8%]">
      <section className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44">
        <div className="flex gap-1 text-neutral-10 items-center">
          {breadcrumbs.map((item) => (
            <div key={item.href} className="flex items-center gap-1">
              <Link href={item.href} className="text-[#2474A5] font-extralight">
                {item.label}
              </Link>
              <ChevronRight size={18} className="text-lg" />
            </div>
          ))}
          <span className="font-medium">{articleTitle}</span>
        </div>

        <div className="flex items-center justify-between gap-2 my-4">
          <p className="text-neutral-10">{publishDate}</p>
          <ShareButtons shareUrl={shareUrl} />
        </div>

        <Image
          src={featureImageUrl}
          alt={articleTitle}
          width={1200}
          height={675}
          className="w-full rounded-xl mb-10 object-cover"
          priority
        />

        <h1 className="text-neutral-13 font-medium text-2xl md:text-[38px] md:leading-[44px] mb-6">
          {articleTitle}
        </h1>

        <div
          className="max-w-full prose prose-base text-justify text-neutral-900"
          dangerouslySetInnerHTML={{ __html: articleContent }}
        ></div>

        <div className="mt-16 flex-col text-center">
          <p className="font-medium text-neutral-13 md:text-lg mb-4">
            Bagikan postingan ini
          </p>
          <div className="flex items-center gap-2 justify-center">
            <ShareButtons shareUrl={shareUrl} />
          </div>
        </div>
      </section>
    </div>
  );
};
