import { CoverDemo } from "./homepage/covertitle";
import { TimelineDemo } from "./homepage/timeline";
import { useNavigate } from "react-router-dom";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
    ChevronDown, 
    Menu, 
    X, 
} from "lucide-react";
import { useState } from "react";
import Footer from "./ui/Footer";

const Homepage = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <div className="bg-black min-h-screen w-screen flex flex-col">
                {/* Navbar */}
                <div className="grid-cols-1 bg-zinc-950 border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-4 md:px-10 py-3 outline">
                    <div className="flex items-center gap-2">
                        <img src="./logo.png" alt="logo" className="w-10 h-8" />
                        <div className="logo text-white text-lg md:text-xl font-bold cursor-pointer">CODE CLUB AGPIT</div>
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

                {/* Stats Banner - below the navbar */}
                {/* <div className="w-full bg-gradient-to-r from-zinc-900 via-black to-zinc-900 py-2 flex justify-center items-center border-t border-zinc-800">
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 px-4">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-400" />
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs text-zinc-400">Members:</span>
                                <CountUp
                                    from={0}
                                    to={134}
                                    separator=","
                                    direction="up"
                                    duration={1.5}
                                    className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                                />
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                            <div className="flex items-center gap-1.5">
                                <span className="text-xs text-zinc-400">Visitors:</span>
                                <CountUp
                                    from={0}
                                    to={254}
                                    separator=","
                                    direction="up"
                                    duration={1.5}
                                    className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500"
                                />
                            </div>
                        </div>
                    </div>
                </div> */}

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
                        <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/events/hackathon"); toggleMobileMenu();}}>
                            Hackathon
                        </li>
                        <li className="text-white text-lg font-semibold">
                            <div className="flex flex-col space-y-3">
                                <span>Members</span>
                                <ul className="pl-4 space-y-3">
                                    <li 
                                        className="text-gray-300 cursor-pointer hover:text-white"
                                        onClick={() => {navigate("/members?board=TY"); toggleMobileMenu();}}
                                    >
                                        Main Board
                                    </li>
                                    <li 
                                        className="text-gray-300 cursor-pointer hover:text-white"
                                        onClick={() => {navigate("/members?board=SY"); toggleMobileMenu();}}
                                    >
                                        Assistant Board
                                    </li>
                                    <li 
                                        className="text-gray-300 cursor-pointer hover:text-white"
                                        onClick={() => {navigate("/members?board=FY"); toggleMobileMenu();}}
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

                <div className="flex-grow">
                    <div className="flex flex-col grid-cols-2 items-center justify-center py-40">
                        <div><CoverDemo /></div>
                    </div>
                    <TimelineDemo />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Homepage;