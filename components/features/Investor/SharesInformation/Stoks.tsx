"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { TableInvestorSection } from "@/types/Investor/Shares";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ShareholdersContentProps {
  data: TableInvestorSection;
}

const ShareholdersContent: React.FC<ShareholdersContentProps> = ({ data }) => {
  const headers = data.content_table_trans?.headers || [];
  const tableData = data.content_table_trans?.tableData || [];

  return (
    <div
    data-navbar-theme="dark"
    >
      <h2 className="mb-10 text-2xl lg:text-[28px] font-medium text-neutral-13">
        {data.title || "Top 10 Shareholders"}
      </h2>
      {data.content && (
        <div
        className="prose prose-invert prose-base text-[11px] lg:text-[12px] leading-normal lg:leading-[24px] text-justify text-neutral-500 w-full"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
      <div className="table-main overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#2474A5] text-white">
            <tr>
              {headers.map((header) => (
                <th
                  scope="col"
                  key={header.text}
                  className={clsx(
                    "py-4 px-6 font-medium border",
                    header.text.toLowerCase().includes("shareholders")
                      ? "text-left"
                      : "text-left"
                  )}
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-neutral-13">
            {tableData.map((row, rowIndex) => {
              if (Array.isArray(row)) {
                return (
                  <tr key={rowIndex} className="border border-neutral-4">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={clsx(
                          "py-4 px-6 border",
                          cellIndex === 0 ? "text-left" : "text-left"
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

interface DividendContentProps {
  data: TableInvestorSection;
}

const DividendContent: React.FC<DividendContentProps> = ({ data }) => {
  return (
    <div>
      <div
      className="prose prose-invert prose-base text-[11px] lg:text-[12px] leading-normal lg:leading-[24px] text-justify text-neutral-500 max-w-full"
        dangerouslySetInnerHTML={{ __html: data.content || "" }}
      ></div>
    </div>
  );
};

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
  const t = useTranslations("StoksInformation");
  const [activeTab, setActiveTab] = useState<TabId>("shareholders");

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
      <section className="container mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <nav className="flex lg:flex-col lg:items-start w-full border-b-2 lg:border-none border-b-neutral-100">
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/investor/shares-information?tab=stocks`}
              className="text-neutral-13 text-lg p-4 lg:w-full lg:text-start font-medium lg:border-l-4 border-l-neutral-100 lg:border-l-[#2474A5] lg:border-t-2 lg:border-t-neutral-100 border-b-4 lg:border-b-2 border-b-[#2474A5] lg:border-b-neutral-100"
            >
              {t('title')}
            </Link>
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
                    "border-b-2 border-b-transparent text-neutral-13 text-lg text-center p-4 hover:border-b-[#2474A5] hover:border-b-4 hover:font-medium transition cursor-pointer",
                    activeTab === tab.id &&
                      "border-b-4 !border-b-[#2474A5] font-medium"
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