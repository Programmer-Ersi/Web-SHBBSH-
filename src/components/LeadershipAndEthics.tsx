import React from 'react';
import { Building2, CheckCircle2, Globe2, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const LeadershipAndEthics: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section id="about" className={`py-20 border-b transition-colors ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-500 mb-2">
              <Building2 className="w-4 h-4" />
              <span>{t.leadership.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              {t.leadership.title}
            </h2>
            <p className={`text-sm mt-2 max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.leadership.description}
            </p>
          </div>

          <div className={`flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded-xl border ${
            theme === 'dark' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400' : 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
          }`}>
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>SHBBSH · Bioethics & Scientific Governance</span>
          </div>
        </div>

        {/* Executive Leadership Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Executive Officer Portrait */}
          <div className={`lg:col-span-5 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 border shadow-xl transition-colors ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-xl bg-white">
              <img
                src="/src/assets/images/dr_elena_vance_1792692592857.jpg"
                alt="Prof. Dr. Elena Vance"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold">{t.leadership.csoName}</h3>
              <p className="text-xs font-mono text-cyan-500 mt-0.5">{t.leadership.csoRole}</p>
              <p className={`text-xs mt-3 max-w-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.leadership.csoBio}
              </p>
            </div>
          </div>

          {/* Ethics Principles Grid */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className={`rounded-xl p-5 space-y-2 border transition-colors ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>{t.leadership.principle1Title}</span>
              </div>
              <p className={`text-xs leading-relaxed pl-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.leadership.principle1Desc}
              </p>
            </div>

            <div className={`rounded-xl p-5 space-y-2 border transition-colors ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>{t.leadership.principle2Title}</span>
              </div>
              <p className={`text-xs leading-relaxed pl-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.leadership.principle2Desc}
              </p>
            </div>

            <div className={`rounded-xl p-5 space-y-2 border transition-colors ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{t.leadership.principle3Title}</span>
              </div>
              <p className={`text-xs leading-relaxed pl-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.leadership.principle3Desc}
              </p>
            </div>

          </div>

        </div>

        {/* Global Research Network Bar */}
        <div className={`rounded-2xl p-6 border transition-colors ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-500 mb-4 flex items-center gap-2 font-bold">
            <Globe2 className="w-4 h-4" />
            <span>{t.leadership.centersTitle}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold text-cyan-500">Tiranë, Shqipëri</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Selia Qendrore e SHBBSH</div>
            </div>

            <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold">Prishtinë & Shkup</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Bashkëpunimi Rajonal Akademik</div>
            </div>

            <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold">Zurich & Basel</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Qendrat Partnere të Bio-Inxhinierisë</div>
            </div>

            <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold">Cambridge & Boston</div>
              <div className="text-slate-400 text-[11px] mt-0.5">Rrjeti i Kërkimit Gjenomik</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
