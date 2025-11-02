import Image from "next/image";
import React from "react";

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

const customGradient =
  "linear-gradient(#091a24, #091a244d 8%, #091a2427 25%, #091a2400 75%, #091a2466 82%, #091a24)";

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
            <div className="max-w-2xl prose prose-invert prose-base">
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

        <div
          className="absolute inset-0 overlay-business z-[1]"
          style={{ backgroundImage: customGradient }}
        ></div>

        <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
          <div className="lg:max-w-[35%] ms-auto">
            <ul className="flex flex-col gap-4">
              {keyPoints.map((point) => (
                <li key={point.title} className="flex items-start gap-2">
                  <Image
                    src="https://chandradaya-investasi.com/assets/frontend/icons/ic_bold_duotone_check_circle.svg"
                    width={26}
                    height={26}
                    alt="check"
                    className="inline-block"
                  />
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-blue-lighter">
                      {point.title}
                    </h3>
                    <div className="max-w-2xl prose prose-invert prose-base">
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
