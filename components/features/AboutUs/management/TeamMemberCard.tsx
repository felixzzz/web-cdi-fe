import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  href: string;
}

export const TeamMemberCard: React.FC<TeamMember> = ({ name, role, imageUrl, href }) => {
  return (
    <li className="w-[282px]">
      <Link
        href={href}
        className="flex flex-col items-center text-center group transition-all duration-300"
      >
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
          className="aspect-square w-[200px] h-[200px] overflow-hidden rounded-full object-cover shadow-article mb-5 border-2 border-transparent outline-2 outline-offset-4 outline-transparent group-hover:outline-blue-lighter transition-all"
        />
        <h3 className="text-lg font-medium group-hover:text-blue-lighter">
          {name}
        </h3>
        <p className="text-base font-normal text-neutral-6">{role}</p>
      </Link>
    </li>
  );
};