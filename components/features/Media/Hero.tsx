"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { ChevronRight } from "lucide-react";
import { ApiLatestNewsResponse } from "@/types/Media/Media";
import { useTranslations } from "next-intl";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/N0YzSzZULzNFMm4yTWhCaWVhVXNTYXgrWXd3S1VZbzR5NDVMQXR1SThBV2pkaFlqYy9PNmVKckpkYWF0WW5QZCtCV09tc3NiUlozaXhzWjlaNW5FT1E9PQ.webp";

interface HeroNewsProps {
  latestNewsData: ApiLatestNewsResponse;
}

export function HeroNews({ latestNewsData }: HeroNewsProps) {
  const t = useTranslations('Media')
  const sliderData = latestNewsData.map((item) => ({
    id: item.data.id,
    title: item.data.title,
    imageUrl: item.data.image,
    category: item.data.category_name,
    date: item.data.date,
    description: item.data.short_content,
    linkUrl: item.data.route,
  }));

  const heroTitle =
    latestNewsData.length > 0
      ? latestNewsData[0].title
      : '<span class="text-[#47C1EA]">Berita</span> Terbaru';

  return (
    <section
      aria-labelledby="latest-news-heading"
      className="py-[5%] lg:py-[8%] relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Latar belakang abstrak berita terbaru"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44 relative z-10">
        <h2
          id="latest-news-heading"
          className="text-2xl leading-6 md:text-[52px] md:leading-[60px] font-semibold text-white mb-9"
          dangerouslySetInnerHTML={{ __html: heroTitle }}
        ></h2>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".custom-prev-news",
            nextEl: ".custom-next-news",
          }}
          pagination={{
            el: ".custom-pagination-media",
            clickable: true,
          }}
          slidesPerView={1}
          className="custom-swiper"
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative aspect-video md:h-[380px] w-full rounded-xl overflow-hidden">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6 rounded-xl bg-[#E6F0FA] border border-neutral-5 backdrop-blur-2xl">
                  <span className="bg-[#2474A5] text-white px-3 py-1 text-sm rounded-full me-4">
                    {slide.category}
                  </span>
                  <span className="text-sm text-neutral-10">{slide.date}</span>
                  <h1 className="text-[22px] font-medium line-clamp-3 mt-4 text-neutral-13">
                    {slide.title}
                  </h1>
                  <p
                    className="max-w-2xl prose prose-base text-neutral-700 mb-2 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  ></p>
                  <Link
                    href={slide.linkUrl}
                    className="text-[#2474A5] flex items-center text-[12px] gap-2"
                  >
                    {t('Media')}
                    <ChevronRight className="text-2xl" />
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <nav aria-label="Navigasi Berita" className="grid grid-cols-2 mt-6">
          <div className="flex">
            <div className="custom-pagination-media flex justify-center swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal"></div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              className="custom-prev-news cursor-pointer text-white text-2xl w-12 h-12 rounded-full border border-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Berita sebelumnya"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              className="custom-next-news cursor-pointer text-white text-2xl w-12 h-12 rounded-full border border-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Berita selanjutnya"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </nav> */}
      </div>
    </section>
  );
}
