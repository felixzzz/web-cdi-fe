import React from "react";
import { SolutionCard } from "./SolutionCard";
import { HomePageSection } from "@/types/Homepage/home";

const stripHtml = (html: string | null) =>
  html ? html.replace(/<[^>]+>/g, "") : "";

interface BusinessSolutionsProps {
  home_infrastructure_title: HomePageSection;
  home_infrastructure_energy: HomePageSection;
  home_infrastructure_water: HomePageSection;
  home_infrastructure_port_storage: HomePageSection;
  home_infrastructure_logistic: HomePageSection;
}

export const Solution: React.FC<BusinessSolutionsProps> = ({
  home_infrastructure_title,
  home_infrastructure_energy,
  home_infrastructure_water,
  home_infrastructure_port_storage,
  home_infrastructure_logistic,
}) => {
  const solutionsData = [
    {
      title: home_infrastructure_energy.title,
      description: stripHtml(home_infrastructure_energy.content),
      imageUrl: home_infrastructure_energy.file_url,
      linkHref: "/our-business/energy",
    },
    {
      title: home_infrastructure_water.title,
      description: stripHtml(home_infrastructure_water.content),
      imageUrl: home_infrastructure_water.file_url,
      linkHref: "/our-business/water",
    },
    {
      title: home_infrastructure_port_storage.title,
      description: stripHtml(home_infrastructure_port_storage.content),
      imageUrl: home_infrastructure_port_storage.file_url,
      linkHref: "/our-business/ports-and-storage",
    },
    {
      title: home_infrastructure_logistic.title,
      description: stripHtml(home_infrastructure_logistic.content),
      imageUrl: home_infrastructure_logistic.file_url,
      linkHref: "/our-business/logistics",
    },
  ];

  return (
    <section
      className="relative pt-11 lg:pt-20 bg-[#091A24] text-white"
      aria-labelledby="solutions-title"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <h1
          id="solutions-title"
          className="mb-11 lg:mb-20 text-2xl lg:text-[38px] lg:leading-[44px] font-medium max-w-2xl mx-auto text-center"
        >
          {home_infrastructure_title.title}
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4">
        {solutionsData.map((solution) => (
          <SolutionCard
            key={solution.title}
            title={solution.title}
            description={solution.description || ""} 
            imageUrl={solution.imageUrl}
            linkHref={solution.linkHref}
          />
        ))}
      </div>
    </section>
  );
};