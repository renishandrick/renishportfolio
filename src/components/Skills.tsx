'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── types & data ──────────────────────────────────────── */

type FilterKey =
  | 'All'
  | 'Languages'
  | 'Web Dev'
  | 'ML/AI'
  | 'Backend'
  | 'Libraries'
  | 'Tools';

interface SkillCategory {
  name: string;
  icon: string;
  filter: FilterKey;
  proficiency: number; // 0-100
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    icon: '💻',
    filter: 'Languages',
    proficiency: 85,
    skills: ['Java', 'Python', 'C'],
  },
  {
    name: 'Web Development',
    icon: '🌐',
    filter: 'Web Dev',
    proficiency: 80,
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js'],
  },
  {
    name: 'Machine Learning',
    icon: '🤖',
    filter: 'ML/AI',
    proficiency: 75,
    skills: ['Supervised Learning', 'NLP', 'Deep Learning', 'RAG'],
  },
  {
    name: 'Backend & Database',
    icon: '🗄️',
    filter: 'Backend',
    proficiency: 70,
    skills: ['MySQL', 'MongoDB', 'FastAPI'],
  },
  {
    name: 'Libraries & Frameworks',
    icon: '📚',
    filter: 'Libraries',
    proficiency: 78,
    skills: ['TensorFlow', 'PyTorch', 'Pandas', 'OpenCV', 'NumPy'],
  },
  {
    name: 'Tools',
    icon: '🔧',
    filter: 'Tools',
    proficiency: 82,
    skills: [
      'Git & GitHub',
      'Google Colab',
      'Jupyter Notebook',
      'n8n',
      'ONNX',
      'WebSockets',
    ],
  },
];

const filters: FilterKey[] = [
  'All',
  'Languages',
  'Web Dev',
  'ML/AI',
  'Backend',
  'Libraries',
  'Tools',
];

/* ── accent palette per card ───────────────────────────── */

const accentStyles: {
  border: string;
  glow: string;
  bar: string;
}[] = [
  {
    border: 'hover:border-neon-cyan/40',
    glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]',
    bar: 'from-neon-cyan to-cyan-400',
  },
  {
    border: 'hover:border-neon-violet/40',
    glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]',
    bar: 'from-neon-violet to-violet-400',
  },
  {
    border: 'hover:border-neon-emerald/40',
    glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]',
    bar: 'from-neon-emerald to-emerald-400',
  },
  {
    border: 'hover:border-neon-pink/40',
    glow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]',
    bar: 'from-neon-pink to-pink-400',
  },
  {
    border: 'hover:border-neon-amber/40',
    glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]',
    bar: 'from-neon-amber to-amber-400',
  },
  {
    border: 'hover:border-neon-cyan/40',
    glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]',
    bar: 'from-neon-cyan to-sky-400',
  },
];

/* ── animation variants ────────────────────────────────── */

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' as const },
  },
};

/* ── progress bar ──────────────────────────────────────── */

function ProgressBar({
  value,
  barGradient,
}: {
  value: number;
  barGradient: string;
}) {
  return (
    <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${barGradient}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.3 }}
      />
    </div>
  );
}

/* ── main component ────────────────────────────────────── */

export default function Skills() {
  const [active, setActive] = useState<FilterKey>('All');

  const filtered =
    active === 'All'
      ? categories
      : categories.filter((c) => c.filter === active);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* decorative orbs */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-neon-violet/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-neon-emerald/5 blur-[100px]" />

      <motion.div
        className="section-container relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* ── title ──────────────────────────────────────── */}
        <motion.h2 variants={fadeUp} className="section-title gradient-text">
          Skills &amp; Technologies
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="mx-auto mb-10 h-1 w-20 rounded-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink"
        />

        <motion.p
          variants={fadeUp}
          className="section-subtitle"
        >
          Technologies and tools I work with to bring ideas to life.
        </motion.p>

        {/* ── filter tabs ────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="mb-12 flex flex-wrap items-center justify-center gap-2"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                active === f
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {active === f && (
                <motion.span
                  layoutId="skills-tab-bg"
                  className="absolute inset-0 rounded-full border border-neon-cyan/30 bg-white/10 backdrop-blur-md"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </motion.div>

        {/* ── skill cards ────────────────────────────────── */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((cat) => {
              const idx = categories.indexOf(cat);
              const accent = accentStyles[idx % accentStyles.length];

              return (
                <motion.div
                  key={cat.name}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`glass-card group p-6 ${accent.border} ${accent.glow}`}
                >
                  {/* header */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-2xl">
                      {cat.icon}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {cat.name}
                      </h3>
                      <span className="text-xs text-slate-500">
                        {cat.proficiency}% proficiency
                      </span>
                    </div>
                  </div>

                  {/* skill pills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/5 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300 transition-colors group-hover:border-white/10 group-hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* progress bar */}
                  <ProgressBar
                    value={cat.proficiency}
                    barGradient={accent.bar}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
