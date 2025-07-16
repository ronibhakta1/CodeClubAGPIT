import { useEffect, useState } from "react";
import { CoverDemo } from "./homepage/covertitle";
import { TimelineDemo } from "./homepage/timeline";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, Users } from "lucide-react";
import Footer from "./ui/Footer";
import { PageViews } from "./PageViews";

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [memberCount, setMemberCount] = useState<number | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("https://v1.codeclub.workers.dev/page-views/count");
        const data = await res.json();
        setVisitorCount(data.count);
        setMemberCount(134); // Set static or dynamic as per need
      } catch (err) {
        console.error("Error fetching counts:", err);
        setVisitorCount(0);
        setMemberCount(0);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="bg-black min-h-screen w-screen flex flex-col">
      {/* Navbar */}
      <div className="bg-zinc-950 sticky top-0 z-50 flex justify-between items-start w-full px-4 md:px-10 py-3">
        <div className="flex items-center gap-2">
          <img src="./logo.png" alt="logo" className="w-10 h-8" />
          <div className="text-white text-lg md:text-xl font-bold cursor-pointer">CODE CLUB AGPIT</div>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex justify-between items-center w-2/3 md:w-1/2 pr-4 md:pr-40">
          <ul className="flex justify-between items-center w-full text-base md:text-lg lg:text-2xl gap-6">
            <li className="text-white font-semibold cursor-pointer" onClick={() => navigate("/")}>Home</li>
            <li className="text-white font-semibold cursor-pointer" onClick={() => navigate("/about")}>About</li>
            <li className="text-white font-semibold cursor-pointer" onClick={() => navigate("/events")}>Events</li>
            <li className="text-white font-semibold cursor-pointer" onClick={() => navigate("/events/hackathon")}>Hackathon</li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-white font-semibold">
                  Members
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border-gray-700 text-white">
                  <DropdownMenuItem onClick={() => navigate("/members?board=TY")}>Main Board</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/members?board=SY")}>Assistant Board</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/members?board=FY")}>Last Year Board</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full bg-gradient-to-r from-zinc-900 via-black to-zinc-900 py-2 flex justify-center items-center border-t border-zinc-800">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 px-4">
          <div className="flex items-center gap-2">
          
           <div className="text-center flex flex-col items-center gap-1.5">
  <span className="text-white text-sm block">Members</span>
  <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700">
    {memberCount ?? "..."}
  </span>
</div>


          </div>

          <PageViews count={visitorCount} />
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex flex-col items-center justify-center py-40">
          <CoverDemo />
        </div>
        <TimelineDemo />
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
