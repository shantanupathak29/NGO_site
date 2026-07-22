import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

import { cn } from "../lib/utils";

export interface CardData {
  id: number | string;
  image?: string;
  category?: string;
  icon?: string;
  color?: string;
  partners?: string[];
  alt?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
}: StickyCard002Props) => {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current;
      const totalCards = cardElements.length;

      if (!cardElements[0]) return;

      gsap.set(cardElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.85,
            rotation: 2,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div className={cn("relative min-h-screen w-full py-12", className)} ref={container}>
      <div className="sticky-cards relative flex h-full w-full items-center justify-center overflow-hidden p-4 lg:p-8">
        <div
          className={cn(
            "relative h-[460px] sm:h-[520px] md:h-[550px] w-full max-w-3xl overflow-hidden rounded-3xl",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className={cn(
                "rounded-3xl absolute inset-0 h-full w-full p-5 sm:p-8 md:p-10 backdrop-blur-xl bg-[#FDF4F5]/95 border border-[#BA90C6] shadow-2xl flex flex-col justify-between"
              )}
              style={{ borderColor: card.color || "#BA90C6" }}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              {card.image ? (
                <img
                  src={card.image}
                  alt={card.alt || ""}
                  className="rounded-2xl h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col h-full justify-between space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#FDF4F5] shrink-0 shadow-md"
                      style={{ backgroundColor: card.color || "#BA90C6" }}
                    >
                      <span className="material-symbols-outlined text-3xl">{card.icon || "handshake"}</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#C0DBEA] font-semibold uppercase tracking-widest">Partner Network</span>
                      <h4 className="text-2xl font-bold text-[#BA90C6]">{card.category}</h4>
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {card.partners?.map((p, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-[#E8A0BF] bg-[#FDF4F5] p-3.5 rounded-2xl border border-[#BA90C6]/50 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-sm mt-0.5 text-[#BA90C6]">check_circle</span>
                          <span className="font-semibold">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-[#BA90C6]/30 text-xs text-[#C0DBEA]">
                    <span>Pragati Path Community Collaboration</span>
                    <span className="font-semibold text-[#BA90C6]">Active Partner</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skiper17 = () => {
  const defaultCards: CardData[] = [
    {
      id: 1,
      category: "Government Departments & Ministries",
      icon: "account_balance",
      color: "#8E5B9A",
      partners: [
        "Ministry of Rural Development, GOI",
        "Ministry of Environment & Forests, GOI",
        "Dept. of Agriculture Extension / ATMA",
        "Dept. of Farmers Welfare & Agriculture Development, Govt. of MP",
        "State Water & Sanitation Mission (SWSM), Lucknow",
        "DPMU Allahabad",
      ],
    },
    {
      id: 2,
      category: "Financial Institutions",
      icon: "payments",
      color: "#8E5B9A",
      partners: ["NABARD (National Bank for Agriculture and Rural Development)"],
    },
    {
      id: 3,
      category: "Academic & Research Institutions",
      icon: "history_edu",
      color: "#8E5B9A",
      partners: [
        "JNKVV Jabalpur (Food Science & Plant Physiology)",
        "Regional Facilitation Centre, National Medicinal Plants Board, Ministry of AYUSH",
      ],
    },
    {
      id: 4,
      category: "Corporate CSR Partners",
      icon: "business",
      color: "#8E5B9A",
      partners: ["BHEL Jhansi", "Bharat Gas", "Indian Gas", "HP Gas"],
    },
    {
      id: 5,
      category: "NGOs & Foundations",
      icon: "public",
      color: "#8E5B9A",
      partners: [
        "Childline India Foundation",
        "SANKALPA (USA)",
        "Kitchen Table Charitable Trust (UK)",
        "Just a Drop (UK)",
        "VEMOSA Foundation",
      ],
    },
    {
      id: 6,
      category: "Health Sector Partners",
      icon: "volunteer_activism",
      color: "#8E5B9A",
      partners: ["MP State AIDS Control Society (MPSACS), Bhopal"],
    },
  ];

  const [activeId, setActiveId] = useState<number | string>(1);

  return (
    <div className="w-full py-4">
      {/* Desktop Expand-On-Hover Flex Layout */}
      <div className="hidden lg:flex flex-row gap-4 h-[420px] w-full items-stretch">
        {defaultCards.map((card) => {
          const isActive = activeId === card.id;

          return (
            <div
              key={card.id}
              onMouseEnter={() => setActiveId(card.id)}
              className={`
                relative overflow-hidden rounded-3xl p-6 transition-all duration-500 ease-out cursor-pointer flex flex-col justify-between border
                ${
                  isActive
                    ? "flex-[2.6] bg-[#FDF4F5] border-[#E8A0BF] shadow-2xl shadow-[#E8A0BF]/35 -translate-y-1"
                    : "flex-1 bg-[#FDF4F5]/75 backdrop-blur-xl border-[#BA90C6]/40 hover:border-[#BA90C6] hover:bg-[#FDF4F5]/90 hover:scale-[1.01]"
                }
              `}
            >
              {/* Radial Blur Glow when Active */}
              <div
                className={`absolute -inset-2 bg-gradient-to-br from-[#BA90C6]/20 via-[#E8A0BF]/25 to-[#C0DBEA]/20 rounded-3xl blur-xl pointer-events-none transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="space-y-4 relative z-10">
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? "bg-[#E8A0BF]/30 text-[#2A1B3D] border-[#E8A0BF] scale-110 shadow-md"
                        : "bg-[#BA90C6]/20 text-[#8E5B9A] border-[#BA90C6]/40"
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                      isActive
                        ? "bg-[#8E5B9A] text-white border-[#8E5B9A]"
                        : "bg-[#BA90C6]/15 text-[#8E5B9A] border-[#BA90C6]/30"
                    }`}
                  >
                    {card.partners?.length} {card.partners?.length === 1 ? "Partner" : "Partners"}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h4
                    className={`font-extrabold transition-all duration-300 leading-tight ${
                      isActive ? "text-xl text-[#2A1B3D]" : "text-base text-[#8E5B9A]"
                    }`}
                  >
                    {card.category}
                  </h4>
                </div>

                {/* Partner Details List */}
                <div
                  className={`pt-3 border-t border-[#BA90C6]/30 transition-all duration-500 overflow-y-auto max-h-[220px] custom-scrollbar ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2 lg:opacity-75"
                  }`}
                >
                  <ul className="space-y-2">
                    {card.partners?.map((p, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2.5 text-xs sm:text-sm font-medium p-2 rounded-xl border transition-all ${
                          isActive
                            ? "bg-[#FDF4F5] text-[#2A1B3D] border-[#BA90C6]/40 shadow-sm"
                            : "bg-[#FDF4F5]/50 text-[#2A1B3D]/80 border-transparent"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs mt-0.5 text-[#8E5B9A] shrink-0">
                          check_circle
                        </span>
                        <span className="leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Indicator */}
              <div className="pt-3 border-t border-[#BA90C6]/30 flex justify-between items-center text-[11px] font-semibold relative z-10">
                <span className={isActive ? "text-[#8E5B9A]" : "text-[#2A1B3D]/60"}>
                  {isActive ? "Expanded View" : "Hover to Expand"}
                </span>
                <span className="material-symbols-outlined text-sm text-[#8E5B9A]">
                  {isActive ? "unfold_more" : "arrow_forward"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile/Tablet Grid View with Hover Scale */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-5">
        {defaultCards.map((card) => (
          <div
            key={card.id}
            className="bg-[#FDF4F5]/90 backdrop-blur-xl rounded-3xl p-6 border border-[#BA90C6] shadow-lg hover:shadow-2xl hover:shadow-[#E8A0BF]/30 hover:border-[#E8A0BF] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#BA90C6]/20 border border-[#BA90C6]/40 flex items-center justify-center text-[#8E5B9A] shrink-0">
                    <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-[#2A1B3D]">{card.category}</h4>
                </div>
                <span className="bg-[#BA90C6]/15 text-[#8E5B9A] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#BA90C6]/30 shrink-0">
                  {card.partners?.length} {card.partners?.length === 1 ? "Partner" : "Partners"}
                </span>
              </div>

              <div className="pt-2 border-t border-[#BA90C6]/30">
                <ul className="space-y-2">
                  {card.partners?.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2A1B3D] font-medium">
                      <span className="material-symbols-outlined text-xs mt-0.5 text-[#8E5B9A] shrink-0">check_circle</span>
                      <span className="leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Skiper17, StickyCard002 };
