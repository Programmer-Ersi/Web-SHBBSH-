export type Language = 'sq' | 'en' | 'it';

export interface Translations {
  orgName: string;
  orgNameShort: string;
  orgSubtitle: string;
  nav: {
    pipeline: string;
    breakthroughs: string;
    workbench: string;
    ai: string;
    clinical: string;
    about: string;
    allSections: string;
    liveVoice: string;
    signIn: string;
    portal: string;
    signOut: string;
  };
  hero: {
    kicker: string;
    titlePart1: string;
    titleGradient: string;
    titlePart2: string;
    description: string;
    ctaPipeline: string;
    ctaWorkbench: string;
    ctaAI: string;
    flagshipLabel: string;
    flagshipTitle: string;
    flagshipDesc: string;
    flagshipMetricLabel: string;
    flagshipMetricVal: string;
    viewAllPipeline: string;
    statPrograms: string;
    statProgramsSub: string;
    statTrials: string;
    statTrialsSub: string;
    statPubs: string;
    statPubsSub: string;
    statMembers: string;
    statMembersSub: string;
  };
  breakthroughs: {
    kicker: string;
    title: string;
    description: string;
    allCategories: string;
    filterLabel: string;
    readMore: string;
    readLess: string;
    leadScientist: string;
    institution: string;
    doi: string;
    viewPaper: string;
    keyMetric: string;
    publishedOn: string;
  };
  pipeline: {
    kicker: string;
    title: string;
    description: string;
    all: string;
    filterBy: string;
    modality: string;
    colCode: string;
    colAsset: string;
    colIndication: string;
    colModality: string;
    colPhase: string;
    colProgress: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    card4Title: string;
    card4Desc: string;
  };
  workbench: {
    kicker: string;
    title: string;
    description: string;
    tab3d: string;
    tabPubchem: string;
    tabPubmed: string;
    tabTrials: string;
    sampleTargets: string;
    style: string;
    color: string;
    renderingMsg: string;
    metadataTitle: string;
    organism: string;
    resolution: string;
    method: string;
    releaseDate: string;
    bookmarkBtn: string;
    openAuthoritative: string;
    pubchemKicker: string;
    pubchemPlaceholder: string;
    scoutBtn: string;
    quickCandidates: string;
    mw: string;
    logp: string;
    hbd: string;
    hba: string;
    lipinskiTitle: string;
    scorePassed: string;
    pubmedKicker: string;
    pubmedPlaceholder: string;
    pubmedSearchBtn: string;
    pubmedRecord: string;
    trialsKicker: string;
    trialsPlaceholder: string;
    trialsSearchBtn: string;
    trialsProtocol: string;
  };
  ai: {
    kicker: string;
    title: string;
    description: string;
    thinkingMode: string;
    searchGrounding: string;
    agentActive: string;
    advisorRole: string;
    welcomeMsg: string;
    quickPromptsLabel: string;
    inputPlaceholder: string;
    analyzeBtn: string;
  };
  leadership: {
    kicker: string;
    title: string;
    description: string;
    boardBadge: string;
    csoName: string;
    csoRole: string;
    csoBio: string;
    principle1Title: string;
    principle1Desc: string;
    principle2Title: string;
    principle2Desc: string;
    principle3Title: string;
    principle3Desc: string;
    centersTitle: string;
  };
  footer: {
    desc: string;
    researchAreas: string;
    interactiveTools: string;
    institutional: string;
    rights: string;
    terms: string;
    privacy: string;
    ethics: string;
  };
  sectionsModal: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    close: string;
    jumpTo: string;
  };
}

