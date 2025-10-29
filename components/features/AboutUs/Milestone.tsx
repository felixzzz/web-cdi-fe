"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MilestoneCard } from "./MilestoneCard";

interface MilestoneData {
  year: string;
  achievements: string[];
}

interface MilestoneSectionProps {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  data: MilestoneData[];
}

export const Milestone: React.FC<MilestoneSectionProps> = ({
  title,
  subtitle,
  backgroundImageUrl,
  data,
}) => {
  return (
    <section id="milestone">
      <div
        className="py-28 bg-blue-dark text-white bg-cover relative"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 overlay-business" aria-hidden="true" />

        <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
          <div className="flex items-center justify-between gap-4 mb-16">
            <div>
              <h2 className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-2">
                {title}
              </h2>
              <div className="content !text-neutral-5">
                <p>{subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="custom-prev cursor-pointer text-white text-2xl w-12 h-12 rounded-full border border-white flex items-center justify-center disabled:opacity-50">
                <ArrowLeft size={20} />
              </button>
              <button className="custom-next cursor-pointer text-white text-2xl w-12 h-12 rounded-full border border-white flex items-center justify-center disabled:opacity-50">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              1024: {
                slidesPerView: 2,
              },
            }}
            className="custom-swiper"
          >
            <div className="swiper-wrapper">
              {data.map((milestone) => (
                <SwiperSlide key={milestone.year} className="!h-auto">
                  <MilestoneCard
                    year={milestone.year}
                    milestones={milestone.achievements}
                  />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};
