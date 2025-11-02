import Image from "next/image";
import React from "react";
import { Eye, Download } from "lucide-react";

const data = {
  person: {
    name: "Jaka Dibya Ananta Satari",
    title: "Corporate Secretary",
    imageUrl:
      "https://chandradaya-investasi.com/file-storage/NzFsMytiWU1hdHRFU3c0YzREYTlRUE90Zkg3dkloN01BU1ZYbmNyUlg1dFZ6czJEWVlnVGI0YW4rQW1XeTZmcVYxWFNqOUpsLzVjSUlENTRPY3Z2YkE9PQ.webp",
  },
  section: {
    title: "Corporate Secretary",
    contentHtml: `
      <p>In order to improve transparency, service, and communication to the stakeholders as the implementation of good corporate governance principles, CDI Group appointed a Corporate Secretary who is responsible directly to the Board of Directors.</p>
      <p>Corporate Secretary plays an important role in maintaining relationships with all stakeholders in order to communicate CDI Group’s activities well, especially regarding the disclosure of information. This is in accordance with the provisions set out in the Financial Services Authority Regulation No. 35/ POJK.04 /2014 concerning Corporate Secretary of Issuer or Public Company.</p>
      <p>Duties and responsibilities of Corporate Secretary are as follows:</p>
      <ol>
        <li data-list="ordered">Manage information related to the business environment and conduct correspondence with interested party in the capital markets, including the Financial Services Authority (OJK) and Indonesia Stock Exchange (IDX).</li>
        <li data-list="ordered">Ensure the Company implements GCG principles and comply with applicable laws and regulations on the stock exchange and capital markets, including the Law of Limited Liability Company.</li>
        <li data-list="ordered">Organize GMS, Meeting of the Board of Directors and Board of Commissioners, and Board of Directors Meeting.</li>
        <li data-list="ordered">Organize communication activity between Management with stakeholders in order to build the image of the Company.</li>
        <li data-list="ordered">Organize secretarial activities of CDI Group’s Management as well as facilitating the relationship of the Company/Management with stakeholders.</li>
      </ol>
    `,
  },
  cta: {
    title: "Articles of Association",
    fileSize: "776.53 KB",
    viewUrl:
      "https://chandradaya-investasi.com/file/preview/default/corporate_secretary/Corporate_Secretary_01/Articles of Association",
    downloadUrl:
      "https://chandradaya-investasi.com/file/download/default/corporate_secretary/Corporate_Secretary_01/",
  },
};

export function CorporateSecretary() {
  return (
    <section
      id="corporate-secretary"
      aria-labelledby="corporate-secretary-heading"
      className="pt-20 bg-[#091A24] text-white"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <aside className="lg:col-span-2">
            <div className="relative aspect-square w-full rounded-[20px] overflow-hidden mb-6">
              <Image
                src={data.person.imageUrl}
                alt={data.person.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="mb-3 font-medium text-lg lg:text-[22px]">
              {data.person.name}
            </h3>
            <p className="prose prose-invert prose-base content text-sm lg:text-base !font-light !text-white">
              {data.person.title}
            </p>
          </aside>

          <main className="lg:col-span-3">
            <h2
              id="corporate-secretary-heading"
              className="text-2xl lg:text-[38px] lg:leading-[44px] font-medium mb-4"
            >
              {data.section.title}
            </h2>
            <div
              className="max-w-full prose prose-invert prose-base"
              dangerouslySetInnerHTML={{ __html: data.section.contentHtml }}
            />

            <div
              className="mt-8 p-6 flex flex-col md:flex-row md:items-center md:justify-between w-full
              border 
              bg-[linear-gradient(#d6f5ff29,#091a2429)] 
              rounded-lg"
              style={{
                borderColor: "color-mix(in oklab, #676869 40%, transparent)",
              }}
            >
              <div className="flex flex-col gap-2 mb-4 md:mb-0">
                <h3 className="text-2xl font-medium">{data.cta.title}</h3>
                <div className="flex items-center text-base text-white gap-2">
                  <span className="text-sm">{data.cta.fileSize}</span>
                  <span className="text-sm">.</span>
                  <Image
                    src="https://chandradaya-investasi.com/assets/frontend/icons/ic_filepdf_white.svg"
                    width={26}
                    height={20}
                    alt="See all icon"
                    className="inline-block"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href={data.cta.viewUrl}
                  className="flex items-center gap-2 text-white font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye size={20} /> View
                </a>
                <a
                  href={data.cta.downloadUrl}
                  className="flex items-center gap-2 text-white font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={20} /> Download
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
