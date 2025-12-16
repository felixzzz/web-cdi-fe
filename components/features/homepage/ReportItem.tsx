import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface ReportItemProps {
  title: string;
  date: string;
  size: string;
  viewUrl: string;
  downloadUrl: string;
  tagView: string;
  tagDawnload: string;
}

export const ReportItem: React.FC<ReportItemProps> = ({
  title,
  date,
  size,
  viewUrl,
  downloadUrl,
  tagView,
  tagDawnload,
}) => {
  return (
    <li className="py-8 border-b border-b-neutral-5 flex justify-between flex-col gap-y-2 lg:gap-y-0">
      <div className="w-full">
        <h3 className="text-neutral-13 mb-2 text-lg font-medium">{title}</h3>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8 w-full">
        <div className="flex items-center text-base text-neutral-8 gap-3">
          <div className="flex items-baseline gap-3">
            <span>{date}</span>
            <span>.</span>
            <span>{size}</span>
            <span>.</span>
          </div>
          <Image
            title="icon"
            src="/assets/icons/ic_filepdf.svg"
            width={28}
            height={20}
            alt="See all icon"
            className="inline-block"
          />
        </div>
        <div className="flex flex-row gap-8">
          <Link
            title={title}
            href={viewUrl}
            className="flex items-center gap-2 text-blue-base font-medium text-[#2474A5]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              title="icon"
              src="/assets/icons/ic_eye.svg"
              width={24}
              height={24}
              alt="See all icon"
              className="inline-block"
            />
            {tagView}
          </Link>
          <Link
            title={title}
            href={downloadUrl}
            className="flex items-center gap-2 text-blue-base font-medium text-[#2474A5]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              title="icon"
              src="/assets/icons/ic_download_file.svg"
              width={24}
              height={24}
              alt="Download icon"
              className="inline-block"
            />
            {tagDawnload}
          </Link>
        </div>
      </div>
    </li>
  );
};
