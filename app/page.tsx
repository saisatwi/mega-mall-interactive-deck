"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideSun, LucideMoon, LucideLayoutGrid, LucideX, LucideChevronLeft, LucideChevronRight, LucideArrowRight } from "lucide-react";

const MODULES = [
  {
    id: "retail",
    title: "The Promenade",
    label: "Retail",
    day: "/images/retail/retail-day.jpg",
    night: "/images/retail/retail-night.jpg",
    gallery: ['retail-g1.jpg', 'retail-g2.jpg', 'retail-g3.jpg', 'retail-g4.jpg', 'retail-g5.jpg'].map(img => `/images/retail/${img}`),
    description: "Exquisite global boutiques meets architectural mastery."
  },
  {
    id: "events",
    title: "Grand Plaza",
    label: "Events",
    day: "/images/events/events-day.jpg",
    night: "/images/events/events-night.jpg",
    gallery: ['events-g1.jpg', 'events-g2.jpg', 'events-g3.jpg', 'events-g4.jpg', 'events-g5.jpg'].map(img => `/images/events/${img}`),
    description: "The heartbeat of culture. A stage for the world’s finest summits."
  },
  {
    id: "entertainment",
    title: "Neon District",
    label: "Entertainment",
    day: "/images/entertainment/entertainment-day.jpg",
    night: "/images/entertainment/entertainment-night.jpg",
    gallery: ['entertainment-g1.jpg', 'entertainment-g2.jpg', 'entertainment-g3.jpg', 'entertainment-g4.jpg'].map(img => `/images/entertainment/${img}`),
    description: "Sensory immersion in a district that defines the night."
  },
  {
    id: "dining",
    title: "Culinary Atelier",
    label: "Dining",
    day: "/images/dining/dining-day.jpg",
    night: "/images/dining/dining-night.jpg",
    gallery: ['dining-g1.jpg', 'dining-g2.jpg', 'dining-g3.jpg', 'dining-g4.jpg'].map(img => `/images/dining/${img}`),
    description: "Where gastronomy becomes fine art."
  },
  {
    id: "luxury",
    title: "The Estates",
    label: "Luxury",
    day: "/images/luxury/luxury-day.jpg",
    night: "/images/luxury/luxury-night.jpg",
    gallery: ['luxury-g1.jpg', 'luxury-g2.jpg', 'luxury-g3.jpg'].map(img => `/images/luxury/${img}`),
    description: "Unrivaled residential panoramas with private sanctuary vibes."
  }
];

