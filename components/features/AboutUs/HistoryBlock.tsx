// HistoryBlock.tsx

import React from "react";

interface HistoryBlockProps {
  backgroundImageUrl: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  // HAPUS 'gradientType' dari sini
}

export const HistoryBlock: React.FC<HistoryBlockProps> = ({
  backgroundImageUrl,
  eyebrow,
  title,
  children,
  // HAPUS 'gradientType' dari sini
}) => {
  // HAPUS logika 'gradientClass'

  return (
    <div
      className="py-28 text-white bg-[#091A24] bg-cover relative"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div
        className="overlay-history absolute inset-0 z-0"
        aria-hidden="true"
      />

      <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
        <div className="max-w-[880px] mx-auto">
          <p className="text-neutral-4 mb-4">{eyebrow}</p>
          <h2 className="text-shadow-2 font-medium text-2xl lg:text-[38px] lg:leading-[44px] max-w-2xl mb-8">
            {title}
          </h2>
          <div className="content !text-neutral-5">{children}</div>
        </div>
      </section>
    </div>
  );
};