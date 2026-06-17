"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MilestoneApiResponse } from "@/types/AboutUs/About";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

interface MilestoneSectionProps {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  data: MilestoneApiResponse;
}

export const Milestone: React.FC<MilestoneSectionProps> = ({
  title,
  subtitle,
  backgroundImageUrl,
  data,
}) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const groupedData = React.useMemo(() => {
    if (!data) return [];
    const groups: { [key: string]: MilestoneApiResponse } = {};
    data.forEach((item) => {
      const year = String(item.year);
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(item);
    });
    return Object.keys(groups)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((year) => ({
        year,
        items: groups[year],
      }));
  }, [data]);

  const updateNavigationState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section id="milestone">
      <div
        className="py-28 bg-blue-dark text-white bg-cover relative"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 overlay-business" aria-hidden="true" />

        <div className="container mx-auto   relative z-[1]">
          <div className="flex items-center justify-between mb-16 gap-6">
            <div>
              <h2 className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-2">
                {title}
              </h2>
              <div className="content !text-neutral-5">
                <p>{subtitle}</p>
              </div>
            </div>

            {groupedData && groupedData.length > 1 && (
              <div className="flex items-center gap-4 flex-shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={isBeginning}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-200
                    ${
                      isBeginning
                        ? "border-white/30 text-white/30 cursor-not-allowed"
                        : "border-white text-white hover:bg-white hover:text-blue-dark cursor-pointer"
                    }
                  `}
                >
                  <ArrowLeft size={24} />
                </button>

                <button
                  onClick={handleNext}
                  disabled={isEnd}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-200
                    ${
                      isEnd
                        ? "border-white/30 text-white/30 cursor-not-allowed"
                        : "border-white text-white hover:bg-white hover:text-blue-dark cursor-pointer"
                    }
                  `}
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            )}
          </div>

          <div className="overflow-hidden">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onInit={updateNavigationState}
              onSlideChange={updateNavigationState}
              onUpdate={updateNavigationState}
              className="w-full"
            >
              {groupedData.map((group) => (
                <SwiperSlide key={group.year} className="!h-auto">
                  <MilestoneItem year={group.year} items={group.items} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

const MilestoneItem = ({ year, items }: { year: string; items: MilestoneApiResponse }) => (
  <div className="h-full flex flex-col">
    <h3 className="text-3xl font-bold text-[#47C1EA] mb-5">
      {year}
    </h3>
    <Image
      src="/assets/icons/ic_timeline.svg"
      alt="icon"
      title="icon"
      aria-hidden="true"
      width={40}
      height={40}
      className="mb-6 w-full"
    />
    <div
      className="backdrop-blur-sm rounded-lg p-6 min-h-[200px] border border-white/20 flex-grow flex flex-col gap-4"
      style={{
        background: "linear-gradient(#d6f5ff29, #091a2429)",
      }}
    >
      {items.map((item) => (
        <div
          key={item.ulid || item.id}
          className="prose prose-invert prose-base max-w-none text-neutral-200 text-sm lg:text-base leading-snug lg:leading-loose text-justify"
          dangerouslySetInnerHTML={{ __html: item.content || "" }}
        />
      ))}
    </div>
  </div>
);