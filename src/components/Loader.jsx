import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        // Random jumps for a glitchy/fast load effect
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-primary-dark flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      
      <div className="relative z-10 w-full px-8 md:px-24 flex flex-col items-center justify-center">
        {/* Massive Progress Number */}
        <div className="font-heading font-black text-[30vw] leading-none text-white tracking-tighter">
          {progress}
          <span className="text-accent text-[15vw]">.</span>
        </div>

        {/* Brutalist Progress Bar */}
        <div className="w-full max-w-2xl h-2 bg-surface-border mt-8 overflow-hidden">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        
        <div className="flex justify-between w-full max-w-2xl mt-4 font-mono text-xs uppercase tracking-widest text-text-muted">
          <span>Loading Assets</span>
          <span>SYSTEM.READY</span>
        </div>
      </div>
    </motion.div>
  );
}
