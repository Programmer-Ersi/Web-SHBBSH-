import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Scroll position progress through research sections"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-slate-950/20 backdrop-blur-[1px] pointer-events-none"
    >
      {/* Animated Glowing Progress Fill */}
      <div
        className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-teal-300 transition-[width] duration-75 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Radiant leading-edge beacon glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300 blur-[2px] opacity-90 shadow-[0_0_12px_rgba(6,182,212,0.9),0_0_6px_rgba(20,184,166,0.8)]" />
      </div>
    </div>
  );
};
