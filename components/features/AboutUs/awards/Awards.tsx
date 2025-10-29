"use client";

import React, { useState, useMemo } from "react";
import { Award, AwardCard } from "./AwardCard";
import { ImageModal } from "./ImageModal";
import { clsx } from "clsx";
interface AwardsProps {
  title: string | null;
  description: string | null;
}

const allAwardsData: Award[] = [
  {
    year: "2023",
    title: "Zero Accident Award",
    description:
      "Krakatau Chandra Energi (KCE) received the Zero Accident Award...",
    awarder: "Minister of Manpower of the Republic of Indonesia",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/NG9uODVmT3Y1d2tWbjlCaW5WeDZnT2JGN1lEK2xEblVvQWhzNEJvUDRzRT0.webp",
  },
  {
    year: "2023",
    title: "Implementative Energy Provider Private Company...",
    description:
      "Krakatau Chandra Energi (KCE) was honored as an Implementative Energy...",
    awarder: "National Energy Council",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/cU9KbEJwQmo3b3E4dUV6VzJORVpmZXBLdGVZZXZyL0xGOFhHdExIUUFFST0.webp",
  },
  {
    year: "2023",
    title: "Occupational Safety and Health Management System",
    description: "Krakatau Chandra Energi (KCE) has obtained a certificate...",
    awarder: "Minister of Manpower of the Republic of Indonesia",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/NG9uODVmT3Y1d2tWbjlCaW5WeDZnUHV6T2dTQUtyN0U3NmI2TUxuNlRjUT0.webp",
  },
];

const TABS = ["Awards", "Certification", "Membership"];
const YEARS = ["All Year", "2023"];

// --- Component now accepts props ---
export const Awards: React.FC<AwardsProps> = ({ title, description }) => {
  const [activeTab, setActiveTab] = useState("Awards");
  const [selectedYear, setSelectedYear] = useState("All Year");
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  const filteredAwards = useMemo(() => {
    return allAwardsData.filter((award) => {
      const yearMatch =
        selectedYear === "All Year" || award.year === selectedYear;
      return yearMatch;
    });
  }, [selectedYear, activeTab]);

  return (
    <section className="py-20 bg-[#091A24]" aria-labelledby="awards-title">
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <h2 id="awards-title" className="text-awards text-white">
            {title || "Recognized for our commitment"}
          </h2>
          <div
            className="content !text-neutral-4 text-[12px] leading-[24px] font-normal text-white py-1"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>

        <nav
          className="flex items-center gap-6 border-b-2 border-b-neutral-6 mb-8"
          aria-label="Content categories"
        >
          <ul>
            {TABS.map((tab) => (
              <li key={tab} className="inline-block">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`text-white px-6 py-4 text-base lg:text-lg text-neutral-4 cursor-pointer tab-gradient-awards ${
                    activeTab === tab ? "active" : ""
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="flex items-center gap-4 mb-8"
          aria-label="Filter by year"
        >
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={clsx(
                "text-base rounded-lg px-5 py-2 transition-colors duration-200",
                selectedYear === year
                  ? "bg-white text-[#091A24] font-semibold"
                  : "text-neutral-4 hover:text-white"
              )}
            >
              {year}
            </button>
          ))}
        </div>

        <div>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-7 gap-y-16 text-white">
            {filteredAwards.map((award) => (
              <li key={award.title}>
                <AwardCard award={award} onImageClick={setModalImageUrl} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {modalImageUrl && (
        <ImageModal
          imageUrl={modalImageUrl}
          onClose={() => setModalImageUrl(null)}
        />
      )}
    </section>
  );
};