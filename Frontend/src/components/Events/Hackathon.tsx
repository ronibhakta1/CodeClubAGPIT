import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CarouselApi } from "@/components/Events/carousel";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Code2,
  ExternalLink,
  MapPin,
  Menu,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";
import Footer from "../ui/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Events/carousel";
const codingRoom1 = "/events/hackathon2k26/100pc1.jpg";
const codingRoom2 = "/events/hackathon2k26/100pc2.jpg";
const codingRoom3 = "/events/hackathon2k26/100pc3.jpg";

const facultyGroup = "/events/hackathon2k26/allprofessors.jpg";

const jury1 = "/events/hackathon2k26/jury1.jpg";
const jury2 = "/events/hackathon2k26/jury2.jpg";
const jury3 = "/events/hackathon2k26/jury3.jpg";
const jury4 ="/events/hackathon2k26/jury4.jpg";
const jury5 ="/events/hackathon2k26/jury5.jpg";
const jury6 ="/events/hackathon2k26/jury6.jpg";

const samarthHall = "/events/hackathon2k26/samarthhall.jpg";

const winner1 = "/events/hackathon2k26/winner1.jpg";
const winner2 = "/events/hackathon2k26/winner2.jpg";

// 2026 hackathon timing constants
const HACKATHON_2026_START = new Date("2026-06-05T12:00:00");
const HACKATHON_2026_END = new Date("2026-06-14T12:00:00");
const HACKATHON_2026_LOGO = "/events/image.png";
const HACKATHON_2025_LOGO = "/HiRes logo.png";

interface HackathonPhoto {
  src: string;
  label: string;
  orientation?: "landscape" | "portrait";
  wide?: boolean;
}

interface HackathonPhotoSection {
  title: string;
  accent: string;
  icon: typeof Trophy;
  photos: HackathonPhoto[];
}

function getHackathonPhase() {
  const now = new Date();
  if (now < HACKATHON_2026_START) return "before";
  if (now >= HACKATHON_2026_START && now < HACKATHON_2026_END) return "live";
  return "ended";
}

const hackathon2025PhotoSections: HackathonPhotoSection[] = [
  {
    title: "Winners",
    accent: "border-zinc-600 bg-zinc-800 text-zinc-100",
    icon: Trophy,
    photos: [
      { src: winner1, label: "Winner Moment 1", orientation: "portrait" },
      { src: winner2, label: "Winner Moment 2", orientation: "portrait" },
    ],
  },
  {
    title: "Jury",
    accent: "border-zinc-600 bg-zinc-800 text-zinc-100",
    icon: Users,
    photos: [
      { src: jury1, label: "Jury Review 1" },
      { src: jury2, label: "Jury Review 2" },
        { src: jury3, label: "Jury Review 3" },
          { src: jury4, label: "Jury Review 4" },
          { src: jury5, label: "Jury Review 5" },
          { src: jury6, label: "Jury Review 6" },
      

    
    ],
  },
  {
    title: "Faculty",
    accent: "border-zinc-600 bg-zinc-800 text-zinc-100",
    icon: Sparkles,
    photos: [{ src: facultyGroup, label: "Faculty Team", wide: true }],
  },
  {
    title: "Coding Room",
    accent: "border-zinc-600 bg-zinc-800 text-zinc-100",
    icon: Code2,
    photos: [
      { src: codingRoom1, label: "Coding Room 1", wide: true },
      { src: codingRoom2, label: "Coding Room 2", wide: true },
      { src: codingRoom3, label: "Coding Room 3", wide: true },
      { src: samarthHall, label: "Samarth Hall", wide: true },
    ],
  },
];

const hackathon2026Highlights = [
  {
    title: "Build Sprint",
    description: "Two focused days for teams to design, code, test, and present.",
    icon: Code2,
  },
  {
    title: "Mentor Reviews",
    description: "Checkpoint support for product direction and technical choices.",
    icon: Users,
  },
  {
    title: "Project Showcase",
    description: "A polished demo stage for student builders at AGPIT.",
    icon: Trophy,
  },
];

const hackathon2026Timeline = [
  "Registrations closed",
  "Countdown begins: 5th June 2026, 12:00 PM",
  "Shortlist declaration",
  "Project showcase at AGPIT",
];

