'use client';

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
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

interface BoardMember {
  id: number;
  name: string;
  image: string;
  title: string;
  tagline: string;
  post: string;
}

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
    portfolio: "https://linkedin.com/in/ronibhakta1",
  },
  pastEvents: [
    "Hackathon 2024 - Lead Organizer",
    "React Conference - Speaker",
    "CodeFest 2023 - Judge",
  ],
};

const GalleryCarousel = () => {
  const [hoveredImageId, setHoveredImageId] = useState<number | null>(null);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dummyBoardMembers: BoardMember[] = [
    {
      id: 1,
      name: "S.A Patil",
      image: "/SecretaryDesk.png",
      title: "President",
      tagline: "Young, ignited minds is the need of the hour.",
      post: "Secretary"
    },
    {
      id: 2,
      name: "Dr. M A Chougule",
      image: "/campus_director_chougule_sir.jpg",
      title: "Campus Director",
      tagline: "Fostering an environment where ambition thrives and success follows.",
      post: "Campus Director"
    },
    {
      id: 3,
      name: "Dr. V V Potdar",
      image: "/Principal-desk.jpeg.jpg",
      title: "Principal",
      tagline: "Inspiring Leadership, Empowering Futures",
      post: "Principal"
    },
    {
      id: 5,
      name: "Mr. S.V Kulkarni",
      image: "/Kulkarni.jpg",
      title: "HOD CSE",
      tagline: "Guiding brilliance, nurturing innovation, and unlocking potential.",
      post: "Head Of Department"
    }
  ];

  useEffect(() => {
    const fetchBoardMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${BACKEND_URL}/about/board-members`);
        setBoardMembers(response.data.boardMembers);
      } catch (err: any) {
        console.error("Error loading board members from backend:", err);
        setError("Failed to load board members. Using default data.");
        // Fallback to JSON file
        try {
          const response = await fetch('/board_members.json');
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          setBoardMembers(data);
        } catch (jsonErr) {
          console.error("Error loading board members from JSON:", jsonErr);
          setBoardMembers(dummyBoardMembers);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBoardMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      {error && <div className="text-red-400 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {boardMembers.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div
              className="relative aspect-square h-[250px] overflow-hidden rounded-[8px] shadow-lg"
              onMouseEnter={() => setHoveredImageId(item.id)}
              onMouseLeave={() => setHoveredImageId(null)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/default-image.jpg";
                }}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute bottom-0 left-0 h-[50%] w-full"
                blurIntensity={0.5}
                animate={hoveredImageId === item.id ? 'visible' : 'hidden'}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full"
                animate={hoveredImageId === item.id ? 'visible' : 'hidden'}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="flex flex-col items-start gap-0 px-5 py-4">
                  <p className="text-lg font-semibold text-black">{item.title}</p>
                  <span className="text-sm text-black">{item.tagline}</span>
                </div>
              </motion.div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-base font-medium text-white">{item.name}</p>
              <p className="text-sm text-gray-400">{item.post}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
      <div className="grid-cols-1 bg-zinc-950 border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-4 md:px-10 py-3 outline">
        <div className="flex items-center gap-2">
          <img src="./logo.png" alt="logo" className="w-10 h-8" />
          <div className="logo text-white text-lg md:text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
            CODE CLUB AGPIT
          </div>
        </div>
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
      <div className="relative w-full py-20 text-center bg-[url('https://source.unsplash.com/1600x900/?coding,technology')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-2xl md:text-xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center">About Us</h1>
          <br/>
          <p className="mt-4 text-lg text-white">
            Welcome to <strong>A.G. Patil Code Club</strong>! We are a community of passionate tech enthusiasts,
            dedicated to fostering a culture of innovation and continuous learning.
          </p>
        </div>
      </div>
      <h2 className="text-2xl md:text-xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center">AGPIT Board of Directors & Faculty</h2><br />
      <div className="max-w-7xl w-full mt-10">
        <GalleryCarousel />
      </div>
      <div className="max-w-5xl w-full mt-10 px-6">
        <h2 className="text-2xl md:text-xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center">Mission & Vision</h2><br></br><br></br>
        <Card className="w-full max-w-4xl p-4 text-white bg-zinc-900 h-auto border-zinc-700 mx-8 sm:mx-10 md:mx-14 ">
          <CardContent>
            <p className="font-semibold text-zinc-100 text-center">
              Our goal is to create a collaborative space where students can develop coding skills, enhance problem-solving abilities, and build innovative projects.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="max-w-5xl w-full mt-10 px-6">
        <h2 className="text-2xl md:text-xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center">Our Activities</h2><br></br>
        <Card className="w-full max-w-4xl p-4 text-white bg-zinc-900 h-auto border-zinc-700 mx-8 sm:mx-10 md:mx-14">
          <CardContent>
            <ul className="list-disc list-inside space-y-2 font-semibold text-zinc-200">
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
      <br />
      <div className="max-w-5xl w-full mt-16 px-6">
        <h2 className="text-2xl md:text-xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center">Success Stories</h2><br></br>
        <Card className="w-full max-w-4xl p-4 text-white bg-zinc-900 h-auto border-zinc-700 mx-8 sm:mx-10 md:mx-14">
          <CardContent>
            <p className="text-lg text-zinc-100 font-semibold text-center">
              Our members have won prestigious hackathons, secured internships at top tech companies, and contributed to open-source projects. 
              Join us and be part of this journey!
            </p>
          </CardContent>
        </Card>
      </div>
      <br />
      <br />
      <div className="w-full max-w-3xl mx-auto mt-10 px-6">
        <h2 className="text-2xl md:text-xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center">Frequently Asked Questions</h2><br />
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
      <div className="flex justify-center mt-10">
        <Button className="bg-zinc-500 hover:cursor-pointer text-black px-6 py-3 text-lg font-semibold rounded-xl hover:bg-zinc-300 transform transition-transform duration-300 hover:scale-105">
          Join Us
        </Button>
      </div>
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