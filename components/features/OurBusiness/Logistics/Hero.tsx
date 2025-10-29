import React from "react";

interface HeroProps {
  imageSrc: string;
  title: string;
  iconSrc: string;
}

export const Hero: React.FC<HeroProps> = ({
  imageSrc,
  title,
  iconSrc,
}) => {
  return (
    <div
      className="relative overflow-hidden aspect-[4/3] lg:aspect-video w-full py-[5%] lg:py-[8%] flex items-end bg-cover"
      style={{ backgroundImage: `url("${imageSrc}")` }}
    >
      <div className="overlay-banner h-full w-full absolute left-0 right-0 top-0 bottom-0" />

      <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="text-white grid lg:grid-cols-2 gap-2 relative z-[1] items-end">
          <div>
            <h1
              className="text-2xl leading-6 lg:text-[52px] lg:leading-[60px] font-medium max-w-2xl"
              id="home_banner_title"
            >
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-10">
            <div className="h-[2px] w-full bg-neutral-6 hidden lg:block relative overflow-hidden">
              <div className="absolute h-full bg-blue-lighter animate-colorChange" />
            </div>
            <img src={iconSrc} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};