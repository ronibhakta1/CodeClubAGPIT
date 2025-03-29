"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InfinitesliderProps {
  children: ReactNode;
  speedOnHover: number;  // Ensure it's not optional if we provide a default value
  gap: number;
}

export const InfiniteSlider = ({
  children,
  speedOnHover = 20,
  gap = 24,
}: InfinitesliderProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex items-center"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ ease: "linear", repeat: Infinity, duration: speedOnHover }} // Use speedOnHover here
      >
        <div className={`flex items-center gap-${gap}`}>
          {children}
          {children} {/* Duplicate for smooth effect */}
        </div>
      </motion.div>
    </div>
  );
};
