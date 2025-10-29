"use client";

import React, { useState, useMemo } from "react";
import * as Select from "@radix-ui/react-select"; // Impor Radix Select
import { Award, AwardCard } from "./AwardCard";
import { ImageModal } from "./ImageModal";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react"; // Impor ikon

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
    // Logika filter tidak perlu diubah
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
          <h2 id="awards-title" className="text-awards text-7xl">
  {title || "Recognized for our commitment"}
</h2>
          <div
            className="content !text-neutral-4 text-[12px] leading-[24px] font-normal text-white py-1"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>

        {/* Bagian Tab (Gaya Diperbarui) */}
        <nav
          className="border-b-2 border-b-neutral-6 mb-8"
          aria-label="Content categories"
        >
          <ul className="flex items-center gap-2">
            {TABS.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "px-6 py-3 text-base lg:text-lg font-medium transition-colors duration-200",
                    activeTab === tab
                      ? "bg-gradient-to-b from-[#E3C16B] to-[#B38B2F] text-[#091A24] rounded-t-lg" // Gaya Aktif
                      : "text-neutral-4 hover:text-white" // Gaya Inaktif
                  )}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bagian Filter Tahun (Diganti dengan Select) */}
        <div className="mb-8">
          <Select.Root value={selectedYear} onValueChange={setSelectedYear}>
            <Select.Trigger
              className="flex items-center justify-between gap-2 w-[150px] rounded-lg border border-neutral-6 px-5 py-2 text-base text-white hover:border-white transition-colors duration-200"
              aria-label="Filter by year"
            >
              <Select.Value />
              <Select.Icon>
                <ChevronDown size={18} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={5}
                className="bg-[#0E2A3C] border border-neutral-6 rounded-lg p-1 z-50 w-[var(--radix-select-trigger-width)]"
              >
                <Select.Viewport>
                  {YEARS.map((year) => (
                    <Select.Item
                      key={year}
                      value={year}
                      className="px-4 py-1.5 text-white rounded data-[highlighted]:bg-neutral-700 outline-none cursor-pointer"
                    >
                      <Select.ItemText>{year}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Bagian Daftar Penghargaan (Tidak Berubah) */}
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

      {/* Bagian Modal (Tidak Berubah) */}
      {modalImageUrl && (
        <ImageModal
          imageUrl={modalImageUrl}
          onClose={() => setModalImageUrl(null)}
        />
      )}
    </section>
  );
};