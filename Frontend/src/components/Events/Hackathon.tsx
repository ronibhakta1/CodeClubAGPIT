import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import Footer from "../ui/Footer";

const Hackathon = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col w-full">
      {/* Navbar with Dropdown */}
      <div className="grid-cols-1 bg-zinc-950 border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-4 md:px-10 py-3 outline">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-10 h-8" />
          <div className="logo text-white text-lg md:text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>CODE CLUB AGPIT</div>
        </div>
        {/* Mobile menu toggle button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white p-2">
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

      {/* Main Hackathon Content */}
      <div className="flex flex-col items-center w-full px-4 py-8 md:px-0 md:py-12">
        <div className="flex justify-center mb-4 w-full">
          <img
            src="/HiRes logo.png"
            alt="AGTechathon 1.0 2k25 Logo"
            className="h-32 sm:h-44 md:h-56 lg:h-72 xl:h-80 w-auto object-contain mx-auto"
            style={{ maxWidth: '98vw' }}
          />
        </div>
        <a
          href="https://unstop.com/p/agtechathon-10-2k25-renewed-ag-patil-institute-of-technology-solapur-maharashtra-1495387?utm_medium=Share&utm_source=shortUrl"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 inline-block"
        >
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg md:text-xl transition-all duration-200"
          >
            Register on Unstop
          </button>
        </a>
        <p className="text-lg md:text-xl text-zinc-200 text-center mb-8 max-w-2xl">
          We’re thrilled to welcome you to <b>AGTechathon 1.0 2k25 </b> – a two-day celebration of innovation, learning, and creativity at <b>A.G. Patil Institute of Technology, Solapur</b>!
        </p>

        {/* Round 1: PPT Submission Guidelines & Problem Statements */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md w-full max-w-3xl mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-blue-300">Round 1: PPT Submission Guidelines & Problem Statements</h2>
          <p className="mb-2">Thank you for registering for <b>AGTechathon 1.0 2k25</b>. You are now eligible to participate in Round 1 – the PPT Submission Round, which serves as the initial screening stage for the on-campus hackathon.</p>
          <ul className="list-disc pl-5 mb-2 text-zinc-300">
            <li><b>Round Starts:</b> 4th June 2025</li>
            <li><b>Submission Deadline:</b> 8th June 2025 (11:59 PM IST)</li>
            <li><b>Shortlist Announcement:</b> 10th June 2025</li>
            <li>Shortlisted teams will be invited to the final on-campus hackathon on <b>14th & 15th June 2025</b> at AGPIT, Solapur.</li>
          </ul>
          <div className="mb-2">
            <b>Round Objective:</b> Prepare a 5–6 slide PowerPoint presentation that highlights your selected problem statement, innovative solution, technical approach, and implementation roadmap.
          </div>
          <div className="mb-2">
            <b>Rules & Submission Guidelines:</b> Please refer to the official document for detailed instructions:
            <a href="https://drive.google.com/file/d/1trt177pmOvZWLS55wSwcfNHaUU0TZcTw/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">Rules PDF</a>
          </div>
          <ul className="list-disc pl-5 text-zinc-300 mb-2">
            <li>Team Size: 3 to 4 members</li>
            <li>Submit only one PPT per team (ppt, pptx, pdf format)</li>
            <li>File name format: <b>TeamName_CollegeName.pdf</b></li>
            <li>Language: English</li>
            <li>Plagiarism will lead to disqualification</li>
          </ul>
          <div className="mb-2">
            <b>Submit your PPT using the official form:</b>
            <a href="https://forms.gle/YTYPZKBwjKSDyM2M8" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">Google Form</a>
          </div>
          <div className="mb-2 text-zinc-300">
            If you're unable to submit your ppt via unstop, uploading via this form is mandatory.
          </div>
          <div className="mb-2">
            <b>Problem Statements:</b> Explore and select one problem statement from the official list:
            <a href="https://drive.google.com/file/d/1KXqRwkEX5_W9F65qsdM-y6zTdlvElBB_/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">Problem Statements PDF</a>
          </div>
          <div className="text-zinc-300">
            You may also choose the <b>Open Innovation Track</b> if your idea doesn't fall under the listed categories but offers a meaningful real-world solution.
          </div>
        </div>

        {/* Event Dates & Venue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mb-8">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Event Details</h2>
            <ul className="mb-2 text-zinc-300">
              <li><b>Event Dates:</b> 14th & 15th June 2025</li>
              <li><b>Venue:</b> A.G. Patil Institute of Technology, Solapur</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4 mb-2">Day 1 – 14th June 2025</h3>
            <ul className="list-disc pl-5 text-zinc-300 mb-2">
              <li>🛬 Arrival & Check-in – 8:45 AM</li>
              <li>🍽 Breakfast – 9:00 AM</li>
              <li>🎤 Inauguration – 10:00 AM</li>
              <li>💻 Hackathon Begins – 11:00 AM</li>
              <li>🤔 1st round of offline hackathon – 11:20 AM</li>
              <li>🍴 Lunch – 12:45 PM</li>
              <li>☕ Refreshments – 6:00 PM</li>
              <li>📈 Progress Review – 7:00 PM</li>
              <li>🫓 Dinner – 9:00 PM</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4 mb-2">Day 2 – 15th June 2025</h3>
            <ul className="list-disc pl-5 text-zinc-300">
              <li>🎉 Fun & Games / Networking – 2:00 AM to 3:00 AM</li>
              <li>🍽 Breakfast – 9:00 AM</li>
              <li>⚡ Final Judging – 10:00 AM</li>
              <li>🏆 Prize Distribution – 12:00 PM</li>
              <li>🍴 Lunch – 12:30 PM</li>
            </ul>
          </div>
          {/* Round 1 Update (Online Submission) */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Round 1 Update (Online Submission)</h2>
            <ul className="mb-2 text-zinc-300">
              <li><b>Start Date:</b> 3rd June 2025</li>
              <li><b>Deadline:</b> 8th June 2025</li>
              <li><b>Result Declaration:</b> 10th June 2025</li>
            </ul>
            <div className="mb-2 text-zinc-300">
              <b>Note:</b> If you're unable to submit your PPT, kindly upload it using the Google Form below:
              <a href="https://forms.gle/YTYPZKBwjKSDyM2M8" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">Submission Form</a>
            </div>
            <div className="text-zinc-300">
              Shortlisted teams will be notified individually on 10th June. Only shortlisted teams will participate in the on-campus hackathon.
            </div>
          </div>
        </div>

        {/* Accommodation & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mb-8">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Accommodation Info</h2>
            <p className="text-zinc-300 mb-2">Outstation participants will be provided with safe and comfortable lodging. For queries, contact:</p>
            <h3 className="font-semibold mb-1">Accommodation Coordinators</h3>
            <ul className="mb-2 text-zinc-300">
              <li><b>For girls accommodation:</b> Amruta Lohar – <a href="tel:9359638861" className="text-blue-400 hover:underline">9359638861</a></li>
              <li><b>For boys accommodation:</b> Abhijeet Panchal – <a href="tel:7522960122" className="text-blue-400 hover:underline">7522960122</a></li>
            </ul>
          </div>
          {/* Registration Support */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Registration Support</h2>
            <p className="text-zinc-300 mb-2">For registration-related issues or help:</p>
            <h3 className="font-semibold mb-1">Registration Team</h3>
            <ul className="mb-2 text-zinc-300">
              <li>Samarth Hatte – <a href="tel:8421059196" className="text-blue-400 hover:underline">8421059196</a></li>
              <li>Priyanka Kumbhar – <a href="tel:7414981942" className="text-blue-400 hover:underline">7414981942</a></li>
            </ul>
          </div>
        </div>

        {/* Extras & Contact */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md w-full max-w-3xl mb-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Extras & Contact</h2>
          <ul className="mb-2 text-zinc-300">
            <li>☕ <b>Refreshments:</b> All participants will be provided breakfast, lunch, tea/coffee, and dinner.</li>
            <li>🎮 <b>Extras:</b> Don’t miss out on fun games, challenges, and networking sessions during the event!</li>
          </ul>
          <div className="mb-2 text-zinc-300">
            For any questions, just reply here – we’re here to help!<br />Let’s make <b>AGTechathon 1.0 2k25</b> an unforgettable experience 💫
          </div>
          <div className="text-zinc-300">– Team <b>AGTechathon 1.0 2k25</b></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hackathon;
