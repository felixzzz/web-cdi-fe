import { Link } from "@/i18n/navigation";
import React from "react";

interface SustainabilitySectionProps {
  policyData: {
    title: string | null;
    content: string | null;
  };
  fileData: {
    title: string | null;
    file_url: string | null;
  };
}

export function SustainabilitySection({ policyData, fileData }: SustainabilitySectionProps) {
  return (
    <section className="bg-gray-100 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h2 className="text-2xl lg:text-4xl font-semibold text-gray-900 leading-tight">
              {policyData?.title || "Sustainability Policy"}
            </h2>
          </div>

          <div className="max-w-xl">
            {policyData?.content && (
              <div
                className="text-gray-600 text-sm lg:text-base leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: policyData.content }}
              />
            )}

            <Link
              href={fileData?.file_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#47C1EA] text-white text-sm font-medium hover:bg-[#36a9cf] transition"
            >
              {fileData?.title || "Download"}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}