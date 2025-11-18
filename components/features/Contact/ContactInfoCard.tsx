// components/features/ContactUs/ContactInfoCard.tsx
import Image from "next/image";
import React from "react";

interface ContactInfoCardProps {
  imageSrc: string;
  imageAlt: string;
  companyName: string;
  companySubtitle: string;
  address: string;
  phone: string;
  email: string;
  hastag: string;
}

export function ContactInfoCard({
  imageSrc,
  imageAlt,
  companyName,
  companySubtitle,
  address,
  phone,
  email,
  hastag,
}: ContactInfoCardProps) {
  return (
    <div className="relative lg:max-h-[675px] lg:max-w-[456px] h-full rounded-xl flex flex-col p-6 justify-between max-lg:min-h-[456px] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div className="relative z-10">
        <p className="mb-0 text-[22px] font-medium text-white">
         {hastag}
        </p>
      </div>

      <div className="relative z-10 rounded-xl border border-neutral-400 p-4 bg-white">
        <div className="mb-1 flex flex-col gap-2">
          <span className="text-[22px] text-[#47C1EA] font-medium">
            {companyName}
          </span>
          <p className="text-base text-neutral-800 font-medium">
            {companySubtitle}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <address className="text-neutral-800 text-sm not-italic">
            {address}
          </address>
          <div className="flex items-center gap-x-4 gap-y-2 text-neutral-800 flex-wrap">
            <div className="flex items-center text-xs gap-2">
              <Image
                src="https://chandradaya-investasi.com/assets/frontend/icons/ic_phone.svg"
                alt="Phone"
                width={14}
                height={14}
              />
              {phone}
            </div>
            <div className="flex items-center text-xs gap-2">
              <Image
                src="https://chandradaya-investasi.com/assets/frontend/icons/ic_printer.svg"
                alt="Fax"
                width={14}
                height={14}
              />
              {email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}