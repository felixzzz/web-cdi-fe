"use client";

import React, { useState } from "react";
import {
  CommitteeTabPanel,
  CommitteeTabData,
} from "./CommitteeTabPanel";

import { TabButton } from "./TabButton";

const tabsData: CommitteeTabData[] = [
  {
    id: "audit",
    label: "Audit Committee",
    title: "Audit Committee",
    contentHtml: `
      <p>The Audit Committee was established by the Company through the Board of Commissioners Decree No. 001/LGC-CDI/BOC RES/III/2025 to support the implementation of Good Corporate Governance. In performing its duties and responsibilities, the Audit Committee upholds the five principles of GCG and act professionally and independently for the benefit of the Company and its stakeholders. The CDI Audit Committee was established based on Circular Resolution in lieu of the Board of Commissioners Meeting No. 001/LGC-CDI/BOC RES/III/2025. The composition of the audit committee members is as follows:</p>
      <p><br></p>
      <p>(1) Chairman: Ade Supandi, SE</p>
      <p>(2) Member: Toni Setioko</p>
      <p>(3) Member: Jennywati</p>
      <p><br></p>
      <p>The Audit Committee is responsible directly to the Board of Commissioners and in coordination with the Internal Audit Unit.</p>
      <p>To support the role of Audit Committee, the Company has developed a guideline namely the Audit Committee Charter which includes:</p>
      <ol>
        <li data-list="bullet">Background.</li>
        <li data-list="bullet">Duties, responsibilities and authority.</li>
        <li data-list="bullet">Composition, structure, requirements of Audit Committee members.</li>
        <li data-list="bullet">Implementation and work procedure.</li>
        <li data-list="bullet">Audit Committee meeting.</li>
        <li data-list="bullet">Reporting.</li>
        <li data-list="bullet">Provision on the handling of complaints or reports on suspicion of violation relating to financial report.</li>
        <li data-list="bullet">Terms of service of the Audit Committee.</li>
      </ol>
    `,
    files: [
      {
        id: 1,
        title: "Audit Commitee Charter",
        fileSize: "255.95 KB",
        viewUrl:
          "https://chandradaya-investasi.com/file/preview/default/audit_committe/Audit_Committe_01/Audit Commitee Charter",
        downloadUrl:
          "https://chandradaya-investasi.com/file/download/default/audit_committe/Audit_Committe_01/",
      },
    ],
  },
  {
    id: "remuneration",
    label: "Remuneration Committee",
    title: "Remuneration Committee",
    contentHtml: `
      <p>This Charter aims to stipulate the scope of work of the Remuneration Committee, the position of the Remuneration Committee in PT Chandra Daya Investasi Tbk (the “<strong>Company</strong>"), and the authorities and responsibilities of the Remuneration Committee in accordance to Financial Services Authority Regulation Number 34/POJK.04/2014 on Nomination and Remuneration Committee of Issuer or Public Companies.</p>
    `,
    files: [
      {
        id: 1,
        title: "Remuneration Committee Charter",
        fileSize: "270.98 KB",
        viewUrl:
          "https://chandradaya-investasi.com/file/preview/default/committe/Remuneration Committee/",
        downloadUrl:
          "https://chandradaya-investasi.com/file/download/default/committe/Remuneration Committee/",
      },
    ],
  },
];

export function Committee() {
  const [activeTabId, setActiveTabId] = useState(tabsData[0].id);

  const activeTab = tabsData.find((tab) => tab.id === activeTabId);

  return (
    <div className="py-20 bg-[#051119] text-white" id="committee">
      <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        
        <div className="flex items-center gap-6 border-b-2 border-b-neutral-700">
          {tabsData.map((tab) => (
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