import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import UserCardHeader from "./UserCardHeader";

interface SocialLinks {
  github: string;
  linkedin: string;
  portfolio: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
  codeClubRole: string;
  skills: string[];
  bio: string;
  social: SocialLinks;
  pastEvents: string[];
  yearOfPursuing: string;
  yearOfPassing: string;
  email: string;
}

const UserAvatar = ({ user }: { user: User }) => (
  <Avatar className="w-32 h-32 rounded-full">
    <AvatarImage src={user.avatar} alt={user.name} />
    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
  </Avatar>
);

const UserSkills = ({ skills }: { skills: string[] }) => (
  <div className="flex gap-2 flex-wrap mt-2 ">
    {skills.map(skill => (
      <span key={skill} className="px-3 py-1  bg-zinc-600 text-zinc-300 rounded-full text-sm">{skill}</span>
    ))}
  </div>
);

const UserPastEventsdirect = ({ pastEvents }: { pastEvents: string[] }) => (
  <div className="space-y-2 w-[90%] text-white">
    <div className="flex">
      <span className="font-medium">Past Events Organized:</span>
    </div>
    <div className="space-y-1">
      {pastEvents.length > 0 ? (
        pastEvents.map((event, index) => (
          <div key={index} className="text-slate-300">
            {event}
          </div>
        ))
      ) : (
        <div className="text-slate-300">No past events</div>
      )}
    </div>
  </div>
);

const UserSocialLinks = ({ social }: { social: SocialLinks }) => (
  <div className="flex gap-4">
    <a href={social.github} target="_blank" rel="noopener noreferrer">
      <FaGithub className="w-6 h-6 text-slate-100 hover:text-slate-400" />
    </a>
    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="w-6 h-6 text-blue-600 hover:text-blue-900" />
    </a>
    <a href={social.portfolio} target="_blank" rel="noopener noreferrer">
      <FaGlobe className="w-6 h-6 text-green-600 hover:text-green-900" />
    </a>
  </div>
);

function useUserContext() {
  return useOutletContext<{ user: User; setUser: React.Dispatch<React.SetStateAction<User>> }>();
}

const UserPastEventsSection = () => {
  const { user,} = useUserContext();
  return (
    <Card className="flex flex-col items-center text-center h-full p-6 bg-zinc-950 rounded-none">
      <UserAvatar user={user} />
      <UserCardHeader name={user.name} codeClubRole={user.codeClubRole} />
      <CardContent className="flex flex-col items-center gap-4 w-full">
        <UserSkills skills={user.skills} />
        <Separator className="my-4 bg-white" />
        <UserPastEventsdirect pastEvents={user.pastEvents} />
        <Separator className="my-4 bg-white" />
        <UserSocialLinks social={user.social} />
      </CardContent>
    </Card>
  );
};

export default UserPastEventsSection; 