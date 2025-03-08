import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PresidentDescription = () => {
  return (
    <div className="flex flex-col text-left space-y-2">
      {/* Name & Role */}
      <CardTitle className="text-xl font-bold">👤 Roni Bhakta - President</CardTitle>

      {/* Full Bio */}
      <p className="text-gray-700">
        Roni is the president of the Code Club, leading innovative projects, mentoring students, 
        and fostering a culture of learning. He specializes in software development and AI-driven projects.
      </p>

      {/* Skills Section */}
      <p className="text-gray-800 font-semibold">
        🔷 Skills: <span className="font-normal">React, Python, ML</span>
      </p>

      {/* Social Links */}
      <p className="text-blue-600 underline">
        🌍 <a href="#">GitHub</a> | <a href="#">LinkedIn</a> | <a href="#">Portfolio</a>
      </p>

      {/* Past Events Button */}
      <Button variant="outline">🎉 Past Events Organized (Click to See)</Button>
    </div>
  );
};

export default PresidentDescription;
