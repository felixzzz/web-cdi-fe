import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DiscoverCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkHref: string;
  target: string;
}

export const DiscoverCard: React.FC<DiscoverCardProps> = ({
  title,
  description,
  imageUrl,
  linkHref,
  target,
}) => {
  return (
    <Link
      target={target}
      href={linkHref}
      className="relative block aspect-[9/16] bg-cover bg-no-repeat text-white group"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className="absolute inset-0 flex flex-col justify-between px-5 lg:px-10 pb-5 lg:pb-10 pt-[35%] z-10
                   bg-gradient-to-b from-black/60 via-transparent to-black/60
                   transition-opacity duration-300 ease-out"
      >
        <div className="absolute inset-0 flex flex-col gap-4 p-5 lg:p-8 text-white z-10">
          <h2 className="text-xl md:text-[23px] lg:text-[32px] font-medium">
            {title}
          </h2>
          <div className="content text-justify text-shadow-1 !text-neutral-300">
            <p>{description}</p>
          </div>
        </div>

        <div
          className="absolute inset-0 z-[11] bg-black/60
                   opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 ease-out"
        />
        <ArrowUpRight
          className="absolute bottom-8 right-8 p-2 rounded-full font-bold border-2 border-white "
          size={44}
          color="white"
        />
      </div>
    </Link>
  );
};
