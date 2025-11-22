import { BusinessPillars } from "@/components/features/OurBusiness/Water/BusinessPillars";
import { Hero } from "@/components/features/OurBusiness/Water/Hero";
import { Overview } from "@/components/features/OurBusiness/Water/Overview";
import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { waterService } from "@/services/OurBusiness/WaterService";
import { WaterPageProps } from "@/types/OurBusiness/Water";
import { MoveRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const description =
  "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";

const baseUrl = "https://cdi-be.cmlabs.dev";

export const metadata: Metadata = {
  title: "Water | Chandra Daya Investasi",
  description: description,
  keywords: [
    "Chandra Daya Investasi",
    "CDI",
    "CDIA",
    "PT Chandra Daya Investasi Tbk",
    "CDI Group",
  ],

  metadataBase: new URL(baseUrl),

  viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/our-business/water",
  },
  icons: {
    shortcut: "/assets/frontend/favicon.png",
  },

  openGraph: {
    title: "Chandra Daya Investasi",
    description: description,
    url: "/our-business/water",
    type: "website",
    siteName: "Chandra Daya Investasi",
  },

  twitter: {
    card: "summary_large_image",
    title: "Chandra Daya Investasi",
    description: description,
  },

  other: {
    "application-url": "https://cdi-be.cmlabs.dev",
    "preview-url": "https://cdi-be.cmlabs.dev/file-storage",
    "download-file": "https://cdi-be.cmlabs.dev/file-download",
    "add-file-preview": "https://cdi-be.cmlabs.dev/file/preview",
    "add-file-download": "https://cdi-be.cmlabs.dev/file/download",
  },
};

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
          href={waterData.link_url}
          className="bg-white text-neutral-950 px-6 py-2 rounded-full whitespace-nowrap w-fit flex flex-row gap-4 justify-center items-center"
        >
          <span className="text-xl">
            {locale === "en"
              ? waterData.link_title_en
              : waterData.link_title_id}
          </span>
          <span>
            <MoveRightIcon size={18} className="font-thin" />
          </span>
        </Link>
      </div>
    </main>
  );
}
