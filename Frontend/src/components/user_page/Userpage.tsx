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
import React from "react";
import {
  BookOpen,
  Bot,
  SquareTerminal,
} from "lucide-react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { User } from "@/types/user";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

const sectionTitles: Record<string, string> = {
  main: "Profile",
  clubinfo: "Club Information",
  pastevents: "Past Events",
};

const BreadcrumbNav = ({ activeSection }: { activeSection: string }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem className="hidden md:block">
        <BreadcrumbLink href="/" className="text-slate-100">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="hidden md:block text-slate-100" />
      <BreadcrumbItem>
        <BreadcrumbLink href="/users/profile" className="text-slate-100">User</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator className="text-slate-100" />
      <BreadcrumbItem>
        <BreadcrumbPage className="text-slate-100">{sectionTitles[activeSection] || "Profile"}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

const UserPage = ({ section }: { section?: string }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Dummy data as fallback
  const dummyUser: User = {
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
  };

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
    ...(user?.codeClubRole === "president"
      ? [
          {
            title: "Past Events",
            sectionKey: "pastevents",
            icon: BookOpen,
          },
        ]
      : []),
  ];

  const location = useLocation();
  const navigate = useNavigate();

  // Determine active section from route or prop
  const getSectionFromPath = () => {
    if (section) return section;
    if (location.pathname.endsWith("/profile")) return "main";
    if (location.pathname.endsWith("/clubinfo")) return "clubinfo";
    if (location.pathname.endsWith("/pastevents")) return "pastevents";
    return "main";
  };
  const [activeSection, setActiveSection] = React.useState(getSectionFromPath());

  React.useEffect(() => {
    setActiveSection(getSectionFromPath());
  }, [location.pathname, section]);

  // Fetch user data
  React.useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(`${BACKEND_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (err: any) {
        console.error("Failed to fetch user:", err);
        setUser(dummyUser); // Fallback to dummy data
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle sidebar navigation
  const handleSectionChange = (sectionKey: string) => {
    setActiveSection(sectionKey);
    if (sectionKey === "main") navigate("/users/profile");
    else if (sectionKey === "clubinfo") navigate("/users/clubinfo");
    else if (sectionKey === "pastevents") navigate("/users/pastevents");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <div className="text-slate-100">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <div className="text-red-400">Error: Unable to load user data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {error && <div className="text-red-400 text-center p-4">{error}</div>}
      <SidebarProvider>
        <AppSidebar
          user={user}
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          navItems={navMain}
        />
        <SidebarInset>
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-zinc-950 px-4 shadow-md">
            <SidebarTrigger className="-ml-1 bg-zinc-700" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-100" />
            <BreadcrumbNav activeSection={activeSection} />
            <Separator orientation="horizontal" className="fixed top-16 h-2 left-0 bg-zinc-200" />
          </header>
          <div className="flex-1 overflow-y-auto">
            <Outlet context={{ user, setUser }} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default UserPage;