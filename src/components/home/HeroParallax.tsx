import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";

export type ParallaxProduct = {
  title: string;
  link?: string;
  thumbnail: string;
};

export function HeroParallax({ products }: { products: ParallaxProduct[] }) {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 40, mass: 0.8 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 600]), springConfig);
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -600]),
    springConfig,
  );
  // More aggressive tilt for dramatic parallax
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.3], [20, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.15], [0.4, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.3], [12, 0]), springConfig);
  // Pull cards up high so they fill the screen from the start
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.5], [-80, 100]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[100vh] sm:h-[110vh] md:h-[120vh] lg:h-[135vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:800px] [transform-style:preserve-3d]"
    >
      {/* Text overlay — sticky to viewport, middle-left */}
      <div className="sticky top-0 h-screen w-full z-30 pointer-events-none flex items-center justify-center px-4">
        <div className="max-w-4xl w-full mx-auto px-5 sm:px-8 md:px-12 py-16 sm:py-8 md:py-14 pointer-events-auto bg-white/40 sm:bg-white/30 backdrop-blur-xl rounded-3xl border border-white/50 sm:border-white/40 shadow-2xl text-center translate-y-4 sm:translate-y-8 md:translate-y-16 lg:translate-y-28">
          <p className="text-base sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[#BA90C6] mb-3 sm:mb-4">
            Established 2001
          </p>
          <h1 className="text-4xl sm:text-[3.25rem] md:text-[4rem] font-extrabold text-[#2A1B3D] leading-tight sm:leading-[1.05]" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Welcome to <span className="text-[#BA90C6] block xs:inline">Pragati Path</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mt-4 sm:mt-5 text-[#2A1B3D]/75 font-medium leading-relaxed max-w-2xl mx-auto">
            Dedicated to people-centered development in the Bundelkhand region, fostering empowerment and sustainable growth since 2001.
          </p>
          <div className="mt-6 sm:mt-8">
            <Link
              to="/about"
              className="inline-flex items-center bg-[#2A1B3D] text-[#FDF4F5] text-sm sm:text-sm font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg hover:bg-[#BA90C6] transition-all hover:scale-105"
            >
              Learn About Our Work
              <span className="material-symbols-outlined ml-2 sm:ml-2 text-base sm:text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Parallax cards — start from the top */}
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
          willChange: "transform, opacity",
        }}
        className="w-full relative z-10 -mt-[85vh] sm:-mt-[90vh] md:-mt-[100vh]"
      >
        <motion.div className="flex flex-row-reverse gap-4 sm:gap-6 mb-6 sm:mb-8 -ml-20 sm:-ml-32 md:-ml-48">
          {firstRow.map((p) => (
            <ProductCard product={p} translate={translateX} key={p.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 -ml-12 sm:-ml-20 md:-ml-32">
          {secondRow.map((p) => (
            <ProductCard product={p} translate={translateXReverse} key={p.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse gap-4 sm:gap-6 -ml-20 sm:-ml-32 md:-ml-48">
          {thirdRow.map((p) => (
            <ProductCard product={p} translate={translateX} key={p.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProductCard({
  product,
  translate,
}: {
  product: ParallaxProduct;
  translate: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ x: translate, willChange: "transform" }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group/product h-64 sm:h-80 md:h-96 w-[17rem] sm:w-[24rem] md:w-[28rem] relative shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#BA90C6]/60 bg-[#FDF4F5]"
    >
      <a href={product.link || "#"} className="block group-hover/product:shadow-2xl h-full w-full">
        <img
          src={product.thumbnail}
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-105"
          alt={product.title}
        />
      </a>
    </motion.div>
  );
}
