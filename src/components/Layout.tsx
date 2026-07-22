import { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer2 from "./Footer2";

export function Layout({ children, overlayNav = false }: { children: ReactNode; overlayNav?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-transparent font-sans overflow-x-hidden max-w-full">
      <NavBar />
      <main className={`flex-grow ${overlayNav ? "" : "pt-20 sm:pt-24"} w-full relative z-0 max-w-full`}>{children}</main>
      <Footer2 />
    </div>
  );
}
