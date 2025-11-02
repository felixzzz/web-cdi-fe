import Image from "next/image";
import React from "react";

const factoidData = [
  {
    id: 1,
    iconSrc:
      "https://nusantaracrocodic.reprime.id/cdi-compro/public/assets/frontend/icons/ic_solar_panel_05.svg",
    iconAlt: "Solar panel icon",
    descriptionHtml:
      "<p>Currently, CDI Group’s installed capacity of renewable energy sources reaches 2.199, 82 kWp, with plans to scale up CDI Group’s Solar Power Plant (PLTS) to 3 MWp. These initiatives contribute to an estimated 40% reduction in electricity costs while lowering carbon emissions by 730,73 tons of CO₂ annually.</p>",
  },
  {
    id: 2,
    iconSrc:
      "https://nusantaracrocodic.reprime.id/cdi-compro/public/assets/frontend/icons/ic_tree.svg",
    iconAlt: "Tree planting icon",
    descriptionHtml:
      "<p>More trees By 2024, PT Krakatau Chandra Energi employees will have planted 214 trees in the KCE area. This is part of a program to reduce carbon emissions.</p>",
  },
  {
    id: 3,
    iconSrc:
      "https://nusantaracrocodic.reprime.id/cdi-compro/public/assets/frontend/icons/ic_chimney.svg",
    iconAlt: "Emission monitoring icon",
    descriptionHtml:
      "<p>CDI Group also has implemented the Continuous Emission Monitoring System (CEMS) to track air emissions in real time, ensuring compliance with government regulations. On top of that, CDI Group’s Dry Low NOx Burner (DLN) technology helps reduce NOx emissions, supporting a cleaner and healthier atmosphere.</p>",
  },
  {
    id: 4,
    iconSrc:
      "https://nusantaracrocodic.reprime.id/cdi-compro/public/assets/frontend/icons/ic_award_3.svg",
    iconAlt: "Award ribbon icon",
    descriptionHtml:
      '<p>Recognizing CDI Group’s leadership in energy transition, CDI Group was awarded the "Private Sector Energy Provider in Energy Transition" by the National Energy Council in 2023.</p>',
  },
];

export function SustainabilityFacts() {
  return (
    <section className="py-28 text-white bg-[#091A24] bg-cover relative bg-center">
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {factoidData.map((item) => (
            <div key={item.id} className="flex gap-4 items-start flex-col">
              <div className="flex shrink-0 w-[48px]">
                <Image
                  src={item.iconSrc}
                  alt={item.iconAlt}
                  width={48}
                  height={48}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div
                className="prose prose-invert prose-base text-neutral-300"
                  dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
