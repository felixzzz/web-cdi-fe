import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface OverviewProps {
  title: string;
  description: string | null;
  imageUrl: string;
  linkUrl: string | null;
  linkTitle: string | null;
}

export function Overview({
  title,
  description,
  imageUrl,
  linkUrl,
  linkTitle,
}: OverviewProps) {
  return (
    <section className="py-28 text-white bg-[#091A24] relative overflow-hidden">
      <Image
        src={imageUrl} 
        alt={title || "Overview"}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business z-[1]"></div>

      <section
        aria-labelledby="overview-heading"
        className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[2]"
      >
        <div className="lg:max-w-[45%] ms-auto">
          <h2
            id="overview-heading"
            className="text-2xl lg:text-[28px] font-medium mb-6 text-[#47C1EA]"
          >
            {title}
          </h2>

          <div
            className="content !text-neutral-5"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          ></div>

          {linkUrl && linkTitle && (
            <Link
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-base px-4 py-2 border border-neutral-13 rounded-full whitespace-nowrap gap-3 flex items-center w-fit mt-8 text-sm font-medium"
            >
              {linkTitle}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>
    </section>
  );
}