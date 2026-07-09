import { BusinessPillars } from "@/components/features/OurBusiness/Water/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/Water/Hero";
import { Overview } from "@/components/features/OurBusiness/Water/Overview";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { waterService } from "@/services/OurBusiness/WaterService";
import { WaterPageProps } from "@/types/OurBusiness/Water";
import { MoveRightIcon } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cleanJsonLdString, buildServiceSchema } from "@/lib/schema-org";
import JsonLd from "@/components/shared/JsonLd";

export async function generateMetadata({
  params: { locale },
}: WaterPageProps): Promise<Metadata> {
  const t = await getTranslations("metadata-seo.our-business-water");

  const waterData = await waterService.getWaterPageData(locale);
  const { banner_image, banner_title } = waterData;

  const pagePath = "/our-business/water";

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
        en: getCanonicalPath("en"),
        id: getCanonicalPath("id"),
        "x-default": getCanonicalPath("en"),
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

export default async function Page({ params: { locale } }: WaterPageProps) {
  const t = await getTranslations("OurBusiness");
  const waterData = await waterService.getWaterPageData(locale);

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={waterData.banner_image}
        title={waterData.banner_title}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <Overview
        title={waterData.overview_title}
        description={waterData.overview_description}
        imageUrl={waterData.overview_image}
        linkUrl={waterData.link_url}
        linkTitle={waterData.link_title_en}
      />
      <BusinessPillars
        title={waterData.heading_tab_title}
        tabs={waterData.tabs}
      />
      <div className="w-full flex justify-center mx-auto bg-[#091A24] py-14">
        <Link
          target="_blank"
          href={waterData.link_url}
          className="bg-white text-neutral-950 px-6 py-2 rounded-full whitespace-nowrap w-fit flex flex-row gap-4 justify-center items-center"
        >
          <span className="text-sm lg:text-base">{t("learn_more")}</span>
          <span>
            <MoveRightIcon size={14} className="font-thin" />
          </span>
        </Link>
      </div>
      {/* JSON-LD Structured Data Schema Markup */}
      {cleanJsonLdString(waterData.json_ld) ? (
        <JsonLd data={cleanJsonLdString(waterData.json_ld)!} />
      ) : (
        <JsonLd data={buildServiceSchema({
          name: waterData.title || "Water Business",
          description: waterData.description || "",
          url: `${process.env.NEXT_PUBLIC_URL_LP || 'https://chandradaya-investasi.com'}/${locale}/our-business/water`
        })} />
      )}
    </main>
  );
}
