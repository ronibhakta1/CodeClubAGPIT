import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useEffect, useState } from "react";

interface Member {
  id: number;
  name: string;
  avatar: string;
  email: string;
  linkedin: string;
  role: string;
  domain: string;
  yearOfStudy: string;
  yearOfPassing: number;
  bio: string;
  social: {
    github: string;
    portfolio: string;
  };
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/club_members_TY.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) throw new Error('Response is not JSON');
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load members');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return (
    <div className="flex flex-col justify-center items-center min-h-screen text-red-500 gap-2 p-4 text-center">
      <p className="font-medium">Error loading members:</p>
      <p className="text-sm mb-2">{error}</p>
      <ul className="text-xs text-left list-disc pl-4">
        <li>Check JSON file exists in public folder</li>
        <li>Verify JSON syntax is valid</li>
        <li>Ensure filename is correct (case-sensitive)</li>
      </ul>
    </div>
  );

  const president = members.find(member => member.role === "President");

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full">
      <h1 className="text-2xl font-semibold mb-2">MAIN BOARD MEMBERS</h1>

      {president && (
        <Card className="w-full max-w-3xl p-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-40 h-40">
              <img
                src={president.avatar || "/default-avatar.jpg"}
                alt={president.name}
                className="w-full h-full rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/default-avatar.jpg";
                }}
              />
            </Avatar>
            <div className="text-center sm:text-left space-y-2">
              <h2 className="text-xl font-bold">{president.name}</h2>
              <p className="text-gray-600">{president.role}</p>
              <p className="text-sm">{president.bio}</p>
              <div className="flex gap-3 mt-1">
                {president.social.github && president.social.github !== "None" && (
                  <a href={president.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="w-5 h-5 text-gray-700 hover:text-black" />
                  </a>
                )}
                <a href={president.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                </a>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  h-45 w-270">
        {members
          .filter(member => member.role !== "President")
          .map((member) => (
            <Card key={member.id} className="h-[350px] flex flex-col">
              <div className="p-4 flex flex-col items-center h-full">
                <Avatar className="w-24 h-24 mb-4">
                  <img 
                    src={member.avatar || "/default-avatar.jpg"} 
                    alt={member.name}
                    className="w-full h-full rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default-avatar.jpg";
                    }}
                  />
                </Avatar>
                
                <CardHeader className="p-0 text-center mb-4 w-full">
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  <p className="text-xs text-gray-400 break-words px-2">{member.domain}</p>
                </CardHeader>

                <div className="flex flex-col items-center justify-between flex-grow w-full">
                  <div className="flex gap-3 mb-4">
                    {member.social.github && member.social.github !== "None" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub className="w-5 h-5 text-gray-700 hover:text-black" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>GitHub</TooltipContent>
                      </Tooltip>
                    )}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <FaLinkedin className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>LinkedIn</TooltipContent>
                    </Tooltip>

                    {member.social.portfolio && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={member.social.portfolio} target="_blank" rel="noopener noreferrer">
                            <FaGlobe className="w-5 h-5 text-green-600 hover:text-green-800" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Portfolio</TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  <div className="w-full mt-auto">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button className="w-full text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                          View Bio
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-60 p-2">
                        <p className="text-sm">{member.bio}</p>
                        <div className="mt-1 text-xs text-gray-500">
                          <p>Year: {member.yearOfStudy}</p>
                          <p>Graduation: {member.yearOfPassing}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Members;