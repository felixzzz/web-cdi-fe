import { useTranslations } from "next-intl";
import Image from "next/image";

const DecorativeCorners: React.FC = () => {
  const size = 10;
  return (
    <>
      <Image
        src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_tagline_top_right.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="absolute top-0 right-0"
      />
      <Image
        src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_tagline_top_left.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="absolute top-0 left-0"
      />
      <Image
        src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_tagline_bottom_left.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="absolute bottom-0 left-0"
      />
      <Image
        src="https://cdi-be.cmlabs.dev/assets/frontend/icons/ic_tagline_bottom_right.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="absolute bottom-0 right-0"
      />
    </>
  );
};

interface VisionMissionSectionProps {
  id: string;
  title: string;
  visionData: {
    title: string;
    statement: string;
    imageUrl: string;
  };
  missionData: {
    title: string;
    statement: string;
    imageUrl: string;
  };
}

export const VisionMission: React.FC<VisionMissionSectionProps> = ({
  id,
  title,
  visionData,
  missionData,
}) => {
  const t = useTranslations("AboutUs");
  return (
    <section
      id={id}
      className="bg-[#091A24] text-white bg-cover relative"
      aria-labelledby="vision-mission-title"
    >
      <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-44 2xl:px-44 relative z-[1]">
        <h2
          id="vision-mission-title"
          className="font-medium text-2xl md:text-[38px] md:leading-[44px] mb-16 text-center relative w-fit py-3 px-12 mx-auto"
        >
          <DecorativeCorners />
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div
            className="rounded-xl p-8 pt-12 flex flex-col items-center text-center"
            style={{ backgroundImage: "linear-gradient(#00253b, #0b5581)" }}
          >
            <Image
              src={visionData.imageUrl}
              alt="Our Vision graphic"
              width={160}
              height={160}
              className="mb-8"
            />

            <p className="text-3xl font-medium leading-relaxed min-h-[200px]">
              {visionData.statement}
            </p>

            <hr className="w-full border-white my-6" />

            {/* <p className="text-base font-medium">{title}</p> */}
            <p className="text-base font-medium">{t("vision")}</p>
          </div>

          <div
            className="rounded-xl p-8 pt-12 flex flex-col items-center text-center"
            style={{ backgroundImage: "linear-gradient(#00253b, #0b5581)" }}
          >
            <Image
              src={missionData.imageUrl}
              alt="Our Mission graphic"
              width={160}
              height={160}
              className="mb-8"
            />

            <p className="text-3xl font-medium min-h-[200px]">
              {missionData.statement}
            </p>

            <hr className="w-full border-white my-6" />

            {/* <p className="text-base font-medium">{title}</p> */}
            <p className="text-base font-medium">{t("mission")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
