import { HeroForm } from "@/components/features/Governance/Whistleblowing/HeroForm";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { companyAddressService } from "@/services/Contact/ContactService";
import { governanceDetailService } from "@/services/Governance/WhistleblowingService";
import { ContactPageProps } from "@/types/Contact/Contact";
import { Metadata } from "next";
// import { useTranslations } from "next-intl";

export async function generateMetadata({
  params: { locale },
}: ContactPageProps): Promise<Metadata> {
  const getContactPageData = await companyAddressService.getContactPageData(
    locale
  );

  const pagePath = "/contact-us";

  const currentPath = locale === "en" ? pagePath : `/${locale}${pagePath}`;

  const title = "Chandra Daya Investasi";

  const description =
    "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

  return {
    title: title,
    description: description,
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
        "en-US": "/contact-us",
        "id-ID": "/id/contact-us",
      },
    },

    openGraph: {
      title: title,
      description: description,
      url: currentPath,
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
      title: title,
      description: description,
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
  const [getGovernancePageData, getContactData, getCountriesData, getOptionData] =
    await Promise.all([
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
