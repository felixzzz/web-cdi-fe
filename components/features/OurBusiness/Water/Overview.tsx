import Image from "next/image";

const imageUrl =
  "https://chandradaya-investasi.com/file-storage/R0lOZGFGaXoxWTlyMDFkSDJUV2FSTUhLSERFSzk0SlgyTlpwYml2VlI3TVpFanZyejI4dmhheTZDSW5GT3JKM2dqNVRtUjFwTGovWHFYRTNFb0lvR0E9PQ.webp";
const title = "Overview";

const contentHtml = `
  <p class="ql-align-justify text-[12px] lg:text-sm leading-[24px] font-normal">The energy business and operations of the CDI Group are managed by PT Krakatau Chandra Energi (KCE), which focuses on electricity supply, electrical services, and renewable energy solutions.</p>
  <p class="ql-align-justify text-[12px] lg:text-sm leading-[24px] font-normal">KCE's energy solutions are supported by two subsidiaries, <strong>PT Krakatau Sarana Energi (KSE)</strong> and <strong>PT Krakatau Posco Energy (KPE)</strong>. KSE focuses on the development of fuel stations and vehicle infrastructure to expand electric vehicle (EV) charging stations, supporting the growth of renewable energy, while KPE is dedicated to meeting the energy needs of internal operations as well as local industry and communities in the Cilegon area.</p>
  <p class="ql-align-justify text-[12px] lg:text-sm leading-[24px] font-normal">In the future, CDI Group plans to develop power plants that will utilize renewable energy sources, including solar and hydroelectric power, to further strengthen sustainable energy solutions.</p>
`;

export function Overview() {
  return (
    <section className="py-28 text-white bg-[#091A24] relative overflow-hidden">
      <Image
        src={imageUrl}
        alt="Overview of CDI Group's energy solutions"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="absolute inset-0 overlay-business z-[1]"></div>

      <section
        aria-labelledby="overview-heading"
        className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[2]"
      >
        <div className="lg:max-w-[45%] ms-auto">
          <h2
            id="overview-heading"
            className="text-2xl lg:text-[28px] font-medium mb-6 text-[#47C1EA]"
          >
            {title}
          </h2>

          <div
            className="content !text-neutral-5"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          ></div>
        </div>
      </section>
    </section>
  );
}
