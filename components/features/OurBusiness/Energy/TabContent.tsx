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
        title={alt}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div
        className="absolute inset-0 overlay-business z-[1]"
        style={{ background: customGradient }}
      ></div>

      <div className="container mx-auto   relative z-[2]">
        <div className={clsx("lg:max-w-[45%]", alignmentClass)}>
          {title && (
            <h3 className="lg:text-2xl text-[28px] leading-normal font-medium mb-6 text-[#47C1EA]">
              {title}
            </h3>
          )}
          <div
            className="prose prose-invert prose-base text-sm lg:text-base leading-relaxed md:leading-loose text-justify max-w-none"
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
          <div className="container mx-auto  ">
            {tab.sub_title && (
              <h2 className="lg:text-3xl text-[38px] lg:leading-[44px] font-medium text-white mb-6">
                {tab.sub_title}
              </h2>
            )}
            {tab.description && (
              <div
                className="prose prose-invert prose-base text-sm lg:text-base leading-relaxed md:leading-loose text-justify max-w-none"
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
