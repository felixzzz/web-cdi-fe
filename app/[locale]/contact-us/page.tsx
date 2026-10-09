import { HeroForm } from "@/components/features/Contact/HeroForm";
import { OtherCompany } from "@/components/features/Contact/OtherCompany";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { companyAddressService } from "@/services/Contact/ContactService";
import { ContactPageProps } from "@/types/Contact/Contact";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
// import { useTranslations } from "next-intl";

import { seoService } from "@/services/Global/seoService";

export async function generateMetadata({
  params: { locale },
}: ContactPageProps): Promise<Metadata> {
  const [seo, t, getContactPageData] = await Promise.all([
    seoService.getPageSeoMetadata("meta_contact_us", locale),
    getTranslations("metadata-seo.contact-us"),
    companyAddressService.getContactPageData(locale),
  ]);

  const title = seo.title || t("title");
  const description = seo.description || t("description");

  const pagePath = "/contact-us";

  const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

  const getCanonicalPath = (lang: string) => {
    return `${baseUrl}/${lang}${pagePath}`;      
  };

  const currentUrl = getCanonicalPath(locale);

  return {
    title,
    description,
    metadataBase: new URL(`${baseUrl}/${locale}`),

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
        en: getCanonicalPath('en'),
        id: getCanonicalPath('id'),
        "x-default": getCanonicalPath('en'),
      },
    },

    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: "Chandra Daya Investasi",
      locale: locale,
      type: "website",
      images: [
        {
          url: getContactPageData.file_url || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: getContactPageData.title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getContactPageData.file_url || "/assets/frontend/favicon.png"],
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

export default async function Page({ params: { locale } }: ContactPageProps) {
  const [
    getContactPageData,
    companyAddressData,
    getContactData,
    getCountriesData,
    getOptionData,
  ] = await Promise.all([
    companyAddressService.getContactPageData(locale),
    companyAddressService.getCompanyAddressPageData(locale),
    companyAddressService.getContactData(locale),
    companyAddressService.getCountriesData(locale),
    companyAddressService.getOptionData(locale),
  ]);

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <HeroForm
        contactData={getContactData}
        pageData={getContactPageData}
        countries={getCountriesData}
        topics={getOptionData}
      />
      <NavbarThemeTrigger theme="light" />
      <OtherCompany companyAddressData={companyAddressData} />
    </main>
  );
}
