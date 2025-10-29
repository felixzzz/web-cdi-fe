"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";

const tabsData = [
  {
    id: "energy-provider",
    title: "Energy Provider",
    content: (
      <>
        <ContentBlock
          imageUrl="https://chandradaya-investasi.com/file-storage/NGRPRXVFNzk2R1VkUm1jaVNkRXc4YW5RbWlxV0R0MGZmUGs0dU9uN2dmZUJXTmd1OXdxanUxRk9zNlUvUHNBdnFpazIyZzdJRTNkaWZrMEZ6UStrZzJFaThKSENmMHB6WXlETVJDNFk1VW89.webp"
          alt="Energy provider operations"
          title=""
          alignment="right"
          contentHtml={`
            <p>Electricity provision is a key pillar of KCE's business, supported by power plants with a total capacity of 120 MW. The electricity generated supplies the majority of energy needs across the 2,666-hectare Krakatau Industrial Estate (KIK). Currently, KCE serves 216 customers from industrial, commercial, social, and government sectors, as well as 1,609 residential customers.</p>
            <p>For power generation, KCE operates a 120 MW Steam Gas Power Plant (PLTGU) using Combined Cycle Power Plant (CCPP) technology. The system consists of two gas turbines, two heat recovery steam generators, and one steam turbine. Natural gas is used as the primary fuel, ensuring efficient and high-quality electricity that meets industry standards.</p>
            <p>In addition, PT Krakatau Posco Energy (KPE), a subsidiary of KCE, strengthens the energy supply network by operating a 200 MW coal-fired power plant (PLTU), equipped with transmission and distribution systems of up to 150kV. The power provided by KPE enables broader energy distribution coverage, particularly for industrial zones and surrounding communities.</p>
            <p>Together with KCE, KSE, and KPE, CDI Group ensures reliable and stable electricity supply by implementing a compensator system and other supporting infrastructure to guarantee optimal and secure power quality for all customers.</p>
          `}
        />
      </>
    ),
  },
  {
    id: "electrical-services",
    title: "Electrical Services",
    content: (
      <>
        <div className="py-16 bg-[#091A24]">
          <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
            <h3 className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-4 text-white">
              Electrical Services
            </h3>
            <div className="content !text-neutral-5">
              <p className="ql-align-justify">
                This business line is divided into three main segments:
                Operation &amp; Maintenance of power plants; Engineering,
                Procurement and Construction (EPC) of electricity system; and
                Repair Overhaul services for transformers and electric motors.
                The services cater to a wide range of sectors, including
                industrial, business, social, government, and residential
                customers. The products offered from the three electricity
                service segments include:
              </p>
            </div>
          </section>
        </div>
        <ContentBlock
          imageUrl="https://chandradaya-investasi.com/file-storage/NGRPRXVFNzk2R1VkUm1jaVNkRXc4UldvaXNZYjFZTWFsaXVZWEdwNkFZQkpEUnJ6NVQvMlNtUXNYUGozYnd2SlVML1VydlFlWUgveHhCVTdPRGw4UTMyUWYrSFJLS3E4eUtvMG5nV2hLK2s9.webp"
          alt="Operation & Maintenance"
          title="Operation &amp; Maintenance (O&amp;M) Power Generation &amp; Power Distribution"
          alignment="left"
          contentHtml={`
            <ol>
              <li data-list="ordered"><span style="color: rgb(255, 255, 255);">O&amp;M Steam Power Plant, Combined Cycle Power Plant, Diesel Power Plant, and Gas Power Plant</span></li>
              <li data-list="ordered"><span style="color: rgb(255, 255, 255);">O&amp;M Power Distribution</span></li>
              <li data-list="ordered"><span style="color: rgb(255, 255, 255);">Testing &amp; Commissioning</span></li>
              <li data-list="ordered"><span style="color: rgb(255, 255, 255);">System &amp; Documentation</span></li>
              <li data-list="ordered"><span style="color: rgb(255, 255, 255);">Training &amp; Development</span></li>
            </ol>
          `}
        />
        <ContentBlock
          imageUrl="https://chandradaya-investasi.com/file-storage/NGRPRXVFNzk2R1VkUm1jaVNkRXc4VVptTE1Ra21Qd1FCRVZqbUlaK2RlbGFlOHhrZnloL2wrMEVicFkxRlRGenhKZHlKMkxSak1iYkFjeC9HTFNYYzBBVUF5dDdxU1lwZ25SSStzQmlPNGM9.webp"
          alt="Electrical EPC"
          title="Electrical EPC"
          alignment="right"
          contentHtml={`
            <ol>
              <li data-list="ordered" class="ql-align-justify"><span style="color: rgb(255, 255, 255);">Construction and Installation of Substation Electricity Supply Installation</span></li>
              <li data-list="ordered" class="ql-align-justify"><span style="color: rgb(255, 255, 255);">Construction and Installation of Medium Voltage Electricity Supply Installation</span></li>
              <li data-list="ordered" class="ql-align-justify"><span style="color: rgb(255, 255, 255);">Construction and Installation of High Voltage Electricity Supply Installation</span></li>
              <li data-list="ordered" class="ql-align-justify"><span style="color: rgb(255, 255, 255);">Construction and Installation of Panel &amp; Solar PV System</span></li>
            </ol>
          `}
        />
        <ContentBlock
          imageUrl="https://chandradaya-investasi.com/file-storage/NGRPRXVFNzk2R1VkUm1jaVNkRXc4ZDFNZTUwM1BHMnRVSnNuTmVuMHY4dFZ5VUhzU1AzbzFYWER1NDhGaHpKVkh3TzJ0VXZHM2Y5Y2JtZS9OSUNoMkRKTWtpNDNFZTNvbDVWOFNEY21qcmM9.webp"
          alt="Workshop services"
          title="Workshop services for Repair &amp; Overhaul (Motor &amp; Transformer)"
          alignment="left"
          contentHtml={`
            <ol>
              <li data-list="ordered" class="ql-align-justify"><span style="color: rgb(255, 255, 255);">Repair &amp; Overhaul of LV &amp; MV Motors</span></li>
              <li data-list="ordered" class="ql-align-justify"><span style="color: rgb(255, 255, 255);">Power &amp; Distribution Transformer Repair</span></li>
              <li data-list="ordered" class="ql-align-justify"><span style="color: rgb(255, 255, 255);">Transformer Mobile Unit Services</span></li>
              <li data-list="ordered" class="ql-align-justify"><span style="color: rgb(255, 255, 255);">Rental of Heavy Equipment &amp; Test Equipment: Overhead Crane 100/10 Ton, Overhead Crane 30/5 Ton Electrical tools &amp; Equipment Test</span></li>
            </ol>
          `}
        />
      </>
    ),
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    content: (
      <>
        <div className="py-16 bg-blue-dark">
          <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
            <h3 className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-4 text-white">
              Renewable Energy
            </h3>
            <div className="content !text-neutral-5">
              <p className="ql-align-justify">
                KCE operating in the new and renewable energy sector by
                constructing and operating more than 2,200 kWp Solar Power Plant
                in December 2024. In the future, KCE plans to develop additional
                renewable energy solutions, service options that allows
                consumers to transition to cleaner energy alternatives. KCE
                provides four installation mechanisms for solar panels,
                including:
              </p>
            </div>
          </section>
        </div>
        <ContentBlock
          imageUrl="https://chandradaya-investasi.com/file-storage/NGRPRXVFNzk2R1VkUm1jaVNkRXc4WHR4RVVFeGxhSzFLem1ZRkQ1MGdCVzgydVo0cnB1cnYyOGlqMnNNSFh6MWJxeEdSanE2MVlSN2lYYksrRHdoZm84WTdUUi9UODhRUUM4NUpuWk9nMGc9.webp"
          alt="O&M WWTP Biotreatment"
          title="O&amp;M WWTP Biotreatment Blast Furnace Complex PT KS"
          alignment="right"
          contentHtml={`
            <ol>
              <li data-list="ordered" class="ql-align-justify">Solar On Grid System: This system integrates solar panels with the power grid, allowing the energy generated to be directly transmitted through the grid without the need for battery backup storage.</li>
              <li data-list="ordered" class="ql-align-justify">Solar Off Grid System: Operating autonomously without connection to the grid, this system requires energy and batteries, with usage dependent on the battery’s capacity.</li>
              <li data-list="ordered" class="ql-align-justify">Solar Hybrid System: This system combines multiple energy sources to meet the electricity needs of the building, enabling integration between different system for greater flexibility</li>
            </ol>
            <p class="ql-align-justify"><br></p>
            <p class="ql-align-justify">With these diverse options, KCE offers tailored solar panel installation solutions designed to meet the specific needs of each customer.</p>
          `}
        />
      </>
    ),
  },
];

export function BusinessPillars() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

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
          Business Pillars
        </h2>

        <nav
          role="tablist"
          aria-label="Business Pillars Tabs"
          className="pt-20"
        >
          <div className="flex items-center gap-6 border-b-2 border-b-neutral-6 justify-between max-lg:flex-col">
            {tabsData.map((tab) => (
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
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            tabIndex={0}
          >
            {tab.content}
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
