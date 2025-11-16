import { HeroForm } from "@/components/features/Contact/HeroForm";
import { OtherCompany } from "@/components/features/Contact/OtherCompany";
import { companyAddressService } from "@/services/Contact/ContactService";
import { ContactPageProps } from "@/types/Contact/Contact";
// import { useTranslations } from "next-intl";

export default async function Page({params: {locale}}: ContactPageProps) {
  const [getContactPageData, companyAddressData, getContactData] = await Promise.all([
    companyAddressService.getContactPageData(locale),
    companyAddressService.getCompanyAddressPageData(locale),
    companyAddressService.getContactData(locale)
  ])

  return (
    <main>
      <HeroForm contactData={getContactData} 
        pageData={getContactPageData}/>
      <OtherCompany companyAddressData={companyAddressData} />
    </main>
  );
}
