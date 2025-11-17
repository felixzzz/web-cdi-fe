import React from "react";
import { ApiDataItem } from "@/types/Sustainabilitys/Governance";

interface CisoCardProps {
  number: string;
  title: string | null;
  description: string;
}

const CisoCard: React.FC<CisoCardProps> = ({ number, title, description }) => (
  <div
    className="p-8 rounded-xl min-h-[400px] shadow-lg flex flex-col justify-between"
    style={{
      background:
        "linear-gradient(#0f2e42b8, #0f2e4200 30%, #0f2e4200 55.5%, #0f2e42b8 82.83%)",
    }}
  >
    <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-6">
      <span className="text-[48px] leading-none text-neutral-500 font-normal mr-4 mb-2 md:mb-0">
        {number}
      </span>
      <h3 className="text-white text-base md:text-2xl lg:text-4xl font-semibold">{title}</h3>
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

  return (
    <section className="py-20 bg-[#091A24] text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center md:text-left">
          {TITLE}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <CisoCard
              key={card.number || card.title}
              number={card.number || ""}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};