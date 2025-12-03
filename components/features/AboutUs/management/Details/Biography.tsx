type BocBiographyProps = {
  biographyHtml: string;
};

export const BocBiography = ({ biographyHtml }: BocBiographyProps) => {
  if (!biographyHtml) {
    return null;
  }

  return (
    <section className="container mx-auto   my-16">
      <div
        className="max-w-full prose prose-invert prose-base text-sm md:text-base leading-normal md:leading-[24px] text-justify text-neutral-900"
        dangerouslySetInnerHTML={{ __html: biographyHtml }}
      />
    </section>
  );
};
