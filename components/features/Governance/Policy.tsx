import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const TITLE = "Policy";
const CONTENT_HTML = `
  <p>CDI Group is committed to implementing the CDI Group Code of Ethics, as well as upholding and complying with relevant provisions that apply both domestically and internationally. This policy is supported by good business practices and ethical corporate governance to fulfil our obligations to shareholders and stakeholders and must be followed to by all CDI Group employees</p>
`;
const LINK_URL = "https://chandradaya-investasi.com/governance/policy";

export function Policy() {
  return (
    <section
      id="policy"
      aria-labelledby="policy-heading"
      className="bg-[#051119] py-20 text-white"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-8">
          <div className="lg:col-span-3">
            
            <h2
              id="policy-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            />
            
            <Link
              href={LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-white flex items-center gap-2 w-fit mt-8"
            >
              See All
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="lg:col-span-2">
          </div>
        </div>
      </div>
    </section>
  );
}