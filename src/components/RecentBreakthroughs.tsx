import React, { useState, useEffect } from 'react';
import { BREAKTHROUGHS_DATA, ResearchBreakthrough } from '../data/breakthroughsData';
import { 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  User, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Dna,
  Filter,
  Check,
  Copy
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const RecentBreakthroughs: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const [breakthroughs, setBreakthroughs] = useState<ResearchBreakthrough[]>(BREAKTHROUGHS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  useEffect(() => {
    // Attempt fetch from /api/breakthroughs endpoint
    fetch(`/api/breakthroughs${selectedCategory !== 'All' ? `?category=${selectedCategory}` : ''}`)
      .then((res) => {
        if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
          throw new Error('Non-JSON or failed response');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.breakthroughs) {
          setBreakthroughs(data.breakthroughs);
        }
      })
      .catch(() => {
        // Fallback to local data
        if (selectedCategory === 'All') {
          setBreakthroughs(BREAKTHROUGHS_DATA);
        } else {
          setBreakthroughs(BREAKTHROUGHS_DATA.filter((b) => b.category === selectedCategory));
        }
      });
  }, [selectedCategory]);

  const categories = [
    { id: 'All', label: t.breakthroughs.allCategories },
    { id: 'Genomics', label: language === 'sq' ? 'Gjenomikë' : language === 'it' ? 'Genomica' : 'Genomics' },
    { id: 'Therapeutics', label: language === 'sq' ? 'Terapeutikë' : language === 'it' ? 'Terapeutica' : 'Therapeutics' },
    { id: 'Environmental', label: language === 'sq' ? 'Bioteknologji Mjedisore' : language === 'it' ? 'Bio-Ambientale' : 'Environmental' },
    { id: 'Conferences', label: language === 'sq' ? 'Konferenca & Ngjarje' : language === 'it' ? 'Conferenze' : 'Conferences' },
  ];

  const handleCopyCitation = (doi?: string) => {
    if (!doi) return;
    navigator.clipboard.writeText(`https://doi.org/${doi}`);
    setCopiedDoi(doi);
    setTimeout(() => setCopiedDoi(null), 2500);
  };

  return (
    <section id="breakthroughs" className={`py-20 border-b transition-colors ${
      theme === 'dark' ? 'bg-slate-950 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-500 mb-2 font-bold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.breakthroughs.kicker}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              {t.breakthroughs.title}
            </h2>
            <p className={`text-sm mt-2 max-w-2xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.breakthroughs.description}
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border transition-colors ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <span className="text-xs font-mono text-slate-400 px-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-500" />
              <span className="hidden sm:inline">{t.breakthroughs.filterLabel}</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-xs'
                    : theme === 'dark'
                      ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Breakthrough Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {breakthroughs.map((item) => {
            const isExpanded = expandedId === item.id;
            const categoryLabel = item.categoryLabels[language] || item.categoryLabels.sq;
            const title = item.title[language] || item.title.sq;
            const summary = item.summary[language] || item.summary.sq;
            const details = item.details[language] || item.details.sq;
            const metricLabel = item.impactMetric.label[language] || item.impactMetric.label.sq;

            return (
              <article
                key={item.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all group ${
                  theme === 'dark' 
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-xl' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-md'
                }`}
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Metric Badge */}
                    <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-400 px-3 py-1 rounded-xl text-xs font-mono font-bold">
                      {item.impactMetric.value}
                    </div>

                    {/* Category Label */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold">
                      {categoryLabel}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 space-y-4">
                    {/* Unboxed Metadata with Typographic Separator */}
                    <div className={`flex items-center gap-2 text-xs font-mono ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{item.date}</span>
                      </span>
                      <span>·</span>
                      <span className="truncate">{item.institution}</span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight leading-snug group-hover:text-cyan-500 transition-colors">
                      {title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {summary}
                    </p>

                    {/* Expanded Drawer Details */}
                    {isExpanded && (
                      <div className={`pt-4 border-t space-y-3 font-sans text-xs leading-relaxed animate-in fade-in duration-200 ${
                        theme === 'dark' ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
                      }`}>
                        <p>{details}</p>

                        <div className={`p-3 rounded-xl border font-mono text-[11px] space-y-1.5 ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">{t.breakthroughs.leadScientist}</span>
                            <span className="font-semibold text-cyan-500">{item.leadScientist}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">{t.breakthroughs.keyMetric}</span>
                            <span className="font-semibold text-emerald-500">{metricLabel}: {item.impactMetric.value}</span>
                          </div>

                          {item.doi && (
                            <div className="flex items-center justify-between pt-1 border-t border-inherit">
                              <span className="text-slate-400">{t.breakthroughs.doi}</span>
                              <div className="flex items-center gap-2">
                                <a
                                  href={`https://doi.org/${item.doi}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-500 hover:underline flex items-center gap-1 font-semibold"
                                >
                                  <span>{item.doi}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>

                                <button
                                  onClick={() => handleCopyCitation(item.doi)}
                                  className="p-1 text-slate-400 hover:text-white rounded"
                                  title="Copy DOI Link"
                                >
                                  {copiedDoi === item.doi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className={`px-6 py-4 border-t flex items-center justify-between transition-colors ${
                  theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="text-xs font-semibold text-cyan-500 hover:underline flex items-center gap-1.5 font-mono"
                  >
                    <span>{isExpanded ? t.breakthroughs.readLess : t.breakthroughs.readMore}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {item.doi && (
                    <a
                      href={`https://doi.org/${item.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                        theme === 'dark'
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{t.breakthroughs.viewPaper}</span>
                    </a>
                  )}
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
