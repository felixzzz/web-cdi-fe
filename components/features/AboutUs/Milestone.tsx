"use client";

import Image from "next/image";
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            {data.map((milestone) => (
              <div key={milestone.year}>
                <h3 className="text-3xl font-bold text-white mb-5">
                  {milestone.year}
                </h3>
                <Image
                  src="https://chandradaya-investasi.com/assets/frontend/icons/ic_timeline.svg"
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="mb-6 w-full"
                />
                <div
                  className="backdrop-blur-sm rounded-lg p-6 min-h-[200px] border border-white/20"
                  style={{
                    background: "linear-gradient(#d6f5ff29, #091a2429)",
                  }}
                >
                  <ul className="list-disc list-inside space-y-4 text-neutral-200">
                    {milestone.achievements.map((item, index) => (
                      <li className="text-[12px] leading-[24px]" key={index}>
                        {item}
                      </li>
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
