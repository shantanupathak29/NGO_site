import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import AnimatedContent from "../components/AnimatedContent";
import PixelTransition from "../components/PixelTransition";
import DecryptedText from "../components/DecryptedText";
import PixelCard from "../components/PixelCard";
import StarBorder from "../components/StarBorder";
import { HeroParallax, type ParallaxProduct } from "../components/HeroParallax";
import MagicContainer from "../components/MagicContainer";

export const Route = createFileRoute("/")({
  component: Home,
});

const P = "/photos/";
const parallaxProducts: ParallaxProduct[] = [
  { title: "Field Program", thumbnail: `${P}20230217_121338-1-1024x576.jpg` },
  { title: "Community Meet", thumbnail: `${P}20220330_121946-1-1024x576.jpg` },
  { title: "Training Session", thumbnail: `${P}20211111_130411-1-1024x576.jpg` },
  { title: "Outreach", thumbnail: `${P}WhatsApp-Image-2023-03-17-at-18.00.32-1024x576.jpg` },
  { title: "Workshop", thumbnail: `${P}WhatsApp-Image-2023-03-17-at-16.51.17-1-1024x576.jpg` },
  { title: "Village Life", thumbnail: `${P}WhatsApp-Image-2022-08-12-at-11.17.57-AM-1024x576.jpeg` },
  { title: "Assembly", thumbnail: `${P}WhatsApp-Image-2022-08-12-at-4.38.57-PM-1-1024x576.jpeg` },
  { title: "Fieldwork", thumbnail: `${P}DSCI0469.jpg` },
  { title: "Programs", thumbnail: `${P}PICT1279.jpg` },
  { title: "Learning", thumbnail: `${P}WhatsApp-Image-2021-07-24-at-16.20.47-1024x576.jpeg` },
  { title: "Health", thumbnail: `${P}WhatsApp-Image-2021-07-26-at-11.39.13-1024x576.jpeg` },
  { title: "Livelihoods", thumbnail: `${P}WhatsApp-Image-2021-11-08-at-15.23.07-1-1024x576.jpeg` },
  { title: "Dialogue", thumbnail: `${P}WhatsApp-Image-2021-12-02-at-15.57.51-1-1024x576.jpeg` },
  { title: "Cooperative", thumbnail: `${P}WhatsApp-Image-2022-03-13-at-06.51.00-1-1024x576.jpeg` },
  { title: "Landscape", thumbnail: `${P}DSCI0319.jpg` },
];

const stats = [
  { value: "20+", label: "Years Active" },
  { value: "3,000+", label: "Beneficiaries" },
  { value: "2", label: "States" },
  { value: "3", label: "Program Areas" },
];

function hexToRgb(h: string) {
  const m = h.replace("#", "");
  return [
    parseInt(m.slice(0, 2), 16),
    parseInt(m.slice(2, 4), 16),
    parseInt(m.slice(4, 6), 16),
  ];
}
const START = hexToRgb("#FDF4F5"); // Light start
const END = hexToRgb("#2A1B3D");   // Dark end gradient on scroll

