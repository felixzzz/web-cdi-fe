import Image from "next/image";
import React from "react";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/UTR6TEcrd2lmTWRmalFqYi9GL2FkSUYzSDNSTHRZeVErcHhUVU5TVFNoSmlkeS9jaGVqdlBHWTlnVTRIODBlT2pOeVQzODNnOTg1V2pkSmZpUXhycmc9PQ.webp";
const TITLE = "Risk Management";
const CONTENT_HTML = `
  <p>CDI Group acknowledges risks as part of its business operations. The company has established a detailed and structured risk management framework as a foundation to refer to when facing risks, ensuring they are mitigated for smooth business operations. These measures enable CDI Group to identify risk levels and the right strategies to address them.</p>
  <p><br></p>
`;

export function RiskManagement() {
  return (
    <section
      id="risk-management"
      aria-labelledby="risk-management-heading"
      className="bg-[#091A24] py-20 text-white relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Abstract background pattern for risk management section"
        layout="fill"
        objectFit="contain"
        objectPosition="right"
        className="z-0"
        priority
      />

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-8">
          <div>
            <h2
              id="risk-management-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
