interface PeopleSectionProps {
  title: string;
  children: React.ReactNode;
}

export const People: React.FC<PeopleSectionProps> = ({
  title,
  children,
}) => {
  return (
    <section
    id="board-of-directors"
      className="pt-20 pb-16 bg-[#091A24]"
      aria-labelledby="people-section-title"
    >
      <div className="container mx-auto px-4 lg:px-24 xl:px-8 2xl:px-44">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <h2
            id="people-section-title"
            className="text-2xl leading-6 md:text-[52px] md:leading-[60px] font-medium text-[#47C1EA]"
          >
            {title}
          </h2>

          <div className="content !text-neutral-4 text-base">{children}</div>
        </div>
      </div>
    </section>
  );
};
