import { motion, Variants, useScroll, useSpring } from "framer-motion";
import {
  Github, Mail, ExternalLink, FileText, Palette, Trophy,
  Star, Shield, ArrowDown, MapPin, User, Code2, Zap,
  ChevronRight, Cpu, Award, BookOpen, Terminal, Moon, Leaf,
} from "lucide-react";
import avatarImage from "@assets/IMG_20251209_232112_1765434316677.jpg";
import aiArtPdf from "@assets/Ai_Art__1765437570484.pdf";
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
function SectionHeading({ icon, label, number }: { icon: React.ReactNode; label: string; number: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <motion.span initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-xs font-mono opacity-40 select-none" style={{ color: "hsl(var(--neon-purple))" }}>
        {number}
      </motion.span>
      <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }} className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl border" style={{ background: "hsla(var(--neon-purple),0.08)", borderColor: "hsla(var(--neon-purple),0.2)", color: "hsl(var(--neon-purple))" }}>
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          <AnimatedWords text={label} />
        </h2>
      </motion.div>
      <motion.div initial={{ scaleX: 0, opacity: 0 }} whileInView={{ scaleX: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} style={{ originX: 0 }} className="flex-1 h-px bg-gradient-to-r from-[hsla(var(--neon-purple),0.35)] to-transparent" />
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
    { id: "about", label: "About" },
  ];

  const projects = [
    { num: "01", title: "Data Viz Dashboard", desc: "Interactive visualization of school data using Python and Pandas.", tags: ["Python", "Pandas"], gFrom: "from-blue-500/10", gTo: "to-cyan-500/5", hoverBorder: "hover:border-blue-500/40" },
    { num: "02", title: "School Club Portal", desc: "A landing page for Cyber Hub ICT club with member registration.", tags: ["HTML/CSS", "JavaScript", "React"], gFrom: "from-purple-500/10", gTo: "to-pink-500/5", hoverBorder: "hover:border-purple-500/40" },
    { num: "03", title: "Auto-Reply Bot", desc: "Simple automation script for handling email queries.", tags: ["Python", "Automation"], gFrom: "from-emerald-500/10", gTo: "to-teal-500/5", hoverBorder: "hover:border-emerald-500/40" },
    { num: "04", title: "Graphic Design Portfolio", desc: "Collection of designs including 'Making Artwork with AI' presentation.", tags: ["Photoshop", "Illustrator", "AI Art"], gFrom: "from-orange-500/10", gTo: "to-yellow-500/5", hoverBorder: "hover:border-orange-500/40", link: aiArtPdf, linkText: "View Presentation (PDF)" },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-sans selection:bg-neon-purple/40" style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>

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
              <img src={avatarImage} alt="Maheeb" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-black shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
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
              { label: "Data Science", icon: <Zap className="w-3 h-3" />, link: null },
              { label: "Graphic Designer", icon: <Palette className="w-3 h-3" />, link: "/graphic-design" },
              { label: "Video Editor", icon: <Code2 className="w-3 h-3" />, link: null },
              { label: "Cybersecurity", icon: <Shield className="w-3 h-3" />, link: null },
              { label: "Robotics", icon: <Cpu className="w-3 h-3" />, link: null },
            ].map((skill) => {
              const pill = (
                <motion.span
                  variants={{ hidden: { opacity: 0, scale: 0.7, y: 8 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 12 } } }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 cursor-pointer hover:scale-105"
                  style={skill.link
                    ? { borderColor: "hsla(var(--neon-purple),0.45)", background: "hsla(var(--neon-purple),0.07)", color: "#e4e4e7" }
                    : { borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#a1a1aa" }
                  }
                >
                  <span style={{ color: "hsl(var(--neon-purple))" }}>{skill.icon}</span>
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
            <motion.div variants={fadeUp}><SectionHeading icon={<Cpu className="w-4 h-4" />} label="Projects" number="01" /></motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((p, idx) => (
                <motion.div
                  key={p.num} variants={fadeUp}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={`group relative rounded-2xl border border-white/8 bg-gradient-to-br ${p.gFrom} ${p.gTo} ${p.hoverBorder} transition-all duration-300 overflow-hidden hover:shadow-lg`}
                >
                  <div className="p-5 flex flex-col gap-3.5 h-full">
                    <div className="flex items-start justify-between">
                      <span className="text-2xl font-display font-bold text-white/8 group-hover:text-white/14 transition-colors select-none">{p.num}</span>
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-neon-purple/30 transition-colors">
                        <Code2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-neon-purple transition-colors" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <h3 className="text-base font-display font-bold text-white group-hover:text-neon-purple transition-colors">
                        <AnimatedWords text={p.title} delay={idx * 0.05} />
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 font-mono">{t}</span>
                      ))}
                    </div>
                    {p.link && (
                      <motion.a href={p.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-300 hover:border-neon-purple/40 hover:text-neon-purple hover:bg-neon-purple/5 transition-all">
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
            <motion.div variants={fadeUp}><SectionHeading icon={<Award className="w-4 h-4" />} label="Extracurricular" number="02" /></motion.div>
            <div className="relative pl-6 border-l space-y-7" style={{ borderColor: "hsla(var(--neon-purple),0.2)" }}>
              {[
                { role: "Club Representative", org: "Cyber Hub (ICT Club)", year: "2025 – Present", desc: "Leading workshops and organizing tech events for students.", link: "https://www.scpscch.tech/", active: true },
                { role: "Participant", org: "National Math Olympiad", year: "2023", desc: "Regional finalist in junior category.", active: false },
              ].map((eca, i) => (
                <motion.div key={i} variants={fadeUp} className="relative group">
                  <div className="absolute -left-[30px] top-4 w-3 h-3 rounded-full border-2 transition-all duration-300" style={eca.active ? { background: "hsl(var(--neon-purple))", borderColor: "hsl(var(--neon-purple))", boxShadow: "0 0 10px hsla(var(--neon-purple),0.8)" } : { background: "#27272a", borderColor: "#52525b" }} />
                  <motion.div whileHover={{ x: 4, transition: { type: "spring", stiffness: 300, damping: 20 } }} className="bg-zinc-950/50 border border-white/6 rounded-2xl p-4 group-hover:border-neon-purple/20 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-display font-bold text-white"><AnimatedWords text={eca.role} delay={i * 0.1} /></h3>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border" style={eca.active ? { background: "hsla(var(--neon-purple),0.1)", color: "hsl(var(--neon-purple))", borderColor: "hsla(var(--neon-purple),0.2)" } : { background: "rgba(255,255,255,0.04)", color: "#71717a", borderColor: "rgba(255,255,255,0.1)" }}>{eca.year}</span>
                    </div>
                    {eca.link ? (
                      <a href={eca.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-neon-purple transition-colors mb-2 font-medium">{eca.org} <ExternalLink className="w-3 h-3" /></a>
                    ) : (
                      <p className="text-xs text-zinc-400 mb-2 font-medium">{eca.org}</p>
                    )}
                    <p className="text-xs text-zinc-500 leading-relaxed">{eca.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── AWARDS ── */}
        <section id="awards" className="scroll-mt-24">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}><SectionHeading icon={<Trophy className="w-4 h-4" />} label="Awards" number="03" /></motion.div>
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
            <motion.div variants={fadeUp}><SectionHeading icon={<BookOpen className="w-4 h-4" />} label="Blog" number="04" /></motion.div>
            <div className="flex flex-col gap-2.5">
              {[
                { title: "Starting My Journey in Data Science", date: "Dec 10, 2025", read: "4 min", tag: "Data Science", excerpt: "Why I chose Python as my first language and how I'm learning data visualization." },
                { title: "Cyber Security Basics for Students", date: "Nov 25, 2025", read: "3 min", tag: "Cybersecurity", excerpt: "Simple steps every student should take to stay safe online." },
                { title: "Designing for Impact", date: "Oct 15, 2025", read: "5 min", tag: "Design", excerpt: "How I use graphic design principles in my school presentations." },
              ].map((post, i) => (
                <motion.a key={i} href="#" variants={fadeUp} whileHover={{ x: 5, transition: { type: "spring", stiffness: 300, damping: 20 } }} className="group block">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl border border-white/6 bg-zinc-950/40 hover:border-neon-purple/25 hover:bg-zinc-900/60 transition-all duration-300">
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full border" style={{ background: "hsla(var(--neon-purple),0.08)", color: "hsl(var(--neon-purple))", borderColor: "hsla(var(--neon-purple),0.15)" }}>{post.tag}</span>
                        <span className="text-xs text-zinc-600 font-mono">{post.date} · {post.read} read</span>
                      </div>
                      <h3 className="text-sm font-display font-bold text-zinc-200 group-hover:text-white transition-colors"><AnimatedWords text={post.title} delay={i * 0.05} /></h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{post.excerpt}</p>
                    </div>
                    <motion.div whileHover={{ x: 3 }} className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-zinc-600 group-hover:border-neon-purple/40 group-hover:text-neon-purple group-hover:bg-neon-purple/5 transition-all">
                      <ChevronRight className="w-3.5 h-3.5" />
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
            <motion.div variants={fadeUp}><SectionHeading icon={<Terminal className="w-4 h-4" />} label="About Me" number="05" /></motion.div>

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
