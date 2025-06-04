import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/Events/carousel";

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
  FAST_DIALOG_TRANSITION,
} from "@/components/Events/morphing-dialog";

import { PlusIcon } from "lucide-react";

import { ScrollArea } from "@/components/Events/scroll-area";

import eventData from "@/components/Events/eventData.json";
import { BorderTrail } from "@/components/Events/border-trail";




export function BorderTrailHr() {
  return (
    <div className="relative h-[4px] w-full max-w-[1200px] mx-auto overflow-hidden ">
      {/* Background line base */}
      <div className="absolute inset-0 " />

      {/* Animated border trail */}
      <BorderTrail
        className="bg-gradient-to-r from-blue via-blue-500 to-blue"
        size={1300}
      />
    </div>
  );
}



import activeEvents from "@/components/Events/activeEvent.json";
import Footer from "../ui/Footer";

const Events = () => {
  const navigate = useNavigate();
  const eventList = activeEvents.activeEvents.slice(3); // Skip first 3 (Active, Upcoming, Past)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [, setCurrent] = useState(0);
  const totalSlides = eventList.length;


  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollTo((api.selectedScrollSnap() + 1) % totalSlides);
    }, 3000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [api, totalSlides]);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleBoardChange = (board: string) => {
    navigate(`/members?board=${board}`);
  };


  return (
    <div className="flex flex-col min-h-screen h-auto w-full text-gray-900 bg-zinc-950">
      {/* Navbar with Dropdown */}
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
          <li className="text-white text-lg font-semibold cursor-pointer" onClick={() => {navigate("/events/hackathon"); toggleMobileMenu();}}>
            Hackathon
          </li>
          <li className="text-white text-lg font-semibold">
            <div className="flex flex-col space-y-3">
              <span>Members</span>
              <ul className="pl-4 space-y-3">
                <li
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {
                    handleBoardChange("TY");
                    toggleMobileMenu();
                  }}
                >
                  Main Board
                </li>
                <li
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {
                    handleBoardChange("SY");
                    toggleMobileMenu();
                  }}
                >
                  Assistant Board
                </li>
                <li
                  className="text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => {
                    handleBoardChange("FY");
                    toggleMobileMenu();
                  }}
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


      {/* Past Event */}
      <div className="mt-3 flex w-full ">
        <h1 className="text-2xl md:text-xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center w-full">
          PAST EVENTS
        </h1>
      </div>
      {/* add hr line for main board */}
      <div className="text-center font-semibold text-white ">
        <p className="text-lg font-extralight py-4">{activeEvents.activeEvents[2].name1}</p>
      </div>
      <BorderTrailHr />
      {/* Carousel Section for Past Events */}
      <div className="flex gap-30 mb-10 px-0 w-full max-w-[1200px] mx-auto relative">
        <Carousel
          opts={{ loop: true }}
          setApi={setApi}
          className="w-full max-w-[1000px] md:max-w-[1000px] h-[400px] relative overflow-visible mx-auto"
        >
          <CarouselContent className="w-full flex-nowrap flex ">
            {eventList.map((event, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 "
              >
                <div className="p-4">
                  <MorphingDialog transition={FAST_DIALOG_TRANSITION}>
                    {/* Clickable Event Card */}
                    <MorphingDialogTrigger
                      style={{ borderRadius: "12px", height: "380px" }}
                      className="text-white bg-zinc-900 h-auto border-zinc-700"
                    >
                      <img
                        src={event.image1}
                        alt={event.name}
                        className="w-full h-[200px] object-cover rounded-md"
                      />
                      <div className="p-3 flex-grow">
                        <MorphingDialogTitle className="text-zinc-200 dark:text-zinc-50 font-semibold">
                          {event.name}
                        </MorphingDialogTitle>
                        <div className="event-card flex-grow font-extralight">
                          <p className="line-clamp-3 text-zinc-300 dark:text-zinc-50 ">
                            {event.detail?.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="relative -translate-y-2 ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-900/10 text-zinc-500 hover:text-zinc-400 transition-colors bg-zinc-800 hover:bg-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800  dark:hover:text-zinc-500 dark:focus-visible:ring-zinc-500"
                        aria-label="Open dialog"
                      >
                        <PlusIcon size={12} />
                      </button>
                    </MorphingDialogTrigger>
                    {/* Expanded Dialog Content */}
                    <MorphingDialogContainer>
                      <MorphingDialogContent
                        style={{ borderRadius: "24px" }}
                        className="relative flex flex-col overflow-hidden border border-zinc-950/10  sm:w-[400px] sm:max-h-[570px]"
                      >
                        {/*  New Carousel for Multiple Images */}
                        <Carousel>
                          <CarouselContent>
                            <CarouselItem>
                              <img
                                src={event.image1}
                                alt="Event Image 1"
                                className="h-80 w-full object-cover"
                              />
                            </CarouselItem>
                            <CarouselItem>
                              <img
                                src={event.image2}
                                alt="Event Image 2"
                                className="h-80 w-full object-cover"
                              />
                            </CarouselItem>
                            <CarouselItem>
                              <img
                                src={event.image3}
                                alt="Event Image 3"
                                className="h-80 w-full object-cover"
                              />
                            </CarouselItem>
                          </CarouselContent>
                          <CarouselPrevious className="absolute z-30 left-2 top-1/2 -translate-y-1/2 flex items-center justify-center aspect-square w-10 h-10 p-0 rounded-full shadow-lg bg-zinc-800 text-zinc-100 hover:text-zinc-100 hover:cursor-pointer hover:bg-zinc-800 transition" />
                          <CarouselNext className="absolute z-30 right-2 top-1/2 -translate-y-1/2 flex items-center justify-center aspect-square w-10 h-10 p-0 rounded-full shadow-lg bg-zinc-800 text-zinc-100 hover:text-zinc-100 hover:cursor-pointer hover:bg-zinc-800 transition" />
                        </Carousel>
                        <div className="p-6">
                          <MorphingDialogTitle className="text-2xl text-zinc-100 dark:text-zinc-50 ">
                            {event.name}
                          </MorphingDialogTitle>
                          <ScrollArea className="h-[200px] w-full max-w-xs sm:max-w-sm rounded-md border p-4 mx-auto">
                            <MorphingDialogDescription
                              disableLayoutAnimation
                              variants={{
                                initial: {
                                  opacity: 0,
                                  scale: 0.8,
                                  y: 100,
                                },
                                animate: { opacity: 1, scale: 1, y: 0 },
                                exit: { opacity: 0, scale: 0.8, y: 100 },
                              }}
                            >
                              <p className="mt-2 text-zinc-400 dark:text-zinc-400 text-center">
                                {event.detail}
                              </p>
                            </MorphingDialogDescription>
                          </ScrollArea>
                        </div>
                        <MorphingDialogClose className="text-zinc-50" />
                      </MorphingDialogContent>
                    </MorphingDialogContainer>
                  </MorphingDialog>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute z-30 left-2 top-1/2 -translate-y-1/2 flex items-center justify-center aspect-square w-10 h-10 p-0 rounded-full shadow-lg bg-zinc-800 text-zinc-100 hover:text-zinc-100 hover:cursor-pointer hover:bg-zinc-800" />
          <CarouselNext className="absolute z-30 right-2 top-1/2 -translate-y-1/2 flex items-center justify-center aspect-square w-10 h-10 p-0 rounded-full shadow-lg bg-zinc-800 text-zinc-100 hover:text-zinc-100 hover:cursor-pointer hover:bg-zinc-800" />
        </Carousel>
      </div>

      

      {/* Add hr line for  main board */}

      <div className="text-center mt-16 mb-4 font-semibold text-white py-6">
        <p className="text-lg font-extralight">
          {activeEvents.activeEvents[2].name1} : {activeEvents.activeEvents[2].year}
        </p>
      </div>
      <BorderTrailHr />

      <div className="flex gap-30 mb-10 px-0 w-full max-w-[1200px] mx-auto">
        {/* Carousel Section */}
        <div className="flex flex-col gap-6 mb-10 px-4 sm:px-6 md:px-10 py-4 w-full max-w-[1200px] mx-auto">
          <Carousel className="w-full max-w-[1000px] md:max-w-[1000px] h-[400px] relative overflow-visible mx-auto ">
            <CarouselContent className="w-full ">
              {eventData.events.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 md:basis-1/3"
                >
                  <div className="p-4 h-full ">
                    <MorphingDialog transition={FAST_DIALOG_TRANSITION}>
                      {/* Trigger */}
                      <MorphingDialogTrigger
                        style={{ borderRadius: "12px", height: "100%" }}
                        className="text-white bg-zinc-900 h-auto border-zinc-700"
                      >
                        <img
                          src={event.image1}
                          alt={event.name}
                          className="w-full h-[200px] object-cover rounded-md"
                        />
                        <div className="p-3 flex-grow">
                          <MorphingDialogTitle className="text-zinc-100 dark:text-zinc-50 font-semibold">
                            {event.name}
                          </MorphingDialogTitle>
                          <div className="event-card flex-grow font-extralight">
                            <p className="line-clamp-3 text-zinc-300 dark:text-zinc-50">
                              {event.description?.substring(0, 100)}...
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="relative -translate-y-2 ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-400 transition-colors bg-zinc-800 hover:bg-zinc-800 hover:text-zinc-300 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
                          aria-label="Open dialog"
                        >
                          <PlusIcon size={12} />
                        </button>
                      </MorphingDialogTrigger>

                      {/* Dialog Content */}
                      <MorphingDialogContainer>
                        <MorphingDialogContent
                          style={{ borderRadius: "24px" }}
                          className="relative flex flex-col overflow-hidden text-white bg-zinc-900 h-auto border-zinc-700 sm:w-[400px] sm:max-h-[570px]"
                        >
                          <Carousel>
                            <CarouselContent>
                              {[event.image1, event.image2, event.image3].map(
                                (img, i) => (
                                  <CarouselItem key={i}>
                                    <img
                                      src={img}
                                      alt={`Event Image ${i + 1}`}
                                      className="h-80 w-full object-cover"
                                    />
                                  </CarouselItem>
                                )
                              )}


                            </CarouselContent>
                            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center aspect-square w-10 h-10 p-0 rounded-full shadow-md bg-zinc-800 text-zinc-100 hover:text-zinc-100 hover:cursor-pointer hover:bg-zinc-800" />
                            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center aspect-square w-10 h-10 p-0 rounded-full shadow-md bg-zinc-800 text-zinc-100 hover:text-zinc-100 hover:cursor-pointer hover:bg-zinc-800" />
                          </Carousel>

                          <div className="p-6">
                            <MorphingDialogTitle className="text-2xl text-zinc-100 dark:text-zinc-50">
                              {event.name}
                            </MorphingDialogTitle>

                            <ScrollArea className="h-[200px] w-full max-w-xs sm:max-w-sm rounded-md border p-4 mx-auto ">
                              <MorphingDialogDescription
                                disableLayoutAnimation
                                variants={{
                                  initial: {
                                    opacity: 0,
                                    scale: 0.8,
                                    y: 100,
                                  },
                                  animate: { opacity: 1, scale: 1, y: 0 },
                                  exit: { opacity: 0, scale: 0.8, y: 100 },
                                }}
                              >
                                <p className="mt-2 text-zinc-400 dark:text-zinc-300 text-center">
                                  {event.description}
                                </p>
                              </MorphingDialogDescription>
                            </ScrollArea>
                          </div>
                          <MorphingDialogClose className="text-zinc-50" />
                        </MorphingDialogContent>
                      </MorphingDialogContainer>
                    </MorphingDialog>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

          </Carousel>
        </div>
      </div>
      {/* <div className="flex">
        <p className=" text-white w-full text-center py-4">
          <h1 className="text-2xl md:text-xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-zinc-700 via-white to-zinc-700 dark:from-white dark:via-white dark:to-zinc-700 text-center">
            LIVE EVENTS
          </h1>
        </p>
      </div> */}
      {/* <BorderTrailHr /> */}



      <Footer />
    </div>
  );
};


export default Events;
