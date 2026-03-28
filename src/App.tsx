import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Cpu, 
  Database, 
  Layers, 
  Zap, 
  Code2, 
  Cloud, 
  FileText, 
  ArrowRight, 
  Terminal, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Activity,
  ShieldCheck,
  Rocket,
  Github,
  Linkedin,
  Bike,
  Music,
  Wind
} from 'lucide-react';

// --- Types ---
interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  tech: string[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  stakeholding: string[];
  management: string[];
  visual?: React.ReactNode;
}

// --- Data ---
const EXPERIENCE: Experience[] = [
  {
    company: "Riskcovry",
    role: "Senior Software Developer",
    period: "2023-09 - Current",
    description: [
      "Architected AI-powered document extraction services using Python, LangChain, and AWS Textract.",
      "Optimized Node.js microservices for insurance policy creation and partner onboarding.",
      "Integrated ML pipelines cutting manual processing effort significantly.",
      "Enhanced performance with optimized PostgreSQL queries and reusable SQLAlchemy utilities."
    ],
    tech: ["Node.js", "Python", "FastAPI", "LangChain", "AWS", "PostgreSQL", "Docker"]
  },
  {
    company: "LeadSquared",
    role: "Associate SDE",
    period: "2022-04 - 2023-09",
    description: [
      "Redesigned custom application structures, reducing overhead costs by 23%.",
      "Increased application closure rate by 20% through interactive solutions.",
      "Built ML models for SOW creation and universal connector platforms.",
      "Awarded 'Dashing Debut' for outstanding performance."
    ],
    tech: ["React.js", "Node.js", "AWS Lambda", "SQL", "Python"]
  }
];

const SKILLS = {
  backend: ["Node.js", "Python (FastAPI)", "Microservices", "API Design"],
  frontend: ["React.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
  cloud: ["AWS (Lambda, S3, EC2)", "Docker", "CI/CD", "Terraform"],
  ai: ["LangChain", "AWS Textract", "OCR (Tesseract)", "NLP"]
};

// --- Components ---

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  key?: React.Key;
}

const GlassCard = ({ children, className = "", hover = true }: GlassCardProps) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hover ? { y: -5, borderColor: "rgba(0, 242, 255, 0.4)" } : {}}
      className={`glass-card p-6 transition-colors duration-300 relative overflow-hidden group ${className}`}
    >
      {/* Interactive Glow */}
      {hover && (
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            x: glowPos.x - 100,
            y: glowPos.y - 100,
          }}
          transition={{ type: "tween", ease: "linear", duration: 0 }}
          className="absolute top-0 left-0 w-48 h-48 bg-cyber-blue/10 blur-3xl rounded-full pointer-events-none z-0"
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold tracking-tighter mb-4"
    >
      {title}<span className="text-cyber-blue">.</span>
    </motion.h2>
    {subtitle && <p className="text-white/50 max-w-2xl">{subtitle}</p>}
  </div>
);

