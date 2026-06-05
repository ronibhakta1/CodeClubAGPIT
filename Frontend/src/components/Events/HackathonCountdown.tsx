import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Set to actual hackathon times for real event phase
const HACKATHON_START = new Date("2026-06-05T11:15:00");
const HACKATHON_END = new Date("2026-06-14T12:00:00");
const HACKATHON_2026_LOGO = "/events/image.png";

function getTimeLeft() {
  const now = new Date();
  if (now < HACKATHON_START) {
    const diff = HACKATHON_START.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { phase: "before", days, hours, minutes, seconds };
  } else if (now >= HACKATHON_START && now < HACKATHON_END) {
    const diff = HACKATHON_END.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { phase: "live", days, hours, minutes, seconds };
  } else {
    return { phase: "ended", days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
}

export default function HackathonCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animation variants for different phases
  const endedShake = {
    animate: { x: [0, -10, 10, -10, 10, 0] },
    transition: { repeat: Infinity, duration: 0.7, ease: "easeInOut" }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white relative overflow-hidden px-4">
      {/* Subtle background glow */}
      <motion.div
        className="absolute -z-10 inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="w-[520px] h-[520px] bg-zinc-800/40 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.img
        src={HACKATHON_2026_LOGO}
        alt="Hackathon Logo"
        className="h-40 w-auto max-w-full rounded-lg mb-8 drop-shadow-xl md:h-56 lg:h-64"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, type: "spring" }}
      />
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold mb-6 text-center tracking-normal bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        AGTechathon 2.0 2k26 Countdown
      </motion.h1>
      {timeLeft.phase === "before" && (
        <motion.div
          className="flex gap-4 md:gap-10 text-center mb-8 items-end"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className="flex flex-row items-end"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="text-6xl md:text-8xl lg:text-9xl font-mono font-extrabold text-zinc-100 drop-shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  {Object.values(timeLeft).slice(1)[i]}
                </motion.div>
                <div className="text-base md:text-xl mt-2 tracking-wide uppercase text-zinc-400 font-semibold">
                  {label}
                </div>
              </div>
              {i < 3 && (
            <span className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-600 mb-6 md:mb-12 select-none mx-2">:</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
      {timeLeft.phase === "live" && (
        <div className="flex flex-col items-center w-full mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-normal drop-shadow-xl">
            AGTechathon 2.0 2k26 is LIVE!
          </h2>
          <p className="text-lg md:text-2xl text-zinc-300 font-semibold mb-4 animate-fade-in">
            24 Hours of Nonstop Coding, Collaboration & Creativity
          </p>
          <div className="flex flex-row gap-4 md:gap-8 justify-center items-end w-full mb-4">
            {['Hours', 'Minutes', 'Seconds'].map((label, i) => (
              <div key={label} className="flex flex-col items-center">
                <div className="text-7xl md:text-9xl font-mono font-extrabold text-zinc-100 drop-shadow-2xl">
                  {String([timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i]).padStart(2, '0')}
                </div>
                <div className="text-base md:text-xl mt-2 tracking-wide uppercase text-zinc-400 font-bold">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4 justify-center mt-2">
            <span className="inline-block text-zinc-200 text-base md:text-lg font-semibold bg-zinc-900/80 px-4 py-2 rounded-xl shadow animate-fade-in">
              Submit your project before the timer ends.
            </span>
            <span className="inline-block text-zinc-200 text-base md:text-lg font-semibold bg-zinc-900/80 px-4 py-2 rounded-xl shadow animate-fade-in">
              Network, learn, and have fun.
            </span>
          </div>
        </div>
      )}
      {timeLeft.phase === "ended" && (
        <motion.div
          className="flex flex-col items-center justify-center mb-8"
          {...endedShake}
        >
          <div className="text-4xl md:text-6xl font-extrabold text-zinc-100 mb-4 animate-bounce">Hackathon Ended</div>
          <div className="text-lg md:text-2xl text-zinc-300">Thank you for participating.</div>
        </motion.div>
      )}
      <motion.p
        className="text-zinc-300 text-center max-w-xl mb-8 text-lg md:text-xl font-medium"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        {timeLeft.phase === "before" && (
          <>Countdown is set for <b>5th June 2026, 12:00 PM</b>. Registrations are closed for AGTechathon 2.0 2k26.</>
        )}
        {timeLeft.phase === "live" && (
          <>The hackathon is <span className="text-white font-bold">LIVE NOW</span>. Good luck to all teams.</>
        )}
        {timeLeft.phase === "ended" && (
          <>The hackathon has ended. See you next time!</>
        )}
      </motion.p>
      <motion.a
        href="/events/hackathon"
        className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-3 px-8 rounded-lg shadow-lg text-lg md:text-xl transition-all duration-200 mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Go to Hackathon Event Page
      </motion.a>
    </div>
  );
}
