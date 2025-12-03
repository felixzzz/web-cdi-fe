import { BusinessPillars } from "@/components/features/OurBusiness/ports-and-storage/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/ports-and-storage/Hero";
import { Overview } from "@/components/features/OurBusiness/ports-and-storage/Overview";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { portStorageService } from "@/services/OurBusiness/PortsStorageService";
import { PortStoragePageProps } from "@/types/OurBusiness/Ports&Storage";
import { MoveRightIcon } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({
  params: { locale },
}: PortStoragePageProps): Promise<Metadata> {
  const portStorageData = await portStorageService.getPortStoragePageData(
    locale
  );
  const { banner_image, banner_title } = portStorageData;

  const pagePath = "/our-business/ports-and-storage";

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
        "en-US": "/en/our-business/ports-and-storage",
        "id-ID": "/id/our-business/ports-and-storage",
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
          url: banner_image || "/assets/frontend/favicon.png",
          width: 1200,
          height: 630,
          alt: banner_title || "CDI Banner",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
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
  const t = await getTranslations('OurBusiness')
  const portStorageData = await portStorageService.getPortStoragePageData(
    locale
  );

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
          <span className="text-sm md:text-base">
            {t('learn_more')}
          </span>
          <span>
            <MoveRightIcon size={18} className="font-thin" />
          </span>
        </Link>
      </div>
    </main>
  );
}
