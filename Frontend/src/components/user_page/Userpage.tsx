
import { AppSidebar } from "@/components/user_page/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import EditProfile from "./Editprofile";
import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  SunMoon,
} from 'lucide-react';



// User Data
const user = {
  id: 1,
  name: "Roni Bhakta",
  avatar: "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg",
  role: "Full Stack Developer",
  codeClubRole: "President",
  skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  bio: "Experienced full-stack developer passionate about building scalable web applications and open-source contributions. Also an active contributor to the Code Club, leading workshops and mentorship programs.",
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
  
  
};
const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Products',
    icon: (
      <Package className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Components',
    icon: (
      <Component className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Activity',
    icon: (
      <Activity className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Change Log',
    icon: (
      <ScrollText className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Email',
    icon: (
      <Mail className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
  {
    title: 'Theme',
    icon: (
      <SunMoon className='h-full w-full text-neutral-600 dark:text-neutral-300' />
    ),
    href: '#',
  },
];

const Userpage = () => {
  return (
    <SidebarProvider>
      
      <AppSidebar />
      <SidebarInset>
        {/* Header with Breadcrumbs */}
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2  bg-white px-4 shadow-md">
          <SidebarTrigger className="-ml-1 " />
          <Separator orientation="vertical" className="mr-2 h-4" />
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
        </header>

        {/* Main Content */}
        <div className="flex-1 ">
          {/* User Profile Card */}
          <Card className="flex flex-col items-center text-center h-full p-6">
            <Avatar className="w-32 h-32 rounded-full ">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardHeader className="mt-4">
              <CardTitle className="text-2xl font-semibold">{user.name}</CardTitle>
              <p className="text-md text-blue-600 font-semibold">{user.codeClubRole}</p>
            </CardHeader>
            
            <CardContent className="flex flex-col items-center gap-4 w-full">
              {/* Skills */}
              <div className="flex gap-2 flex-wrap">
                {user.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <Separator className="my-4" />

              {/* User Information and Edit Profile */}
              <div className="flex gap-6 w-full text-left text-sm">
                <div className="space-y-2 ">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Role:</span>
                    <span className="text-muted-foreground">{user.role}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Year of Pursuing:</span>
                    <span className="text-muted-foreground">3rd</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Year of Passing:</span>
                    <span className="text-muted-foreground">2026</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Email:</span>
                    <span className="text-muted-foreground">roni123@gmail.com</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">{user.bio}</p>
                  </div>
                </div>
                {/* {Edit Profile button } */}
                <EditProfile/>
              </div>
              {/* Past Events */}
              <Accordion type="single" collapsible className="w-full ">
                <AccordionItem value="events">
                  <AccordionTrigger className="text-sm font-medium text-blue-600">
                    Past Events Organized
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {user.pastEvents.map((event, index) => (
                        <li key={index}>{event}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Separator className="my-4" />
              {/* Social Links */}
              <div className="flex gap-4">
                <a href={user.social.github} target="_blank" rel="noopener noreferrer"><FaGithub className="w-6 h-6 text-gray-700 hover:text-black" /></a>
                <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin className="w-6 h-6 text-blue-600 hover:text-blue-800" /></a>
                <a href={user.social.portfolio} target="_blank" rel="noopener noreferrer"><FaGlobe className="w-6 h-6 text-green-600 hover:text-green-800" /></a>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
      
    </SidebarProvider>
    
  );
}


export default Userpage