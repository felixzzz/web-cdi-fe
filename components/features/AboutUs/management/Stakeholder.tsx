import { ManagementTeam } from "./ManagementTeam";
import { TeamMember } from "./TeamMemberCard";

interface StakeholderSectionProps {
  backgroundImageUrl: string;
  directors: TeamMember[];
  commissioners: TeamMember[];
}

export const Stakeholder: React.FC<StakeholderSectionProps> = ({
  backgroundImageUrl,
  directors,
  commissioners,
}) => {
  return (
    <section
    id="board-of-commissioners"
      className="pb-20 bg-[#091A24] bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundPositionY: "48px",
      }}
    >
      <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-44 2xl:px-44">
        <ManagementTeam
          id="board-of-directors"
          title="Board of Directors"
          members={directors}
        />

        <div className="h-16" />

        <ManagementTeam
          id="board-of-commissioners"
          title="Board of Commissioners"
          members={commissioners}
        />
      </div>
    </section>
  );
};
