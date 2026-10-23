import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  ChevronRight, 
  Home, 
  Layers, 
  Dna, 
  FlaskConical, 
  BookOpen, 
  Sparkles, 
  Mic, 
  User, 
  ShieldCheck, 
  ExternalLink,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface SectionsMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLiveVoice: () => void;
  onOpenPortal: () => void;
  onOpenAIConsole: () => void;
}

export const SectionsMenuModal: React.FC<SectionsMenuModalProps> = ({
  isOpen,
  onClose,
  onOpenLiveVoice,
  onOpenPortal,
  onOpenAIConsole,
}) => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [searchFilter, setSearchFilter] = useState('');

  // Handle ESC key to smoothly close the drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
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

  const sectionsList = [
    {
      id: 'hero',
      number: '01',
      title: language === 'sq' ? 'Kryefaqja & Prezantimi i SHBBSH' : language === 'it' ? 'Home & Presentazione SHBBSH' : 'Home & SHBBSH Presentation',
      category: language === 'sq' ? 'Kryesore' : language === 'it' ? 'Principale' : 'Overview',
      desc: language === 'sq' ? 'Misioni i shoqatës, statistikat e anëtarësisë dhe aseti kryesor eksperimental.' : language === 'it' ? 'Missione dell\'associazione, statistiche e progetto sperimentale principale.' : 'Association mission, membership statistics, and flagship clinical asset.',
      icon: Home,
      action: () => {
        onClose();
        setTimeout(() => {
          document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
    {
      id: 'pipeline',
      number: '02',
      title: language === 'sq' ? 'Programet Terapeutike & Matrica R&D' : language === 'it' ? 'Pipeline Terapeutica & R&D' : 'Therapeutics Pipeline & R&D Matrix',
      category: language === 'sq' ? 'Kërkim & Zhvillim' : language === 'it' ? 'Ricerca & Sviluppo' : 'R&D',
      desc: language === 'sq' ? 'Matrica e avancimit për vaksinat mRNA/LNP, CRISPR, onkologjinë dhe biokatalizën.' : language === 'it' ? 'Avanzamento vaccini mRNA, editing CRISPR e biotecnologia sintetica.' : 'Pipeline progress tracking for mRNA/LNP, CRISPR editing, and oncology.',
      icon: Layers,
      action: () => {
        onClose();
        setTimeout(() => {
          document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
    {
      id: 'breakthroughs',
      number: '03',
      title: language === 'sq' ? 'Zbulimet e Fundit Shkencore (Breakthroughs)' : language === 'it' ? 'Recenti Scoperte Scientifiche' : 'Recent Research Breakthroughs',
      category: language === 'sq' ? 'Lajme & Botime' : language === 'it' ? 'Notizie & Pubblicazioni' : 'News & Breakthroughs',
      desc: language === 'sq' ? 'Zbulimet më të fundit me botime DOI, kërkuesit kryesorë dhe të dhëna të plota.' : language === 'it' ? 'I più recenti traguardi con DOI, ricercatori principali e articoli completi.' : 'Latest peer-reviewed discoveries with DOIs, lead scientists, and disclosures.',
      icon: Sparkles,
      action: () => {
        onClose();
        setTimeout(() => {
          document.getElementById('breakthroughs')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
    {
      id: 'workbench-3d',
      number: '04',
      title: language === 'sq' ? 'Visualizuesi Molekular 3D (PDB / 3Dmol.js)' : language === 'it' ? 'Visualizzatore Molecolare 3D (PDB)' : '3D Molecular Structure Visualizer (PDB)',
      category: language === 'sq' ? 'Biologji Molekulare' : language === 'it' ? 'Biologia Molecolare' : 'Molecular Biology',
      desc: language === 'sq' ? 'Shikues 3D me WebGL për proteinat me ngjyrosje sipas AlphaFold pLDDT.' : language === 'it' ? 'Rendering 3D macromolecole WebGL con scoring di confidenza AlphaFold.' : 'Interactive WebGL macromolecule viewer with canonical AlphaFold pLDDT confidence coloring.',
      icon: Dna,
      action: () => {
        onClose();
        setTimeout(() => {
          document.getElementById('workbench')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
    {
      id: 'workbench-pubchem',
      number: '05',
      title: language === 'sq' ? 'PubChem Scout & Zbulimi i Barnave' : language === 'it' ? 'PubChem Scout & Proprietà Farmaci' : 'PubChem Small Molecule Scout',
      category: language === 'sq' ? 'Farmakologji' : language === 'it' ? 'Farmacologia' : 'Pharmacology',
      desc: language === 'sq' ? 'Kërkim i formulave kimike, strukturave 2D dhe verifikim i Rregullës së Lipinskit.' : language === 'it' ? 'Ricerca formule chimiche, strutture 2D e valutazione della Regola di Lipinski.' : 'Chemical formula lookup, 2D SMILES diagrams, and Lipinski Rule of 5 evaluation.',
      icon: FlaskConical,
      action: () => {
        onClose();
        setTimeout(() => {
          document.getElementById('workbench')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
    {
      id: 'workbench-literature',
      number: '06',
      title: language === 'sq' ? 'PubMed NCBI & Provat Klinike' : language === 'it' ? 'PubMed NCBI & Studi Clinici' : 'PubMed Literature & Clinical Trials',
      category: language === 'sq' ? 'Publikime' : language === 'it' ? 'Pubblicazioni' : 'Publications',
      desc: language === 'sq' ? 'Kërkim i drejtpërdrejtë në artikuj shkencorë mjekësorë dhe protokolle studimi.' : language === 'it' ? 'Ricerca diretta negli archivi PubMed e nei protocolli ClinicalTrials.gov.' : 'Real-time literature queries from PubMed NCBI and clinical trial study protocols.',
      icon: BookOpen,
      action: () => {
        onClose();
        setTimeout(() => {
          document.getElementById('workbench')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
    {
      id: 'ai-intelligence',
      number: '07',
      title: language === 'sq' ? 'BioAstra AI - Inteligjencë me Gemini 4' : language === 'it' ? 'BioAstra AI - Gemini 4 Argon' : 'BioAstra AI - Gemini 4 Argon Intelligence',
      category: language === 'sq' ? 'Inteligjencë Artificiale' : language === 'it' ? 'Intelligenza Artificiale' : 'Artificial Intelligence',
      desc: language === 'sq' ? 'Këshillim i thellë shkencor me High Thinking Mode dhe Google Search Grounding.' : language === 'it' ? 'Consulenza scientifica ad alto ragionamento con citazioni web in tempo reale.' : 'Deep reasoning STEM chatbot with Thinking Mode and real-time Search Grounding citations.',
      icon: Sparkles,
      action: () => {
        onClose();
        setTimeout(() => {
          onOpenAIConsole();
        }, 150);
      },
    },
    {
      id: 'live-voice',
      number: '08',
      title: language === 'sq' ? 'AstraVoice Live (Bisedë me Zë në Kohë Reale)' : language === 'it' ? 'AstraVoice Live (Conversazione Vocale)' : 'AstraVoice Live (Real-Time Voice API)',
      category: language === 'sq' ? 'Ndërfaqe Zanore' : language === 'it' ? 'Interfaccia Vocale' : 'Voice Assistant',
      desc: language === 'sq' ? 'Bisedë interaktive me zë natyral për pyetje mbi biologjinë dhe bioteknologjinë.' : language === 'it' ? 'Interazione vocale bidirezionale a bassa latenza con Gemini Live.' : 'Low-latency natural speech conversation with Gemini Live via bidirectional WebSockets.',
      icon: Mic,
      action: () => {
        onClose();
        setTimeout(() => {
          onOpenLiveVoice();
        }, 150);
      },
    },
    {
      id: 'portal',
      number: '09',
      title: language === 'sq' ? 'Portali i Kërkuesit & Shënimet Laboratorike' : language === 'it' ? 'Portale Membri & Note di Laboratorio' : 'Researcher Portal & Lab Notes',
      category: language === 'sq' ? 'Portali Kërkimor' : language === 'it' ? 'Area Membri' : 'Member Portal',
      desc: language === 'sq' ? 'Ruani shënime laboratori dhe struktura molekulare me bazën e të dhënave Firestore.' : language === 'it' ? 'Salva note di laboratorio e strutture 3D salvate sul database Firestore.' : 'Persistent user lab notes and bookmarked 3D structures backed by secure Firestore.',
      icon: User,
      action: () => {
        onClose();
        setTimeout(() => {
          onOpenPortal();
        }, 150);
      },
    },
    {
      id: 'about',
      number: '10',
      title: language === 'sq' ? 'Bordi Drejtues, Bioetika & Rrjeti' : language === 'it' ? 'Consiglio Direttivo, Etica & Rete' : 'Leadership, Bioethics & Research Network',
      category: language === 'sq' ? 'Qeverisja' : language === 'it' ? 'Governance' : 'Governance',
      desc: language === 'sq' ? 'Udhëheqja e SHBBSH, parimet etike të kërkimit gjenetik dhe rrjeti i bashkëpunimit.' : language === 'it' ? 'Consiglio direttivo, principi etici e rete dei centri di ricerca partner.' : 'Executive leadership, somatic gene editing ethics code, and international scientific alliances.',
      icon: ShieldCheck,
      action: () => {
        onClose();
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      },
    },
  ];

  const filteredSections = sectionsList.filter((sec) => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return true;
    return (
      sec.title.toLowerCase().includes(q) ||
      sec.category.toLowerCase().includes(q) ||
      sec.desc.toLowerCase().includes(q) ||
      sec.number.includes(q)
    );
  });

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Dimmed Blurred Backdrop with smooth fade transition */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Right-Side Slide-Over Menu Drawer with smooth transform animation */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          theme === 'dark' 
            ? 'bg-slate-900 border-l border-slate-800 text-slate-100' 
            : 'bg-white border-l border-slate-200 text-slate-900'
        }`}
      >
        {/* Drawer Header Bar */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between gap-4 shrink-0 transition-colors ${
          theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            {/* Official Circular Logo */}
            <div className="w-9 h-9 rounded-full overflow-hidden border border-cyan-500/40 shadow-sm bg-white shrink-0 p-0.5">
              <img src="/assets/shbbsh-logo.svg" alt="SHBBSH" className="w-full h-full object-contain" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-cyan-500">
                <span>SHBBSH</span>
                <span>·</span>
                <span>Menu</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight leading-tight">
                {language === 'sq' ? 'Menu e Seksioneve' : language === 'it' ? 'Menu delle Sezioni' : 'Sections Menu'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-all ${
              theme === 'dark' 
                ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700' 
                : 'border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-slate-200 hover:border-slate-300'
            }`}
            title="Mbyll Menunë (ESC)"
            aria-label="Mbyll Menunë"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Search Filter Bar */}
        <div className={`p-4 border-b shrink-0 transition-colors ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={language === 'sq' ? 'Kërko seksionin (p.sh. 3D, Pipeline, AI, Zbulimet)...' : 'Filter sections...'}
              className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-colors font-sans ${
                theme === 'dark'
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Sections Rows List - All Rows Stacked in Single Column */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {filteredSections.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              Nuk u gjet asnjë seksion për &quot;{searchFilter}&quot;
            </div>
          ) : (
            filteredSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={sec.action}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 group flex items-center justify-between gap-3.5 ${
                    theme === 'dark'
                      ? 'bg-slate-950/60 border-slate-800/80 hover:border-cyan-500/60 hover:bg-slate-800/70 shadow-xs'
                      : 'bg-slate-50/90 border-slate-200 hover:border-cyan-500/60 hover:bg-cyan-50/40 shadow-xs'
                  }`}
                >
                  {/* Left: Number & Icon */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs font-bold text-cyan-500 w-5">
                      {sec.number}
                    </span>

                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Center: Title & Short Desc in a Single Row */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold tracking-tight truncate group-hover:text-cyan-500 transition-colors">
                        {sec.title}
                      </h4>
                      <span className={`hidden xs:inline text-[10px] font-mono px-2 py-0.5 rounded-md border shrink-0 ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
                      }`}>
                        {sec.category}
                      </span>
                    </div>

                    <p className={`text-[11px] leading-tight truncate mt-0.5 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {sec.desc}
                    </p>
                  </div>

                  {/* Right: Forward Arrow on Hover */}
                  <div className="shrink-0 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Drawer Bottom Bar */}
        <div className={`p-4 border-t flex items-center justify-between text-xs font-mono shrink-0 transition-colors ${
          theme === 'dark' ? 'bg-slate-950/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <span className="text-[11px] truncate max-w-[220px]">
            sekretariati@shbbsh.al
          </span>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border text-cyan-500 hover:bg-cyan-500 hover:text-slate-950 font-bold transition-all text-xs"
          >
            {language === 'sq' ? 'Mbyll Menunë' : language === 'it' ? 'Chiudi Menu' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
