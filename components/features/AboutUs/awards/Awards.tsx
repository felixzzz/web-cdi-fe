"use client";

import React, { useState, useMemo } from "react";
import * as Select from "@radix-ui/react-select";
import { Award, AwardCard } from "./AwardCard";
import { DetailModal } from "./DetailModal";
import { ImageModal } from "./ImageModal";
import { clsx } from "clsx";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  AwardsApiResponse,
  AwardItem,
  CertificationApiResponse,
  CertificationItem,
  MembershipApiResponse,
  MembershipItem,
} from "@/types/AboutUs/Awards";
import { Pagination } from "./Pagination";
import { useTranslations } from "next-intl";

const mapAwardToCard = (item: AwardItem): Award => ({
  year: item.year,
  date: item.year,
  title: item.name,
  description: item.content,
  awarder: item.awarder,
  imageUrl: item.image,
  category: "Award",
});

const mapCertificationToCard = (item: CertificationItem): Award => ({
  year: item.date ? new Date(item.date).getFullYear().toString() : "N/A",
  date: item.date,
  title: item.name,
  description: item.content,
  awarder: item.awarder,
  imageUrl: item.thumbnail,
  category: "Certification",
});

const mapMembershipToCard = (item: MembershipItem): Award => ({
  year: item.date ? new Date(item.date).getFullYear().toString() : "N/A",
  date: item.date,
  title: item.name,
  description: item.content,
  awarder: item.awarder,
  imageUrl: item.image,
  category: "Membership",
});

type TabName = "Awards" | "Certification" | "Membership";
const TABS: TabName[] = ["Awards", "Certification", "Membership"];
const BASE_API_URL = "https://cdi-be.cmlabs.dev/api";

interface AwardsProps {
  title: string | null;
  description: string | null;
  initialAwardsResponse: AwardsApiResponse;
  initialCertificationResponse: CertificationApiResponse;
  initialMembershipResponse: MembershipApiResponse;
}

