import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, Code, Palette, Cpu, Mail, MapPin, Briefcase, Trophy, Database, Layers, Terminal, ArrowUpRight, ArrowDown } from 'lucide-react';
import './App.css';

const App = () => {
  const [introFinished, setIntroFinished] = useState(false);

  // High-performance DOM-based mouse tracker
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (glowRef.current) {
        window.requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          }
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Lock body scroll during intro
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIntroFinished(true);
      document.body.style.overflow = "auto";
    }, 2800);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  const experiences = [
    {
      role: 'Software Development Engineer',
      company: 'Pratishthan Ventures Pvt Ltd',
      duration: 'Aug 2025 – Present',
      description: 'Led end-to-end architectural migration of Data-Katalyst from legacy Django to React & DRF. Developed an AI-driven educational platform for Data Engineering with automated evaluation systems.'
    },
    {
      role: 'Software Development Intern',
      company: 'Pratishthan Ventures Pvt Ltd',
      duration: 'Feb 2025 – Aug 2025',
      description: 'Implemented RAG pipeline for intelligent querying of financial documents. Built dynamic D3.js dashboards and user management frontends.'
    },
    {
      role: 'MCF Intern',
      company: 'Master Control Facility, ISRO',
      duration: 'Sept 2024',
      description: 'Conducted numerical analysis on spacecraft telemetry data for anomaly detection. Developed standalone application for data processing and visualization.'
    }
  ];

  const skills = [
    { name: 'AI & LLM Ops', icon: <Cpu className="w-5 h-5" />, desc: 'LangChain, LangGraph, Ollama, Hugging Face', level: 'Advanced' },
    { name: 'Full-Stack Web', icon: <Code className="w-5 h-5" />, desc: 'React, Django, FastMCP, Node.js', level: 'Meta Certified' },
    { name: 'Cloud & DevOps', icon: <Layers className="w-5 h-5" />, desc: 'AWS, GCP, Azure, Docker, CI/CD', level: 'Google Certified' },
    { name: 'UI/UX & Data Viz', icon: <Palette className="w-5 h-5" />, desc: 'Figma, D3.js, TailwindCSS', level: 'Google Certified' },
    { name: 'Data & Database', icon: <Database className="w-5 h-5" />, desc: 'ChromaDB, PostgreSQL, SQL', level: 'Proficient' },
    { name: 'Programming', icon: <Terminal className="w-5 h-5" />, desc: 'Python, JavaScript, Java, C++', level: 'Expert' }
  ];

  const projects = [
    {
      title: "Local-Mcp-Router",
      description: "Local-first LLM routing platform compressing oversized IDE prompts and delegating tasks intelligently.",
      tech: ["Python", "FastMCP", "Ollama"],
      link: "https://github.com/Deekshith9238/local-ide-mcp",
      image: "/projects/mcp_router.png"
    },
    {
      title: "FindMyHelper",
      description: "Comprehensive platform connecting users with local service providers for home repairs.",
      tech: ["React", "PostgreSQL", "Express"],
      link: "https://github.com/Deekshith9238/fmh-2",
      image: "/projects/find_my_helper.png"
    },
    {
      title: "Vehicle Damage Detection",
      description: "Advanced ML model analyzing vehicle damage with 95% accuracy using CNNs.",
      tech: ["Python", "TensorFlow", "CNN"],
      link: "#",
      image: "/projects/vehicle_damage.png"
    },
    {
      title: "Anomaly User Detection",
      description: "Evaluated neural networks for real-time anomaly detection on IoT environments.",
      tech: ["Python", "TensorFlow", "Pandas"],
      link: "#",
      image: "/projects/anomaly_user.png"
    }
  ];

  const awards = [
    { title: "Pratishthan Hackathon 2.0", desc: "Developed an autonomous multi-agent AI system mapped directly to source code logic." },
    { title: "MTES Best Outgoing Student", desc: "Gold Medalist at Malnad College of Engineering." },
    { title: "IndiaAI Fellowship", desc: "Top 10 nationwide for exceptional skills in AI research." },
    { title: "National Hackathon", desc: "Runner-Up in national problem-solving and innovation." }
  ];

  // Helper arrays/variants
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  return (
    <div className="bg-zinc-950 text-zinc-300 font-sans selection:bg-zinc-800 selection:text-white min-h-screen relative">
      {/* Background Interactive Cursor Glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full bg-white/[0.06] blur-[120px] pointer-events-none z-40 transition-transform duration-500 ease-out will-change-transform"
      />

      {/* Intro Preloader Animation */}
      <AnimatePresence>
        {!introFinished && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl md:text-5xl font-serif tracking-[0.2em] uppercase mb-4">Deekshith</span>
              <div className="w-[1px] h-12 bg-zinc-800 my-2 overflow-hidden relative">
                 <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-zinc-300"
                 />
              </div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest mt-2 font-mono">Initializing Profile</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : -20 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="fixed w-full top-0 z-50 mix-blend-difference px-6 md:px-12 py-6 flex justify-between items-center"
      >
        <div className="text-xl font-serif tracking-widest text-white uppercase cursor-pointer">
          <span className="font-bold">DHU.</span>
        </div>
        <div className="hidden md:flex gap-10 text-xs font-medium tracking-[0.2em] text-white uppercase">
          <a href="#about" className="hover:text-zinc-400 transition-colors duration-500">About</a>
          <a href="#experience" className="hover:text-zinc-400 transition-colors duration-500">Experience</a>
          <a href="#projects" className="hover:text-zinc-400 transition-colors duration-500">Works</a>
          <a href="#contact" className="hover:text-zinc-400 transition-colors duration-500">Contact</a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-12 pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/10 via-zinc-950 to-zinc-950 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 flex flex-col items-start w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: introFinished ? 1 : 0, scale: introFinished ? 1 : 0.95 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="mb-8 border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm rounded-full px-5 py-2 inline-flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
              </span>
              Gold Medalist & IndiaAI Fellow
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : 40 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-[7.5rem] font-serif tracking-tighter leading-[0.95] text-zinc-100 uppercase mb-6"
            >
              Intelligent <br />
              <span className="text-zinc-500 italic font-light">& Architecture.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : 30 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
              className="max-w-xl flex flex-col gap-8 w-full pt-8 border-t border-zinc-800/50"
            >
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-light tracking-wide">
                Engineering autonomous AI systems and building meticulously crafted interfaces. Based in Bengaluru, redefining capabilities at the intersection of intelligence and design.
              </p>
            </motion.div>
          </div>

          {/* Hero Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ 
              opacity: introFinished ? 1 : 0, 
              filter: introFinished ? "blur(0px)" : "blur(10px)",
              scale: introFinished ? 1 : 0.95 
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="w-full md:w-[400px] h-[450px] md:h-[600px] relative rounded-t-full rounded-b-3xl overflow-hidden border border-zinc-800 bg-zinc-900 group"
          >
            <img 
              src="/projects/mine.jpeg" 
              alt="Deekshith" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/80"></div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: introFinished ? 1 : 0 }}
           transition={{ delay: 1.5, duration: 1 }}
           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
        >
           <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
           <motion.div 
             animate={{ y: [0, 8, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
             <ArrowDown className="w-4 h-4" />
           </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 md:py-48 px-6 md:px-12 bg-[#050505] border-y border-zinc-900 relative">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center"
        >
          <motion.div variants={fadeUp} className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">Bridging profound AI theory with pristine experiences.</h2>
            <p className="text-zinc-400 leading-relaxed text-lg font-light">
              Graduating as the best outgoing student from Malnad College of Engineering. 
              Currently pushing boundaries at Pratishthan Software Ventures by fusing high-performance decoupled backends with meticulous, cinematic frontends.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {awards.map((award, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                className="group p-8 border border-zinc-900 hover:border-zinc-700 transition-colors duration-700 bg-zinc-900/10"
              >
                <Award className="w-5 h-5 text-zinc-600 mb-6 group-hover:text-zinc-300 transition-colors duration-500" />
                <h4 className="font-serif text-lg text-white mb-2">{award.title}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-light">{award.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-32 md:py-48 px-6 md:px-12 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="mb-24 flex items-center justify-between"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tighter">Experience</h2>
          <div className="hidden md:block text-zinc-500 uppercase tracking-[0.3em] text-xs">Professional Journey</div>
        </motion.div>

        <div className="relative border-l border-zinc-800/50 md:border-none pl-6 md:pl-0">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800/50 transform -translate-x-1/2"></div>

          <div className="space-y-24">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`hidden md:block w-1/2 ${idx % 2 === 0 ? 'pl-20' : 'pr-20 text-right'}`}>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{exp.duration}</span>
                </div>
                
                <div className="absolute -left-[28px] md:left-1/2 top-1 w-2 h-2 bg-zinc-400 rounded-full md:-translate-x-1/2 ring-4 ring-zinc-950 z-10 transition-transform duration-700 hover:scale-150 cursor-pointer"></div>
                
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                  <div className="md:hidden block mb-4 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{exp.duration}</div>
                  <h3 className="text-2xl font-serif text-white mb-2">{exp.role}</h3>
                  <div className={`text-zinc-500 text-xs tracking-widest uppercase flex items-center gap-2 mb-6 ${idx % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <Briefcase className="w-3 h-3" /> {exp.company}
                  </div>
                  <p className="text-zinc-400 leading-relaxed font-light text-sm md:text-base">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Arsenal */}
      <section id="skills" className="py-32 px-6 md:px-12 bg-zinc-900/20 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="mb-16 text-center"
          >
             <h2 className="text-[10px] text-zinc-500 tracking-[0.4em] uppercase mb-6 font-mono">Architecture & Tools</h2>
             <div className="w-[1px] h-12 bg-zinc-800 mx-auto"></div>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-zinc-900"
          >
            {skills.map((skill, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                className="bg-zinc-950 p-10 group hover:bg-[#0a0a0a] transition-colors duration-700"
              >
                <div className="text-zinc-700 mb-8 transform group-hover:scale-110 group-hover:text-zinc-400 transition-all duration-500 origin-left">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-serif text-zinc-200 mb-2">{skill.name}</h3>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4 font-mono">{skill.level}</p>
                <p className="text-sm text-zinc-500 leading-relaxed font-light">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Selected Works */}
      <section id="projects" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-900 pb-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tighter">Selected Works</h2>
          <p className="text-zinc-500 font-light max-w-sm md:text-right text-sm leading-relaxed">
            A curated exhibition of engineering projects embodying precision and intelligence.
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
        >
          {projects.map((project, idx) => (
            <motion.a 
              href={project.link} 
              key={idx} 
              variants={fadeUp}
              target={project.link !== '#' ? "_blank" : undefined}
              rel={project.link !== '#' ? "noopener noreferrer" : undefined}
              className="group block relative"
            >
              <div className="w-full aspect-[4/3] bg-[#050505] mb-8 overflow-hidden relative border border-zinc-900/50 group-hover:border-zinc-700/50 transition-colors duration-500">
                 {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105 pointer-events-none" />
                 ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-800/10 to-transparent"></div>
                 )}
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/[0.02] transition-opacity duration-1000"></div>
                 <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full border border-zinc-500/30 flex items-center justify-center text-zinc-300 backdrop-blur-md bg-zinc-950/50 group-hover:bg-white group-hover:text-zinc-950 transition-all duration-700 transform group-hover:-translate-y-2 group-hover:translate-x-2 z-20">
                    <ArrowUpRight className="w-5 h-5" />
                 </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-2xl font-serif text-zinc-200 mb-3 group-hover:text-white transition-colors duration-500">{project.title}</h3>
                <p className="text-zinc-500 mb-6 font-light leading-relaxed text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
                      {t}{i < project.tech.length - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Initiation / Contact */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-zinc-950 flex flex-col items-center justify-center text-center border-t border-zinc-900">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           transition={{ duration: 1 }}
           className="max-w-3xl flex flex-col items-center"
        >
          <span className="text-[10px] text-zinc-500 tracking-[0.4em] uppercase mb-6 font-mono">Next Steps</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-10 tracking-tight">Ready to build something extraordinary?</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="mailto:deekshith9238@gmail.com" className="h-14 px-10 flex items-center justify-center rounded-full bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-200 transition-colors duration-500 tracking-wide">
              Contact Me
            </a>
            <a href="/Deekshith.pdf" download="Deekshith_Resume.pdf" className="h-14 px-10 flex items-center justify-center rounded-full bg-transparent border border-zinc-700 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors duration-500 tracking-wide">
              Download Resume
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 md:px-12 border-t border-zinc-900 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          
          <div className="text-2xl font-serif tracking-widest text-white uppercase">
            <span className="font-bold">DHU.</span>
          </div>

          <p className="text-zinc-600 text-xs tracking-widest font-mono uppercase">
            © {new Date().getFullYear()} DEEKSHITH H U. <br className="md:hidden mt-2"/> DESIGNED & ENGINEERED FOR EXCELLENCE.
          </p>

          <div className="flex items-center gap-6 text-sm font-medium tracking-widest uppercase">
            <a href="https://linkedin.com/in/deekshith-h-u" className="text-zinc-500 hover:text-white transition-colors duration-500">
              LinkedIn
            </a>
            <a href="mailto:deekshith9238@gmail.com" className="text-zinc-500 hover:text-white transition-colors duration-500">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
