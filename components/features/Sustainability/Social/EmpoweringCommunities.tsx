"use client";

import React, { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { SustainabilitySocialSection } from "@/types/Sustainabilitys/Social";

const tabsData = [
  {
    id: "healthcare",
    title: "Healthcare & Well-being",
    panelTitle: "Healthcare & Well-being",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/cVpvOG5GaDE5SHVScGEzMlJ0YjJ5WHVWYzJmY2FqRXJ4NEEwV1RtL011NkJkbVNzZUlsSzl0OVdRMTUzNnJXTXdjaTBRTy8wM2E0SHg4NmxGVncrZUE9PQ.webp",
    contentHtml:
      "<p>CDI Group provides BPJS Health Insurance assistance to 40 underprivileged residents in Samangraya and Warnasari villages to ensure access to essential medical services. In addition, CDI Group's free health screening program has reached 217 residents in the Cikerai and Cinangka areas, offering health consultations and blood sugar checks.</p>",
  },
  {
    id: "waste",
    title: "Waste Management & Community Empowerment",
    panelTitle: "Waste Management & Community Empowerment",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/cVpvOG5GaDE5SHVScGEzMlJ0YjJ5YUdydXFLRFhKTE1EcFBzRDFMaGd6NkFKTWtLbmF0SDh5aGd0K3VLOC9KOUVLbzNYekVuOTQyek5nUldPWE05dW9ibm10bm1zc0RLQnoyT2lsckRYVDA9.webp",
    contentHtml:
      '<p>In collaboration with local communities, CDI Group have established:</p><ol><li data-list="bullet">Maggot Farming at Al Bustaniyah Islamic Boarding School, enabling organic waste recycling to have a use value.</li><li data-list="bullet">Bank Sampah initiatives, empowering the community to manage inorganic waste.</li></ol>',
  },
  {
    id: "education",
    title: "Renewable Energy for Education",
    panelTitle: "Renewable Energy for Education",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/cVpvOG5GaDE5SHVScGEzMlJ0YjJ5UVMzekRTazVYYlRhTUVIbElWLzhBdE5ZRk16TExMVEdYb3BpYW9pbm9nbG5uYWo0bHJmUVR5elN3MGdkYjVqYkE9PQ.webp",
    contentHtml:
      "<p>CDI Group believes in providing clean energy access to educational institutions. By installing PLTS solar panels (Langit Biru) in schools and Islamic boarding schools in the Cilegon area, CDI Group helps reduce electricity costs while promoting sustainable energy use.</p>",
  },
  {
    id: "marine",
    title: "Marine Conservation",
    panelTitle: "Marine Conservation",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/cVpvOG5GaDE5SHVScGEzMlJ0YjJ5ZE4rRG5VdExSZE84MEVNY1A0Z1dTZCtnQWxHd2NsU3FDS2ZiWk5jM0s5VUtXUk4wMGVsU1o3TDVSNVJpZDRTYVE9PQ.webp",
    contentHtml:
      "<p>To protect coastal ecosystems, CDI Group actively participates in coral reef conservation efforts, ensuring the preservation of marine biodiversity for future generations. </p>",
  },
  {
    id: "social",
    title: "Community Social Assistance",
    panelTitle: "Community Social Assistance",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/cVpvOG5GaDE5SHVScGEzMlJ0YjJ5WjNoQ01NbUp1M0RycUdBRFRsN2hSK1owVmdObUJwazBwL2tVSmViWmR0Mzc1NU1ha1l3Uk5vOFdITFQvanpSL1E9PQ.webp",
    contentHtml:
      "<p>Public health facilities and houses of worship are also a concern for CDI Group in its efforts to improve social welfare. One form of concern is in the form of funding assistance for renovations at the Community Health Center and Baitushoffah Samangraya Mosque so that the function of these public facilities can return to optimal.</p>",
  },
];

interface EmpoweringCommunitiesProps {
  data: SustainabilitySocialSection;
}

export function EmpoweringCommunities({ data }: EmpoweringCommunitiesProps) {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <article aria-labelledby="empowering-heading">
      <div className="py-20 bg-[#091A24]">
        <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <h2
              id="empowering-heading"
              className="text-2xl leading-6 lg:text-[52px] lg:leading-[60px] font-medium text-[#47C1EA] max-w-[580px]"
            >
              {data.title || "Empowering Communities"}
            </h2>
            <div
              className="content !text-neutral-50 text-base"
              dangerouslySetInnerHTML={{ __html: data.content || "" }}
            ></div>
          </div>
        </section>
      </div>

      <div className="bg-[#091A24] text-white">
        <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
          <nav
            role="tablist"
            aria-label="Community Initiatives"
            className="flex items-stretch gap-6 border-b-2 border-b-neutral-6 justify-between max-lg:flex-col"
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
                  "px-6 py-4 text-base lg:text-lg text-neutral-4 cursor-pointer tab-gradient w-full text-center flex items-center justify-center !h-auto",
                  activeTab === tab.id && "active" // 'active' class dari kode asli
                )}
              >
                {tab.title}
              </button>
            ))}
          </nav>
        </section>
      </div>

      <div>
        {tabsData.map((tab) => (
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
  tab: (typeof tabsData)[0];
  isActive: boolean;
};

function TabPanelContent({ tab, isActive }: TabPanelProps) {
  return (
    <section
      id={`panel-${tab.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${tab.id}`}
      hidden={!isActive}
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={tab.imageUrl}
        alt={`${tab.panelTitle} background`}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 overlay-business z-10"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div className="lg:max-w-[45%] ms-auto">
          <h3 className="text-2xl lg:text-[28px] font-medium mb-6 text-blue-lighter">
            {tab.panelTitle}
          </h3>
          <div
            className="content !text-neutral-5"
            dangerouslySetInnerHTML={{ __html: tab.contentHtml }}
          ></div>
        </div>
      </div>
    </section>
  );
}
