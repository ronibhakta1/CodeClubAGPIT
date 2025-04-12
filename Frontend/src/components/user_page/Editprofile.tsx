import { useState, useEffect } from "react";
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

interface User {
  avatar: string;
  name: string;
  bio: string;
  role: string;
  codeClubRole: string;
  skills: string[];
  yearOfPursuing: string;
  yearOfPassing: string;
  social: {
    github: string;
    linkedin: string;
    portfolio: string;
  };
}

interface EditProfileProps {
  user: User;
  setUser: (user: User) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, setUser }) => {
  const [formData, setFormData] = useState<User>(user);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, skills: e.target.value.split(",").map((skill) => skill.trim()) }));
  };

  const handleSelectChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: keyof User["social"], value: string) => {
    setFormData((prev) => ({ ...prev, social: { ...prev.social, [platform]: value } }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) return alert("Name is required");
    if (!formData.yearOfPassing.match(/^\d{4}$/)) return alert("Enter a valid passing year (e.g., 2025)");

    setUser(formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white text-black">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6 rounded-lg bg-black text-white">
        <DialogHeader >
          <DialogTitle >Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-2">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">
            <img src={formData.avatar} alt="Profile" className="w-24 h-24 rounded-full shadow-lg border border-gray-300" />
          </div>

          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
          </div>

          {/* Bio */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right">Bio</Label>
            <Textarea id="bio" value={formData.bio} onChange={handleChange} className="col-span-3" />
          </div>

          {/* Role */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Role</Label>
            <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Role">{formData.role}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                  <SelectItem value="Android Developer">Android Developer</SelectItem>
                  <SelectItem value="Python Developer">Python Developer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Code Club Role */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Club Role</Label>
            <Select value={formData.codeClubRole} onValueChange={(value) => handleSelectChange("codeClubRole", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Role">{formData.codeClubRole}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Club Role</SelectLabel>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="President">President</SelectItem>
                  <SelectItem value="Vice President">Vice President</SelectItem>
                  <SelectItem value="Secretary">Secretary</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
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
            <Select value={formData.yearOfPursuing} onValueChange={(value) => handleSelectChange("yearOfPursuing", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Year">{formData.yearOfPursuing}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  <SelectItem value="1st">1st</SelectItem>
                  <SelectItem value="2nd">2nd</SelectItem>
                  <SelectItem value="3rd">3rd</SelectItem>
                  <SelectItem value="Final">Final Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Year of Passing */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="yearOfPassing" className="text-right">Year of Passing</Label>
            <Input id="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} className="col-span-3" required />
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
