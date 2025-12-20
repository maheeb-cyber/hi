import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Cpu, 
  BookOpen, 
  Award,
  ExternalLink,
  Send,
  FileText
} from "lucide-react";
import avatarImage from "@assets/IMG_20251209_232112_1765434316677.jpg";
import aiArtPdf from "@assets/Ai_Art__1765437570484.pdf";
import { useState } from "react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const navItems = [
    { id: "projects", label: "Projects" },
    { id: "eca", label: "ECA" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "About" },
  ];

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center overflow-x-hidden font-sans text-foreground selection:bg-neon-purple selection:text-white">
      
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neon-purple/20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            className="text-xl font-display font-bold text-neon-purple cursor-pointer hover:text-white transition-colors"
            onClick={() => scrollToSection("home")}
          >
            MAHEEB<span className="text-white">.DEV</span>
          </div>
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-mono transition-colors hover:text-neon-purple ${
                  activeSection === item.id ? "text-neon-purple underline underline-offset-4" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Mobile Menu Button - Simplified for mockup */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-neon-purple">
              <Terminal size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <main className="w-full max-w-4xl px-4 pt-24 pb-12 flex flex-col gap-20">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[80vh] flex flex-col items-center justify-center text-center gap-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            {/* Profile Picture */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-1 bg-neon-purple rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-neon-purple bg-black">
                <img 
                  src={avatarImage} 
                  alt="Maheeb" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Introduction Text */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-display font-bold tracking-tighter text-glow">
                Hi! I am Maheeb <span className="inline-block animate-wave">👋</span>
              </h1>
            </motion.div>

            {/* Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
              {[
                "Beginner Python developer",
                "Graphic designer",
                "Video editor",
                "Beginner ethical hacker"
              ].map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline" 
                  className="px-4 py-2 text-sm border-neon-purple text-foreground hover:bg-neon-purple hover:text-black transition-all duration-300 font-mono"
                >
                  {skill}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <Separator className="bg-neon-purple/20" />

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neon-purple flex items-center gap-3">
              <Cpu className="w-8 h-8" /> Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Data Viz Dashboard",
                  desc: "Interactive visualization of school data using Python and Pandas.",
                  tags: ["Python"]
                },
                {
                  title: "School Club Portal",
                  desc: "A landing page for Cyber Hub ICT club with member registration.",
                  tags: ["HTML/CSS", "JavaScript", "React"]
                },
                {
                  title: "Auto-Reply Bot",
                  desc: "Simple automation script for handling email queries.",
                  tags: ["Python", "Automation"]
                },
                {
                  title: "Graphic Design Portfolio",
                  desc: "Collection of designs including 'Making Artwork with AI' presentation.",
                  tags: ["Photoshop", "Illustrator", "AI Art"],
                  link: aiArtPdf,
                  linkText: "View Presentation (PDF)"
                }
              ].map((project, i) => (
                <Card key={i} className="bg-zinc-950 border-zinc-800 hover:border-neon-purple transition-colors duration-300 group flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold group-hover:text-neon-purple transition-colors">{project.title}</CardTitle>
                    <CardDescription>{project.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-zinc-900 text-zinc-400 border border-zinc-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  {project.link && (
                    <CardFooter>
                      <Button asChild variant="outline" size="sm" className="w-full border-zinc-700 hover:border-neon-purple hover:text-neon-purple hover:bg-transparent">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          {project.linkText} <FileText className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ECA SECTION */}
        <section id="eca" className="scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neon-purple flex items-center gap-3">
              <Award className="w-8 h-8" /> ECA
            </h2>
            <Card className="bg-black border border-neon-purple/30">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[
                    {
                      role: "Club Representative",
                      org: "Cyber Hub (ICT Club)",
                      year: "2025 - Present",
                      desc: "Leading workshops and organizing tech events for students."
                    },
                    {
                      role: "Participant",
                      org: "National Math Olympiad",
                      year: "2023",
                      desc: "Regional finalist in junior category."
                    }
                  ].map((eca, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-4 pb-6 last:pb-0 border-b border-zinc-900 last:border-0">
                      <div className="w-full md:w-32 text-neon-purple font-mono text-sm pt-1">
                        {eca.year}
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-bold">{eca.role}</h3>
                        <p className="text-muted-foreground font-medium">{eca.org}</p>
                        <p className="text-sm text-gray-400">{eca.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* BLOG SECTION */}
        <section id="blog" className="scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neon-purple flex items-center gap-3">
              <BookOpen className="w-8 h-8" /> Blog
            </h2>
            <div className="grid gap-4">
              {[
                {
                  title: "Starting My Journey in Data Science",
                  date: "Dec 10, 2025",
                  excerpt: "Why I chose Python as my first language and how I'm learning data visualization."
                },
                {
                  title: "Cyber Security Basics for Students",
                  date: "Nov 25, 2025",
                  excerpt: "Simple steps every student should take to stay safe online."
                },
                {
                  title: "Designing for Impact",
                  date: "Oct 15, 2025",
                  excerpt: "How I use graphic design principles in my school presentations."
                }
              ].map((post, i) => (
                <a key={i} href="#" className="block group">
                  <Card className="bg-zinc-950 border-zinc-800 group-hover:border-neon-purple transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold group-hover:text-neon-purple transition-colors">{post.title}</h3>
                        <span className="text-xs font-mono text-zinc-500">{post.date}</span>
                      </div>
                      <p className="text-gray-400">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ABOUT SECTION - MOVED TO BOTTOM */}
        <section id="about" className="scroll-mt-24 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neon-purple flex items-center gap-3">
              <Terminal className="w-8 h-8" /> About Me
            </h2>
            <Card className="bg-black border border-neon-purple/50 shadow-[0_0_20px_rgba(168,85,247,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-neon-purple/15 rounded-full blur-3xl"></div>
              <CardContent className="p-8 md:p-12 text-xl md:text-3xl leading-relaxed text-gray-200 font-sans font-light">
                <p>
                  I am <span className="text-neon-purple font-medium">Maheeb</span>, a passionate tech enthusiast from Bangladesh and a proud SCPSCIAN. As a key representative of the <span className="text-white font-medium">'Cyber Hub'</span> ICT club, I lead initiatives to foster technological curiosity among peers.
                </p>
                <p className="mt-6">
                  My journey is defined by a relentless drive to learn—exploring the realms of <span className="text-white">Data Science</span>, <span className="text-white">Ethical Hacking</span>, and <span className="text-white">Creative Design</span> to build meaningful solutions.
                </p>
                <div className="mt-10 flex flex-wrap gap-8 text-lg">
                   <div className="flex flex-col gap-2">
                      <span className="text-sm text-neon-purple font-mono uppercase tracking-widest">Location</span>
                      <span className="font-medium">Bangladesh 🇧🇩</span>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-sm text-neon-purple font-mono uppercase tracking-widest">Role</span>
                      <span className="font-medium">Student & Tech Enthusiast</span>
                   </div>
                   <div className="flex flex-col gap-2">
                      <span className="text-sm text-neon-purple font-mono uppercase tracking-widest">Socials</span>
                      <div className="flex gap-4">
                        <a href="https://github.com/maheeb-cyber" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-purple transition-colors">
                          <Github className="w-6 h-6" />
                        </a>
                        <a href="https://discord.gg/3eukqzF2r" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-purple transition-colors flex items-center gap-2 cursor-pointer" title="Join my Discord">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M7.5 7.5c3.5-1 5.5-1 9 0"/><path d="M7 16.5c3.5 1 5.5 1 9 0"/><path d="M2 17l2.5-11.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2L22 17"/></svg>
                        </a>
                      </div>
                   </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

      </main>

      <footer className="w-full py-8 border-t border-zinc-900 bg-black text-center text-sm text-muted-foreground font-mono">
        <p>© {new Date().getFullYear()} Maheeb. Built with ❤️ and Code.</p>
      </footer>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .animate-wave {
          animation: wave 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
