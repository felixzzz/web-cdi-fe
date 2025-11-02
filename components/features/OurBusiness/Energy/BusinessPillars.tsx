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
        className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]"
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

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { clsx } from "clsx";
// import { EnergyTab } from "@/types/OurBusiness/Energy";

// interface BusinessPillarsProps {
//   title: string | null;
//   tabs: EnergyTab[];
// }

// export function BusinessPillars({ title, tabs }: BusinessPillarsProps) {
//   // 3. Initialize state with the first tab's ID, or 0 if no tabs
//   const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : 0);

//   return (
//     <section
//       aria-labelledby="pillars-heading"
//       className="bg-[#091A24] text-white"
//     >
//       <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
//         <h2
//           id="pillars-heading"
//           className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] text-center pt-20"
//         >
//           {title || "Business Pillars"}
//         </h2>

//         <nav
//           role="tablist"
//           aria-label="Business Pillars Tabs"
//           className="pt-20"
//         >
//           <div className="flex items-center gap-6 border-b-2 border-b-neutral-600 justify-between max-lg:flex-col">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 id={`tab-${tab.id}`}
//                 role="tab"
//                 aria-controls={`panel-${tab.id}`}
//                 aria-selected={activeTab === tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={clsx(
//                   "px-6 py-4 text-base lg:text-lg cursor-pointer tab-gradient w-full text-center",
//                   activeTab === tab.id ? "active" : "text-neutral-4"
//                 )}
//               >
//                 {tab.title}
//               </button>
//             ))}
//           </div>
//         </nav>
//       </div>

//       <div className="mt-0">
//         {tabs.map((tab) => (
//           <div
//             key={tab.id}
//             id={`panel-${tab.id}`}
//             role="tabpanel"
//             aria-labelledby={`tab-${tab.id}`}
//             hidden={activeTab !== tab.id}
//             tabIndex={0}
//           >
//             {tab.description && (
//               <div className="py-16 bg-blue-[#091A24]">
//                 <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
//                   <h3 className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-4 text-white">
//                     {tab.sub_title || tab.title}
//                   </h3>
//                   <div
//                   className="text-[12px] leading-[24px] font-extralight text-white py-1 space-y-6"
//                     dangerouslySetInnerHTML={{ __html: tab.description || "" }}
//                   />
//                 </section>
//               </div>
//             )}
//             {tab.contents.map((content) => (
//               <ContentBlock
//                 key={content.id}
//                 imageUrl={content.image}
//                 alt={content.name || content.title || "Business Pillar Image"}
//                 title={content.title || ""}
//                 contentHtml={content.description || ""}
//                 alignment={content.align as "left" | "right"}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// type ContentBlockProps = {
//   imageUrl: string;
//   alt: string;
//   title: string;
//   contentHtml: string;
//   alignment?: "left" | "right";
// };

// function ContentBlock({
//   imageUrl,
//   alt,
//   title,
//   contentHtml,
//   alignment = "right",
// }: ContentBlockProps) {
//   const alignmentClass = alignment === "right" ? "ms-auto" : "me-auto";

//   return (
//     <section className="py-28 text-white bg-blue-[#091A24] relative overflow-hidden">
//       <Image
//         src={imageUrl}
//         alt={alt}
//         layout="fill"
//         objectFit="cover"
//         className="z-0"
//       />
//       <div className="absolute inset-0 overlay-business z-[1]"></div>

//       <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[2]">
//         <div className={clsx("lg:max-w-[45%]", alignmentClass)}>
//           {title && (
//             <h3 className="text-2xl lg:text-[28px] font-medium mb-6 text-blue-lighter">
//               {title}
//             </h3>
//           )}

//           <div
//                   className="text-[12px] leading-[24px] font-extralight text-white py-1 space-y-6"
//             dangerouslySetInnerHTML={{ __html: contentHtml }}
//           ></div>
//         </div>
//       </div>
//     </section>
//   );
// }
