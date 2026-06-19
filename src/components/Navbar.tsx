'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const menuVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' as const },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' as const },
  },
};

const linkContainerVariants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const linkItemVariants = {
  closed: { opacity: 0, y: 30, scale: 0.9 },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Smooth scroll handler
  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '');
    const el = document.querySelector(`#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  }, []);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/50 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold gradient-text cursor-pointer select-none"
            >
              FR
            </motion.button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-lg"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </motion.button>

              {/* Mobile Hamburger */}
              <motion.button
                onClick={() => setMobileOpen((prev) => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="block w-5 h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-0.5 bg-current rounded-full"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 lg:hidden bg-black/80 backdrop-blur-2xl flex items-center justify-center"
          >
            <motion.div
              variants={linkContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center gap-6"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.button
                    key={link.label}
                    variants={linkItemVariants}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-3xl font-bold transition-colors duration-300 ${
                      isActive ? 'gradient-text' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
