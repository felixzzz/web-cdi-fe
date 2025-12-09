import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SolutionCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkHref: string;
  linkText: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  imageUrl,
  linkHref,
  linkText,
}) => {
  return (
    <div
      className="relative aspect-[9/16] bg-cover bg-no-repeat text-white group"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div
        className="absolute inset-0 flex flex-col justify-between px-5 lg:px-10 pb-5 lg:pb-10 pt-[35%] z-10
                   bg-gradient-to-b from-black/60 via-transparent to-black/60
                   transition-opacity duration-300 ease-out"
      >
        <div className="absolute inset-0 flex flex-col justify-between px-5 lg:px-10 pb-5 lg:pb-10 pt-[35%] text-white z-10">
          <h2 className="text-2xl lg:text-[40px] lg:leading-[40px] xl:text-[52px] xl:leading-[60px] font-medium text-shadow-1">
            {title}
          </h2>
          <div className="content !font-normal text-justify text-shadow-1 !text-neutral-200 mb-1 text-sm lg:text-base">
            <p>{description}</p>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 flex flex-col justify-center items-center p-4 z-[11] bg-black/60
                   opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300 ease-out"
      >
        <Link
          href={linkHref}
          className="bg-white/20 text-white px-6 py-2 border border-white rounded-full whitespace-nowrap gap-3 flex items-center w-fit mt-10"
        >
          {linkText}
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
};
