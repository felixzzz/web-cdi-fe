import { SustainabilitySection } from "@/types/Sustainabilitys/Sustainability";
import Image from "next/image";

interface OverviewProps {
  data: SustainabilitySection;
}

export function Overview({ data }: OverviewProps) {
  const imageUrl = data.file_url;
  const title = data.title || "Overview";
  const content = data.content || "";

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

      <div className="absolute inset-0 overlay-business z-10"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-20">
        <div className="lg:max-w-[45%] ms-auto">
          <h2
            id="overview-heading"
            className="text-2xl lg:text-[28px] font-medium mb-6 text-blue-lighter"
          >
            {title}
          </h2>

          <div
            className="content !text-neutral-5"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </section>
  );
}
