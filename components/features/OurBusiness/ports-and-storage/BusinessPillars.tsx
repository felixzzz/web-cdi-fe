import Image from "next/image";
import { clsx } from "clsx";
import { BusinessTab } from "@/types/OurBusiness/Ports&Storage";

interface BusinessPillarsProps {
  title: string | null;
  tab: BusinessTab; 
}

export function BusinessPillars({ title, tab }: BusinessPillarsProps) {
  const keyAssetsTitle = tab?.contents[0]?.heading || "Key Assets";
  return (
    <article aria-labelledby="pillars-heading-ports" className="bg-[#091A24] text-white">
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <h2 id="pillars-heading-ports" className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] text-center pt-20">
          {title || "Business Pillars"}
        </h2>
      </div>

      {tab && (
        <>
          <section
            aria-labelledby={`company-heading-${tab.id}`}
            className="py-16 bg-blue-dark"
          >
            <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] grid grid-cols-1 lg:grid-cols-3 gap-20 max-lg:gap-y-10">
              <div className="relative w-full aspect-square">
                <Image
                  src={tab.image} // 6. Use dynamic image
                  alt={tab.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[20px]"
                />
              </div>
              <div className="lg:col-span-2">
                <h3
                  id={`company-heading-${tab.id}`}
                  className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-4 text-white"
                >
                  {tab.title} {/* 7. Use dynamic title */}
                </h3>
                <div
                  className="content !text-neutral-5"
                  dangerouslySetInnerHTML={{
                    __html: tab.description || "", // 8. Use dynamic description
                  }}
                ></div>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="key-assets-heading"
            className="bg-blue-dark"
          >
            <div className="py-10">
              <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
                <h3
                  id="key-assets-heading"
                  className="font-medium text-2xl lg:text-[28px] mb-4 text-white text-center"
                >
                  {keyAssetsTitle} {/* 9. Use dynamic heading */}
                </h3>
              </div>
            </div>

            {/* 10. Map over the dynamic contents array */}
            {tab.contents.map((asset) => (
              <AssetBlock
                key={asset.id}
                imageUrl={asset.image}
                alt={asset.title || asset.name}
                title={asset.title || ""}
                contentHtml={asset.description || ""}
                alignment={asset.align as "left" | "right"}
              />
            ))}
          </section>
        </>
      )}
    </article>
  );
}

type AssetBlockProps = {
  imageUrl: string;
  alt: string;
  title: string;
  contentHtml: string;
  alignment?: "left" | "right";
};

function AssetBlock({
  imageUrl,
  alt,
  title,
  contentHtml,
  alignment = "right",
}: AssetBlockProps) {
  const alignmentClass = alignment === "left" ? "me-auto" : "ms-auto";

  return (
    <div className="py-28 text-white bg-blue-dark relative overflow-hidden">
      <Image
        src={imageUrl}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 overlay-business z-[1]"></div>

      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[2]">
        <div className={clsx("lg:max-w-[45%]", alignmentClass)}>
          <h4 className="text-2xl lg:text-[28px] font-medium mb-6 text-blue-lighter">
            {title}
          </h4>
          <div
            className="content !text-neutral-5"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          ></div>
        </div>
      </div>
    </div>
  );
}