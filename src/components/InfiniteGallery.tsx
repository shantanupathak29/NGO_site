import { motion } from "motion/react";

export type MarqueeImage = { src: string; label?: string };

export function InfiniteGallery({
  rows,
}: {
  rows: { images: MarqueeImage[]; direction?: "left" | "right"; duration?: number }[];
}) {
  return (
    <div className="w-full overflow-hidden py-6 space-y-6">
      {rows.map((row, i) => (
        <MarqueeRow
          key={i}
          images={row.images}
          direction={row.direction ?? (i % 2 === 0 ? "left" : "right")}
          duration={row.duration ?? 40}
        />
      ))}
    </div>
  );
}

function MarqueeRow({
  images,
  direction,
  duration,
}: {
  images: MarqueeImage[];
  direction: "left" | "right";
  duration: number;
}) {
  const doubled = [...images, ...images];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: [from, to] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shrink-0 shadow-ambient border border-[#F5E5E8] group"
          >
            <img
              src={img.src}
              alt={img.label ?? ""}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {img.label && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#BA90C6]/85 to-transparent">
                <span className="inline-block bg-[#FDF4F5] text-[#BA90C6] text-xs font-semibold px-3 py-1 rounded-full">
                  {img.label}
                </span>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