const VisualPipeline = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const steps = [
    { icon: FileText, label: "Input", sub: "PDF/Image", color: "text-white", details: "Multi-format ingestion engine" },
    { icon: Cpu, label: "Logic", sub: "LangChain/FastAPI", color: "text-cyber-blue", details: "LLM-orchestrated reasoning" },
    { icon: Layers, label: "OCR", sub: "AWS Textract", color: "text-cyber-blue", details: "High-accuracy spatial extraction" },
    { icon: Database, label: "Output", sub: "Structured Data", color: "text-green-400", details: "Validated JSON/Schema output" },
  ];

  return (
    <div className="relative py-16 px-8 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
              className="flex flex-col items-center text-center group relative cursor-help"
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-cyber-blue/50 transition-all duration-500 shadow-2xl backdrop-blur-md ${step.color}`}>
                <step.icon size={32} />
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-2xl border border-cyber-blue/0 group-hover:border-cyber-blue/50 group-hover:scale-125 transition-all duration-700 opacity-0 group-hover:opacity-100" />
              </div>
              <div className="mt-6">
                <h4 className="font-black text-xs tracking-[0.2em] uppercase text-white/90">{step.label}</h4>
                <p className="text-[10px] font-mono text-white/30 mt-2 uppercase tracking-widest">{step.sub}</p>
              </div>

              {/* Tooltip-style details */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 p-3 bg-cyber-dark/90 border border-cyber-blue/20 rounded-lg text-[10px] text-white/60 backdrop-blur-xl z-20 pointer-events-none"
                  >
                    {step.details}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {idx < steps.length - 1 && (
              <div className="hidden md:flex flex-1 items-center justify-center relative h-px min-w-[60px]">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: idx * 0.2 + 0.3, duration: 0.8 }}
                  className="w-full h-[2px] bg-gradient-to-r from-cyber-blue/0 via-cyber-blue to-cyber-blue/0 origin-left"
                />
                {/* Moving data packet */}
                <motion.div
                  animate={{ x: [-40, 40], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.5 }}
                  className="absolute w-1 h-1 bg-cyber-blue rounded-full shadow-[0_0_10px_#00f2ff]"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-16 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-white/60 italic text-sm font-light tracking-wide max-w-2xl mx-auto"
        >
          "Architected a scalable pipeline for Motor, Health, and COI document automation."
        </motion.p>
      </div>
      {/* Background Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
};

const TerminalProject = ({ project }: { project: Project, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <div className="bg-[#0D0D0D] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-white/5 border-b border-white/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">{project.title.toLowerCase().replace(/\s+/g, '_')}.sh</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-mono text-cyber-blue/60">
            <span className="animate-pulse">●</span> EXECUTING
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-8 font-mono">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-cyber-blue">$</span>
              <span className="text-white/90 text-sm">cat project_overview.txt</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 pl-4 border-l border-white/10">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3 text-cyber-blue">
                <Terminal size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Technical</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-[9px] text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3 text-purple-400">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Stakeholding</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stakeholding.map(s => (
                  <span key={s} className="text-[9px] text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3 text-green-400">
                <Layers size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Management</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.management.map(m => (
                  <span key={m} className="text-[9px] text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {project.visual && (
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-cyber-blue">$</span>
                <span className="text-white/90 text-sm">run visual_simulation.exe</span>
              </div>
              {project.visual}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
const PipelineBuilder = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const nodes = [
    { id: 1, label: "Ingestion", type: "trigger" },
    { id: 2, label: "Validation", type: "process" },
    { id: 3, label: "Extraction", type: "process" },
    { id: 4, label: "DB Sync", type: "action" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold neon-text">Interactive Workflow Builder</h3>
        <p className="text-white/60 text-sm leading-relaxed">
          Streamlining technical workflows through modular architecture. Click nodes to simulate the pipeline flow.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Scalable', 'Event-Driven', 'Cloud-Native'].map(tag => (
            <span key={tag} className="px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full text-[10px] uppercase tracking-widest text-cyber-blue">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-black/40 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
        <div className="flex flex-col gap-4 relative z-10">
          {nodes.map((node, idx) => (
            <motion.div
              key={node.id}
              layoutId={`node-${node.id}`}
              onClick={() => setActiveNode(node.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeNode === node.id 
                  ? "bg-cyber-blue/20 border-cyber-blue shadow-[0_0_20px_rgba(0,242,255,0.2)]" 
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">0{idx + 1}</span>
                <span className="text-sm font-bold">{node.label}</span>
                <div className={`w-2 h-2 rounded-full ${activeNode === node.id ? "bg-cyber-blue animate-pulse" : "bg-white/20"}`} />
              </div>
            </motion.div>
          ))}
        </div>
        {/* Decorative lines */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyber-blue/5 to-transparent" />
      </div>
    </div>
  );
};

const PROJECTS: Project[] = [
  {
    title: "AI Document Extraction Service",
    description: "Architected an end-to-end extraction engine for Motor, Health, and COI documents using LLMs and OCR. Reduced manual verification time by 70%.",
    tech: ["Python", "FastAPI", "LangChain", "AWS Textract", "Tesseract"],
    stakeholding: ["Partner Onboarding", "Requirement Gathering", "SLA Definition"],
    management: ["Sprint Planning", "Technical Documentation", "Resource Allocation"],
    visual: <VisualPipeline />
  },
  {
    title: "Interactive Workflow Builder",
    description: "Developed a modular, event-driven system for building complex technical workflows, enabling rapid deployment of insurance products.",
    tech: ["Node.js", "React.js", "PostgreSQL", "Docker", "Event-Driven Arch"],
    stakeholding: ["Product Strategy", "User Feedback Loops", "Cross-team Sync"],
    management: ["Architecture Review", "CI/CD Implementation", "Code Standards"],
    visual: <PipelineBuilder />
  },
  {
    title: "Insurance Policy Microservices",
    description: "High-throughput microservices handling real-time policy creation and partner onboarding for enterprise insurance providers.",
    tech: ["Node.js", "Express", "PostgreSQL", "Redis", "AWS Lambda"],
    stakeholding: ["Partner Integration Support", "Compliance Audits"],
    management: ["On-call Rotation", "Performance Monitoring", "Scalability Planning"],
  },
  {
    title: "Universal Connector Platform",
    description: "A centralized platform for connecting diverse third-party APIs into a unified internal ecosystem, reducing integration time by 40%.",
    tech: ["Python", "AWS Lambda", "SQL", "REST APIs"],
    stakeholding: ["Vendor Management", "API Governance"],
    management: ["Feature Prioritization", "Technical Debt Reduction"],
  }
];

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  // Parallax transforms for different layers
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -150]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [0, 5]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative bg-cyber-dark selection:bg-cyber-blue/30 overflow-x-hidden">
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200] bg-cyber-dark flex flex-col items-center justify-center font-mono"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-cyber-blue text-xs tracking-[0.5em] mb-4"
            >
              INITIALIZING_SYSTEM_CORE
            </motion.div>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full bg-cyber-blue shadow-[0_0_15px_#00f2ff]"
              />
            </div>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="mt-8 text-[10px] text-white/20 uppercase tracking-widest"
            >
              Establishing Secure Connection...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cyber-blue z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Mouse Spotlight */}
      <motion.div 
        animate={{ 
          x: mousePos.x - 400, 
          y: mousePos.y - 400 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100, mass: 0.5 }}
        className="fixed top-0 left-0 w-[800px] h-[800px] bg-cyber-blue/5 blur-[120px] rounded-full pointer-events-none z-0 opacity-50"
      />

      {/* Noise Overlay */}
      <div className="fixed inset-0 noise-overlay z-50 pointer-events-none" />

      {/* Scanline Effect */}
      <div className="fixed inset-0 z-[51] pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Parallax Background Elements */}
      <div className="fixed inset-0 -z-20 bg-cyber-dark overflow-hidden">
        <motion.div 
          style={{ y: layer1Y }}
          className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-cyber-blue/10 blur-[150px] rounded-full" 
        />
        <motion.div 
          style={{ y: layer3Y }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 blur-[120px] rounded-full" 
        />
        <motion.div 
          style={{ y: layer2Y }}
          className="absolute top-[40%] right-[10%] w-[20vw] h-[20vw] bg-cyber-blue/5 blur-[100px] rounded-full" 
        />
        
        {/* Floating Cyber Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [0, -Math.random() * 1000 - 500]),
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            className="absolute w-px h-20 bg-gradient-to-b from-cyber-blue/20 to-transparent opacity-20"
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[60] px-8 py-8 flex justify-between items-center backdrop-blur-xl bg-cyber-dark/40 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-cyber-blue flex items-center justify-center text-cyber-dark text-sm">A</div>
          <span>ABHISHEK<span className="text-cyber-blue">.K</span></span>
        </motion.div>
        <div className="hidden md:flex gap-10 text-[10px] font-black tracking-[0.3em] uppercase text-white/40">
          {['Work', 'Projects', 'Impact', 'Contact'].map(item => (
            <a key={item} href={`#${item === 'Projects' ? 'projects' : item === 'Impact' ? 'excellence' : item.toLowerCase()}`} className="hover:text-cyber-blue transition-all relative group">
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-cyber-blue transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-8 overflow-hidden">
        <motion.div 
          style={{ y: heroY, rotateX }}
          className="text-center z-10 perspective-1000"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyber-blue/5 border border-cyber-blue/20 text-cyber-blue text-[10px] font-black tracking-[0.4em] uppercase mb-10 backdrop-blur-sm"
          >
            <Activity size={12} className="animate-pulse" />
            Senior Software Developer (Backend Focused)
          </motion.div>
          
          <div className="relative">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-[0.85] mb-4 relative"
            >
              SYSTEMS<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-cyber-blue to-cyber-blue/20">DESIGNED.</span>
              
              {/* Subtle Glitch Layers */}
              <motion.span 
                animate={{ x: [-1, 1, -1], opacity: [0, 0.3, 0] }}
                transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
                className="absolute inset-0 text-cyber-blue/20 -z-10 translate-x-1"
              >
                SYSTEMS<br />DESIGNED.
              </motion.span>
            </motion.h1>
            {/* Decorative background text */}
            <div className="absolute -top-10 -left-10 text-[20rem] font-black text-white/[0.02] -z-10 select-none pointer-events-none">
              01
            </div>
            {/* System Log Overlay */}
            <div className="absolute top-1/2 -right-20 hidden xl:block w-64 text-left font-mono text-[8px] text-cyber-blue/30 leading-tight select-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                [INIT] BOOT_SEQUENCE_ALPHA<br />
                [OK] KERNEL_LOADED<br />
                [OK] NEURAL_ENGINE_ACTIVE<br />
                [OK] PIPELINE_STABLE_v2.4<br />
                [WARN] LATENCY_MINIMIZED<br />
                [OK] ARCHITECTURE_READY
              </motion.div>
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 text-white/40 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed tracking-wide"
          >
            Building high-performance backend ecosystems where <span className="text-white/80 font-medium">AI meets scalable infrastructure</span>. 
            Specializing in document intelligence, distributed microservices, and partner-driven insurance solutions.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-14 flex flex-wrap justify-center gap-6"
          >
            <a href="#projects" className="group relative px-10 py-5 overflow-hidden rounded-xl bg-cyber-blue text-cyber-dark font-black text-xs uppercase tracking-widest transition-all hover:scale-105">
              <span className="relative z-10">View Major Projects</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </a>
            <a href="#contact" className="group px-10 py-5 border border-white/10 hover:border-cyber-blue/50 hover:bg-cyber-blue/5 font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-3">
              Contact Me
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        {/* Dynamic Background Grid */}
        <div className="absolute inset-0 -z-10 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </section>

      {/* Major Projects Showcase */}
      <section id="projects" className="py-32 px-8 max-w-7xl mx-auto relative">
        <SectionTitle 
          title="Major Projects" 
          subtitle="A selection of high-impact systems I've developed, focusing on scalability, AI integration, and operational excellence."
        />
        <div className="space-y-12">
          {PROJECTS.map((project, idx) => (
            <TerminalProject key={idx} project={project} />
          ))}
        </div>
      </section>

      {/* Engineering Excellence (Kill-List) */}
      <section id="excellence" className="py-32 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionTitle 
            title="Strategic Impact" 
            subtitle="Strategic interventions that eliminated technical debt and maximized operational efficiency."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Performance Tuning",
                icon: Zap,
                color: "text-cyber-blue",
                bg: "bg-cyber-blue/10",
                desc: "Optimized PostgreSQL queries and Node.js microservices, significantly reducing API latency and improving throughput across the board."
              },
              {
                title: "System Redesign",
                icon: Activity,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
                desc: "Refactored legacy custom application structures, cutting overhead costs by 23% and drastically lowering churn rate for enterprise clients."
              },
              {
                title: "Code Quality",
                icon: ShieldCheck,
                color: "text-green-400",
                bg: "bg-green-500/10",
                desc: "Introduced reusable utility libraries and standardized API-driven insurance solutions to accelerate partner integrations by 40%."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard className="group h-full flex flex-col p-10">
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-8 ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 tracking-tight">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light">
                    "{item.desc}"
                  </p>
                  <div className="mt-auto pt-8 flex items-center gap-2 text-[10px] font-black text-cyber-blue uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    View Case Study <ArrowRight size={12} />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Decorative background number */}
        <div className="absolute top-0 right-0 text-[30rem] font-black text-white/[0.01] select-none pointer-events-none -translate-y-1/2">
          02
        </div>
      </section>

      {/* Interactive Pipeline Builder */}
      {/* Removed as it is now inside Major Projects */}

      {/* Work History */}
      <section id="work" className="py-32 px-8 max-w-7xl mx-auto relative">
        <SectionTitle title="Experience" />
        <div className="space-y-12">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="relative overflow-hidden group p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">{exp.role}</h3>
                    <div className="flex items-center gap-3">
                      <p className="text-cyber-blue font-black text-sm uppercase tracking-widest">{exp.company}</p>
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{exp.period}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {exp.tech.slice(0, 3).map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-white/40 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-4 text-white/50 text-sm md:text-base leading-relaxed font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue/40 shrink-0 mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  {exp.tech.map(t => (
                    <span key={t} className="px-4 py-1.5 bg-white/[0.02] border border-white/5 rounded-full text-[10px] font-mono text-white/30 hover:text-cyber-blue hover:border-cyber-blue/30 transition-all cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
                {/* Background Glow on Hover */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyber-blue/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-32 px-8 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Technical Arsenal" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {Object.entries(SKILLS).map(([category, items], idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-white/10" />
                  {category}
                </h4>
                <div className="space-y-5">
                  {items.map(skill => (
                    <div key={skill} className="flex items-center gap-4 group cursor-default">
                      <div className="w-2 h-2 rounded-sm border border-cyber-blue/30 group-hover:bg-cyber-blue group-hover:rotate-45 transition-all duration-300" />
                      <span className="text-sm md:text-base text-white/60 group-hover:text-white transition-colors font-light">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies & Personal */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <SectionTitle title="Beyond Architecture" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Bike, title: "Motorcycling", color: "text-cyber-blue", desc: "Long-distance riding & exploring the unknown." },
            { icon: Music, title: "Audio Production", color: "text-purple-400", desc: "Recording, mixing & digital sound design." },
            { icon: Wind, title: "Perfumery", color: "text-green-400", desc: "The art of fragrance blending & olfactory design." }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group"
            >
              <GlassCard className="flex flex-col items-center text-center p-12 h-full">
                <div className={`${item.color} mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="py-32 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-none"
            >
              LET'S BUILD<br /><span className="text-cyber-blue">THE FUTURE.</span>
            </motion.h2>
            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email", value: "abhisheku3u@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 8296604013" },
                { icon: MapPin, label: "Location", value: "Bengaluru, KA 560062" }
              ].map((info, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-hover:text-cyber-blue group-hover:border-cyber-blue/50 transition-all">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{info.label}</p>
                    <p className="text-lg text-white/70 group-hover:text-white transition-colors">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 flex gap-8">
              <Linkedin className="text-white/20 hover:text-cyber-blue cursor-pointer transition-all hover:scale-110" size={24} />
              <Github className="text-white/20 hover:text-cyber-blue cursor-pointer transition-all hover:scale-110" size={24} />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-12 border-cyber-blue/10">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Identifier</label>
                    <input type="text" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:border-cyber-blue outline-none transition-all placeholder:text-white/10" placeholder="Your Name" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Channel</label>
                    <input type="email" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:border-cyber-blue outline-none transition-all placeholder:text-white/10" placeholder="email@domain.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Transmission</label>
                  <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:border-cyber-blue outline-none transition-all h-40 placeholder:text-white/10 resize-none" placeholder="Describe the mission..." />
                </div>
                <button className="group w-full py-5 bg-cyber-blue text-cyber-dark font-black text-xs uppercase tracking-[0.4em] rounded-xl hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] transition-all flex items-center justify-center gap-4">
                  Initiate Handshake
                  <Rocket size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
        
        {/* Footer Background Text */}
        <div className="absolute bottom-0 left-0 w-full text-[15vw] font-black text-white/[0.02] select-none pointer-events-none leading-none translate-y-1/2">
          ARCHITECT
        </div>
        
        <div className="mt-32 text-center relative z-10">
          <div className="inline-block px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[10px] font-black tracking-[0.8em] text-white/10 uppercase">
            © 2026 ABHISHEK K // SYSTEM_READY
          </div>
        </div>
      </footer>
    </div>
  );
}
