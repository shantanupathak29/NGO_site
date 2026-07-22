import React, { useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
}

const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isHovered?: boolean;
  animationDelay?: number;
}) => (
  <div
    className={`
        backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border p-2 text-center
        ${
          isHighlighted
            ? "bg-[#FDF4F5]/90 border-[#BA90C6] shadow-[#BA90C6]/40 shadow-2xl animate-breathing-glow"
            : `bg-[#FDF4F5]/70 border-[#BA90C6]/40 ${!isHovered && "animate-float"}`
        }
        ${
          isHovered
            ? "bg-[#FDF4F5] border-[#E8A0BF] scale-110 shadow-[#E8A0BF]/50 shadow-2xl"
            : "hover:bg-[#FDF4F5]/90 hover:border-[#BA90C6]/80"
        }
        ${className}
    `}
    style={{ animationDelay: `${animationDelay}s` }}
  >
    {children}
  </div>
);

const teamMembers: TeamMember[] = [
  { id: 1, name: "Ravindra Singh", role: "President" },
  { id: 2, name: "Pawan Gupta", role: "Vice-President" },
  { id: 3, name: "Brijendra Singh Chauhan", role: "Executive Director" },
  { id: 4, name: "Upasana Singh", role: "Vice-Executive Director" },
  { id: 5, name: "Kamini Singh", role: "Treasurer" },
  { id: 6, name: "Sandeep Chaube", role: "Chief Consultant" },
];

export function LeadershipSpider() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const radius = 220;
  const centralIconRadius = 65;
  const outerIconRadius = 55;
  const svgSize = 580;
  const svgCenter = svgSize / 2;

  return (
    <div className="w-full flex items-center justify-center font-sans p-2 sm:p-8 overflow-hidden my-4 sm:my-8">
      <style>
        {`
          @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
              100% { transform: translateY(0px); }
          }
          .animate-float {
              animation: float 4s ease-in-out infinite;
          }

          @keyframes breathing-glow {
              0% { box-shadow: 0 0 20px 0px rgba(186, 144, 198, 0.4); }
              50% { box-shadow: 0 0 35px 8px rgba(232, 160, 191, 0.3); }
              100% { box-shadow: 0 0 20px 0px rgba(186, 144, 198, 0.4); }
          }
          .animate-breathing-glow {
              animation: breathing-glow 3s ease-in-out infinite;
          }
        `}
      </style>

      <div className="relative w-[580px] h-[580px] scale-[0.52] xs:scale-[0.68] sm:scale-[0.85] md:scale-100 lg:scale-110 -my-24 xs:-my-16 sm:my-0 flex items-center justify-center shrink-0">
        {/* SVG connecting line network */}
        <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g>
            {/* Draw outer web lines */}
            {teamMembers.map((member, i) => {
              const nextIndex = (i + 1) % teamMembers.length;
              const nextMember = teamMembers[nextIndex];

              const angle1 = (-90 + i * (360 / teamMembers.length)) * (Math.PI / 180);
              const x1 = svgCenter + radius * Math.cos(angle1);
              const y1 = svgCenter + radius * Math.sin(angle1);

              const angle2 = (-90 + nextIndex * (360 / teamMembers.length)) * (Math.PI / 180);
              const x2 = svgCenter + radius * Math.cos(angle2);
              const y2 = svgCenter + radius * Math.sin(angle2);

              const isLineActive = hoveredId === member.id || hoveredId === nextMember.id;

              return (
                <line
                  key={`web-line-${member.id}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isLineActive ? "#E8A0BF" : "#BA90C6"}
                  strokeWidth={isLineActive ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                  style={{ opacity: isLineActive ? 0.9 : 0.35 }}
                  filter={isLineActive ? "url(#glow)" : "none"}
                />
              );
            })}

            {/* Draw spoke lines from Pragati Path center logo */}
            {teamMembers.map((member, i) => {
              const angleInDegrees = -90 + i * (360 / teamMembers.length);
              const angleInRadians = angleInDegrees * (Math.PI / 180);

              const startX = svgCenter + centralIconRadius * Math.cos(angleInRadians);
              const startY = svgCenter + centralIconRadius * Math.sin(angleInRadians);
              const endX = svgCenter + (radius - outerIconRadius) * Math.cos(angleInRadians);
              const endY = svgCenter + (radius - outerIconRadius) * Math.sin(angleInRadians);
              const isSpokeActive = hoveredId === member.id;

              return (
                <line
                  key={`spoke-line-${member.id}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={isSpokeActive ? "#E8A0BF" : "#BA90C6"}
                  strokeWidth={isSpokeActive ? "3" : "1.5"}
                  className="transition-all duration-300"
                  style={{ opacity: isSpokeActive ? 1 : 0.35 }}
                  filter={isSpokeActive ? "url(#glow)" : "none"}
                />
              );
            })}
          </g>
        </svg>

        {/* Center Container */}
        <div className="absolute top-1/2 left-1/2">
          {/* Pragati Path Logo in Center */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center p-3 rounded-full bg-[#FDF4F5]/90 border border-[#BA90C6]/60 shadow-2xl">
            <img
              src="/pragati-logo.png"
              alt="Pragati Path Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-xl shrink-0"
              style={{ display: "block" }}
            />
          </div>

          {/* Outer Leadership Cards */}
          {teamMembers.map((member, i) => {
            const angleInDegrees = -90 + i * (360 / teamMembers.length);
            const angleInRadians = angleInDegrees * (Math.PI / 180);
            const x = radius * Math.cos(angleInRadians);
            const y = radius * Math.sin(angleInRadians);

            const isHovered = hoveredId === member.id;

            return (
              <div
                key={member.id}
                className="absolute z-20"
                style={{ transform: `translate(${x}px, ${y}px)` }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="-translate-x-1/2 -translate-y-1/2 relative">
                  {/* Spotlight halo */}
                  <div
                    className={`absolute inset-[-15px] bg-[#E8A0BF]/30 rounded-2xl blur-xl transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <IconWrapper
                    className="w-40 h-28 sm:w-44 sm:h-28 shadow-lg p-3"
                    isHovered={isHovered}
                    animationDelay={i * 0.15}
                  >
                    <span className="material-symbols-outlined text-[#BA90C6] text-2xl mb-1">person</span>
                    <h5 className="text-sm font-bold text-[#2A1B3D] leading-tight">{member.name}</h5>
                    <p className="text-xs text-[#8E5B9A] font-semibold tracking-wide uppercase mt-1">{member.role}</p>
                  </IconWrapper>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LeadershipSpider;
