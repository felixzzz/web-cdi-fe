import Image from "next/image";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const SECTION_ID = "whistleblowing";
const TITLE = "Whistleblowing";
const CONTENT_HTML = `
  <p>The Whistleblowing Management Policy reflects our dedication to upholding our Code of Conduct. This system is designed as a tool to assist all CDI Group employees, including those in our subsidiaries and joint ventures and stakeholder including but not limited to business partner, supplier or vendor, customer, contractor, agent, consultant and/or any other third party who works with, for or represents CDI Group in are also encouraged to consult with or report any suspected violations to CDI Group management.</p>
`;
const LINK_URL = "https://chandradaya-investasi.com/governance/whistleblowing";
const IMAGE_URL =
  "https://chandradaya-investasi.com/file-storage/MVFzUEt2c2NxWFM2YnRBd1FGRS95ZjAyc2lYdFg1QmRBTUpXWEMxUjRNQXZPQVR3N01vUjBLR21MQkdOY3F0TnppbkdWWjNDVUtGdnVTQ2dmRVowZ3dySU1KSnc2OFEvK1M5L0ZmbFlZbnhFT25yTHp6YzJmNTdWek44TkJPdHg.webp";
const IMAGE_ALT = "Whistleblowing concept illustration";

export function Whistleblowing() {
  return (
    <section
      id={SECTION_ID}
      aria-labelledby="whistleblowing-heading"
      className="bg-[#091A24] py-20 text-white"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-8 ">
          <div className="lg:col-span-3">
            <h2
              id="whistleblowing-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {TITLE}
            </h2>
            <div
            className="max-w-full prose prose-invert prose-base"
              dangerouslySetInnerHTML={{ __html: CONTENT_HTML }}
            />
            <Link
              href={LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-white flex items-center gap-2 w-fit mt-8"
            >
              Submit Your Concerns
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-2">
            <Image
              src={IMAGE_URL}
              alt={IMAGE_ALT}
              width={600} 
              height={400} 
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}