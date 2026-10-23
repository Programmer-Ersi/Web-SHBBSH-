import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  ArrowUp, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Dna, 
  Sparkles, 
  ShieldCheck, 
  FileText,
  Send
} from 'lucide-react';

interface FooterProps {
  onOpenAIConsole?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAIConsole }) => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <footer id="footer" className={`border-t text-xs font-sans transition-colors relative ${
      theme === 'dark' 
        ? 'bg-slate-950 border-slate-800/80 text-slate-400' 
        : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          
          {/* Col 1 (4 cols): Institutional Identity, Logo & Official Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-md bg-white shrink-0 p-0.5">
                <img
                  src="/assets/shbbsh-logo.svg"
                  alt="SHBBSH Logo Zyrtare"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className={`font-black text-base block tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  SHBBSH
                </span>
                <span className="text-[11px] font-semibold text-cyan-500 block leading-tight">
                  {t.orgSubtitle}
                </span>
              </div>
            </div>

            <p className={`text-xs leading-relaxed max-w-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {t.footer.desc}
            </p>

            {/* Official Headquarters Contact Points */}
            <div className={`pt-2 space-y-2 text-[11px] font-mono border-t ${
              theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Tiranë, Shqipëri · Fakulteti i Shkencave të Natyrës</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <a href="mailto:sekretariati@shbbsh.al" className="hover:text-cyan-500 hover:underline transition-colors">
                  sekretariati@shbbsh.al
                </a>
              </div>
            </div>
          </div>

          {/* Col 2 (3 cols): Lundrim i Shpejtë në Seksione */}
          <div className="lg:col-span-3 space-y-3 font-mono">
            <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>{language === 'sq' ? 'Seksionet Kryesore' : language === 'it' ? 'Sezioni Principali' : 'Core Sections'}</span>
            </div>
            
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pipeline" className="hover:text-cyan-500 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-500 text-[10px]">01.</span>
                  <span>{t.nav.pipeline}</span>
                </a>
              </li>
              <li>
                <a href="#breakthroughs" className="hover:text-cyan-500 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-500 text-[10px]">02.</span>
                  <span>{t.nav.breakthroughs}</span>
                </a>
              </li>
              <li>
                <a href="#workbench" className="hover:text-cyan-500 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-500 text-[10px]">03.</span>
                  <span>{t.nav.workbench}</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onOpenAIConsole?.()} 
                  className="hover:text-cyan-500 transition-colors flex items-center gap-1.5 text-left"
                >
                  <span className="text-cyan-500 text-[10px]">04.</span>
                  <span>{t.nav.ai}</span>
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-500 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-500 text-[10px]">05.</span>
                  <span>{t.nav.about}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 (2 cols): Veglat Shkencore & Baza e të Dhënave */}
          <div className="lg:col-span-2 space-y-3 font-mono">
            <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <Dna className="w-3.5 h-3.5 text-cyan-500" />
              <span>{t.footer.interactiveTools}</span>
            </div>
            
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#workbench" className="hover:text-cyan-500 transition-colors">
                  Visualizuesi 3D PDB
                </a>
              </li>
              <li>
                <a href="#workbench" className="hover:text-cyan-500 transition-colors">
                  Baza PubChem
                </a>
              </li>
              <li>
                <a href="#workbench" className="hover:text-cyan-500 transition-colors">
                  PubMed NCBI
                </a>
              </li>
              <li>
                <a href="#workbench" className="hover:text-cyan-500 transition-colors">
                  ClinicalTrials.gov
                </a>
              </li>
              <li>
                <button onClick={() => onOpenAIConsole?.()} className="hover:text-cyan-500 transition-colors text-left">
                  BioAstra AI Advisor
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 (3 cols): Buletini Shkencor i SHBBSH & Abonimi */}
          <div className="lg:col-span-3 space-y-3">
            <div className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'sq' ? 'Buletini Shkencor' : language === 'it' ? 'Bollettino Scientifico' : 'Scientific Bulletin'}</span>
            </div>

            <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'sq'
                ? 'Regjistrohuni për të marrë njoftimet e zbulimeve, thirrjet për bursa kërkimore dhe ftesat në kongres.'
                : language === 'it'
                ? 'Iscriviti per ricevere aggiornamenti sulle scoperte, borse di ricerca e inviti ai congressi.'
                : 'Subscribe to receive breakthrough alerts, scientific grant calls, and congress symposium notices.'}
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {language === 'sq' ? 'Faleminderit! U regjistruat me sukses.' : language === 'it' ? 'Grazie! Iscrizione completata.' : 'Thank you! Successfully subscribed.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="shkencetari@universiteti.al"
                    required
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-sans focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-colors ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <button
                    type="submit"
                    className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-sm shrink-0"
                    title="Abonohu"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 font-mono block">
                  {language === 'sq' ? 'Privatësi e garantuar. Pa spam.' : 'Strictly scientific updates. No spam.'}
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] ${
          theme === 'dark' ? 'border-slate-900 text-slate-500' : 'border-slate-200 text-slate-500'
        }`}>
          <div>
            &copy; {new Date().getFullYear()} Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë (SHBBSH). {t.footer.rights}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a href="#about" className="hover:text-cyan-500 hover:underline transition-colors">{t.footer.ethics}</a>
            <span>·</span>
            <span className="hover:text-cyan-500 hover:underline transition-colors cursor-pointer">{t.footer.terms}</span>
            <span>·</span>
            <span className="hover:text-cyan-500 hover:underline transition-colors cursor-pointer">{t.footer.privacy}</span>
            <span>·</span>
            <span className="text-cyan-500 font-bold">Tiranë, AL</span>
          </div>

          {/* Smooth Back to Top Button */}
          <button
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-950'
            }`}
            title="Kthehu në krye të faqes"
          >
            <ArrowUp className="w-3.5 h-3.5 text-cyan-500" />
            <span>Kreu</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