function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = `rgb(${Math.round(START[0] + (END[0] - START[0]) * progress)}, ${Math.round(
    START[1] + (END[1] - START[1]) * progress,
  )}, ${Math.round(START[2] + (END[2] - START[2]) * progress)})`;

  // Text adaptiveness
  const isDark = progress > 0.45;
  const textColorClass = isDark ? "text-[#FDF4F5]" : "text-[#BA90C6]";
  const subTextColorClass = isDark ? "text-[#E8A0BF]" : "text-[#C0DBEA]";
  const cardBgClass = isDark ? "bg-[#2A1B3D]/80 backdrop-blur-md border-[#E8A0BF]/40" : "bg-[#FDF4F5]/85 backdrop-blur-md border-[#BA90C6]/40";

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-300"
        style={{ backgroundColor: bg }}
      />
      <Layout overlayNav>
        {/* Hero - parallax gallery */}
        <HeroParallax products={parallaxProducts} />

        {/* Stats */}
        <section className="relative z-20 -mt-28 sm:-mt-36 md:-mt-40 lg:-mt-40 max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedContent
            distance={100}
            direction="vertical"
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            threshold={0.1}
          >
            <StarBorder color="#E8A0BF" speed="4s" thickness={2} className="w-full">
              <PixelCard
                className="w-full rounded-3xl border border-[#BA90C6]/30 shadow-2xl"
                colors="#FDF4F5,#E8A0BF,#BA90C6,#C0DBEA"
                gap={5}
                speed={45}
              >
                <div className="relative z-10 w-full bg-[#2A1B3D]/85 backdrop-blur-md border border-[#E8A0BF]/40 rounded-3xl py-8 transition-colors duration-300">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x-0 md:divide-x divide-[#BA90C6]/30">
                    {stats.map((s) => (
                      <div key={s.label} className="flex flex-col items-center justify-center p-4">
                        <span className="text-4xl font-extrabold text-[#E8A0BF] mb-1">{s.value}</span>
                        <span className="text-xs text-[#FDF4F5]/90 uppercase tracking-wider font-semibold">{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </PixelCard>
            </StarBorder>
          </AnimatedContent>
        </section>

        {/* About Preview */}
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-[#E8A0BF]/20 rounded-3xl rotate-3" />
              <div className="absolute -inset-2 bg-[#BA90C6]/20 rounded-3xl -rotate-2" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#BA90C6]/40">
                <PixelTransition
                  aspectRatio="125%"
                  gridSize={10}
                  pixelColor="#FDF4F5"
                  animationStepDuration={0.4}
                  firstContent={
                    <img
                      alt="Pragati Path in the field"
                      src="/photos/20230914_171728-1024x576.jpg"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  }
                  secondContent={
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: "#BA90C6",
                        padding: "2rem",
                        textAlign: "center",
                      }}
                    >
                      <p style={{ fontWeight: 700, fontSize: "1.75rem", color: "#FDF4F5", lineHeight: 1.3 }}>
                        Empowering Bundelkhand, one community at a time.
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A1B3D] transition-colors duration-300">Welcome to <span className="text-[#8E5B9A]">Pragati Path</span></h2>
                <span className="text-xl font-semibold text-[#2A1B3D]/75 transition-colors duration-300">
                  <DecryptedText
                    text="- Since 2001"
                    animateOn="view"
                    sequential
                    revealDirection="start"
                    speed={70}
                    characters="ABCD1234!?@#$"
                  />
                </span>
              </div>
              <p className="text-lg text-[#2A1B3D]/75 leading-relaxed transition-colors duration-300 font-medium">
                Pragati Path is a registered non-profit voluntary organization committed to improving the quality of life of vulnerable and marginalized communities through sustainable development initiatives. Since its establishment in <strong>2001</strong>, it has worked with rural and urban communities to promote livelihoods, health, education, women's empowerment, environmental conservation, water security, and social inclusion.
              </p>
              <div className="flex gap-4 pt-2">
                <Link to="/about" className="bg-[#BA90C6] hover:bg-[#E8A0BF] text-[#FDF4F5] text-sm font-bold px-8 py-3.5 rounded-full transition-all shadow-lg hover:scale-105">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Pragati Path */}
        <section className="py-24 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#FDF4F5]">Why Choose Pragati Path</h2>
              <p className="text-sm text-[#E8A0BF]">Our institutional capacity and grassroot integration make us a trusted partner for sustainable development.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "20+ Years of Experience", desc: "Two decades of executing impactful socio-economic projects across Bundelkhand.", icon: "history" },
                { title: "Community-Based Approach", desc: "Active participatory dialogue ensures projects are owned and sustained locally.", icon: "groups" },
                { title: "Transparent Management", desc: "Rigorous reporting, statutory audits, and robust legal trust compliance.", icon: "verified_user" },
                { title: "Professional Team", desc: "Expert multidisciplinary field executives and senior consultants.", icon: "badge" },
                { title: "CSR & Government Partner", desc: "Extensive experience working alongside corporate sponsors and ministries.", icon: "handshake" },
                { title: "Sustainable Focus", desc: "Designing long-term capability building rather than temporary aid.", icon: "eco" },
                { title: "Evidence-Based Programs", desc: "Robust data tracking, social audits, and measurable progress metrics.", icon: "analytics" },
                { title: "Local Trust & Integration", desc: "Deep-rooted community relationships ensuring high participation and trust.", icon: "favorite" }
              ].map((item, index) => (
                <MagicContainer key={index} className="h-full">
                  <div className="p-6 h-60 flex flex-col justify-start space-y-3 rounded-2xl bg-[#2A1B3D]/85 backdrop-blur-md border border-[#BA90C6]/40 shadow-lg hover:border-[#E8A0BF]/60 transition-all">
                    <span className="material-symbols-outlined text-[#E8A0BF] text-3xl">{item.icon}</span>
                    <h4 className="text-base font-bold text-[#FDF4F5] min-h-[3rem] flex items-center">{item.title}</h4>
                    <p className="text-xs text-[#FDF4F5]/80 leading-relaxed">{item.desc}</p>
                  </div>
                </MagicContainer>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
