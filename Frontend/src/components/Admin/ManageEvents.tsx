
import * as React from "react";
import { Trash2, Plus, MoreVertical } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { differenceInSeconds,} from "date-fns";

interface Competition {
  name: string;
  description: string;
}

interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // YYYY-MM-DD
  status: "Upcoming" | "Ongoing" | "Completed";
  coordinator: string;
  competitions: Competition[];
}

export default function ManageEvents() {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState({
    name: "",
    description: "",
    date: "",
    status: "Upcoming" as "Upcoming" | "Ongoing" | "Completed",
    coordinator: "",
    competitions: [] as Competition[],
  });
  const [newCompetition, setNewCompetition] = React.useState({ name: "", description: "" });
  const [timers, setTimers] = React.useState<{ [key: string]: string }>({});

  // Fetch events from JSON file
  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/events.json");
        const data: Event[] = await response.json();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Update timers every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newTimers: { [key: string]: string } = {};
      events.forEach((event) => {
        if (event.status === "Completed") {
          newTimers[event.id] = "Ended";
        } else {
          const eventDate = new Date(event.date);
          const now = new Date();
          const secondsUntil = differenceInSeconds(eventDate, now);
          if (secondsUntil <= 0) {
            newTimers[event.id] = event.status === "Ongoing" ? "Started" : "Ended";
          } else {
            const days = Math.floor(secondsUntil / (3600 * 24));
            const hours = Math.floor((secondsUntil % (3600 * 24)) / 3600);
            const minutes = Math.floor((secondsUntil % 3600) / 60);
            const seconds = secondsUntil % 60;
            newTimers[event.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          }
        }
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  // Add a competition to the new event
  const handleAddCompetition = () => {
    if (newCompetition.name && newCompetition.description) {
      setNewEvent({
        ...newEvent,
        competitions: [...newEvent.competitions, newCompetition],
      });
      setNewCompetition({ name: "", description: "" });
    }
  };

  // Validate and add event
  const handleAddEvent = async () => {
    if (!newEvent.name || !newEvent.date || !newEvent.coordinator) {
      alert("Please fill in all required fields (Name, Date, Coordinator).");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(newEvent.date)) {
      alert("Please enter a valid date in YYYY-MM-DD format.");
      return;
    }
    const eventId = crypto.randomUUID();
    const eventData = { id: eventId, ...newEvent };
    try {
      // Mock API call to save to events.json
      // In a real backend, this would be a POST request
      setEvents([...events, eventData]);
      // TODO: Replace with actual API call
      // await fetch("/api/events", {
      //   method: "POST",
      //   body: JSON.stringify(eventData),
      // });
      setNewEvent({
        name: "",
        description: "",
        date: "",
        status: "Upcoming",
        coordinator: "",
        competitions: [],
      });
      setNewCompetition({ name: "", description: "" });
      setOpen(false);
    } catch (error) {
      console.error("Failed to save event:", error);
      alert("Failed to save event.");
    }
  };

  // Delete event
  const handleDeleteEvent = async (id: string) => {
    try {
      // Mock API call to delete from events.json
      setEvents(events.filter((event) => event.id !== id));
      // TODO: Replace with actual API call
      // await fetch(`/api/events/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event.");
    }
  };

  // Edit event (placeholder)
  const handleEditEvent = (id: string) => {
    alert(`Editing event with ID: ${id}`);
    // TODO: Implement edit dialog
  };

  // Status badge styles
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-zinc-600/20 text-zinc-200";
      case "Ongoing":
        return "bg-indigo-500/20 text-indigo-300";
      case "Completed":
        return "bg-zinc-700/20 text-zinc-400";
      default:
        return "bg-zinc-600/20 text-zinc-200";
    }
  };

  return (
    <Card className="bg-zinc-900 mt-3 text-zinc-200 border border-zinc-700 shadow-xl transition-transform rounded-2xl">
      <CardHeader className="flex items-center justify-between pb-4 px-6">
        <CardTitle className="text-3xl font-bold tracking-tight text-zinc-100">
          Manage Events
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-zinc-100 font-semibold py-2 px-5 rounded-xl">
              <Plus className="w-5 h-5 mr-2" /> New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 text-zinc-200 border border-zinc-700 rounded-2xl max-w-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-zinc-100">Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-zinc-300">
                  Event Name
                </Label>
                <Input
                  id="name"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  className="mt-2 bg-zinc-800 border-zinc-600 text-zinc-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 placeholder-zinc-500"
                  placeholder="e.g., Hackathon 2024"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-zinc-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="mt-2 bg-zinc-800 border-zinc-600 text-zinc-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 placeholder-zinc-500"
                  placeholder="Describe the event"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-zinc-300">
                  Date (YYYY-MM-DD)
                </Label>
                <Input
                  id="date"
                  type="text"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="mt-2 bg-zinc-800 border-zinc-600 text-zinc-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 placeholder-zinc-500"
                  placeholder="e.g., 2025-05-15"
                  pattern="\d{4}-\d{2}-\d{2}"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-sm font-medium text-zinc-300">
                  Status
                </Label>
                <Select
                  value={newEvent.status}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, status: value as "Upcoming" | "Ongoing" | "Completed" })
                  }
                >
                  <SelectTrigger className="mt-2 bg-zinc-800 border-zinc-600 text-zinc-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-600 text-zinc-200 rounded-xl">
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="coordinator" className="text-sm font-medium text-zinc-300">
                  Coordinator
                </Label>
                <Input
                  id="coordinator"
                  value={newEvent.coordinator}
                  onChange={(e) => setNewEvent({ ...newEvent, coordinator: e.target.value })}
                  className="mt-2 bg-zinc-800 border-zinc-600 text-zinc-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 placeholder-zinc-500"
                  placeholder="e.g., John Doe"
                />
              </div>
              <div className="space-y-4">
                <Label className="text-sm font-medium text-zinc-300">Competitions</Label>
                <div className="space-y-3 p-4 bg-zinc-800 rounded-xl border border-zinc-600">
                  {newEvent.competitions.length > 0 && (
                    <div className="space-y-2">
                      {newEvent.competitions.map((comp, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm bg-zinc-700/30 p-3 rounded-lg"
                        >
                          <div>
                            <span className="font-semibold text-zinc-200">{comp.name}</span>
                            <span className="text-zinc-400"> – {comp.description}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-zinc-600 h-6 w-6"
                            onClick={() =>
                              setNewEvent({
                                ...newEvent,
                                competitions: newEvent.competitions.filter((_, i) => i !== index),
                              })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Input
                      value={newCompetition.name}
                      onChange={(e) => setNewCompetition({ ...newCompetition, name: e.target.value })}
                      className="bg-zinc-700 border-zinc-600 text-zinc-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 placeholder-zinc-500"
                      placeholder="Competition name"
                    />
                    <Input
                      value={newCompetition.description}
                      onChange={(e) =>
                        setNewCompetition({ ...newCompetition, description: e.target.value })
                      }
                      className="bg-zinc-700 border-zinc-600 text-zinc-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 placeholder-zinc-500"
                      placeholder="Description"
                    />
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 text-zinc-100 rounded-xl"
                      onClick={handleAddCompetition}
                      disabled={!newCompetition.name || !newCompetition.description}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleAddEvent}
                className="bg-indigo-600 hover:bg-indigo-700 text-zinc-100 font-semibold rounded-xl w-full py-3"
              >
                Save Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4 px-6 pb-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl animate-pulse"
              >
                <div className="space-y-2">
                  <div className="h-5 w-48 bg-zinc-700 rounded-md" />
                  <div className="h-4 w-64 bg-zinc-700 rounded-md" />
                  <div className="h-4 w-56 bg-zinc-700 rounded-md" />
                  <div className="h-4 w-40 bg-zinc-700 rounded-md" />
                </div>
                <div className="h-8 w-8 bg-zinc-700 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl hover:bg-zinc-750/50 transition-colors duration-200 border border-zinc-600"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-zinc-100">{event.name}</p>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusStyles(event.status)}`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    {event.date} • Coordinator: {event.coordinator}
                  </p>
                  <p className="text-sm text-zinc-300">{event.description}</p>
                  <p className="text-sm text-zinc-400">
                    {timers[event.id] ? `Starts in: ${timers[event.id]}` : "Loading timer..."}
                  </p>
                  {event.competitions.length > 0 && (
                    <ul className="text-sm text-zinc-400 mt-2 space-y-1">
                      {event.competitions.map((comp, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                          <span className="font-medium text-zinc-200">{comp.name}</span>: {comp.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-600 h-8 w-8 rounded-full"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-zinc-800 border-zinc-600 text-zinc-200 rounded-xl">
                    <DropdownMenuItem
                      className="hover:bg-zinc-700 hover:text-zinc-100"
                      onClick={() => handleEditEvent(event.id)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-400 hover:bg-zinc-700 hover:text-red-300"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}