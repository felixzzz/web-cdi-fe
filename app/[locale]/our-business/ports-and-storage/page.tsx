import { BusinessPillars } from "@/components/features/OurBusiness/ports-and-storage/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/ports-and-storage/Hero";
import { Overview } from "@/components/features/OurBusiness/ports-and-storage/Overview";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { portStorageService } from "@/services/OurBusiness/PortsStorageService";
import { PortStoragePageProps } from "@/types/OurBusiness/Ports&Storage";
import { MoveRightIcon } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params: { locale },
}: PortStoragePageProps): Promise<Metadata> {
  const t = await getTranslations(
    "metadata-seo.our-business-ports-and-storage",
  );

  const portStorageData =
    await portStorageService.getPortStoragePageData(locale);
  const { banner_image, banner_title } = portStorageData;

  const pagePath = "/our-business/ports-and-storage";

  const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

  const getCanonicalPath = (lang: string) => {
    if (lang === "id") return `${baseUrl}/${lang}${pagePath}`;
    return `${baseUrl}/${lang}${pagePath}`;
  };

  const currentUrl = getCanonicalPath(locale);

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL_LP}/${locale}`),

    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
    ],

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        "en-US": getCanonicalPath("en"), // Selalu return .../en/media/news
        "id-ID": getCanonicalPath("id"), // Selalu return .../media/news
      },
    },

    openGraph: {
      title: t("title"),
      description: t("description"),
      url: currentUrl,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url: banner_image || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: banner_title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [banner_image || "/assets/frontend/favicon.png"],
    },

    other: {
      "application-url": `${process.env.NEXT_PUBLIC_BASE_URL}`,
      "preview-url": `${process.env.NEXT_PUBLIC_BASE_URL}/file-storage`,
      "download-file": `${process.env.NEXT_PUBLIC_BASE_URL}/file-download`,
      "add-file-preview": `${process.env.NEXT_PUBLIC_BASE_URL}/file/preview`,
      "add-file-download": `${process.env.NEXT_PUBLIC_BASE_URL}/file/download`,
    },
  };
}

export default async function Page({
  params: { locale },
}: PortStoragePageProps) {
  const t = await getTranslations("OurBusiness");
  const portStorageData =
    await portStorageService.getPortStoragePageData(locale);

  const {
    banner_image,
    banner_title,
    overview_title,
    overview_description,
    overview_image,
    heading_tab_title,
    tabs,
    link_url,
    link_title_en,
  } = portStorageData;
  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={banner_image}
        title={banner_title}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <Overview
        title={overview_title}
        description={overview_description}
        imageUrl={overview_image}
        linkUrl={link_url}
        linkTitle={link_title_en}
      />
      {/* <BusinessPillars /> */}
      <BusinessPillars title={heading_tab_title} tab={tabs[0]} />
      <div className="w-full flex justify-center mx-auto bg-[#091A24] py-14">
        <Link
          target="_blank"
          href={link_url}
          className="bg-white text-neutral-950 px-6 py-2 rounded-full whitespace-nowrap w-fit flex flex-row gap-4 justify-center items-center"
        >
          <span className="text-sm lg:text-base">{t("learn_more")}</span>
          <span>
            <MoveRightIcon size={18} className="font-thin" />
          </span>
        </Link>
      </div>
    </main>
  );
}
