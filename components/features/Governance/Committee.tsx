"use client";

import React, { useState } from "react";
import {
  CommitteeTabPanel,
  CommitteeTabData,
} from "./CommitteeTabPanel";
import { TabButton } from "./TabButton";

interface CommitteeProps {
  tabs: CommitteeTabData[];
}

export function Committee({ tabs }: CommitteeProps) {
  const [activeTabId, setActiveTabId] = useState(
    tabs.length > 0 ? tabs[0].id : ""
  );

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="py-20 bg-[#051119] text-white" id="committee">
      <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="flex items-center gap-6 border-b-2 border-b-neutral-700">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              isActive={activeTabId === tab.id}
              onClick={() => setActiveTabId(tab.id)}
            />
          ))}
        </div>
        {activeTab && <CommitteeTabPanel tab={activeTab} />}
      </section>
    </div>
  );
}