import Image from "next/image";
import React from "react";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/KzIvM0t1dnphOGtpY291aXFYZ3JBcTk2cnNCME03dFBnQU9Jbk9rL0UzNU5meXE3cjVaVEZ6bzdNMDRJd0hZaA.webp";
const TITLE = "Energy & Emission";
const CONTENT_HTML =
  "<p>At CDI Group, we are committed to advancing Indonesia’s transition towards renewable energy. CDI Group’s subsidiary, PT Krakatau Chandra Energi (KCE), plays a crucial role in this effort by providing clean energy solutions.</p>";

export function EnergyEmission() {
  return (
    <section
      aria-labelledby="energy-heading"
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Abstract blue energy background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business z-10"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div className="lg:max-w-[45%] ms-auto">
          <h2
            id="energy-heading"
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
