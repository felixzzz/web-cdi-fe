import Image from "next/image";
import React from "react";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/KzIvM0t1dnphOGtpY291aXFYZ3JBdkg1aVZ0d0xTUGJQOFdHenZML3ZpVFZsd2VzNkFldVRXTnBaaGN0eE1keVRYckJUZkdNMDUwRVExZlBuVTNZYnphRCtFYndZUzQ4eHlTRTNWQXN2SmM9.webp";
const TITLE = "Health and Safety Culture";
const CONTENT_HTML = `
  <p>CDI Group's safety commitment is reflected in the SMK3-certified Occupational Health & Safety System, also complemented by the ISO 45001:2018 certification. Through strict safety protocols, CDI Group has maintained a zero Lost Time Accident (LTA) record for three consecutive years (2021-2024).</p>
  <p>In recognition of CDI Group's workplace safety excellence, CDI Group received the <strong>Zero Accident Award </strong>from the Banten Provincial Manpower and Transmigration Office, and Ministry of Manpower. </p>
`;

const stats = [
  { value: "ZERO", label: "Lost Time Accident 2021-2024" },
  { value: "100%", label: "Certified ISO 45001", className: "row-span-2" },
  { value: "ZERO", label: "Accident" },
];

export function HealthAndSafety() {
  return (
    <section
      aria-labelledby="health-safety-heading"
      className="py-28 text-white bg-blue-dark relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Health and safety workers at an industrial facility"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business z-10"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-center">
          <div>
            <h2
              id="health-safety-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4 text-blue-lighter"
            >
              {TITLE}
            </h2>
            <div
              className="content !text-neutral-4"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            ></div>
          </div>

          <div>
            <ul className="items-center lg:max-w-[60%] ms-auto grid grid-cols-2 gap-8 lg:gap-x-16">
              {stats.map((stat) => (
                <li key={stat.label} className={stat.className || ""}>
                  <p className="text-[#47C1EA] font-bold text-3xl lg:text-[48px]">
                    {stat.value}
                  </p>
                  <p>{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
