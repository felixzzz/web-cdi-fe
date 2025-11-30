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
        style={{ backgroundImage: customGradient }}
      ></div>

      <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44 relative z-[2]">
        <div className={clsx("md:max-w-[45%]", alignmentClass)}>
          {tagline && <p className="text-neutral-200 mb-4">{tagline}</p>}

          {title && (
            <h3 className="text-2xl md:text-[28px] font-medium mb-6 text-[#47C1EA]">
              {title}
            </h3>
          )}
          <div
            className="prose prose-invert prose-base max-w-none text-[11px] md:text-[12px] leading-normal md:leading-[24px] text-justify"
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
      {/* BLOK INTRO (HTML Tipe 1) */}
      {(tab.sub_title || tab.description) && (
        <div className="py-16 bg-[#091A24]">
          <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44">
            {tab.sub_title && (
              <h2 className="text-3xl md:text-[38px] md:leading-[44px] font-medium text-white mb-6">
                {tab.sub_title}
              </h2>
            )}
            {tab.description && (
              <div
                className="prose prose-invert prose-base max-w-none text-[10px] md:text-[12px] leading-tight md:leading-[24px] text-justify"
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
                <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44">
                  <h3 className="font-medium text-2xl md:text-[28px] mb-4 text-white text-start">
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