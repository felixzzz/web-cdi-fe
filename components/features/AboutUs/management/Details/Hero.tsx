import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

type BocDetailHeroProps = {
  name: string;
  title: string;
  imageUrl: string;
  backLinkHref: string;
  backLinkLabel?: string;
};

const HERO_BACKGROUND_IMAGE =
  "https://chandradaya-investasi.com/assets/frontend/images/about/team_background_hero.webp";

export const DetailHero = ({
  name,
  title,
  imageUrl,
  backLinkHref,
  backLinkLabel = "Kembali",
}: BocDetailHeroProps) => {
  return (
    <div
      className="relative overflow-hidden aspect-[4/3] lg:aspect-[16/7] w-full flex items-center bg-cover flex-col"
      style={{ backgroundImage: `url("${HERO_BACKGROUND_IMAGE}")` }}
    >
      <div className="flex items-center bg-cover flex-col relative z-[1] h-full w-full aspect-[4/3] md:aspect-[16/7] py-[5%] md:py-[8%]">
        <section className="container w-full mx-auto px-4 md:px-8 lg:px-20 2xl:px-44">
          <Link
            href={backLinkHref}
            className="flex gap-2 items-center text-white"
          >
            <ArrowLeft size={24} /> {backLinkLabel}
          </Link>
        </section>

        <section className="container w-full mx-auto px-4 md:px-8 lg:px-20 2xl:px-44 my-auto">
          <div className="text-white grid md:grid-cols-2 gap-2 items-center">
            <div>
              <h1
                className="text-2xl leading-6 md:text-[52px] md:leading-[60px] font-medium max-w-2xl"
                id="home_banner_title"
              >
                {name}
              </h1>
              <p className="max-w-md text-lg md:text-[28px] !text-neutral-4 mt-6 font-light">
                {title}
              </p>
            </div>

            <div className="flex items-center gap-10">
              <Image
                src={imageUrl}
                alt={name}
                width={500}
                height={800}
                className="absolute bottom-0 h-[80%] w-auto"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
