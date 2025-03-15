
import { Button } from "@/components/ui/button"; // Import ShadCN button
import { Card } from "@/components/ui/card"; // Import ShadCN card
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";


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
    image:"https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",

  },
  {
    name: "Event 2",
    detail: "Description",
    image:"https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",

  },
  {
    name: "Event 3",
    detail: "Description",
    image:"https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",

  },
  {
    name: "Event 4",
    detail: "Description",
    image:"https://www.shutterstock.com/image-vector/gallery-icon-color-editable-on-260nw-2582914179.jpg",

  },
];

const Events = () => {


  return (
    <div className="p-20  ">
    

      <div className="flex gap-30 mb-12 px-50 py-4 ">
      

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
        <Card className="p-6 shadow-md w-1/2   transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  ">
          <h2 className="text-lg font-bold  space-y-0 leading-tight">{activeEvent[1].name}</h2>
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
            Registration/More detailes
          </Button>
        </Card>
      </div>

      {/* Past Event */}
      <div className="mb-12 flex ">
        <Card className="p-8 shadow-md border border-gray-200 mt-0 w-full text-center">
          <h2 className="text-lg font-bold">{activeEvent[2].name}</h2>


        </Card>
      </div>

    {/* events section*/}
<Card className="p-8 shadow-md border border-gray-200 mt-0 w-full text-center gap-32">
  
  <InfiniteSlider speedOnHover={20} gap={32}>
    {activeEvent?.slice(3).map((member, index) => (
      <div key={index} className="p-10 h-80 text-center shadow-md bg-gray-100 rounded-md">
       <img src={member.image} alt={member.name} className="w-full h-40 object-cover rounded-md mb-4" />
        <h3 className="font-bold">{member.name}</h3>
        <p className="text-gray-500">{member.detail}</p>
        <Button className="mt-2 text-sm" variant="link">Organizer Name: ABC</Button>
      </div>
    ))}
  </InfiniteSlider>
</Card>
</div>
);
};

export default Events;