export const Awards: React.FC<AwardsProps> = ({
  title,
  description,
  initialAwardsResponse,
  initialCertificationResponse,
  initialMembershipResponse,
}) => {
  const t = useTranslations("Awards");
  const [activeTab, setActiveTab] = useState<TabName>("Awards");
  const [selectedYear, setSelectedYear] = useState("All Year");

  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [awardsData, setAwardsData] = useState(initialAwardsResponse.items);
  const [certificationData, setCertificationData] = useState(
    initialCertificationResponse.items
  );
  const [membershipData, setMembershipData] = useState(
    initialMembershipResponse.items
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState(
    initialAwardsResponse.meta
  );

  const YEARS = useMemo(() => {
    const allItems = [
      ...initialAwardsResponse.items.map(mapAwardToCard),
      ...initialCertificationResponse.items.map(mapCertificationToCard),
      ...initialMembershipResponse.items.map(mapMembershipToCard),
    ];
    const yearsSet = new Set(allItems.map((item) => item.year));
    return [
      "All Year",
      ...Array.from(yearsSet).sort((a, b) => b.localeCompare(a)),
    ];
  }, [
    initialAwardsResponse,
    initialCertificationResponse,
    initialMembershipResponse,
  ]);

  const filteredData = useMemo(() => {
    let transformedData: Award[] = [];
    switch (activeTab) {
      case "Awards":
        transformedData = awardsData.map(mapAwardToCard);
        break;
      case "Certification":
        transformedData = certificationData.map(mapCertificationToCard);
        break;
      case "Membership":
        transformedData = membershipData.map(mapMembershipToCard);
        break;
    }
    return transformedData.filter((item) => {
      return selectedYear === "All Year" || item.year === selectedYear;
    });
  }, [selectedYear, activeTab, awardsData, certificationData, membershipData]);

  const handlePageChange = async (page: number) => {
    if (page === currentPage) return;
    setIsLoading(true);
    setCurrentPage(page);

    let url = "";
    switch (activeTab) {
      case "Awards":
        url = `${BASE_API_URL}/awards/list?tab=awards&page=${page}`;
        break;
      case "Certification":
        url = `${BASE_API_URL}/certificates/list?tab=certification&page=${page}`;
        break;
      case "Membership":
        url = `${BASE_API_URL}/memberships/list?tab=membership&page=${page}`;
        break;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch new page");
      const data = await res.json();

      if (activeTab === "Awards") setAwardsData(data.items);
      else if (activeTab === "Certification") setCertificationData(data.items);
      else if (activeTab === "Membership") setMembershipData(data.items);
      setPaginationMeta(data.meta);
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabClick = (tab: TabName) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedYear("All Year");
    switch (tab) {
      case "Awards":
        setPaginationMeta(initialAwardsResponse.meta);
        setAwardsData(initialAwardsResponse.items);
        break;
      case "Certification":
        setPaginationMeta(initialCertificationResponse.meta);
        setCertificationData(initialCertificationResponse.items);
        break;
      case "Membership":
        setPaginationMeta(initialMembershipResponse.meta);
        setMembershipData(initialMembershipResponse.items);
        break;
    }
  };

  return (
    <section className="py-20 bg-[#091A24]" aria-labelledby="awards-title">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <h2
            id="awards-title"
            className="text-awards text-4xl md:text-6xl lg:text-7xl font-medium text-white"
          >
            {title || "Recognized for our commitment"}
          </h2>
          <div
            className="prose prose-invert prose-base text-neutral-100 max-w-none"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>

        <nav className="border-b-2 border-b-neutral-700 mb-8">
          <ul className="flex items-center gap-2 overflow-x-auto">
            {TABS.map((tab) => (
              <li key={tab} className="flex-shrink-0">
                <button
                  onClick={() => handleTabClick(tab)}
                  className={clsx(
                    "px-6 py-3 text-base lg:text-lg font-medium transition-all duration-300",
                    activeTab === tab
                      ? "bg-gradient-to-b from-[#E3C16B] to-[#B38B2F] text-[#091A24] rounded-t-lg"
                      : "text-neutral-200 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mb-8">
          <Select.Root value={selectedYear} onValueChange={setSelectedYear}>
            <Select.Trigger className="flex items-center justify-between gap-2 w-[150px] rounded-full border border-neutral-600 px-5 py-2 text-base text-white hover:border-white transition-colors duration-200 bg-transparent">
              <Select.Value />
              <Select.Icon>
                <ChevronDown size={18} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content
                position="popper"
                sideOffset={5}
                className="bg-[#0E2A3C] border border-neutral-600 rounded-lg p-1 z-50 min-w-[150px]"
              >
                <Select.Viewport>
                  {YEARS.map((year) => (
                    <Select.Item
                      key={year}
                      value={year}
                      className="px-4 py-1.5 text-white rounded hover:bg-neutral-700 outline-none cursor-pointer"
                    >
                      <Select.ItemText>{year}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full min-h-[400px]">
              <Loader2 className="animate-spin text-white" size={48} />
            </div>
          ) : filteredData.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 text-white">
                {filteredData.map((award, index) => (
                  <li key={`${award.title}-${award.year}-${index}`}>
                    <AwardCard
                      award={award}
                      showReadMore={activeTab === "Certification"}
                      showAwards={activeTab === "Awards"}
                      onReadMore={(selected) => setSelectedAward(selected)}
                      onImageClick={(url) => setModalImageUrl(url)}
                    />
                  </li>
                ))}
              </ul>
              {paginationMeta.last_page > 0 && (
                <div className="mt-16">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={paginationMeta.last_page}
                    totalItems={paginationMeta.total}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <p className="text-white text-center text-lg min-h-[400px] flex items-center justify-center">
              {t("not_found")}
            </p>
          )}
        </div>
      </div>

      {selectedAward && (
        <DetailModal
          award={selectedAward}
          onClose={() => setSelectedAward(null)}
          onImageClick={(url) => setModalImageUrl(url)}
        />
      )}

      {modalImageUrl && (
        <ImageModal
          imageUrl={modalImageUrl}
          onClose={() => setModalImageUrl(null)}
        />
      )}
    </section>
  );
};
