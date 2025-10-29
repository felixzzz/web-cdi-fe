import { Download, Eye, FileText } from "lucide-react";

export interface ReportItemProps {
  title: string;
  date: string;
  size: string;
  viewUrl: string;
  downloadUrl: string;
}

export const ReportItem: React.FC<ReportItemProps> = ({
  title,
  date,
  size,
  viewUrl,
  downloadUrl,
}) => {
  return (
    <li className="py-8 border-b border-b-neutral-5 flex lg:items-center justify-between flex-col lg:flex-row gap-y-2 lg:gap-y-0">
      <div>
        <h3 className="text-neutral-13 mb-2 text-lg font-medium">{title}</h3>
        <div className="flex items-center text-base text-neutral-8 gap-3">
          <div className="flex items-baseline gap-3">
            <span>{date}</span>
            <span>.</span>
            <span>{size}</span>
            <span>.</span>
          </div>
          <FileText size={16} />
        </div>
      </div>

      <div className="flex lg:items-center gap-8 w-full lg:w-fit">
        <a
          href={viewUrl}
          className="flex items-center gap-2 text-blue-base font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Eye size={16} />
          View
        </a>
        <a
          href={downloadUrl}
          className="flex items-center gap-2 text-blue-base font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download size={16} />
          Download
        </a>
      </div>
    </li>
  );
};
