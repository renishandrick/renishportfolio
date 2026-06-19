'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ─── constants ─── */
const ROLES = [
  'Aspiring AI/ML Engineer',
  'Full Stack Developer',
  'Computer Vision Developer',
  'Data Analyst',
] as const;

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPED = 2000;
const PAUSE_AFTER_DELETED = 400;

interface FloatingIcon {
  label: string;
  x: string;
  y: string;
  delay: string;
}

const FLOATING_ICONS: FloatingIcon[] = [
  { label: '🐍 Python', x: '10%', y: '18%', delay: '' },
  { label: '🧠 TensorFlow', x: '82%', y: '14%', delay: 'animate-float-delay-1' },
  { label: '⚛️ React', x: '88%', y: '60%', delay: 'animate-float-delay-2' },
  { label: '📊 Pandas', x: '6%', y: '65%', delay: 'animate-float-delay-3' },
  { label: '🔥 PyTorch', x: '75%', y: '82%', delay: 'animate-float-delay-1' },
  { label: '🌐 Next.js', x: '15%', y: '82%', delay: 'animate-float-delay-2' },
  { label: '👁️ OpenCV', x: '50%', y: '8%', delay: 'animate-float-delay-3' },
  { label: '🤖 Scikit', x: '92%', y: '38%', delay: '' },
];

/* ─── animation variants ─── */
const slideUp = (delay: number) => ({
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
      delay 
    },
  },
});

const panelWipe = {
  hidden: { x: "-100%" },
  visible: {
    x: "100%",
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] as [number, number, number, number] }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 1.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, scale: 0.5, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 14, stiffness: 120 },
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Hero() {
  /* ── Typing effect ── */
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = ROLES[roleIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      // typing
      const next = currentRole.slice(0, displayed.length + 1);
      setDisplayed(next);
      if (next === currentRole) {
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPED);
        return;
      }
    } else {
      // deleting
      const next = currentRole.slice(0, displayed.length - 1);
      setDisplayed(next);
      if (next === '') {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTimeout(() => {}, PAUSE_AFTER_DELETED);
        return;
      }
    }
  }, [currentRole, displayed, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  /* ── Render ── */
  return (
    <section
      id="home"
      className="animated-gradient-bg neural-grid min-h-screen relative overflow-hidden flex items-center justify-center"
    >
      {/* ── Panel Wipe Entrance ── */}
      <motion.div
        variants={panelWipe}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-50 bg-cyan-500 origin-left"
        style={{ pointerEvents: 'none' }}
      />
      <motion.div
        variants={{
          hidden: { x: "-100%" },
          visible: {
            x: "100%",
            transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] as [number, number, number, number], delay: 0.1 }
          }
        }}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-50 bg-violet-600 origin-left"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* ── Decorative blob behind name ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(6,182,212,0.45) 0%, rgba(139,92,246,0.35) 40%, rgba(236,72,153,0.2) 70%, transparent 100%)',
        }}
      />
      {/* secondary smaller blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[30%] left-[60%] w-[350px] h-[350px] rounded-full opacity-15 blur-[100px] animate-pulse"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(6,182,212,0.25) 60%, transparent 100%)',
        }}
      />

      {/* ── Floating tech icons ── */}
      {FLOATING_ICONS.map((icon) => (
        <div
          key={icon.label}
          aria-hidden
          className={`absolute hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs text-slate-400 select-none animate-float ${icon.delay}`}
          style={{ left: icon.x, top: icon.y }}
        >
          {icon.label}
        </div>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 section-container flex flex-col items-center text-center px-4 py-24 md:py-32">
        {/* Name */}
        <motion.h1
          variants={slideUp(0.6)}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none mb-4"
        >
          <span className="gradient-text">F RENISH</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          variants={slideUp(0.8)}
          initial="hidden"
          animate="visible"
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400 neon-text-cyan">
            {displayed}
          </span>
          <span className="typing-cursor ml-0.5 inline-block w-[3px] h-6 bg-cyan-400 rounded-full" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={slideUp(1.0)}
          initial="hidden"
          animate="visible"
          className="max-w-xl text-slate-400 text-base sm:text-lg leading-relaxed mb-10"
        >
          Building intelligent systems with AI, Machine Learning, and modern web
          technologies.
        </motion.p>

        {/* Social icons */}
        <motion.div
          variants={slideUp(1.4)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-5 mt-4"
        >
          {/* GitHub */}
          <a
            href="https://github.com/renishandrick"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-violet-400 hover:border-violet-400/40 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:renishandrick@gmail.com"
            aria-label="Email"
            className="group p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
