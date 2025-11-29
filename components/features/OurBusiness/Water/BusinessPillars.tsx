"use client";

import React, { useState } from "react";
import { TabContent } from "./TabContent";
import { TabButton } from "./TabButton";
import { useTranslations } from "next-intl";

interface TabContentItem {
  id: number;
  ulid: string;
  name: string;
  heading: string | null;
  tagline: string | null;
  title: string | null;
  description: string | null;
  align: string;
  // align: "left" | "right";
  image: string;
}

export interface TabData {
  id: number;
  ulid: string;
  title: string;
  sub_title: string | null;
  description: string | null;
  contents: TabContentItem[];
}

interface BusinessPillarsProps {
  title: string;
  tabs: TabData[];
}

export const BusinessPillars: React.FC<BusinessPillarsProps> = ({
  title,
  tabs,
}) => {
  const t = useTranslations('OurBusiness.Water')
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || null);

  const handleTabClick = (tabId: number) => {
    setActiveTabId(tabId);
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#091A24]">
      <div
        className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-44 2xl:px-44"
        role="tablist"
      >
        <h2
          id="pillars-heading"
          className="font-medium text-white text-2xl md:text-[38px] md:leading-[44px] text-center pt-20"
        >
          {title || "Business Pillars"}
        </h2>
        <div className="flex flex-col sm:flex-row border-b border-gray-700 pt-20">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.title}
              isActive={tab.id === activeTabId}
              onClick={() => handleTabClick(tab.id)}
            />
          ))}
        </div>
      </div>

      <div role="tabpanel">
        {activeTab ? (
          <TabContent tab={activeTab} />
        ) : (
          <div className="text-white p-20 text-center">
            {t('help')}
          </div>
        )}
      </div>
    </section>
  );
};