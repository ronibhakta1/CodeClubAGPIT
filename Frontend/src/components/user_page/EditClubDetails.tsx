import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const EditClubDetails = ({ user, setUser }: { user: any; setUser: any }) => {
  const [role, setRole] = useState(user.role || "");
  const [yearOfPursuing, setYearOfPursuing] = useState(user.yearOfPursuing || "");
  const [yearOfPassing, setYearOfPassing] = useState(user.yearOfPassing || "");
  const [isOpen, setIsOpen] = useState(false); // State to control dialog visibility

  const handleSave = () => {
    const updatedData = { role, yearOfPursuing, yearOfPassing };
    setUser(updatedData); // Update parent component state
    console.log("Final Data on Save:", updatedData);
    setIsOpen(false); // Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>Edit Club Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit Club Details</DialogTitle>
          <DialogDescription>Update your club role and academic details below.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-2">
          {/* Role */}
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Role</span>
            <Select onValueChange={setRole} defaultValue={role}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role">{role || "Select Role"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="President">President</SelectItem>
                  <SelectItem value="Vice President">Vice President</SelectItem>
                  <SelectItem value="Secretary">Secretary</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Year of Pursuing */}
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right font-medium">Year of Pursuing</span>
            <Select onValueChange={setYearOfPursuing} defaultValue={yearOfPursuing}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year">{yearOfPursuing || "Select Year"}</SelectValue>
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
            <span className="text-right font-medium">Year of Passing</span>
            <Select onValueChange={setYearOfPassing} defaultValue={yearOfPassing}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year">{yearOfPassing || "Select Year"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Year</SelectLabel>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave} type="button">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditClubDetails;
