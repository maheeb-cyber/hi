import { motion, Variants } from "framer-motion";
import { ArrowLeft, Palette } from "lucide-react";
import { Link } from "wouter";
import cyberHubPoster from "@assets/25408c66b3ca4fc8915959ef5e525011_1778655018934.png";
import slashHealthBrochure from "@assets/IMG-eb6cac53d1b6e118ec5c2d7f05734b5c-V_1778655018945.jpg";
import medicalGuide from "@assets/IMG-7eac76b2a34d9b3b929507892ec9e6b9-V_1778655018957.jpg";
import doctorMuFeatures from "@assets/IMG-3b48c5457e1c1de0f163ec28d3882c91-V_1778655018972.jpg";
import slashHealthLogo from "@assets/Blue_Modern_Medical_Logo_20260426_162011_0000_1778655019019.png";
import fcPalashJersey from "@assets/IMG_20260220_224413~2_1778655019041.png";
import protofoliathon from "@assets/IMG-9252b69196566f97634981d7f7cb44cd-V_1778655019054.jpg";
import moonLure from "@assets/Moon.lure(2)_1779557194978.png";
import maheebPresentation from "@assets/Yellow_and_White_Modern_Abstract_Creative_Project_Presentation_1779557217682.png";
import slashHealthLogoDark from "@assets/Blue_Modern_Medical_Logo-removebg-preview_1779557305916.png";
import slashLogo from "@assets/IMG-f784f2f230c5f92a58249a1d054379ac-V_1783016314442.jpg";
import palashLogo from "@assets/Vintage_and_Luxury_Tailor_Decorative_Ornamental_Logo_20260412__1780559467911.png";
import palashPrefectCert from "@assets/IMG-11b58d443747b47d940c9ecac600e8d7-V_1780559467937.jpg";
import droneIcon from "@assets/sdhj_20250830_175148_0000_1780559467952.png";
import eidCard from "@assets/IMG-8271abab70b6bd4192093ff5ce6cbb4a-V_1780559467973.jpg";
import guitarLogo from "@assets/Black_White_Simple_Classic_Acoustic_Guitar_Logo_20250627_13210_1780559467995.png";
import badmintonCert from "@assets/IMG-240a3dc5ac30f12c36ccd057a475bf57-V_1780559468019.jpg";
import palashBadmintonBadge from "@assets/IMG_20251111_214655_1780559468041.jpg";
import badmintonRunnerUpCert from "@assets/IMG-35912479dc6afa0f012955f8fd61f0ab-V_1780559468064.jpg";
import ferrariMockup from "@assets/0-02-03-bb730989540627b1b25d8568a4160e78b73b63d7a26cc6e499ba5d_1781107316355.jpg";
import slashAppUI from "@assets/0-02-03-189652ff7f9a8a5700bae7aaf5f0d4c0d1d8027d00f0234c15cfd2_1781107330997.jpg";
import diorMockup from "@assets/0-02-03-529cfba435811e9b39464d0de5b4b68845e72bcf926d0a16c4902f_1781107386066.jpg";

import maheebCar from "@assets/Maheeb_car_1781112647520.png";
import cyberHubTshirt from "@assets/viber_image_2026-05-17_08-05-09-711_1781112759397.jpg";
import eidAlAdhaCard from "@assets/viber_image_2026-05-28_15-09-29-010_1781112775786.jpg";
import { useState } from "react";
import { Play } from "lucide-react";

