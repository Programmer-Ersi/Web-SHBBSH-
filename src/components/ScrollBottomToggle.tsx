import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const ScrollBottomToggle: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);

      // If user has scrolled past 85% of page, consider them at bottom
      setIsAtBottom(progress > 85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleScroll = () => {
    if (isAtBottom) {
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // Scroll to bottom
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  const label = isAtBottom
    ? language === 'sq'
      ? 'Kreu'
      : language === 'it'
      ? 'Inizio'
      : 'Top'
    : language === 'sq'
    ? 'Në Fund'
    : language === 'it'
    ? 'In Fondo'
    : 'Bottom';

  const tooltip = isAtBottom
    ? language === 'sq'
      ? 'Kthehu në krye të faqes'
      : 'Scroll to top'
    : language === 'sq'
      ? 'Shko direkt në fund të faqes'
      : 'Scroll to bottom';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <button
        onClick={handleToggleScroll}
        className={`group relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 font-mono text-xs font-bold hover:scale-105 active:scale-95 ${
          theme === 'dark'
            ? 'bg-slate-900/90 border-slate-700/80 hover:border-cyan-500 text-slate-100 hover:text-cyan-300 shadow-cyan-950/30'
            : 'bg-white/95 border-slate-300 hover:border-cyan-500 text-slate-800 hover:text-cyan-900 shadow-slate-300/50'
        }`}
        title={tooltip}
        aria-label={tooltip}
      >
        {/* Animated Icon Indicator */}
        <div className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors shrink-0">
          {isAtBottom ? (
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          ) : (
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          )}
        </div>

        {/* Text Label */}
        <span className="font-semibold tracking-wide">
          {label}
        </span>

        {/* Mini Circular Scroll Progress Ring */}
        <div className="w-4 h-4 relative flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className={theme === 'dark' ? 'text-slate-800' : 'text-slate-200'}
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-cyan-500 transition-all duration-150"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeWidth="4"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};
