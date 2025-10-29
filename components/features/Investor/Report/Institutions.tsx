import Image from "next/image";
import React from "react";

const institutionsData = [
  {
    id: "1",
    name: "PT Datindo Entrycom",
    role: "SHARE REGISTRAR",
    address: "Jl. Hayam Wuruk No. 28, Lt. 2, Jakarta 10120, Indonesia",
    phone: "(62-21) 3508077",
    fax: "(62-21) 3508076",
  },
  {
    id: "2",
    name: "Liana Ramon Xenia & Rekan",
    role: "PUBLIC ACCOUNTING FIRM",
    address:
      "The Plaza Office Tower Lt. 32 Jl. M. H. Thamrin Kav. 28 – 30 Jakarta 10350",
    phone: "(62-21) 5081 8000",
    fax: "(62-21) 2992 8300",
  },
];

const phoneIconUrl =
  "https://chandradaya-investasi.com/assets/frontend/icons/ic_phone.svg";
const faxIconUrl =
  "https://chandradaya-investasi.com/assets/frontend/icons/ic_printer.svg";

export function SupportingInstitutions() {
  return (
    <section
      aria-labelledby="institutions-heading"
      className="bg-[#F6F6F6] py-20"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <h2
          id="institutions-heading"
          className="text-neutral-13 text-2xl lg:text-[38px] lg:leading-[44px] font-medium pb-8 w-full border-b border-b-neutral-6 mb-8"
        >
          Supporting Institutions & Professionals
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {institutionsData.map((inst) => (
            <div key={inst.id} className="flex gap-2">
              <p className="text-neutral-7/30 font-medium text-[52px]">
                {inst.id}
              </p>
              <div className="rounded-xl border border-neutral-4 p-4 bg-white w-full">
                <h3 className="mb-4 text-[22px] text-blue-base font-medium">
                  {inst.name}
                </h3>

                <div className="flex flex-col gap-2">
                  <p className="text-neutral-13 text-sm font-medium">
                    {inst.role}
                  </p>

                  <address className="text-neutral-8 text-sm not-italic">
                    {inst.address}
                  </address>

                  <div className="flex items-center gap-4 text-neutral-8">
                    <div className="flex items-center text-sm gap-2">
                      <Image src={phoneIconUrl} alt="" width={16} height={16} />
                      Tel. {inst.phone}
                    </div>
                    <div className="flex items-center text-sm gap-2">
                      <Image src={faxIconUrl} alt="" width={16} height={16} />
                      Fax. {inst.fax}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportingInstitutions;
