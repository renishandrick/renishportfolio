'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CertificationItem {
  icon: string;
  title: string;
}

const certifications: CertificationItem[] = [
  {
    icon: '🏅',
    title: 'Industrial Internet of Things (IIoT) Certification',
  },
  {
    icon: '🏆',
    title: 'HackRush 24-hour Hackathon Participant',
  },
  {
    icon: '🚀',
    title: 'Seminar on Missile Navigation and AI',
  },
  {
    icon: '🔐',
    title: 'In-Vehicle Intrusion Detection Seminar',
  },
  {
    icon: '💻',
    title: 'GitHub Copilot Workshop Participant',
  },
];

function CertificationCard({
  item,
  index,
  isInView,
}: {
  item: CertificationItem;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.3 + index * 0.12,
        ease: 'easeOut',
      }}
    >
      <div className="glass-card p-6 sm:p-8 h-full group relative overflow-hidden cursor-default">
        {/* Shine sweep on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.06) 45%, rgba(139, 92, 246, 0.06) 55%, transparent 100%)',
            }}
          />
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon */}
        <div className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
          {item.icon}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-white leading-snug group-hover:text-neon-cyan/90 transition-colors duration-300">
          {item.title}
        </h3>

        {/* Bottom glow on hover */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-neon-cyan/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-neon-emerald/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Title */}
        <motion.h2
          className="section-title gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Certifications & Achievements
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          Recognitions and continuous learning milestones
        </motion.p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-12 max-w-5xl mx-auto">
          {certifications.map((item, index) => (
            <CertificationCard
              key={index}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
