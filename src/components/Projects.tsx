'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Andrick AI',
    description: 'A personalized RAG (Retrieval-Augmented Generation) system built for my own system to efficiently query and summarize personal datasets.',
    tags: ['Python', 'RAG', 'LLMs', 'LangChain'],
    link: '#',
    github: '#',
    glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    border: 'hover:border-neon-cyan/40',
  },
  {
    title: 'SmartEco',
    description: 'An ML-driven application for campus sustainability, utilizing machine learning to optimize resources and reduce ecological footprint.',
    tags: ['Machine Learning', 'Python', 'React', 'Data Analytics'],
    link: '#',
    github: '#',
    glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    border: 'hover:border-neon-violet/40',
  },
  {
    title: 'ATM Security System',
    description: 'Advanced ATM security implementation leveraging computer vision with OpenCV and YOLO for real-time threat detection and anomaly recognition.',
    tags: ['OpenCV', 'YOLO', 'Computer Vision', 'Python'],
    link: '#',
    github: '#',
    glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    border: 'hover:border-neon-emerald/40',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, damping: 15, stiffness: 100 },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <div className="mx-auto mt-4 mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink" />
          <p className="section-subtitle">Showcasing some of my recent work</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`glass-card p-6 flex flex-col h-full transition-all duration-300 ${project.border} ${project.glow}`}
            >
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-slate-400 text-sm flex-grow mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                <a href={project.github} className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href={project.link} className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-1 transition-colors">
                  View Live <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
