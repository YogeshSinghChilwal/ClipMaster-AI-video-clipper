"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scissors } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default function IntroAnimation({ children }: Props) {
  const [showIntro, setShowIntro] = useState(true);

   const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowAnimation(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4800);
    return () => clearTimeout(timer);
  }, []);

  // Ball positions (percentages instead of fixed px)
  const ballPositions = [25, 45, 65, 85]; // % from left

  return (
    <div className="w-full h-screen">
      <AnimatePresence>
        {showIntro && showAnimation ? (
          <motion.div
            key="intro"
            className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Scene */}
            <div className="relative w-[90vw] max-w-[800px] h-[40vh] max-h-[400px]">
              {/* Balls */}
              {ballPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-white shadow-lg top-1/2 -translate-y-1/2"
                  style={{ left: `${pos}%` }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 0 }}
                  transition={{
                    delay: (i - 0.1) * 1,
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Scissors */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white"
                initial={{ left: "-15%" }}
                animate={{
                  left: ["20%", "40%", "60%", "80%", "85%"],
                  top: ["50%", "50%", "50%", "50%", "-90%"],
                  rotate: [0, 0, 0, 0, -90],
                  scale: [1, 1, 1, 1, 0.8],
                }}
                transition={{
                  left: {
                    times: [0, 0.25, 0.5, 0.75, 1],
                    duration: 4.2,
                  },
                  top: {
                    times: [0, 0.25, 0.5, 0.75, 1],
                    duration: 4.7,
                  },
                  rotate: {
                    times: [0, 0.25, 0.5, 0.75, 1],
                    duration: 4.7,
                  },
                  scale: {
                    times: [0, 0.25, 0.5, 0.75, 1],
                    duration: 4.7,
                  },
                }}
              >
                <Scissors className="w-full h-full" />
              </motion.div>
            </div>

            {/* Loading Text */}
            <div className="absolute bottom-8 sm:bottom-12 text-white opacity-70 text-sm sm:text-lg">
              Loading...
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="website"
            className="w-full min-h-screen bg-[#f8fafc] text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
