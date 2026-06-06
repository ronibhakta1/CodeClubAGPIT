import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Test/Demo Component for HackathonCountdown
 * Use this to visually test countdown behavior at different phases
 */

const HACKATHON_START = new Date("2026-06-05T11:15:00");
const HACKATHON_END = new Date("2026-06-14T11:15:00");

function getTimeLeftWithDate(testDate: Date) {
  const now = testDate;
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

export default function HackathonCountdownTest() {
  const [testPhase, setTestPhase] = useState<"before" | "live" | "ended">(
    "before"
  );

  let testDate = new Date();
  if (testPhase === "before") {
    testDate = new Date("2026-06-01T00:00:00");
  } else if (testPhase === "live") {
    testDate = new Date("2026-06-10T00:00:00");
  } else {
    testDate = new Date("2026-06-15T00:00:00");
  }

  const timeLeft = getTimeLeftWithDate(testDate);

  const endedShake = {
    animate: { x: [0, -10, 10, -10, 10, 0] },
    transition: { repeat: Infinity, duration: 0.7, ease: "easeInOut" }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/* Test Controls */}
      <div className="max-w-4xl mx-auto mb-12 bg-zinc-900 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🧪 Countdown Timer Test</h2>
        <p className="text-zinc-400 mb-6">
          Select a phase to test the countdown behavior
        </p>

        <div className="flex gap-4 flex-wrap mb-6">
          <button
            onClick={() => setTestPhase("before")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              testPhase === "before"
                ? "bg-blue-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            ⏳ Before Event
          </button>
          <button
            onClick={() => setTestPhase("live")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              testPhase === "live"
                ? "bg-green-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            🔴 Event Live
          </button>
          <button
            onClick={() => setTestPhase("ended")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              testPhase === "ended"
                ? "bg-red-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            ✅ Event Ended
          </button>
        </div>

        <div className="bg-zinc-800 p-4 rounded text-sm font-mono">
          <div>Current Phase: <span className="text-yellow-400">{testPhase}</span></div>
          <div>Test Date: <span className="text-cyan-400">{testDate.toLocaleString()}</span></div>
          <div>Time Left: Days={timeLeft.days}, Hours={timeLeft.hours}, Minutes={timeLeft.minutes}, Seconds={timeLeft.seconds}</div>
        </div>
      </div>

      {/* Countdown Display */}
      <div className="flex flex-col items-center justify-center min-h-screen">
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

        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-6 text-center tracking-normal bg-gradient-to-b from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          AGTechathon 2.0 2k26 Countdown
        </motion.h1>

        {/* BEFORE PHASE */}
        {testPhase === "before" && (
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
                  <span className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-600 mb-6 md:mb-12 select-none mx-2">
                    :
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* LIVE PHASE */}
        {testPhase === "live" && (
          <div className="flex flex-col items-center w-full mb-8">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-normal drop-shadow-xl">
              AGTechathon 2.0 2k26 is LIVE!
            </h2>
            <p className="text-lg md:text-2xl text-zinc-300 font-semibold mb-4 animate-fade-in">
              24 Hours of Nonstop Coding, Collaboration & Creativity
            </p>
            <div className="flex flex-row gap-4 md:gap-8 justify-center items-end w-full mb-4">
              {["Hours", "Minutes", "Seconds"].map((label, i) => (
                <div key={label} className="flex flex-col items-center">
                  <div className="text-7xl md:text-9xl font-mono font-extrabold text-zinc-100 drop-shadow-2xl">
                    {String([timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i]).padStart(2, "0")}
                  </div>
                  <div className="text-base md:text-xl mt-2 tracking-wide uppercase text-zinc-400 font-bold">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ENDED PHASE - Test the 00:00:00 timer with bounce */}
        {testPhase === "ended" && (
          <motion.div
            className="flex flex-col items-center justify-center mb-8"
            {...endedShake}
          >
            {/* Show final 00:00:00 timer with bounce animation */}
            <motion.div
              className="flex gap-4 md:gap-10 text-center mb-8 items-end"
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            >
              {["Hours", "Minutes", "Seconds"].map((label, i) => (
                <motion.div
                  key={label}
                  className="flex flex-row items-end"
                >
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="text-6xl md:text-8xl lg:text-9xl font-mono font-extrabold text-red-400 drop-shadow-lg"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                    >
                      00
                    </motion.div>
                    <div className="text-base md:text-xl mt-2 tracking-wide uppercase text-zinc-400 font-semibold">
                      {label}
                    </div>
                  </div>
                  {i < 2 && (
                    <span className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-600 mb-6 md:mb-12 select-none mx-2">
                      :
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
            <div className="text-4xl md:text-6xl font-extrabold text-zinc-100 mb-4 animate-bounce">
              Hackathon Ended
            </div>
            <div className="text-lg md:text-2xl text-zinc-300">
              Thank you for participating.
            </div>
          </motion.div>
        )}

        {/* Test Notes */}
        <div className="mt-12 bg-zinc-900 p-6 rounded-lg max-w-2xl">
          <h3 className="text-xl font-bold mb-4">✅ Test Checklist</h3>
          <ul className="space-y-2 text-zinc-300">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Timer stops at <code className="bg-zinc-800 px-2 rounded">00:00:00</code> when event ends</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Red color on <code className="bg-zinc-800 px-2 rounded">00:00:00</code> indicates finished state</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Bouncing animations on numbers (scale) and whole timer (y-axis)</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>"Hackathon Ended" text bounces when countdown finishes</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Shake animation on the entire ended container</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
