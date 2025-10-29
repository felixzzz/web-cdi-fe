import Image from "next/image";
import { VisionMissionCard } from "./VisionMissionCard";

const DecorativeCorners: React.FC = () => {
  const size = 30;
  return (
    <>
      <Image
        src="https://chandradaya-investasi.com/assets/frontend/icons/ic_tagline_top_right.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="absolute top-0 right-0"
      />
      <Image
        src="https://chandradaya-investasi.com/assets/frontend/icons/ic_tagline_top_left.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="absolute top-0 left-0"
      />
      <Image
        src="https://chandradaya-investasi.com/assets/frontend/icons/ic_tagline_bottom_left.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="absolute bottom-0 left-0"
      />
      <Image
        src="https://chandradaya-investasi.com/assets/frontend/icons/ic_tagline_bottom_right.svg"
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
  title: string;
  visionData: {
    statement: string;
    imageUrl: string;
  };
  missionData: {
    statement: string;
    imageUrl: string;
  };
}

export const VisionMission: React.FC<VisionMissionSectionProps> = ({
  title,
  visionData,
  missionData,
}) => {

  return (
    <section
      className="py-28 bg-[#091A24] text-white bg-cover relative"
      aria-labelledby="vision-mission-title"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] relative z-[1]">
        <h2
          id="vision-mission-title"
          className="font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-16 text-center relative w-fit py-3 px-15 mx-auto"
        >
          <DecorativeCorners />
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <VisionMissionCard
            label="Our Vision"
            statement={visionData.statement}
            imageUrl={visionData.imageUrl}
            imageWidth={200}
            imageHeight={200}
          />

          <VisionMissionCard
            label="Our Mission"
            statement={missionData.statement}
            imageUrl={missionData.imageUrl}
            imageWidth={200}
            imageHeight={200}
          />
        </div>
      </div>
    </section>
  );
};
