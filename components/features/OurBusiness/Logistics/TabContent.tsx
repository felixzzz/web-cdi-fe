import React from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { TabData } from "./BusinessPillars";

const customGradient =
  "linear-gradient(rgb(9, 26, 36), rgba(9, 26, 36, 0.3) 8%, rgba(9, 26, 36, 0.153) 25%, rgba(9, 26, 36, 0) 75%, rgba(9, 26, 36, 0.4) 82%, rgb(9, 26, 36))";

type ContentBlockProps = {
  imageUrl: string;
  alt: string;
  title: string | null;
  contentHtml: string;
  align: "left" | "right" | string;
  useCustomGradient: boolean;
};

function ContentBlock({
  imageUrl,
  alt,
  title,
  contentHtml,
  align,
  useCustomGradient,
}: ContentBlockProps) {
  const alignmentClass = align === "right" ? "ms-auto" : "me-auto";
  
  const imagePositionClass = align === "right" 
    ? "object-[20%_center] lg:object-[65%_center]" 
    : "object-[80%_center] lg:object-[35%_center]"; 

  const gradientStyle =
    "linear-gradient(rgb(9, 26, 36), rgba(9, 26, 36, 0.3) 8%, rgba(9, 26, 36, 0.153) 25%, rgba(9, 26, 36, 0) 75%, rgba(9, 26, 36, 0.4) 82%, rgb(9, 26, 36))";

  return (
    <section className="py-28 text-white bg-[#091A24] relative overflow-hidden">
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
        style={{ backgroundImage: gradientStyle }}
      ></div>

      <div
        className="absolute inset-0 overlay-business z-[1]"
        style={useCustomGradient ? { backgroundImage: customGradient } : {}}
      ></div>

      <div className="container mx-auto relative z-[2] px-4 md:px-8">
        <div className={clsx("lg:max-w-[45%]", alignmentClass)}>
          {title && (
            <h3 className="text-2xl lg:text-[28px] font-medium mb-6 text-[#47C1EA]">
              {title}
            </h3>
          )}
          <div
            className="prose prose-invert prose-base max-w-none text-sm lg:text-base leading-relaxed lg:leading-loose text-justify block"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </section>
  );
}

interface TabContentProps {
  tab: TabData;
}

export const TabContent: React.FC<TabContentProps> = ({ tab }) => {
  const needsCustomGradient =
    tab.title === "Energy Provider" || tab.title === "Electrical Services";

  return (
    <div className="bg-[#091A24] text-white">
      {(tab.sub_title || tab.description) && (
        <div className="py-16 bg-[#091A24]">
          <div className="container mx-auto px-4 md:px-8">
            {tab.sub_title && (
              <h2 className="text-3xl lg:text-[38px] lg:leading-[44px] font-medium text-white mb-6">
                {tab.sub_title}
              </h2>
            )}
            {tab.description && (
              <div
                className="prose prose-invert prose-base max-w-none text-sm lg:text-base leading-relaxed lg:leading-loose text-justify block"
                dangerouslySetInnerHTML={{ __html: tab.description }}
              />
            )}
          </div>
        </div>
      )}

      <div>
        {tab.contents.map((content) => (
          <ContentBlock
            key={content.id}
            imageUrl={content.image}
            alt={content.name || content.title || "Business Content Image"}
            title={content.title}
            contentHtml={content.description}
            align={content.align as "left" | "right"}
            useCustomGradient={needsCustomGradient}
          />
        ))}
      </div>
    </div>
  );
};