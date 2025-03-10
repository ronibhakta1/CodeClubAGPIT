import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import PresidentDescription from "@/components/ui/presidentDescription";

// Dummy member data
const members = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  name: `Member ${index + 1}`,
  role: index === 0 ? "Vice President" : "Member",
  avatar: "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg", // Replace with actual images
  skills: ["React", "Python", "ML"],
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.",
  social: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    portfolio: "https://your-portfolio.com/",
  },
  pastEvents: ["Hackathon 2023", "CodeFest 2022", "AI Workshop"],
}));

const Members = () => {
  return (
    <div className="flex flex-col min-h-screen items-center gap-6 p-4">
      {/* 1st Card: Batch Selection */}
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Select Your Batch</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            {["2023 Batch", "2024 Batch", "2025 Batch"].map((batch) => (
              <Button key={batch} variant="outline">
                {batch}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2nd Card: President Card */}
      <Card className="w-full max-w-4xl shadow-lg p-8 flex items-start gap-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <Avatar className="w-40 h-40 rounded-full">
              <img
                src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg"
                alt="Roni Bhakta"
                className="w-full h-full rounded-full"
              />
            </Avatar>
          </div>
          <div className="flex-1">
            <PresidentDescription />
          </div>
        </div>
      </Card>

      {/* 3rd Section: Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {members.map((member) => (
          <Card key={member.id} className="shadow-lg p-4 flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 rounded-full">
              <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
            </Avatar>
            <CardHeader className="mt-2">
              <CardTitle className="text-lg font-semibold">{member.name}</CardTitle>
              <p className="text-sm text-gray-500">{member.role}</p>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-2">
              {/* Skills */}

              <div className="flex gap-2">
                {member.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-2">
                <Tooltip>
                  <TooltipTrigger>
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-5 h-5 text-gray-700 hover:text-black" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>GitHub</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <a href={member.social.portfolio} target="_blank" rel="noopener noreferrer">
                      <FaGlobe className="w-5 h-5 text-green-600 hover:text-green-800" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Portfolio</TooltipContent>
                </Tooltip>
              </div>

              {/* Expandable Bio */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="bio">
                  <AccordionTrigger className="text-sm font-medium text-blue-600">
                    View Bio
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    {member.bio}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Past Events */}
              <Accordion type="single" collapsible className="w-full ">
                <AccordionItem value="events">
                  <AccordionTrigger className="text-sm font-medium text-blue-600">
                    Past Events Organized
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {member.pastEvents.map((event, index) => (
                        <li key={index}>{event}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Members;
