"use client";

import Image from "next/image";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MilestoneApiResponse } from "@/types/AboutUs/About";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGrid, setIsGrid] = useState(true);

  const slidesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkLayout = () => {
      setIsGrid(window.innerWidth >= 768);
    };

    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  useLayoutEffect(() => {
    if (isGrid || !slidesContainerRef.current) return;

    const targetSlide = slidesContainerRef.current.children[activeIndex] as HTMLElement;
    if (!targetSlide) return;

    const targetX = -targetSlide.offsetLeft;

    gsap.to(slidesContainerRef.current, {
      x: targetX,
      duration: 0.5,
      ease: "power3.inOut",
    });
  }, [activeIndex, isGrid]);

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (activeIndex < data.length - 1) setActiveIndex((prev) => prev + 1);
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

            {!isGrid && (
              <div className="flex items-center gap-4 flex-shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-200
                    ${
                      activeIndex === 0
                        ? "border-white/30 text-white/30 cursor-not-allowed"
                        : "border-white text-white hover:bg-white hover:text-blue-dark cursor-pointer"
                    }
                  `}
                >
                  <ArrowLeft size={24} />
                </button>

                <button
                  onClick={handleNext}
                  disabled={activeIndex === data.length - 1}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-200
                    ${
                      activeIndex === data.length - 1
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

          {isGrid ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {data.map((milestone) => (
                <MilestoneItem key={milestone.ulid || milestone.id} milestone={milestone} />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="flex relative" ref={slidesContainerRef}>
                {data.map((milestone) => (
                  <div
                    key={milestone.ulid || milestone.id}
                    className="w-full flex-shrink-0 pr-4"
                  >
                    <MilestoneItem milestone={milestone} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const MilestoneItem = ({ milestone }: { milestone: MilestoneApiResponse[number] }) => (
  <div>
    <h3 className="text-3xl font-bold text-[#47C1EA] mb-5">
      {milestone.year}
    </h3>
    <Image
      src="/assets/icons/ic_timeline.svg"
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
      className="mb-6 w-full"
    />
    <div
      className="backdrop-blur-sm rounded-lg p-6 min-h-[200px] border border-white/20 h-auto"
      style={{
        background: "linear-gradient(#d6f5ff29, #091a2429)",
      }}
    >
      <div
        className="prose prose-invert prose-base max-w-none text-neutral-200 text-[9px] md:text-[12px] leading-normal md:leading-[24px]"
        dangerouslySetInnerHTML={{ __html: milestone.content || "" }}
      />
    </div>
  </div>
);