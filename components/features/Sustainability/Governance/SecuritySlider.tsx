"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ApiDataItem } from "@/types/Sustainabilitys/Governance";

interface CisoCardProps {
  number: string;
  title: string | null;
  description: string;
}

const CisoCard: React.FC<CisoCardProps> = ({ number, title, description }) => (
  <div
    className="p-8 rounded-xl min-h-[400px] shadow-lg flex flex-col justify-between h-full"
    style={{
      background:
        "linear-gradient(#0f2e42b8, #0f2e4200 30%, #0f2e4200 55.5%, #0f2e42b8 82.83%)",
    }}
  >
    <div className="flex flex-row items-center mb-4 md:mb-6">
      <span className="text-[48px] leading-none text-neutral-500 font-normal mr-4 mb-2 md:mb-0">
        {number}
      </span>
      <h3 className="text-white text-xl md:text-2xl font-semibold">
        {title}
      </h3>
    </div>
    <div
      className="max-w-3xl prose prose-invert prose-base"
      dangerouslySetInnerHTML={{ __html: description }}
    ></div>
  </div>
);

interface CisoSectionProps {
  data: ApiDataItem;
}

export const Ciso: React.FC<CisoSectionProps> = ({ data }) => {
  const TITLE = data.title;
  const cards = data.content_json || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isGrid, setIsGrid] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(1);

  const slidesContainerRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, cards.length - slidesToShow);

  useEffect(() => {
    const checkLayout = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setIsGrid(false);
        setSlidesToShow(1);
      } else if (width < 1024) {
        setIsGrid(false);
        setSlidesToShow(2);
      } else {
        setIsGrid(true);
        setSlidesToShow(3);
      }
    };

    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  useLayoutEffect(() => {
    if (isGrid || !slidesContainerRef.current) return;

    const safeIndex = Math.min(activeIndex, maxIndex);

    const percentPerSlide = 100 / slidesToShow;
    const xPercent = -(safeIndex * percentPerSlide);

    gsap.to(slidesContainerRef.current, {
      xPercent: xPercent,
      duration: 0.5,
      ease: "power3.inOut",
    });

    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
    }
  }, [activeIndex, isGrid, slidesToShow, maxIndex]);

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (activeIndex < maxIndex) setActiveIndex((prev) => prev + 1);
  };

  return (
    <section className="py-20 bg-[#091A24] text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold">{TITLE}</h2>

          {!isGrid && (
            <div className="flex items-center gap-4 py-10">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-200
                  ${
                    activeIndex === 0
                      ? "border-white/30 text-white/30 cursor-not-allowed"
                      : "border-white text-white hover:bg-white hover:text-[#091A24] cursor-pointer"
                  }
                `}
              >
                <ArrowLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                disabled={activeIndex === maxIndex}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-200
                  ${
                    activeIndex === maxIndex
                      ? "border-white/30 text-white/30 cursor-not-allowed"
                      : "border-white text-white hover:bg-white hover:text-[#091A24] cursor-pointer"
                  }
                `}
              >
                <ArrowRight size={24} />
              </button>
            </div>
          )}
        </div>

        {isGrid ? (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {cards.map((card) => (
              <CisoCard
                key={card.number || card.title}
                number={card.number || ""}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="flex relative w-full" ref={slidesContainerRef}>
              {cards.map((card) => (
                <div
                  key={card.number || card.title}
                  style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                  className="pr-4"
                >
                  <CisoCard
                    number={card.number || ""}
                    title={card.title}
                    description={card.description}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
