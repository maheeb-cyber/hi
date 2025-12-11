import { motion, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import avatarImage from "@assets/IMG_20251209_232112_1765434316677.jpg";

export default function Portfolio() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden font-sans text-foreground selection:bg-neon-purple selection:text-white">
      
      {/* Main Container - Centered and constrained width */}
      <motion.div 
        className="w-full max-w-2xl flex flex-col items-center gap-8 md:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Profile Section */}
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
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-glow">
            Hi! I am Maheeb <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-mono">
            I build this site. I am a Data science learner.
          </p>
        </motion.div>

        {/* Badges Section */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 md:gap-4">
          {[
            "Beginner Python developer",
            "Graphic designer",
            "Video editor",
            "Beginner ethical hacker"
          ].map((skill) => (
            <Badge 
              key={skill} 
              variant="outline" 
              className="px-4 py-2 text-sm md:text-base border-neon-purple text-foreground hover:bg-neon-purple hover:text-black transition-all duration-300 font-mono tracking-tight"
            >
              {skill}
            </Badge>
          ))}
        </motion.div>

        <Separator className="bg-neon-purple/30 w-1/2" />

        {/* About Me Section */}
        <motion.div variants={itemVariants} className="w-full">
          <Card className="bg-black border border-neon-purple shadow-[0_0_15px_rgba(168,85,247,0.15)] relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-neon-purple/10 rounded-full blur-2xl"></div>
            
            <CardContent className="p-6 md:p-8 text-center space-y-4 relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-neon-purple uppercase tracking-widest mb-4">
                About Me
              </h2>
              <p className="text-base md:text-lg leading-relaxed font-sans text-gray-300">
                My name is Maheeb. I am from Bangladesh. I am a representative of my school’s ICT club called Cyber Hub. I am a SCPSCIAN.
              </p>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>

      {/* Footer / Copyright */}
      <motion.footer 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-16 text-xs text-muted-foreground font-mono"
      >
        © {new Date().getFullYear()} Maheeb. All rights reserved.
      </motion.footer>

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
