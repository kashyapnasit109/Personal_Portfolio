import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDownRight } from 'react-icons/fi';
import gsap from 'gsap';
import profileImg from '../assets/profile.jpg';

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Reveal image mask on mount
    gsap.to(imageRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.5,
      ease: 'power4.inOut',
      delay: 0.5
    });

    // Parallax image on scroll
    gsap.to(imageRef.current.querySelector('img'), {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-primary-dark">
      <div className="bg-grid absolute inset-0 opacity-40 pointer-events-none"></div>

      {/* Marquee Background */}
      <div className="absolute top-1/3 left-0 w-full -translate-y-1/2 opacity-[0.03] pointer-events-none z-0 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content font-heading font-black text-[20vw] leading-none whitespace-nowrap">
            INTELLIGENT SYSTEMS — PRACTICAL LOGIC — DATA STRUCTURES — 
          </div>
          <div className="marquee-content font-heading font-black text-[20vw] leading-none whitespace-nowrap" aria-hidden="true">
            INTELLIGENT SYSTEMS — PRACTICAL LOGIC — DATA STRUCTURES — 
          </div>
        </div>
      </div>

      <div className="container-custom relative z-10 h-full flex flex-col justify-center">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-xs"
          >
            <p className="font-mono text-xs text-text-secondary uppercase tracking-widest leading-relaxed">
              Based in India. <br/>
              Computer Science Student <br/> & System Builder.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="chip border-accent text-accent">Status: Available for Internships</div>
          </motion.div>
        </div>

        {/* Massive Typography & Image Integration */}
        <div className="relative w-full mb-12">
          {/* Text Layer (Behind image on desktop, above on mobile) */}
          <div className="relative z-10 md:z-0 mix-blend-difference pointer-events-none">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="heading-massive text-white m-0"
            >
              KASHYAP
            </motion.h1>
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="heading-massive text-white m-0 md:ml-[15%]"
            >
              NASIT<span className="text-accent">.</span>
            </motion.h1>
          </div>

          {/* Profile Image (Absolute centered on desktop) */}
          <div 
            ref={imageRef}
            className="reveal-mask relative md:absolute md:top-1/2 md:left-[60%] md:-translate-y-1/2 md:-translate-x-1/2 w-full max-w-[300px] aspect-[3/4] md:w-[350px] mt-8 md:mt-0 z-0 md:z-20 border border-surface-border bg-surface overflow-hidden"
          >
            {/* 
              Placeholder for the user's uploaded image. 
              Instructing user to replace this with src/assets/profile.jpg
            */}
            <img 
              src={profileImg} 
              alt="Kashyap Nasit" 
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 border border-white/10 m-2 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute bottom-4 left-4 bg-primary-dark/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] uppercase tracking-widest border border-white/10">
              profile.jpg
            </div>
          </div>
        </div>

        {/* Footer Area of Hero */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mt-10 border-t border-surface-border pt-8">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-sans text-sm md:text-base text-text-secondary max-w-md"
          >
            Designing practical digital systems where logic, structured data, and <span className="text-white">AI-assisted workflows</span> merge into real-world solutions.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            onClick={scrollToAbout}
            className="btn-accent flex items-center gap-3 group"
          >
            Discover More
            <FiArrowDownRight className="text-lg group-hover:rotate-[-45deg] transition-transform duration-300" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
