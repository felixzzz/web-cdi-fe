import {
    ApiLatestNewsResponse,
    HeroNewsSection,
    IReportType,
    NewsApiResponse,
    PressReleaseApiResponse
} from "@/types/Media/Media";
import axios from "axios";

const API_URL_MEDIA = `${process.env.NEXT_PUBLIC_BASE_URL}/article/list/news?`;
const API_URL_MEDIA_BLOG = `${process.env.NEXT_PUBLIC_BASE_URL}/article/list/blog?`;
const API_URL_HERO_MEDIA = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/additional-page/media_main`;
const API_URL_RELEASE = `${process.env.NEXT_PUBLIC_BASE_URL}/press-releases/list`;
const API_URL_MEDIA_LATEST = `${process.env.NEXT_PUBLIC_BASE_URL}/article/latest-media`;
const API_URL_CATEGORY = `${process.env.NEXT_PUBLIC_BASE_URL}/utility/categories`;

// method untuk fetch data list category report press release
export async function getCategoryData(locale: string): Promise<IReportType[]> {
    const res = await fetch(API_URL_CATEGORY, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            lang: locale
        },
        next: {
            revalidate: 3600,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch home data: ${res.statusText}`);
    }

    return await res.json() as IReportType[];
}

// method untuk fetch data page media news
export async function getMediaPageData(
    locale: string
): Promise<NewsApiResponse> {
    try {
        const response = await axios.get<NewsApiResponse>(
            API_URL_MEDIA,
            {
                headers: {
                    "Content-Type": "application/json",
                    lang: locale,
                },
            }
        );

        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error, "Failed to fetch latest news data");
    }
}

// method untuk fetch data page media blog
export async function getMediaBlogPageData(
    locale: string
): Promise<NewsApiResponse> {
    try {
        const response = await axios.get<NewsApiResponse>(
            API_URL_MEDIA_BLOG,
            {
                headers: {
                    "Content-Type": "application/json",
                    lang: locale,
                },
            }
        );

        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error, "Failed to fetch latest news data");
    }
}

// method untuk fetch data hero section media news
export async function getHeroPageData(
    locale: string
): Promise<HeroNewsSection> {
    try {
        const response = await axios.get<HeroNewsSection>(
            API_URL_HERO_MEDIA,
            {
                headers: {
                    "Content-Type": "application/json",
                    lang: locale,
                },
            }
        );

        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error, "Failed to fetch latest news data");
    }
}

export const mediaService = {
    getMediaPageData,
    getMediaBlogPageData,
    getHeroPageData
};


// method untuk fetch data page press release
export async function getPressReleasePageData(locale: string): Promise<PressReleaseApiResponse> {
    const res = await fetch(API_URL_RELEASE, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            lang: locale
        },
        next: {
            revalidate: 3600,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch home data: ${res.statusText}`);
    }

    return await res.json() as PressReleaseApiResponse;
}

// method untuk fetch data latest news media
export async function getLatestNewsData(
    locale: string
): Promise<ApiLatestNewsResponse> {
    try {
        const response = await axios.get<ApiLatestNewsResponse>(
            API_URL_MEDIA_LATEST,
            {
                headers: {
                    "Content-Type": "application/json",
                    lang: locale,
                },
            }
        );

        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error, "Failed to fetch latest news data");
    }
}

function handleAxiosError(error: unknown, message: string): never {
    if (axios.isAxiosError(error)) {
        throw new Error(
            `${message}: ${error.response?.statusText || error.message}`
        );
    }

    throw new Error(`${message}: Unknown error`);
}

export const pressReleaseService = {
    getPressReleasePageData,
    getLatestNewsData,
    getCategoryData,
};
