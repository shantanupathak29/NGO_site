import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { AboutTrace } from "../components/about/AboutTrace";
import FadeContent from "../components/FadeContent";

import ProgramCard from "../components/about/ProgramCard";
import AnimatedList from "../components/about/AnimatedList";
import SpecularButton from "../components/about/SpecularButton";
import { Skiper17 as PartnersCards } from "../components/about/StickyCard002";
import { Skiper49 as FlagshipCarousel } from "../components/about/Carousel003";
import { LeadershipSpider } from "../components/about/LeadershipSpider";
import GlareHover from "../components/about/GlareHover";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us - Pragati Path" },
      { name: "description", content: "Our journey since 2001: people-centered development across Bundelkhand." },
      { property: "og:title", content: "About Us - Pragati Path" },
      { property: "og:description", content: "Our journey since 2001: people-centered development across Bundelkhand." },
    ],
  }),
  component: About,
});

function hexToRgb(h: string) {
  const m = h.replace("#", "");
  return [
    parseInt(m.slice(0, 2), 16),
    parseInt(m.slice(2, 4), 16),
    parseInt(m.slice(4, 6), 16),
  ];
}
const START = hexToRgb("#FDF4F5");
const END = hexToRgb("#2A1B3D");

function About() {
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

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-300"
        style={{ backgroundColor: bg }}
      />
      <Layout>
        <div className="relative overflow-hidden">
          <AboutTrace />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 space-y-24">
            
            {/* Intro / Who We Are */}
            <FadeContent blur duration={900} threshold={0.2} initialOpacity={0}>
              <section className="md:flex gap-12 items-center">
                <div className="md:w-1/2 space-y-6">
                  <p className="text-xs text-[#2A1B3D]/80 uppercase tracking-widest font-bold">
                    Established June 2001 · UP &amp; MP
                  </p>
                  <h1 className="text-5xl md:text-6xl font-extrabold text-[#8E5B9A]">Who We Are</h1>
                  <p className="text-lg text-[#2A1B3D]/80 leading-relaxed font-medium">
                    Pragati Path is a development organization dedicated to creating inclusive and sustainable opportunities for disadvantaged communities. We believe every individual deserves access to education, healthcare, dignified livelihoods, clean water, and a healthy environment. Over the years we have partnered with government departments, CSR foundations, development agencies, and local communities to implement impactful programs across Uttar Pradesh and Madhya Pradesh.
                  </p>

                  {/* SpecularButton requirement 12 */}
                  <div className="pt-2">
                    <SpecularButton
                      size="lg"
                      radius={24}
                      tint="#FDF4F5"
                      tintOpacity={0.2}
                      blur={10}
                      textColor="#8E5B9A"
                      lineColor="#8E5B9A"
                      baseColor="#8E5B9A"
                      intensity={1}
                      shineSize={15}
                      shineFade={45}
                      thickness={1.5}
                      speed={0.35}
                      followMouse
                      proximity={250}
                      autoAnimate={false}
                      onClick={() => {
                        const el = document.getElementById("focus-areas");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Explore Our Focus Areas
                    </SpecularButton>
                  </div>
                </div>

                <div className="md:w-1/2 mt-10 md:mt-0">
                  <div className="rounded-3xl overflow-hidden shadow-2xl h-[420px] relative border border-[#BA90C6]/40">
                    <img
                      alt="Pragati Path Team Work"
                      src="/photos/20230914_171728-1024x576.jpg"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#BA90C6]/40 via-transparent to-transparent" />
                  </div>
                </div>
              </section>
            </FadeContent>

            {/* Mission / Vision */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeContent blur duration={900} threshold={0.25} initialOpacity={0}>
                <GlareHover borderRadius="24px" glareColor="#E8A0BF" glareOpacity={0.65} className="h-full">
                  <div className="bg-[#FDF4F5]/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl relative overflow-hidden border border-[#BA90C6] h-full space-y-4">
                    <div className="flex items-center gap-3 relative">
                      <div className="w-12 h-12 rounded-2xl bg-[#E8A0BF]/30 flex items-center justify-center text-[#BA90C6]">
                        <span className="material-symbols-outlined text-2xl">flag</span>
                      </div>
                      <h2 className="text-3xl font-bold text-[#BA90C6]">Our Mission</h2>
                    </div>
                    <p className="text-base text-[#2A1B3D] leading-relaxed font-medium">
                      To empower marginalized communities through participatory development by strengthening livelihoods, improving health and education, conserving natural resources, promoting gender equality, and building resilient communities.
                    </p>
                  </div>
                </GlareHover>
              </FadeContent>
              <FadeContent blur duration={900} delay={150} threshold={0.25} initialOpacity={0}>
                <GlareHover borderRadius="24px" glareColor="#E8A0BF" glareOpacity={0.65} className="h-full">
                  <div className="bg-[#FDF4F5]/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl relative overflow-hidden border border-[#BA90C6] h-full space-y-4">
                    <div className="flex items-center gap-3 relative">
                      <div className="w-12 h-12 rounded-2xl bg-[#C0DBEA]/30 flex items-center justify-center text-[#BA90C6]">
                        <span className="material-symbols-outlined text-2xl">visibility</span>
                      </div>
                      <h2 className="text-3xl font-bold text-[#BA90C6]">Our Vision</h2>
                    </div>
                    <p className="text-base text-[#2A1B3D] leading-relaxed font-medium">
                      A society where every individual enjoys equal opportunities, dignity, sustainable livelihoods, good health, quality education, and a clean environment.
                    </p>
                  </div>
                </GlareHover>
              </FadeContent>
            </section>

            {/* Core Values */}
            <section className="bg-[#FDF4F5]/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-[#BA90C6] space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-extrabold text-[#BA90C6]">Our Core Values</h3>
                <p className="text-sm text-[#2A1B3D]/80 font-semibold">The driving principles behind our organization and grassroots programs.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Transparency", icon: "search" },
                  { name: "Accountability", icon: "verified" },
                  { name: "Community Participation", icon: "groups" },
                  { name: "Gender Equality", icon: "diversity_3" },
                  { name: "Sustainability", icon: "eco" },
                  { name: "Innovation", icon: "lightbulb" },
                  { name: "Integrity", icon: "gavel" },
                  { name: "Respect for Human Dignity", icon: "sentiment_satisfied" }
                ].map((val, idx) => (
                  <GlareHover key={idx} borderRadius="16px" glareColor="#E8A0BF" glareOpacity={0.65} className="hover:scale-105 transition-transform">
                    <div className="bg-[#FDF4F5] p-6 rounded-2xl border border-[#BA90C6]/60 flex flex-col items-center justify-center text-center space-y-2 shadow-md h-full w-full">
                      <span className="material-symbols-outlined text-[#E8A0BF] text-3xl">{val.icon}</span>
                      <span className="text-sm font-bold text-[#BA90C6]">{val.name}</span>
                    </div>
                  </GlareHover>
                ))}
              </div>
            </section>



            {/* Target Communities & Compliance info card */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 bg-[#FDF4F5]/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#BA90C6] space-y-6">
                <h3 className="text-2xl font-bold text-[#BA90C6]">Our Target Communities</h3>
                <p className="text-sm text-[#2A1B3D]/85 font-medium leading-relaxed">
                  We direct our efforts toward marginalized, rural, and economically excluded sections of society who need structural support.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Scheduled Castes (SC)",
                    "Scheduled Tribes (ST)",
                    "Other Backward Classes (OBC)",
                    "Women Collective Groups",
                    "Underprivileged Children",
                    "Landless & Poor Farmers",
                    "Street Children & Youth",
                    "Persons with Disabilities",
                    "Vulnerable Elderly"
                  ].map((comm, idx) => (
                    <span key={idx} className="bg-[#BA90C6]/15 text-[#BA90C6] text-xs font-bold px-3.5 py-2 rounded-full border border-[#BA90C6]/30">
                      {comm}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#FDF4F5]/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#BA90C6] space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#BA90C6]">Trust & Compliance</h3>
                  <p className="text-xs text-[#2A1B3D]/80 mt-1 font-semibold">Registrations are subject to periodic renewal; validity status is updated regularly.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#BA90C6] text-[#2A1B3D] font-bold">
                        <th className="pb-2">Registration Type</th>
                        <th className="pb-2">ID / Reference Number</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#BA90C6]/40 text-[#E8A0BF] font-mono">
                      <tr>
                        <td className="py-2.5 font-sans font-bold text-[#BA90C6]">Societies Registration Act 1860</td>
                        <td className="py-2.5">No. 154/2001-2002-J-14248 (Dated 20.06.2001)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-sans font-bold text-[#BA90C6]">Income Tax 12AA Registration</td>
                        <td className="py-2.5">AAATP7242DE20125</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-sans font-bold text-[#BA90C6]">80G Tax Exemption Registration</td>
                        <td className="py-2.5">AAATP7242DF20131</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-sans font-bold text-[#BA90C6]">FCRA Registration No.</td>
                        <td className="py-2.5">136520030 (Dated 25.06.2008)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-sans font-bold text-[#BA90C6]">NITI Aayog NGO Darpan ID</td>
                        <td className="py-2.5">UP/2009/0016290</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-sans font-bold text-[#BA90C6]">MSME (Udyam) Registration</td>
                        <td className="py-2.5">UP39D0007359</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-sans font-bold text-[#BA90C6]">CSR-1 Registration</td>
                        <td className="py-2.5">CSR00006889</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Leadership Team Spider Web Requirement 11 */}
            <FadeContent blur duration={900} threshold={0.15} initialOpacity={0}>
              <section className="space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="inline-flex items-center justify-center bg-[#FDF4F5]/90 backdrop-blur-xl px-8 py-3 rounded-2xl border border-[#BA90C6] shadow-xl">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[#8E5B9A]">Leadership Team</h3>
                  </div>
                </div>
                <LeadershipSpider />
              </section>
            </FadeContent>

            {/* ─── Focus Areas ─── (Requirement 5: No images) */}
            <FadeContent blur duration={900} threshold={0.15} initialOpacity={0}>
              <section id="focus-areas" className="space-y-4">
                <div className="flex justify-center">
                  <div className="inline-flex items-center justify-center bg-[#FDF4F5]/90 backdrop-blur-xl px-8 py-3 rounded-2xl border border-[#BA90C6] shadow-xl">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[#8E5B9A]">Our Focus Areas</h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 1, title: "Sustainable Agriculture", icon: "agriculture", desc: "Empowering farmers through climate-smart practices, organic cultivation, and strengthening local farm institutions.", subs: ["Farmer Interest Group (FIG) Development", "Climate Smart Agriculture", "Organic Farming", "Natural Farming", "Farmer Producer Organizations (FPOs)", "Digital Farmer Advisory"] },
                    { id: 2, title: "Livelihood Promotion", icon: "work", desc: "Facilitating self-reliance through skill training, micro-enterprises, and market linkage programs.", subs: ["Skill Development", "Entrepreneurship", "Women Self Help Groups (SHGs)", "Youth Employment", "Beekeeping Initiatives", "Market Linkages"] },
                    { id: 3, title: "Health & Nutrition", icon: "medical_services", desc: "Promoting community health through targeted intervention programs, health camps, and maternal care.", subs: ["HIV/AIDS Prevention & Care", "Targeted Intervention Program", "Opioid Substitution Therapy (OST)", "Maternal & Child Health", "Nutrition Programs"] },
                    { id: 4, title: "Quality Education", icon: "school", desc: "Providing access to supportive and non-formal education for street children and underprivileged youth.", subs: ["School Support Programs", "Digital Learning Centres", "Street Children Education", "School on Wheels", "Scholarship Support"] },
                    { id: 5, title: "Women Empowerment", icon: "diversity_3", desc: "Fostering leadership, financial literacy, and social equality among rural and semi-urban women.", subs: ["Leadership Development", "Financial Literacy", "Gender Equality Initiatives", "SHG Capacity Building", "Enterprise Development"] },
                    { id: 6, title: "Water, Sanitation & Environment", icon: "eco", desc: "Conserving resources and implementing clean water and waste management initiatives.", subs: ["Water Conservation", "Rainwater Harvesting", "Jal Tara Initiative", "Tree Plantation & Afforestation", "Climate Adaptation", "WASH Programs"] }
                  ].map((area) => (
                    <ProgramCard
                      key={area.id}
                      title={area.title}
                      subtitle={area.desc}
                      highlight="Active"
                      tag={`0${area.id}`}
                      icon={area.icon}
                      subs={area.subs}
                    />
                  ))}
                </div>
              </section>
            </FadeContent>

            {/* ─── Flagship Programmes ─── (Requirement 9: Swiper Carousel) */}
            <FadeContent blur duration={900} threshold={0.15} initialOpacity={0}>
              <section className="space-y-8">
                <div className="space-y-2 text-center">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center justify-center bg-[#FDF4F5]/90 backdrop-blur-xl px-8 py-3 rounded-2xl border border-[#BA90C6] shadow-xl">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-[#8E5B9A]">Flagship Programmes</h3>
                    </div>
                  </div>
                  <p className="text-sm text-[#2A1B3D]/80 font-semibold">Active development pipelines and core community engagements currently operational.</p>
                </div>
                <FlagshipCarousel />
              </section>
            </FadeContent>

            {/* ─── Project History ─── */}
            <FadeContent blur duration={900} threshold={0.15} initialOpacity={0}>
              <section className="space-y-6">
                <div className="flex justify-center">
                  <div className="inline-flex items-center justify-center bg-[#FDF4F5]/90 backdrop-blur-xl px-8 py-3 rounded-2xl border border-[#BA90C6] shadow-xl">
                    <h3 className="text-3xl md:text-4xl font-extrabold text-[#8E5B9A]">Project Track Record</h3>
                  </div>
                </div>
                <div className="w-full rounded-3xl border border-[#BA90C6] shadow-2xl bg-[#FDF4F5]/80 backdrop-blur-xl">
                  <AnimatedList
                    items={[
                      { p: "Swaran Jayanti Gram Swarojgar Yojana", f: "Ministry of Rural Development, GOI", a: "SHG formation & livelihood linkage", t: "From 2008" },
                      { p: "NREGS", f: "Min. of Rural Dev / MP Govt.", a: "Social audits with Gram Panchayats", t: "2007-09" },
                      { p: "NEAC", f: "Min. of Environment & Forests", a: "Environment awareness activities", t: "2003-04" },
                      { p: "ATMA Project", f: "Dept. of Agri Extension / ATMA", a: "Advanced agri-technology via FIGs", t: "From 2008" },
                      { p: "SHG Formation", f: "NABARD", a: "100 SHGs formed, capacity building", t: "2009 (3yr)" },
                      { p: "Community Water & Sanitation", f: "Kitchen Table Charitable Trust, UK", a: "Safe drinking water & sanitation", t: "From 2009" },
                      { p: "Bundelkhand ATMA", f: "Dept. of Agri Extension, GOI", a: "Farmer/horticulture training", t: "From 2010" },
                      { p: "100-Day Campaign under NREGS", f: "UP Govt. & NR International", a: "Employment linkage for 10 lakh+ villagers", t: "From 2010" },
                      { p: "Street Children Education", f: "SANKALPA, USA", a: "Non-formal education", t: "From 2011" },
                      { p: "Total Sanitation Project", f: "Government of India", a: "Individual twin-pit latrines", t: "2008-12" },
                      { p: "CIG Vegetable Training", f: "MPDPIP, Govt. of MP", a: "Vegetable production & nursery", t: "From 2012" },
                      { p: "TI Programme, Datia", f: "MPSACS, Bhopal", a: "Support for 350 FSW & 150 MSM", t: "From 2013" },
                      { p: "TI Programme, Sheopur", f: "MPSACS, Bhopal", a: "Support for 400 FSW", t: "From 2013" },
                      { p: "FPO Support", f: "NABARD (Lucknow RO)", a: "Supported 1,000+ farmers", t: "From 2015" },
                      { p: "Childline Centre", f: "Childline India Foundation", a: "Child protection services, Jhansi", t: "From 2016" },
                      { p: "Water Supply Support", f: "DPMU Allahabad", a: "15 villages", t: "From 2017" },
                      { p: "Railway Childline", f: "Childline India Foundation", a: "Child protection, Jhansi", t: "From 2018" },
                      { p: "Sakhi Project", f: "BHEL (CSR)", a: "Women's safety project, Jhansi", t: "2018" },
                      { p: "LPG Panchayat", f: "Bharat Gas / Indian Gas / HP Gas", a: "Clean fuel awareness", t: "2018" },
                      { p: "WASH Programme", f: "Just a Drop, UK", a: "Village Amarpur, Chhatarpur", t: "From 2018" },
                      { p: "Jal Jeevan Mission", f: "SWSM, Lucknow", a: "District Jhansi", t: "From 2021" },
                      { p: "Jal Jeevan Mission", f: "SWSM, Lucknow", a: "District Sultanpur", t: "From 2024" },
                      { p: "Education & Tuition Support", f: "Individual/org donors", a: "District Jhansi", t: "From 2023" },
                      { p: "Skill Dev & Placement", f: "Pragati Path & VEMOSA", a: "District Jhansi", t: "From 2023" },
                      { p: "Shree Anna (Millets) Revival", f: "RKVY / Govt. of MP + JNKVV", a: "Millet processing capacity building", t: "2025-26" }
                    ]}
                    onItemSelect={(item, index) => console.log(item, index)}
                    showGradients
                    enableArrowNavigation
                    displayScrollbar
                  />
                </div>
              </section>
            </FadeContent>

            {/* ─── Partners Network ─── (Requirement 6 & 8: StickyCard002) */}
            <FadeContent blur duration={900} threshold={0.15} initialOpacity={0}>
              <section className="space-y-6">
                <div className="space-y-2 text-center">
                  <div className="flex justify-center">
                    <div className="inline-flex items-center justify-center bg-[#FDF4F5]/90 backdrop-blur-xl px-8 py-3 rounded-2xl border border-[#BA90C6] shadow-xl">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-[#8E5B9A]">Partners in Progress</h3>
                    </div>
                  </div>

                </div>
                <PartnersCards />
              </section>
            </FadeContent>

          </div>
        </div>
      </Layout>
    </>
  );
}
