'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  {
    id: 'retail',
    label: 'Retail',
    title: 'The Promenade',
    tagline: 'Curated Elegance',
    mainDay: '/images/retail/retail-day.jpg', 
    mainNight: '/images/retail/retail-night.jpg',
    gallery: ['retail-g1.jpg', 'retail-g2.jpg', 'retail-g3.jpg', 'retail-g4.jpg', 'retail-g5.jpg'].map(img => `/images/retail/${img}`),
    desc: 'Exquisite global boutiques meets architectural mastery.',
    placeholder: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2400"
  },
  {
    id: 'events',
    label: 'Events',
    title: 'Grand Plaza',
    tagline: 'Infinite Occasions',
    mainDay: '/images/events/events-day.jpg',
    mainNight: '/images/events/events-night.jpg',
    gallery: ['events-g1.jpg', 'events-g2.jpg', 'events-g3.jpg', 'events-g4.jpg', 'events-g5.jpg'].map(img => `/images/events/${img}`),
    desc: 'The heartbeat of culture. A stage for the world’s finest summits.',
    placeholder: "https://images.unsplash.com/photo-1540575861501-7ad0582373f3?q=80&w=2400"
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    title: 'Neon District',
    tagline: 'Vibrant Energy',
    mainDay: '/images/entertainment/entertainment-day.jpg',
    mainNight: '/images/entertainment/entertainment-night.jpg',
    gallery: ['entertainment-g1.jpg', 'entertainment-g2.jpg', 'entertainment-g3.jpg', 'entertainment-g4.jpg', 'entertainment-g5.jpg', 'entertainment-g6.jpg'].map(img => `/images/entertainment/${img}`),
    desc: 'Sensory immersion in a district that defines the night.',
    placeholder: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2400"
  },
  {
    id: 'dining',
    label: 'Dining',
    title: 'Culinary Atelier',
    tagline: 'Symphony of Taste',
    mainDay: '/images/dining/dining-day.jpg',
    mainNight: '/images/dining/dining-night.jpg',
    gallery: ['dining-g1.jpg', 'dining-g2.jpg', 'dining-g3.jpg', 'dining-g4.jpg', 'dining-g5.jpg'].map(img => `/images/dining/${img}`),
    desc: 'Where gastronomy becomes fine art.',
    placeholder: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2400"
  },
  {
    id: 'luxury',
    label: 'Luxury',
    title: 'The Estates',
    tagline: 'Private Sanctuary',
    mainDay: '/images/luxury/luxury-day.jpg',
    mainNight: '/images/luxury/luxury-night.jpg',
    gallery: ['luxury-g1.jpg', 'luxury-g2.jpg', 'luxury-g3.jpg'].map(img => `/images/luxury/${img}`),
    desc: 'Unrivaled residential panoramas.',
    placeholder: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2400"
  },
  {
    id: 'sponsorship',
    label: 'Sponsorship',
    title: 'Partner Alliances',
    tagline: 'Strategic Synergy',
    mainDay: '/images/sponsorship/sponsorship-day.jpg',
    mainNight: '/images/sponsorship/sponsorship-night.jpg',
    gallery: ['sponsorship-g1.jpg', 'sponsorship-g2.jpg', 'sponsorship-g3.jpg', 'sponsorship-g4.jpg', 'sponsorship-g5.jpg'].map(img => `/images/sponsorship/${img}`),
    desc: 'Connect your legacy with our horizon.',
    placeholder: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400"
  },
  {
    id: 'why-property',
    label: 'Why Property',
    title: 'Modern Legacy',
    tagline: 'Investment Aura',
    mainDay: '/images/why-property/why-property-day.jpg',
    mainNight: '/images/why-property/why-property-night.jpg',
    gallery: ['why-property-g1.jpg', 'why-property-g2.jpg', 'why-property-g3.jpg', 'why-property-g4.jpg', 'why-property-g5.jpg', 'why-property-g6.jpg', 'why-property-g7.jpg', 'why-property-g8.jpg'].map(img => `/images/why-property/${img}`),
    desc: 'Architecture designed for the next century.',
    placeholder: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400"
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Concierge',
    tagline: 'Personal Inquiry',
    mainDay: '/images/contact/contact-day.jpg',
    mainNight: '/images/contact/contact-night.jpg',
    gallery: [],
    desc: 'Begin your journey with a private consultation.',
    placeholder: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2400"
  }
];

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [scene, setScene] = useState<'LANDING' | 'VISION'>('LANDING');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isNight, setIsNight] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(-1);
  const [status, setStatus] = useState<'IDLE' | 'SUCCESS'>('IDLE');

  useEffect(() => { setMounted(true); }, []);

  const active = useMemo(() => SECTIONS[activeIdx], [activeIdx]);

  // Image Logic: If galleryIdx is -1, show main (day/night). Else show gallery item.
  const currentImg = useMemo(() => {
    if (galleryIdx === -1) return isNight ? active.mainNight : active.mainDay;
    return active.gallery[galleryIdx];
  }, [active, galleryIdx, isNight]);

  const nextSlide = useCallback(() => {
    if (active.gallery.length === 0) return;
    setGalleryIdx(prev => (prev < active.gallery.length - 1 ? prev + 1 : -1));
  }, [active]);

  const prevSlide = useCallback(() => {
    if (active.gallery.length === 0) return;
    setGalleryIdx(prev => (prev > -1 ? prev - 1 : active.gallery.length - 1));
  }, [active]);

  const nextModule = useCallback(() => { setActiveIdx(p => (p + 1) % SECTIONS.length); setGalleryIdx(-1); }, []);
  const prevModule = useCallback(() => { setActiveIdx(p => (p - 1 + SECTIONS.length) % SECTIONS.length); setGalleryIdx(-1); }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (scene !== 'VISION' || ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowDown') nextModule();
      if (e.key === 'ArrowUp') prevModule();
      if (e.key.toLowerCase() === 'n') setIsNight(v => !v);
      if (e.key === 'Escape') setScene('LANDING');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [scene, nextSlide, prevSlide, nextModule, prevModule]);

  if (!mounted) return null;

  return (
    <main className="relative h-screen w-full bg-[#050505] text-white overflow-hidden select-none font-sans">
      <div className="fixed inset-0 pointer-events-none z-[60] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />

      <AnimatePresence mode="wait">
        {scene === 'LANDING' ? (
          <motion.section key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="h-full w-full flex items-center justify-center relative bg-black">
            <div className="absolute inset-0">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-30 grayscale">
                    <source src="/videos/intro.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
                    <span className="text-[#c5a059] text-[9px] uppercase mb-6 block tracking-[1em]">The Pinnacle of Architecture</span>
                    <h1 className="text-5xl md:text-[8rem] italic font-extralight tracking-tighter leading-none mb-12">Mega Mall<br/>Grand Horizon</h1>
                </motion.div>
                <button onClick={() => setScene('VISION')} className="px-16 py-5 border border-white/10 text-[10px] tracking-[0.6em] uppercase hover:border-[#c5a059] hover:text-[#c5a059] transition-all duration-700 bg-black/20 backdrop-blur-sm">
                    Enter Experience
                </button>
            </div>
          </motion.section>
        ) : (
          <motion.section key="vision" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full flex flex-col lg:flex-row">
            
            {/* NAVIGATION SIDEBAR */}
            <div className="w-full lg:w-[32%] h-full bg-[#0a0a0a] p-10 lg:p-20 flex flex-col justify-between z-20 border-r border-white/5 relative">
              <div className="flex justify-between items-center">
                <button onClick={() => setScene('LANDING')} className="text-[10px] tracking-[0.4em] uppercase text-white/20 hover:text-white transition-all">← Back</button>
                <button onClick={() => setIsNight(!isNight)} className="text-[8px] tracking-[0.3em] uppercase text-[#c5a059] border border-[#c5a059]/20 px-4 py-2 rounded-full hover:bg-[#c5a059] hover:text-black transition-all">
                  {isNight ? 'Midnight View' : 'Solar View'}
                </button>
              </div>

              <div>
                <AnimatePresence mode="wait">
                  <motion.div key={active.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.8 }}>
                    <span className="text-[#c5a059] text-[8px] tracking-[0.8em] uppercase mb-4 block">{active.tagline}</span>
                    <h2 className="text-6xl lg:text-7xl italic font-extralight leading-[0.8] mb-8">{active.label}</h2>
                    <p className="text-white/40 text-[11px] max-w-xs italic leading-loose tracking-widest uppercase">{active.desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <nav className="flex flex-col gap-5">
                {SECTIONS.map((s, idx) => (
                  <button key={s.id} onClick={() => { setActiveIdx(idx); setGalleryIdx(-1); }} className={`group flex items-center gap-6 text-left transition-all duration-700 ${activeIdx === idx ? 'opacity-100' : 'opacity-10 hover:opacity-40'}`}>
                    <span className={`text-[9px] ${activeIdx === idx ? 'text-[#c5a059]' : 'text-white'}`}>0{idx + 1}</span>
                    <span className="uppercase tracking-[0.5em] text-[9px] font-light">{s.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* MAIN IMAGE VIEWPORT */}
            <div className="flex-1 relative bg-black overflow-hidden group">
              <AnimatePresence mode="wait">
                {active.id === 'contact' ? (
                  <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center p-8 bg-[#050505] z-10">
                    <div className="w-full max-w-xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl p-12 lg:p-16">
                      <h3 className="text-[#c5a059] uppercase tracking-[1em] text-[10px] mb-12 text-center">Concierge Inquiry</h3>
                      <form onSubmit={(e) => { e.preventDefault(); setStatus('SUCCESS'); }} className="space-y-8">
                        <input required type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] outline-none focus:border-[#c5a059] text-white" />
                        <input required type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] outline-none focus:border-[#c5a059] text-white" />
                        <button type="submit" className="w-full py-5 border border-[#c5a059] text-[#c5a059] text-[9px] tracking-[0.8em] uppercase hover:bg-[#c5a059] hover:text-black transition-all">
                          {status === 'SUCCESS' ? 'Sent Successfully' : 'Request Invitation'}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={currentImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0">
                    <img 
                      src={currentImg} 
                      className="w-full h-full object-cover brightness-[0.7] transition-transform duration-[10000ms] ease-out scale-110 group-hover:scale-100" 
                      alt={active.label}
                      onError={(e) => { 
                         console.warn(`Missing image: ${currentImg}`);
                         e.currentTarget.src = active.placeholder; 
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* OVERLAY NAVIGATION ARROWS */}
              {active.id !== 'contact' && (
                <div className="absolute inset-0 flex items-center justify-between px-8 lg:px-12 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <button onClick={prevSlide} className="w-14 h-14 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-[#c5a059] hover:border-[#c5a059] transition-all pointer-events-auto">←</button>
                    <button onClick={nextSlide} className="w-14 h-14 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-[#c5a059] hover:border-[#c5a059] transition-all pointer-events-auto">→</button>
                </div>
              )}

              {/* SLIDE INDICATORS (DASHES) */}
              {active.id !== 'contact' && (
                <div className="absolute bottom-12 right-12 flex gap-3 z-20">
                    {/* The dash for the main image */}
                    <button onClick={() => setGalleryIdx(-1)} className={`h-[1px] transition-all duration-1000 ${galleryIdx === -1 ? 'bg-[#c5a059] w-12' : 'bg-white/10 w-4'}`} />
                    {/* The dashes for the gallery images */}
                    {active.gallery.map((_, i) => (
                      <button key={i} onClick={() => setGalleryIdx(i)} className={`h-[1px] transition-all duration-1000 ${galleryIdx === i ? 'bg-[#c5a059] w-12' : 'bg-white/10 w-4'}`} />
                    ))}
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}