const Hackathon = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [phase, setPhase] = useState(getHackathonPhase());
  const [juryApi, setJuryApi] = useState<CarouselApi | null>(null);
  const [codingRoomApi, setCodingRoomApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setPhase(getHackathonPhase()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!juryApi) return;
    const interval = setInterval(() => {
      juryApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [juryApi]);

  useEffect(() => {
    if (!codingRoomApi) return;
    const interval = setInterval(() => {
      codingRoomApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [codingRoomApi]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const phaseGlow =
    phase === "live"
      ? "ring-4 ring-cyan-400/60 shadow-cyan-400/40 animate-pulse"
      : phase === "ended"
      ? "ring-4 ring-pink-500/60 shadow-pink-500/40 animate-shake"
      : "";

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col w-full">
      {/* Navbar with Dropdown */}
      <div className="grid-cols-1 bg-zinc-950 border-b-0 border-gray-50 sticky top-0 z-50 gradient-to-r flex justify-between flex-nowrap items-start w-full px-4 md:px-10 py-3 outline">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-10 h-8" />
          <div
            className="logo text-white text-lg md:text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            CODE CLUB AGPIT
          </div>
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
            <li
              className="text-white font-semibold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="text-white font-semibold cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li
              className="text-white font-semibold cursor-pointer"
              onClick={() => navigate("/events")}
            >
              Events
            </li>
            <li
              className="text-white font-semibold cursor-pointer"
              onClick={() => navigate("/events/hackathon")}
            >
              Hackathon
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-white font-semibold focus:outline-none">
                  Members
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black border-gray-700 text-white">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-800"
                    onClick={() => navigate("/members?board=SY")}
                  >
                    Main Board 2025-26
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-800"
                    onClick={() => navigate("/members?board=TY")}
                  >
                    Main Board 2024-25
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-800"
                    onClick={() => navigate("/members?board=FY")}
                  >
                    Founder Board Members
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Side Navigation */}
      <div
        className={`fixed top-0 right-0 h-full bg-black w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileMenu} className="text-white">
            <X size={24} />
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-6">
          <li
            className="text-white text-lg font-semibold cursor-pointer"
            onClick={() => {
              navigate("/");
              toggleMobileMenu();
            }}
          >
            Home
          </li>
          <li
            className="text-white text-lg font-semibold cursor-pointer"
            onClick={() => {
              navigate("/about");
              toggleMobileMenu();
            }}
          >
            About
          </li>
          <li
            className="text-white text-lg font-semibold cursor-pointer"
            onClick={() => {
              navigate("/events");
              toggleMobileMenu();
            }}
          >
            Events
          </li>
          <li
            className="text-white text-lg font-semibold cursor-pointer"
            onClick={() => {
              navigate("/events/hackathon");
              toggleMobileMenu();
            }}
          >
            Hackathon
          </li>
          <li className="text-white text-lg font-semibold">
            <div className="flex flex-col space-y-3">
              <span>Members</span>
              <ul className="pl-4 space-y-3">
                <li
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {
                    navigate("/members?board=SY");
                    toggleMobileMenu();
                  }}
                >
                  Main Board 2025-26
                </li>
                <li
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {
                    navigate("/members?board=TY");
                    toggleMobileMenu();
                  }}
                >
                  Main Board 2024-25
                </li>
                <li
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {
                    navigate("/members?board=AB");
                    toggleMobileMenu();
                  }}
                >
                  Assistant Board Members
                </li>
                <li
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {
                    navigate("/members?board=FY");
                    toggleMobileMenu();
                  }}
                >
                  Founder Board Members
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

      <div className="flex flex-col items-center w-full px-4 py-8 md:px-6 md:py-12">
        <Tabs defaultValue="hackathon-2026" className="w-full max-w-6xl">
          <div className="flex justify-center mb-8">
            <TabsList className="h-auto bg-zinc-900/90 border border-zinc-700 rounded-lg p-1 shadow-xl">
              <TabsTrigger
                value="hackathon-2026"
                className="px-4 py-2 text-zinc-100 rounded-md data-[state=active]:bg-white data-[state=active]:text-zinc-950"
              >
                AGTechathon 2026
              </TabsTrigger>
              <TabsTrigger
                value="history-2025"
                className="px-4 py-2 text-zinc-100 rounded-md data-[state=active]:bg-white data-[state=active]:text-zinc-950"
              >
                History (2025)
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hackathon-2026">
            <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-2xl">
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    {phase === "before" && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-100">
                        <Clock className="h-4 w-4" />
                        Registrations Closed
                      </span>
                    )}
                    {phase === "live" && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-100 animate-pulse">
                        <Sparkles className="h-4 w-4" />
                        Live Now
                      </span>
                    )}
                    {phase === "ended" && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-100">
                        <Trophy className="h-4 w-4" />
                        Event Ended
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
                      <CalendarDays className="h-4 w-4" />
                      Countdown: 5 June 2026, 12:00 PM
                    </span>
                  </div>

                  <h1 className="mb-4 text-4xl font-black tracking-normal text-white md:text-6xl">
                    AGTechathon 2.0
                    <span className="block bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                      2k26
                    </span>
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                    A sharper on-campus hackathon experience for student teams
                    building practical, demo-ready solutions with mentor
                    checkpoints, shortlisting, and a project showcase.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      disabled
                      className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-5 py-3 text-sm font-bold text-zinc-300 opacity-85"
                    >
                      Registrations Closed
                    </button>
                    {/* <a href="/events/hackathon-countdown">
                      <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 sm:w-auto">
                        <Clock className="h-4 w-4" />
                        Countdown
                      </button>
                    </a> */}
                  </div>
                </div>

                <div
                  className={`flex min-h-[260px] items-center justify-center border-t border-zinc-800 bg-black p-6 lg:border-l lg:border-t-0 ${phaseGlow}`}
                >
                  <img
                    src={HACKATHON_2026_LOGO}
                    alt="AGTechathon 2.0 2k26 Logo"
                    className="h-44 w-auto max-w-full rounded-lg object-contain drop-shadow-xl sm:h-56 md:h-64 lg:h-72"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {hackathon2026Highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 shadow-lg"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                  <MapPin className="h-5 w-5 text-zinc-300" />
                  Venue
                </h2>
                <p className="mt-3 text-zinc-300">
                  A.G. Patil Institute of Technology, Solapur
                </p>
                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  Registrations are closed. Tracks, rules, prizes, and updates
                  will be shared through the club channels.
                </p>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                  <CalendarDays className="h-5 w-5 text-zinc-300" />
                  Timeline
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {hackathon2026Timeline.map((item, index) => (
                    <div
                      key={item}
                      className="rounded-lg border border-zinc-800 bg-black/30 p-4"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                        Step {index + 1}
                      </span>
                      <p className="mt-2 text-sm font-medium text-zinc-200">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history-2025">
            <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-2xl">
              <div className="bg-black p-4 sm:p-6">
                <img
                src={HACKATHON_2025_LOGO}
                  alt="AGTechathon 1.0 2k25"
                  className="mx-auto w-full max-w-5xl rounded-lg object-contain"
                />
              </div>

              <div className="grid gap-6 border-t border-zinc-800 p-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h1 className="text-3xl font-black text-white md:text-5xl">
                    2025 Archive
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
                    Photo highlights from AGTechathon 1.0 2k25, organized by
                    Code Club AGPIT.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
                    <CalendarDays className="h-4 w-4" />
                    14-15 June 2025
                  </span>
                  <a
                    href="https://unstop.com/hackathons/agtechathon-10-2k25-a-g-patil-institute-of-technology-solapur-1489400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-cyan-300 hover:text-cyan-100"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Unstop
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {hackathon2025PhotoSections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 shadow-lg"
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border ${section.accent}`}
                      >
                        <section.icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-bold text-zinc-100 md:text-2xl">
                        {section.title}
                      </h2>
                    </div>
                    <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Gallery
                    </span>
                  </div>
                  {(section.title === "Jury" || section.title === "Coding Room") ? (
                    <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-black p-2">
                      <Carousel
                        opts={{ loop: true, align: "start" }}
                        setApi={section.title === "Jury" ? setJuryApi : setCodingRoomApi}
                        className="relative w-full"
                      >
                        <CarouselContent className="w-full">
                          {section.photos.map((photo) => (
                            <CarouselItem
                              key={`${section.title}-${photo.label}`}
                              className="basis-full sm:basis-1/2 lg:basis-1/3"
                            >
                              <figure className="group overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-lg">
                                <div
                                  className={`overflow-hidden bg-zinc-950 ${
                                    photo.orientation === "portrait"
                                      ? "aspect-[3/4]"
                                      : "aspect-[16/9]"
                                  }`}
                                >
                                  <img
                                    src={photo.src}
                                    alt={`${section.title} - ${photo.label}`}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                </div>
                                <figcaption className="border-t border-zinc-800 px-4 py-3">
                                  <p className="text-sm font-semibold text-zinc-200">
                                    {photo.label}
                                  </p>
                                </figcaption>
                              </figure>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-zinc-900/90 hover:bg-zinc-800" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-zinc-900/90 hover:bg-zinc-800" />
                      </Carousel>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {section.photos.map((photo) => (
                        <figure
                          key={`${section.title}-${photo.label}`}
                          className={`group overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-lg ${
                            photo.wide ? "lg:col-span-2" : ""
                          }`}
                        >
                          <div
                            className={`overflow-hidden bg-zinc-950 ${
                              photo.orientation === "portrait"
                                ? "aspect-[3/4]"
                                : "aspect-[16/9]"
                            }`}
                          >
                            <img
                              src={photo.src}
                              alt={`${section.title} - ${photo.label}`}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <figcaption className="border-t border-zinc-800 px-4 py-3">
                            <p className="text-sm font-semibold text-zinc-200">
                              {photo.label}
                            </p>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Hackathon;
