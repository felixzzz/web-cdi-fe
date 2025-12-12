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

      <div className="container mx-auto   relative z-20">
        <div className="lg:max-w-[45%] ms-auto">
          <h2
            id="overview-heading"
            className="text-2xl lg:text-[28px] font-medium mb-6 text-blue-lighter"
          >
            {title}
          </h2>

          <div
          className="max-w-full prose prose-invert prose-base text-sm lg:text-base leading-snug lg:leading-loose text-justify"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </section>
  );
}
