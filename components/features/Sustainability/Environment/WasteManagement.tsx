import Image from "next/image";
import React from "react";

const BACKGROUND_IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/KzIvM0t1dnphOGtpY291aXFYZ3JBcHZoOHdINHhMazdicE9LYzR5UUY2N3llOTZSODMvTnBZRkNxclhTUldMSENBd2FLRVlFaUdhaU53YVA5TWtNcVpTaHQwWnQzZTk0bC8ySkY2Y2dCMVE9.webp";
const TITLE = "Waste Management";
const CONTENT_HTML = `
  <p>As part of CDI Group’s waste reduction strategy, CDI Group supports plastic waste recycling through the third-party program of PT Krakatau Chandra Energi's Fostered Waste Bank, namely Yayasan Al Busniyah. CDI Group’s commitment to sustainability extends to achieving zero waste to landfills, ensuring that all waste is reused or treated responsibly. And every 3 month delivered recycle garbage for Bank Sampah Al Bustaniyah.</p>
  <p><br></p>
  <p>The Waste Bank was built to handle waste processing and make people aware of a healthy, clean and neat environment.</p>
`;
    const gradientStyle =
    "linear-gradient(rgb(9, 26, 36), rgba(9, 26, 36, 0.3) 8%, rgba(9, 26, 36, 0.153) 25%, rgba(9, 26, 36, 0) 75%, rgba(9, 26, 36, 0.4) 82%, rgb(9, 26, 36))";


export function WasteManagement() {
  return (
    <section
      aria-labelledby="waste-management-heading"
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={BACKGROUND_IMAGE_URL}
        alt="Green recycling and waste management facility"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

 <div
        className="absolute inset-0 overlay-business z-[1]"
        style={{ backgroundImage: gradientStyle }}
      ></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div className="lg:max-w-[45%] me-auto">
          <h2
            id="waste-management-heading"
            className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-6 text-blue-lighter"
          >
            {TITLE}
          </h2>

          <div
           className="prose prose-invert prose-base text-neutral-300"
            dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
          ></div>
        </div>
      </div>
    </section>
  );
}
