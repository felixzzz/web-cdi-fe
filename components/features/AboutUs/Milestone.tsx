"use client";

import React from "react";

interface MilestoneData {
  year: string;
  achievements: string[];
}

interface MilestoneSectionProps {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  data: MilestoneData[];
}

export const Milestone: React.FC<MilestoneSectionProps> = ({
  title,
  subtitle,
  backgroundImageUrl,
  data,
}) => {
  return (
    <section id="milestone">
      <div
        className="py-28 bg-blue-dark text-white bg-cover relative"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 overlay-business" aria-hidden="true" />

        <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
          {/* Header Section */}
          <div className="mb-16">
            <div>
              <h2 className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-2">
                {title}
              </h2>
              <div className="content !text-neutral-5">
                <p>{subtitle}</p>
              </div>
            </div>
          </div>

          {/* Timeline Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            {data.map((milestone) => (
              <div key={milestone.year}>
                {/* Bagian Tahun (Year) */}
                <h3 className="text-3xl font-bold text-white mb-5">
                  {milestone.year}
                </h3>

                {/* Bagian Garis Timeline (Dot + Line + Arrow) */}
                <div className="flex items-center w-full mb-6">
                  <div className="w-5 h-5 rounded-full bg-sky-400 flex-shrink-0"></div>
                  <div className="h-[2px] w-full bg-sky-400 relative ml-1">
                    {/* Arrowhead */}
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0
                        border-t-[6px] border-t-transparent
                        border-b-[6px] border-b-transparent
                        border-l-[8px] border-l-sky-400"
                    ></div>
                  </div>
                </div>

                {/* Bagian Kartu (Card) Pencapaian */}
                <div
                  className="backdrop-blur-sm rounded-lg p-6 min-h-[200px] border border-white/20"
                  style={{ background: "linear-gradient(#d6f5ff29, #091a2429)" }}
                >
                  <ul className="list-disc list-inside space-y-4 text-neutral-200">
                    {milestone.achievements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};