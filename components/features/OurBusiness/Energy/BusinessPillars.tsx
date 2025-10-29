"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { EnergyTab } from "@/types/OurBusiness/Energy";

interface BusinessPillarsProps {
  title: string | null;
  tabs: EnergyTab[];
}

export function BusinessPillars({ title, tabs }: BusinessPillarsProps) {
  // 3. Initialize state with the first tab's ID, or 0 if no tabs
  const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : 0);

  return (
    <section
      aria-labelledby="pillars-heading"
      className="bg-[#091A24] text-white"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <h2
          id="pillars-heading"
          className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] text-center pt-20"
        >
          {title || "Business Pillars"}
        </h2>

        <nav
          role="tablist"
          aria-label="Business Pillars Tabs"
          className="pt-20"
        >
          <div className="flex items-center gap-6 border-b-2 border-b-neutral-6 justify-between max-lg:flex-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-controls={`panel-${tab.id}`}
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-6 py-4 text-base lg:text-lg cursor-pointer tab-gradient w-full text-center",
                  activeTab === tab.id ? "active" : "text-neutral-4"
                )}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="mt-0">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            tabIndex={0}
          >
            {tab.description && (
              <div className="py-16 bg-blue-dark">
                <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
                  <h3 className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-4 text-white">
                    {tab.sub_title || tab.title}
                  </h3>
                  <div
                    className="content !text-neutral-5"
                    dangerouslySetInnerHTML={{ __html: tab.description || "" }}
                  />
                </section>
              </div>
            )}
            {tab.contents.map((content) => (
              <ContentBlock
                key={content.id}
                imageUrl={content.image}
                alt={content.name || content.title || "Business Pillar Image"}
                title={content.title || ""}
                contentHtml={content.description || ""}
                alignment={content.align as "left" | "right"}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

type ContentBlockProps = {
  imageUrl: string;
  alt: string;
  title: string;
  contentHtml: string;
  alignment?: "left" | "right";
};

function ContentBlock({
  imageUrl,
  alt,
  title,
  contentHtml,
  alignment = "right",
}: ContentBlockProps) {
  const alignmentClass = alignment === "right" ? "ms-auto" : "me-auto";

  return (
    <section className="py-28 text-white bg-blue-dark relative overflow-hidden">
      <Image
        src={imageUrl}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 overlay-business z-[1]"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[2]">
        <div className={clsx("lg:max-w-[45%]", alignmentClass)}>
          {title && (
            <h3 className="text-2xl lg:text-[28px] font-medium mb-6 text-blue-lighter">
              {title}
            </h3>
          )}

          <div
            className="content !text-neutral-5"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          ></div>
        </div>
      </div>
    </section>
  );
}