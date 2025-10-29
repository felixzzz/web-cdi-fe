import { HeroForm } from "@/components/features/Contact/HeroForm";
import { OtherCompany } from "@/components/features/Contact/OtherCompany";
import { companyAddressService } from "@/services/Contact/ContactService";
// import { useTranslations } from "next-intl";

export default async function Page() {
  // const t = useTranslations("homepage");

  const companyAddressData = await companyAddressService.getCompanyAddressPageData();

  return (
    <main>
      <HeroForm />
      <OtherCompany companyAddressData={companyAddressData} />
    </main>
  );
}
