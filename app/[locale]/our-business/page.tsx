import { Business } from "@/components/features/OurBusiness/Business";
import { Hero } from "@/components/features/OurBusiness/Hero";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { stripHtml } from "@/lib/localization";
import { businessService } from "@/services/OurBusiness/BussinesService";
import { BussinesPageProps } from "@/types/OurBusiness/Bussines";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: BussinesPageProps): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const aboutData = await businessService.getBusinessPageData(locale);

  const { our_business_banner } = aboutData;

  const pagePath = "/our-business";

  const currentPath = locale === "en" ? pagePath : `/${locale}${pagePath}`;

  const title = "Chandra Daya Investasi";

  return {
    title: title,
    description: t("description"),
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),

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
      canonical: currentPath,
      languages: {
        "en-US": "/en/our-business",
        "id-ID": "/id/our-business",
      },
    },

    openGraph: {
      title: title,
      description: t("description"),
      url: currentPath,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url: our_business_banner?.file_url || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: our_business_banner?.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: t("description"),
      images: [our_business_banner?.file_url || "/assets/frontend/favicon.png"],
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

export default async function Page({ params: { locale } }: BussinesPageProps) {
  const [businessData, overviewData] = await Promise.all([
    businessService.getBusinessPageData(locale),
    businessService.getOverviewData(locale),
  ]);

  const { our_business_banner, our_business_overview } = businessData;

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={our_business_banner.file_url}
        title={our_business_banner.title || "About Chandra Daya Investasi"}
        subtitle={stripHtml(our_business_banner.content)}
        iconSrc="/assets/icons/ic_hero_circle_arrow_down.svg"
      />
      <Business items={overviewData} overview={our_business_overview} />
    </main>
  );
}
