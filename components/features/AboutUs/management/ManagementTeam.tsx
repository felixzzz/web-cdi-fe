import React from "react";
import { TeamMember, TeamMemberCard } from "./TeamMemberCard";

interface ManagementTeamProps {
  id: string;
  title: string;
  members: TeamMember[];
}

export const ManagementTeam: React.FC<ManagementTeamProps> = ({
  id,
  title,
  members,
}) => {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <h2
        id={`${id}-title`}
        className="text-white font-medium text-2xl md:text-[38px] md:leading-[44px] text-center mb-16"
      >
        {title}
      </h2>

      <ul className="flex gap-4 text-white justify-center flex-wrap">
        {members.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </ul>
    </section>
  );
};
