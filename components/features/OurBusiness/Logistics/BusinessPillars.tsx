"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { BusinessTab } from "@/types/OurBusiness/Logistic";
import { useState } from "react";
import { TabButton } from "./TabButton";

const customGradient =
  "linear-gradient(#091a24, #091a244d 8%, #091a2427 25%, #091a2400 75%, #091a2466 82%, #091a24)";

interface TabContentItem {
  id: number;
  ulid: string;
  name: string;
  title: string | null;
  description: string;
  align: "left" | "right";
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

type AssetBlockProps = {
  imageUrl: string;
  alt: string;
  title: string;
  contentHtml: string;
  alignment?: "left" | "right";
};

function AssetBlock({
  imageUrl,
  alt,
  title,
  contentHtml,
  alignment = "right",
}: AssetBlockProps) {
  const alignmentClass = alignment === "left" ? "me-auto" : "ms-auto";

  return (
    <div className="py-28 text-white bg-blue-dark relative overflow-hidden">
      <Image
        src={imageUrl}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div
        className="absolute inset-0 overlay-business z-[1]"
        style={{ backgroundImage: customGradient }}
      ></div>

      <div className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-44 2xl:px-48 relative z-[2]">
        <div className={clsx("lg:max-w-[45%]", alignmentClass)}>
          <h4 className="text-2xl lg:text-[28px] font-medium mb-6 text-[#47C1EA]">
            {title}
          </h4>
          <div
            className="prose prose-invert prose-base max-w-none text-[11px] md:text-[12px] leading-normal md:leading-[24px] text-justify"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          ></div>
        </div>
      </div>
    </div>
  );
}

interface BusinessPillarsProps {
  tabs: BusinessTab[];
}

export function BusinessPillars({ tabs }: BusinessPillarsProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#091A24]">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-44 2xl:px-48 pt-8">
        <div className="flex flex-col md:flex-row border-b border-[#BFBFBF]/20">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.title}
              isActive={tab.id === activeTabId}
              onClick={() => setActiveTabId(tab.id)}
            />
          ))}
        </div>
      </div>

      {activeTab && (
        <article
          key={activeTab.id}
          aria-labelledby={`pillars-heading-${activeTab.id}`}
          className="bg-[#091A24] text-white"
        >
          <section
            aria-labelledby={`company-heading-${activeTab.id}`}
            className="py-16 bg-[#091A24]"
          >
            <div className="container mx-auto px-4 md:px-10 lg:px-20 xl:px-44 2xl:px-48">
              <h3
                id={`company-heading-${activeTab.id}`}
                className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-6 text-white"
              >
                {activeTab.sub_title}
              </h3>
              <div
                className="prose prose-invert prose-base max-w-none text-[11px] md:text-[12px] leading-normal md:leading-[24px] text-justify"
                dangerouslySetInnerHTML={{
                  __html: activeTab.description || "",
                }}
              ></div>
            </div>
          </section>

          <section
            aria-labelledby="key-assets-heading"
            className="bg-[#091A24]"
          >
            {activeTab.contents.map((asset) => (
              <AssetBlock
                key={asset.id}
                imageUrl={asset.image}
                alt={asset.title || asset.name}
                title={asset.title || ""}
                contentHtml={asset.description || ""}
                alignment={asset.align as "left" | "right"}
              />
            ))}
          </section>
        </article>
      )}
    </div>
  );
}
