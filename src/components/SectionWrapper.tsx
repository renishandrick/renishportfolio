'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: ReactNode;
}

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 100,
      staggerChildren: 0.15,
    },
  },
};

export default function SectionWrapper({ children }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}
