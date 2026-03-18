/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Gamepad2, 
  Layers, 
  Zap,
  ArrowUpRight,
  Github,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
  year: string;
}

// --- Translations ---
const translations = {
  en: {
    dir: 'ltr',
    nav: {
      home: '01. HOME',
      work: '02. WORK',
      stack: '03. STACK',
      contact: '04. CONTACT',
      home_mob: 'Home',
      work_mob: 'Projects',
      stack_mob: 'Stack',
      contact_mob: 'Contact',
    },
    hero: {
      location: 'Based in Tunisia',
      title_1: 'YOUSSEF',
      title_2: 'DH.',
      desc: 'A creative developer specializing in AI systems and interactive game mechanics. Bridging the gap between logic and play.',
      cta: 'View Work',
      scroll: 'Scroll to explore',
    },
    stack: {
      title_1: 'MY DIGITAL',
      title_2: 'ARSENAL.',
      desc: 'I leverage the most powerful modern technologies to build scalable, high-performance applications that push the boundaries of what\'s possible on the web.',
    },
    projects: {
      title_1: 'SELECTED',
      title_2: 'WORKS.',
      total: 'Total Projects',
      view: 'View Project',
      warda_desc: "A high-energy digital party game platform featuring 'Spin & Reveal' mechanics. Includes customizable intensity levels and supports up to 12 players.",
      jozef_desc: "A comprehensive AI Multimedia Engine with a modular interface. Features dedicated systems for Generation, Editing, and Motion.",
      bloom_desc: "A premium e-commerce experience curated for 'modern souls'. Features high-performance product discovery and elegant minimalist aesthetic.",
    },
    contact: {
      title_1: "LET'S",
      title_2: 'TALK.',
    },
    footer: {
      desc: 'Designed for the future.',
      specialty: 'AI & Game Development',
    },
    loader: 'Initializing Experience',
  },
  ar: {
    dir: 'rtl',
    nav: {
      home: '٠١. الرئيسية',
      work: '٠٢. أعمالي',
      stack: '٠٣. مهاراتي',
      contact: '٠٤. اتصل بي',
      home_mob: 'الرئيسية',
      work_mob: 'أعمالي',
      stack_mob: 'مهاراتي',
      contact_mob: 'اتصل بي',
    },
    hero: {
      location: 'مقرّي في تونس',
      title_1: 'YOUSSEF',
      title_2: 'DH.',
      desc: 'مطور مبدع متخصص في أنظمة الذكاء الاصطناعي وميكانيكا الألعاب التفاعلية. الجسر بين المنطق واللعب.',
      cta: 'عرض الأعمال',
      scroll: 'مرر للاستكشاف',
    },
    stack: {
      title_1: 'ترسانتي',
      title_2: 'الرقمية.',
      desc: 'أستخدم أقوى التقنيات الحديثة لبناء تطبيقات قابلة للتوسع وعالية الأداء تتجاوز حدود الممكن على الويب.',
    },
    projects: {
      title_1: 'أعمال',
      title_2: 'مختارة.',
      total: 'إجمالي المشاريع',
      view: 'عرض المشروع',
      warda_desc: "منصة ألعاب حفلات رقمية عالية الحماس تتميز بميكانيكا 'لف واكشف'. تتضمن مستويات شدة قابلة للتخصيص وتدعم ما يصل إلى 12 لاعبًا.",
      jozef_desc: "محرك وسائط متعددة شامل يعمل بالذكاء الاصطناعي مع واجهة نمطية. يتميز بأنظمة مخصصة للتوليد والتحرير والحركة.",
      bloom_desc: "تجربة تجارة إلكترونية متميزة منسقة لـ 'الأرواح الحديثة'. تتميز باكتشاف المنتجات عالي الأداء وجمالية بسيطة وأنيقة.",
    },
    contact: {
      title_1: 'لنبدأ',
      title_2: 'الحديث.',
    },
    footer: {
      desc: 'صُمم للمستقبل.',
      specialty: 'الذكاء الاصطناعي وتطوير الألعاب',
    },
    loader: 'جاري تهيئة التجربة',
  },
  fr: {
    dir: 'ltr',
    nav: {
      home: '01. ACCUEIL',
      work: '02. TRAVAUX',
      stack: '03. STACK',
      contact: '04. CONTACT',
      home_mob: 'Accueil',
      work_mob: 'Projets',
      stack_mob: 'Stack',
      contact_mob: 'Contact',
    },
    hero: {
      location: 'Basé en Tunisie',
      title_1: 'YOUSSEF',
      title_2: 'DH.',
      desc: 'Un développeur créatif spécialisé dans les systèmes d\'IA et les mécaniques de jeu interactives. Faire le pont entre la logique et le jeu.',
      cta: 'Voir les Travaux',
      scroll: 'Défiler pour explorer',
    },
    stack: {
      title_1: 'MON ARSENAL',
      title_2: 'NUMÉRIQUE.',
      desc: 'J\'utilise les technologies modernes les plus puissantes pour créer des applications évolutives et performantes qui repoussent les limites du possible sur le web.',
    },
    projects: {
      title_1: 'TRAVAUX',
      title_2: 'SÉLECTIONNÉS.',
      total: 'Total Projets',
      view: 'Voir le Projet',
      warda_desc: "Une plateforme de jeux de fête numériques à haute énergie avec des mécaniques 'Spin & Reveal'. Comprend des niveaux d'intensité personnalisables et supporte jusqu'à 12 joueurs.",
      jozef_desc: "Un moteur multimédia IA complet avec une interface modulaire. Dispose de systèmes dédiés à la génération, à l'édition et au mouvement.",
      bloom_desc: "Une expérience e-commerce haut de gamme conçue pour les 'âmes modernes'. Offre une découverte de produits haute performance et une esthétique minimaliste élégante.",
    },
    contact: {
      title_1: 'PARLONS',
      title_2: 'ENSEMBLE.',
    },
    footer: {
      desc: 'Conçu pour le futur.',
      specialty: 'IA & Développement de Jeux',
    },
    loader: 'Initialisation de l\'Expérience',
  }
};

