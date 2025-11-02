import Link from "next/link";
import Image from "next/image";
import { ReportItem, ReportItemProps } from "./ReportItem";
import { Languages, MoveRight } from "lucide-react";

interface ReportSectionProps {
  eyebrow: string;
  title: string;
  downloadAllUrl: string;
  seeAllUrl: string;
  reports: ReportItemProps[];
}

export const Report: React.FC<ReportSectionProps> = ({
  eyebrow,
  title,
  downloadAllUrl,
  seeAllUrl,
  reports,
}) => {
  return (
    <section
      id="home_report"
      data-navbar-theme="light"
      className="py-20 bg-[#F6F6F6]"
      aria-labelledby="report-section-title"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="flex lg:items-center justify-between mb-2 flex-col lg:flex-row">
          <div>
            <p className="text-neutral-500 text-base mb-4">{eyebrow}</p>
            <h2
              id="report-section-title"
              className="text-neutral-13 font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-0"
            >
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-4 justify-start lg:justify-center mt-4 lg:mt-0">
            <Link
              href={downloadAllUrl}
              className="px-6 py-2 rounded-full whitespace-nowrap border border-blue-base flex items-center gap-2 text-[#2474A5]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download All
              <Image
                src="https://chandradaya-investasi.com/assets/frontend/icons/ic_download.svg"
                width={16}
                height={16}
                alt="Download icon"
                className="inline-block"
              />
            </Link>
            <Link
              href={seeAllUrl}
              className="px-6 py-2 rounded-full whitespace-nowrap border border-blue-base flex items-center gap-2 text-[#2474A5]"
            >
              See All
              <MoveRight className="font-light" size={16} />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-sm bg-[#ECF8FF] border border-light-blue-2 text-[#2474A5] text-xs w-fit p-[6px]">
          <Languages size={16} /> 
          <span>
            Documents are available in both English and Bahasa Indonesia. Change
            the website language to view them in another language.
          </span>
        </div>

        <ul className="mt-4">
          {reports.map((report) => (
            <ReportItem key={report.title} {...report} />
          ))}
        </ul>
      </div>
    </section>
  );
};