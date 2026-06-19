'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const interests = [
  { label: 'Machine Learning', color: 'from-cyan-400 to-cyan-600', glow: 'rgba(6, 182, 212, 0.4)', border: 'border-cyan-500/30' },
  { label: 'Computer Vision', color: 'from-violet-400 to-violet-600', glow: 'rgba(139, 92, 246, 0.4)', border: 'border-violet-500/30' },
  { label: 'Backend Development', color: 'from-emerald-400 to-emerald-600', glow: 'rgba(16, 185, 129, 0.4)', border: 'border-emerald-500/30' },
  { label: 'Data Analytics', color: 'from-pink-400 to-pink-600', glow: 'rgba(236, 72, 153, 0.4)', border: 'border-pink-500/30' },
  { label: 'Workflow Automation', color: 'from-amber-400 to-amber-600', glow: 'rgba(245, 158, 11, 0.4)', border: 'border-amber-500/30' },
  { label: 'MERN Stack Development', color: 'from-cyan-400 to-violet-500', glow: 'rgba(6, 182, 212, 0.4)', border: 'border-cyan-500/30' },
  { label: 'Artificial Intelligence', color: 'from-violet-400 to-pink-500', glow: 'rgba(139, 92, 246, 0.4)', border: 'border-violet-500/30' },
];

const softSkills = [
  { icon: '👑', name: 'Leadership', description: 'Guiding teams toward shared goals with vision and empathy' },
  { icon: '💬', name: 'Communication', description: 'Conveying ideas clearly across technical and non-technical audiences' },
  { icon: '🧩', name: 'Problem Solving', description: 'Breaking complex challenges into elegant, actionable solutions' },
  { icon: '🎨', name: 'Creativity', description: 'Thinking outside the box to innovate and design unique experiences' },
  { icon: '⏰', name: 'Time Management', description: 'Prioritizing tasks effectively to meet deadlines consistently' },
  { icon: '🔄', name: 'Adaptability', description: 'Embracing change and rapidly learning new tools and technologies' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 15,
      stiffness: 80,
    },
  },
};

export default function Interests() {
  const interestsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInterestsInView = useInView(interestsRef, { once: true, margin: '-80px' });
  const isSkillsInView = useInView(skillsRef, { once: true, margin: '-80px' });

  return (
    <section id="interests" className="relative py-24 lg:py-32">
      <div className="section-container">
        {/* Areas of Interest */}
        <div ref={interestsRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInterestsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title gradient-text">Areas of Interest</h2>
            <p className="section-subtitle">
              Domains that ignite my passion and drive my continuous learning
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInterestsInView ? 'visible' : 'hidden'}
            className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
          >
            {interests.map((interest) => (
              <motion.div
                key={interest.label}
                variants={badgeVariants}
                whileHover={{
                  scale: 1.08,
                  boxShadow: `0 0 25px ${interest.glow}, 0 0 50px ${interest.glow.replace('0.4', '0.15')}`,
                }}
                whileTap={{ scale: 0.97 }}
                className={`badge-glow relative px-6 py-3 rounded-full cursor-default
                  bg-white/5 backdrop-blur-xl border ${interest.border}
                  transition-all duration-300`}
              >
                <span
                  className={`relative z-10 text-sm font-semibold bg-gradient-to-r ${interest.color} bg-clip-text text-transparent`}
                >
                  {interest.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Soft Skills */}
        <div ref={skillsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title gradient-text">Soft Skills</h2>
            <p className="section-subtitle">
              The interpersonal strengths that complement my technical expertise
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isSkillsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {softSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(6, 182, 212, 0.15), 0 0 60px rgba(139, 92, 246, 0.08)',
                }}
                className="glass-card p-6 text-center cursor-default group"
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{skill.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