// --- Components ---

const Sidebar = ({ lang, setLang, t }: any) => {
  const [active, setActive] = useState('home');
  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'projects', label: t.nav.work },
    { id: 'stack', label: t.nav.stack },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <div className={`fixed ${t.dir === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'} top-0 h-full w-20 hidden lg:flex flex-col items-center justify-between py-12 border-white/5 z-50 bg-charcoal`}>
      <div className="text-xl font-display font-bold tracking-tighter">
        YD<span className="text-electric-blue">.</span>
      </div>
      
      <div className="flex flex-col gap-12 -rotate-90 origin-center whitespace-nowrap">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setActive(item.id)}
            className={`text-[10px] font-bold tracking-[0.2em] transition-colors ${
              active === item.id ? 'text-electric-blue' : 'text-white/30 hover:text-white'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-3 mb-4">
          {['en', 'ar', 'fr'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`text-[10px] font-bold uppercase transition-colors ${
                lang === l ? 'text-electric-blue' : 'text-white/20 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <a href="#" className="text-white/20 hover:text-white transition-colors"><Instagram size={18} /></a>
        <a href="#" className="text-white/20 hover:text-white transition-colors"><Github size={18} /></a>
      </div>
    </div>
  );
};

const MobileNav = ({ lang, setLang, t }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home_mob },
    { id: 'projects', label: t.nav.work_mob },
    { id: 'stack', label: t.nav.stack_mob },
    { id: 'contact', label: t.nav.contact_mob },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[60] lg:hidden">
      <div className="flex items-center justify-between p-6 backdrop-blur-md bg-charcoal/80 border-b border-white/5">
        <div className="text-xl font-display font-bold tracking-tighter">
          YD<span className="text-electric-blue">.</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            {['en', 'ar', 'fr'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-[10px] font-bold uppercase transition-colors ${
                  lang === l ? 'text-electric-blue' : 'text-white/40'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-charcoal border-b border-white/10 p-8 flex flex-col gap-6 z-50"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-display font-bold ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ t }: any) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 2.2 // Wait for loader
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className={`min-h-screen flex flex-col ${t.dir === 'rtl' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch pt-20 lg:pt-0`}>
      <div className={`flex-1 flex flex-col justify-center px-6 lg:px-24 py-12 lg:py-0 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className={`flex items-center gap-4 mb-8 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className="h-px w-12 bg-electric-blue" />
            <span className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase">{t.hero.location}</span>
          </motion.div>
          
          <motion.h1 variants={item} className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] mb-8">
            {t.hero.title_1}<br />
            <span className="text-stroke">{t.hero.title_2}</span>
          </motion.h1>
          
          <motion.p variants={item} className={`max-w-md text-lg text-white/50 mb-12 leading-relaxed ${t.dir === 'rtl' ? 'mr-0 ml-auto' : ''}`}>
            {t.hero.desc}
          </motion.p>

          <motion.div variants={item} className={`flex flex-wrap gap-6 ${t.dir === 'rtl' ? 'justify-end' : ''}`}>
            <motion.a 
              href="#projects" 
              whileHover={{ x: t.dir === 'rtl' ? -10 : 10 }}
              className={`group flex items-center gap-3 text-sm font-bold tracking-widest uppercase ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}
            >
              {t.hero.cta} 
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-electric-blue group-hover:border-electric-blue group-hover:text-charcoal transition-all duration-300">
                <ArrowUpRight size={20} className={t.dir === 'rtl' ? 'rotate-[-90deg]' : ''} />
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex-1 relative min-h-[400px] lg:min-h-screen overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 1, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Visual"
            className="w-full h-full object-cover grayscale brightness-50 scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${t.dir === 'rtl' ? 'from-transparent to-charcoal' : 'from-charcoal to-transparent'}`} />
        </motion.div>

        <div className={`absolute bottom-12 ${t.dir === 'rtl' ? 'left-12' : 'right-12'} hidden lg:block`}>
          <div className={`flex flex-col ${t.dir === 'rtl' ? 'items-start' : 'items-end'} gap-2`}>
            <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">{t.hero.scroll}</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-electric-blue"
            >
              <ChevronDown size={24} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechStack = ({ t }: any) => {
  const stack = [
    { name: 'Next.js', icon: <Layers size={20} />, color: 'white' },
    { name: 'React', icon: <Code2 size={20} />, color: '#00f3ff' },
    { name: 'Supabase', icon: <Zap size={20} />, color: '#00ff00' },
    { name: 'Tailwind', icon: <Zap size={20} />, color: '#00f3ff' },
    { name: 'Gemini AI', icon: <Cpu size={20} />, color: '#a855f7' },
    { name: 'Game Dev', icon: <Gamepad2 size={20} />, color: '#fb923c' },
  ];

  return (
    <section id="stack" className="py-32 border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-24">
        <div className={`grid lg:grid-cols-2 gap-20 items-center ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className={t.dir === 'rtl' ? 'order-2' : ''}>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              {t.stack.title_1}<br />
              <span className="text-electric-blue">{t.stack.title_2}</span>
            </h2>
            <p className={`text-white/40 max-w-md leading-relaxed ${t.dir === 'rtl' ? 'mr-0 ml-auto' : ''}`}>
              {t.stack.desc}
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-4 ${t.dir === 'rtl' ? 'order-1' : ''}`}>
            {stack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 brutal-border bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
              >
                <div className={`mb-4 text-white/40 group-hover:text-electric-blue transition-colors ${t.dir === 'rtl' ? 'flex justify-end' : ''}`}>
                  {tech.icon}
                </div>
                <h3 className="text-sm font-bold tracking-widest uppercase">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectItem = ({ project, index, t }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group py-12 px-4 -mx-4 border-b border-white/5 flex flex-col ${t.dir === 'rtl' ? 'lg:flex-row-reverse' : 'lg:flex-row'} lg:items-center gap-8 lg:gap-20 hover:bg-white/[0.02] transition-colors duration-500`}
    >
      <div className={`lg:w-24 text-4xl font-display font-bold text-white/10 group-hover:text-electric-blue transition-colors duration-500 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        0{index + 1}.
      </div>

      <div className={`flex-1 ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className={`flex flex-wrap gap-3 mb-4 ${t.dir === 'rtl' ? 'justify-end' : ''}`}>
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-bold tracking-widest uppercase text-white/30 group-hover:text-white/60 transition-colors">
              {tag}
            </span>
          ))}
        </div>
        <h3 className={`text-3xl md:text-5xl font-display font-bold mb-4 transition-transform duration-500 ease-out ${t.dir === 'rtl' ? 'group-hover:-translate-x-4' : 'group-hover:translate-x-4'}`}>
          {project.title}
        </h3>
        <p className={`text-white/40 max-w-xl text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-500 ${t.dir === 'rtl' ? 'mr-0 ml-auto' : ''}`}>
          {project.description}
        </p>
      </div>

      <div className="lg:w-64 aspect-video overflow-hidden brutal-border relative group-hover:border-electric-blue/30 transition-colors duration-500">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />
        <a 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-electric-blue/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"
        >
          <span className="text-charcoal font-bold tracking-widest uppercase text-xs translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{t.projects.view}</span>
        </a>
      </div>
    </motion.div>
  );
};

const Projects = ({ t }: any) => {
  const projects: Project[] = [
    {
      title: "Warda",
      description: t.projects.warda_desc || "A high-energy digital party game platform featuring 'Spin & Reveal' mechanics. Includes customizable intensity levels and supports up to 12 players.",
      link: "https://warda-kappa.vercel.app/",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
      tags: ["Game Dev", "React", "Socket.io"],
      year: "2024"
    },
    {
      title: "AI Jozef",
      description: t.projects.jozef_desc || "A comprehensive AI Multimedia Engine with a modular interface. Features dedicated systems for Generation, Editing, and Motion.",
      link: "https://mr-r.vercel.app/",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
      tags: ["AI Engine", "Automation", "Next.js"],
      year: "2024"
    },
    {
      title: "Twin Bloom",
      description: t.projects.bloom_desc || "A premium e-commerce experience curated for 'modern souls'. Features high-performance product discovery and elegant minimalist aesthetic.",
      link: "https://twin-bloom.vercel.app/",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
      tags: ["E-commerce", "Luxury UI", "Framer Motion"],
      year: "2023"
    }
  ];

  return (
    <section id="projects" className="py-32">
      <div className="container mx-auto px-6 lg:px-24">
        <div className={`flex ${t.dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'} items-end justify-between mb-20`}>
          <h2 className={`text-5xl md:text-8xl font-display font-bold leading-none ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {t.projects.title_1}<br />
            <span className="text-stroke">{t.projects.title_2}</span>
          </h2>
          <div className={`hidden md:block ${t.dir === 'rtl' ? 'text-left' : 'text-right'}`}>
            <span className="text-xs font-bold tracking-widest text-white/20 uppercase">{t.projects.total}: 03</span>
          </div>
        </div>

        <div className="flex flex-col">
          {projects.map((project, idx) => (
            <ProjectItem key={project.title} project={project} index={idx} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ t }: any) => {
  return (
    <section id="contact" className="py-32 bg-white text-charcoal">
      <div className="container mx-auto px-6 lg:px-24">
        <div className={`max-w-4xl ${t.dir === 'rtl' ? 'mr-auto ml-0 text-right' : ''}`}>
          <h2 className="text-6xl md:text-9xl font-display font-bold leading-[0.8] mb-12">
            {t.contact.title_1}<br />
            {t.contact.title_2}
          </h2>
          
          <div className={`flex flex-col md:flex-row gap-12 md:items-center ${t.dir === 'rtl' ? 'md:flex-row-reverse' : ''}`}>
            <a 
              href="mailto:youssefdh840@gmail.com"
              className="text-2xl md:text-4xl font-display font-bold hover:text-electric-blue transition-colors underline decoration-2 underline-offset-8"
            >
              youssefdh840@gmail.com
            </a>
            
            <div className={`flex gap-8 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <a href="https://www.instagram.com/tky_13_web_developer.tn" target="_blank" rel="noopener noreferrer" className="font-bold tracking-widest uppercase text-xs hover:text-electric-blue transition-colors">Instagram</a>
              <a href="#" className="font-bold tracking-widest uppercase text-xs hover:text-electric-blue transition-colors">Github</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ t }: any) => {
  return (
    <footer className="py-12 border-t border-white/5 bg-charcoal">
      <div className={`container mx-auto px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6 ${t.dir === 'rtl' ? 'md:flex-row-reverse' : ''}`}>
        <div className="text-xs font-bold tracking-widest text-white/20 uppercase">
          &copy; {new Date().getFullYear()} Youssef dh. {t.footer.desc}
        </div>
        <div className="flex gap-8">
          <span className="text-[10px] font-bold tracking-[0.3em] text-white/10 uppercase">{t.footer.specialty}</span>
        </div>
      </div>
    </footer>
  );
};

const Marquee = () => {
  return (
    <div className="py-16 bg-black overflow-hidden whitespace-nowrap border-y border-white/10 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-20 pointer-events-none" />
      <div className="marquee-content flex gap-16 items-center">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
              tky_13_web_developer.tn
            </span>
            <span className="text-5xl md:text-7xl font-display font-black text-stroke uppercase tracking-tighter opacity-30">
              tky_13_web_developer.tn
            </span>
            <div className="w-3 h-3 bg-electric-blue rounded-full shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor hidden lg:block ${isHovering ? 'cursor-hover' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px`, transform: `translate(-50%, -50%) ${isHovering ? 'scale(4)' : 'scale(1)'}` }}
    />
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');
  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-charcoal ${t.dir === 'rtl' ? 'lg:pr-20' : 'lg:pl-20'} noise-overlay`} dir={t.dir}>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-px bg-electric-blue"
              />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/40"
              >
                {t.loader}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <Sidebar lang={lang} setLang={setLang} t={t} />
      <MobileNav lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <Marquee />
        <TechStack t={t} />
        <Projects t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
