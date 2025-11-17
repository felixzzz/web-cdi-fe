import React from "react";
import Image from "next/image";

export interface Award {
  year: string;
  title: string;
  description: string;
  awarder: string;
  imageUrl: string;
}

interface AwardCardProps {
  award: Award;
  onImageClick: (imageUrl: string) => void;
}

export const AwardCard: React.FC<AwardCardProps> = ({
  award,
  onImageClick,
}) => {
  return (
    <article className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white">
      <div>
        <button onClick={() => onImageClick(award.imageUrl)} className="w-full">
          <Image
            src={award.imageUrl}
            alt={`Image for ${award.title}`}
            width={400}
            height={444}
            className="aspect-[9/10] object-cover rounded-xl border-2 border-blue-dark outline-2 outline-gold-1 bg-white cursor-pointer w-full"
          />
        </button>
      </div>
      <div>
        <p className="text-sm text-neutral-400 mb-1">{award.year}</p>
        <h3 className="text-2xl font-medium text-white mb-4">{award.title}</h3>
        <div
          className="mb-4 content !text-sm !leading-normal text-neutral-400"
          dangerouslySetInnerHTML={{ __html: award.description }}
        />
        <div>
          <p className="text-sm font-medium mb-1">Awarder</p>
          <p className="font-light text-neutral-400 text-sm">{award.awarder}</p>
        </div>
      </div>
    </article>
  );
};