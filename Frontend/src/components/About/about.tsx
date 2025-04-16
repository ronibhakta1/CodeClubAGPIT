import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

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

const About = () => {  
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleBoardChange = (board: string) => {
    navigate(`/members?board=${board}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-900 bg-black w-full overflow-x-hidden">
      {/* Navbar with Dropdown */}
      <div className="grid-cols-1 bg-black border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-10 py-3 outline">
        <div className="flex items-center gap-2">
          <img src="./logo.png" alt="logo" className="w-10 h-8" />
          <div className="logo text-white text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
            CODE CLUB AGPIT
          </div>
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
        <div className="nav-links hidden md:flex justify-between items-center w-1/2 pr-40">
          <ul className="flex justify-between items-center w-full md:text-2xl lg:text-3x">
            <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/about")}>
              About
            </li>
            <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => navigate("/events")}>
              Events
            </li>
            
            {/* Members Dropdown */}
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
                    Main Board
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-gray-800"
                    onClick={() => handleBoardChange("SY")}
                  >
                    Assistant Board
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-gray-800"
                    onClick={() => handleBoardChange("FY")}
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
      <div className={`fixed top-0 right-0 h-full bg-black w-64 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
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
          <li className="text-white text-lg font-semibold">
            <div className="flex flex-col space-y-3">
              <span>Members</span>
              <ul className="pl-4 space-y-3">
                <li 
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {handleBoardChange("TY"); toggleMobileMenu();}}
                >
                  Main Board
                </li>
                <li 
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {handleBoardChange("SY"); toggleMobileMenu();}}
                >
                  Assistant Board
                </li>
                <li 
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {handleBoardChange("FY"); toggleMobileMenu();}}
                >
                  Last Year Board
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Rest of your About page content remains exactly the same */}
      <div className="relative w-full py-20 text-center bg-[url('https://source.unsplash.com/1600x900/?coding,technology')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-white">About Us</h1>
          <br />
          <p className="mt-4 text-lg text-white">
            Welcome to <strong>A.G. Patil Code Club</strong>! We are a community of passionate tech enthusiasts,
            dedicated to fostering a culture of innovation and continuous learning.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-5xl w-full mt-10 px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Mission & Vision</h2>
        <Card className="bg-white rounded-2xl shadow-xl border">
          <CardContent>
            <p className="font-semibold text-gray-800">
              Our goal is to create a collaborative space where students can develop coding skills, enhance problem-solving abilities, and build innovative projects.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Our Activities Section */}
      <div className="max-w-5xl w-full mt-10 px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Our Activities</h2>
        <Card className="bg-white rounded-2xl shadow-xl border">
          <CardContent>
            <ul className="list-disc list-inside space-y-2 font-semibold text-gray-800">
              <li>Hackathons & Coding Challenges</li>
              <li>Tech Talks & Webinars</li>
              <li>Open Source Contributions</li>
              <li>Competitive Programming Sessions</li>
              <li>Certification & Skill Development</li>
              <li>Startup & Innovation Guidance</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Success Stories Section */}
      <div className="max-w-5xl w-full mt-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Success Stories</h2>
        <Card className="bg-white rounded-2xl shadow-lg p-6 border">
          <CardContent>
            <p className="text-lg text-gray-700 font-semibold text-center">
              Our members have won prestigious hackathons, secured internships at top tech companies, and contributed to open-source projects. 
              Join us and be part of this journey!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-3xl mx-auto mt-10 px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-4 text-white">
          <AccordionItem value="question-1">
            <AccordionTrigger>How can I join the club?</AccordionTrigger>
            <AccordionContent>
              You can join by registering on our website or attending our sessions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="question-2">
            <AccordionTrigger>What programming languages do you focus on?</AccordionTrigger>
            <AccordionContent>
              We cover Python, JavaScript, Java, C++, and web technologies.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="question-3">
            <AccordionTrigger>Do I need prior experience?</AccordionTrigger>
            <AccordionContent>
              No, we welcome beginners and experts alike!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Join Us Button */}
      <div className="flex justify-center mt-10">
        <Button className="bg-white text-black px-6 py-3 text-lg font-semibold rounded-xl hover:bg-white transform transition-transform duration-300 hover:scale-105">
          Join Us
        </Button>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center mt-10 pb-10 text-center text-white">
        <p className="text-gray-400">
          A.G. Patil Institute of Technology, Solapur, Maharashtra, India
        </p>
        <Separator className="my-4 w-64 bg-gray-700" />
        <div className="flex gap-4">
          <a href={user.social.github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-6 h-6 text-gray-400 hover:text-white" />
          </a>
          <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-6 h-6 text-blue-400 hover:text-blue-300" />
          </a>
          <a href={user.social.portfolio} target="_blank" rel="noopener noreferrer">
            <FaGlobe className="w-6 h-6 text-green-400 hover:text-green-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;