import Link from "next/link";
import Image from "next/image";
import { Languages, MoveRight } from "lucide-react";
import { ApiReportItem } from "@/types/Homepage/home";
import { useTranslations } from "next-intl";
import { ReportItem, ReportItemProps } from "./ReportItem";

interface ReportSectionProps {
  eyebrow: string;
  title: string;
  downloadAllUrl: string;
  seeAllUrl: string;
  reports: ApiReportItem[];
  locale: string;
}

export const Report: React.FC<ReportSectionProps> = ({
  eyebrow,
  title,
  downloadAllUrl,
  seeAllUrl,
  reports,
  locale,
}) => {
  const t = useTranslations("Report")
  return (
    <section
      id="home_report"
      className="py-20 bg-[#F6F6F6]"
      aria-labelledby="report-section-title"
    >
      <div data-navbar-theme="dark" className="container mx-auto  ">
        <div className="flex lg:items-center justify-between mb-2 flex-col md:flex-row">
          <div>
            <p className="text-neutral-500 text-base mb-4">{eyebrow}</p>
            <h2
              id="report-section-title"
              className="text-neutral-13 font-medium text-2xl md:text-[38px] md:leading-[44px] mb-0"
            >
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-4 justify-start lg:justify-center mt-4 lg:mt-0">
            <Link
              href={downloadAllUrl}
              className="px-6 py-2 rounded-full whitespace-nowrap border border-[#2474A5] flex items-center gap-2 text-[#2474A5]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('dawnload_title')}
              <Image
                src="/assets/icons/ic_download.svg"
                width={16}
                height={16}
                alt="Download icon"
                className="inline-block"
              />
            </Link>
            <Link
              href={seeAllUrl}
              className="px-6 py-2 rounded-full whitespace-nowrap border border-[#2474A5] flex items-center gap-2 text-[#2474A5]"
              >
              {t('see_title')}
              <MoveRight className="font-light" size={16} />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-sm bg-[#ECF8FF] border border-light-blue-2 text-[#2474A5] text-xs w-fit p-[6px]">
          <Languages size={16} />
          <span>
              {t('description')}
          </span>
        </div>

        <ul className="mt-4">
          {reports.map((report) => {
            const transformedProps: ReportItemProps = {
              title: report.name,
              date: report.date,
              size: report.file.size,
              tagView: t('download_view'),
              tagDawnload: t('download_download'),
              viewUrl: `${process.env.NEXT_PUBLIC_URL}/file/preview/${locale}/report/${report.ulid}/${report.name_slug}`,
              downloadUrl: `${process.env.NEXT_PUBLIC_URL}/file/download/${locale}/report/${report.ulid}/`,
            };

            return <ReportItem key={report.id} {...transformedProps} />;
          })}
        </ul>
      </div>
    </section>
  );
};