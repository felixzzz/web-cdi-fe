"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { TableInvestorSection } from "@/types/Investor/Shares";

interface ShareholdersContentProps {
  data: TableInvestorSection;
}

const ShareholdersContent: React.FC<ShareholdersContentProps> = ({ data }) => {
  const headers = data.content_table_trans?.headers || [];
  const tableData = data.content_table_trans?.tableData || [];

  return (
    <div>
      <h2 className="mb-10 text-2xl lg:text-[28px] font-medium text-neutral-13">
        {data.title || "Top 10 Shareholders"}
      </h2>
      {/* Render description if it exists */}
      {data.content && (
        <div
          className="content primary mb-10 !text-neutral-8"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
      <div className="table-main overflow-x-auto">
        <table className="w-full">
          {/* --- PERUBAHAN DI SINI: Menambahkan styling thead --- */}
          <thead className="bg-[#2474A5] text-white">
            <tr>
              {headers.map((header) => (
                <th
                  scope="col"
                  key={header.text}
                  // --- PERUBAHAN DI SINI: Menambahkan padding, font, dan clsx ---
                  className={clsx(
                    "py-4 px-6 font-medium",
                    header.text.toLowerCase().includes("shareholders")
                      ? "text-left"
                      : "text-right"
                  )}
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>
          {/* --- PERUBAHAN DI SINI: Menambahkan warna teks tbody --- */}
          <tbody className="text-neutral-13">
            {tableData.map((row, rowIndex) => {
              // This component only has simple rows, not groups
              if (Array.isArray(row)) {
                return (
                  // --- PERUBAHAN DI SINI: Menambahkan border antar baris ---
                  <tr key={rowIndex} className="border-b border-neutral-4">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        // --- PERUBAHAN DI SINI: Menambahkan padding dan clsx ---
                        className={clsx(
                          "py-4 px-6",
                          cellIndex === 0 ? "text-left" : "text-right"
                        )}
                      >
                        {cell.text}
                      </td>
                    ))}
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Sub-component for Dividend Tab ---
interface DividendContentProps {
  data: TableInvestorSection;
}

const DividendContent: React.FC<DividendContentProps> = ({ data }) => {
  return (
    <div>
      <h2 className="mb-10 text-2xl lg:text-[28px] font-medium text-neutral-13">
        {data.title || "Dividend Information"}
      </h2>
      <div
        className="content primary mb-10 !text-neutral-8"
        dangerouslySetInnerHTML={{ __html: data.content || "" }}
      ></div>
    </div>
  );
};

// --- Main StocksInformation Component ---
interface StocksInformationProps {
  tabOneTitle: string | null;
  tabTwoTitle: string | null;
  shareholdersData: TableInvestorSection;
  dividendData: TableInvestorSection;
  showShareholders: boolean;
  showDividend: boolean;
}

type TabId = "shareholders" | "dividend";
interface TabDataItem {
  id: TabId;
  title: string;
  content: React.ReactElement;
}

export function StocksInformation({
  tabOneTitle,
  tabTwoTitle,
  shareholdersData,
  dividendData,
  showShareholders,
  showDividend,
}: StocksInformationProps) {
  const [activeTab, setActiveTab] = useState<TabId>("shareholders");

  // Build tabs dynamically based on show flags
  const tabsData: TabDataItem[] = [];
  if (showShareholders) {
    tabsData.push({
      id: "shareholders",
      title: tabOneTitle || "Top 10 Shareholders",
      content: <ShareholdersContent data={shareholdersData} />,
    });
  }
  if (showDividend) {
    tabsData.push({
      id: "dividend",
      title: tabTwoTitle || "Dividend Information",
      content: <DividendContent data={dividendData} />,
    });
  }
  React.useEffect(() => {
    if (showShareholders) {
      setActiveTab("shareholders");
    } else if (showDividend) {
      setActiveTab("dividend");
    }
  }, [showShareholders, showDividend]);
  return (
    <div className="py-20">
      <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* --- PERUBAHAN DI SINI: Menyederhanakan Nav Sidebar --- */}
          <nav className="flex lg:flex-col lg:items-start w-full border-b-2 border-b-neutral-4">
            <a
              href="https://chandradaya-investasi.com/investor/shares-information?tab=stocks"
              // --- PERUBAHAN DI SINI: Mengganti class 'a' agar sesuai gambar ---
              className="text-neutral-13 text-lg p-4 lg:w-full lg:text-start font-medium border-l-4 border-blue-base"
            >
              Stocks
            </a>
          </nav>

          <div className="lg:col-span-4">
            <nav
              role="tablist"
              aria-label="Stock Information Tabs"
              className="flex gap-6 w-full border-b-2 border-b-neutral-6"
            >
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "border-b-2 border-b-transparent text-neutral-13 text-lg text-center p-4 hover:border-b-blue-base hover:border-b-4 hover:font-medium transition cursor-pointer",
                    activeTab === tab.id &&
                      "border-b-4 !border-b-blue-base font-medium"
                  )}
                >
                  {tab.title}
                </button>
              ))}
            </nav>

            <div className="mt-10">
              {tabsData.map((tab) => (
                <section
                  key={tab.id}
                  id={`panel-${tab.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${tab.id}`}
                  hidden={activeTab !== tab.id}
                >
                  {tab.content}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}