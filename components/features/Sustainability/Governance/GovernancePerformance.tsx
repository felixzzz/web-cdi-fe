import Image from "next/image";
import React from "react";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/KzIvM0t1dnphOGtpY291aXFYZ3JBdWZISFVkendHbnY1d281bStJK2dISnZ4NXlMQjRKM3Jrc05EM2QrVU9McCs1UUNBaThtUzNPcFhieFJhS0w3OEgxUzZqTEtoWGlwakNYdFRxSjhaUWM9.webp";
const TITLE = "Governance Performance";
const CONTENT_HTML = `
  <p>In terms of governance, our performance is guided by our Code of Conduct and includes thorough supply chain assessments to ensure ethical practices across our operations.</p>
  <p>We are committed to maintaining high governance standards by regularly evaluating compliance with our ethical guidelines, which enhances transparency and accountability while mitigating risks.</p>
`;

export function GovernancePerformance() {
  return (
    <section
      aria-labelledby="governance-heading"
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Abstract blue background for governance performance section"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business z-10"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div className="lg:max-w-[45%] ms-auto">
          <h2
            id="governance-heading"
            className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-6 text-blue-lighter"
          >
            {TITLE}
          </h2>

          <div
            className="content !text-neutral-5"
            dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
          ></div>
        </div>
      </div>
    </section>
  );
}
