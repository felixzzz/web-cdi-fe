type BocBiographyProps = {
  biographyHtml: string;
};

export const BocBiography = ({ biographyHtml }: BocBiographyProps) => {
  if (!biographyHtml) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 lg:px-24 xl:px-8 2xl:px-44 my-16">
      <div
        className="max-w-full prose prose-invert prose-base text-justify text-neutral-900"
        dangerouslySetInnerHTML={{ __html: biographyHtml }}
      />
    </section>
  );
};
