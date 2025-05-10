"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar"; // Update the path to the correct location of the Calendar component
import { Label } from "@/components/ui/label";
import { MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

const initialEvents = [
  {
    id: 1,
    name: "Hackathon 2024",
    date: new Date("2024-05-15"),
    status: "Upcoming",
    coordinator: "John Doe",
  },
];

export default function ManageEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: new Date(),
    status: "Upcoming",
    coordinator: "",
  });

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        id: events.length + 1,
        ...newEvent,
      },
    ]);
    setNewEvent({ name: "", date: new Date(), status: "Upcoming", coordinator: "" });
    setOpen(false);
  };

  return (
    <Card className="bg-zinc-900 text-white shadow-lg rounded-2xl">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-white text-lg">Manage Events</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="bg-indigo-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 text-white border-zinc-700">
            <DialogTitle className="mb-4">Create New Event</DialogTitle>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  className="mt-1 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="coordinator">Coordinator/Mentor</Label>
                <Input
                  id="coordinator"
                  value={newEvent.coordinator}
                  onChange={(e) => setNewEvent({ ...newEvent, coordinator: e.target.value })}
                  className="mt-1 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Calendar
                  mode="single"
                  selected={newEvent.date}
                  onSelect={(date) => setNewEvent({ ...newEvent, date: date || new Date() })}
                />
              </div>
              <Button onClick={handleAddEvent} className="bg-indigo-600 w-full">
                Save Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition"
          >
            <div>
              <p className="font-medium text-sm">{event.name}</p>
              <p className="text-xs text-zinc-400">
                {format(event.date, "yyyy-MM-dd")} • {event.status} • {event.coordinator}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-800 border-zinc-700 text-white">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
