import Image from "next/image";

interface OverviewProps {
  title: string;
  description: string | null;
  imageUrl: string;
  linkUrl: string | null;
  linkTitle: string | null;
}

export function Overview({ title, description, imageUrl }: OverviewProps) {
  const gradientStyle =
    "linear-gradient(rgb(9, 26, 36), rgba(9, 26, 36, 0.3) 8%, rgba(9, 26, 36, 0.153) 25%, rgba(9, 26, 36, 0) 75%, rgba(9, 26, 36, 0.4) 82%, rgb(9, 26, 36))";

  return (
    <section className="py-10 lg:py-28 text-white bg-[#091A24] relative overflow-hidden min-h-[200px] lg:min-h-0 flex items-center">
      <Image
        src={imageUrl}
        alt={title || "Overview"}
        title={title || "Overview"}
        fill
        className="object-cover z-0 object-[30%_center] lg:object-[65%_center]"
        priority
      />

      <div
        className="absolute inset-0 overlay-business z-[1] bg-black/55 lg:bg-transparent"
        style={{ backgroundImage: gradientStyle }}
      ></div>

      <div
        className="absolute inset-0 overlay-business z-[1]"
        style={{ backgroundImage: gradientStyle }}
      ></div>

      <section
        aria-labelledby="overview-heading"
        className="container mx-auto relative z-[2] px-4 md:px-8 w-full"
      >
        <div className="lg:max-w-[45%] ms-auto">
          <h2
            id="overview-heading"
            className="lg:text-2xl text-[28px] font-medium mb-4 lg:mb-6 text-[#47C1EA]"
          >
            {title}
          </h2>

          <span
            className="max-w-2xl prose prose-invert prose-base text-sm lg:text-base leading-snug lg:leading-loose text-justify block"
            dangerouslySetInnerHTML={{
              __html: description || "",
            }}
          />
        </div>
      </section>
    </section>
  );
}