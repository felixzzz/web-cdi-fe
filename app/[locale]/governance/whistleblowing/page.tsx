import { HeroForm } from "@/components/features/Governance/Whistleblowing/HeroForm";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { companyAddressService } from "@/services/Contact/ContactService";
import { governanceDetailService } from "@/services/Governance/WhistleblowingService";
import { ContactPageProps } from "@/types/Contact/Contact";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
// import { useTranslations } from "next-intl";

interface PageProps {
  params: {
    locale: "en" | "id";
  };
}

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
    const t = await getTranslations('metadata')

  const pagePath = "/governance/whistleblowing";

  const currentPath = locale === "en" ? pagePath : `/${locale}${pagePath}`;

  const title = "Chandra Daya Investasi";
  return {
    title: title,
    description: t('description'),
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),

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
        "en-US": "/en/governance/whistleblowing",
        "id-ID": "/id/governance/whistleblowing",
      },
    },

    openGraph: {
      title: title,
      description: t('description'),
      url: "/",
      type: "website",
      siteName: title,
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: t('description'),
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
    getGovernancePageData,
    getContactData,
    getCountriesData,
    getOptionData,
  ] = await Promise.all([
    governanceDetailService.getGovernancePageData(locale),
    companyAddressService.getContactData(locale),
    companyAddressService.getCountriesData(locale),
    governanceDetailService.getOptionData(locale),
  ]);

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <HeroForm
        contactData={getContactData}
        governance_whistleblowing={
          getGovernancePageData.governance_whistleblowing
        }
        governance_whistleblowing_detail={
          getGovernancePageData.governance_whistleblowing_detail
        }
        countries={getCountriesData}
        topics={getOptionData}
      />
    </main>
  );
}
