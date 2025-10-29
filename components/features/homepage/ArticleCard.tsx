"use client"; 

import Link from 'next/link';
import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export interface ArticleCardProps {
  href: string;
  imageUrl: string;
  category: string;
  date: string;
  title: string;
}

const ReadArticleIcon = () => (
  <i className="isax icon-arrow-right-3 text-2xl"></i>
);

export const ArticleCard: React.FC<ArticleCardProps> = ({
  href,
  imageUrl,
  category,
  date,
  title,
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(imageRef.current, { scale: 1 });

    tl.current = gsap.timeline({ paused: true })
      .to(imageRef.current, { 
        scale: 1.1, 
        duration: 0.4, 
        ease: 'power2.inOut' 
      })
      .to(backdropRef.current, { 
        opacity: 1, 
        duration: 0.4, 
        ease: 'power2.inOut' 
      }, '<'); 

  }, { scope: cardRef });

  const onEnter = () => {
    tl.current?.play();
  };

  const onLeave = () => {
    tl.current?.reverse();
  };

  return (
    <Link
      href={href}
      ref={cardRef} 
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flex flex-col bg-white rounded-xl shadow-article border border-neutral-5 overflow-hidden h-full text-neutral-13 cursor-pointer w-full"
    >
      <div className="w-full aspect-square overflow-hidden">
        <div
          ref={imageRef} 
          className="w-full aspect-square bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
      
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 z-10" 
      />

      <div className="p-6 flex flex-col grow relative z-20">
        <div className="flex items-center gap-4">
          <span className="bg-neutral-5 px-3 py-1 text-sm rounded-full">
            {category}
          </span>
          <span className="text-sm text-neutral-10">{date}</span>
        </div>
        
        <h3 className="text-[22px] font-medium mt-4 mb-7 line-clamp-3">
          {title}
        </h3>
        
        <div className="text-blue-base flex items-center gap-2 cursor-pointer mt-auto">
          Read full article <ReadArticleIcon />
        </div>
      </div>
    </Link>
  );
};