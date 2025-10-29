"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { FileText, Eye, Download } from "lucide-react";

const tabsData = [
  {
    id: "audit",
    title: "Audit Committee",
    panelTitle: "Audit Committee",
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
    cta: {
      title: "Audit Commitee Charter",
      fileSize: "255.95 KB",
      viewUrl:
        "https://chandradaya-investasi.com/file/preview/default/audit_committe/Audit_Committe_01/Audit Commitee Charter",
      downloadUrl:
        "https://chandradaya-investasi.com/file/download/default/audit_committe/Audit_Committe_01/",
    },
  },
  {
    id: "remuneration",
    title: "Remuneration Committee",
    panelTitle: "Remuneration Committee",
    contentHtml: `
      <p>This Charter aims to stipulate the scope of work of the Remuneration Committee, the position of the Remuneration Committee in PT Chandra Daya Investasi Tbk (the “<strong>Company</strong>"), and the authorities and responsibilities of the Remuneration Committee in accordance to Financial Services Authority Regulation Number 34/POJK.04/2014 on Nomination and Remuneration Committee of Issuer or Public Companies.</p>
    `,
    cta: {
      title: "Remuneration Committee Charter",
      fileSize: "270.98 KB",
      viewUrl:
        "https://chandradaya-investasi.com/file/preview/default/committe/Remuneration Committee/",
      downloadUrl:
        "https://chandradaya-investasi.com/file/download/default/committe/Remuneration Committee/",
    },
  },
];

export function Committee() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <section id="committee" className="py-20 bg-[#051119] text-white">
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <nav
          role="tablist"
          aria-label="Committee Tabs"
          className="flex items-center gap-6 border-b-2 border-b-neutral-6"
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
                "px-6 py-4 text-base lg:text-lg text-neutral-4 cursor-pointer tab-gradient",
                activeTab === tab.id && "active"
              )}
            >
              {tab.title}
            </button>
          ))}
        </nav>

        <div>
          {tabsData.map((tab) => (
            <section
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              hidden={activeTab !== tab.id}
              className="py-8"
            >
              <h2 className="font-medium text-[22px] mb-3">{tab.panelTitle}</h2>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: tab.contentHtml }}
              />

              <div className="mt-8 flex flex-col gap-8 mb-6">
                <div className="button-gradient-custom">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[22px] font-medium">{tab.cta.title}</h3>
                    <div className="flex items-center text-base text-white gap-3">
                      <div className="flex items-baseline gap-3">
                        <span>{tab.cta.fileSize}</span>
                        <span>.</span>
                      </div>
                      <FileText size={16} aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex lg:items-center gap-8 w-full lg:w-fit">
                    <a
                      href={tab.cta.viewUrl}
                      className="flex items-center gap-2 text-white font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye size={16} aria-hidden="true" /> View
                    </a>
                    <a
                      href={tab.cta.downloadUrl}
                      className="flex items-center gap-2 text-white font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download size={16} aria-hidden="true" /> Download
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
