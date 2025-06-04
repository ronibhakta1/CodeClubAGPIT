import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import Footer from "../ui/Footer";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loadedAvatars, setLoadedAvatars] = useState<Record<string, boolean>>({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
        
        // Preload avatars
        data.forEach((member: Member) => {
          const img = new Image();
          img.src = member.avatar || "/default-avatar.jpg";
          img.onload = () => {
            setLoadedAvatars(prev => ({ ...prev, [member.id]: true }));
          };
          img.onerror = () => {
            const img = new Image();
            img.src = "/default-avatar.jpg";
            setLoadedAvatars(prev => ({ ...prev, [member.id]: true }));
          };
        });
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

  const president = useMemo(() => members.find(member => member.role === "President"), [members]);
  const otherMembers = useMemo(() => members.filter(member => member.role !== "President"), [members]);

  return (
    <div className="bg-zinc-950 min-h-screen w-full">
      <div className="flex flex-col items-center gap-4 pb-4 bg-zinc-950 w-full">
        {/* Navigation Header */}
        <div className="grid-cols-1 bg-zinc-950 border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-4 md:px-10 py-3 outline">
          <div className="flex items-center gap-2">
            <img src="./logo.png" alt="logo" className="w-10 h-8" />
            <div className="logo text-white text-lg md:text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>CODE CLUB AGPIT</div>
          </div>
          {/* Mobile menu toggle button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {/* Desktop Navigation */}
          <div className="nav-links hidden md:flex justify-between items-center w-2/3 md:w-1/2 pr-4 md:pr-40">
            <ul className="flex justify-between items-center w-full text-base md:text-lg lg:text-2xl gap-2 md:gap-6 lg:gap-10">
              <li className="text-white font-semibold cursor-pointer" onClick={() => navigate("/")}>Home</li>
              <li className="text-white font-semibold cursor-pointer" onClick={() => navigate("/about")}>About</li>
              <li className="text-white font-semibold cursor-pointer" onClick={() => navigate("/events")}>Events</li>
              <li className="text-white font-semibold cursor-pointer" onClick={() => navigate("/events/hackathon")}>Hackathon</li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-white font-semibold focus:outline-none">
                    Members
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black border-gray-700 text-white">
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-gray-800"
                      onClick={() => navigate("/members?board=TY")}
                    >
                      Main Board
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-gray-800"
                      onClick={() => navigate("/members?board=SY")}
                    >
                      Assistant Board
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer hover:bg-gray-800"
                      onClick={() => navigate("/members?board=FY")}
                    >
                      Last Year Board
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Side Navigation */}
        <div className={`fixed top-0 right-0 h-full bg-zinc-950 w-64 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} className="text-white">
              <X size={24} />
            </button>
          </div>
          <ul className="flex flex-col p-4 space-y-6">
            <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/"); toggleMobileMenu();}}>
              Home
            </li>
            <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/about"); toggleMobileMenu();}}>
              About
            </li>
            <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/events"); toggleMobileMenu();}}>
              Events
            </li>
            <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/events/hackathon"); toggleMobileMenu();}}>
              Hackathon
            </li>
            <li className="text-white text-lg font-semibold">
              <div className="flex flex-col space-y-3">
                <span>Members</span>
                <ul className="pl-4 space-y-3">
                  <li 
                    className="text-gray-300 cursor-pointer hover:text-white"
                    onClick={() => {handleBoardChange("TY"); toggleMobileMenu();}}
                  >
                    Main Board (TY)
                  </li>
                  <li 
                    className="text-gray-300 cursor-pointer hover:text-white"
                    onClick={() => {handleBoardChange("SY"); toggleMobileMenu();}}
                  >
                    Assistant Board (SY)
                  </li>
                  <li 
                    className="text-gray-300 cursor-pointer hover:text-white"
                    onClick={() => {handleBoardChange("FY"); toggleMobileMenu();}}
                  >
                    Last Year Board (FY)
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        {/* Overlay when mobile menu is open */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-zinc-950 bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          ></div>
        )}
        <h1 className="text-2xl md:text-xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center ">
          {getBoardTitle()}
        </h1>

        {president && (
          <Card className="w-full max-w-3xl p-4 text-white bg-zinc-900 h-auto border-zinc-700 mx-8 sm:mx-10 md:mx-14">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-2 border-zinc-600">
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
                <h2 className="text-lg sm:text-xl font-bold">{president.name}</h2>
                <p className="text-zinc-300">{president.role}</p>
                <p className="text-xs sm:text-sm text-zinc-200">{president.bio}</p>
                <div className="flex justify-center sm:justify-start gap-3 mt-1">
                  {president.social.github && president.social.github !== "None" && (
                    <a href={president.social.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300 hover:text-white" />
                    </a>
                  )}
                  <a href={president.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 hover:text-blue-300" />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Grid layout - modified with increased padding and better centering */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-6 sm:px-16 md:px-24 lg:px-32 xl:px-40 sm:place-items-start place-items-center">
          {otherMembers.map((member) => (
            <div 
              key={member.id} 
              className={`relative transition-transform duration-200 hover:scale-[1.03] hover:z-10 w-full max-w-full sm:max-w-none ${member.role === "President" ? "col-span-full sm:col-span-2 md:col-span-3" : ""}`}
              data-member-id={member.id}
            >
              <Card className={`${member.role === "President" ? "sm:h-auto h-auto" : "sm:h-[350px] h-[280px]"} flex flex-col text-white bg-zinc-900 w-full group border-zinc-700`}>
                <div className="p-4 flex flex-col items-center h-full">
                  <Avatar className={`${member.role === "President" ? "w-32 h-32 sm:w-40 sm:h-40" : "sm:w-24 sm:h-24 w-16 h-16"} mb-4 border-2 border-zinc-600`}>
                    {loadedAvatars[member.id] ? (
                      <img 
                        src={member.avatar || "/default-avatar.jpg"} 
                        alt={member.name}
                        className="w-full h-full rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/default-avatar.jpg";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-zinc-800 animate-pulse"></div>
                    )}
                  </Avatar>
                  
                  <CardHeader className="p-0 text-center mb-2 sm:mb-4 w-full">
                    <CardTitle className={`${member.role === "President" ? "text-lg sm:text-xl" : "sm:text-base text-sm"}`}>{member.name}</CardTitle>
                    <p className={`${member.role === "President" ? "text-base" : "sm:text-sm text-xs"} text-zinc-300`}>{member.role}</p>
                    <p className="text-xs text-zinc-400 break-words px-2">{member.domain}</p>
                  </CardHeader>

                  <div className="flex flex-col items-center justify-between flex-grow w-full">
                    <div className="flex gap-3 mb-2 sm:mb-4 group-hover:[&:not(:hover)]:opacity-70 transition-opacity duration-200">
                      {member.social.github && member.social.github !== "None" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                              <FaGithub className="sm:w-5 sm:h-5 w-4 h-4 text-zinc-300 hover:text-white" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent className="bg-zinc-800 text-white border-zinc-700">
                            GitHub
                          </TooltipContent>
                        </Tooltip>
                      )}

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="sm:w-5 sm:h-5 w-4 h-4 text-blue-400 hover:text-blue-300" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent className="bg-zinc-800 text-white border-zinc-700">
                          LinkedIn
                        </TooltipContent>
                      </Tooltip>

                      {member.social.portfolio && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a href={member.social.portfolio} target="_blank" rel="noopener noreferrer">
                              <FaGlobe className="sm:w-5 sm:h-5 w-4 h-4 text-green-400 hover:text-green-300" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent className="bg-zinc-800 text-white border-zinc-700">
                            Portfolio
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <div className="w-full mt-auto relative">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <button 
                            className="w-full sm:text-sm text-xs bg-blue-600 hover:bg-blue-700 text-white sm:py-2 py-1.5 rounded transition-colors duration-150 z-20 relative"
                            onMouseEnter={() => {
                              const card = document.querySelector(`[data-member-id="${member.id}"]`);
                              if (card) {
                                card.classList.add('opacity-70');
                              }
                            }}
                            onMouseLeave={() => {
                              const card = document.querySelector(`[data-member-id="${member.id}"]`);
                              if (card) {
                                card.classList.remove('opacity-70');
                              }
                            }}
                          >
                            View Bio
                          </button>
                        </HoverCardTrigger>
                        <HoverCardContent 
                          className="w-60 p-2 text-white bg-zinc-800 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-30 transition-all duration-75 border-zinc-700"
                          side="top"
                          align="center"
                        >
                          <p className="text-sm">{member.bio}</p>
                          <div className="mt-1 text-xs text-zinc-400">
                            <p>Year: {member.yearOfStudy}</p>
                            <p>Graduation: {member.yearOfPassing}</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Members;