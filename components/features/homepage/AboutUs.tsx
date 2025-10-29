import Link from "next/link";

interface AboutUsSectionProps {
  backgroundImageUrl: string;
  title: string;
  linkHref: string;
  linkText: string;
  linkIcon: React.ReactNode;
  children: React.ReactNode;
}

export const AboutUs: React.FC<AboutUsSectionProps> = ({
  backgroundImageUrl,
  title,
  linkHref,
  linkText,
  linkIcon,
  children,
}) => {
  return (
    <section
      id="about-us-home"
      className="pt-11 pb-11 lg:pb-[88px] lg:pt-28 bg-blue-dark relative overflow-hidden bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-labelledby="about-us-title"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] grid lg:grid-cols-2 gap-10 relative">
        <div>
          <h2
            id="about-us-title"
            className="font-medium text-[#47C1EA] text-2xl lg:text-[52px] leading-[57.7778px]"
          >
            {title}
          </h2>

          <Link
            href={linkHref}
            className="bg-white text-[#2474A5] px-3 py-[5px] lg:px-4 lg:py-[5px] border border-neutral-13 rounded-full whitespace-nowrap gap-3 flex items-center w-fit mt-10 text-xs lg:text-base"
          >
            {linkText}
            {linkIcon}
          </Link>
        </div>

        <div className="content !text-neutral-4">{children}</div>
      </div>
    </section>
  );
};
