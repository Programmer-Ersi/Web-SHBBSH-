import React, { useState } from 'react';
import { Sparkles, Mic, Bot, X, MessageSquare, ChevronUp, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface FloatingAIAgentToggleProps {
  onOpenLiveVoice: () => void;
  onOpenAIConsole: () => void;
}

export const FloatingAIAgentToggle: React.FC<FloatingAIAgentToggleProps> = ({
  onOpenLiveVoice,
  onOpenAIConsole,
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2.5 font-sans">
      
      {/* Expanded Quick Action Popover Menu */}
      {isOpen && (
        <div className={`w-72 rounded-2xl border shadow-2xl p-3.5 mb-1 animate-in fade-in slide-in-from-bottom-4 duration-200 backdrop-blur-xl ${
          theme === 'dark' 
            ? 'bg-slate-900/95 border-cyan-500/30 text-white shadow-cyan-950/40' 
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-inherit">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-tight">BioAstra AI Agent</h4>
                <p className="text-[10px] text-cyan-500 font-mono">Gemini 4 Argon Live</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1.5">
            {/* Live Voice Assistant Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenLiveVoice();
              }}
              className="w-full text-left p-2.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 transition-all flex items-center gap-2.5 group"
            >
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>AstraVoice Live</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">Zë Reale</span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  {language === 'sq' ? 'Bisedo me zë për kërkimin shkencor' : 'Voice chat with AI'}
                </p>
              </div>
            </button>

            {/* Deep Scientific AI Chat Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAIConsole();
              }}
              className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-2.5 group ${
                theme === 'dark' 
                  ? 'bg-slate-800/80 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-200' 
                  : 'bg-slate-50 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 text-slate-800'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold flex items-center justify-between">
                  <span>Konsola BioAstra</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">Thinking</span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  {language === 'sq' ? 'Pyetje mbi gjenomikën & terapitë' : 'Deep scientific AI reasoning'}
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Main Small Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full border shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen
            ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-cyan-500/30'
            : theme === 'dark'
            ? 'bg-slate-900/95 hover:bg-cyan-950 border-cyan-500/40 text-cyan-300 shadow-slate-950/80 hover:border-cyan-400'
            : 'bg-white hover:bg-cyan-50 border-cyan-400 text-cyan-900 shadow-lg hover:border-cyan-500'
        }`}
        title="Agjenti BioAstra AI"
        aria-label="Agjenti BioAstra AI Toggle"
      >
        {/* Pulsing Outer Glow Ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-slate-950"></span>
        </span>

        <Bot className={`w-4 h-4 transition-transform group-hover:rotate-12 ${isOpen ? 'text-slate-950' : 'text-cyan-400'}`} />
        
        <span className="text-xs font-bold font-mono tracking-tight whitespace-nowrap">
          {isOpen ? 'Mbyll' : 'BioAstra AI'}
        </span>

        <Zap className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180 text-slate-950' : 'text-amber-400'}`} />
      </button>

    </div>
  );
};
