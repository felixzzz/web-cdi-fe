import Image from "next/image";
import React from "react";
import { ApiInstitutionResponse } from "@/types/Investor/Report"; 
import { useTranslations } from "next-intl";

const phoneIconUrl =
  "/assets/icons/ic_phone.svg";
const faxIconUrl =
  "/assets/icons/ic_printer.svg";

interface SupportingInstitutionsProps {
  data: ApiInstitutionResponse;
}

export const SupportingInstitutions = ({
  data,
}: SupportingInstitutionsProps) => {
  const t = useTranslations('Investor.Report')
  return (
    <section
    data-navbar-theme="dark"
      aria-labelledby="institutions-heading"
      className="bg-[#F6F6F6] py-20"
    >
      <div className="container mx-auto  ">
        <h2
          id="institutions-heading"
          className="text-neutral-13 text-2xl md:text-[38px] md:leading-[44px] font-medium pb-8 w-full border-b border-b-neutral-400 mb-8"
        >
          {t('institution_title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {data.map((item, index) => (
            <div key={item.id} className="flex gap-2">
              <p className="text-neutral-300 font-medium text-[52px]">
                {index + 1}
              </p>
              <div className="rounded-xl border border-neutral-4 p-4 bg-white w-full">
                <h3 className="mb-4 text-[22px] text-[#2474A5] font-medium">
                  {item.name}
                </h3>

                <div className="flex flex-col gap-2">
                  <p className="text-neutral-950 text-sm font-medium">
                    {item.localized_main.location_name}
                  </p>

                  <address className="text-neutral-600 text-sm not-italic">
                    {item.localized_main.address}
                  </address>

                  <div className="flex items-center gap-4 text-neutral-600">
                    <div className="flex items-center text-sm gap-2">
                      <Image src={phoneIconUrl} alt="" width={20} height={20} />
                      {item.localized_main.phone}
                    </div>
                    <div className="flex items-center text-sm gap-2">
                      <Image src={faxIconUrl} alt="" width={20} height={20} />
                      {item.localized_main.fax}
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
};