import {NewsDetail} from "@/components/features/Media/Details/Detail";
import {RelatedPosts} from "@/components/features/Media/Details/RelatedPosts";
import {NavbarThemeTrigger} from "@/components/shared/NavbarThemeTrigger";
import {stripHtml} from "@/lib/localization";
import {mediaService} from "@/services/Media/MediaService";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {notFound} from "next/navigation";

export type PageProps = {
    params: {
        slug: string;
        locale: string;
    };
};

export async function generateMetadata({
                                           params,
                                       }: PageProps): Promise<Metadata> {
    const mediaData = await mediaService.getMediaPageData(params.locale);

    const article = mediaData.items.find((item) => item.slug === params.slug);

    if (!article) {
        return {
            title: "News Not Found | Chandra Daya Investasi",
        };
    }

    const articleTitle = params.locale === "id" ? article.title_id : article.title_en;

    const title = `Chandra Daya Investasi | ${articleTitle}`;
    const description = (article?.meta_tag?.description || "");
    const imageUrl = article.image || "/assets/frontend/favicon.png";

    const pagePath = `/media/news/${params.slug}`;

    const baseUrl = process.env.NEXT_PUBLIC_URL_LP || "http://localhost:3000";

    const getCanonicalPath = (lang: string) => {
        if (lang === 'id') return `${baseUrl}/${lang}${pagePath}`;
        return `${baseUrl}/${lang}${pagePath}`;
    };

    const currentUrl = getCanonicalPath(params.locale);

    return {
        title: title,
        description: description,
        metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL_LP}/${params.locale}`),

        keywords: [
            "Chandra Daya Investasi",
            "CDI",
            "CDIA",
            "PT Chandra Daya Investasi Tbk",
            "CDI Group",
            (article?.meta_tag?.keyword || "")
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
                "en-US": getCanonicalPath('en'), // Selalu return .../en/media/news
                "id-ID": getCanonicalPath('id'), // Selalu return .../media/news
            },
        },

        openGraph: {
            title: title,
            description: description,
            url: currentUrl,
            siteName: "Chandra Daya Investasi",
            locale: params.locale,
            type: "website",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: articleTitle,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [imageUrl],
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

export default async function Page({params}: PageProps) {
    const t = await getTranslations("Media");
    const mediaData = await mediaService.getMediaPageData(params.locale);

    const article = mediaData.items.find((item) => item.slug === params.slug);

    if (!article) {
        notFound();
    }

    const title = params.locale === "id" ? article.title_id : article.title_en;
    const content =
        params.locale === "id" ? article.content_id : article.content_en;

    const breadcrumbs = [
        {href: `/`, label: "Home"},
        {href: `/media/news`, label: t('News')},
    ];

    const shareUrl = encodeURIComponent(
        `${process.env.NEXT_PUBLIC_URL}/${params.locale}/media/news/${params.slug}`
    );

    const formatDatePublish = (dateString?: string) => {
        if (!dateString) return dateString ?? "";

        const date = new Date(dateString);

        // check invalid date
        if (isNaN(date.getTime())) {
            return dateString; // fallback original value
        }

        return new Intl.DateTimeFormat(
            params.locale === "id" ? "id-ID" : "en-GB",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        ).format(date);
    };

    return (
        <main>
            <NavbarThemeTrigger theme="light"/>
            <NewsDetail
                breadcrumbs={breadcrumbs}
                articleTitle={title}
                publishDate={formatDatePublish(article.date)}
                shareUrl={shareUrl}
                featureImageUrl={article.image}
                articleContent={content}
            />
            <NavbarThemeTrigger theme="light"/>
            <RelatedPosts
                allArticles={mediaData.items}
                currentArticle={article}
                locale={params.locale}
                type="news"
            />
        </main>
    );
}