const designs = [
  {
    src: cyberHubPoster,
    title: "Cyber Hub ICT Club Poster",
    category: "Event Poster",
    description: "Club representative ID card & promotional poster for SCPSC Cyber Hub.",
  },
  {
    src: protofoliathon,
    title: "Protofoliathon 1.0",
    category: "Event Poster",
    description: "72-hour hackathon event banner for SCPSC Cyber Hub.",
  },
  {
    src: slashHealthBrochure,
    title: "Slash Health Care – Overview",
    category: "Brochure / Infographic",
    description: "AI-powered digital health assistant brochure (Bangla).",
  },
  {
    src: medicalGuide,
    title: "Disease Management Plan",
    category: "Infographic",
    description: "Illustrated medical guide for dengue, measles and child care (Bangla).",
  },
  {
    src: doctorMuFeatures,
    title: "Doctor MU – Features",
    category: "Infographic",
    description: "Feature breakdown of the Doctor MU digital health platform (Bangla).",
  },
  {
    src: slashHealthLogo,
    title: "Slash Health Care Logo",
    category: "Logo Design",
    description: "Modern medical logo with stethoscope and cross motif.",
  },
  {
    src: slashLogo,
    title: "Slash© Brand Logo",
    category: "Logo Design",
    description: "Gradient brand identity mark for Slash Web & Design.",
  },
  {
    src: fcPalashJersey,
    title: "FC Palash Jersey Design",
    category: "Apparel Design",
    description: "Custom football kit design featuring front and back views.",
  },
  {
    src: moonLure,
    title: "Moon Lure Logo",
    category: "Logo Design",
    description: "Elegant candle brand logo with crescent moon and botanical elements.",
  },
  {
    src: maheebPresentation,
    title: "Md. Maheeb Hossain – Title Slide",
    category: "Presentation Design",
    description: "Abstract dark presentation title card with fluid shapes.",
  },
  {
    src: slashHealthLogoDark,
    title: "Slash Health Care Logo – Dark",
    category: "Logo Design",
    description: "Dark-background variant of the Slash Health Care medical logo.",
  },
  {
    src: palashLogo,
    title: "Palash – Vintage Tailor Logo",
    category: "Logo Design",
    description: "Vintage & luxury ornamental logo design for Palash brand with gold detailing.",
  },
  {
    src: palashPrefectCert,
    title: "Palash Prefect Approval Certificate",
    category: "Certificate Design",
    description: "Official certificate design for SCPSC Palash section prefect approval.",
  },
  {
    src: droneIcon,
    title: "3D Printed Modern Drone – Icon",
    category: "Logo Design",
    description: "Minimalist black-and-white icon concept for a 3D printed modern drone — created by M.M.S.",
  },
  {
    src: eidCard,
    title: "Eid Mubarak Greeting Card",
    category: "Greeting Card",
    description: "Personal Eid Mubarak greeting card design by Maheeb Hossain with crescent moon motif.",
  },
  {
    src: guitarLogo,
    title: "TGM Acoustic Guitar Logo",
    category: "Logo Design",
    description: "Classic black-and-white acoustic guitar logo for Maheeb Hossain — TGM branding.",
  },
  {
    src: palashBadmintonBadge,
    title: "Palash Badminton Championship Badge",
    category: "Badge / Emblem",
    description: "Neon-styled badge emblem for the Palash Section Badminton Championship.",
  },
  {
    src: badmintonCert,
    title: "Badminton Championship 2025 – Certificate",
    category: "Certificate Design",
    description: "Certificate template for the Provincial High School Badminton Championship 2025.",
  },
  {
    src: badmintonRunnerUpCert,
    title: "Palash Badminton 2024 – Runner-Up Certificate",
    category: "Certificate Design",
    description: "Certificate of Achievement for Palash Badminton Championship 2024 Runner-Up.",
  },
  {
    src: ferrariMockup,
    title: "Ferrari × Md. Maheeb Hossain",
    category: "Brand Mockup",
    description: "Premium Ferrari supercar brand mockup featuring custom Md. Maheeb Hossain livery — Driven by Passion, Built to Inspire.",
  },
  {
    src: slashAppUI,
    title: "Slash – App UI Design",
    category: "UI / App Design",
    description: "Dark luxury e-commerce app UI concept for the Slash brand — Shop more, Pay smarter.",
  },
  {
    src: diorMockup,
    title: "Dior Sauvage × Md. Maheeb Hossain",
    category: "Brand Mockup",
    description: "Exclusive Dior Sauvage perfume packaging mockup exclusively designed for Md. Maheeb Hossain.",
  },
  {
    src: cyberHubTshirt,
    title: "SCPSC Cyber Hub – T-Shirt Design",
    category: "Apparel Design",
    description: "Official black jersey design for the SCPSC Cyber Hub Photography Department — front, back, and sleeve branding.",
  },
  {
    src: eidAlAdhaCard,
    title: "Eid al-Adha 2026 Greeting Card",
    category: "Greeting Card",
    description: "Happy Eid al-Adha 2026 greeting card design with mosque silhouette and desert landscape — From Maheeb.",
  },
  {
    src: maheebCar,
    title: "MAHEEB MMH – Supercar Design",
    category: "Brand Mockup",
    description: "Custom supercar concept design featuring bold MAHEEB MMH branding in signature amber and black.",
  },
];

