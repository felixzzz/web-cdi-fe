"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ArticleCard } from "./ArticleCard";
import { ApiArticle } from "@/types/Homepage/home";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArticleCarouselProps {
  articles: ApiArticle[];
}

export const ArticleCarousel: React.FC<ArticleCarouselProps> = ({
  articles,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  const maxIndex =
    articles.length > slidesToShow ? articles.length - slidesToShow : 0;

  const goToSlide = (index: number) => {
    if (!slidesContainerRef.current) return;

    const safeIndex = Math.max(0, Math.min(index, maxIndex));

    const targetSlide = slidesContainerRef.current.children[
      safeIndex
    ] as HTMLElement;

    if (!targetSlide) return;

    const targetX = -targetSlide.offsetLeft;

    gsap.to(slidesContainerRef.current, {
      x: targetX,
      duration: 0.6,
      ease: "power3.inOut",
    });

    setActiveIndex(safeIndex);
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      goToSlide(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < maxIndex) {
      goToSlide(activeIndex + 1);
    }
  };

  useLayoutEffect(() => {
    const checkWidth = () => {
      let newSlidesToShow = 4;
      if (window.innerWidth < 768) {
        newSlidesToShow = 1;
      } else if (window.innerWidth < 1024) {
        newSlidesToShow = 2;
      }
      setSlidesToShow(newSlidesToShow);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useLayoutEffect(() => {
    if (activeIndex > articles.length - slidesToShow) {
        goToSlide(0);
    } else {
        goToSlide(activeIndex);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, slidesToShow]);

  if (!articles || articles.length === 0) {
    return null;
  }

  const numDots = maxIndex + 1;

  return (
    <div>
      <div className="overflow-hidden" ref={carouselViewportRef}>
        <div className="flex gap-10 relative" ref={slidesContainerRef}>
          {articles.map((article) => (
            <div
              key={article.id}
              style={{ flex: `0 0 ${100 / slidesToShow}%` }}
              className="!h-auto"
            >
              <ArticleCard
                href={article.route || "/media/news"}
                imageUrl={article.image}
                category={article.category_name}
                date={article.date}
                title={article.title}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex justify-start items-center gap-2">
          {numDots > 1 &&
            Array.from({ length: numDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`custom-dot-button ${
                  activeIndex === index ? "active" : ""
                }`}
              />
            ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-200
              ${
                activeIndex === 0
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white cursor-pointer"
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
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white cursor-pointer"
              }
            `}
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};