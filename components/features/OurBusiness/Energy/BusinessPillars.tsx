"use client";

import React, { useState } from "react";
import { TabButton } from "./TabButton";
import { TabContent } from "./TabContent";

interface TabContentItem {
  id: number;
  ulid: string;
  name: string;
  title: string | null;
  description: string | null;
  align: string;
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

export const BusinessPillars: React.FC<BusinessPillarsProps> = ({ title, tabs }) => {
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
        className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44"
        role="tablist"
      >
         <h2
          id="pillars-heading"
          className="font-medium text-white text-2xl lg:text-[38px] lg:leading-[44px] text-center pt-20"
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
            Please select a tab.
          </div>
        )}
      </div>
    </section>
  );
};