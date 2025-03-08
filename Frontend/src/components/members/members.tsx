import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import PresidentDescription from "@/components/ui/presidentDescription"; // Importing the new description file

const Members = () => {
  return (
    <div className="flex flex-col min-h-screen items-center gap-6 p-4">
      {/* 1st Card: Batch Selection */}
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold">Select Your Batch</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            {["2023 Batch", "2024 Batch", "2025 Batch"].map((batch) => (
              <Button key={batch} variant="outline">
                {batch}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2nd Card: Roni Bhakta (Image Left, Description Right) */}
      <Card className="w-full max-w-4xl shadow-lg p-8 flex items-start gap-6">
        {/* Flex container to keep Image & Description aligned properly */}
        <div className="flex items-start gap-6">
          {/* Image Section */}
          <div className="flex-shrink-0">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm_a8MOMAIrMVmT29DtMXP4F86JFmzVJFJAw&s"
              alt="Roni Bhakta"
              fallback="RB"
              className="w-40 h-40 rounded-full"
            />
          </div>

          {/* President Description (Fully Left Aligned) */}
          <div className="flex-1">
            <PresidentDescription />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Members;
