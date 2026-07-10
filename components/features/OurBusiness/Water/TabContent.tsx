import React from "react";
import Image from "next/image";
import { TabData } from "./BusinessPillars";
import { clsx } from "clsx";

const customGradient =
  "linear-gradient(#091a24, #091a244d 8%, #091a2427 25%, #091a2400 75%, #091a2466 82%, #091a24)";

type ContentBlockProps = {
  imageUrl: string;
  alt: string;
  tagline: string | null;
  title: string | null;
  contentHtml: string | null;
  align: string;
  // align: "left" | "right";
};

function ContentBlock({
  imageUrl,
  alt,
  tagline,
  title,
  contentHtml,
  align,
}: ContentBlockProps) {
  const alignmentClass = align === "right" ? "ms-auto" : "me-auto";
  
  const imagePositionClass = align === "right" 
    ? "object-[20%_center] lg:object-[65%_center]" 
    : "object-[80%_center] lg:object-[35%_center]"; 

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
        style={{ backgroundImage: customGradient }}
      ></div>

      <div className="container mx-auto relative z-[2]">
        <div className={clsx("lg:max-w-[45%] px-4 md:px-8", alignmentClass)}>
          {tagline && <p className="text-neutral-200 mb-4">{tagline}</p>}

          {title && (
            <h3 className="lg:text-2xl text-[28px] font-medium mb-6 text-[#47C1EA]">
              {title}
            </h3>
          )}
          <div
            className="prose prose-invert prose-base max-w-none text-sm lg:text-base leading-relaxed lg:leading-loose text-justify block"
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
  return (
    <div className="bg-[#091A24] text-white">
      {(tab.sub_title || tab.description) && (
        <div className="py-16 bg-[#091A24]">
          <div className="container mx-auto px-4 md:px-8">
            {tab.sub_title && (
              <h2 className="lg:text-3xl text-[38px] lg:leading-[44px] font-medium text-white mb-6">
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
          <React.Fragment key={content.id}>
            {content.heading && (
              <div className="py-10 bg-[#091A24]">
                <div className="container mx-auto px-4 md:px-8">
                  <h3 className="font-medium lg:text-2xl text-[28px] mb-4 text-white text-start">
                    {content.heading}
                  </h3>
                </div>
              </div>
            )}

            {content.image && (
              <ContentBlock
                imageUrl={content.image}
                alt={content.name || content.title || "Business Content Image"}
                tagline={content.tagline}
                title={content.title}
                contentHtml={content.description}
                align={content.align}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};