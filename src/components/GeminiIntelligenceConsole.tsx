import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { 
  Sparkles, 
  Send, 
  Search, 
  BrainCircuit, 
  RotateCw, 
  ExternalLink, 
  User, 
  Bot,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface GeminiIntelligenceConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeminiIntelligenceConsole: React.FC<GeminiIntelligenceConsoleProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: t.ai.welcomeMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [useThinking, setUseThinking] = useState<boolean>(true);
  const [useSearch, setUseSearch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const threadEndRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!promptText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          useThinking,
          useSearch,
        }),
      });

      if (!res.ok) {
        throw new Error('BioAstra AI server failed to respond');
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'Analysis complete.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        searchSources: data.searchSources || [],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: language === 'sq' 
            ? 'Një vonesë e përkohshme llogaritëse ndodhi. Ju lutemi provoni sërish dërgimin e pyetjes.'
            : 'A temporary computation latency occurred. Please try resending your prompt.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = language === 'sq' ? [
    'Analizo mutacionet onkogjenike të p53 dhe molekulat reaktive',
    'Shpjego raportet e formulimit të lipideve për vaksinat mRNA/LNP',
    'Krahaso sigurinë e CRISPR Cas9 me Prime Editing në provat klinike',
    'Cilat janë modifikimet kryesore për të rritur termostabilitetin e enzimës PETase?',
  ] : language === 'it' ? [
    'Analizza i punti caldi di mutazione di p53 e le terapie bersaglio',
    'Spiega i rapporti di formulazione lipidica per il rilascio di mRNA',
    'Confronta CRISPR Cas9 con Prime Editing nei profili di sicurezza clinica',
    'Quali modifiche aumentano la termostabilità dell\'enzima PETase?',
  ] : [
    'Analyze p53 tumor suppressor mutation hotspots and target small-molecule reactivators',
    'Explain ionizable lipid formulation ratios for mRNA LNP endosomal escape',
    'Compare CRISPR Cas9 versus Prime Editing off-target safety in clinical trials',
    'Formulate active-site amino acid substitutions to increase PETase enzyme thermostability',
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      aria-modal="true"
      role="dialog"
    >
      {/* Dimmed backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Card */}
      <div className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 transition-colors ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Top Header Bar */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 shrink-0 transition-colors ${
          theme === 'dark' ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-500 truncate">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{t.ai.kicker}</span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-500 font-bold">Active</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight truncate">
                {t.ai.title}
              </h3>
            </div>
          </div>

          {/* Feature Toggles & Close Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setUseThinking(!useThinking)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-colors border ${
                useThinking
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-500 font-bold'
                  : theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
              title="Toggle Thinking Mode"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-amber-500" />
              <span>Thinking</span>
            </button>

            <button
              onClick={() => setUseSearch(!useSearch)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-colors border ${
                useSearch
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-500 font-bold'
                  : theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
              title="Toggle Search Grounding"
            >
              <Search className="w-3.5 h-3.5 text-cyan-500" />
              <span>Search</span>
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-all ${
                theme === 'dark' 
                  ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' 
                  : 'border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-slate-200'
              }`}
              title="Mbyll Konsolën (ESC)"
              aria-label="Mbyll Konsolën"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Console Sub-Bar */}
        <div className={`px-4 py-2 border-b flex items-center justify-between text-xs font-mono shrink-0 ${
          theme === 'dark' ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-100/80 border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="truncate">Model: {useThinking ? 'gemini-4-argon' : 'gemini-3.8-flash'}</span>
          </div>

          <div className="shrink-0 text-cyan-500 font-semibold">
            {t.ai.advisorRole}
          </div>
        </div>

        {/* Scrollable Chat Thread Area */}
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 ${
          theme === 'dark' ? 'bg-slate-950/50' : 'bg-slate-50/70'
        }`}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 max-w-4xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                msg.role === 'user' 
                  ? 'bg-cyan-500 text-slate-950' 
                  : 'bg-gradient-to-tr from-cyan-600 to-teal-400 text-slate-950'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`space-y-1.5 max-w-2xl ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>{msg.role === 'user' ? 'Researcher' : 'BioAstra AI'}</span>
                  <span>·</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white'
                    : theme === 'dark' 
                      ? 'bg-slate-900 border border-slate-800 text-slate-200' 
                      : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
                }`}>
                  {msg.content}
                </div>

                {/* Citations */}
                {msg.searchSources && msg.searchSources.length > 0 && (
                  <div className="pt-1.5 flex flex-wrap gap-2 text-xs font-mono">
                    <span className="text-slate-400">Citations:</span>
                    {msg.searchSources.map((src, i) => (
                      <a
                        key={i}
                        href={src.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 hover:underline px-2 py-0.5 rounded-md border ${
                          theme === 'dark' 
                            ? 'bg-slate-900 border-slate-800 text-cyan-400' 
                            : 'bg-slate-100 border-slate-200 text-cyan-700'
                        }`}
                      >
                        <span>{src.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className={`p-4 rounded-2xl border text-xs font-mono text-cyan-500 flex items-center gap-2 ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>BioAstra AI ({useThinking ? 'gemini-4-argon' : 'gemini-3.8-flash'}) is computing response...</span>
              </div>
            </div>
          )}

          <div ref={threadEndRef} />
        </div>

        {/* Sample Prompts Row */}
        <div className={`p-3 border-t flex items-center gap-2 overflow-x-auto text-xs font-mono shrink-0 ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <span className="text-slate-400 whitespace-nowrap shrink-0">{t.ai.quickPromptsLabel}</span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className={`px-2.5 py-1 rounded-lg border transition-colors whitespace-nowrap shrink-0 text-[11px] ${
                theme === 'dark' 
                  ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className={`p-3.5 sm:p-4 border-t flex gap-3 shrink-0 ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.ai.inputPlaceholder}
            className={`flex-1 border rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 font-sans ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-xl transition-all flex items-center gap-2 shrink-0 font-mono shadow-md shadow-cyan-500/20"
          >
            <span className="hidden sm:inline">{t.ai.analyzeBtn}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

