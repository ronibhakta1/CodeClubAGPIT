import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import EditProfile from "./Editprofile";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import UserCardHeader from "./UserCardHeader";
import { User, SocialLinks } from "@/types/user";

const UserAvatar = ({ user }: { user: User }) => (
  <Avatar className="w-32 h-32 rounded-full">
    <AvatarImage src={user.avatar} alt={user.name} />
    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
  </Avatar>
);

const UserDetails = ({ user }: { user: User }) => (
  <div className="space-y-2 w-[90%] text-white">
    <div className="flex items-center justify-between">
      <span className="font-medium">Role:</span>
      <span className="text-slate-300">{user.role}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="font-medium">Year of Pursuing:</span>
      <span className="text-slate-300">{user.yearOfPursuing}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="font-medium">Year of Passing:</span>
      <span className="text-slate-300">{user.yearOfPassing}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="font-medium">Email:</span>
      <span className="text-slate-300">{user.email}</span>
    </div>
    <p className="text-sm text-gray-300 mt-4">{user.bio}</p>
  </div>
);

const UserSkills = ({ skills }: { skills: string[] }) => (
  <div className="flex gap-2 flex-wrap mt-2 ">
    {skills.map(skill => (
      <span key={skill} className="px-3 py-1  bg-zinc-600 text-zinc-300 rounded-full text-sm">{skill}</span>
    ))}
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

const UserProfileSection = () => {
  const { user, setUser } = useUserContext();
  return (
    <Card className="flex flex-col items-center text-center h-full p-6 bg-zinc-950 rounded-none">
      <UserAvatar user={user} />
      <UserCardHeader name={user.name} codeClubRole={user.codeClubRole} />
      <CardContent className="flex flex-col items-center gap-4 w-full">
        <UserSkills skills={user.skills} />
        <Separator className="my-4 bg-white" />
        <div className="flex gap-6 w-full text-left text-sm">
          <UserDetails user={user} />
          <EditProfile user={user} setUser={setUser}  />
        </div>
        <Separator className="my-4 bg-white" />
        <UserSocialLinks social={user.social} />
      </CardContent>
    </Card>
  );
};

export default UserProfileSection; 