import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "../components/Layout";
import MasonryGrid from "../components/gallery/MasonryGrid";
import WaveBackground from "../components/gallery/WaveBackground";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery - Pragati Path" },
      { name: "description", content: "Field work, community trainings, and programs across Bundelkhand." },
      { property: "og:title", content: "Gallery - Pragati Path" },
      { property: "og:description", content: "Field work, community trainings, and programs across Bundelkhand." },
    ],
  }),
  component: Gallery,
  errorComponent: ({ error }) => {
    console.error("Gallery Route Error:", error);
    return (
      <Layout>
        <div className="py-32 text-center max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-[#BA90C6]">Our Gallery</h2>
          <p className="mt-4 text-[#2A1B3D] font-medium">Glimpses of our field work and community programs across Bundelkhand.</p>
        </div>
      </Layout>
    );
  },
});

const P = "/photos/";
// 30 Completely Unique Images (No Duplicates)
const uniqueImages = [
  { src: `${P}16-02-2023-1024x576.jpg`, alt: "Field Program & Community Engagement" },
  { src: `${P}20211111_130411-1-1024x576.jpg`, alt: "Community Training Session" },
  { src: `${P}20211201_143338-1024x576.jpg`, alt: "Agricultural Demonstration" },
  { src: `${P}20220327_114025-1-1024x576.jpg`, alt: "Field Work & Inspection" },
  { src: `${P}20220330_121946-1-1024x576.jpg`, alt: "Field Engagement & Dialogue" },
  { src: `${P}20230203_151034-1-1024x576.jpg`, alt: "Agriculture Skill Workshop" },
  { src: `${P}20230217_111740-1024x576.jpg`, alt: "Education & Literacy Program" },
  { src: `${P}20230217_121338-1-1024x576.jpg`, alt: "Youth & Farmer Support" },
  { src: `${P}20230321_121707-1024x576.jpg`, alt: "Livelihood & Skills Development" },
  { src: `${P}20230914_171728-1024x576.jpg`, alt: "Water Security & Jal Jeevan Mission" },
  { src: `${P}42-1-1024x576.jpg`, alt: "Community Livelihood Project" },
  { src: `${P}DSCI0319.jpg`, alt: "Bundelkhand Rural Landscape" },
  { src: `${P}DSCI0469.jpg`, alt: "Field Operations & Survey" },
  { src: `${P}PICT1279.jpg`, alt: "Local Community Interaction" },
  { src: `${P}WhatsApp Image 2026-07-16 at 00.15.39 (1).jpeg`, alt: "Millets Revival Workshop" },
  { src: `${P}WhatsApp Image 2026-07-16 at 00.15.39.jpeg`, alt: "Exposure Visit Delegation" },
  { src: `${P}WhatsApp Image 2026-07-16 at 00.15.40 (1).jpeg`, alt: "Farmer Training Assembly" },
  { src: `${P}WhatsApp Image 2026-07-16 at 00.15.40.jpeg`, alt: "JNKVV Facilitation Visit" },
  { src: `${P}WhatsApp Image 2026-07-16 at 00.15.41 (1).jpeg`, alt: "Agriculture Officer Briefing" },
  { src: `${P}WhatsApp Image 2026-07-16 at 00.15.41.jpeg`, alt: "Medicinal Plants Board Tour" },
  { src: `${P}WhatsApp-Image-2021-07-24-at-16.20.47-1024x576.jpeg`, alt: "Self Help Group Assembly" },
  { src: `${P}WhatsApp-Image-2021-07-26-at-11.39.13-1024x576.jpeg`, alt: "Women Empowerment Drive" },
  { src: `${P}WhatsApp-Image-2021-11-08-at-15.23.07-1-1024x576.jpeg`, alt: "Community Health Campaign" },
  { src: `${P}WhatsApp-Image-2021-12-02-at-15.57.51-1-1024x576.jpeg`, alt: "Water Conservation Workshop" },
  { src: `${P}WhatsApp-Image-2022-03-13-at-06.51.00-1-1024x576.jpeg`, alt: "Panchayat Level Dialogues" },
  { src: `${P}WhatsApp-Image-2022-08-12-at-11.17.57-AM-1024x576.jpeg`, alt: "Rural Outreach Program" },
  { src: `${P}WhatsApp-Image-2022-08-12-at-4.38.57-PM-1-1024x576.jpeg`, alt: "Village Community Gathering" },
  { src: `${P}WhatsApp-Image-2023-03-17-at-16.51.17-1-1024x576.jpg`, alt: "Skill Development Initiative" },
  { src: `${P}WhatsApp-Image-2023-03-17-at-18.00.32-1024x576.jpg`, alt: "Public Engagement Drive" },
  { src: `${P}ban-1.jpg`, alt: "Pragati Path Programme Banner" },
];

const items = uniqueImages.map((img, idx) => ({
  id: idx,
  imageUrl: img.src,
  title: img.alt,
}));

function Gallery() {
  return (
    <>
      {/* Full Screen Fixed Wave Canvas Background */}
      <div aria-hidden className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none">
        <WaveBackground
          backdropBlurAmount="sm"
          className="w-full h-full"
          colors={["#E8A0BF", "#BA90C6", "#C0DBEA", "#FDF4F5"]}
        />
      </div>

      <Layout>
        <div className="relative min-h-screen py-16">
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center space-y-4 mb-16 bg-[#FDF4F5]/85 backdrop-blur-xl p-8 rounded-3xl border border-[#BA90C6] shadow-2xl max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#BA90C6]">Our Gallery</h1>
              <p className="text-[#5C326F] font-bold max-w-2xl mx-auto">
                Glimpses of our field work, community trainings, and programs across Bundelkhand.
              </p>
            </div>
            <div className="bg-[#FDF4F5]/70 backdrop-blur-md p-6 rounded-3xl border border-[#BA90C6]/40 shadow-xl">
              <MasonryGrid items={items} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
