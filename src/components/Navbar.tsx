import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Mic, 
  User as UserIcon, 
  LogOut, 
  ChevronDown
} from 'lucide-react';
import { User } from 'firebase/auth';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Language } from '../translations';
import { SHBBSHLogo } from './SHBBSHLogo';

interface NavbarProps {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onOpenPortal: () => void;
  onOpenLiveVoice: () => void;
  onOpenSectionsMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onSignIn,
  onSignOut,
  onOpenPortal,
  onOpenLiveVoice,
  onOpenSectionsMenu,
}) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'sq', label: 'Shqip', flag: '🇦🇱' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  ];

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 w-full max-w-full transition-colors backdrop-blur-md border-b ${
      theme === 'dark' 
        ? 'bg-slate-950/90 border-slate-800/80 text-white shadow-lg shadow-black/20' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Zone 1: Association Official Circular Seal Logo & Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 group shrink-0 py-1">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-md group-hover:scale-105 transition-transform bg-white shrink-0 flex items-center justify-center p-0.5">
            <img
              src="/assets/shbbsh-logo.svg"
              alt="Logo Zyrtare SHBBSH"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap">
              SHBBSH
            </span>
            <span className={`text-[10px] sm:text-[11px] font-medium leading-tight max-w-[180px] sm:max-w-sm truncate ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {t.orgName}
            </span>
          </div>
        </a>

        {/* Zone 2: Right Controls & 3-Lines Menu Drawer Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:border-slate-300'
            }`}
            title={theme === 'dark' ? 'Kalo në Light Mode' : 'Kalo në Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{languages.find((l) => l.code === language)?.flag}</span>
              <span className="uppercase font-mono">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className={`absolute right-0 mt-1.5 w-36 rounded-xl border shadow-xl py-1 z-50 text-xs font-medium font-sans ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors ${
                      language === l.code
                        ? 'bg-cyan-500/10 text-cyan-500 font-bold'
                        : theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    {language === l.code && <span className="text-cyan-500 font-bold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Live Voice AI Assistant Button */}
          <button
            onClick={onOpenLiveVoice}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap shrink-0 ${
              theme === 'dark'
                ? 'text-cyan-300 bg-cyan-950/80 border-cyan-500/30 hover:bg-cyan-900/60 hover:border-cyan-400/50'
                : 'text-cyan-800 bg-cyan-50 border-cyan-300 hover:bg-cyan-100 hover:border-cyan-400'
            }`}
            title="AstraVoice Live AI Assistant"
          >
            <Mic className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
            <span className="hidden sm:inline">{t.nav.liveVoice}</span>
          </button>

          {/* User Auth / Portal Access */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenPortal}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-xl border transition-colors whitespace-nowrap shrink-0 ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-4 h-4 rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-cyan-500" />
                )}
                <span className="max-w-[80px] truncate">{user.displayName || t.nav.portal}</span>
              </button>
              <button
                onClick={onSignOut}
                className={`p-1.5 rounded-xl border transition-colors ${
                  theme === 'dark' ? 'border-slate-800 text-slate-400 hover:text-rose-400' : 'border-slate-200 text-slate-500 hover:text-rose-600'
                }`}
                title={t.nav.signOut}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-sm shadow-cyan-500/20 transition-all whitespace-nowrap shrink-0"
            >
              {t.nav.signIn}
            </button>
          )}

          {/* Prominent 3-Lines Right Drawer Menu Trigger */}
          <button
            onClick={onOpenSectionsMenu}
            className={`group flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border font-mono text-xs font-bold transition-all duration-200 shrink-0 ${
              theme === 'dark'
                ? 'bg-slate-900/95 hover:bg-cyan-950/70 border-slate-700 hover:border-cyan-500 text-white hover:text-cyan-300 shadow-md shadow-cyan-950/20'
                : 'bg-slate-100 hover:bg-cyan-50 border-slate-300 hover:border-cyan-400 text-slate-900 hover:text-cyan-900 shadow-xs'
            }`}
            title="Hap Menunë e Seksioneve"
            aria-label="Hap Menunë e Seksioneve"
          >
            {/* 3 Horizontal Lines Icon */}
            <div className="flex flex-col justify-between w-4.5 h-3.5 space-y-1">
              <span className="w-full h-0.5 bg-cyan-500 rounded-full group-hover:bg-cyan-400 transition-colors"></span>
              <span className="w-3/4 h-0.5 bg-cyan-500 rounded-full group-hover:w-full group-hover:bg-cyan-400 transition-all duration-200"></span>
              <span className="w-full h-0.5 bg-cyan-500 rounded-full group-hover:bg-cyan-400 transition-colors"></span>
            </div>
            
            <span className="tracking-wide">Menu</span>
          </button>

        </div>

      </div>
    </header>
  );
};

