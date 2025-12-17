import { Link } from "@/i18n/navigation";

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
      className="pt-11 pb-11 lg:pb-[88px] lg:pt-28 bg-[#091A24] relative overflow-hidden bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-labelledby="about-us-title"
    >
      {/* <div className="container mx-auto   grid md:grid-cols-2 gap-10 relative"> */}
      <div className="container mx-auto   flex flex-col lg:flex-row gap-10 relative">
        <div className="flex flex-col flex-1">
          <h2
            id="about-us-title"
            className="font-medium text-[#47C1EA] text-2xl lg:text-[30px] lg:text-[52px] lg:leading-[27.7778px] lg:leading-[57.7778px] w-full max-w-2xl lg:max-w-full"
          >
            {title}
          </h2>

          <Link
          title={linkText}
            href={linkHref}
            className="bg-white text-[#2474A5] px-4 py-[6px] lg:px-5 lg:py-[6px] border border-neutral-13 rounded-full whitespace-nowrap gap-3 flex items-center w-fit mt-10 text-xs lg:text-base"
          >
            {linkText}
            {linkIcon}
          </Link>
        </div>

        <div className="w-full flex-1 max-w-5xl content text-justify !text-neutral-4">{children}</div>
      </div>
    </section>
  );
};
