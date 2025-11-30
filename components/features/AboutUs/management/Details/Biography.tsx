type BocBiographyProps = {
  biographyHtml: string;
};

export const BocBiography = ({ biographyHtml }: BocBiographyProps) => {
  if (!biographyHtml) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44 my-16">
      <div
        className="max-w-full prose prose-invert prose-base text-[10px] md:text-[12px] leading-normal md:leading-[24px] text-justify text-neutral-900"
        dangerouslySetInnerHTML={{ __html: biographyHtml }}
      />
    </section>
  );
};
