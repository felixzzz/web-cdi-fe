import React from "react";
// import Link from "next/link";
// import { Download } from "lucide-react";
import { ApiDataItem } from "@/types/Sustainabilitys/Social";

interface HumanRightsProps {
  data: ApiDataItem;
}

export function HumanRights({ data }: HumanRightsProps) {
  const TITLE = data.title || "Human Rights";
  const CONTENT_HTML = data.content || "";
  // const fileInfo = data.file_information;

  return (
    <section
      aria-labelledby="human-rights-heading"
      className="py-28 text-white bg-[#051119] !bg-blue-dark-black relative"
    >
      <div className="container mx-auto   relative z-[1]">
        <div className="flex flex-col gap-8 lg:max-w-[100%] me-auto">
          <div>
            <h2
              id="human-rights-heading"
              className="text-2xl md:text-[38px] md:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>

            <div
              className="prose prose-invert prose-base max-w-full text-sm md:text-base leading-snug md:leading-loose text-justify text-neutral-300"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            ></div>

            {/* {fileInfo && (
              <div className="mt-8">
                <Link
                  href={`https://cdi-be.cmlabs.dev/file-storage/${fileInfo.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-blue-sky px-6 py-3 font-medium text-blue-dark transition-all hover:bg-blue-sky/90"
                >
                  <Download size={20} />
                  <span>
                    Download Policy
                    {fileInfo.format && ` (.${fileInfo.format})`}
                  </span>
                </Link>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}