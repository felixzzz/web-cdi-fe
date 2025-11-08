import Link from "next/link";

export interface JourneyStat {
  value: string;
  description: string;
}

export interface JourneyLink {
  href: string;
  text: string;
  external?: boolean;
}

interface JourneySectionProps {
  eyebrow: string;
  title: string;
  backgroundImageUrl: string;
  stats: JourneyStat[];
  links: JourneyLink[];
  children: React.ReactNode;
}

export const Journey: React.FC<JourneySectionProps> = ({
  eyebrow,
  title,
  backgroundImageUrl,
  stats,
  links,
  children,
}) => {
  return (
    <section
      className="bg-[#091A24] pb-12 pt-12 lg:py-28 text-white bg-contain bg-no-repeat bg-right relative"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-labelledby="journey-title"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
        <p className="text-neutral-4 mb-4">{eyebrow}</p>

        <div className="mb-20 max-w-lg">
          <h2
            id="journey-title"
            className="font-medium text-2xl md:text-[38px] md:leading-[44px] mb-6"
          >
            {title}
          </h2>
          <div className="content text-neutral-5">{children}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="border-l-2 border-l-[#47C1EA] px-6 py-4 lg:py-0"
            >
              <p className="text-shadow-1 font-medium text-4xl md:text-[62px] xl:text-[80px] mb-2 leading-[88.8889px]">
                {stat.value}
              </p>
              <div className="content !font-light text-shadow-1 !text-white leading-[18px]">
                <p>{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {links.map((link) =>
            link.external ? (
              <Link
                key={link.text}
                href={link.href}
                className="px-6 py-2 rounded-full whitespace-nowrap border border-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </Link>
            ) : (
              <Link
                key={link.text}
                href={link.href}
                className="px-6 py-2 rounded-full whitespace-nowrap border border-white"
              >
                {link.text}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};
