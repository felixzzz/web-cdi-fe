"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/N0YzSzZULzNFMm4yTWhCaWVhVXNTYXgrWXd3S1VZbzR5NDVMQXR1SThBV2pkaFlqYy9PNmVKckpkYWF0WW5QZCtCV09tc3NiUlozaXhzWjlaNW5FT1E9PQ.webp";

const sliderData = [
  {
    id: 1,
    title:
      "CDI Group Perluas Portofolio PLTS Menjadi 11 MWp pada November 2025",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/SGJlVFhrK3dxUHJOY1htSDFZNnY5WWE5YjZWQUVTVngyQUxzTzA2WERWUW44SUUwdk9WOUxvMjFVSXc5SFozQ2Q0anIvZDVlbnNJb2pXQXlKZXo4elE9PQ.webp",
    category: "Perusahaan",
    date: "07-10-2025",
    description:
      "PT Chandra Daya Investasi Tbk (CDI Group), melalui anak usahanya di bidang energi,&nbsp;PT Krakatau Chandra Energi (KCE), terus memperkuat bisnis energi terbarukan dengan menambah kapasitas&nbsp;4,7 MWp&nbsp;dari Pe...",
    linkUrl:
      "https://chandradaya-investasi.com/media/news/cdi-group-expands-solar-power-portfolio-to-11-mwp-by-november-2025",
  },
];

export function HeroNews() {
  return (
    <section
      aria-labelledby="latest-news-heading"
      className="py-28 lg:py-40 relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Latar belakang abstrak berita terbaru"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-10">
        <h2
          id="latest-news-heading"
          className="text-2xl leading-6 lg:text-[52px] lg:leading-[60px] font-semibold text-white mb-9"
        >
          <span className="text-[#47C1EA]">Berita</span> Terbaru
        </h2>

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
              <article className="grid lg:grid-cols-2 gap-4">
                <div className="relative aspect-video lg:aspect-auto lg:h-[380px] w-full rounded-xl overflow-hidden">
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
                  {/* <h3> sudah benar secara semantik */}
                  <h3 className="text-[22px] font-medium line-clamp-3 mt-4 text-neutral-13">
                    {slide.title}
                  </h3>
                  <p
                  className="max-w-2xl prose prose-invert prose-base text-neutral-700 mb-2"
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  ></p>
                  <Link
                    href={slide.linkUrl}
                    className="text-[#2474A5] flex items-center text-[12px] gap-2"
                  >
                    Baca selengkapnya
                    <ChevronRight className="text-2xl" />
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <nav aria-label="Navigasi Berita" className="grid grid-cols-2 mt-6">
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
        </nav>
      </div>
    </section>
  );
}