export default function GrandHorizonDeck() {
  const [index, setIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<"day" | "night">("day");
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  
  const currentModule = index !== null ? MODULES[index] : null;

  if (!mounted) return null;

  return (
    <main className="relative h-screen w-full bg-black text-white overflow-hidden font-sans">
      
      {/* BACKGROUND ENGINE */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {index === null ? (
            <motion.div key="landing-video" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="absolute inset-0">
               <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale">
                  <source src="/videos/intro.mp4" type="video/mp4" />
               </video>
            </motion.div>
          ) : (
            <motion.img
              key={`${currentModule?.id}-${mode}`}
              src={mode === "night" ? currentModule?.night : currentModule?.day}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="h-full w-full object-cover brightness-[0.4]"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      <AnimatePresence>
        {index === null ? (
          /* --- LANDING HUB (CONTACT REMOVED FROM GRID) --- */
          <motion.section key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
            <span className="text-[#c5a059] text-[10px] uppercase tracking-[1em] mb-4">Interactive Experience</span>
            <h1 className="text-7xl md:text-[9rem] font-extralight tracking-tighter italic mb-12">Grand Horizon</h1>
            
            {/* Grid now only shows the 5 modules with photos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-7xl">
              {MODULES.map((mod, i) => (
                <button 
                  key={mod.id} 
                  onClick={() => setIndex(i)} 
                  className="group relative h-44 border border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden hover:border-[#c5a059]/40 transition-all"
                >
                  <img 
                    src={mod.day} 
                    alt={mod.label}
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-70 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end text-left bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-[10px] uppercase tracking-widest">{mod.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Subtle Contact trigger for the landing page footer */}
            <button 
                onClick={() => setShowInquiry(true)}
                className="mt-12 text-[9px] uppercase tracking-[0.6em] text-white/30 hover:text-[#c5a059] transition-all"
            >
                Connect with Concierge
            </button>
          </motion.section>
        ) : (
          /* --- MODULE DETAIL --- */
          <motion.section key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-30 h-full w-full flex flex-col justify-between p-8 md:p-16">
            <div className="flex justify-between items-start">
              <button onClick={() => setIndex(null)} className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all">
                <LucideLayoutGrid size={16} />
                <span className="text-[9px] uppercase tracking-widest">Back to Hub</span>
              </button>
              <div className="bg-black/60 backdrop-blur-md border border-white/10 p-1 rounded-full flex gap-1">
                <button onClick={() => setMode("day")} className={`p-3 rounded-full ${mode === "day" ? "bg-[#c5a059] text-black" : "text-white/50"}`}><LucideSun size={18} /></button>
                <button onClick={() => setMode("night")} className={`p-3 rounded-full ${mode === "night" ? "bg-[#c5a059] text-black" : "text-white/50"}`}><LucideMoon size={18} /></button>
              </div>
            </div>

            <div className="max-w-4xl mb-12">
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.5em] block mb-4">Module 0{index + 1}</span>
                <h2 className="text-6xl md:text-[8rem] font-extralight tracking-tighter italic leading-none mb-8">{currentModule?.title}</h2>
                <p className="text-white/70 text-lg md:text-2xl font-light max-w-xl border-l border-[#c5a059]/40 pl-8">{currentModule?.description}</p>
                
                <div className="pt-10 flex items-center gap-6">
                  {currentModule?.gallery && currentModule.gallery.length > 0 && (
                    <button onClick={() => setShowGallery(true)} className="px-10 py-4 bg-white text-black text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#c5a059] transition-all">
                      View Gallery
                    </button>
                  )}
                  <button onClick={() => setShowInquiry(true)} className="group flex items-center gap-4 text-[9px] uppercase tracking-[0.4em] text-white/50 hover:text-[#c5a059] transition-all">
                    Inquire <LucideArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* GALLERY (OBJECT-CONTAIN TO PREVENT CUTTING) */}
      <AnimatePresence>
        {showGallery && currentModule && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/98 flex flex-col items-center justify-center p-10">
            <button onClick={() => setShowGallery(false)} className="absolute top-10 right-10 text-white/40 hover:text-white"><LucideX size={32}/></button>
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={currentModule.gallery[galleryIdx]} 
                className="max-h-full max-w-full object-contain" 
                alt="Gallery item"
              />
            </div>
            <div className="absolute inset-y-0 w-full flex justify-between items-center px-6 pointer-events-none">
              <button onClick={() => setGalleryIdx((p) => (p - 1 + currentModule.gallery.length) % currentModule.gallery.length)} className="p-4 pointer-events-auto text-white/20 hover:text-white"><LucideChevronLeft size={48}/></button>
              <button onClick={() => setGalleryIdx((p) => (p + 1) % currentModule.gallery.length)} className="p-4 pointer-events-auto text-white/20 hover:text-white"><LucideChevronRight size={48}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INQUIRY SIDEBAR (STILL ACCESSIBLE) */}
      <AnimatePresence>
        {showInquiry && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full md:w-[450px] z-[110] bg-[#0a0a0a] border-l border-white/10 p-12 flex flex-col justify-center">
            <button onClick={() => setShowInquiry(false)} className="absolute top-10 right-10 text-white/20 hover:text-white"><LucideX size={24}/></button>
            <h3 className="text-3xl italic font-light mb-10">Private Inquiry</h3>
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setShowInquiry(false); }}>
              <input placeholder="NAME" className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] tracking-widest outline-none focus:border-[#c5a059]" />
              <input placeholder="EMAIL" className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] tracking-widest outline-none focus:border-[#c5a059]" />
              <button className="w-full py-5 border border-[#c5a059] text-[#c5a059] text-[10px] uppercase tracking-[0.5em] hover:bg-[#c5a059] hover:text-black transition-all">Submit</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}