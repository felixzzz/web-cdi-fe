import React from "react";
import { HistoryBlock } from "./HistoryBlock";

interface HistoryItem {
  id: number;
  ulid: string;
  image: string;
  tagline: string;
  title: string;
  content: string;
}

interface HistoryProps {
  data: HistoryItem[];
}

export const History: React.FC<HistoryProps> = ({ data }) => {
  return (
    <section id="history">
      {data && data.length > 0 && data.map((item) => (
        <HistoryBlock
          key={item.ulid || item.id}
          backgroundImageUrl={item.image}
          eyebrow={item.tagline}
          title={item.title}
        >
          <div
          className="prose prose-invert prose-base text-neutral-300 text-justify max-w-full text-[10px] md:text-[12px] leading-normal md:leading-[24px]"
          dangerouslySetInnerHTML={{ __html: item.content }} />
          {/* {convertHtmlToReact(item.content)} */}
        </HistoryBlock>
      ))}
    </section>
  );
};