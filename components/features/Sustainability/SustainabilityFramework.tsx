// src/components/features/Sustainability/SustainabilityFramework.tsx

"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MaterialityItem, MaterialityResponse } from "@/types/Sustainabilitys/Sustainability";

const ARROW_ICON_URL = `${process.env.NEXT_PUBLIC_URL}/assets/icons/ic_arrow_roulette.svg`;
const WHEEL_IMAGE_URL = `${process.env.NEXT_PUBLIC_URL}/assets/frontend/images/sustainability/spin_roulette.webp`;
const DOWNLOAD_ICON_URL = `${process.env.NEXT_PUBLIC_URL}/assets/frontend/icons/ic_download_white.svg`;
const CHECK_ICON_URL = `${process.env.NEXT_PUBLIC_URL}/assets/frontend/icons/ic_bold_duotone_check_circle.svg`;

interface FrameworkProps {
    data: MaterialityResponse;
    policyTitle: string;
    policyDescription: string;
    policyFileUrl: string;
}

export const SustainabilityFramework: React.FC<FrameworkProps> = ({
  data,
  policyTitle,
  policyDescription,
  policyFileUrl,
}) => {
  const initialItem = data.find(item => item.sort === 1) || data[0];
  const [activeItem, setActiveItem] = useState<MaterialityItem>(initialItem);

  const tabKeys = useMemo(() => data.map(item => item.key), [data]);

  const handleTabClick = (key: string) => {
    const selectedItem = data.find(item => item.key === key);
    if (selectedItem) {
      setActiveItem(selectedItem);
    }
  };
  
  const cleanHtmlContent = (html: string) => {
    return html.replace(/^<p>/i, '').replace(/<\/p>$/i, '');
  };

  return (
    <div className="text-white bg-[#091A24] py-20">
      <section className="container mx-auto  ">
        <h2 className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] pt-20 mb-4">
          {policyTitle || "Our Sustainability Policy and Framework"}
        </h2>
        <p className="content !text-neutral-6 max-lg:!text-sm mb-4">
            {policyDescription}
        </p>
        <Link 
          href={policyFileUrl} 
          className="px-6 py-2 rounded-full whitespace-nowrap bg-blue-base flex items-center gap-2 text-white mt-2 w-fit" 
          target="_blank"
        >
          Download Sustainability Policy
          <Image 
            src={DOWNLOAD_ICON_URL} 
            alt="Download Icon" 
            width={16} 
            height={16} 
          />
        </Link>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="w-[398px] mx-auto relative">
              <div className="absolute w-full z-[1]">
                <Image 
                  src={ARROW_ICON_URL} 
                  alt="Indicator Arrow" 
                  className="mx-auto" 
                  width={100} 
                  height={100} 
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
              <Image
                src={WHEEL_IMAGE_URL}
                alt="Sustainability Framework Wheel"
                className="w-[398px] mx-auto transition duration-500 ease-in-out"
                width={398}
                height={398}
                style={{
                  transform: `rotate(${activeItem.rotate}deg)`,
                }}
                priority
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="flex items-center border-b-2 border-b-neutral-6">
              {tabKeys.map((key) => (
                <div
                  key={key}
                  className={`px-6 py-4 text-base lg:text-lg cursor-pointer tab-gradient w-full text-center ${
                    activeItem.key === key
                      ? "text-white active"
                      : "text-neutral-4"
                  }`}
                  onClick={() => handleTabClick(key)}
                >
                  {key}
                </div>
              ))}
            </div>

            <div className="my-8">
                <div className="button-gradient-custom !gap-4 !flex-col !items-start">
                  <p className="font-medium text-[22px]">{activeItem.title}</p>
                  <p
                //    className="content !text-neutral-6 max-lg:!text-sm"
                className="prose prose-invert prose-base"
                  >
                    <span dangerouslySetInnerHTML={{ __html: cleanHtmlContent(activeItem.description) }} />
                  </p>
                  
                  {activeItem.points.map((point, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Image 
                        src={CHECK_ICON_URL} 
                        alt="Check icon" 
                        width={16} 
                        height={16} 
                      />
                      <p className="text-blue-base max-lg:text-sm">{point}</p>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// **Note on CSS:** You will need to define the following Tailwind/CSS classes
// based on your original Vue/CSS files:
// - `.bg-blue-dark`
// - `.bg-blue-base`
// - `.text-neutral-6`, `.text-neutral-4`, `.text-blue-base`
// - `.tab-gradient` and `.tab-gradient.active` (which handles the blue bottom border/gradient)
// - `.button-gradient-custom` (which seems to be a styled container for the content)