const categories = ["All", ...Array.from(new Set(designs.map((d) => d.category)))];

export default function GraphicDesign() {
  const [selected, setSelected] = useState<null | typeof designs[0]>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90, damping: 14 } },
  };

  const filtered = activeCategory === "All" ? designs : designs.filter((d) => d.category === activeCategory);

  return (
    <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden font-sans">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neon-purple/20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" data-testid="link-back-home">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-neon-purple transition-colors font-mono text-sm" data-testid="button-back-portfolio">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </button>
          </Link>
          <div className="w-px h-5 bg-zinc-700" />
          <div className="text-xl font-display font-bold">
            <span className="text-neon-purple">MAHEEB</span>
            <span className="text-white">.DEV</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-28 pb-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8 space-y-3">
          <h1 className="text-3xl md:text-5xl font-display font-bold flex items-center gap-3" data-testid="heading-graphic-design">
            <Palette className="w-8 h-8 text-neon-purple" />
            My Design Work
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            A personal collection of posters, logos, infographics and branding — all crafted by me.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-4 py-1.5 rounded-full text-sm font-mono border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-neon-purple text-black border-neon-purple"
                  : "border-zinc-700 text-muted-foreground hover:border-neon-purple hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((design, i) => (
            <motion.div
              key={design.title}
              variants={itemVariants}
              className="group cursor-pointer rounded-xl overflow-hidden border border-zinc-800 hover:border-neon-purple transition-all duration-300 bg-zinc-950"
              onClick={() => setSelected(design)}
              data-testid={`card-design-${i}`}
            >
              <div className="relative overflow-hidden aspect-square bg-zinc-900">
                {(design as any).type === "video" ? (
                  <>
                    <video src={design.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted playsInline preload="metadata" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center group-hover:bg-neon-purple/80 group-hover:border-neon-purple transition-all duration-300">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img src={design.src} alt={design.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3 opacity-0 group-hover:opacity-100">
                  <span className="text-xs font-mono text-neon-purple bg-black/70 px-2 py-1 rounded">{design.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm leading-snug group-hover:text-neon-purple transition-colors">{design.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{design.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          data-testid="lightbox-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative max-w-3xl w-full bg-zinc-950 rounded-2xl overflow-hidden border border-neon-purple/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            {(selected as any).type === "video" ? (
              <video src={selected.src} className="w-full max-h-[70vh] bg-zinc-900" controls autoPlay loop data-testid="lightbox-video" />
            ) : (
              <img src={selected.src} alt={selected.title} className="w-full max-h-[70vh] object-contain bg-zinc-900" data-testid="lightbox-image" />
            )}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-neon-purple">{selected.category}</span>
                  <h2 className="text-xl font-bold mt-1" data-testid="lightbox-title">{selected.title}</h2>
                  <p className="text-muted-foreground text-sm mt-1">{selected.description}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white transition-colors text-2xl leading-none mt-1" data-testid="button-close-lightbox">✕</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <footer className="w-full py-8 border-t border-zinc-900 bg-black text-center text-sm text-muted-foreground font-mono">
        <p>© {new Date().getFullYear()} <span className="text-zinc-300">Md. Maheeb Hossain</span> · All designs are my own personal work.</p>
      </footer>
    </div>
  );
}
