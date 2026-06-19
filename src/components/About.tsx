'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── data ──────────────────────────────────────────────── */

const badges = [
  'AI/ML Enthusiast',
  'Full Stack Developer',
  'Computer Vision Developer',
  'Data Analyst',
  'Problem Solver',
] as const;

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

const stats: Stat[] = [
  { label: 'AI/ML Projects', value: 5, suffix: '+', icon: '🧠' },
  { label: 'Technologies Learned', value: 15, suffix: '+', icon: '💻' },
  { label: 'Certifications', value: 5, suffix: '+', icon: '📜' },
  { label: 'Hackathons Participated', value: 2, suffix: '+', icon: '🏆' },
];

/* ── animation variants ────────────────────────────────── */

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 14, stiffness: 100 },
  },
};

const badgeVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

/* ── counter hook ──────────────────────────────────────── */

function useCounter(target: number, inView: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = target / (duration / 16);
    let raf: number;

    const step = () => {
      start += increment;
      if (start >= target) {
        setCount(target);
        return;
      }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return count;
}

/* ── stat card ─────────────────────────────────────────── */

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCounter(stat.value, inView);

  /* rotate neon accent per card */
  const accents = [
    'group-hover:border-neon-cyan/40 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    'group-hover:border-neon-violet/40 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    'group-hover:border-neon-emerald/40 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    'group-hover:border-neon-pink/40 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]',
  ];

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className={`glass-card group flex flex-col items-center justify-center gap-3 p-6 text-center ${accents[index % accents.length]}`}
    >
      <span className="text-4xl">{stat.icon}</span>
      <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        {count}
        <span className="gradient-text">{stat.suffix}</span>
      </p>
      <p className="text-sm text-slate-400">{stat.label}</p>
    </motion.div>
  );
}

/* ── main component ────────────────────────────────────── */

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* faint decorative orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-neon-cyan/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-neon-violet/5 blur-[120px]" />

      <motion.div
        className="section-container relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* ── title ─────────────────────────────────────── */}
        <motion.h2
          variants={fadeUp}
          className="section-title gradient-text"
        >
          About Me
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="mx-auto mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink"
        />

        {/* ── bio ───────────────────────────────────────── */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          Computer Science Engineering student and aspiring AI/ML Engineer with
          experience in developing machine learning models, data-driven
          applications, and intelligent software solutions. Passionate about
          leveraging Artificial Intelligence and Machine Learning to create
          innovative and impactful real-world solutions.
        </motion.p>

        {/* ── badges ────────────────────────────────────── */}
        <motion.div
          variants={sectionVariants}
          className="mb-16 flex flex-wrap items-center justify-center gap-3"
        >
          {badges.map((badge) => (
            <motion.span
              key={badge}
              variants={badgeVariant}
              whileHover={{ scale: 1.05 }}
              className="badge-glow cursor-default rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-slate-200 backdrop-blur-md transition-colors hover:border-neon-cyan/50 hover:text-white"
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>

        {/* ── stats grid ────────────────────────────────── */}
        <motion.div
          variants={sectionVariants}
          className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
