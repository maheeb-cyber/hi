import { motion, Variants, useScroll, useSpring } from "framer-motion";
import {
  Github, Mail, ExternalLink, FileText, Palette, Trophy,
  Star, Shield, ArrowDown, MapPin, User, Code2, Zap, Film,
  ChevronRight, Cpu, Award, BookOpen, Terminal, Moon, Leaf,
} from "lucide-react";
import avatarImage from "@assets/IMG_20251209_232112_1765434316677.jpg";
import aiArtPdf from "@assets/Ai_Art__1765437570484.pdf";
import slashLogo from "@assets/slash.logo_1779607963883.jpg";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

/* ── animation helpers ── */
const fadeUp: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 70, damping: 16 } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

/* ── typewriter hook ── */
function useTypewriter(text: string, speed = 60, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ── word-animator ── */
function AnimatedWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const w: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 16 } },
  };
  return (
    <motion.span
      className={`inline-block ${className ?? ""}`}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      initial="hidden" whileInView="visible" viewport={{ once: true }}
    >
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={w} className="inline-block mr-[0.25em]">{word}</motion.span>
      ))}
    </motion.span>
  );
}

/* ── section heading ── */
function SectionHeading({ icon, label, number, accent = "hsl(var(--neon-purple))", lineColor }: { icon: React.ReactNode; label: string; number: string; accent?: string; lineColor?: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <motion.span initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-xs font-mono opacity-40 select-none" style={{ color: accent }}>
        {number}
      </motion.span>
      <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }} className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl border" style={{ background: `${accent}18`, borderColor: `${accent}40`, color: accent }}>
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold" style={{ color: accent }}>
          <AnimatedWords text={label} />
        </h2>
      </motion.div>
      <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ originX: 0, background: `linear-gradient(to right, ${lineColor ?? accent}60, transparent)` }} className="flex-1 h-px" />
    </div>
  );
}

