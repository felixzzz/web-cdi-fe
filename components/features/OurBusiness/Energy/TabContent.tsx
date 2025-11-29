import React from "react";
import Image from "next/image";
import { TabData } from "./BusinessPillars"; 
import { clsx } from "clsx";

const customGradient =
  "linear-gradient(rgb(9, 26, 36), rgba(9, 26, 36, 0.3) 8%, rgba(9, 26, 36, 0.153) 25%, rgba(9, 26, 36, 0) 75%, rgba(9, 26, 36, 0.4) 82%, rgb(9, 26, 36))";

type ContentBlockProps = {
  imageUrl: string;
  alt: string;
  title: string | null;
  contentHtml: string | null;
  align: string;
  // align: "left" | "right";
  useCustomGradient: boolean; 
};

function ContentBlock({
  imageUrl,
  alt,
  title,
  contentHtml,
  align,
}: ContentBlockProps) {
  const alignmentClass = align === "right" ? "ms-auto" : "me-auto";

  return (
    <section className="py-28 text-white bg-[#091A24] relative overflow-hidden">
      <Image
        src={imageUrl}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div
        className="absolute inset-0 overlay-business z-[1]"
        style={{ background: customGradient }}
      ></div>

      <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-44 2xl:px-44 relative z-[2]">
        <div className={clsx("md:max-w-[45%]", alignmentClass)}>
          {title && (
            <h3 className="text-2xl md:text-[28px] leading-normal font-medium mb-6 text-[#47C1EA]">
              {title}
            </h3>
          )}
          <div
            className="prose prose-invert prose-base text-[11px] md:text-[12px] leading-normal md:leading-[24px] text-justify max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml || "" }}
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
          <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-44 2xl:px-44">
            {tab.sub_title && (
              <h2 className="text-3xl md:text-[38px] md:leading-[44px] font-medium text-white mb-6">
                {tab.sub_title}
              </h2>
            )}
            {tab.description && (
              <div
                className="prose prose-invert prose-base text-[10px] md:text-[12px] leading-normal md:leading-[24px] text-justify max-w-none"
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
            align={content.align}
            useCustomGradient={needsCustomGradient}
          />
        ))}
      </div>
    </div>
  );
};
