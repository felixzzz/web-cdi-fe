import { NavbarThemeTrigger } from "@/components/shared/NavbarThemeTrigger";
import { informationService } from "@/services/Global/informationService";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: {
    locale: "en" | "id";
  };
}

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const pagePath = "/cookies-notice";

  const title = "Chandra Daya Investasi";

const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

  const getCanonicalPath = (lang: string) => {
    if (lang === 'id') return `${baseUrl}/${lang}${pagePath}`; 
    return `${baseUrl}/${lang}${pagePath}`;      
  };

  const currentUrl = getCanonicalPath(locale);

  return {
    title: title,
    description: t("description"),
    keywords: [
      "Chandra Daya Investasi",
      "CDI",
      "CDIA",
      "PT Chandra Daya Investasi Tbk",
      "CDI Group",
    ],

    metadataBase: new URL(`${baseUrl}/${locale}`),

    viewport: {
      width: "device-width",
      initialScale: 1.0,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        "en-US": getCanonicalPath('en'), // Selalu return .../en/media/news
        "id-ID": getCanonicalPath('id'), // Selalu return .../media/news
      },
    },
    icons: {
      shortcut: "/assets/frontend/favicon.png",
    },

    openGraph: {
      title: title,
      description: t("description"),
      url: "/",
      type: "website",
      siteName: title,
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: t("description"),
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

export default async function Page({ params: { locale } }: PageProps) {
  const t = await getTranslations("Regulation");
  const data = await informationService.getCredentialData(locale);

  const termsData = data.cookies_consent;

  if (!termsData) {
    return (
      <main>
        <NavbarThemeTrigger theme="light" />
        <section className="container mx-auto   py-40">
          <h1 className="text-neutral-13 font-medium text-2xl lg:text-[28px] mb-6">
            {t("title_not_found")}
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <NavbarThemeTrigger theme="light" />
      <section className="container mx-auto   py-40">
        <h1 className="text-neutral-900 font-medium text-2xl md:text-4xl mb-5">
          {termsData.title}
        </h1>
        <div
          className="prose prose-base text-neutral-900 text-sm md:text-base leading-normal md:leading-loose w-full max-w-full"
          dangerouslySetInnerHTML={{ __html: termsData.content || "" }}
        />
      </section>
    </main>
  );
}
