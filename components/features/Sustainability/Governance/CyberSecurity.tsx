import Image from "next/image";
import React from "react";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/KzIvM0t1dnphOGtpY291aXFYZ3JBZ2RsTzduQkQ3SkFTb0dKRkFydFY0RVMxaTZNMXQ0aGc5bHM1aW5GbFVYa0Mzd1lKbmRWOFdBb3h0SHRuSTlqV1Mrc2xXZU5udE9YZUtwcmJ5MXBXNDQ9.webp";
const TITLE = "Cyber Security";
const INTRO_TEXT =
  "CDI Group prioritizes information security within its governance framework, recognizing the critical importance of information and IT systems as essential business assets. We emphasize the availability, integrity, and confidentiality of information to ensure our competitive edge, profitability, legal compliance, and reputation.";

const keyPoints = [
  {
    id: 1,
    title: "Policy Management",
    text: "We have implemented IT policies and a User Access and Security Policy to ensure business continuity, minimize the impact of security incidents as well as to protect the privacy of personal information.",
  },
  {
    id: 2,
    title: "Security Operation System Initiatives",
    text: "A key initiative to enhance cybersecurity is the establishment of a Security Operations Center. This center proactively monitors the IT infrastructure, allowing for the timely detection of cybersecurity alerts and incidents.",
  },
];

export function CyberSecurity() {
  return (
    <section
      aria-labelledby="cyber-security-heading"
      className="py-28 text-white bg-[#051119] !bg-blue-dark-black relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Cyber security operations center background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business-darkest z-10"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div className="mb-16 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <h2
            id="cyber-security-heading"
            className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium lg:col-span-2"
          >
            {TITLE}
          </h2>
          <div className="lg:col-span-2 lg:max-w-[80%] prose prose-invert prose-base">
            <p>{INTRO_TEXT}</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {keyPoints.map((point) => (
            <li key={point.id} className="flex gap-4 items-start">
              <div className="flex flex-col gap-4">
                <h3 className="text-[22px] font-medium text-blue-lighter">
                  {point.title}
                </h3>
                <div className="max-w-3xl prose prose-invert prose-base">
                  <p>{point.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
