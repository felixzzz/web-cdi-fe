"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SustainabilitySocialSection } from "@/types/Sustainabilitys/Social";
import { TabButton } from "./TabButton";

interface EmpoweringCommunitiesProps {
  data: SustainabilitySocialSection & { tabs: ApiTab[] };
}

interface ContentItem {
  id: number;
  title: string;
  content: string;
  image: string;
  align: string;
}

interface ApiTab {
  id: number;
  title: string;
  contents: ContentItem[];
}

export function EmpoweringCommunities({ data }: EmpoweringCommunitiesProps) {
  const tabs = data.tabs || [];

  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <article aria-labelledby="empowering-heading">
      <div className="py-20 bg-[#091A24]">
        <section className="container mx-auto  ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <h2
              id="empowering-heading"
              className="text-2xl leading-6 lg:text-[52px] lg:leading-[60px] font-medium text-[#47C1EA] max-w-[580px]"
            >
              {data.title || "Empowering Communities"}
            </h2>
            <div
              className="prose prose-invert prose-base text-sm lg:text-base text-white leading-snug lg:leading-loose text-justify"
              dangerouslySetInnerHTML={{ __html: data.content || "" }}
            ></div>
          </div>
        </section>
      </div>

      <div className="bg-[#091A24] text-white">
        <section className="container mx-auto  ">
          <nav
            role="tablist"
            aria-label="Community Initiatives"
            className="flex items-stretch border-b-2 border-b-neutral-400 max-lg:flex-col"
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                label={tab.title}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
        </section>
      </div>

      <div>
        {tabs.map((tab) => (
          <TabPanelContent
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
          />
        ))}
      </div>
    </article>
  );
}

type TabPanelProps = {
  tab: ApiTab;
  isActive: boolean;
};

const customGradient =
  "linear-gradient(#091a24, #091a244d 8%, #091a2427 25%, #091a2400 75%, #091a2466 82%, #091a24)";

function TabPanelContent({ tab, isActive }: TabPanelProps) {
  const content = tab.contents?.[0];

  if (!content) {
    return null;
  }

  return (
    <section
      id={`panel-${tab.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${tab.id}`}
      hidden={!isActive}
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={content.image}
        alt={`${content.title} background`}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      <div
        className="absolute inset-0 overlay-business z-[1]"
        style={{ backgroundImage: customGradient }}
      ></div>

      <div className="container mx-auto   relative z-20">
        <div className="lg:max-w-[45%] ms-auto">
          <h3 className="text-2xl lg:text-[28px] font-medium mb-6 text-blue-lighter">
            {content.title}
          </h3>
          <div
            className="max-w-2xl prose prose-invert prose-base text-justify"
            dangerouslySetInnerHTML={{ __html: content.content }}
          ></div>
        </div>
      </div>
    </section>
  );
}
