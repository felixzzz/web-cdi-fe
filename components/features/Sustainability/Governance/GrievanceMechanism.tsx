import Image from "next/image";
import React from "react";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/KzIvM0t1dnphOGtpY291aXFYZ3JBbDBVVGwxeWE1YUFpODNqZ1pGTC9GaGdRbmx1OWtKd2xZbzhSaWdsa1ZZM3RxSTNsVW1NRDFib0ZNK3dVNE56SlFmaUhxM0lkSEd4M1FVak80WlRrUWc9.webp";
const TITLE = "Grievance Mechanism";
const CONTENT_HTML = `
  <p>Grievance System provides employees with a confidential mechanism to address concerns within the realm of industrial relations. The Company ensures informant confidentiality, allowing individuals to report complaints without fear of repercussions. Reports are taken seriously and investigated promptly, with appropriate sanctions enforced for proven violations.</p>
  <p>We promptly and fairly address grievances to create a transparent and supportive work environment. We have established clear procedures for submitting complaints, conducting investigations, and providing resolution guidelines. We believe that effective grievance mechanisms help us identify and resolve issues, enhance employee satisfaction, and ensure compliance with legal and ethical standards.</p>
`;

export function GrievanceMechanism() {
  return (
    <section
      aria-labelledby="grievance-heading"
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Abstract blue background for grievance mechanism section"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business z-10"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div className="lg:max-w-[45%] me-auto">
          <h2
            id="grievance-heading"
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
