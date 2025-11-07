"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap"; // 1. Impor GSAP
import { ArticleCard } from "./ArticleCard";
import { ApiArticle } from "@/types/Homepage/home";

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

  const goToSlide = (index: number) => {
    if (!slidesContainerRef.current) return;

    const targetSlide = slidesContainerRef.current.children[index] as HTMLElement;
    if (!targetSlide) return;

    const targetX = -targetSlide.offsetLeft;

    gsap.to(slidesContainerRef.current, {
      x: targetX,
      duration: 0.6,
      ease: "power3.inOut",
    });

    setActiveIndex(index);
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
    goToSlide(0);
  }, [articles, slidesToShow]);

  const numDots =
    articles.length > slidesToShow ? articles.length - slidesToShow + 1 : 1;

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="overflow-hidden" ref={carouselViewportRef}>
        <div className="flex relative" ref={slidesContainerRef}>
          {articles.map((article) => (
            <div
              key={article.id}
              style={{ flex: `0 0 ${100 / slidesToShow}%` }}
              className="p-3 !h-auto"
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

      {numDots > 1 && (
        <div className="flex justify-start items-center gap-2 mt-6">
          {Array.from({ length: numDots }).map((_, index) => (
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
      )}
    </div>
  );
};