import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>("TY");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const board = params.get('board') || 'TY';
        setSelectedBoard(board);
        const fileName = `/club_members_${board}.json`;

        const response = await fetch(fileName);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        console.error("Error loading members:", err);
      } 
    };

    fetchMembers();
  }, [location.search]);

  const handleBoardChange = (board: string) => {
    navigate(`/members?board=${board}`);
  };

  const getBoardTitle = () => {
    switch (selectedBoard) {
      case "TY": return "MAIN BOARD MEMBERS";
      case "SY": return "ASSISTANT BOARD MEMBERS";
      case "FY": return "LAST YEAR BOARD MEMBERS";
      default: return "MEMBERS";
    }
  };

  const president = members.find(member => member.role === "President");

  return (
    <div className="bg-black min-h-screen w-full">
      <div className="flex flex-col items-center gap-4 pb-4 bg-black w-full">
        {/* Navigation Header */}
        <div className="grid-cols-1 bg-black border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-10 py-3 outline">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-10 h-8" />
            <div className="logo text-white text-xl font-bold cursor-pointer">CODE CLUB AGPIT</div>
          </div>
          <div className="nav-links flex justify-between items-center w-1/2 pr-40">
            <ul className="flex justify-between items-center w-full md:text-2xl lg:text-3x">
              <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/")}>Home</li>
              <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/about")}>About</li>
              <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/events")}>Events</li>
              
              {/* Members with Dropdown */}
              <li className="text-white text-lg font-semibold">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none hover:text-gray-300">
                    Members <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black border-gray-700 text-white">
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-gray-800"
                      onClick={() => handleBoardChange("TY")}
                    >
                      Main Board (TY)
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-gray-800"
                      onClick={() => handleBoardChange("SY")}
                    >
                      Assistant Board (SY)
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-gray-800"
                      onClick={() => handleBoardChange("FY")}
                    >
                      Last Year Board (FY)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>

        {/* Content - Everything below remains exactly the same */}
        <h1 className="text-2xl text-white font-semibold my-4 underline">
          {getBoardTitle()}
        </h1>

        {president && (
          <Card className="w-full max-w-3xl p-4 text-black h-auto">
            <div className="flex flex-col sm:flex-row items-center gap-6">
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
                <p className="text-black-400">{president.role}</p>
                <p className="text-sm">{president.bio}</p>
                <div className="flex gap-3 mt-1">
                  {president.social.github && president.social.github !== "None" && (
                    <a href={president.social.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-5 h-5 hover:text-GRAY" />
                    </a>
                  )}
                  <a href={president.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="w-5 h-5 text-blue-600 hover:text-blue-300" />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-270 px-4">
          {members
            .filter(member => member.role !== "President")
            .map((member) => (
              <Card key={member.id} className="h-[350px] flex flex-col text-black w-[200]px">
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
                    <p className="text-sm text-black-400">{member.role}</p>
                    <p className="text-xs text-gray-500 break-words px-2">{member.domain}</p>
                  </CardHeader>

                  <div className="flex flex-col items-center justify-between flex-grow w-full">
                    <div className="flex gap-3 mb-4">
                      {member.social.github && member.social.github !== "None" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                              <FaGithub className="w-5 h-5 hover:text-BLACK" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-white">GitHub</TooltipContent>
                        </Tooltip>
                      )}

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="w-5 h-5 text-blue-600" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 text-white">LinkedIn</TooltipContent>
                      </Tooltip>

                      {member.social.portfolio && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a href={member.social.portfolio} target="_blank" rel="noopener noreferrer">
                              <FaGlobe className="w-5 h-5 text-green-400 hover:text-green-300" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-white">Portfolio</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <div className="w-full mt-auto relative">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex flex-col p-auto items-center">
                            <button className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                              View Bio
                            </button>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent 
                          className="w-60 p-2 text-black absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10"
                          side="top"
                          align="center"
                        >
                          <p className="text-sm">{member.bio}</p>
                          <div className="mt-1 text-xs text-gray-400">
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
    </div>
  );
};

export default Members;