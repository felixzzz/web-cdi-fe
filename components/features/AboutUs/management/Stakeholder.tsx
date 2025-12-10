import { useTranslations } from "next-intl";
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
  const t = useTranslations('Management')
  return (
    <section
    id="board-of-commissioners"
      className="pb-20 bg-[#091A24] bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundPositionY: "48px",
      }}
    >
      <div className="container mx-auto  ">
        <ManagementTeam
          id="board-of-directors"
          title={t('Board of Directors')}
          members={directors}
          />

        <div className="h-16" />

        <ManagementTeam
          id="board-of-commissioners"
          title={t('Board of Commissioners')}
          members={commissioners}
        />
      </div>
    </section>
  );
};
