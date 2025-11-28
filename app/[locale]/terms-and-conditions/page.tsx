import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { informationService } from "@/services/Global/informationService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: {
    locale: "en" | "id";
  };
}

const description =
  "PT Chandra Daya Investasi Tbk (CDI Group) merupakan bagian dari investasi infrastruktur Chandra Asri Group, penyedia bahan kimia energi dan solusi infrastruktur terkemuka di Asia Tenggara dan ECGO, perusahaan induk yang berfokus pada investasi bisnis ketenagalistrikan di Thailand. Beragam operasi CDI Group mencakup termasuk penyediaan dan pengolahan air, energi, kepelabuhanan & penyimpanan, dan logistik.";
const title = "Chandra Daya Investasi";
const baseUrl = "https://cdi-lp.cmlabs.dev/terms-and-conditions";

export const metadata: Metadata = {
  title: title,
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
    canonical: "/",
  },
  icons: {
    shortcut: "/assets/frontend/favicon.png",
  },

  openGraph: {
    title: title,
    description: description,
    url: "/",
    type: "website",
    siteName: title,
  },

  twitter: {
    card: "summary_large_image",
    title: title,
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

export default async function Page({ params: { locale } }: PageProps) {
  const t = await getTranslations("Regulation");
  const data = await informationService.getCredentialData(locale);

  const termsData = data.terms_and_conditions;

  if (!termsData) {
    return (
      <main>
        <NavbarThemeTrigger theme="light" />
        <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-44 2xl:px-48 py-40">
          <NavbarThemeTrigger theme="light" />
          <h1 className="text-neutral-13 font-medium text-2xl lg:text-[28px] mb-5">
            {t("title_not_found")}
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <NavbarThemeTrigger theme="light" />

      <section className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-44 2xl:px-48 py-40">
        <h1 className="text-neutral-900 font-medium text-2xl md:text-4xl mb-5">
          {termsData.title}
        </h1>
        <div
          className="prose prose-base text-neutral-900 text-[12px] leading-[24px] w-full max-w-full"
          dangerouslySetInnerHTML={{ __html: termsData.content || "" }}
        />
      </section>
    </main>
  );
}
