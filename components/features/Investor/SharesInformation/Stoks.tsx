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
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  scope="col"
                  key={header.text}
                  className={
                    header.text.toLowerCase().includes("shareholders")
                      ? "text-left"
                      : "text-right"
                  }
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => {
              // This component only has simple rows, not groups
              if (Array.isArray(row)) {
                return (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={cellIndex === 0 ? "" : "text-right"}
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
          <nav className="flex lg:flex-col lg:items-start w-full lg:border-t-2 border-t-neutral-4 max-lg:border-b-2 border-b-neutral-4">
            <a
              href="https://chandradaya-investasi.com/investor/shares-information?tab=stocks"
              className="border-b-2 border-b-neutral-4 text-neutral-13 text-lg text-center p-4 max-lg:hover:border-b-blue-base max-lg:hover:border-b-4 hover:font-bold transition relative border-l-before-hover lg:w-full lg:text-start max-lg:border-b-4 max-lg:!border-b-blue-base lg:font-bold border-l-before"
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