import React from "react";
import Image from "next/image";

interface MilestoneCardProps {
  year: string;
  milestones: string[];
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  year,
  milestones,
}) => {
  return (
    <div className="flex flex-col gap-6 backdrop-blur-sm h-full">
      <h3 className="text-2xl lg:text-[28px] font-medium text-blue-lighter">
        {year}
      </h3>

      <Image
        src="https://chandradaya-investasi.com/assets/frontend/icons/ic_timeline.svg"
        alt=""
        aria-hidden="true"
        width={40}
        height={40}
      />

      <div className="bg-gradient-1 rounded-lg px-3 py-4">
        <div className="content !text-neutral-5">
          <ol className="list-decimal list-inside flex flex-col gap-2">
            {milestones.map((item, index) => (
              <li key={index} className="ql-align-justify">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
