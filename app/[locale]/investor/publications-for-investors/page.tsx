import { Hero } from "@/components/features/Investor/PublicationsForInvestors/Hero";
import { Publications } from "@/components/features/Investor/PublicationsForInvestors/Publications";
import { publicationService } from "@/services/Investor/PublicationServices";
import { PublicationPageProps } from "@/types/Investor/Publication";
// import { useTranslations } from "next-intl";

export default async function Page({ params: { locale } }: PublicationPageProps) {
  // const t = useTranslations("homepage");

  const publicationData = await publicationService.getPublicationPageData(locale);

  const initialTab = "prospectus";
  const initialData = await publicationService.getPublicationTabData(
    locale,
    initialTab,
    1
  );

  const { investor_publication_banner } = publicationData;

  return (
    <main>
      <Hero
        imageSrc={investor_publication_banner.file_url}
        title={
          investor_publication_banner.title ||
          "Financial Information for Investors"
        }
        iconSrc="https://chandradaya-investasi.com/assets/frontend/icons/ic_hero_circle_arrow_down.svg"
      />
      <Publications locale={locale} initialData={initialData} initialTab={initialTab} />
    </main>
  );
}
