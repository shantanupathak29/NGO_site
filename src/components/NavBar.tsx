import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "@tanstack/react-router";

const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const AboutIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const GalleryIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);
const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);
const DonateIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

interface Tab {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  type?: never;
}
interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  to?: never;
}
type TabItem = Tab | Separator;

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: {
    width: "auto",
    opacity: 1,
    transition: { delay: 0.05, duration: 0.2, ease: "easeOut" },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.1, ease: "easeIn" },
  },
};

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastYRef.current && y > 80) setHidden(true);
      else setHidden(false);
      lastYRef.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const TABS: TabItem[] = [
    { title: "Home", icon: HomeIcon, to: "/" },
    { type: "separator" },
    { title: "About Us", icon: AboutIcon, to: "/about" },
    { type: "separator" },
    { title: "Gallery", icon: GalleryIcon, to: "/gallery" },
    { type: "separator" },
    { title: "Contact", icon: MailIcon, to: "/contact" },
    { type: "separator" },
    { title: "Donate", icon: DonateIcon, to: "/donate" },
  ];

  const getSelectedIndex = () => {
    const index = TABS.findIndex(tab => tab.type !== "separator" && tab.to === location.pathname);
    return index !== -1 ? index : 0;
  };

  const selectedIndex = getSelectedIndex();

  const SeparatorComponent = () => (
    <div className="h-4 sm:h-6 w-px bg-[#BA90C6]/30 mx-0.5 sm:mx-1 shrink-0" aria-hidden="true" />
  );

  return (
    <div className={`flex justify-center pt-3 sm:pt-5 px-2 sm:px-4 w-full fixed top-0 z-50 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div
        className="flex items-center gap-0.5 sm:gap-1 rounded-full border border-[#BA90C6]/40 bg-[#FDF4F5]/85 sm:bg-[#FDF4F5]/60 p-1.5 sm:p-2 shadow-xl shadow-[#BA90C6]/15 backdrop-blur-xl max-w-full overflow-x-auto no-scrollbar"
        onMouseLeave={() => setHovered(null)}
      >
        {TABS.map((tab, index) => {
          if (tab.type === "separator") {
            return <SeparatorComponent key={`separator-${index}`} />;
          }

          const Icon = tab.icon;
          const isSelected = selectedIndex === index;
          const isHovered = hovered === index;
          const isExpanded = isSelected || isHovered;

          return (
            <button
              key={tab.title}
              onClick={() => navigate({ to: tab.to })}
              onMouseEnter={() => setHovered(index)}
              className={`relative z-10 flex items-center rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs md:text-sm font-bold transition-colors focus:outline-none shrink-0 
                ${isSelected
                    ? "text-[#2A1B3D]"
                    : "text-[#4A2B66] hover:text-[#2A1B3D]"
                }
              `}
            >
              {isSelected && (
                <motion.div
                  layoutId="pill"
                  className="absolute inset-0 z-0 rounded-full bg-[#FDF4F5]/90 shadow-md border border-[#BA90C6]/50"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.span
                      variants={spanVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {tab.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
