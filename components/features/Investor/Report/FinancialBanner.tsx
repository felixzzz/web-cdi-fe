import Image from "next/image";
import { SimpleInvestorSection } from "@/types/Investor/Report"; 

interface FinancialBannerProps {
  data: SimpleInvestorSection;
}

export function FinancialBanner({ data }: FinancialBannerProps) {
  const backgroundImageUrl = data.file_url;
  const title = data.title || "";
  const descriptionHtml = data.content || "";

  return (
    <section
      aria-labelledby="financial-banner-heading"
      className="container mx-auto   mt-28 mb-16"
    >
      <div data-navbar-theme="dark" className="p-6 rounded-3xl w-full bg-blue-base relative overflow-hidden">
        <Image
          src={backgroundImageUrl}
          alt={title || "Financial Banner"} 
          title={title || "Financial Banner"} 
          fill
          className="object-cover z-0 object-[20%_center] lg:object-[65%_center]"
          priority
        />

        <div className="relative z-10 flex flex-col w-full items-center text-center gap-6">
          <h2
            id="financial-banner-heading"
            className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] text-white max-w-[600px] lg:max-w-[680px]"
          >
            {title}
          </h2>

          <div
          className="prose prose-invert prose-base text-sm lg:text-base text-neutral-200 leading-snug lg:leading-loose text-justify w-full max-w-[864px] "
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></div>
        </div>
      </div>
    </section>
  );
}