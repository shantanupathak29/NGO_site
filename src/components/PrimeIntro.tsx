import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrimeIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check if user has already seen the intro during this session
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("pragati_intro_seen");
      if (hasSeen === "true") {
        setShow(false);
        return;
      }
    }

    const timer = setTimeout(() => {
      setShow(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pragati_intro_seen", "true");
      }
    }, 6000); // Intro lasts ~6 seconds total

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0a14] overflow-hidden"
        >
          {/* Ambient Glowing Backgrounds */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ 
                scale: [0.3, 1.2, 1], 
                opacity: [0, 0.5, 0.25] 
              }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#BA90C6]/40 via-[#E8A0BF]/35 to-[#C0DBEA]/25 blur-[140px]"
            />
          </div>

          {/* Second ambient ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: [0.5, 1.5], 
                opacity: [0, 0.15, 0] 
              }}
              transition={{ duration: 5, delay: 1, ease: "easeOut" }}
              className="w-[400px] h-[400px] rounded-full border border-[#E8A0BF]/30"
            />
          </div>

          {/* Prime Video style sweeping light bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: [0, 0.5, 1],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 5, delay: 0.5, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-transparent via-[#E8A0BF] to-[#C0DBEA]"
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="relative flex flex-col items-center justify-center">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
              animate={{ 
                scale: [0.5, 1.08, 1], 
                opacity: [0, 1, 1],
                filter: ["blur(20px)", "blur(0px)", "blur(0px)"]
              }}
              transition={{ 
                duration: 3, 
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
                times: [0, 0.6, 1]
              }}
              className="relative flex items-center justify-center"
            >
              {/* Pulsing ring around logo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.7, 0], scale: [0.8, 1.4, 1.6] }}
                transition={{ delay: 1.5, duration: 3, ease: "easeOut" }}
                className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-[#E8A0BF]/40 pointer-events-none"
              />

              <img 
                src="/pragati-logo.png" 
                alt="Pragati Path Logo" 
                className="h-32 w-32 sm:h-40 sm:w-40 object-contain z-10 filter drop-shadow-[0_0_40px_rgba(232,160,191,0.4)]"
              />
            </motion.div>

            {/* Brand Name Text Animation */}
            <div className="mt-8 overflow-hidden">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 1.5, ease: [0.215, 0.610, 0.355, 1] }}
                className="text-3xl sm:text-5xl font-bold tracking-widest text-[#FDF4F5] uppercase font-sans"
                style={{ letterSpacing: "0.25em" }}
              >
                Pragati Path
              </motion.h1>
            </div>

            {/* Tagline / Subtitle */}
            <div className="mt-3 overflow-hidden">
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                transition={{ delay: 2.8, duration: 1.5, ease: "easeOut" }}
                className="text-sm sm:text-base tracking-[0.3em] text-[#C0DBEA] font-medium uppercase"
              >
                People-Centered Development
              </motion.p>
            </div>

            {/* Horizontal divider line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.6, 0.6] }}
              transition={{ delay: 3.2, duration: 1.5, ease: "easeOut" }}
              className="mt-6 h-px w-48 bg-gradient-to-r from-transparent via-[#E8A0BF]/60 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
