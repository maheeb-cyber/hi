import { motion, Variants } from "framer-motion";
import { ArrowLeft, Palette } from "lucide-react";
import { Link } from "wouter";
import cyberHubPoster from "@assets/25408c66b3ca4fc8915959ef5e525011_1778655018934.png";
import slashHealthBrochure from "@assets/IMG-eb6cac53d1b6e118ec5c2d7f05734b5c-V_1778655018945.jpg";
import medicalGuide from "@assets/IMG-7eac76b2a34d9b3b929507892ec9e6b9-V_1778655018957.jpg";
import doctorMuFeatures from "@assets/IMG-3b48c5457e1c1de0f163ec28d3882c91-V_1778655018972.jpg";
import creativeDesigner from "@assets/IMG-a6c625a880fce041ec73ef28ed717937-V_1778655018985.jpg";
import portrait from "@assets/IMG-614d080ce9f5dfcaa7f6fe20cd3a26fb-V_1778655019002.jpg";
import slashHealthLogo from "@assets/Blue_Modern_Medical_Logo_20260426_162011_0000_1778655019019.png";
import slashLogo from "@assets/IMG-30eed32a03fb652c27596bf2cea89b08-V_1778655019031.jpg";
import fcPalashJersey from "@assets/IMG_20260220_224413~2_1778655019041.png";
import protofoliathon from "@assets/IMG-9252b69196566f97634981d7f7cb44cd-V_1778655019054.jpg";
import { useState } from "react";

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
    description: "Gradient brand identity mark for Slash© platform.",
  },
  {
    src: fcPalashJersey,
    title: "FC Palash Jersey Design",
    category: "Apparel Design",
    description: "Custom football kit design featuring front and back views.",
  },
  {
    src: creativeDesigner,
    title: "Creative Designer – Portrait",
    category: "Photo Design",
    description: "Styled portrait design for creative professional Abrar Sikder Tahir.",
  },
  {
    src: portrait,
    title: "Professional Portrait",
    category: "Photo Design",
    description: "Clean professional portrait composition.",
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
            <button
              className="flex items-center gap-2 text-muted-foreground hover:text-neon-purple transition-colors font-mono text-sm"
              data-testid="button-back-portfolio"
            >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 space-y-4"
        >
          <h1
            className="text-4xl md:text-6xl font-display font-bold flex items-center gap-4"
            data-testid="heading-graphic-design"
          >
            <Palette className="w-10 h-10 text-neon-purple" />
            Graphic Design Work
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A collection of posters, logos, infographics and branding projects — crafted with creativity and purpose.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          {filtered.map((design, i) => (
            <motion.div
              key={design.title}
              variants={itemVariants}
              className="group cursor-pointer rounded-xl overflow-hidden border border-zinc-800 hover:border-neon-purple transition-all duration-300 bg-zinc-950"
              onClick={() => setSelected(design)}
              data-testid={`card-design-${i}`}
            >
              <div className="relative overflow-hidden aspect-square bg-zinc-900">
                <img
                  src={design.src}
                  alt={design.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <span className="text-xs font-mono text-neon-purple bg-black/70 px-2 py-1 rounded">
                    {design.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm leading-snug group-hover:text-neon-purple transition-colors">
                  {design.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{design.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Lightbox */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          data-testid="lightbox-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative max-w-3xl w-full bg-zinc-950 rounded-2xl overflow-hidden border border-neon-purple/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={selected.title}
              className="w-full max-h-[70vh] object-contain bg-zinc-900"
              data-testid="lightbox-image"
            />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-neon-purple">{selected.category}</span>
                  <h2 className="text-xl font-bold mt-1" data-testid="lightbox-title">{selected.title}</h2>
                  <p className="text-muted-foreground text-sm mt-2">{selected.description}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-zinc-500 hover:text-white transition-colors text-2xl leading-none mt-1"
                  data-testid="button-close-lightbox"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <footer className="w-full py-8 border-t border-zinc-900 bg-black text-center text-sm text-muted-foreground font-mono">
        <p>© {new Date().getFullYear()} Maheeb. Built with ❤️ and Code.</p>
      </footer>
    </div>
  );
}
