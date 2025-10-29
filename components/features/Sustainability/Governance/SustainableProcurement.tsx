import React from "react";

const TITLE = "Sustainable Procurement";
const INTRO_TEXT =
  "CDI Group places a strong emphasis on sustainable procurement by integrating ESG (Environmental, Social, and Governance) considerations into its supply chain processes.";

const procurementPoints = [
  {
    id: 1,
    contentHtml:
      "<p class='ql-align-justify'>In terms of governance, we ensure equal treatment for all potential suppliers, regardless of their origin, and expects compliance with our Code of Conduct. The procurement process involves the Contracts and Procurement Department working in conjunction with the Contracts Committee, overseen by the Board of Directors. Prospective suppliers undergo a pre-qualification stage before participating in the tender process, with evaluations based on various criteria like legal suitability, quality control systems, and adherence to safety regulations.</p>",
  },
  {
    id: 2,
    contentHtml:
      "<p>Additionally, CDI Group maintains a Contractor Safety, Health, and Environment Plan to prioritize operational safety for workers and mitigate environmental impacts. We require our work partners to abide by environmental regulations and uphold safety standards, demonstrating a commitment to human rights and workplace justice in all business partnerships.</p>",
  },
];

export function SustainableProcurement() {
  return (
    <section
      aria-labelledby="procurement-heading"
      className="py-28 text-white bg-[#091A24] !bg-blue-dark-black relative"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
        <div className="mb-16 grid grid-cols-1 gap-4 lg:grid-cols-2 items-center">
          <h2
            id="procurement-heading"
            className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium"
          >
            {TITLE}
          </h2>
          <div className="text-neutral-4 font-light">
            <p>{INTRO_TEXT}</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {procurementPoints.map((point) => (
            <li key={point.id} className="flex gap-4 items-start">
              <div
                className="content !text-neutral-6 lg:!text-sm"
                dangerouslySetInnerHTML={{ __html: point.contentHtml }}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
