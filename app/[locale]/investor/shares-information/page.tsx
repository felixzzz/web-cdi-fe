import { Hero } from "@/components/features/Investor/SharesInformation/Hero";
import { StocksInformation } from "@/components/features/Investor/SharesInformation/Stoks";
import { sharesService } from "@/services/Investor/SharesServices";
import { TableInvestorSection } from "@/types/Investor/Shares";
// import { useTranslations } from "next-intl";

export default async function Page() {
  // const t = useTranslations("homepage");

    const SharesData = await sharesService.getSharesPageData();

    const {
    investor_share_banner,
    investor_share_tab_one,
    investor_share_tab_two,
    investor_share_shareholders_table,
    investor_share_dividend_table,
    investor_share_shareholders_table_show,
    investor_share_dividend_table_show,
  } = SharesData;

  return (
    <main>
      <Hero
        imageSrc={investor_share_banner.file_url}
        title={investor_share_banner.title || "Stocks and Bonds"}
        subtitle={investor_share_banner.content}
        iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <StocksInformation
        tabOneTitle={investor_share_tab_one.title}
        tabTwoTitle={investor_share_tab_two.title}
        shareholdersData={
          investor_share_shareholders_table as TableInvestorSection
        }
        dividendData={investor_share_dividend_table as TableInvestorSection}
        showShareholders={
          investor_share_shareholders_table_show.content !== "hide"
        }
        showDividend={investor_share_dividend_table_show.content !== "hide"}
      />
    </main>
  );
}
