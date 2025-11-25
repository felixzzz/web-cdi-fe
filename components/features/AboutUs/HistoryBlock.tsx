import React from "react";

interface HistoryBlockProps {
  backgroundImageUrl: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

export const HistoryBlock: React.FC<HistoryBlockProps> = ({
  backgroundImageUrl,
  eyebrow,
  title,
  children,
}) => {

  return (
    <div
      className="py-28 text-white bg-[#091A24] bg-cover relative"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div
        className="overlay-history absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(#091a24, #091a24cc 10%, #00000080, #091a24cc 90%, #091a24)",
        }}
      />

      <section className="container mx-auto px-[1rem] md:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
        <div className="max-w-[880px] mx-auto">
          <p className="text-neutral-4 mb-4">{eyebrow}</p>
          <h2 className="text-shadow-2 font-medium text-2xl md:text-[38px] md:leading-[44px] max-w-2xl mb-8">
            {title}
          </h2>
          {/* <div className="max-w-2xl prose prose-invert prose-base">{children}</div> */}
          <div className="max-w-6xl prose prose-invert prose-base">{children}</div>
        </div>
      </section>
    </div>
  );
};