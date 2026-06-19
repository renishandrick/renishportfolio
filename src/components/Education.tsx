'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const educationData = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Undergraduate Studies',
    year: '2023 - 2027',
    description: 'Focusing on artificial intelligence, machine learning, and scalable software systems.',
    glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    border: 'group-hover:border-neon-cyan/40',
    dot: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]',
  },
  {
    degree: 'Higher Secondary Education',
    institution: 'Kendriya Vidyalaya AFS Sulur',
    year: '2022 - 2023',
    description: 'Completed with a focus on Computer Science and Mathematics, laying the groundwork for engineering.',
    glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    border: 'group-hover:border-neon-violet/40',
    dot: 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]',
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

const itemVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 15, stiffness: 100 },
  },
};

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title gradient-text">Education</h2>
          <div className="mx-auto mt-4 mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink" />
          <p className="section-subtitle">My academic background</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-3xl mx-auto"
        >
          {/* Vertical line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

          {educationData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between mb-12 group`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125 ${item.dot}`} />

              {/* Left Side (Year on Desktop, Top on Mobile) */}
              <div className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 md:text-right ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} mb-2 md:mb-0`}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-medium text-sm">
                  {item.year}
                </span>
              </div>

              {/* Right Side (Content) */}
              <div className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1 text-left'}`}>
                <div className={`glass-card p-6 transition-all duration-300 ${item.border} ${item.glow}`}>
                  <h3 className="text-xl font-bold text-white mb-2">{item.degree}</h3>
                  <h4 className="text-violet-400 font-medium mb-4">{item.institution}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
