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
      <div className="container mx-auto  ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <h2
            id="people-section-title"
            className="text-2xl leading-6 lg:text-[52px] lg:leading-[60px] font-medium text-[#47C1EA]"
          >
            {title}
          </h2>

          <div className="content !text-neutral-4 text-base p-0 m-0">{children}</div>
        </div>
      </div>
    </section>
  );
};
