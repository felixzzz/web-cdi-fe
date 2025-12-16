"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

type BocDetailHeroProps = {
  name: string;
  title: string;
  imageUrl: string;
  backLinkHref: string;
  backLinkLabel?: string;
};

const HERO_BACKGROUND_IMAGE = `${process.env.NEXT_PUBLIC_URL}/assets/frontend/images/about/team_background_hero.webp`;

export const DetailHero = ({
  name,
  title,
  imageUrl,
  backLinkHref,
}: BocDetailHeroProps) => {
  const t = useTranslations("AboutUs");
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("finishProgressBar"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative overflow-hidden aspect-[4/3] md:aspect-[4/2] lg:aspect-[16/7] w-full flex items-center bg-cover flex-col my-24"
      style={{ backgroundImage: `url("${HERO_BACKGROUND_IMAGE}")` }}
    >
      <div className="flex items-center bg-cover flex-col relative z-[1] h-full w-full aspect-[4/3] md:aspect-[16/7] py-[5%] md:py-[8%]">
        <section className="container w-full mx-auto  ">
          <Link
            title={title}
            href={backLinkHref}
            className="flex gap-2 items-center text-white"
          >
            <ArrowLeft size={24} /> {t("button_back")}
          </Link>
        </section>

        <section className="container w-full mx-auto   my-auto">
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
                title={name}
                width={500}
                height={800}
                // className="absolute bottom-0 h-[80%] w-auto"
                className="absolute bottom-0 right-10 translate-x-4 md:translate-x-0 md:right-10 lg:right-96 h-[55%] md:h-[80%] w-auto object-contain z-0"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
