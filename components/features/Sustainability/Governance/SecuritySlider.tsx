import React from "react";

interface CisoCardProps {
  number: string;
  title: string;
  description: string;
}

const CisoCard: React.FC<CisoCardProps> = ({ number, title, description }) => (
  <div
    className="p-8 rounded-xl min-h-[320px] shadow-lg flex flex-col justify-between"
    style={{
      background:
        "linear-gradient(#0f2e42b8, #0f2e4200 30%, #0f2e4200 55.5%, #0f2e42b8 82.83%)",
    }}
  >
    <div className="flex flex-col md:flex-row md:items-center mb-4 md:mb-6">
      <span className="text-[48px] leading-none text-neutral-500 font-normal mr-4 mb-2 md:mb-0">
        {number}
      </span>
      <h3 className="text-white text-2xl font-semibold">{title}</h3>
    </div>
    <p className="max-w-3xl prose prose-invert prose-base">
      {description}
    </p>
  </div>
);

interface CisoSectionProps {
  title: string;
}

export const Ciso: React.FC<CisoSectionProps> = ({ title }) => {
  return (
    <section className="py-20 bg-[#091A24] text-white">
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center md:text-left">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CisoCard
            number="1"
            title="Confidentiality"
            description="Safeguarding sensitive information from unauthorized access or disclosure."
          />
          <CisoCard
            number="2"
            title="Integrity"
            description="Ensuring the accuracy and completeness of information and software."
          />
          <CisoCard
            number="3"
            title="Availability"
            description="Making certain that critical information and services are accessible to users only when required."
          />
        </div>
      </div>
    </section>
  );
};