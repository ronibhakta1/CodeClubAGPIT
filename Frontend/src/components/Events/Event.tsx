import { Button } from "@/components/ui/button"; // Import ShadCN button
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/Events/carousel"


// Team members data
const activeEvent = [
  {
    name: "Active Event",
    eventname: "event name",
    date: "dd/mm/yy",
    location: "location",
    disc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor",
    type: "Hackathon/Workshop/Fest",
  },
  {
    name: "Upcoming Event",
    eventname: "event name",
    date: "dd/mm/yy",
    deadline: "last date",
    location: "location",
    disc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor",
    type: "Hackathon/Workshop/Fest",
  },
  {
    name: "Past Event",
  },
  {
    name: "Event 1",
    detail: "Description",
    image: "https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",
  },
  {
    name: "Event 2",
    detail: "Description",
    image: "https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",
  },
  {
    name: "Event 3",
    detail: "Description",
    image: "https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",
  },
  {
    name: "Event 4",
    detail: "Description",
    image: "https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",
  },
  {
    name: "Event 5",
    detail: "Description",
    image: "https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",
  },
  {
    name: "Event 6",
    detail: "Description",
    image: "https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",
  },
  {
    name: "Event 7",
    detail: "Description",
    image: "https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",
  },
];

const Events = () => {
  const eventList = activeEvent.slice(3);
  return (
    <div className="p-20">
      <div className="flex gap-30 mb-12 px-50 py-4">
        {/* Active Event Box */}
        <Card className="p-6 shadow-md w-1/2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <h2 className="text-lg font-bold space-y-0 leading-tight ">{activeEvent[0].name}</h2>
          <p className="text-sm"> <strong>🔹Event Name: </strong> {activeEvent[0].eventname} </p>
          <p className=" text-sm"><strong>🔹 Date: </strong> {activeEvent[0].date} </p>
          <p className=" text-sm"><strong>🔹 Location:</strong> {activeEvent[0].location}</p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="disc">
              <AccordionTrigger className="text-sm font-medium ">
                <p className=" text-sm"><strong>🔹 Description</strong></p>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                {activeEvent[0].disc}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="type">
              <AccordionTrigger className="text-sm font-medium">
                <p className=" text-sm"><strong>🔹 Type</strong></p>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                {activeEvent[0].type}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-4 flex">
            <Button className="w-48 px-4 py-3 text-sm bg-black text-white self-start hover:bg-sky-700">
              Registration [open/close]
            </Button>
          </div>
        </Card>

        {/* New Upcoming Event Box */}
        <Card className="p-6 shadow-md w-1/2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <h2 className="text-lg font-bold space-y-0 leading-tight">{activeEvent[1].name}</h2>
          <p className="text-sm"> <strong>🔹Event Name: </strong> {activeEvent[1].eventname} </p>
          <p className=" text-sm"><strong>🔹 Date: </strong> {activeEvent[1].date} </p>
          <p className=" text-sm"><strong>🔹 Deadline: </strong> {activeEvent[1].deadline}</p>
          <p className=" text-sm"><strong>🔹 Location:</strong> {activeEvent[1].location}</p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="disc">
              <AccordionTrigger className="text-sm font-medium">
                <p className=" text-sm"><strong>🔹 Description</strong></p>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                {activeEvent[1].disc}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="type">
              <AccordionTrigger className="text-sm font-medium">
                <p className=" text-sm"><strong>🔹 Type</strong></p>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                {activeEvent[1].type}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button className="w-48 px-4 py-3 text-sm bg-black text-white self-start hover:bg-sky-700">
            Registration/More details
          </Button>
        </Card>
      </div>

      {/* Past Event */}
      <div className="mb-12 flex">
        <Card className="p-8 shadow-md border border-gray-200 mt-0 w-full text-center">
          <h2 className="text-lg font-bold">{activeEvent[2].name}</h2>
        </Card>
      </div>

      {/* Carousel Section */}
      
      <div className="flex gap-30 mb-12 px-0 py-4 w-full max-w-[1200px] mx-auto">
  <Carousel className="w-full max-w-[1000px] md:max-w-[1200px] h-[450px] relative mx-auto">

          <CarouselContent className="w-full">
          {eventList.map((event, index) => (

              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-4">

                <CardContent className="flex flex-col items-center justify-center p-5 w-[95%] h-[400px] bg-gray-100 rounded-md shadow-md">

                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-55 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-bold text-lg">{event.name}</h3>
                    <p className="text-gray-500 text-sm text-center">{event.detail}</p>
                  </CardContent>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition" />
        </Carousel>
      </div>


    </div>
  );
};

export default Events;
