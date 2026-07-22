import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * A page-wide scroll-driven stroke that traces a meandering path
 * behind the About page content. Sits inside a relatively-positioned
 * wrapper and stretches to full height.
 */
export function AboutTrace() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Accelerate path draw so it completes earlier (e.g. at 65% scroll progress)
  const pathLength = useTransform(scrollYProgress, [0, 0.65], [0, 1]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-0">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 3000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M100 60 C 400 200, 900 100, 1100 350 S 300 700, 200 950 S 1000 1200, 1080 1500 S 200 1750, 260 2050 S 1050 2300, 1050 2600 S 200 2850, 600 2980"
          stroke="#BA90C6"
          strokeWidth="18"
          strokeLinecap="round"
          style={{ pathLength }}
          opacity="0.8"
        />
        <motion.path
          d="M120 120 C 420 260, 920 160, 1120 410 S 320 760, 220 1010 S 1020 1260, 1100 1560 S 220 1810, 280 2110 S 1070 2360, 1070 2660 S 220 2910, 620 3000"
          stroke="#2A1B3D"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="8 14"
          style={{ pathLength }}
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