/* ── theme toggle button ── */
function ThemeToggle({ theme, setTheme }: { theme: "dark" | "green"; setTheme: (t: "dark" | "green") => void }) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-xl border border-white/10 bg-white/5">
      <button
        onClick={() => setTheme("dark")}
        title="Dark mode"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${theme === "dark" ? "bg-neon-purple text-black font-bold shadow-[0_0_10px_hsla(var(--neon-purple),0.5)]" : "text-zinc-400 hover:text-white"}`}
      >
        <Moon className="w-3.5 h-3.5" /> Dark
      </button>
      <button
        onClick={() => setTheme("green")}
        title="Green mode"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${theme === "green" ? "bg-neon-purple text-black font-bold shadow-[0_0_10px_hsla(var(--neon-purple),0.5)]" : "text-zinc-400 hover:text-white"}`}
      >
        <Leaf className="w-3.5 h-3.5" /> Green
      </button>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "green">("dark");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  /* apply theme class to body */
  useEffect(() => {
    document.body.classList.toggle("green-mode", theme === "green");
  }, [theme]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* typewriter for hero signature */
  const { displayed: typedName, done: typeDone } = useTypewriter("Md. Maheeb Hossain", 65, 600);

  const navItems = [
    { id: "projects", label: "Projects" },
    { id: "eca", label: "ECA" },
    { id: "awards", label: "Awards" },
    { id: "blog", label: "Blog" },
    { id: "agency", label: "Agency" },
    { id: "about", label: "About" },
  ];

  const projects = [
    {
      num: "01", title: "Slash Health Care",
      desc: "Smart AI assistant featuring 10,000+ doctor tips and comprehensive health care guidance — making quality health information accessible to everyone.",
      tags: ["AI", "Health Tech", "Python", "Web"],
      gradient: "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(6,182,212,0.1) 50%, rgba(0,0,0,0) 100%)",
      glow: "rgba(16,185,129,0.25)", accent: "#10b981", border: "rgba(16,185,129,0.3)",
    },
    {
      num: "02", title: "Slash Sports",
      desc: "All kinds of sports gear and equipment — a platform dedicated to SCPSC students, making quality sports essentials easy to find.",
      tags: ["Sports", "E-commerce", "Web Design"],
      gradient: "linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.1) 50%, rgba(0,0,0,0) 100%)",
      glow: "rgba(59,130,246,0.25)", accent: "#3b82f6", border: "rgba(59,130,246,0.3)",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-sans selection:bg-neon-purple/40" style={{ color: "hsl(var(--foreground))" }}>

      {/* scroll progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60]" css={{ background: "linear-gradient(to right, hsl(var(--neon-purple)), hsl(var(--neon-purple)/0.5))" }} />
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-neon-purple" />

      {/* ── NAV ── */}
      <nav className="fixed top-[2px] left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-5 py-3 flex justify-between items-center gap-4">
          <motion.button onClick={() => scrollToSection("home")} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="font-display font-bold text-sm md:text-base leading-tight group shrink-0">
            <span className="bg-gradient-to-r from-neon-purple to-pink-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              Md. Maheeb Hossain
            </span>
          </motion.button>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-1.5 text-xs font-mono rounded-lg transition-all duration-200 ${activeSection === item.id ? "text-neon-purple bg-neon-purple/10" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                >
                  {item.label}
                  {activeSection === item.id && <motion.div layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-purple" />}
                </button>
              ))}
            </div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <button className="flex flex-col gap-1.5 p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="md:hidden border-t border-white/5 bg-black/90 backdrop-blur-xl px-5 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left px-4 py-2.5 rounded-lg text-sm font-mono text-zinc-300 hover:text-white hover:bg-white/5 transition-all">{item.label}</button>
            ))}
          </motion.div>
        )}
      </nav>

      <main className="w-full max-w-4xl mx-auto px-4 pt-20 pb-12 flex flex-col gap-24">

        {/* ── HERO ── */}
        <section id="home" className="relative min-h-[92vh] flex flex-col items-center justify-center text-center gap-6 overflow-hidden">
          {/* background orbs */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[80px]" style={{ background: "var(--orb1)" }} />
            <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px]" style={{ background: "var(--orb2)" }} />
            <motion.div animate={{ x: [0, 20, 0], y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full blur-[60px]" style={{ background: "var(--orb3)" }} />
          </div>

          {/* Avatar */}
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.1 }} className="relative group cursor-pointer">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -inset-1.5 rounded-full opacity-60 blur-sm" style={{ background: "conic-gradient(from 0deg, hsl(var(--neon-purple)), #ec4899, hsl(var(--neon-purple)))" }} />
            <div className="absolute -inset-0.5 rounded-full" style={{ background: "linear-gradient(135deg, hsl(var(--neon-purple)), #3b82f6)" }} />
            <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-black">
              <img src={avatarImage} alt="Maheeb" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75))" }}>
                <span className="absolute bottom-3 text-[10px] font-mono text-white/90 tracking-wider">hover ✦</span>
              </div>
            </div>
            {/* Online dot */}
            <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-black shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            {/* Hover tooltip card */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              whileHover={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-52 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-20"
            >
              <div className="rounded-xl border border-white/10 bg-black/90 backdrop-blur-md px-4 py-3 text-center shadow-xl">
                <p className="text-xs font-bold text-white">Md. Maheeb Hossain</p>
                <p className="text-[10px] font-mono mt-0.5" style={{ color: "hsl(var(--neon-purple))" }}>Student · Designer · Dev</p>
                <div className="flex items-center justify-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-mono">Available for work</span>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">📍 Bangladesh</p>
              </div>
              <div className="w-2 h-2 bg-black/90 border-t border-l border-white/10 rotate-45 mx-auto -mt-1" />
            </motion.div>
          </motion.div>

          {/* Signature typewriter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col items-center gap-1">
            <p className="text-xs font-mono tracking-widest uppercase opacity-50 mb-1">Hi, I'm</p>
            <div className="text-4xl md:text-5xl font-signature leading-tight" style={{ color: "hsl(var(--neon-purple))", filter: "drop-shadow(0 0 12px hsla(var(--neon-purple),0.5))" }}>
              {typedName}
              <span className={`inline-block w-0.5 h-9 md:h-11 ml-1 align-middle rounded-sm cursor-blink ${typeDone ? "opacity-0" : ""}`} style={{ background: "hsl(var(--neon-purple))" }} />
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.5 }} className="text-zinc-400 text-sm md:text-base font-light max-w-xs md:max-w-md mx-auto leading-relaxed">
            Student · Tech Enthusiast · Club Representative at{" "}
            <a href="https://www.scpscch.tech/" target="_blank" rel="noopener noreferrer" className="text-neon-purple hover:text-white transition-colors">Cyber Hub</a>
          </motion.p>

          {/* Status badge */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.4, duration: 0.4 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono tracking-widest uppercase" style={{ background: "hsla(var(--neon-purple),0.08)", borderColor: "hsla(var(--neon-purple),0.25)", color: "hsl(var(--neon-purple))" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(var(--neon-purple))" }} />
            Open to opportunities
          </motion.div>

          {/* Skill badges */}
          <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 2.6 } } }} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Data Science", icon: <Zap className="w-3 h-3" />, link: null, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.35)" },
              { label: "Graphic Designer", icon: <Palette className="w-3 h-3" />, link: "/graphic-design", color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.45)" },
              { label: "Video Editor", icon: <Film className="w-3 h-3" />, link: null, color: "#f43f5e", bg: "rgba(244,63,94,0.08)", border: "rgba(244,63,94,0.3)" },
              { label: "Cybersecurity", icon: <Shield className="w-3 h-3" />, link: null, color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.3)" },
              { label: "Robotics", icon: <Cpu className="w-3 h-3" />, link: null, color: "#38bdf8", bg: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.3)" },
            ].map((skill) => {
              const pill = (
                <motion.span
                  variants={{ hidden: { opacity: 0, scale: 0.7, y: 8 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } } }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 cursor-pointer hover:scale-105 hover:brightness-125"
                  style={{ borderColor: skill.border, background: skill.bg, color: "#e4e4e7" }}
                >
                  <span style={{ color: skill.color }}>{skill.icon}</span>
                  {skill.label}
                </motion.span>
              );
              return skill.link ? <Link key={skill.label} href={skill.link}>{pill}</Link> : <span key={skill.label}>{pill}</span>;
            })}
          </motion.div>

          {/* CTA */}
          <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 3.0 } } }} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-3">
            <motion.button
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              onClick={() => scrollToSection("projects")}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "hsl(var(--neon-purple))", color: theme === "green" ? "#030f06" : "#000", boxShadow: "0 0 22px hsla(var(--neon-purple),0.45)" }}
            >
              View Projects <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.a
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              href="mailto:maheebhossain900@gmail.com"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-zinc-300 text-sm font-semibold hover:text-white hover:bg-white/5 transition-all"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              <Mail className="w-4 h-4" /> Contact Me
            </motion.a>
          </motion.div>

        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionHeading icon={<Cpu className="w-4 h-4" />} label="Projects" number="01" accent="#10b981" /></motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((p, idx) => (
                <motion.div
                  key={p.num} variants={fadeUp}
                  whileHover={{ y: -5, boxShadow: `0 0 36px ${p.glow}`, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="group relative rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{ background: p.gradient, borderColor: p.border }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(to right, transparent, ${p.accent}, transparent)` }} />
                  <div className="p-5 flex flex-col gap-3.5 h-full">
                    <div className="flex items-start justify-between">
                      <span className="text-3xl font-display font-black select-none opacity-20 group-hover:opacity-40 transition-all" style={{ color: p.accent }}>{p.num}</span>
                      <div className="w-8 h-8 rounded-xl border flex items-center justify-center transition-all" style={{ background: `${p.accent}18`, borderColor: `${p.accent}40`, color: p.accent }}>
                        <Code2 className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <h3 className="text-base font-display font-bold text-white group-hover:brightness-125 transition-all" style={{ textShadow: `0 0 20px ${p.accent}40` }}>
                        <AnimatedWords text={p.title} delay={idx * 0.05} />
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-0.5 rounded-full border font-mono" style={{ background: `${p.accent}12`, borderColor: `${p.accent}35`, color: p.accent }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* View Designs card */}
              <motion.div variants={fadeUp} className="md:col-span-2">
                <Link href="/graphic-design">
                  <motion.div
                    whileHover={{ y: -3, transition: { type: "spring", stiffness: 280, damping: 18 } }}
                    className="group relative rounded-2xl border overflow-hidden cursor-pointer p-5 flex items-center justify-between gap-4"
                    style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(236,72,153,0.08) 50%, rgba(99,102,241,0.06) 100%)", borderColor: "rgba(168,85,247,0.3)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(to right, transparent, #a855f7, #ec4899, transparent)" }} />
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(168,85,247,0.1)" }} />
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0" style={{ background: "rgba(168,85,247,0.15)", borderColor: "rgba(168,85,247,0.4)", color: "#a855f7" }}>
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-display font-bold text-white">Browse My Design Work</p>
                        <p className="text-xs text-zinc-400 mt-0.5">Logos · Posters · Certificates · Branding &amp; more</p>
                      </div>
                    </div>
                    <motion.div whileHover={{ x: 4 }} className="shrink-0 flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-xl border" style={{ background: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.35)", color: "#a855f7" }}>
                      View All <ChevronRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── ECA ── */}
        <section id="eca" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionHeading icon={<Award className="w-4 h-4" />} label="Extracurricular" number="02" accent="#38bdf8" /></motion.div>
            <div className="relative pl-6 border-l space-y-7" style={{ borderColor: "hsla(var(--neon-purple),0.2)" }}>
              {[
                { role: "Club Representative", org: "Cyber Hub (ICT Club)", year: "2025 – Present", desc: "Leading workshops and organizing tech events for students.", link: "https://www.scpscch.tech/", active: true, accent: "#a855f7", dot: "#a855f7" },
                { role: "Member", org: "SCPSC Science Club", year: "2024 – Present", desc: "Active member exploring scientific concepts and participating in school science events and experiments.", link: "", active: true, accent: "#10b981", dot: "#10b981" },
                { role: "Participant", org: "National Math Olympiad", year: "2023", desc: "Regional finalist in junior category.", link: "", active: false, accent: "#f59e0b", dot: "#52525b" },
              ].map((eca, i) => (
                <motion.div key={i} variants={fadeUp} className="relative group">
                  <div className="absolute -left-[30px] top-4 w-3 h-3 rounded-full border-2 transition-all duration-300" style={eca.active ? { background: eca.dot, borderColor: eca.dot, boxShadow: `0 0 10px ${eca.dot}cc` } : { background: "#27272a", borderColor: "#52525b" }} />
                  <motion.div whileHover={{ x: 4, transition: { type: "spring", stiffness: 300, damping: 20 } }} className="rounded-2xl p-4 border transition-all duration-300" style={{ background: `${eca.accent}08`, borderColor: `${eca.accent}25` }}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-display font-bold text-white"><AnimatedWords text={eca.role} delay={i * 0.1} /></h3>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border" style={{ background: `${eca.accent}15`, color: eca.accent, borderColor: `${eca.accent}35` }}>{eca.year}</span>
                    </div>
                    {eca.link ? (
                      <a href={eca.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs mb-2 font-medium transition-colors hover:brightness-125" style={{ color: eca.accent }}>{eca.org} <ExternalLink className="w-3 h-3" /></a>
                    ) : (
                      <p className="text-xs mb-2 font-medium" style={{ color: eca.accent }}>{eca.org}</p>
                    )}
                    <p className="text-xs text-zinc-400 leading-relaxed">{eca.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── AWARDS ── */}
        <section id="awards" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionHeading icon={<Trophy className="w-4 h-4" />} label="Awards" number="03" accent="#f59e0b" /></motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Gold */}
              <motion.div variants={fadeUp} whileHover={{ y: -5, transition: { type: "spring", stiffness: 260, damping: 18 } }} className="relative group rounded-2xl overflow-hidden border border-yellow-500/20 bg-gradient-to-br from-yellow-950/30 via-zinc-950 to-zinc-950 hover:border-yellow-400/50 hover:shadow-[0_0_36px_rgba(234,179,8,0.16)] transition-all duration-400">
                <div className="absolute -top-6 -left-6 w-36 h-36 bg-yellow-500/8 rounded-full blur-3xl group-hover:bg-yellow-400/15 transition-all duration-500" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
                <div className="relative p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <motion.div whileHover={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 0.5 }} className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/20 transition-all">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 tracking-widest uppercase font-bold">🥇 1st Place</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-yellow-300 transition-colors mb-0.5"><AnimatedWords text="SCPSC IT Intra Fest" delay={0.1} /></h3>
                    <p className="text-yellow-500/70 font-mono text-xs tracking-wide">Programming Contest — Winner</p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-yellow-500/20 to-transparent" />
                  <p className="text-zinc-500 text-xs leading-relaxed">Secured <span className="text-yellow-300 font-semibold">1st place</span> in the intra-school IT fest programming competition at SCPSC.</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, type: "spring" }}>
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Purple */}
              <motion.div variants={fadeUp} whileHover={{ y: -5, transition: { type: "spring", stiffness: 260, damping: 18 } }} className="relative group rounded-2xl overflow-hidden border border-neon-purple/20 bg-gradient-to-br from-purple-950/20 via-zinc-950 to-zinc-950 hover:border-neon-purple/50 hover:shadow-[0_0_36px_rgba(168,85,247,0.16)] transition-all duration-400">
                <div className="absolute -top-6 -right-6 w-36 h-36 rounded-full blur-3xl transition-all duration-500" style={{ background: "hsla(var(--neon-purple),0.08)" }} />
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, hsla(var(--neon-purple),0.4), transparent)" }} />
                <div className="relative p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:bg-neon-purple/20 transition-all" style={{ background: "hsla(var(--neon-purple),0.08)", borderColor: "hsla(var(--neon-purple),0.2)", color: "hsl(var(--neon-purple))" }}>
                      <Shield className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full border tracking-widest uppercase font-bold" style={{ background: "hsla(var(--neon-purple),0.1)", color: "hsl(var(--neon-purple))", borderColor: "hsla(var(--neon-purple),0.2)" }}>2025–2026</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-neon-purple transition-colors mb-0.5"><AnimatedWords text="Club Representative" delay={0.1} /></h3>
                    <a href="https://www.scpscch.tech/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-xs hover:text-neon-purple transition-colors" style={{ color: "hsla(var(--neon-purple),0.6)" }}>
                      Cyber Hub — ICT Club · SCPSC <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="h-px bg-gradient-to-r from-neon-purple/20 to-transparent" />
                  <p className="text-zinc-500 text-xs leading-relaxed">Elected as <span className="text-neon-purple font-semibold">Club Representative</span> for Cyber Hub ICT Club, leading workshops and tech events.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Leadership", "Tech Events", "Workshops"].map((t, i) => (
                      <motion.span key={t} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-xs font-mono px-2 py-0.5 rounded-full border" style={{ background: "hsla(var(--neon-purple),0.07)", color: "hsla(var(--neon-purple),0.7)", borderColor: "hsla(var(--neon-purple),0.15)" }}>{t}</motion.span>
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
            <motion.div variants={fadeUp}><SectionHeading icon={<BookOpen className="w-4 h-4" />} label="Blog" number="04" accent="#f43f5e" /></motion.div>
            <div className="flex flex-col gap-2.5">
              {[
                { title: "Starting My Journey in Data Science", date: "Dec 10, 2025", read: "4 min", tag: "Data Science", excerpt: "Why I chose Python as my first language and how I'm learning data visualization.", accent: "#f59e0b" },
                { title: "Cyber Security Basics for Students", date: "Nov 25, 2025", read: "3 min", tag: "Cybersecurity", excerpt: "Simple steps every student should take to stay safe online.", accent: "#10b981" },
                { title: "Designing for Impact", date: "Oct 15, 2025", read: "5 min", tag: "Design", excerpt: "How I use graphic design principles in my school presentations.", accent: "#a855f7" },
              ].map((post, i) => (
                <motion.a key={i} href="#" variants={fadeUp} whileHover={{ x: 5, transition: { type: "spring", stiffness: 300, damping: 20 } }} className="group block">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl border transition-all duration-300 overflow-hidden relative" style={{ borderColor: `${post.accent}25`, background: `${post.accent}07` }}>
                    {/* Left colour bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: post.accent }} />
                    <div className="flex-1 space-y-1 pl-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full border" style={{ background: `${post.accent}15`, color: post.accent, borderColor: `${post.accent}35` }}>{post.tag}</span>
                        <span className="text-xs text-zinc-500 font-mono">{post.date} · {post.read} read</span>
                      </div>
                      <h3 className="text-sm font-display font-bold text-zinc-200 group-hover:text-white transition-colors"><AnimatedWords text={post.title} delay={i * 0.05} /></h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{post.excerpt}</p>
                    </div>
                    <motion.div whileHover={{ x: 3 }} className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all" style={{ borderColor: `${post.accent}35`, color: post.accent, background: `${post.accent}10` }}>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── SLASH AGENCY ── */}
        <section id="agency" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionHeading icon={<Palette className="w-4 h-4" />} label="My Agency" number="05" accent="#a855f7" />
            </motion.div>
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 260, damping: 18 } }}
              className="relative rounded-2xl overflow-hidden border border-white/10 p-6 md:p-8"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(16,185,129,0.07), rgba(0,0,0,0))" }}
            >
              <div className="absolute -top-10 -left-10 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
                <motion.img
                  src={slashLogo}
                  alt="Slash Web & Design"
                  whileHover={{ rotate: 3, scale: 1.05 }}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover shadow-[0_0_28px_rgba(99,102,241,0.35)] shrink-0"
                />
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Slash Web &amp; Design</h3>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 tracking-widest uppercase">Co-Founder &amp; CEO</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                    My personal creative agency delivering brand identities, digital design, web interfaces,
                    and visual storytelling. Built on the belief that every great brand starts with a sharp idea
                    and even sharper execution.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {["Brand Identity", "Logo Design", "Web Design", "Infographics", "UI/UX"].map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-mono"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="scroll-mt-24 mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionHeading icon={<Terminal className="w-4 h-4" />} label="About Me" number="06" accent="#6366f1" /></motion.div>

            <div className="flex flex-col gap-6">

              {/* Top row — bio + stats */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5">

                {/* Main bio */}
                <motion.div variants={fadeUp} className="md:col-span-3 relative rounded-2xl border border-white/8 p-6 overflow-hidden" style={{ background: "linear-gradient(135deg, hsla(var(--neon-purple),0.05), transparent)" }}>
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ background: "hsla(var(--neon-purple),0.07)" }} />
                  <div className="relative space-y-3 text-zinc-300 text-sm leading-relaxed">
                    <p>
                      I'm <span className="text-white font-semibold">Md. Maheeb Hossain</span>, a 
                      passionate tech enthusiast, student, and proud student of{" "}
                      <span className="highlight-animate text-white font-semibold">
                        Savar Cantonment Public School &amp; College
                      </span>{" "}
                      <span className="text-zinc-500 font-mono text-xs">(SCPSC)</span> from Bangladesh 🇧🇩.
                      From a young age I've been deeply fascinated by the way technology shapes the 
                      world — and that curiosity has driven me to explore everything from 
                      <span className="text-white font-medium"> Ethical Hacking</span> to{" "}
                      <span className="text-white font-medium">Graphic Design</span>.
                    </p>
                    <p>
                      As the elected <span className="text-white font-medium">Club Representative</span> of{" "}
                      <a href="https://www.scpscch.tech/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium hover:text-white transition-colors" style={{ color: "hsl(var(--neon-purple))" }}>
                        Cyber Hub <ExternalLink className="w-3 h-3" />
                      </a>{" "}
                      — the ICT club of{" "}
                      <span className="highlight-animate text-white font-semibold" style={{ animationDelay: "0.9s" }}>
                        Savar Cantonment Public School &amp; College
                      </span>{" "}
                      — I organise workshops, tech events, and seminars 
                      to spark technological curiosity among my fellow students. Leading this 
                      club has taught me teamwork, communication, and real-world problem-solving 
                      in ways no classroom ever could.
                    </p>
                    <p>
                      On the technical side, I'm actively learning <span className="text-white font-medium">Python</span> for 
                      data science and automation, diving into the fundamentals of{" "}
                      <span className="text-white font-medium">Cybersecurity</span> and ethical hacking, 
                      and building projects that combine code with creative thinking. I believe 
                      that the best solutions sit at the intersection of logic and design.
                    </p>
                    <p>
                      Beyond the screen, I'm passionate about <span className="text-white font-medium">Robotics</span>, 
                      where hardware meets software in the most exciting ways. I also express 
                      myself through <span className="text-white font-medium">Graphic Design</span> and{" "}
                      <span className="text-white font-medium">Video Editing</span> — crafting visuals 
                      that tell stories and leave an impression.
                    </p>
                    <p>
                      My goal is simple: keep learning, keep building, and use technology to 
                      make a meaningful difference — starting right here in Bangladesh and 
                      reaching as far as possible. I'm always open to collaboration, new ideas, 
                      and connecting with like-minded people around the world.
                    </p>
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div variants={stagger} className="md:col-span-2 flex flex-col gap-3">
                  {[
                    { icon: <MapPin className="w-3.5 h-3.5" />, label: "Location", value: "Bangladesh 🇧🇩" },
                    { icon: <User className="w-3.5 h-3.5" />, label: "Role", value: "Student & Tech Enthusiast" },
                    { icon: <Trophy className="w-3.5 h-3.5" />, label: "Award", value: "IT Intra Fest Winner" },
                    { icon: <Shield className="w-3.5 h-3.5" />, label: "Club", value: "Cyber Hub Rep 2025–26" },
                  ].map((stat, i) => (
                    <motion.div key={i} variants={fadeUp} whileHover={{ x: 4, transition: { type: "spring", stiffness: 300 } }} className="flex items-center gap-3 p-3.5 rounded-xl border border-white/6 bg-zinc-950/50 hover:border-neon-purple/20 transition-all group">
                      <div className="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 group-hover:bg-neon-purple/15 transition-all" style={{ background: "hsla(var(--neon-purple),0.08)", borderColor: "hsla(var(--neon-purple),0.15)", color: "hsl(var(--neon-purple))" }}>{stat.icon}</div>
                      <div>
                        <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-wider">{stat.label}</p>
                        <p className="text-xs text-zinc-200 font-medium mt-0.5">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Skills grid */}
              <motion.div variants={fadeUp} className="rounded-2xl border border-white/8 p-6" style={{ background: "linear-gradient(135deg, hsla(var(--neon-purple),0.04), transparent)" }}>
                <h3 className="text-sm font-display font-bold text-white mb-4 tracking-wide">Skills & Interests</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { area: "Python & Data Science", detail: "Pandas, data viz, scripting" },
                    { area: "Cybersecurity", detail: "Ethical hacking fundamentals, CTF" },
                    { area: "Graphic Design", detail: "Photoshop, Illustrator, AI Art" },
                    { area: "Video Editing", detail: "Motion graphics, storytelling" },
                    { area: "Web Development", detail: "HTML/CSS, JavaScript, React" },
                    { area: "Robotics", detail: "Hardware + software integration" },
                    { area: "Leadership", detail: "Club rep, event organiser" },
                    { area: "Creative Writing", detail: "Tech blogs, school publications" },
                  ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -2 }} className="p-3 rounded-xl border border-white/6 bg-white/[0.02] hover:border-neon-purple/20 transition-all">
                      <p className="text-xs font-semibold text-zinc-200 mb-0.5">{s.area}</p>
                      <p className="text-[11px] text-zinc-500">{s.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact row */}
              <motion.div variants={fadeUp} className="rounded-2xl border border-white/8 p-6" style={{ background: "linear-gradient(135deg, hsla(var(--neon-purple),0.04), transparent)" }}>
                <h3 className="text-sm font-display font-bold text-white mb-4 tracking-wide">Get In Touch</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { href: "https://github.com/maheeb-cyber", icon: <Github className="w-4 h-4" />, label: "GitHub", sub: "maheeb-cyber" },
                    { href: "mailto:maheebhossain900@gmail.com", icon: <Mail className="w-4 h-4" />, label: "Email", sub: "maheebhossain900@gmail.com" },
                    { href: "https://discord.gg/3eukqzF2r", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>, label: "Discord", sub: "Join my server" },
                    { href: "https://wa.me/8801756975275", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.847L.057 23.57a.5.5 0 0 0 .614.612l5.927-1.556A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.914a9.907 9.907 0 0 1-5.022-1.368l-.36-.214-3.733.98.999-3.645-.235-.374A9.868 9.868 0 0 1 2.086 12C2.086 6.507 6.507 2.086 12 2.086S21.914 6.507 21.914 12 17.493 21.914 12 21.914z"/></svg>, label: "WhatsApp", sub: "+880 1756975275" },
                    { href: "viber://chat?number=%2B8801756975275", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.4 0C5.5.1 1.1 4.6.9 10.5c-.1 2.7.7 5.2 2.3 7.2L2 21.4c-.1.4.3.8.7.7l3.8-1.1c1.9 1.2 4.1 1.9 6.5 1.9 6-.1 10.5-4.7 10.5-10.7S17.4-.1 11.4 0zm5.5 15.8c-.3.8-1.5 1.5-2.1 1.6-.5.1-1.2.1-1.9-.1-.4-.1-.9-.3-1.5-.6-2.7-1.2-4.4-3.9-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7s.7-1.9 1-2.2c.3-.3.6-.4.8-.4h.6c.2 0 .4.1.5.4.2.4.7 1.7.8 1.8.1.1.1.3 0 .4l-.3.5c-.1.1-.2.3-.1.5.3.5.7 1.1 1.2 1.5.6.5 1.1.8 1.7 1 .2.1.3 0 .4-.1l.4-.5c.1-.2.3-.2.5-.1l1.7.8c.2.1.3.2.4.3-.1.5-.1.9-.3 1.5z"/></svg>, label: "Viber", sub: "+880 1756975275" },
                  ].map((s) => (
                    <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -2 }} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02] hover:border-neon-purple/25 hover:bg-neon-purple/5 transition-all group">
                      <span style={{ color: "hsl(var(--neon-purple))" }}>{s.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">{s.label}</p>
                        <p className="text-[11px] text-zinc-500 font-mono">{s.sub}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>
        </section>
      </main>

      <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="border-t border-white/5 py-6 text-center" style={{ background: "hsla(var(--background),0.5)" }}>
        <p className="text-xs text-zinc-600 font-mono">
          © {new Date().getFullYear()} <span className="text-zinc-400">Md. Maheeb Hossain</span> · Built with React &amp; TypeScript
        </p>
      </motion.footer>
    </div>
  );
}
