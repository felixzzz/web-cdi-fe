import Image from "next/image";

interface OverviewProps {
  title: string;
  description: string | null;
  imageUrl: string;
  linkUrl: string | null;
  linkTitle: string | null;
}

export function Overview({
  title,
  description,
  imageUrl,
}: OverviewProps) {
    const gradientStyle =
    "linear-gradient(rgb(9, 26, 36), rgba(9, 26, 36, 0.3) 8%, rgba(9, 26, 36, 0.153) 25%, rgba(9, 26, 36, 0) 75%, rgba(9, 26, 36, 0.4) 82%, rgb(9, 26, 36))";


  return (
    <section className="py-28 text-white bg-[#091A24] relative overflow-hidden">
      <Image
        src={imageUrl}
        alt={title || "Overview"}
        title={title || "Overview"}
        layout="fill"
        objectFit="cover"
        className="z-0 object-left lg:object-center"
        priority
      />

      <div
        // className="absolute inset-0 overlay-business z-[1]"
        className="absolute inset-0 overlay-business z-[1] bg-black/55 lg:bg-transparent"
        style={{ backgroundImage: gradientStyle }}
      ></div>
  
      <div className="absolute inset-0 overlay-business z-[1]"></div>

      <section
        aria-labelledby="overview-heading"
        className="container mx-auto   relative z-[2]"
      >
        <div className="lg:max-w-[45%] ms-auto">
          <h2
            id="overview-heading"
            className="text-2xl md:text-[28px] font-medium mb-6 text-[#47C1EA]"
          >
            {title}
          </h2>

          <span
          className="max-w-2xl prose prose-invert prose-base text-sm lg:text-base leading-snug lg:leading-loose text-justify text-neutral-200"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>
      </section>
    </section>
  );
}
