import React from "react";
import { HomePageSection } from "@/types/Homepage/home";
import { DiscoverCard } from "./DiscoverCard";
import { stripHtml } from "@/lib/localization";

interface DiscoverSectionProps {
  home_discover_title: HomePageSection;
  home_discover_sustainability: HomePageSection;
  home_discover_our_business: HomePageSection;
  home_discover_investor: HomePageSection;
  home_discover_career: HomePageSection;
}

export const Discover: React.FC<DiscoverSectionProps> = ({
  home_discover_title,
  home_discover_sustainability,
  home_discover_our_business,
  home_discover_investor,
  home_discover_career,
}) => {
  const discoverData = [
    {
      title: home_discover_sustainability.title,
      description: stripHtml(home_discover_sustainability.content),
      imageUrl: home_discover_sustainability.file_url,
      linkHref: "/sustainability",
    },
    {
      title: home_discover_our_business.title,
      description: stripHtml(home_discover_our_business.content),
      imageUrl: home_discover_our_business.file_url,
      linkHref: "/our-business",
    },
    {
      title: home_discover_investor.title,
      description: stripHtml(home_discover_investor.content),
      imageUrl: home_discover_investor.file_url,
      linkHref: "/investors",
    },
    {
      title: home_discover_career.title,
      description: stripHtml(home_discover_career.content),
      imageUrl: home_discover_career.file_url,
      linkHref: "/careers",
    },
  ];

  return (
    <section
      className="pt-12 pb-12 lg:pt-20 lg:pb-28 bg-[#091A24] text-white"
      aria-labelledby="discover-title"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <h2
          id="discover-title"
          className="mb-10 text-2xl lg:text-[38px] lg:leading-[44px] font-medium max-w-2xl mx-auto text-center"
        >
          {home_discover_title.title}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4">
        {discoverData.map((item) => (
          <DiscoverCard
            key={item.title}
            title={item.title}
            description={item.description || ""}
            imageUrl={item.imageUrl}
            linkHref={item.linkHref}
          />
        ))}
      </div>
    </section>
  );
};