'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const achievements = [
  'Built responsive web pages',
  'Improved UI/UX design',
  'Worked on real-world development workflows',
  'Enhanced frontend logic and responsiveness',
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Title */}
        <motion.h2
          className="section-title gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Experience
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          My professional journey and hands-on industry experience
        </motion.p>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto mt-12">
          {/* Vertical timeline line */}
          <motion.div
            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, #06b6d4, #8b5cf6, transparent)',
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />

          {/* Timeline entry */}
          <div className="relative flex items-start md:justify-center">
            {/* Glowing dot */}
            <motion.div
              className="absolute left-5 md:left-1/2 top-8 z-20 -translate-x-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            >
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-neon-cyan border-2 border-neon-cyan" />
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-neon-cyan/50 animate-ping" />
                <div className="absolute -inset-1 rounded-full bg-neon-cyan/20 blur-sm" />
              </div>
            </motion.div>

            {/* Card */}
            <motion.div
              className="ml-14 md:ml-0 md:w-[calc(50%-2rem)] md:mr-auto origin-right"
              initial={{ opacity: 0, x: -120, scale: 0.8 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -120, scale: 0.8 }}
              transition={{ type: "spring", damping: 14, stiffness: 90, delay: 0.4 }}
            >
              <div className="glass-card p-6 sm:p-8 group relative overflow-hidden">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div
                    className="absolute -inset-full rotate-12"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.04), transparent)',
                    }}
                  />
                </div>

                {/* Date badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-semibold mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  Internship
                </div>

                {/* Role & Company */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  Web Development Intern
                </h3>
                <p className="text-neon-violet font-medium text-sm sm:text-base mb-5">
                  Sky Lena InfoTechnology Pvt. Ltd.
                </p>

                {/* Achievements */}
                <ul className="space-y-3">
                  {achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm sm:text-base text-slate-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.8 + i * 0.1,
                        ease: 'easeOut',
                      }}
                    >
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-neon-cyan/70" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
