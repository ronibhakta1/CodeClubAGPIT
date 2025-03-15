import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Import ShadCN button
import { Card, CardContent } from "@/components/ui/card"; // Import ShadCN card



// Team members data
const activeEvent = [
  {
    name: "Active Event",
    
    
  },
  {
    name: "Upcoming Event",
    
   
  },
  {
    name: "Past Event",
    
    
  },
  {
    name: "Event 1",
    detail: "Description",
   
    
  },
  {
    name: "Event 2",
    detail: "Description",
    
    
  },
  {
    name: "Event 3",
    detail: "Description",
    
    
  },
  {
    name: "Event 4",
    detail: "Description",
    
  },
];

const Events = () => {
 

  return (
    <div className="p-10  ">
    
      <div className="flex gap-8 mb-12 px-8 py-4 ">
      
      {/* Active Event Box */}
      <Card className="p-6 shadow-md w-1/2">
      
          <h2 className="text-lg font-bold space-y-0 leading-tight">{activeEvent[0].name}</h2>
          <p className=" text-sm"><strong>🔹 Event name</strong></p>
          <p className=" text-sm"><strong>🔹 Date</strong></p>
          <p className=" text-sm"><strong>🔹 Location</strong></p>
          <p className=" text-sm"><strong>🔹 Description</strong></p>
          <p className=" text-sm"><strong>🔹 Type</strong></p>
          <div className="mt-4 flex">
            <Button className="w-48 px-4 py-3 text-sm bg-black text-white self-start">
                Registration [open/close]
            </Button>
          </div>
        </Card>

        {/* New Upcoming Event Box */}
        <Card className="p-6 shadow-md w-1/2 ">
          <h2 className="text-lg font-bold  space-y-0 leading-tight">{activeEvent[1].name}</h2>
          <p className=" text-sm"><strong>🔹 Event name</strong></p>
          <p className=" text-sm"><strong>🔹 Date</strong></p>
          <p className=" text-sm"><strong>🔹 Deadline</strong></p>
          <p className=" text-sm"><strong>🔹 Location</strong></p>
          <p className=" text-sm"><strong>🔹 Description</strong></p>
          <p className=" text-sm"><strong>🔹 Type</strong></p>
          <Button className="w-48 px-4 py-3 text-sm bg-black text-white self-start">
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

      {/* Other Members Section */}
      <div className="grid grid-cols-1   sm:grid-cols-2 md:grid-cols-4 gap-4 ">
        {activeEvent.slice(3).map((member, index) => (
          <Card key={index} className="p-4 h-80 text-center shadow-md">
            
            <h3 className="font-bold">{member.name}</h3>
            <p className="text-gray-500">{member.detail}</p>
            
            <p className="mt-2 text-sm">Type</p>
            <Button variant="link">Organizer Name:ABC</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
