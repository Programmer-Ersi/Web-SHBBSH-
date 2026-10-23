import React, { useState, useEffect, useRef } from 'react';
import { PdbStructureData, PubChemCompoundData, PubMedArticle, ClinicalTrialStudy } from '../types';
import { 
  Dna, 
  RotateCw, 
  Eye, 
  Layers, 
  Search, 
  BookOpen, 
  FlaskConical, 
  Bookmark, 
  Check, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface InteractiveWorkbenchProps {
  user: User | null;
  onOpenPortal: () => void;
}

const PRESET_PDB_EXEMPLARS = [
  { id: '4OO8', label: 'CRISPR-Cas9 (4OO8)', type: 'PDB', organism: 'Streptococcus pyogenes' },
  { id: '1TUP', label: 'p53 Tumor Suppressor (1TUP)', type: 'PDB', organism: 'Homo sapiens' },
  { id: '1JM7', label: 'BRCA1 Ring Domain (1JM7)', type: 'PDB', organism: 'Homo sapiens' },
  { id: '2P4E', label: 'PCSK9 Inhibitor Target (2P4E)', type: 'PDB', organism: 'Homo sapiens' },
  { id: '6VXX', label: 'SARS-CoV-2 Spike (6VXX)', type: 'PDB', organism: 'SARS-CoV-2' },
];

const PRESET_DRUG_CANDIDATES = ['Imatinib', 'Paclitaxel', 'Metformin', 'Doxorubicin', 'Remdesivir'];

export const InteractiveWorkbench: React.FC<InteractiveWorkbenchProps> = ({ user, onOpenPortal }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<'3d-mol' | 'pubchem' | 'pubmed' | 'trials'>('3d-mol');

  // 3Dmol state
  const [selectedPdb, setSelectedPdb] = useState<string>('4OO8');
  const [pdbData, setPdbData] = useState<PdbStructureData | null>(null);
  const [renderStyle, setRenderStyle] = useState<'cartoon' | 'stick' | 'sphere' | 'surface'>('cartoon');
  const [colorScheme, setColorScheme] = useState<'chain' | 'spectrum' | 'plddt'>('spectrum');
  const [isSpinning, setIsSpinning] = useState<boolean>(true);
  const [loadingPdb, setLoadingPdb] = useState<boolean>(false);
  const [pdbError, setPdbError] = useState<string | null>(null);

  // PubChem state
  const [compoundQuery, setCompoundQuery] = useState<string>('Imatinib');
  const [compoundData, setCompoundData] = useState<PubChemCompoundData | null>(null);
  const [loadingCompound, setLoadingCompound] = useState<boolean>(false);
  const [compoundError, setCompoundError] = useState<string | null>(null);

  // PubMed state
  const [pubmedQuery, setPubmedQuery] = useState<string>('CRISPR Cas9 gene editing therapeutics');
  const [articles, setArticles] = useState<PubMedArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState<boolean>(false);

  // Clinical Trials state
  const [trialQuery, setTrialQuery] = useState<string>('mRNA vaccine oncology');
  const [trials, setTrials] = useState<ClinicalTrialStudy[]>([]);
  const [loadingTrials, setLoadingTrials] = useState<boolean>(false);

  // Save Feedback
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  const molContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  // ---------------------------------------------------------------------------
  // 1. Fetch & Render 3D Molecule
  // ---------------------------------------------------------------------------
  const fetchPdbMetadata = async (pdbId: string) => {
    setLoadingPdb(true);
    setPdbError(null);
    try {
      const res = await fetch(`/api/science/pdb/${pdbId}`);
      if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
        throw new Error(`Structure ${pdbId} metadata not found`);
      }
      const data: PdbStructureData = await res.json();
      setPdbData(data);
      render3dmol(pdbId);
    } catch (err: any) {
      console.error(err);
      setPdbError(err?.message || 'Failed to load structure');
      render3dmol(pdbId);
    } finally {
      setLoadingPdb(false);
    }
  };

  const render3dmol = (pdbId: string) => {
    if (!molContainerRef.current) return;
    const window3Dmol = (window as any).$3Dmol || (window as any)['3Dmol'];

    if (!window3Dmol) {
      console.warn('3Dmol.js WebGL library is initializing...');
      return;
    }

    try {
      molContainerRef.current.innerHTML = '';
      const element = molContainerRef.current;
      const config = { backgroundColor: theme === 'dark' ? '#090d16' : '#0d1527' };
      const viewer = window3Dmol.createViewer(element, config);
      viewerRef.current = viewer;

      // Download PDB coordinates and render
      const pdbUri = `https://files.rcsb.org/download/${pdbId.toUpperCase()}.pdb`;
      
      fetch(pdbUri)
        .then((r) => r.text())
        .then((data) => {
          viewer.addModel(data, 'pdb');
          applyStyleAndColor(viewer, renderStyle, colorScheme);
          viewer.zoomTo();
          viewer.spin(isSpinning);
          viewer.render();
        })
        .catch((e) => {
          console.error('PDB download error:', e);
        });
    } catch (e) {
      console.error('3Dmol render error:', e);
    }
  };

  const applyStyleAndColor = (viewer: any, style: string, color: string) => {
    if (!viewer) return;
    viewer.setStyle({}, {});

    let colorOpt: any = {};
    if (color === 'chain') {
      colorOpt = { color: 'spectrum' };
    } else if (color === 'plddt') {
      colorOpt = {
        colorscheme: {
          prop: 'b',
          gradient: 'rwb',
          min: 40,
          max: 100,
        },
      };
    } else {
      colorOpt = { color: 'spectrum' };
    }

    if (style === 'cartoon') {
      viewer.setStyle({}, { cartoon: colorOpt });
    } else if (style === 'stick') {
      viewer.setStyle({}, { stick: colorOpt });
    } else if (style === 'sphere') {
      viewer.setStyle({}, { sphere: colorOpt });
    } else if (style === 'surface') {
      viewer.setStyle({}, { cartoon: colorOpt });
      viewer.addSurface((window as any)['3Dmol'].SurfaceType.VDW, { opacity: 0.6, color: 'white' });
    }
    viewer.render();
  };

  useEffect(() => {
    fetchPdbMetadata(selectedPdb);
  }, [selectedPdb, theme]);

  useEffect(() => {
    if (viewerRef.current) {
      applyStyleAndColor(viewerRef.current, renderStyle, colorScheme);
      viewerRef.current.spin(isSpinning);
    }
  }, [renderStyle, colorScheme, isSpinning]);

  // ---------------------------------------------------------------------------
  // 2. Fetch PubChem Compound
  // ---------------------------------------------------------------------------
  const fetchCompound = async (query: string) => {
    setLoadingCompound(true);
    setCompoundError(null);
    try {
      const res = await fetch(`/api/science/pubchem/${encodeURIComponent(query)}`);
      if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
        throw new Error(`Compound '${query}' not found in PubChem database`);
      }
      const data: PubChemCompoundData = await res.json();
      setCompoundData(data);
    } catch (err: any) {
      setCompoundError(err?.message || 'Failed to fetch PubChem candidate');
      setCompoundData(null);
    } finally {
      setLoadingCompound(false);
    }
  };

  useEffect(() => {
    fetchCompound(compoundQuery);
  }, []);

  // ---------------------------------------------------------------------------
  // 3. Fetch PubMed Literature
  // ---------------------------------------------------------------------------
  const fetchPubMed = async (query: string) => {
    setLoadingArticles(true);
    try {
      const res = await fetch(`/api/science/pubmed?q=${encodeURIComponent(query)}`);
      if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
        throw new Error('PubMed service unavailable');
      }
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingArticles(false);
    }
  };

  useEffect(() => {
    fetchPubMed(pubmedQuery);
  }, []);

  // ---------------------------------------------------------------------------
  // 4. Fetch Clinical Trials
  // ---------------------------------------------------------------------------
  const fetchClinicalTrials = async (query: string) => {
    setLoadingTrials(true);
    try {
      const res = await fetch(`/api/science/clinical-trials?q=${encodeURIComponent(query)}`);
      if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Clinical trials service unavailable');
      }
      const data = await res.json();
      setTrials(data.studies || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTrials(false);
    }
  };

  useEffect(() => {
    fetchClinicalTrials(trialQuery);
  }, []);

  // ---------------------------------------------------------------------------
  // Save Bookmarks to Firestore
  // ---------------------------------------------------------------------------
  const handleSaveStructure = async () => {
    if (!user) {
      onOpenPortal();
      return;
    }
    if (!pdbData) return;

    try {
      await addDoc(collection(db, 'saved_structures'), {
        userId: user.uid,
        pdbId: pdbData.pdbId,
        title: pdbData.title,
        organism: pdbData.organism,
        resolution: pdbData.resolution,
        savedAt: new Date().toISOString(),
      });
      setSavedSuccessMsg(`Saved structure ${pdbData.pdbId} to your Portal bookmarks!`);
      setTimeout(() => setSavedSuccessMsg(null), 3000);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'saved_structures');
    }
  };

  return (
    <section id="workbench" className={`py-20 border-b transition-colors ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-500 mb-2">
              <Dna className="w-4 h-4" />
              <span>{t.workbench.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              {t.workbench.title}
            </h2>
            <p className={`text-sm mt-2 max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.workbench.description}
            </p>
          </div>

          {/* Workbench Mode Tabs */}
          <div className={`flex flex-wrap gap-1 p-1.5 rounded-2xl border transition-colors ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <button
              onClick={() => setActiveTab('3d-mol')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === '3d-mol' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' 
                  : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Dna className="w-3.5 h-3.5" />
              <span>{t.workbench.tab3d}</span>
            </button>

            <button
              onClick={() => setActiveTab('pubchem')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'pubchem' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' 
                  : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{t.workbench.tabPubchem}</span>
            </button>

            <button
              onClick={() => setActiveTab('pubmed')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'pubmed' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' 
                  : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.workbench.tabPubmed}</span>
            </button>

            <button
              onClick={() => setActiveTab('trials')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'trials' 
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs' 
                  : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.workbench.tabTrials}</span>
            </button>
          </div>
        </div>

        {/* Feedback message */}
        {savedSuccessMsg && (
          <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{savedSuccessMsg}</span>
          </div>
        )}

        {/* TAB 1: 3D MOLECULAR VISUALIZER */}
        {activeTab === '3d-mol' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 3D WebGL Canvas */}
            <div className={`lg:col-span-8 rounded-2xl border overflow-hidden shadow-2xl relative transition-colors ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              {/* Preset Targets */}
              <div className={`p-3 border-b flex items-center gap-2 overflow-x-auto text-xs font-mono scrollbar-none ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
                <span className="text-slate-500 whitespace-nowrap shrink-0">{t.workbench.sampleTargets}</span>
                {PRESET_PDB_EXEMPLARS.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedPdb(ex.id)}
                    className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 border ${
                      selectedPdb === ex.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-500 font-bold'
                        : theme === 'dark' 
                          ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>

              {/* Canvas Controls Ribbon */}
              <div className={`p-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">{t.workbench.style}</span>
                  {(['cartoon', 'stick', 'sphere', 'surface'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setRenderStyle(st)}
                      className={`px-2 py-0.5 rounded-md capitalize ${
                        renderStyle === st 
                          ? 'bg-cyan-500 text-slate-950 font-bold' 
                          : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500">{t.workbench.color}</span>
                  <button
                    onClick={() => setColorScheme('spectrum')}
                    className={`px-2 py-0.5 rounded-md ${colorScheme === 'spectrum' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Spectrum
                  </button>
                  <button
                    onClick={() => setColorScheme('plddt')}
                    className={`px-2 py-0.5 rounded-md ${colorScheme === 'plddt' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    AlphaFold pLDDT
                  </button>

                  <button
                    onClick={() => setIsSpinning(!isSpinning)}
                    className={`p-1 rounded-md border ${
                      isSpinning 
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-500' 
                        : theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600'
                    }`}
                    title="Toggle 3D Rotation"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                  </button>
                </div>

              </div>

              {/* WebGL Canvas */}
              <div className="w-full h-[420px] bg-[#090d16] relative flex items-center justify-center">
                {loadingPdb && (
                  <div className="absolute inset-0 bg-slate-950/80 z-10 flex items-center justify-center text-cyan-400 font-mono text-xs gap-2">
                    <RotateCw className="w-5 h-5 animate-spin" />
                    <span>{t.workbench.renderingMsg} ({selectedPdb})</span>
                  </div>
                )}

                <div
                  ref={molContainerRef}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                  style={{ position: 'relative' }}
                />

                <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-slate-800 backdrop-blur px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3Dmol.js WebGL Engine</span>
                  <span className="text-slate-600">·</span>
                  <span>Drag to Rotate · Scroll to Zoom</span>
                </div>
              </div>

              {/* pLDDT Legend */}
              <div className={`p-3 border-t text-[11px] font-mono grid grid-cols-2 sm:grid-cols-4 gap-2 ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#0053D6]" />
                  <span>Very High (&gt;90)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#65CBF3]" />
                  <span>Confident (70-90)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FFDB13]" />
                  <span>Low (50-70)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF7D45]" />
                  <span>Very Low (&lt;50)</span>
                </div>
              </div>

            </div>

            {/* Right Synchronized Inspector */}
            <div className={`lg:col-span-4 rounded-2xl p-6 border space-y-6 shadow-xl transition-colors ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{t.workbench.metadataTitle}</div>
                <h3 className="text-xl font-bold font-mono mt-1">PDB: {selectedPdb}</h3>
                <p className={`text-xs mt-2 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {pdbData?.title || 'Macromolecular target structure loaded from authoritative RCSB repository.'}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-inherit text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-inherit">
                  <span className="text-slate-400">{t.workbench.organism}</span>
                  <span className="font-semibold">{pdbData?.organism || 'Homo sapiens'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-inherit">
                  <span className="text-slate-400">{t.workbench.resolution}</span>
                  <span className="text-cyan-500 font-semibold">{pdbData?.resolution || '2.10 Å'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-inherit">
                  <span className="text-slate-400">{t.workbench.method}</span>
                  <span>{pdbData?.method || 'X-RAY DIFFRACTION'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-inherit">
                  <span className="text-slate-400">{t.workbench.releaseDate}</span>
                  <span>{pdbData?.releaseDate || '2025'}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleSaveStructure}
                  className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm font-mono"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{t.workbench.bookmarkBtn}</span>
                </button>

                <a
                  href={`https://www.rcsb.org/structure/${selectedPdb}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2 px-4 text-xs font-medium rounded-xl border transition-colors flex items-center justify-center gap-1.5 ${
                    theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{t.workbench.openAuthoritative}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PUBCHEM */}
        {activeTab === 'pubchem' && (
          <div className="space-y-8">
            <div className={`rounded-2xl border p-6 space-y-4 transition-colors ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-cyan-500 font-bold">{t.workbench.pubchemKicker}</label>
                <span className="text-xs font-mono text-slate-400">NCBI PUG REST API</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={compoundQuery}
                  onChange={(e) => setCompoundQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchCompound(compoundQuery)}
                  placeholder={t.workbench.pubchemPlaceholder}
                  className={`flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 font-mono ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  onClick={() => fetchCompound(compoundQuery)}
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors flex items-center gap-2 shrink-0 font-mono"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.workbench.scoutBtn}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">{t.workbench.quickCandidates}</span>
                {PRESET_DRUG_CANDIDATES.map((drug) => (
                  <button
                    key={drug}
                    onClick={() => {
                      setCompoundQuery(drug);
                      fetchCompound(drug);
                    }}
                    className={`px-2.5 py-1 rounded-md border transition-colors ${
                      theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {drug}
                  </button>
                ))}
              </div>
            </div>

            {loadingCompound ? (
              <div className="p-12 text-center text-slate-400 font-mono text-xs flex flex-col items-center gap-2">
                <RotateCw className="w-6 h-6 text-cyan-500 animate-spin" />
                <span>Querying PubChem PUG REST API...</span>
              </div>
            ) : compoundError ? (
              <div className="p-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-rose-500 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{compoundError}</span>
              </div>
            ) : compoundData ? (
              <div className={`grid lg:grid-cols-12 gap-8 items-start rounded-2xl border p-6 shadow-2xl transition-colors ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                
                <div className={`lg:col-span-4 rounded-xl border p-4 flex flex-col items-center justify-center ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-xs font-mono text-slate-400 mb-2">2D Depiction (CID: {compoundData.cid})</div>
                  <img
                    src={compoundData.image2dUrl}
                    alt={compoundData.title}
                    className="w-56 h-56 object-contain bg-white rounded-lg p-2 border"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-xs font-mono text-slate-400 mt-3 text-center truncate max-w-full">
                    SMILES: <span className="text-cyan-500">{compoundData.smiles}</span>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase text-cyan-500 font-bold">PubChem Compound</span>
                    <h3 className="text-2xl font-black font-mono mt-0.5">{compoundData.title}</h3>
                    <div className="text-xs font-mono text-slate-400 mt-1">Formula: {compoundData.formula}</div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-inherit text-xs font-mono">
                    <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-slate-400">{t.workbench.mw}</div>
                      <div className="text-lg font-bold mt-1">{compoundData.mw} <span className="text-xs text-slate-400">g/mol</span></div>
                    </div>
                    <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-slate-400">{t.workbench.logp}</div>
                      <div className="text-lg font-bold text-cyan-500 mt-1">{compoundData.xlogp}</div>
                    </div>
                    <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-slate-400">{t.workbench.hbd}</div>
                      <div className="text-lg font-bold mt-1">{compoundData.hbd}</div>
                    </div>
                    <div className={`p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-slate-400">{t.workbench.hba}</div>
                      <div className="text-lg font-bold mt-1">{compoundData.hba}</div>
                    </div>
                  </div>

                  {/* Lipinski evaluation */}
                  <div className={`rounded-xl border p-4 space-y-3 font-mono text-xs ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{t.workbench.lipinskiTitle}</span>
                      <span className="px-2.5 py-0.5 rounded-md font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                        {compoundData.lipinski?.ruleOfFiveScore ?? 4} / 4 {t.workbench.scorePassed}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-400 pt-2 border-t border-inherit">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${compoundData.lipinski?.mwPass !== false ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span>MW &le; 500 Da</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${compoundData.lipinski?.logpPass !== false ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span>LogP &le; 5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${compoundData.lipinski?.hbdPass !== false ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span>H-Bond Donors &le; 5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${compoundData.lipinski?.hbaPass !== false ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span>H-Bond Acceptors &le; 10</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            ) : null}
          </div>
        )}

        {/* TAB 3: PUBMED */}
        {activeTab === 'pubmed' && (
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 space-y-4 transition-colors ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <label className="text-xs font-mono uppercase tracking-wider text-cyan-500 font-bold">{t.workbench.pubmedKicker}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pubmedQuery}
                  onChange={(e) => setPubmedQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchPubMed(pubmedQuery)}
                  placeholder={t.workbench.pubmedPlaceholder}
                  className={`flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 font-mono ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  onClick={() => fetchPubMed(pubmedQuery)}
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors flex items-center gap-2 shrink-0 font-mono"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.workbench.pubmedSearchBtn}</span>
                </button>
              </div>
            </div>

            {loadingArticles ? (
              <div className="p-12 text-center text-slate-400 font-mono text-xs flex flex-col items-center gap-2">
                <RotateCw className="w-6 h-6 text-cyan-500 animate-spin" />
                <span>Searching PubMed NCBI database...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {articles.map((art) => (
                  <div key={art.pmid} className={`rounded-2xl border p-5 transition-colors space-y-3 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>PMID: {art.pmid}</span>
                      <span className="text-cyan-500 font-semibold">{art.pubDate}</span>
                    </div>

                    <h4 className="text-base font-bold leading-snug line-clamp-2">{art.title}</h4>
                    <p className="text-xs text-slate-500 font-mono">{art.authors}</p>
                    
                    <div className="pt-2 border-t border-inherit flex items-center justify-between text-xs font-mono">
                      <span className="truncate max-w-[200px] text-slate-500">{art.journal}</span>
                      <a
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-500 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>{t.workbench.pubmedRecord}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CLINICAL TRIALS */}
        {activeTab === 'trials' && (
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 space-y-4 transition-colors ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <label className="text-xs font-mono uppercase tracking-wider text-cyan-500 font-bold">{t.workbench.trialsKicker}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trialQuery}
                  onChange={(e) => setTrialQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchClinicalTrials(trialQuery)}
                  placeholder={t.workbench.trialsPlaceholder}
                  className={`flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 font-mono ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  onClick={() => fetchClinicalTrials(trialQuery)}
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors flex items-center gap-2 shrink-0 font-mono"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.workbench.trialsSearchBtn}</span>
                </button>
              </div>
            </div>

            {loadingTrials ? (
              <div className="p-12 text-center text-slate-400 font-mono text-xs flex flex-col items-center gap-2">
                <RotateCw className="w-6 h-6 text-cyan-500 animate-spin" />
                <span>Querying ClinicalTrials.gov REST API...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {trials.map((trial) => (
                  <div key={trial.nctId} className={`rounded-2xl border p-5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-cyan-500 font-bold">{trial.nctId}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-emerald-500 font-semibold">{trial.overallStatus}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-400">{trial.phase}</span>
                      </div>
                      <h4 className="text-base font-bold">{trial.title}</h4>
                      <p className="text-xs text-slate-500 font-mono">Conditions: {trial.conditions || 'Biomedical Condition'}</p>
                    </div>

                    <a
                      href={`https://clinicaltrials.gov/study/${trial.nctId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center gap-1.5 shrink-0 ${
                        theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      <span>{t.workbench.trialsProtocol}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
