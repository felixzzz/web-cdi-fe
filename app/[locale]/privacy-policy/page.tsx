import { informationService } from "@/services/Global/informationService";

interface PageProps {
  params: {
    locale: "en" | "id";
  };
}

export default async function Page({ params: { locale } }: PageProps) {
  const data = await informationService.getCredentialData(locale);

  const termsData = data.privacy_policy;

  if (!termsData) {
    return (
      <section className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44 py-[25%] md:py-[8%]">
        <h1 className="text-neutral-13 font-medium text-2xl lg:text-[28px] mb-5">
          Content not available.
        </h1>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44 py-[25%] md:py-[8%]">
      <h1 className="text-neutral-900 font-medium text-2xl lg:text-[28px] mb-5">
        {termsData.title}
      </h1>
      <div
        className="prose prose-base text-neutral-900 text-[12px] leading-[24px] w-full max-w-full"
        dangerouslySetInnerHTML={{ __html: termsData.content || "" }}
      />
    </section>
  );
}
