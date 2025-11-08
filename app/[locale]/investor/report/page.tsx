import { FinancialBanner } from "@/components/features/Investor/Report/FinancialBanner";
import { FinancialCalendar } from "@/components/features/Investor/Report/FinancialCalendar";
import { FinancialTable } from "@/components/features/Investor/Report/FinancialTable";
import { Hero } from "@/components/features/Investor/Report/Hero";
import { SupportingInstitutions } from "@/components/features/Investor/Report/Institutions";
import { reportService } from "@/services/Investor/ReportServices";
// import { useTranslations } from "next-intl";

export default async function Page() {
  // const t = useTranslations("homepage");

  const [reportData, financialData, institutions] = await Promise.all([
    reportService.getReportPageData(),
    reportService.getFinancialData(),
    reportService.getInstitutionsData(),
  ]);

  const {
    investor_report_banner,
    investor_report_overview,
    investor_report_table,
  } = reportData;

  return (
    <main>
      <Hero
        imageSrc={investor_report_banner.file_url}
        title={investor_report_banner.title || "Investor Report"}
        subtitle={investor_report_banner.content}
        iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <FinancialBanner data={investor_report_overview} />
      <FinancialTable data={investor_report_table} />
      <SupportingInstitutions data={institutions} />
      <FinancialCalendar initialData={financialData} />
    </main>
  );
}
