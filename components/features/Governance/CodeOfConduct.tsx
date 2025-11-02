import React from "react";
import { Eye, Download } from "lucide-react";
import Image from "next/image";

const data = {
  section: {
    id: "code-of-conduct",
    title: "Code of Conduct",
    contentHtml: `
      <p>CDI Group has a Code of Conduct (CoC) as guidance in act and the implementation of Good Corporate Governance. CoC is a written provisions that is used as reference in conducting business activities that must be understood and carried out every day. CoC also regulates corporate behaviour and individual behaviour related to compliance, health and safety, conflicts of interest management, compliance with laws, procurement, security of information and assets, and public information disclosure.</p>
      <p>CoC applies to all employees and management (Board of Directors and Board of Commissioners) of CDI Group as well as its subsidiaries and every joint venture company within CDI Group's control. It is expected that every Employee; and stakeholder, including but not limited to a business partner, a supplier or vendor, a customer, a contractor, an agent, a consultant and/or any other third party who works with, for or represent CDI Group must understand and follow this Code of Conduct.</p>
      <p>Evaluation of CoC implementation is conducted periodically to ensure that all elements of the Company has been running the business rules based on the ethics and high standards that have been set. In addition, a review of CoC is conducted to determine whether it requires changes and/or adjustments of regulations in connection with the development of CDI Group’s business.</p>
    `,
  },
  cta: {
    title: "Code of Conduct CDI Group",
    fileSize: "2.14 MB",
    viewUrl:
      "https://chandradaya-investasi.com/file/preview/default/code_of_conduct/Code_Of_Conduct_7851/Code of Conduct CDI Group",
    downloadUrl:
      "https://chandradaya-investasi.com/file/download/default/code_of_conduct/Code_Of_Conduct_7851/",
  },
};

export function CodeOfConduct() {
  return (
    <section
      id={data.section.id}
      aria-labelledby="code-of-conduct-heading"
      className="py-20 bg-[#091A24] text-white"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-8">
          <div className="lg:col-span-4">
            <h2
              id="code-of-conduct-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {data.section.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base"
              dangerouslySetInnerHTML={{ __html: data.section.contentHtml }}
            />
          </div>
        </div>

        <div
          className="mt-8 p-6 flex flex-col md:flex-row md:items-center md:justify-between w-full
                      border 
                      bg-[linear-gradient(#d6f5ff29,#091a2429)] 
                      rounded-lg"
          style={{
            borderColor: "color-mix(in oklab, #676869 40%, transparent)",
          }}
        >
          <div className="flex flex-col gap-2 mb-4 md:mb-0">
            <h3 className="text-2xl font-medium">{data.cta.title}</h3>
            <div className="flex items-center text-base text-white gap-2">
              <span className="text-sm">{data.cta.fileSize}</span>
              <span className="text-sm">.</span>
              <Image
                src="https://chandradaya-investasi.com/assets/frontend/icons/ic_filepdf_white.svg"
                width={26}
                height={20}
                alt="See all icon"
                className="inline-block"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={data.cta.viewUrl}
              className="flex items-center gap-2 text-white font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Eye size={20} /> View
            </a>
            <a
              href={data.cta.downloadUrl}
              className="flex items-center gap-2 text-white font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={20} /> Download
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
