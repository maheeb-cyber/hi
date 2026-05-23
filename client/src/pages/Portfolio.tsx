import { motion, Variants, useScroll, useSpring } from "framer-motion";
import {
  Github,
  Mail,
  ExternalLink,
  FileText,
  Palette,
  Trophy,
  Star,
  Shield,
  ArrowDown,
  MapPin,
  User,
  Code2,
  Zap,
  ChevronRight,
  Cpu,
  Award,
  BookOpen,
  Terminal,
} from "lucide-react";
import avatarImage from "@assets/IMG_20251209_232112_1765434316677.jpg";
import aiArtPdf from "@assets/Ai_Art__1765437570484.pdf";
import { useState } from "react";
import { Link } from "wouter";

/* ── helpers ── */
const fadeUp: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 70, damping: 16 } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

/* Animates each character of a string */
function AnimatedChars({ text, className }: { text: string; className?: string }) {
  const charVariants: Variants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
  };
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035 } } }}
      initial="hidden"
      animate="visible"
      style={{ perspective: 600 }}
    >
      {text.split("").map((ch, i) => (
        <motion.span key={i} variants={charVariants} className="inline-block" style={{ whiteSpace: "pre" }}>
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* Animates each word with a slide-up fade */
function AnimatedWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 16 } },
  };
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* Section heading with animated label */
function SectionHeading({ icon, label, number }: { icon: React.ReactNode; label: string; number: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-xs font-mono text-neon-purple/40 select-none"
      >
        {number}
      </motion.span>
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neon-purple/10 border border-neon-purple/20 text-neon-purple">
          {icon}
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold">
          <AnimatedWords text={label} className="bg-gradient-to-r from-white via-white to-neon-purple bg-clip-text text-transparent" />
        </h2>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ originX: 0 }}
        className="flex-1 h-px bg-gradient-to-r from-neon-purple/30 to-transparent"
      />
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "projects", label: "Projects" },
    { id: "eca", label: "ECA" },
    { id: "awards", label: "Awards" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "About" },
  ];

  const projects = [
    { num: "01", title: "Data Viz Dashboard", desc: "Interactive visualization of school data using Python and Pandas.", tags: ["Python", "Pandas"], color: "from-blue-500/10 to-cyan-500/5", border: "hover:border-blue-500/40" },
    { num: "02", title: "School Club Portal", desc: "A landing page for Cyber Hub ICT club with member registration.", tags: ["HTML/CSS", "JavaScript", "React"], color: "from-neon-purple/10 to-pink-500/5", border: "hover:border-neon-purple/40" },
    { num: "03", title: "Auto-Reply Bot", desc: "Simple automation script for handling email queries.", tags: ["Python", "Automation"], color: "from-emerald-500/10 to-teal-500/5", border: "hover:border-emerald-500/40" },
    { num: "04", title: "Graphic Design Portfolio", desc: "Collection of designs including 'Making Artwork with AI' presentation.", tags: ["Photoshop", "Illustrator", "AI Art"], color: "from-orange-500/10 to-yellow-500/5", border: "hover:border-orange-500/40", link: aiArtPdf, linkText: "View Presentation (PDF)" },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden font-sans selection:bg-neon-purple/40">

      {/* Scroll progress bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-purple via-pink-500 to-blue-500 origin-left z-[60]" />

      {/* ── NAV ── */}
      <nav className="fixed top-[2px] left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-5 py-4 flex justify-between items-center">
          <motion.button
            onClick={() => scrollToSection("home")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-base md:text-lg tracking-tight leading-none group"
          >
            <span className="bg-gradient-to-r from-neon-purple to-pink-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
              Md. Maheeb Hossain
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 text-sm font-mono rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-neon-purple bg-neon-purple/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-purple" />
                )}
              </button>
            ))}
          </motion.div>

          <button className="md:hidden flex flex-col gap-1.5 p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-white/5 bg-black/90 backdrop-blur-xl px-5 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left px-4 py-2.5 rounded-lg text-sm font-mono text-zinc-300 hover:text-white hover:bg-white/5 transition-all">
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      <main className="w-full max-w-4xl mx-auto px-4 pt-20 pb-12 flex flex-col gap-24">

        {/* ── HERO ── */}
        <section id="home" className="relative min-h-[92vh] flex flex-col items-center justify-center text-center gap-8 overflow-hidden">
          {/* Background orbs */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-72 h-72 bg-neon-purple/20 rounded-full blur-[80px]" />
            <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
            <motion.div animate={{ x: [0, 20, 0], y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500/10 rounded-full blur-[60px]" />
          </div>

          <div className="flex flex-col items-center gap-7">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.1 }}
              className="relative group cursor-pointer"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-neon-purple via-pink-500 to-blue-500 opacity-60 blur-sm" />
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-neon-purple to-blue-500 opacity-80" />
              <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-black">
                <img src={avatarImage} alt="Maheeb" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 rounded-full border-2 border-black shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </motion.div>

            {/* Status badge */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.4 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
              Open to opportunities
            </motion.div>

            {/* Name */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-none">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent"
                >
                  Hi! I'm{" "}
                </motion.span>
                <AnimatedChars text="Maheeb" className="bg-gradient-to-r from-neon-purple via-pink-400 to-blue-400 bg-clip-text text-transparent" />
                {" "}
                <motion.span
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
                  className="inline-block animate-wave"
                >
                  👋
                </motion.span>
              </h1>

              {/* Full name subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="text-zinc-500 text-sm font-mono tracking-widest uppercase"
              >
                Md. Maheeb Hossain
              </motion.p>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-zinc-400 text-lg md:text-xl font-light max-w-md mx-auto leading-relaxed"
            >
              Student · Tech Enthusiast · Club Representative at{" "}
              <a href="https://www.scpscch.tech/" target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:text-white transition-colors">
                Cyber Hub
              </a>
            </motion.p>

            {/* Skill badges */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 1.3 } } }}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-2.5"
            >
              {[
                { label: "Data Science", icon: <Zap className="w-3 h-3" />, link: null },
                { label: "Graphic Designer", icon: <Palette className="w-3 h-3" />, link: "/graphic-design" },
                { label: "Video Editor", icon: <Code2 className="w-3 h-3" />, link: null },
                { label: "Cybersecurity", icon: <Shield className="w-3 h-3" />, link: null },
                { label: "Robotics", icon: <Cpu className="w-3 h-3" />, link: null },
              ].map((skill) => {
                const pill = (
                  <motion.span
                    variants={{ hidden: { opacity: 0, scale: 0.7, y: 10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } } }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-mono transition-all duration-300 cursor-pointer ${
                      skill.link
                        ? "border-neon-purple/40 bg-neon-purple/5 text-zinc-200 hover:bg-neon-purple/15 hover:border-neon-purple hover:text-white"
                        : "border-white/10 bg-white/5 text-zinc-400 hover:border-neon-purple/40 hover:text-zinc-200"
                    }`}
                  >
                    <span className="text-neon-purple">{skill.icon}</span>
                    {skill.label}
                  </motion.span>
                );
                return skill.link ? (
                  <Link key={skill.label} href={skill.link}>{pill}</Link>
                ) : (
                  <span key={skill.label}>{pill}</span>
                );
              })}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 1.7 } } }}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-3"
            >
              <motion.button
                variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                onClick={() => scrollToSection("projects")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-purple text-black font-semibold text-sm shadow-[0_0_24px_rgba(168,85,247,0.45)] hover:shadow-[0_0_36px_rgba(168,85,247,0.65)] transition-shadow"
              >
                View Projects <ChevronRight className="w-4 h-4" />
              </motion.button>
              <motion.a
                variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                href="mailto:maheebhossain900@gmail.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-zinc-300 font-semibold text-sm hover:border-neon-purple/50 hover:text-white hover:bg-white/5 transition-all"
              >
                <Mail className="w-4 h-4" /> Contact Me
              </motion.a>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="absolute bottom-10 flex flex-col items-center gap-2 text-zinc-600">
            <span className="text-xs font-mono tracking-widest">SCROLL</span>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionHeading icon={<Cpu className="w-5 h-5" />} label="Projects" number="01" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((p, idx) => (
                <motion.div
                  key={p.num}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={`group relative rounded-2xl border border-white/8 bg-gradient-to-br ${p.color} ${p.border} hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-400 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                  <div className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-start justify-between">
                      <span className="text-3xl font-display font-extrabold text-white/8 group-hover:text-white/15 transition-colors select-none">{p.num}</span>
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-neon-purple/30 transition-colors">
                        <Code2 className="w-4 h-4 text-zinc-500 group-hover:text-neon-purple transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-display font-bold text-white group-hover:text-neon-purple transition-colors">
                        <AnimatedWords text={p.title} delay={idx * 0.05} />
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono">{t}</span>
                      ))}
                    </div>
                    {p.link && (
                      <motion.a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 mt-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-300 hover:border-neon-purple/40 hover:text-neon-purple hover:bg-neon-purple/5 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" /> {p.linkText}
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── ECA ── */}
        <section id="eca" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionHeading icon={<Award className="w-5 h-5" />} label="Extracurricular" number="02" />
            </motion.div>
            <div className="relative pl-6 border-l border-neon-purple/20 space-y-8">
              {[
                { role: "Club Representative", org: "Cyber Hub (ICT Club)", year: "2025 – Present", desc: "Leading workshops and organizing tech events for students.", link: "https://www.scpscch.tech/", active: true },
                { role: "Participant", org: "National Math Olympiad", year: "2023", desc: "Regional finalist in junior category.", active: false },
              ].map((eca, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative group"
                >
                  <div className={`absolute -left-[30px] top-4 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${eca.active ? "bg-neon-purple border-neon-purple shadow-[0_0_10px_rgba(168,85,247,0.8)]" : "bg-zinc-800 border-zinc-600 group-hover:border-neon-purple/50"}`} />
                  <motion.div
                    whileHover={{ x: 4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                    className="bg-zinc-950/60 border border-white/6 rounded-2xl p-5 group-hover:border-neon-purple/20 transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-display font-bold text-white">
                        <AnimatedWords text={eca.role} delay={i * 0.1} />
                      </h3>
                      <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${eca.active ? "bg-neon-purple/10 text-neon-purple border-neon-purple/20" : "bg-white/5 text-zinc-500 border-white/10"}`}>
                        {eca.year}
                      </span>
                    </div>
                    {eca.link ? (
                      <a href={eca.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-neon-purple transition-colors mb-2 font-medium">
                        {eca.org} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <p className="text-sm text-zinc-400 mb-2 font-medium">{eca.org}</p>
                    )}
                    <p className="text-sm text-zinc-500 leading-relaxed">{eca.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── AWARDS ── */}
        <section id="awards" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionHeading icon={<Trophy className="w-5 h-5" />} label="Awards" number="03" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Award 1 — Gold */}
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 260, damping: 18 } }}
                className="relative group rounded-2xl overflow-hidden border border-yellow-500/20 bg-gradient-to-br from-yellow-950/30 via-zinc-950 to-zinc-950 hover:border-yellow-400/50 hover:shadow-[0_0_40px_rgba(234,179,8,0.18)] transition-all duration-500"
              >
                <div className="absolute -top-8 -left-8 w-40 h-40 bg-yellow-500/8 rounded-full blur-3xl group-hover:bg-yellow-400/15 transition-all duration-500" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
                <div className="relative p-7 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <motion.div whileHover={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 0.5 }} className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/20 transition-all">
                      <Trophy className="w-7 h-7 text-yellow-400" />
                    </motion.div>
                    <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 tracking-widest uppercase font-bold">🥇 1st Place</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white group-hover:text-yellow-300 transition-colors mb-1">
                      <AnimatedWords text="SCPSC IT Intra Fest" delay={0.1} />
                    </h3>
                    <p className="text-yellow-500/70 font-mono text-sm tracking-wide">Programming Contest — Winner</p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-yellow-500/20 to-transparent" />
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Secured <span className="text-yellow-300 font-semibold">1st place</span> in the intra-school IT fest programming competition at SCPSC.
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, type: "spring" }}>
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Award 2 — Purple */}
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 260, damping: 18 } }}
                className="relative group rounded-2xl overflow-hidden border border-neon-purple/20 bg-gradient-to-br from-purple-950/30 via-zinc-950 to-zinc-950 hover:border-neon-purple/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.18)] transition-all duration-500"
              >
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-neon-purple/8 rounded-full blur-3xl group-hover:bg-neon-purple/15 transition-all duration-500" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent" />
                <div className="relative p-7 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center group-hover:bg-neon-purple/20 transition-all">
                      <Shield className="w-7 h-7 text-neon-purple" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20 tracking-widest uppercase font-bold">2025 – 2026</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white group-hover:text-neon-purple transition-colors mb-1">
                      <AnimatedWords text="Club Representative" delay={0.1} />
                    </h3>
                    <a href="https://www.scpscch.tech/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-neon-purple/60 font-mono text-sm hover:text-neon-purple transition-colors">
                      Cyber Hub — ICT Club · SCPSC <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="h-px bg-gradient-to-r from-neon-purple/20 to-transparent" />
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Elected as <span className="text-neon-purple font-semibold">Club Representative</span> for Cyber Hub ICT Club, leading workshops and tech events for 2025–2026.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Leadership", "Tech Events", "Workshops"].map((t, i) => (
                      <motion.span key={t} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-xs font-mono px-2.5 py-1 rounded-full bg-neon-purple/8 text-neon-purple/70 border border-neon-purple/15">
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── BLOG ── */}
        <section id="blog" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionHeading icon={<BookOpen className="w-5 h-5" />} label="Blog" number="04" />
            </motion.div>
            <div className="flex flex-col gap-3">
              {[
                { title: "Starting My Journey in Data Science", date: "Dec 10, 2025", read: "4 min", tag: "Data Science", excerpt: "Why I chose Python as my first language and how I'm learning data visualization." },
                { title: "Cyber Security Basics for Students", date: "Nov 25, 2025", read: "3 min", tag: "Cybersecurity", excerpt: "Simple steps every student should take to stay safe online." },
                { title: "Designing for Impact", date: "Oct 15, 2025", read: "5 min", tag: "Design", excerpt: "How I use graphic design principles in my school presentations." },
              ].map((post, i) => (
                <motion.a
                  key={i}
                  href="#"
                  variants={fadeUp}
                  whileHover={{ x: 6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="group block"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-white/6 bg-zinc-950/40 hover:border-neon-purple/25 hover:bg-zinc-900/60 transition-all duration-300">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/15">{post.tag}</span>
                        <span className="text-xs text-zinc-600 font-mono">{post.date} · {post.read} read</span>
                      </div>
                      <h3 className="font-display font-bold text-zinc-200 group-hover:text-white transition-colors">
                        <AnimatedWords text={post.title} delay={i * 0.05} />
                      </h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{post.excerpt}</p>
                    </div>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-600 group-hover:border-neon-purple/40 group-hover:text-neon-purple group-hover:bg-neon-purple/5 transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="scroll-mt-24 mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionHeading icon={<Terminal className="w-5 h-5" />} label="About Me" number="05" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

              {/* Bio */}
              <motion.div variants={fadeUp} className="md:col-span-3 relative rounded-2xl border border-white/8 bg-gradient-to-br from-neon-purple/5 to-transparent p-7 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-neon-purple/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative space-y-4 text-zinc-300 text-base leading-relaxed">
                  <p>
                    I'm <span className="text-white font-semibold">Maheeb</span> (Md. Maheeb Hossain), a passionate tech enthusiast from Bangladesh. Club Representative of{" "}
                    <a href="https://www.scpscch.tech/" target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:text-white transition-colors inline-flex items-center gap-1 font-medium">
                      Cyber Hub <ExternalLink className="w-3.5 h-3.5" />
                    </a>{" "}
                    ICT club — leading initiatives to foster tech curiosity among peers.
                  </p>
                  <p>
                    My journey explores <span className="text-white font-medium">Cybersecurity</span>, <span className="text-white font-medium">Robotics</span>, <span className="text-white font-medium">Data Science</span>, and <span className="text-white font-medium">Creative Design</span>.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <motion.a href="https://github.com/maheeb-cyber" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors">
                      <Github className="w-5 h-5" /> GitHub
                    </motion.a>
                    <motion.a href="mailto:maheebhossain900@gmail.com" whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors">
                      <Mail className="w-5 h-5" /> Email
                    </motion.a>
                    <motion.a href="https://discord.gg/3eukqzF2r" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05, y: -2 }} className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
                      Discord
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={stagger} className="md:col-span-2 flex flex-col gap-4">
                {[
                  { icon: <MapPin className="w-4 h-4" />, label: "Location", value: "Bangladesh 🇧🇩" },
                  { icon: <User className="w-4 h-4" />, label: "Role", value: "Student & Tech Enthusiast" },
                  { icon: <Trophy className="w-4 h-4" />, label: "Award", value: "IT Intra Fest Winner" },
                  { icon: <Shield className="w-4 h-4" />, label: "Club", value: "Cyber Hub Rep 2025–26" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                    className="flex items-center gap-3.5 p-4 rounded-xl border border-white/6 bg-zinc-950/50 hover:border-neon-purple/20 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/15 flex items-center justify-center text-neon-purple shrink-0 group-hover:bg-neon-purple/20 transition-all">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-xs text-zinc-600 font-mono uppercase tracking-wider">{stat.label}</p>
                      <p className="text-sm text-zinc-200 font-medium mt-0.5">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-white/5 bg-zinc-950/50 py-8 text-center"
      >
        <p className="text-xs text-zinc-600 font-mono">
          © {new Date().getFullYear()} <span className="text-zinc-400">Md. Maheeb Hossain</span> · Built with React &amp; TypeScript
        </p>
      </motion.footer>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-12deg); }
          75% { transform: rotate(12deg); }
        }
        .animate-wave { animation: wave 1.5s infinite; display: inline-block; }
      `}</style>
    </div>
  );
}
