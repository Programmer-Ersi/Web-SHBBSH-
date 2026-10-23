import React, { useState } from 'react';
import { PIPELINE_PROGRAMS } from '../data/pipelineData';
import { Layers, ExternalLink, Filter, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const TherapeuticsPipeline: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [selectedModality, setSelectedModality] = useState<string>('All');

  const areas = ['All', 'Oncology', 'RNA Therapeutics', 'Gene Editing', 'Synthetic Biology', 'Neuro-Degeneration'];
  const modalities = ['All', 'mRNA/LNP', 'CRISPR Gene Editing', 'Monoclonal Antibody', 'Small Molecule', 'Enzyme Engineering'];

  const filteredPrograms = PIPELINE_PROGRAMS.filter((p) => {
    const areaMatch = selectedArea === 'All' || p.therapeuticArea === selectedArea;
    const modalityMatch = selectedModality === 'All' || p.modality === selectedModality;
    return areaMatch && modalityMatch;
  });

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Discovery': return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
      case 'Preclinical': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'Phase I': return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30';
      case 'Phase II': return 'text-teal-500 bg-teal-500/10 border-teal-500/30';
      case 'Phase III': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30';
      case 'FDA Review': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      default: return 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30';
    }
  };

  return (
    <section id="pipeline" className={`py-20 border-b transition-colors ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-500 mb-2">
              <Layers className="w-4 h-4" />
              <span>{t.pipeline.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              {t.pipeline.title}
            </h2>
            <p className={`text-sm mt-2 max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.pipeline.description}
            </p>
          </div>

          <div className={`flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded-xl border ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-xs'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>SHBBSH R&D Pipeline Synchronized</span>
          </div>
        </div>

        {/* Feature Cards Grid (4 Modalities with High-Fidelity Images) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className={`rounded-2xl border overflow-hidden group transition-all ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
            <div className="h-40 overflow-hidden relative">
              <img
                src="/src/assets/images/rna_therapeutics_research_1792692591674.jpg"
                alt="mRNA LNP Therapeutics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <div className="text-xs font-mono text-cyan-500 uppercase font-semibold">mRNA / LNP</div>
              <h3 className="text-base font-bold mt-1">{t.pipeline.card1Title}</h3>
              <p className={`text-xs mt-1 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.pipeline.card1Desc}
              </p>
            </div>
          </div>

          <div className={`rounded-2xl border overflow-hidden group transition-all ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
            <div className="h-40 overflow-hidden relative">
              <img
                src="/src/assets/images/gene_editing_crispr_1792692591649.jpg"
                alt="CRISPR Gene Editing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <div className="text-xs font-mono text-cyan-500 uppercase font-semibold">CRISPR & Prime Editing</div>
              <h3 className="text-base font-bold mt-1">{t.pipeline.card2Title}</h3>
              <p className={`text-xs mt-1 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.pipeline.card2Desc}
              </p>
            </div>
          </div>

          <div className={`rounded-2xl border overflow-hidden group transition-all ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
            <div className="h-40 overflow-hidden relative">
              <img
                src="/src/assets/images/oncology_immunotherapy_1792692592355.jpg"
                alt="Oncology Immunotherapy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <div className="text-xs font-mono text-cyan-500 uppercase font-semibold">Immuno-Oncology</div>
              <h3 className="text-base font-bold mt-1">{t.pipeline.card3Title}</h3>
              <p className={`text-xs mt-1 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.pipeline.card3Desc}
              </p>
            </div>
          </div>

          <div className={`rounded-2xl border overflow-hidden group transition-all ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
          }`}>
            <div className="h-40 overflow-hidden relative">
              <img
                src="/src/assets/images/synthetic_biology_enzymes_1792692593726.jpg"
                alt="Synthetic Biology Enzymes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <div className="text-xs font-mono text-cyan-500 uppercase font-semibold">Biotechnology</div>
              <h3 className="text-base font-bold mt-1">{t.pipeline.card4Title}</h3>
              <p className={`text-xs mt-1 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {t.pipeline.card4Desc}
              </p>
            </div>
          </div>

        </div>

        {/* Filter Toolbar */}
        <div className={`rounded-2xl p-4 mb-8 border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Filter className="w-4 h-4 text-cyan-500" />
            <span>{t.pipeline.filterBy}</span>
          </div>

          {/* Area Filter Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedArea === area
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                    : theme === 'dark' 
                      ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {area === 'All' ? t.pipeline.all : area}
              </button>
            ))}
          </div>

          {/* Modality Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 whitespace-nowrap">{t.pipeline.modality}</span>
            <select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className={`text-xs font-medium border rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 ${
                theme === 'dark' ? 'bg-slate-950 text-slate-200 border-slate-700' : 'bg-slate-50 text-slate-800 border-slate-300'
              }`}
            >
              {modalities.map((m) => (
                <option key={m} value={m}>{m === 'All' ? t.pipeline.all : m}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Pipeline Table Matrix */}
        <div className={`rounded-2xl border overflow-hidden shadow-2xl transition-colors ${
          theme === 'dark' ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              
              <thead className={`text-xs font-mono uppercase border-b ${
                theme === 'dark' ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                <tr>
                  <th className="py-3.5 px-4 font-semibold">{t.pipeline.colCode}</th>
                  <th className="py-3.5 px-4 font-semibold">{t.pipeline.colAsset}</th>
                  <th className="py-3.5 px-4 font-semibold">{t.pipeline.colIndication}</th>
                  <th className="py-3.5 px-4 font-semibold">{t.pipeline.colModality}</th>
                  <th className="py-3.5 px-4 font-semibold">{t.pipeline.colPhase}</th>
                  <th className="py-3.5 px-4 font-semibold">{t.pipeline.colProgress}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-inherit font-sans">
                {filteredPrograms.length > 0 ? (
                  filteredPrograms.map((program) => (
                    <tr key={program.id} className={`transition-colors ${
                      theme === 'dark' ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                    }`}>
                      
                      {/* Code */}
                      <td className="py-4 px-4 font-mono font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                          <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{program.code}</span>
                        </div>
                      </td>

                      {/* Name & Target Gene */}
                      <td className="py-4 px-4">
                        <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{program.name}</div>
                        <div className="text-xs font-mono text-cyan-500 mt-0.5">Target: {program.targetGene}</div>
                      </td>

                      {/* Indication */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="text-xs leading-relaxed">{program.indication}</div>
                        {program.keyPublicationDoi && (
                          <a
                            href={`https://doi.org/${program.keyPublicationDoi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-500 mt-1 transition-colors"
                          >
                            <span>DOI: {program.keyPublicationDoi}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </td>

                      {/* Modality */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`text-xs font-mono px-2.5 py-1 rounded-md border ${
                          theme === 'dark' ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {program.modality}
                        </span>
                      </td>

                      {/* Phase */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md border ${getPhaseColor(program.phase)}`}>
                          {program.phase}
                        </span>
                      </td>

                      {/* Progress bar */}
                      <td className="py-4 px-4 w-40">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                          <span>{t.pipeline.colProgress}</span>
                          <span className={`tabular-nums font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{program.progressPercent}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full transition-all duration-500"
                            style={{ width: `${program.progressPercent}%` }}
                          />
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 font-mono text-xs">
                      No therapeutic programs match the selected filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
