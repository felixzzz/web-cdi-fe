import Image from "next/image";
import React from "react";
import { CheckCircle } from "lucide-react";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/KzIvM0t1dnphOGtpY291aXFYZ3JBdER1b0NQemhQSkd0N3Q2WnJua2ZGajljTGZ0enRPNWxFblJRNkhDNWFIZXpKMXFMUnhwdHNOc2QrOFhTMldsaEJxblluMm5SM1c5NFBLNHE5MFZtMDg9.webp";
const TITLE = "Anti-Corruption and Anti-Bribery";
const INTRO_TEXT =
  "CDI Group firmly rejects all forms of corrupt practices and is dedicated to combating these throughout our operations. The commitment to combating corruption involves continuous enhancements to the Code of Conduct to ensure the highest standards of governance.";

const keyPoints = [
  {
    title: "Policy Framework",
    text: "Embedding anti-corruption policies in our Code of Ethics and the Collective Labor Agreement, CDI Group upholds these principles through the iSTAR values, particularly focusing on integrity and accountability.",
  },
  {
    title: "Training and Awareness",
    text: "CDI Group conducts regular awareness campaigns for employees, business partners, and customers.",
  },
  {
    title: "Whistleblower Mechanism",
    text: "Employees and external parties involved are encouraged to report instances of fraud or ethical violations through the established Whistleblower mechanism, where reports are meticulously investigated by the Whistleblower Committee.",
  },
];

export function AntiCorruption() {
  return (
    <section
      aria-labelledby="anti-corruption-heading"
      className="text-white bg-[#091A24]"
    >
      <div className="py-20">
        <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
          <div className="mb-16 grid grid-cols-1 gap-4 lg:grid-cols-2 items-center">
            <h2
              id="anti-corruption-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium text-blue-lighter max-w-[277px]"
            >
              {TITLE}
            </h2>
            <div className="text-neutral-6 font-light">
              <p>{INTRO_TEXT}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-28 text-white relative overflow-hidden">
        <Image
          src={BACKGROUND_IMAGE_URL}
          alt="Abstract blue background for anti-corruption policies"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 overlay-business z-10"></div>

        <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
          <div className="lg:max-w-[35%] ms-auto">
            <ul className="flex flex-col gap-4">
              {keyPoints.map((point) => (
                <li key={point.title} className="flex items-start gap-2">
                  <CheckCircle
                    className="shrink-0 text-blue-lighter w-6 h-6"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-blue-lighter">
                      {point.title}
                    </h3>
                    <div className="text-neutral-5 text-base font-normal">
                      {point.text}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
