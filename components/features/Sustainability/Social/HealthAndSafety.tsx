import Image from "next/image";
import React from "react";
import { ApiDataItem } from "@/types/Sustainabilitys/Social"; 

interface HealthAndSafetyProps {
  data: ApiDataItem;
}

export function HealthAndSafety({ data }: HealthAndSafetyProps) {
  const BACKGROUND_IMAGE_URL = data.image;
  const TITLE = data.title || "Health and Safety Culture";
  const CONTENT_HTML = data.content || "";
  const stats = data.content_json || [];

  return (
    <section
      aria-labelledby="health-safety-heading"
      className="py-28 text-white bg-blue-dark relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt={TITLE}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business z-10"></div>

      <div className="container mx-auto   relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-center">
          <div>
            <h2
              id="health-safety-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>
            <div
              className="max-w-2xl prose prose-invert prose-base text-sm lg:text-base text-white leading-snug lg:leading-loose text-justify"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            ></div>
          </div>

          <div>
            <ul className="items-center lg:max-w-[60%] ms-auto grid grid-cols-2 gap-8 lg:gap-x-16">
              {stats.map((stat) => (
                <li
                  key={stat.description}
                  className={stat.title === "100%" ? "row-span-2" : ""}
                >
                  <p className="text-[#47C1EA] font-bold text-3xl mb-4 lg:text-[48px]">
                    {stat.title}
                  </p>
                  <p>{stat.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}