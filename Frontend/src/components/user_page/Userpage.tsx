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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import EditProfile from "./Editprofile";
import React from "react";
import EditClubDetails from "./EditClubDetails";

// Define interfaces for user, social, and pastEvents

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
  Navbar: { name: string; url: string }[];
}


// Avatar Component
const UserAvatar = ({ user }: { user: User }) => (
  <Avatar className="w-32 h-32 rounded-full">
    <AvatarImage src={user.avatar} alt={user.name} />
    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
  </Avatar>
);

// User Details Component
const UserDetails = ({ user }: { user: User }) => (
  <div className="space-y-2 w-[90%]">
    <div className="flex items-center justify-between ">
      <span className="font-medium">Role:</span>
      <span className="text-muted-foreground">{user.role}</span>
    </div>
    <div className="flex items-center justify-between ">
      <span className="font-medium">Year of Pursuing:</span>
      <span className="text-muted-foreground">{user.yearOfPursuing}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="font-medium">Year of Passing:</span>
      <span className="text-muted-foreground">{user.yearOfPassing}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="font-medium">Email:</span>
      <span className="text-muted-foreground">{user.email}</span>
    </div>
    <p className="text-sm text-gray-600 mt-4">{user.bio}</p>
  </div>
);

// User Club Details Component
const UserClubDetails = ({ user }: { user: User }) => (
  <div className="space-y-2 w-[90%]">
    <div className="flex items-center justify-between ">
      <span className="font-medium">Role:</span>
      <span className="text-muted-foreground">{user.role}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="font-medium">Year of Pursuing:</span>
      <span className="text-muted-foreground">{user.yearOfPursuing}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="font-medium">Year of Passing:</span>
      <span className="text-muted-foreground">{user.yearOfPassing}</span>
    </div>
  </div>
);

// User Skills Component
const UserSkills = ({ skills }: { skills: string[] }) => (
  <div className="flex gap-2 flex-wrap">
    {skills.map(skill => (
      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">{skill}</span>
    ))}
  </div>
);

// User Social Links Component
const UserSocialLinks = ({ social }: { social: SocialLinks }) => (
  <div className="flex gap-4">
    <a href={social.github} target="_blank" rel="noopener noreferrer">
      <FaGithub className="w-6 h-6 text-gray-700 hover:text-black" />
    </a>
    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="w-6 h-6 text-blue-600 hover:text-blue-800" />
    </a>
    <a href={social.portfolio} target="_blank" rel="noopener noreferrer">
      <FaGlobe className="w-6 h-6 text-green-600 hover:text-green-800" />
    </a>
  </div>
);

// User Past Events Component
const UserPastEvents = ({ pastEvents }: { pastEvents: string[] }) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="events">
      <AccordionTrigger className="text-sm font-medium text-blue-600">
        Past Events Organized
      </AccordionTrigger>
      <AccordionContent>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {pastEvents.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

const UserPastEventsdirect = ({ pastEvents }: { pastEvents: string[] }) => (
  <div className="space-y-2 w-[90%]">
    <div className="flex"> <span className="font-medium">Past Events Organized:</span>
    </div>
    
    <div className="space-y-1">
      {pastEvents.length > 0 ? (
        pastEvents.map((event, index) => (
          <div key={index} className="text-muted-foreground">
            {event}
          </div>
        ))
      ) : (
        <div className="text-muted-foreground">No past events</div>
      )}
    </div>
  </div>
);

// Profile Card Component
const UserProfileCard = ({ user }: { user: User }) => (
  
  <Card className="flex flex-col items-center text-center h-full p-6">
    <UserAvatar user={user} />
    <CardHeader className="mt-4">
      <CardTitle className="text-2xl font-semibold">{user.name}</CardTitle>
      <p className="text-md text-blue-600 font-semibold">{user.codeClubRole}</p>
    </CardHeader>
    <CardContent className="flex flex-col items-center gap-4 w-full">
      <UserSkills skills={user.skills} />
      <Separator className="my-4" />
      <div className="flex gap-6 w-full text-left text-sm">
        <UserDetails user={user} />
        <EditProfile user={user} setUser={() => {}} />
      </div>
      <Separator className="my-4" />
      <UserSocialLinks social={user.social} />
    </CardContent>
  </Card>
);


// Profile Club Card Component
const UserClubProfileCard = ({ user, setUser }: { user: User, setUser: React.Dispatch<React.SetStateAction<User>> }) => (
  <Card className="flex flex-col items-center text-center h-full p-6">
    <UserAvatar user={user} />
    <CardHeader className="mt-4">
      <CardTitle className="text-2xl font-semibold">{user.name}</CardTitle>
      <p className="text-md text-blue-600 font-semibold">{user.codeClubRole}</p>
    </CardHeader>
    <CardContent className="flex flex-col items-center gap-4 w-full">
      <UserSkills skills={user.skills} />
      <Separator className="my-4" />
      <div className="flex gap-6 w-full text-left text-sm">
        <UserClubDetails user={user}  />
        <EditClubDetails user={user} setUser={setUser} />
      </div>
      <Separator className="my-4" />
      <UserSocialLinks social={user.social} />
    </CardContent>
  </Card>
);



// Profile Club Card Component
const EventsCard = ({ user }: { user: User }) => (
  
  <Card className="flex flex-col items-center text-center h-full p-6">
    <UserAvatar user={user} />
    <CardHeader className="mt-4">
      <CardTitle className="text-2xl font-semibold">{user.name}</CardTitle>
      <p className="text-md text-blue-600 font-semibold">{user.codeClubRole}</p>
    </CardHeader>
    <CardContent className="flex flex-col items-center gap-4 w-full">
      <UserSkills skills={user.skills} />
      <Separator className="my-4" />
      <UserPastEventsdirect pastEvents={user.pastEvents} />
      <Separator className="my-4" />
      <UserSocialLinks social={user.social} />
    </CardContent>
  </Card>
);

// Breadcrumb Navigation Component
const BreadcrumbNav = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="hidden md:block" />
      <BreadcrumbItem>
        <BreadcrumbPage>Profile</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

// User Page Layout
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
    Navbar: [
      { name: "Main", url: "" },
      { name: "Club Info", url: "" },
      { name: "Past Events", url: "" },
    ],
  });

  const [activeSection, setActiveSection] = React.useState("main"); // Default to 'main'

  return (
    <SidebarProvider>
      <AppSidebar setActiveSection={setActiveSection} user={user} navbar={user.Navbar} />
      <SidebarInset>
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-white px-4 shadow-md">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <BreadcrumbNav />
      </header>
    
      <div className="flex-1 overflow-y-auto">
        {activeSection === "main" && <UserProfileCard user={user} />}
        {activeSection === "clubinfo" && <UserClubProfileCard user={user} setUser={setUser} />}
        {activeSection === "pastevents" && user.codeClubRole === "president" && <EventsCard user={user} />}
      </div>
      </SidebarInset>
    </SidebarProvider>
  
  );
};
export default UserPage;
