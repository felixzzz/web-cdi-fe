import React from 'react';
import Image from 'next/image';

interface VisionMissionCardProps {
  label: string;
  statement: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}

export const VisionMissionCard: React.FC<VisionMissionCardProps> = ({
  label,
  statement,
  imageUrl,
  imageWidth,
  imageHeight,
}) => {
  return (
    <div className="rounded-3xl bg-journey-fade px-8 py-10 text-center flex flex-col justify-between">
      
      <div>
        <Image
          src={imageUrl}
          title={label}
          alt={`${label} visual representation`}
          width={imageWidth}
          height={imageHeight}
          className="w-[200px] h-auto mx-auto"
        />
        <div className="content !text-white !text-[22px] !font-medium pt-10 px-7">
          <p className="ql-align-center">{statement}</p>
        </div>
      </div>

      <div>
        <div className="my-8 bg-neutral-5 h-[1px] w-full" />
        <h3 className="text-neutral-2 font-light">{label}</h3>
      </div>
    </div>
  );
};