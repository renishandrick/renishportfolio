'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Animated logo */}
            <motion.div
              className="relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center relative">
                <span className="text-3xl font-bold text-white">FR</span>
                {/* Orbiting ring */}
                <motion.div
                  className="absolute inset-[-8px] rounded-2xl border-2 border-cyan-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-[-16px] rounded-3xl border border-violet-400/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="text-sm text-slate-400 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Initializing Portfolio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
