import { BusinessPillars } from "@/components/features/OurBusiness/Water/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/Water/Hero";
import { Overview } from "@/components/features/OurBusiness/Water/Overview";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { waterService } from "@/services/OurBusiness/WaterService";
import { WaterPageProps } from "@/types/OurBusiness/Water";
import { MoveRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params: { locale },
}: WaterPageProps): Promise<Metadata> {
  const waterData = await waterService.getWaterPageData(locale);
  const { banner_image, banner_title } = waterData;

  const pagePath = "/our-business/water";

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
        "en-US": "/our-business/water",
        "id-ID": "/id/our-business/water",
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

export default async function Page({ params: { locale } }: WaterPageProps) {
  const waterData = await waterService.getWaterPageData(locale);

  return (
    <main>
      <NavbarThemeTrigger theme="dark" />
      <Hero
        imageSrc={waterData.banner_image}
        title={waterData.banner_title}
        iconSrc="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
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
          <span className="text-sm md:text-md">
            {locale === "en"
              ? waterData.link_title_en
              : waterData.link_title_id}
          </span>
          <span>
            <MoveRightIcon size={14} className="font-thin" />
          </span>
        </Link>
      </div>
    </main>
  );
}
