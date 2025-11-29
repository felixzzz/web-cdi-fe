"use client"; 

import React from "react";
import { Phone, Printer } from "lucide-react";
import {
  OtherCompanyAddressesApiResponse,
  LocalizedContactAddress,
} from "@/types/Contact/Contact";
import { useTranslations } from "next-intl";

interface OtherCompanyProps {
  companyAddressData: OtherCompanyAddressesApiResponse;
}

export function OtherCompany({ companyAddressData }: OtherCompanyProps) {
  const t = useTranslations('Contact')
  return (
    <section
      aria-labelledby="other-addresses-heading"
      className="bg-[#F6F6F6] py-20"
    >
      <div data-navbar-theme="dark" className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-44 2xl:px-44">
        <h2
          id="other-addresses-heading"
          className="text-neutral-13 text-2xl md:text-[38px] md:leading-[44px] font-medium pb-8 w-full border-b border-b-neutral-6 mb-8"
        >
          {t('other_company')}
        </h2>

        <ol className="flex flex-col gap-10">
          {companyAddressData.map((company, index) => {
            const locations: LocalizedContactAddress[] = [
              company.localized_main,
              ...company.localized_branches,
            ];

            return (
              <li key={company.id} className="flex gap-2">
                <p
                  className="text-neutral-300 font-medium text-[52px]"
                  aria-hidden="true"
                >
                  {index + 1}
                </p>
                <div className="rounded-xl border border-neutral-50 p-4 bg-white w-full">
                  <h3 className="mb-4 text-[22px] text-[#2474A5] font-medium">
                    {company.name}
                  </h3>

                  {locations.map((loc, locIndex) => (
                    <div
                      key={locIndex}
                      className={
                        locIndex > 0
                          ? "mt-4 pt-4 border-t border-t-neutral-4"
                          : ""
                      }
                    >
                      <div className="flex flex-col gap-2">
                        {loc.location_name && loc.location_name !== "-" && (
                          <p className="text-neutral-13 text-sm font-medium">
                            {loc.location_name}
                          </p>
                        )}
                        <address className="text-neutral-8 text-sm not-italic text-neutral-500">
                          {loc.address}
                        </address>
                        <div className="flex items-center gap-4 text-neutral-500">
                          {loc.phone && (
                            <div className="flex items-center text-xs md:text-sm gap-2">
                              <Phone className="text-[#2474A5]" size={14} aria-hidden="true" /> {loc.phone}
                            </div>
                          )}
                          {loc.fax && (
                            <div className="flex items-center text-xs md:text-sm gap-2">
                              <Printer className="text-[#2474A5]" size={14} aria-hidden="true" /> {loc.fax}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}