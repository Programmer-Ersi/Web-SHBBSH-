import React from 'react';
import { ArrowRight, Dna, Sparkles, Microscope } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { BiotechHeroAnimation } from './BiotechHeroAnimation';

interface HeroProps {
  onExploreWorkbench: () => void;
  onExploreAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWorkbench, onExploreAI }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section id="hero" className={`relative overflow-hidden pt-10 pb-20 border-b transition-colors ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Editorial Split Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Title Block with Biotech Animation Backdrop */}
            <div className={`relative rounded-3xl p-6 sm:p-8 border overflow-hidden shadow-2xl backdrop-blur-xl transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-950/75 border-cyan-500/30 text-white shadow-cyan-950/50'
                : 'bg-white/85 border-cyan-300/80 text-slate-900 shadow-cyan-500/10'
            }`}>
              
              {/* Background Biotech & Biology Animation (DNA Strand + Molecular Nodes) */}
              <BiotechHeroAnimation />

              {/* Title Content */}
              <div className="relative z-10 space-y-4">
                
                {/* Official SHBBSH Emblem & Brand Kicker */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-xl shadow-cyan-500/20 bg-white shrink-0 p-0.5 group hover:scale-105 transition-transform">
                    <img
                      src="/assets/shbbsh-logo.svg"
                      alt="Logo Zyrtare SHBBSH"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <span className={`text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-block mb-1 border transition-colors ${
                      theme === 'dark'
                        ? 'bg-cyan-950/80 border-cyan-500/30 text-cyan-400'
                        : 'bg-cyan-50 border-cyan-300 text-cyan-800'
                    }`}>
                      {t.hero.kicker}
                    </span>
                    <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      SHBBSH
                    </h2>
                  </div>
                </div>

                <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-wrap balance drop-shadow-xs ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {t.hero.titlePart1} — <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                    theme === 'dark'
                      ? 'from-cyan-400 via-teal-300 to-emerald-400'
                      : 'from-cyan-600 via-teal-600 to-emerald-600'
                  }`}>{t.hero.titleGradient}</span> {t.hero.titlePart2}
                </h1>
              </div>
            </div>
            
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed font-normal ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#pipeline"
                className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <span>{t.hero.ctaPipeline}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onExploreWorkbench}
                className={`px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl border transition-colors flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-100'
                    : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-800 shadow-xs'
                }`}
              >
                <Dna className="w-4 h-4 text-cyan-500" />
                <span>{t.hero.ctaWorkbench}</span>
              </button>

              <button
                onClick={onExploreAI}
                className={`px-5 py-3 text-xs sm:text-sm font-semibold rounded-xl border transition-colors flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-cyan-950/60 border-cyan-800/80 hover:bg-cyan-900/40 text-cyan-300'
                    : 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100 text-cyan-800'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.hero.ctaAI}</span>
              </button>
            </div>
          </div>

          {/* Right Highlight Feature Box */}
          <div className={`lg:col-span-4 rounded-2xl p-6 border backdrop-blur-sm space-y-5 shadow-2xl transition-colors ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-inherit">
              <div className="flex items-center gap-2">
                <Microscope className="w-4 h-4 text-teal-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                  {t.hero.flagshipLabel}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-500 font-bold">FAZA III</span>
            </div>

            <div>
              <div className="text-lg font-bold font-mono">
                {t.hero.flagshipTitle}
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.hero.flagshipDesc}
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{t.hero.flagshipMetricLabel}</span>
                <span className="text-cyan-500 font-bold">{t.hero.flagshipMetricVal}</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full w-[82%]" />
              </div>
            </div>

            <div className="pt-2 border-t border-inherit flex items-center justify-between text-xs text-slate-500">
              <span>SHBBSH R&D Advisory</span>
              <a href="#pipeline" className="text-cyan-500 hover:underline flex items-center gap-1 font-semibold">
                <span>{t.hero.viewAllPipeline}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Quantitative Metrics Telemetry Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-inherit">
          <div className={`rounded-xl p-4 border transition-colors ${
            theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="text-xs font-mono tracking-wider text-slate-500 uppercase">{t.hero.statPrograms}</div>
            <div className="text-3xl font-extrabold font-mono tabular-nums mt-1">14</div>
            <div className="text-xs text-emerald-500 font-mono mt-0.5">{t.hero.statProgramsSub}</div>
          </div>

          <div className={`rounded-xl p-4 border transition-colors ${
            theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="text-xs font-mono tracking-wider text-slate-500 uppercase">{t.hero.statTrials}</div>
            <div className="text-3xl font-extrabold text-cyan-500 font-mono tabular-nums mt-1">03</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{t.hero.statTrialsSub}</div>
          </div>

          <div className={`rounded-xl p-4 border transition-colors ${
            theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="text-xs font-mono tracking-wider text-slate-500 uppercase">{t.hero.statPubs}</div>
            <div className="text-3xl font-extrabold font-mono tabular-nums mt-1">480+</div>
            <div className="text-xs text-cyan-500 font-mono mt-0.5">{t.hero.statPubsSub}</div>
          </div>

          <div className={`rounded-xl p-4 border transition-colors ${
            theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="text-xs font-mono tracking-wider text-slate-500 uppercase">{t.hero.statMembers}</div>
            <div className="text-3xl font-extrabold text-emerald-500 font-mono tabular-nums mt-1">1,250+</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{t.hero.statMembersSub}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
