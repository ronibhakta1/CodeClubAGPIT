import { AppSidebar } from "@/components/user_page/app-sidebar";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import EditProfile from "./Editprofile";
import React from "react";
import EditClubDetails from "./EditClubDetails";
import {
  BookOpen,
  Bot,
  SquareTerminal,
} from "lucide-react"

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
  social: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
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

const UserClubDetails = ({ user }: { user: User }) => (
  <div className="space-y-2 w-[90%] text-slate-100">
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

const UserProfileCard = ({ user }: { user: User }) => (
  <Card className="flex flex-col items-center text-center h-full p-6 bg-zinc-950 rounded-none">
    <UserAvatar user={user} />
    <CardHeader className="mt-4">
      <CardTitle className="text-2xl font-semibold text-white">{user.name}</CardTitle>
      <p className="text-md text-blue-600 font-semibold">{user.codeClubRole}</p>
    </CardHeader>
    <CardContent className="flex flex-col items-center gap-4 w-full">
      <UserSkills skills={user.skills} />
      <Separator className="my-4 bg-white" />
      <div className="flex gap-6 w-full text-left text-sm">
        <UserDetails user={user} />
        <EditProfile user={user} setUser={() => {}}  />
      </div>
      <Separator className="my-4 bg-white" />
      <UserSocialLinks social={user.social} />
    </CardContent>
  </Card>
);

const UserClubProfileCard = ({ user, setUser }: { user: User, setUser: React.Dispatch<React.SetStateAction<User>> }) => (
  <Card className="flex flex-col items-center text-center h-full p-6 bg-zinc-950 rounded-none">
    <UserAvatar user={user} />
    <CardHeader className="mt-4">
      <CardTitle className="text-2xl font-semibold text-white">{user.name}</CardTitle>
      <p className="text-md text-blue-600 font-semibold">{user.codeClubRole}</p>
    </CardHeader>
    <CardContent className="flex flex-col items-center gap-4 w-full">
      <UserSkills skills={user.skills} />
      <Separator className="my-4 bg-white" />
      <div className="flex gap-6 w-full text-left text-sm">
        <UserClubDetails user={user} />
        <EditClubDetails user={user} setUser={setUser} />
      </div>
      <Separator className="my-4 bg-white" />
      <UserSocialLinks social={user.social} />
    </CardContent>
  </Card>
);

const EventsCard = ({ user }: { user: User }) => (
  <Card className="flex flex-col items-center text-center h-full p-6 bg-zinc-950 rounded-none">
    <UserAvatar user={user} />
    <CardHeader className="mt-4">
      <CardTitle className="text-2xl font-semibold text-white">{user.name}</CardTitle>
      <p className="text-md text-blue-600 font-semibold">{user.codeClubRole}</p>
    </CardHeader>
    <CardContent className="flex flex-col items-center gap-4 w-full">
      <UserSkills skills={user.skills} />
      <Separator className="my-4 bg-white" />
      <UserPastEventsdirect pastEvents={user.pastEvents} />
      <Separator className="my-4 bg-white" />
      <UserSocialLinks social={user.social} />
    </CardContent>
  </Card>
);

const BreadcrumbNav = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink href="/" className="text-slate-100">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="hidden md:block text-slate-100" />
      <BreadcrumbItem>
        <BreadcrumbPage className="text-slate-100">Profile</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

const UserPage = () => {
  const [user, setUser] = React.useState<User>({
    id: 1,
    name: "Roni Bhakta",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEvEHK2KOMLwQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1705087348506?e=1748476800&v=beta&t=IVnehed4T53hvzHeeNxaKQdN9EJknAu4iM4tpBddSvE",
    role: "Full Stack Developer",
    codeClubRole: "president",
    skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    bio: "Experienced full-stack developer passionate about building scalable web applications.",
    social: {
      github: "https://github.com/ronibhakta1",
      linkedin: "https://linkedin.com/in/ronibhakta1",
      portfolio: "https://ronibhakta1.dev",
    },
    pastEvents: [
      "Hackathon 2024 - Lead Organizer",
      "React Conference - Speaker",
      "CodeFest 2023 - Judge",
    ],
    yearOfPursuing: "3rd",
    yearOfPassing: "2026",
    email: "roni123@gmail.com",
  });

  const navMain = [
    {
      title: "Main",
      sectionKey: "main",
      icon: SquareTerminal,
    },
    {
      title: "Club Information",
      sectionKey: "clubinfo",
      icon: Bot,
    },
    ...(user.codeClubRole === "president"
      ? [
          {
            title: "Past Events",
            sectionKey: "pastevents",
            icon: BookOpen,
          },
        ]
      : []),
  ];

  const [activeSection, setActiveSection] = React.useState("main");

  return (
    <div className=" min-h-screen">
      <SidebarProvider>
          <AppSidebar
            user={user}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            navItems={navMain}
          />

        <SidebarInset>
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-zinc-950 px-4 shadow-md">
            <SidebarTrigger className="-ml-1 bg-zinc-700"  />
            <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-100" />
            <BreadcrumbNav />
            <Separator orientation="horizontal" className="fixed top-16  h-2 left-0 bg-zinc-200" />
          </header>
          
          <div className="flex-1 overflow-y-auto ">
            {activeSection === "main" && <UserProfileCard user={user} />}
            {activeSection === "clubinfo" && <UserClubProfileCard user={user} setUser={setUser} />}
            {activeSection === "pastevents" && user.codeClubRole === "president" && <EventsCard user={user} />}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default UserPage;