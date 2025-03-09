import { AppSidebar } from "@/components/user_page/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
};

const Userpage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header with Breadcrumbs */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Code Club AGPIT</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex-col ">
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
              <div className="grid grid-cols-2 gap-6 w-full text-left text-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Role:</span>
                    <span className="text-muted-foreground">{user.role}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Year of Pursuing:</span>
                    <span className="text-muted-foreground">3rd</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Email:</span>
                    <span className="text-muted-foreground">roni123@gmail.com</span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">{user.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Edit Profile</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                          Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input id="name" value={user.name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">Username</Label>
                          <Input id="username" value="email/something" className="col-span-3" />
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="submit">Save changes</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
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