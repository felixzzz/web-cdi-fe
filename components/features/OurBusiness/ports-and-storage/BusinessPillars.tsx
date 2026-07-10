import Image from "next/image";
import { clsx } from "clsx";
import { BusinessTab } from "@/types/OurBusiness/Ports&Storage";

interface BusinessPillarsProps {
  title: string | null;
  tab: BusinessTab; 
}

const customGradient =
  "linear-gradient(#091a24, #091a244d 8%, #091a2427 25%, #091a2400 75%, #091a2466 82%, #091a24)";

export function BusinessPillars({ title, tab }: BusinessPillarsProps) {
  const keyAssetsTitle = tab?.contents[0]?.heading || "Key Assets";
  
  return (
    <article aria-labelledby="pillars-heading-ports" className="bg-[#091A24] text-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 id="pillars-heading-ports" className="font-medium lg:text-4xl text-[24px] lg:leading-[44px] text-center pt-20">
          {title || "Business Pillars"}
        </h2>
      </div>

      {tab && (
        <>
          <section
            aria-labelledby={`company-heading-${tab.id}`}
            className="py-16 bg-blue-dark"
          >
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-20 max-lg:gap-y-10">
              <div className="relative w-full aspect-square">
                <Image
                  src={tab.image} 
                  alt={tab.title}
                  fill
                  className="object-cover rounded-[20px]"
                />
              </div>
              <div className="lg:col-span-2">
                <h3
                  id={`company-heading-${tab.id}`}
                  className="font-medium lg:text-4xl text-[24px] lg:leading-[44px] mb-4 text-white"
                >
                  {tab.title} 
                </h3>
                <div
                  className="prose prose-invert prose-base max-w-none text-sm lg:text-base leading-snug lg:leading-loose text-justify block"
                  dangerouslySetInnerHTML={{
                    __html: tab.description || "", 
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
              <div className="container mx-auto px-4 md:px-8">
                <h4
                  id="key-assets-heading"
                  className="font-medium lg:text-3xl text-[28px] mb-4 text-white text-center"
                >
                  {keyAssetsTitle}
                </h4>
              </div>
            </div>

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

  const imagePositionClass = alignment === "right" 
    ? "object-[20%_center] lg:object-[65%_center]" 
    : "object-[80%_center] lg:object-[35%_center]"; 

  return (
    <div className="py-28 text-white bg-blue-dark relative overflow-hidden">
      <Image
        src={imageUrl}
        alt={alt}
        title={alt}
        fill
        className={`object-cover z-0 ${imagePositionClass}`}
        priority
      />
      <div
        className="absolute inset-0 overlay-business z-[1] bg-black/55 lg:bg-transparent"
        style={{ backgroundImage: customGradient }}
      ></div>

      <div className="container mx-auto relative z-[2] px-4 md:px-8">
        <div className={clsx("lg:max-w-[45%]", alignmentClass)}>
          <h5 className="lg:text-2xl text-[28px] font-medium mb-6 text-blue-lighter">
            {title}
          </h5>
          <div
            // Menambahkan block
            className="prose prose-invert prose-base max-w-none text-sm lg:text-base leading-snug lg:leading-loose text-justify block"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          ></div>
        </div>
      </div>
    </div>
  );
}