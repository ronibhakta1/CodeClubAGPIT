import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Card, CardHeader,CardContent } from "@/components/ui/card";
// import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button";

const user = {
  id: 1,
  name: "Roni Bhakta",
  avatar: "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg",
  role: "Full Stack Developer",
  codeClubRole: "President",
  skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  bio: "Experienced full-stack developer passionate about building scalable web applications and open-source contributions. Also an active contributor to the Code Club, leading workshops and mentorship programs.",
  social: {
    github: "https://github.com/ronibhakta1",
    linkedin: "https://linkedin.com/in/ronibhakta1",
    portfolio: "https://ronibhakta1.dev",
  },
  pastEvents: [
    "Hackathon 2024 - Lead Organizer",
    "React Conference - Speaker",
    "CodeFest 2023 - Judge",
  ],
  
};


const About = () => {
  return (
    
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 text-gray-900">
      
      {/* About Us Section with Background Image */}
      <div className="relative w-screen py-20 text-center bg-[url('https://source.unsplash.com/1600x900/?coding,technology')] bg-cover bg-center ">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-white">About Us</h1><br></br>
          <p className="mt-4 text-lg text-gray-200">
            Welcome to <strong>A.G. Patil Code Club</strong>! We are a community of passionate tech enthusiasts,
            dedicated to fostering a culture of innovation and continuous learning. Our goal is to empower
            students with coding skills, encourage collaboration, and drive technological advancements
            through hands-on projects and mentorship.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-5xl w-full mt-10 px-6 ">
      <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2"> Mission & Vision </h2>       
       <Card className="bg-white rounded-2xl shadow-xl border  ">
          <CardHeader className="text-center">
            
          </CardHeader>
          <CardContent>
            <p className=" font-semibold text-black-800">
            Our goal is to create a collaborative space where students can develop coding skills, enhance problem-solving abilities, and build innovative projects. We strive to bridge the gap between academic learning and real-world applications by fostering creativity, teamwork, and hands-on experience. By empowering students with knowledge and opportunities, we aim to shape future tech leaders, innovators, and problem-solvers ready to tackle global challenges through technology.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Our Activities Section */}
      <div className="max-w-5xl w-full mt-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2"> Our Activities </h2>       

        <Card className="bg-white rounded-2xl shadow-xl border ">
          <CardHeader className="text-center">
          </CardHeader>
          <CardContent>
          <ul className="list-disc list-inside space-y-2 font-semibold text-black-800">
            <li>Hackathons & Coding Challenges</li>
            <li>Tech Talks & Webinars</li>
            <li>Open Source Contributions</li>
            <li>Competitive Programming Sessions</li>
            <li>Certification & Skill Development</li>
            <li>Startup & Innovation Guidance</li>
          </ul>
          </CardContent>
        </Card>
      </div>
     {/* Success Stories Section */}
<div className="max-w-5xl w-full mt-16 px-6">
  <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
     Success Stories
  </h2>
  <Card className="bg-white rounded-2xl shadow-lg p-6 border ">
    <CardContent>
      <p className="text-lg text-black-700 font-semibold text-center ">
        Our members have won prestigious hackathons, secured internships at top tech companies, and contributed to open-source projects. 
        Join us and be part of this journey!
      </p>
    </CardContent>
  </Card>
</div>


      {/* FAQ Section */}
      <div className="w-full max-w-3xl mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions </h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="question-2">
            <AccordionTrigger>How can I join the club?</AccordionTrigger>
            <AccordionContent>
              You can join by registering on our website or by attending one of our coding sessions on campus.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="question-3">
            <AccordionTrigger>What programming languages do you focus on?</AccordionTrigger>
            <AccordionContent>
              We cover a wide range of languages, including Python, JavaScript, Java, C++, and web technologies.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="question-4">
            <AccordionTrigger>Do I need prior coding experience to join?</AccordionTrigger>
            <AccordionContent>
              No, we welcome beginners as well as experienced coders! We offer learning resources for all levels.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Join Us Button */}
      <div className="flex justify-center mt-10">
        <Button className=" text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-800 hover:scale-110">
        Join Us 
       </Button>
      </div>

      {/* Address & Social Icons Section */}
      <div className="flex flex-col items-center mt-10 space-y-4 text-center">
      <p className="text-black-600 mt-2">
          A.G. Patil Institute of Technology,  
          <br /> Solapur, Maharashtra, India  
          <br /> PIN: 413002  
      </p>  

           <Separator className="my-4" />
        <div className="flex gap-4">
          <a href={user.social.github} target="_blank" rel="noopener noreferrer"><FaGithub className="w-6 h-6 text-gray-700 hover:text-black" /></a>
          <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin className="w-6 h-6 text-blue-600 hover:text-blue-800" /></a>
          <a href={user.social.portfolio} target="_blank" rel="noopener noreferrer"><FaGlobe className="w-6 h-6 text-green-600 hover:text-green-800" /></a>
        </div>
      </div>
    </div>
  );
};

export default About;
