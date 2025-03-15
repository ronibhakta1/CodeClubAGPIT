import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample User Data
const userData = {
  name: "Roni Bhakta",
  username: "@ronibhakta",
  avatar: "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg",
  role: "Full Stack Developer",
  codeClubRole: "President",
  skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  yearOfPursuing: "3rd",
  yearOfPassing: "2026",
  bio: "Experienced full-stack developer passionate about building scalable web applications and open-source contributions.",
  social: {
    github: "https://github.com/ronibhakta1",
    linkedin: "https://linkedin.com/in/ronibhakta1",
    portfolio: "https://ronibhakta1.dev",
  },
};

const EditProfile = () => {
  const [user, setUser] = useState(userData);
  const [formData, setFormData] = useState(user);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle Skill Change
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, skills: e.target.value.split(",") }));
  };

  // Handle Save Changes
  const handleSave = () => {
    setUser(formData);
    alert("Profile updated successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-2">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">
            <img src={formData.avatar} alt="Profile" className="w-24 h-24 rounded-full shadow-lg border border-gray-300" />
          </div>

          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" />
          </div>

          {/* Username */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input id="username" value={formData.username} onChange={handleChange} className="col-span-3" />
          </div>

          {/* Bio */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">Bio</Label>
            <Textarea id="bio" value={formData.bio} onChange={handleChange} className="col-span-3" />
          </div>

          {/* Role */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Role</Label>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                  <SelectItem value="android">Android Developer</SelectItem>
                  <SelectItem value="python">Python Developer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Code Club Role */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Club Role</Label>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Club Role</SelectLabel>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="president">President</SelectItem>
                  <SelectItem value="vice_president">Vice President</SelectItem>
                  <SelectItem value="secretary">Secretary</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Skills */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skills" className="text-right">Skills</Label>
            <Input id="skills" value={formData.skills.join(", ")} onChange={handleSkillsChange} className="col-span-3" placeholder="Comma-separated skills" />
          </div>

          {/* Year of Pursuing */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Year of Pursuing</Label>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  <SelectItem value="1st">1st</SelectItem>
                  <SelectItem value="2nd">2nd</SelectItem>
                  <SelectItem value="3rd">3rd</SelectItem>
                  <SelectItem value="final">Final Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Year of Passing */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="yearOfPassing" className="text-right">Year of Passing</Label>
            <Input id="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} className="col-span-3" />
          </div>

          {/* Social Links */}
          {["github", "linkedin", "portfolio"].map((platform) => (
            <div key={platform} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={platform} className="text-right capitalize">{platform}</Label>
              <Input
                id={platform}
                value={formData.social[platform as keyof typeof formData.social]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    social: { ...prev.social, [platform]: e.target.value },
                  }))
                }
                className="col-span-3"
              />
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleSave} type="button">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
