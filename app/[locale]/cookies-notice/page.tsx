import {NavbarThemeTrigger} from "@/components/shared/NavbarThemeTrigger";
import {informationService} from "@/services/Global/informationService";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

interface PageProps {
    params: {
        locale: "en" | "id";
    };
}

export async function generateMetadata({
                                           params: {locale},
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

export default async function Page({params: {locale}}: PageProps) {
    const t = await getTranslations("Regulation");
    const data = await informationService.getCredentialData(locale);

    const termsData = data.cookies_consent;

    if (!termsData) {
        return (
            <main>
                <NavbarThemeTrigger theme="light"/>
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
            <NavbarThemeTrigger theme="light"/>
            <section className="container mx-auto   py-40">
                <h1 className="text-neutral-900 font-medium text-2xl md:text-4xl mb-5">
                    {termsData.title}
                </h1>
                <div
                    className="prose prose-base md:text-base md:leading-loose w-full max-w-full
      /* Base typography */
      text-gray-700 text-lg leading-[1.9]

      /* Headings */
      [&_h1]:mt-5 [&_h1]:mb-3 [&_h1]:text-3xl md:[&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:text-[#0A0F1A] [&_h1]:leading-[1.2]
      [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-[#0A0F1A] [&_h2]:leading-[1.25]
      [&_h3]:mt-4  [&_h3]:mb-1 [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#0A0F1A]
      [&_h4]:mt-3  [&_h4]:mb-1 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-[#0A0F1A]

      /* Paragraph & line spacing */
      [&_p]:my-2
      [&_p]:leading-[1.9]

      /* Strong / Em */
      [&_strong]:text-[#0A0F1A] [&_strong]:font-semibold
      [&_em]:text-gray-700

      /* Links (anchor) */
      [&_a]:font-semibold
      [&_a]:text-red-600
      [&_a]:underline
      [&_a]:decoration-red-200
      [&_a]:underline-offset-4
      [&_a:hover]:text-red-700
      [&_a:hover]:decoration-red-500
      [&_a:focus-visible]:outline-none
      [&_a:focus-visible]:ring-2
      [&_a:focus-visible]:ring-red-300
      [&_a:focus-visible]:ring-offset-2
      [&_a:focus-visible]:ring-offset-white
      /* External link indicator (target=_blank) */
      [&_a[target=_blank]]:after:content-['↗']
      [&_a[target=_blank]]:after:ml-1
      [&_a[target=_blank]]:after:text-[0.9em]
      [&_a[target=_blank]]:after:opacity-70

      /* Lists */
        [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc
        [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-disc
        [&_li]:my-2
        [&_li::marker]:text-gray-400
        [&_li_p]:ml-4

      /* Images */
      [&_img]:my-10
      [&_img]:rounded-2xl
      [&_img]:shadow-lg
      [&_img]:border
      [&_img]:border-gray-100

      /* Blockquote */
      [&_blockquote]:my-8
      [&_blockquote]:rounded-xl
      [&_blockquote]:border-l-4
      [&_blockquote]:border-red-300
      [&_blockquote]:bg-red-50/40
      [&_blockquote]:px-5
      [&_blockquote]:py-4
      [&_blockquote]:text-gray-700

      /* Horizontal rule */
      [&_hr]:my-10
      [&_hr]:border-gray-200

      /* Inline code */
      [&_code]:rounded-md
      [&_code]:bg-gray-100
      [&_code]:px-1.5
      [&_code]:py-0.5
      [&_code]:text-[0.95em]
      [&_code]:text-[#0A0F1A]

      /* Code blocks */
      [&_pre]:my-8
      [&_pre]:overflow-x-auto
      [&_pre]:rounded-2xl
      [&_pre]:bg-[#0A0F1A]
      [&_pre]:p-5
      [&_pre_code]:bg-transparent
      [&_pre_code]:text-gray-100
      [&_pre_code]:p-0

      /* Tables */
      [&_table]:my-10
      [&_table]:w-full
      [&_table]:border-collapse
      [&_thead_th]:bg-gray-50
      [&_th]:border [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-[#0A0F1A]
      [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top
    "
                    dangerouslySetInnerHTML={{__html: termsData.content || ""}}
                />
            </section>
        </main>
    );
}