export const translations: Record<Language, Translations> = {
  sq: {
    orgName: 'Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë',
    orgNameShort: 'SHBBSH',
    orgSubtitle: 'Albanian Association of Biologists and Biotechnologists',
    nav: {
      pipeline: 'Programet & Terapeutika',
      breakthroughs: 'Zbulimet e Fundit',
      workbench: 'Workbench Shkencor 3D',
      ai: 'BioAstra AI',
      clinical: 'Klinikë & PubMed',
      about: 'Rreth Nesh & Etika',
      allSections: 'Të Gjitha Seksionet',
      liveVoice: 'Zëri Live AI',
      signIn: 'Hyrje / Portali',
      portal: 'Portali Im',
      signOut: 'Dil',
    },
    hero: {
      kicker: 'Platforma Kombëtare e Kërkimit Biologjik dhe Bioteknologjik',
      titlePart1: 'Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë',
      titleGradient: 'Avancimi i Shkencave të Jetës',
      titlePart2: '& Bioteknologjisë Moderne',
      description: 'SHBBSH bashkon komunitetin shkencor të biologëve dhe bioteknologëve shqiptarë me qendrat ndërkombëtare kërkimore për avancimin e terapisë gjenomike, bio-inxhinierisë dhe studimeve molekulare.',
      ctaPipeline: 'Eksploro Programet',
      ctaWorkbench: 'Hap Workbench-in 3D',
      ctaAI: 'Këshilltari Shkencor AI',
      flagshipLabel: 'Projekt Kryesor Kërkimor',
      flagshipTitle: 'SHBBSH-mONC-1 (KRAS-G12D)',
      flagshipDesc: 'Vaksinë mRNA me nanogrimca lipidike (LNP) për imunitetin specifik ndaj mutacioneve onkogjenike.',
      flagshipMetricLabel: 'Përputhshmëria Eksperimentale',
      flagshipMetricVal: '82% Efikasitet i Validuar',
      viewAllPipeline: 'Shiko të Gjitha Programet',
      statPrograms: '14 Programe',
      statProgramsSub: 'Kërkimore & Zhvillim',
      statTrials: '03 Faza Klinike',
      statTrialsSub: 'Projekte të Avancuara',
      statPubs: '480+ Publikime',
      statPubsSub: 'Indeksuar Ndërkombëtarisht',
      statMembers: '1,250+ Anëtarë',
      statMembersSub: 'Shkencëtarë & Studentë',
    },
    breakthroughs: {
      kicker: 'Zbulimet & Njoftimet e Fundit të SHBBSH',
      title: 'Zbulimet Më të Fundit Shkencore',
      description: 'Njoftimet më të reja kërkimore, botimet ndërkombëtare dhe inovacionet e komunitetit të biologëve dhe bioteknologëve shqiptarë.',
      allCategories: 'Të Gjitha Kategoritë',
      filterLabel: 'Filtro sipas temës:',
      readMore: 'Lexo Zbulimin e Plotë',
      readLess: 'Mbyll Detajet',
      leadScientist: 'Kërkuesi Kryesor:',
      institution: 'Institucioni:',
      doi: 'Publikimi DOI:',
      viewPaper: 'Shiko Artikullin',
      keyMetric: 'Treguesi Kyç i Ndikimit:',
      publishedOn: 'Publikuar:',
    },
    pipeline: {
      kicker: 'Matrica e Kërkimit & Zhvillimit',
      title: 'Programet Terapeutike & Inovacioni Molekular',
      description: 'Asetet shkencore që targetojnë drejtuesit onkogjenikë, sëmundjet e rralla gjenetike dhe biokatalizën sintetike.',
      all: 'Të Gjitha',
      filterBy: 'Filtro Programet:',
      modality: 'Modaliteti:',
      colCode: 'Kodi',
      colAsset: 'Aseti & Targeti',
      colIndication: 'Indikacioni',
      colModality: 'Modaliteti',
      colPhase: 'Statusi / Faza',
      colProgress: 'Progresi',
      card1Title: 'Nanogrimca Lipidike (LNP)',
      card1Desc: 'Formulime të avancuara të mRNA për dërgim të synuar në qelizat e prekura.',
      card2Title: 'Redaktimi Gjenetik CRISPR',
      card2Desc: 'Korrigjime të sakta gjenetike pa këputje të dyfishtë të zinxhirit të ADN-së.',
      card3Title: 'Imuno-Onkologjia',
      card3Desc: 'Inxhinierimi i antitrupave bispecifikë dhe mekanizmave qelizorë mbrojtës.',
      card4Title: 'Bioteknologji Sintetike',
      card4Desc: 'Enzima të dizajnuara kompjuterikisht për biopërpunim të pastër dhe riciklim.',
    },
    workbench: {
      kicker: 'Workbench i të Dhënave Shkencore',
      title: 'Struktura Molekulare 3D & Bio-Scout',
      description: 'Eksploroni strukturat makromolekulare 3D nga RCSB PDB, parametrat e barnave nga PubChem dhe të dhëna nga PubMed e ClinicalTrials.gov.',
      tab3d: '3D Makromolekula',
      tabPubchem: 'PubChem Molekula të Vogla',
      tabPubmed: 'Publikimet PubMed',
      tabTrials: 'Provat Klinike',
      sampleTargets: 'Shembuj Biologjikë:',
      style: 'Stili:',
      color: 'Ngjyra:',
      renderingMsg: 'Duke ngarkuar koordinatat 3D...',
      metadataTitle: 'Të Dhënat e Strukturës',
      organism: 'Organizimi Burim:',
      resolution: 'Rezolucioni:',
      method: 'Metoda Eksperimentale:',
      releaseDate: 'Data e Publikimit:',
      bookmarkBtn: 'Ruaj Strukturën në Portal',
      openAuthoritative: 'Hap të Dhënat Zyrtare në RCSB',
      pubchemKicker: 'Kërkimi i Përbërjeve në PubChem',
      pubchemPlaceholder: 'Shkruaj emrin e përbërjes (p.sh. Imatinib, Paclitaxel, Metformin)...',
      scoutBtn: 'Eksploro PubChem',
      quickCandidates: 'Barna të Shpeshta:',
      mw: 'Pesha Molekulare',
      logp: 'XLogP3',
      hbd: 'Dhurues H-Bond',
      hba: 'Marrës H-Bond',
      lipinskiTitle: 'Vlerësimi i Rregullës së 5 të Lipinskit',
      scorePassed: 'Pikët e Kaluara',
      pubmedKicker: 'Kërkimi i Literaturës në PubMed NCBI',
      pubmedPlaceholder: 'Kërko artikuj (p.sh. CRISPR Cas9, mRNA therapeutics)...',
      pubmedSearchBtn: 'Kërko PubMed',
      pubmedRecord: 'Artikulli në PubMed',
      trialsKicker: 'Provat Klinike nga ClinicalTrials.gov',
      trialsPlaceholder: 'Kërko protokolle studimi klinik...',
      trialsSearchBtn: 'Kërko Prova',
      trialsProtocol: 'Protokolli i Studimit',
    },
    ai: {
      kicker: 'BioAstra AI - Asistenti Shkencor i SHBBSH',
      title: 'Inteligjencë Artificiale me Gemini 4 Argon',
      description: 'Modeli i lartë i arsyetimit shkencor me High Thinking Mode dhe Google Search Grounding për analiza të sakta në kohë reale.',
      thinkingMode: 'Modaliteti i Arsyetimit të Lartë (Argon)',
      searchGrounding: 'Citime në Kohë Reale (Search)',
      agentActive: 'BioAstra AI Aktiv',
      advisorRole: 'Këshilltar Shkencor i SHBBSH',
      welcomeMsg: 'Përshëndetje! Jam BioAstra AI, asistenti i specializuar shkencor i Shoqatës së Biologëve dhe Bioteknologëve të Shqipërisë (SHBBSH). Si mund t\'ju ndihmoj sot me kërkimet tuaja në biologji molekulare, gjenetikë apo bioteknologji?',
      quickPromptsLabel: 'Pyetje të Shpejta Shkencore:',
      inputPlaceholder: 'Bëni një pyetje mbi mekanizmat gjenetikë, vaksinat mRNA, CRISPR apo enzimat...',
      analyzeBtn: 'Analizo',
    },
    leadership: {
      kicker: 'Qeverisja Institucionale & Etika e SHBBSH',
      title: 'Udhëheqja Shkencore & Standardet e Biosigurisë',
      description: 'Veprojmë nën standardet etike të kërkimit shkencor, komisioneve të pavarura të bioetikës dhe protokolleve moderne të biosigurisë.',
      boardBadge: 'Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë',
      csoName: 'Prof. Dr. Elena Vance',
      csoRole: 'Drejtuese e Komisionit Shkencor të SHBBSH',
      csoBio: 'Kërkuese shkencore në mjekësi gjenomike dhe bioteknologji molekulare, autore e dhjetëra punimeve ndërkombëtare mbi nanogrimcat lipidike dhe modifikimet enzimatike.',
      principle1Title: '01. Etika e Redaktimit Gjenetik',
      principle1Desc: 'Të gjitha programet e aplikimit të bioteknologjisë zbatohen me transparencë të plotë dhe në përputhje me standardet e bioetikës ndërkombëtare.',
      principle2Title: '02. Shkencë e Hapur & Shpërndarje e Dijes',
      principle2Desc: 'SHBBSH mbështet publikimin me akses të hapur të të dhënave shkencore për kërkuesit, pedagogët dhe studentët në Shqipëri dhe diasporë.',
      principle3Title: '03. Bashkëpunim Ndërkombëtar & Formim Profesional',
      principle3Desc: 'Programet e mobilitetit shkencor lidhin biologët dhe bioteknologët shqiptarë me universitetet dhe qendrat më prestigjioze globale.',
      centersTitle: 'Rrjeti i Bashkëpunimit të SHBBSH',
    },
    footer: {
      desc: 'Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë (SHBBSH) – Organizatë jofitimprurëse që përfaqëson dhe zhvillon komunitetin shkencor biologjik dhe bioteknologjik në Shqipëri.',
      researchAreas: 'Fushat Kryesore të Kërkimit',
      interactiveTools: 'Veglat Interaktive',
      institutional: 'Institucionale & Etika',
      rights: 'Të gjitha të drejtat e rezervuara.',
      terms: 'Rregullorja Shkencore',
      privacy: 'Politika e Privatësisë',
      ethics: 'Komisioni i Bioetikës',
    },
    sectionsModal: {
      title: 'Të Gjitha Seksionet e Portalit SHBBSH',
      subtitle: 'Navigoni drejtpërdrejt në të gjitha modulet dhe mjetet kërkimore të organizatës',
      searchPlaceholder: 'Filtro seksionet (p.sh. 3D, Pipeline, AI, Etika, PubMed)...',
      close: 'Mbyll',
      jumpTo: 'Shko te Seksioni',
    },
  },
  en: {
    orgName: 'Albanian Association of Biologists and Biotechnologists',
    orgNameShort: 'SHBBSH',
    orgSubtitle: 'Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë',
    nav: {
      pipeline: 'Programs & Therapeutics',
      breakthroughs: 'Research Breakthroughs',
      workbench: '3D Science Workbench',
      ai: 'BioAstra AI',
      clinical: 'Clinical & PubMed',
      about: 'About Us & Ethics',
      allSections: 'All Sections',
      liveVoice: 'Live Voice AI',
      signIn: 'Sign In / Portal',
      portal: 'My Portal',
      signOut: 'Sign Out',
    },
    hero: {
      kicker: 'National Biological & Biotechnological Research Platform',
      titlePart1: 'Albanian Association of Biologists & Biotechnologists',
      titleGradient: 'Advancing Life Sciences',
      titlePart2: '& Modern Biotechnology',
      description: 'SHBBSH unifies the scientific community of Albanian biologists and biotechnologists with international research institutes to advance genomic medicine, bio-engineering, and molecular therapeutics.',
      ctaPipeline: 'Explore Programs',
      ctaWorkbench: 'Launch 3D Workbench',
      ctaAI: 'AI Scientific Advisor',
      flagshipLabel: 'Flagship Research Asset',
      flagshipTitle: 'SHBBSH-mONC-1 (KRAS-G12D)',
      flagshipDesc: 'Ionizable LNP-encapsulated mRNA target vaccine for oncogenic driver mutations in adenocarcinoma.',
      flagshipMetricLabel: 'Experimental Validation',
      flagshipMetricVal: '82% Validated Response',
      viewAllPipeline: 'View Full Pipeline',
      statPrograms: '14 Programs',
      statProgramsSub: 'R&D Pipelines',
      statTrials: '03 Clinical Phases',
      statTrialsSub: 'Active Formulations',
      statPubs: '480+ Publications',
      statPubsSub: 'Indexed Internationally',
      statMembers: '1,250+ Members',
      statMembersSub: 'Scientists & Fellows',
    },
    breakthroughs: {
      kicker: 'Recent Research Breakthroughs & News',
      title: 'Recent Research Breakthroughs',
      description: 'The latest peer-reviewed milestones, genomic discoveries, and scientific news from the Albanian Association of Biologists and Biotechnologists.',
      allCategories: 'All Categories',
      filterLabel: 'Filter by topic:',
      readMore: 'Read Full Breakthrough',
      readLess: 'Collapse Details',
      leadScientist: 'Lead Scientist:',
      institution: 'Institution:',
      doi: 'Publication DOI:',
      viewPaper: 'View Article',
      keyMetric: 'Key Impact Metric:',
      publishedOn: 'Published:',
    },
    pipeline: {
      kicker: 'Research & Development Matrix',
      title: 'Therapeutics Pipeline & Molecular Innovations',
      description: 'Scientific assets targeting oncogenic drivers, genetic rare diseases, and synthetic biocatalysis.',
      all: 'All',
      filterBy: 'Filter Programs:',
      modality: 'Modality:',
      colCode: 'Code',
      colAsset: 'Asset & Target',
      colIndication: 'Indication',
      colModality: 'Modality',
      colPhase: 'Status / Phase',
      colProgress: 'Progress',
      card1Title: 'Lipid Nanoparticles (LNP)',
      card1Desc: 'Advanced mRNA formulation delivering targeted protein payloads directly to tissues.',
      card2Title: 'CRISPR Gene Editing',
      card2Desc: 'Precise single-base transversions free from harmful double-strand DNA breaks.',
      card3Title: 'Immuno-Oncology',
      card3Desc: 'Bispecific antibodies and engineered cellular immune engagers against tumor microenvironments.',
      card4Title: 'Synthetic Biology',
      card4Desc: 'Computationally redesigned enzymes for sustainable biomanufacturing and degradation.',
    },
    workbench: {
      kicker: 'Scientific Data Workbench',
      title: '3D Molecular Structure & Bio-Scout',
      description: 'Inspect macromolecular 3D structures from RCSB PDB, small-molecule drug properties from PubChem, and live literature from PubMed & ClinicalTrials.gov.',
      tab3d: '3D Macromolecule',
      tabPubchem: 'PubChem Small Molecule',
      tabPubmed: 'PubMed Literature',
      tabTrials: 'Clinical Trials',
      sampleTargets: 'Sample Targets:',
      style: 'Style:',
      color: 'Color:',
      renderingMsg: 'Rendering 3D coordinates...',
      metadataTitle: 'Structure Metadata',
      organism: 'Source Organism:',
      resolution: 'Resolution:',
      method: 'Experimental Method:',
      releaseDate: 'Release Date:',
      bookmarkBtn: 'Bookmark Structure to Portal',
      openAuthoritative: 'Open Authoritative RCSB Record',
      pubchemKicker: 'PubChem Small Molecule Scout',
      pubchemPlaceholder: 'Enter compound name (e.g. Imatinib, Paclitaxel, Metformin)...',
      scoutBtn: 'Scout PubChem',
      quickCandidates: 'Quick Drugs:',
      mw: 'Molecular Weight',
      logp: 'XLogP3',
      hbd: 'H-Bond Donors',
      hba: 'H-Bond Acceptors',
      lipinskiTitle: 'Lipinski Rule of 5 Drug-Likeness',
      scorePassed: 'Rules Passed',
      pubmedKicker: 'PubMed NCBI Literature Search',
      pubmedPlaceholder: 'Search biomedical articles (e.g. CRISPR Cas9, mRNA therapeutics)...',
      pubmedSearchBtn: 'Search PubMed',
      pubmedRecord: 'PubMed Record',
      trialsKicker: 'ClinicalTrials.gov Protocol Scout',
      trialsPlaceholder: 'Search clinical trial protocols...',
      trialsSearchBtn: 'Search Trials',
      trialsProtocol: 'Study Protocol',
    },
    ai: {
      kicker: 'BioAstra AI - SHBBSH Scientific Intelligence',
      title: 'Powered by Gemini 4 Argon & Search Grounding',
      description: 'Advanced STEM reasoning with High Thinking Mode and real-time Google Search citations for authoritative literature and mechanistic analysis.',
      thinkingMode: 'High Thinking Mode (Argon)',
      searchGrounding: 'Real-Time Citations (Search)',
      agentActive: 'BioAstra AI Active',
      advisorRole: 'SHBBSH Senior Scientific Advisor',
      welcomeMsg: 'Welcome! I am BioAstra AI, the dedicated scientific intelligence advisor for the Albanian Association of Biologists and Biotechnologists (SHBBSH). How can I assist your biomedical research, target evaluation, or structural biochemistry today?',
      quickPromptsLabel: 'Quick Scientific Prompts:',
      inputPlaceholder: 'Ask BioAstra AI about target mechanisms, LNP formulation, CRISPR specificity, or enzymes...',
      analyzeBtn: 'Analyze',
    },
    leadership: {
      kicker: 'Institutional Governance & Bioethics',
      title: 'Scientific Leadership & Containment Standards',
      description: 'Operating under strict research ethics frameworks, independent institutional bioethics boards, and modern biosafety guidelines.',
      boardBadge: 'Albanian Association of Biologists and Biotechnologists',
      csoName: 'Prof. Dr. Elena Vance',
      csoRole: 'Head of the Scientific Committee, SHBBSH',
      csoBio: 'Distinguished researcher in genomic medicine and molecular biotechnology, author of extensive peer-reviewed literature on ionizable lipid nanoparticles and biocatalysis.',
      principle1Title: '01. Somatic Gene Editing Ethics',
      principle1Desc: 'All biotechnological applications are performed strictly for somatic, non-heritable therapeutic interventions with complete bioethical transparency.',
      principle2Title: '02. Open Science & Knowledge Exchange',
      principle2Desc: 'SHBBSH actively champions open-access scientific publications and structural dataset availability for students and researchers in Albania and abroad.',
      principle3Title: '03. Global Fellowships & Capacity Building',
      principle3Desc: 'Connecting national research fellows with premier European and international universities to foster cutting-edge biotech methodologies.',
      centersTitle: 'SHBBSH Scientific Network',
    },
    footer: {
      desc: 'Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë (SHBBSH) – Non-profit organization representing and advancing the biological and biotechnological community in Albania.',
      researchAreas: 'Core Research Areas',
      interactiveTools: 'Interactive Tools',
      institutional: 'Institutional & Ethics',
      rights: 'All rights reserved.',
      terms: 'Scientific Terms',
      privacy: 'Privacy Policy',
      ethics: 'Bioethics Council',
    },
    sectionsModal: {
      title: 'All SHBBSH Portal Sections',
      subtitle: 'Navigate directly to any module, scientific workbench, or research directory',
      searchPlaceholder: 'Filter sections (e.g. 3D, Pipeline, AI, Ethics, PubMed)...',
      close: 'Close',
      jumpTo: 'Jump to Section',
    },
  },
  it: {
    orgName: 'Associazione dei Biologi e Biotecnologi dell\'Albania',
    orgNameShort: 'SHBBSH',
    orgSubtitle: 'Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë',
    nav: {
      pipeline: 'Programmi & Terapeutica',
      breakthroughs: 'Scoperte Recenti',
      workbench: 'Workbench 3D Shkencor',
      ai: 'BioAstra AI',
      clinical: 'Clinica & PubMed',
      about: 'Chi Siamo & Etica',
      allSections: 'Tutte le Sezioni',
      liveVoice: 'Voce Live AI',
      signIn: 'Accedi / Portale',
      portal: 'Il Mio Portale',
      signOut: 'Esci',
    },
    hero: {
      kicker: 'Piattaforma Nazionale di Ricerca Biologica e Biotecnologica',
      titlePart1: 'Associazione dei Biologi e Biotecnologi dell\'Albania',
      titleGradient: 'Progresso delle Scienze della Vita',
      titlePart2: '& Biotecnologie Moderne',
      description: 'La SHBBSH unisce la comunità scientifica dei biologi e biotecnologi albanesi con i centri internazionali di ricerca per promuovere la medicina genomica, la bioingegneria e le terapie molecolari.',
      ctaPipeline: 'Esplora i Programmi',
      ctaWorkbench: 'Apri Workbench 3D',
      ctaAI: 'Consulente Scientifico AI',
      flagshipLabel: 'Progetto di Ricerca Principale',
      flagshipTitle: 'SHBBSH-mONC-1 (KRAS-G12D)',
      flagshipDesc: 'Vaccino a mRNA incapsulato in nanoparticelle lipidiche (LNP) per mutazioni oncogeniche mirate.',
      flagshipMetricLabel: 'Convalida Sperimentale',
      flagshipMetricVal: '82% Efficacia Convalidata',
      viewAllPipeline: 'Visualizza Pipeline Completa',
      statPrograms: '14 Programmi',
      statProgramsSub: 'Ricerca & Sviluppo',
      statTrials: '03 Fasi Cliniche',
      statTrialsSub: 'Progetti Avanzati',
      statPubs: '480+ Pubblicazioni',
      statPubsSub: 'Indicizzate a Livello Globale',
      statMembers: '1.250+ Membri',
      statMembersSub: 'Scienziati & Ricercatori',
    },
    breakthroughs: {
      kicker: 'Recenti Scoperte Scientifiche & Notizie SHBBSH',
      title: 'Recenti Scoperte Scientifiche',
      description: 'Le ultime scoperte genomiche, pubblicazioni internazionali e notizie dall\'Associazione dei Biologi e Biotecnologi dell\'Albania.',
      allCategories: 'Tutte le Categorie',
      filterLabel: 'Filtra per argomento:',
      readMore: 'Leggi Scoperta Completa',
      readLess: 'Comprimi Dettagli',
      leadScientist: 'Scienziato Principale:',
      institution: 'Istituzione:',
      doi: 'Pubblicazione DOI:',
      viewPaper: 'Visualizza Articolo',
      keyMetric: 'Metrica di Impatto:',
      publishedOn: 'Pubblicato:',
    },
    pipeline: {
      kicker: 'Matrice di Ricerca e Sviluppo',
      title: 'Pipeline Terapeutica & Innovazione Molecolare',
      description: 'Asset scientifici mirati a bersagli oncogenici, malattie genetiche rare e biocatalisi sintetica.',
      all: 'Tutte',
      filterBy: 'Filtra Programmi:',
      modality: 'Modalità:',
      colCode: 'Codice',
      colAsset: 'Asset & Bersaglio',
      colIndication: 'Indicazione',
      colModality: 'Modalità',
      colPhase: 'Stato / Fase',
      colProgress: 'Progresso',
      card1Title: 'Nanoparticelle Lipidiche (LNP)',
      card1Desc: 'Formulazioni avanzate di mRNA per rilascio mirato alle cellule target.',
      card2Title: 'Editing Genomico CRISPR',
      card2Desc: 'Correzioni genetiche ad alta precisione senza rotture del doppio filamento di DNA.',
      card3Title: 'Immuno-Oncologia',
      card3Desc: 'Ingegnerizzazione di anticorpi bispecifici e cellule effettrici immunitarie.',
      card4Title: 'Biologia Sintetica',
      card4Desc: 'Enzimi de novo progettati computazionalmente per bioproduzione pulita e riciclo.',
    },
    workbench: {
      kicker: 'Workbench di Dati Scientifici',
      title: 'Struttura Molecolare 3D & Bio-Scout',
      description: 'Esplora strutture macromolecolari 3D da RCSB PDB, proprietà chimiche da PubChem e dati clinici da PubMed e ClinicalTrials.gov.',
      tab3d: '3D Macromolecola',
      tabPubchem: 'PubChem Piccole Molecole',
      tabPubmed: 'Letteratura PubMed',
      tabTrials: 'Studi Clinici',
      sampleTargets: 'Campioni Biologici:',
      style: 'Stile:',
      color: 'Colore:',
      renderingMsg: 'Caricamento coordinate 3D...',
      metadataTitle: 'Metadati della Struttura',
      organism: 'Organismo Sorgente:',
      resolution: 'Risoluzione:',
      method: 'Metodo Sperimentale:',
      releaseDate: 'Data di Rilascio:',
      bookmarkBtn: 'Salva Struttura nel Portale',
      openAuthoritative: 'Apri Record Ufficiale RCSB',
      pubchemKicker: 'Esplorazione PubChem',
      pubchemPlaceholder: 'Inserisci nome del composto (es. Imatinib, Paclitaxel, Metformin)...',
      scoutBtn: 'Cerca in PubChem',
      quickCandidates: 'Farmaci Frequenti:',
      mw: 'Peso Molecolare',
      logp: 'XLogP3',
      hbd: 'Donatori H-Bond',
      hba: 'Accettori H-Bond',
      lipinskiTitle: 'Regola di Lipinski (Drug-Likeness)',
      scorePassed: 'Regole Superate',
      pubmedKicker: 'Ricerca Letteraria PubMed NCBI',
      pubmedPlaceholder: 'Cerca articoli biomedici (es. CRISPR Cas9, mRNA therapeutics)...',
      pubmedSearchBtn: 'Cerca PubMed',
      pubmedRecord: 'Articolo su PubMed',
      trialsKicker: 'Protocolli da ClinicalTrials.gov',
      trialsPlaceholder: 'Cerca protocolli clinici...',
      trialsSearchBtn: 'Cerca Studi',
      trialsProtocol: 'Protocollo di Studio',
    },
    ai: {
      kicker: 'BioAstra AI - Assistente Scientifico SHBBSH',
      title: 'Intelligenza Artificiale con Gemini 4 Argon',
      description: 'Modello ad alto ragionamento con High Thinking Mode e Google Search Grounding per citazioni scientifiche in tempo reale.',
      thinkingMode: 'Modalità di Alto Ragionamento (Argon)',
      searchGrounding: 'Citazioni in Tempo Reale (Search)',
      agentActive: 'BioAstra AI Attivo',
      advisorRole: 'Consulente Scientifico SHBBSH',
      welcomeMsg: 'Benvenuto! Sono BioAstra AI, il consulente scientifico dell\'Associazione dei Biologi e Biotecnologi dell\'Albania (SHBBSH). Come posso aiutarti oggi nelle tue ricerche biologiche o biotecnologiche?',
      quickPromptsLabel: 'Domande Scientifiche Rapide:',
      inputPlaceholder: 'Fai una domanda su bersagli molecolari, vaccini a mRNA, CRISPR o enzimi...',
      analyzeBtn: 'Analizza',
    },
    leadership: {
      kicker: 'Governance Istituzionale & Bioetica SHBBSH',
      title: 'Leadership Scientifica & Standard di Biosicurezza',
      description: 'Operiamo secondo rigidi standard etici, comitati indipendenti di bioetica e moderni protocolli di biosicurezza.',
      boardBadge: 'Associazione dei Biologi e Biotecnologi dell\'Albania',
      csoName: 'Prof.ssa Dr. Elena Vance',
      csoRole: 'Responsabile del Comitato Scientifico SHBBSH',
      csoBio: 'Ricercatrice in medicina genomica e biotecnologie molecolari, autrice di numerose pubblicazioni internazionali su nanoparticelle lipidiche ed enzimi ingegnerizzati.',
      principle1Title: '01. Etica dell\'Editing Genomico',
      principle1Desc: 'Tutte le applicazioni biotecnologiche sono rigorosamente limitate a cellule somatiche a scopo terapeutico nel pieno rispetto delle norme etiche.',
      principle2Title: '02. Scienza Aperta & Condivisione',
      principle2Desc: 'La SHBBSH sostiene la pubblicazione scientifica ad accesso aperto per ricercatori, docenti e studenti in Albania e all\'estero.',
      principle3Title: '03. Collaborazione Internazionale',
      principle3Desc: 'Iniziative di mobilità che collegano i biologi e biotecnologi albanesi con le più prestigiose università e centri di ricerca globali.',
      centersTitle: 'Rete Scientifica SHBBSH',
    },
    footer: {
      desc: 'Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë (SHBBSH) – Organizzazione senza scopo di lucro che promuove la comunità scientifica biologica e biotecnologica in Albania.',
      researchAreas: 'Aree Principali di Ricerca',
      interactiveTools: 'Strumenti Interattivi',
      institutional: 'Istituzionale & Etica',
      rights: 'Tutti i diritti riservati.',
      terms: 'Termini Scientifici',
      privacy: 'Politica sulla Privacy',
      ethics: 'Consiglio di Bioetica',
    },
    sectionsModal: {
      title: 'Tutte le Sezioni del Portale SHBBSH',
      subtitle: 'Naviga direttamente tra tutti i moduli e gli strumenti scientifici dell\'associazione',
      searchPlaceholder: 'Filtra sezioni (es. 3D, Pipeline, AI, Etica, PubMed)...',
      close: 'Chiudi',
      jumpTo: 'Vai alla Sezione',
    },
  },
};
