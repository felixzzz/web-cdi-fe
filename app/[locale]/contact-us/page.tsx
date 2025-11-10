import { HeroForm } from "@/components/features/Contact/HeroForm";
import { OtherCompany } from "@/components/features/Contact/OtherCompany";
import { companyAddressService } from "@/services/Contact/ContactService";
import { ContactPageProps } from "@/types/Contact/Contact";
// import { useTranslations } from "next-intl";

export default async function Page({params: {locale}}: ContactPageProps) {
  // const t = useTranslations("homepage");

  const companyAddressData = await companyAddressService.getCompanyAddressPageData(locale);

  return (
    <main>
      <HeroForm />
      <OtherCompany companyAddressData={companyAddressData} />
    </main>
  );
}
