import React from "react";
import { HistoryBlock } from "./HistoryBlock";

const historyBlock1 = {
  bg: "https://chandradaya-investasi.com/file-storage/cjhFa0pFQkhERzFiSHFJSFlKMGxsZmhpSkcxQ1hnUmZCSjF3L3huWmVvQTYwaGZUaWlRWExzb3J4aUpRR3h2YWJpaWJKMlhrQ3VvVnFVKytLZUt6OWc9PQ.webp",
  eyebrow: "Our History",
  title: "Cilegon as an Industrial Hub",
};

const historyBlock2 = {
  bg: "https://chandradaya-investasi.com/file-storage/aXhDVURzNXR0MnM1ZFFPWktrbGU3OU8zcnJveGVJelBsbUFUL1V6dk5SWDJucWFTZjVZWGRCUUZVclJNQ2RicXBOR1FLZTRUeWI0NWNRMUxqRU1sakE9PQ.webp",
  eyebrow: "Our History",
  title: "Expanding Business Horizons in Infrastructure Development",
};

export const History: React.FC = () => {
  return (
    <section id="our-history">
      <HistoryBlock
        backgroundImageUrl={historyBlock1.bg}
        eyebrow={historyBlock1.eyebrow}
        title={historyBlock1.title}
      >
        <p className="ql-align-justify">
          <span style={{
              backgroundColor: "transparent",
              color: "rgb(255, 255, 255)",
            }} className="">
            Located in Banten Province on the southern coast of Java Island,
            Cilegon offers strategic access to international ports and is
            ideally situated near Jakarta, making it prime location for
            industrial activities. Its geographic advantage ensures efficient
            logistics and the seamless distribution good, establishing Cilegon
            as a key player in Indonesia{"'"}s industrial landscape...
          </span>
        </p>
        <p className="ql-align-justify">
          <span style={{
              backgroundColor: "transparent",
              color: "rgb(255, 255, 255)",
            }}>
            The Indonesian government strongly supports the growth of Cilegon
            with policies designed to foster the development of industrial
            sector. This includes ongoing infrastructure upgrades, investment
            incentives, and regulatory support, all of which have attracted
            numerous large domestic and international companies to establish
            operations in the area.&nbsp;
          </span>
        </p>
      </HistoryBlock>

      <HistoryBlock
        backgroundImageUrl={historyBlock2.bg}
        eyebrow={historyBlock2.eyebrow}
        title={historyBlock2.title}
      >
        <p className="ql-align-justify">
          <span
            style={{
              backgroundColor: "transparent",
              color: "rgb(255, 255, 255)",
            }}
          >
            CDI Group recognizes significant opportunities to develop
            infrastructure across Java/Indonesia, where the demand for robust
            and sustainable infrastructure is rapidly growing. Leveraging
            Cilegon{"'"}s strategic position as an industrial hub and the
            broader potential of the region, CDI Group is poised to expand its
            influence and contribute to the nation{"'"}s development.&nbsp;
          </span>
        </p>
        <p className="ql-align-justify">
          <span
            style={{
              backgroundColor: "transparent",
              color: "rgb(255, 255, 255)",
            }}
          >
            With diversified portfolio spanning industrial water, energy, port
            and storage services, and logistics, CDI Group is building a strong
            presence in key infrastructure.&nbsp;
          </span>
        </p>
      </HistoryBlock>
    </section>
  );
};
