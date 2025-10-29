"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { ArrowLeft, ArrowRight } from "lucide-react";

const sliderData = [
  {
    id: 1,
    number: "1",
    title: "Confidentiality",
    description:
      "Safeguarding sensitive information from unauthorized access or disclosure.",
  },
  {
    id: 2,
    number: "2",
    title: "Integrity",
    description:
      "Ensuring the accuracy and completeness of information and software.",
  },
  {
    id: 3,
    number: "3",
    title: "Availability",
    description:
      "Making certain that critical information and services are accessible to users only when required.",
  },
];

export function SecuritySlider() {
  return (
    <section
      aria-labelledby="security-components-heading"
      className="py-20 text-white bg-[#091A24] relative"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
        <div className="flex max-lg:flex-col items-center gap-8 mb-16 justify-between">
          <div className="flex flex-col gap-1">
            <h2
              id="security-components-heading"
              className="text-2xl lg:text-[28px] font-medium"
            >
              Three fundamental components of information security management
            </h2>
            <div className="content !text-neutral-4"></div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              className="custom-prev cursor-pointer text-white text-2xl w-12 h-12 rounded-full border border-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              className="custom-next cursor-pointer text-white text-2xl w-12 h-12 rounded-full border border-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          spaceBetween={24}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="custom-swiper"
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <article className="rounded-3xl p-6 overflow-hidden w-full aspect-[3/4] flex flex-col gap-4 justify-between relative bg-gray-800">
                <div className="absolute inset-0 overlay-card-sustainability"></div>

                <div className="relative z-[1]">
                  <div className="flex items-center gap-2">
                    <p className="text-white/40 text-4xl lg:text-[68px]">
                      {slide.number}
                    </p>
                    <h3 className="text-2xl lg:text-[28px] font-medium text-white">
                      {slide.title}
                    </h3>
                  </div>
                </div>
                <div className="!text-neutral-5 relative z-[1]">
                  <p>{slide.description}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
