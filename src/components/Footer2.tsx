import { Link } from "@tanstack/react-router";

export default function Footer() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
    { name: "Donate", href: "/donate" },
  ];

  const socialIcons = [
    {
      name: "X",
      href: "#",
      svg: (
        <svg className="w-5 h-5 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      svg: (
        <svg className="w-5 h-5 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "#",
      svg: (
        <svg className="w-5 h-5 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      svg: (
        <svg className="w-5 h-5 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
        </svg>
      ),
    }
  ];

  return (
    <footer className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#2A1B3D] mt-12 sm:mt-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <div className="mb-4 sm:mb-6 flex items-center justify-center">
          <img
            src="/pragati-logo.png"
            alt="Pragati Path Logo"
            className="h-14 w-14 sm:h-20 sm:w-20 mr-3 sm:mr-4 drop-shadow-lg object-contain"
          />
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#BA90C6]">Pragati Path</span>
        </div>
        
        <p className="text-center text-[#E8A0BF] text-xs sm:text-sm max-w-2xl mb-6 sm:mb-8 leading-relaxed font-medium px-2">
          Pragati Path is a registered non-profit voluntary organization working in Uttar Pradesh and Madhya Pradesh since 2001. We are committed to sustainable community development through participatory approaches.
        </p>

        <nav className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-4 sm:gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className="text-xs sm:text-sm text-[#E8A0BF] hover:text-[#BA90C6] font-semibold transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mb-6 sm:mb-8 flex space-x-6 text-[#BA90C6]">
          {socialIcons.map((icon) => (
            <a key={icon.name} href={icon.href} className="hover:text-[#E8A0BF] transition-colors" aria-label={icon.name}>
              {icon.svg}
            </a>
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full pt-6 sm:pt-8 border-t border-[#BA90C6]/30 text-xs text-[#C0DBEA] text-center md:text-left">
          <p>© {new Date().getFullYear()} Pragati Path. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-semibold">Registered under Societies Registration Act 1860</p>
        </div>
      </div>
    </footer>
  );
}
