import { FinancialCalendar } from "@/components/features/Investor/FinancialInformation/FinancialCalendar";
import { Hero } from "@/components/features/Investor/FinancialInformation/Hero";
import { financialService } from "@/services/Investor/FinancialServices";
// import { useTranslations } from "next-intl";

export default async function Page() {
  // const t = useTranslations("homepage");

  const financialData = await financialService.getFinancialPageData();

  const { investor_financial_banner } = financialData;

  return (
    <main>
      <Hero
        imageSrc={investor_financial_banner.file_url}
        title={
          investor_financial_banner.title ||
          "Financial Information for Investors"
        }
        iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <FinancialCalendar />
    </main>
  );
}
