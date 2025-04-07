import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const user = {
  id: 1,
  name: "Roni Bhakta",
  avatar:
    "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg",
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">

      {/* Hero Section */}
      <div className="relative w-full py-12 md:py-20 lg:py-24 text-center bg-[url('https://source.unsplash.com/1600x900/?coding,technology')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            About Us
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-200 dark:text-gray-300 leading-relaxed">
            Welcome to <strong className="font-semibold">A.G. Patil Code Club</strong>! We are a community of passionate tech enthusiasts,
            dedicated to fostering a culture of innovation and continuous learning. Our goal is to empower
            students with coding skills, encourage collaboration, and drive technological advancements through hands-on projects and mentorship.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 space-y-6 md:space-y-10 py-8 md:py-14">

        {/* Mission & Vision */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Mission & Vision
          </h2>
          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                Our goal is to create a collaborative space where students can develop coding skills, enhance
                problem-solving abilities, and build innovative projects. We strive to bridge the gap between
                academic learning and real-world applications by fostering creativity, teamwork, and hands-on experience.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Activities */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Our Activities
          </h2>
          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium">
                <li>Hackathons & Coding Challenges</li>
                <li>Open Source Contributions</li>
                <li>Certification & Skill Development</li>
                <li>Tech Talks & Webinars</li>
                <li>Competitive Programming</li>
                <li>Startup & Innovation Guidance</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Success Stories */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Success Stories
          </h2>
          <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 font-medium text-center leading-relaxed">
                Our members have won prestigious hackathons, secured internships at top tech companies,
                and contributed to open-source projects. Join us and be part of this journey!
              </p>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4 px-1 sm:px-2">
            {[
              {
                q: "How can I join the club?",
                a: "You can join by registering on our website or by attending one of our coding sessions on campus. Follow our social media for updates on upcoming events and registration deadlines."
              },
              {
                q: "What programming languages do you focus on?",
                a: "We cover a wide range of languages and technologies including Python, JavaScript, Java, C++, as well as web development frameworks like React, Node.js, and databases like MongoDB and SQL."
              },
              {
                q: "Do I need prior coding experience to join?",
                a: "No prior experience is required! We welcome beginners and provide learning resources for all levels. Our community is supportive and we have mentorship programs to help you get started."
              }
            ].map((item, index) => (
              <AccordionItem
                key={index}
                value={`q${index + 1}`}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3"
              >
                <AccordionTrigger className="text-base md:text-lg text-gray-800 dark:text-white font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-gray-700 dark:text-gray-300 pt-2 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Join Button */}
        <div className="flex justify-center px-4">
          <Button className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-6 py-3 text-sm sm:text-base font-medium rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            Join Us
          </Button>
        </div>

        {/* Footer */}
        <footer className="w-full mt-8 px-4">
          <div className="max-w-5xl mx-auto py-4 sm:py-6 flex flex-col items-center text-center space-y-3">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A.G. Patil Institute of Technology<br />
              Solapur, Maharashtra, India<br />
              PIN: 413002
            </p>
            <div className="flex gap-5 justify-center">
              <a href={user.social.github} target="_blank" aria-label="GitHub">
                <FaGithub className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors" />
              </a>
              <a href={user.social.linkedin} target="_blank" aria-label="LinkedIn">
                <FaLinkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" />
              </a>
              <a href={user.social.portfolio} target="_blank" aria-label="Portfolio">
                <FaGlobe className="w-6 h-6 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;
