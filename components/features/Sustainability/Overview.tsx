import { SustainabilitySection } from "@/types/Sustainabilitys/Sustainability";
import Image from "next/image";

interface OverviewProps {
  data: SustainabilitySection;
}

export function Overview({ data }: OverviewProps) {
  const imageUrl = data.file_url;
  const title = data.title || "Overview";
  const content = data.content || "";
    const gradientStyle =
    "linear-gradient(rgb(9, 26, 36), rgba(9, 26, 36, 0.3) 8%, rgba(9, 26, 36, 0.153) 25%, rgba(9, 26, 36, 0) 75%, rgba(9, 26, 36, 0.4) 82%, rgb(9, 26, 36))";

  return (
    <section
      aria-labelledby="overview-heading"
      className="py-28 text-white bg-[#091A24] relative overflow-hidden"
    >
      <Image
        src={imageUrl}
        alt="Abstract blue texture for overview background"
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
        <div className="lg:max-w-[45%] ms-auto">
          <h2
            id="overview-heading"
            className="text-2xl lg:text-[28px] font-medium mb-6 text-blue-lighter"
          >
            {title}
          </h2>

          <div
          className="text-[12px] leading-[24px] font-extralight text-white py-1 space-y-6"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </section>
  );
}
