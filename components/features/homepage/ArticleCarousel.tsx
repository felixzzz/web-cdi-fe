"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { ArticleCard, ArticleCardProps } from "./ArticleCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArticleCarouselProps {
  articles: ArticleCardProps[];
}

export const ArticleCarousel: React.FC<ArticleCarouselProps> = ({ articles }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1.2}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
          },
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="custom-swiper"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.title} className="!h-auto">
            <ArticleCard {...article} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-between items-center mt-6">
        <div className="custom-pagination flex items-center gap-2"></div>

        <div className="flex items-center gap-4">
          <button className="custom-prev cursor-pointer text-neutral-13 text-2xl w-12 h-12 rounded-full border border-neutral-13 flex items-center justify-center disabled:opacity-50">
            <ArrowLeft size={20} />
          </button>
          <button className="custom-next cursor-pointer text-neutral-13 text-2xl w-12 h-12 rounded-full border border-neutral-13 flex items-center justify-center disabled:opacity-50">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};