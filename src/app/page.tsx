'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// UI Components
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import LoadingScreen from "@/components/LoadingScreen";

// 3D Engine
import SolarSystemWrapper from "@/components/3d/SolarSystem";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('galaxy');
  const [showUI, setShowUI] = useState<boolean>(false);

  const handlePlanetSelect = (id: string) => {
    setActiveSection(id);
    setShowUI(false);
    
    // Delay showing the UI slightly so the camera has time to zoom
    setTimeout(() => {
      setShowUI(true);
    }, 1500); 
  };

  const backToGalaxy = () => {
    setShowUI(false);
    setActiveSection('galaxy');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero': return <><Hero /><About /></>;
      case 'projects': return <Projects />;
      case 'experience': return <Experience />;
      case 'education': return <Education />;
      case 'skills': return <Skills />;
      case 'contact': return <Contact />;
      default: return null;
    }
  };

  return (
    <>
      <LoadingScreen />
      
      <main className="relative w-screen h-screen overflow-hidden bg-black">
        
        {/* The 3D Solar System Canvas */}
        <SolarSystemWrapper activeSection={activeSection} onPlanetSelect={handlePlanetSelect} />

        {/* Global UI (Top Nav/Indicator) */}
        <div className="absolute top-6 left-6 z-50 pointer-events-none">
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">
            F RENISH
          </h1>
          <p className="text-cyan-400 text-sm">Interactive Portfolio System</p>
        </div>

        {/* UI Overlay Container (Fades in when a planet is selected) */}
        <AnimatePresence>
          {activeSection !== 'galaxy' && showUI && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute right-0 top-0 bottom-0 w-full md:w-[600px] lg:w-[800px] bg-black/60 backdrop-blur-2xl border-l border-white/10 shadow-2xl overflow-y-auto z-40 custom-scrollbar"
            >
              {/* Back Button */}
              <div className="sticky top-0 z-50 p-6 bg-gradient-to-b from-black/90 to-transparent flex justify-between items-center">
                <button
                  onClick={backToGalaxy}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-sm font-medium">Back to Galaxy</span>
                </button>
              </div>

              {/* Render Selected Portfolio Content */}
              <div className="px-6 pb-24">
                {renderActiveSection()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Instruction overlay when in galaxy mode */}
        <AnimatePresence>
          {activeSection === 'galaxy' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
            >
              <div className="px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-center animate-pulse">
                <p className="text-white text-sm font-medium">Select a planet to explore</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </>
  );
}
