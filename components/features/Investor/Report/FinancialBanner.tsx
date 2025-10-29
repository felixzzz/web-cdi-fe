import Image from "next/image";
import { SimpleInvestorSection } from "@/types/Investor/Report"; // 1. Import the type

// 2. Define the props interface
interface FinancialBannerProps {
  data: SimpleInvestorSection;
}

export function FinancialBanner({ data }: FinancialBannerProps) {
  // 3. Use the props for dynamic content
  const backgroundImageUrl = data.file_url;
  const title = data.title || "";
  const descriptionHtml = data.content || "";

  return (
    <section
      aria-labelledby="financial-banner-heading"
      className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] mt-28 mb-16"
    >
      <div className="p-6 rounded-3xl w-full bg-blue-base relative overflow-hidden">
        <Image
          src={backgroundImageUrl}
          alt={title || "Financial Banner"} // Use title for alt text
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />

        <div className="relative z-10 flex flex-col w-full items-center text-center gap-6">
          <h2
            id="financial-banner-heading"
            className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] text-white max-w-[680px]"
          >
            {title}
          </h2>

          <div
            className="content !text-white max-w-[864px] font-light"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></div>
        </div>
      </div>
    </section>
  );
}