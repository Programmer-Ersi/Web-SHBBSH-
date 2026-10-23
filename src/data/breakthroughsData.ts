export interface ResearchBreakthrough {
  id: string;
  date: string;
  category: 'Genomics' | 'Therapeutics' | 'Environmental' | 'Conferences';
  categoryLabels: {
    sq: string;
    en: string;
    it: string;
  };
  title: {
    sq: string;
    en: string;
    it: string;
  };
  summary: {
    sq: string;
    en: string;
    it: string;
  };
  details: {
    sq: string;
    en: string;
    it: string;
  };
  leadScientist: string;
  institution: string;
  doi?: string;
  impactMetric: {
    label: { sq: string; en: string; it: string };
    value: string;
  };
  image: string;
}

export const BREAKTHROUGHS_DATA: ResearchBreakthrough[] = [
  {
    id: 'shbbsh-bt-01',
    date: 'Tetor 2026',
    category: 'Genomics',
    categoryLabels: {
      sq: 'Gjenomikë & Biodiversitet',
      en: 'Genomics & Biodiversity',
      it: 'Genomica & Biodiversità',
    },
    title: {
      sq: 'Përfundon Sekuencimi i Parë me Rezolucion të Lartë i Florës Mjekësore Endemike të Alpeve Shqiptare',
      en: 'First High-Resolution Genomic Sequencing of Endemic Medicinal Flora in the Albanian Alps Completed',
      it: 'Completato il Primo Sequenziamento Genomico ad Alta Risoluzione della Flora Medica Endemica delle Alpi Albanesi',
    },
    summary: {
      sq: 'Ekipi i studiuesve të SHBBSH në bashkëpunim me laboratorët ndërkombëtarë ka zbardhur të gjithë gjenomin e 6 specieve bimore unike me veti të forta anti-inflamatore dhe anti-oksidante.',
      en: 'The SHBBSH researcher consortium in collaboration with global partners has assembled complete chromosome-level genomes of 6 unique plant species with potent bioactive secondary metabolites.',
      it: 'Il consorzio di ricercatori SHBBSH ha completato l\'assemblaggio genomico di 6 specie vegetali uniche con potenti metaboliti secondari bioattivi.',
    },
    details: {
      sq: 'Ky projekt zbuloi rrugë të panjohura biosintetike të terpeneve dhe flavonoideve të rralla me potencial terapeutik kundër qelizave kancerogjene. Të dhënat gjenomike u depozituan në arkivin NCBI GenBank me akses të hapur për të gjithë shkencëtarët shqiptarë.',
      en: 'The project revealed previously uncharacterized biosynthetic gene clusters (BGCs) synthesizing rare terpenes and flavonoids with cytotoxic potential against malignant cell lines. Data deposited in NCBI GenBank open-access repository.',
      it: 'Il progetto ha rivelato cluster genici biosintetici finora non caratterizzati che producono terpeni e flavonoidi rari con potenziale terapeutico antitumorale. Dati depositati su NCBI GenBank ad accesso aperto.',
    },
    leadScientist: 'Prof. Asoc. Arben Hoxha & Dr. Valbona Krasniqi',
    institution: 'Qendra e Bioteknologjisë Molekulare SHBBSH, Tiranë',
    doi: '10.1038/s41467-026-58190-x',
    impactMetric: {
      label: { sq: 'Gjenome të Montuara', en: 'Genomes Assembled', it: 'Genomi Assemblati' },
      value: '6 Specie / 99.4%',
    },
    image: '/src/assets/images/gene_editing_crispr_1792692591649.jpg',
  },
  {
    id: 'shbbsh-bt-02',
    date: 'Shtator 2026',
    category: 'Therapeutics',
    categoryLabels: {
      sq: 'Terapeutikë Molekulare',
      en: 'Molecular Therapeutics',
      it: 'Terapeutica Molecolare',
    },
    title: {
      sq: 'Përparim në Formulimin e Nanogrimcave Lipidike (LNP) për Trajtimin e Talasemisë Beta',
      en: 'Breakthrough in Ionizable LNP Formulations for In Vivo Beta-Thalassemia Target Repair',
      it: 'Svolta nella Formulazione di Nanoparticelle Lipidiche (LNP) per la Beta-Talassemia',
    },
    summary: {
      sq: 'Studiuesit e SHBBSH zhvilluan një nanombartës të ri lipidik të biodegradueshëm që dërgon me saktësi maksimale mjetet e redaktimit gjenetik në qelizat burimore hematopoietike.',
      en: 'SHBBSH scientists engineered an ionizable lipid nanoparticle delivery vehicle that achieves selective tropism to hematopoietic stem cells for non-viral base correction.',
      it: 'I ricercatori SHBBSH hanno ingegnerizzato un nuovo vettore lipidico ionizzabile che raggiunge un tropismo selettivo verso le cellule staminali ematopoietiche.',
    },
    details: {
      sq: 'Formulimi LNP-ALB-09 arriti një efikasitet futjeje prej 84.7% në modelet paraklinike in vivo pa shkaktuar citotoksicitet apo përgjigje inflamatore sistemike. Faza e parë e vlerësimit të sigurisë u miratua nga Komisioni i Bioetikës.',
      en: 'The proprietary LNP-ALB-09 formulation achieved 84.7% cellular uptake in preclinical animal models without triggering systemic cytokine storm or acute hepatotoxicity.',
      it: 'La formulazione LNP-ALB-09 ha raggiunto un assorbimento cellulare dell\'84,7% in modelli preclinici senza innescare tossicità epatica o risposte infiammatorie sistemiche.',
    },
    leadScientist: 'Dr. Elena Vance & Dr. Kreshnik Balla',
    institution: 'Laboratori i Terative të Avancuara SHBBSH, Tiranë & Cyrih',
    doi: '10.1016/j.omtn.2026.102144',
    impactMetric: {
      label: { sq: 'Efikasitet Dërgimi', en: 'Delivery Efficiency', it: 'Efficienza Trasfezione' },
      value: '84.7% In Vivo',
    },
    image: '/src/assets/images/rna_therapeutics_research_1792692591674.jpg',
  },
  {
    id: 'shbbsh-bt-03',
    date: 'Gusht 2026',
    category: 'Environmental',
    categoryLabels: {
      sq: 'Bioteknologji Mjedisore',
      en: 'Environmental Biotech',
      it: 'Biotecnologia Ambientale',
    },
    title: {
      sq: 'Izolohen Baktere Ekstremofile nga Liqeni i Ohrit me Aftësi të Lartë të Zbërthimit të Mikroplastikave',
      en: 'Novel Extremophilic Bacteria Isolated from Lake Ohrid Display High Microplastic Degradation',
      it: 'Isolati Batteri Estremofili dal Lago di Ocrida con Alta Capacità di Degradazione delle Microplastiche',
    },
    summary: {
      sq: 'Një linjë e re bakteriale e zbuluar në thellësinë e liqenit më të lashtë të Evropës përmban enzima hidrolitike të afta për zbërthimin e polietilenit dhe PET në kushte me temperaturë të ulët.',
      en: 'A psychrotolerant bacterial strain isolated from sub-surface sediment in Lake Ohrid produces novel cutinase-like enzymes active at low ambient temperatures.',
      it: 'Un ceppo batterico psicotollerante isolato dai sedimenti profondi del Lago di Ocrida produce nuovi enzimi cutinasici attivi a basse temperature.',
    },
    details: {
      sq: 'Përmes bio-inxhinierisë dhe modelimit llogaritës me inteligjencë artificiale, xhepi aktiv i enzimës OHR-PETase u optimizua për të rritur normën e hidrolizës me 4.2 herë. Po përgatitet patenta e parë mjedisore nën kujdesin e SHBBSH.',
      en: 'Through AI-assisted directed evolution, the active-site binding pocket of OHR-PETase was enhanced, achieving a 4.2-fold catalytic efficiency increase. Patent filing initiated.',
      it: 'Attraverso l\'evoluzione diretta assistita da intelligenza artificiale, la tasca catalitica dell\'enzima OHR-PETase è stata ottimizzata con un incremento di 4,2 volte dell\'efficienza catalitica.',
    },
    leadScientist: 'Prof. Dr. Besnik Rama & Grupi i Mikrobiologjisë Mjedisore',
    institution: 'Departamenti i Biologjisë & SHBBSH',
    doi: '10.1021/acssuschemeng.6c01289',
    impactMetric: {
      label: { sq: 'Rritje e Katalizës', en: 'Catalytic Uplift', it: 'Incremento Catalitico' },
      value: '+420% Shpejtësi',
    },
    image: '/src/assets/images/synthetic_biology_enzymes_1792692593726.jpg',
  },
  {
    id: 'shbbsh-bt-04',
    date: 'Korrik 2026',
    category: 'Conferences',
    categoryLabels: {
      sq: 'Konferenca & Ngjarje',
      en: 'Conferences & Events',
      it: 'Conferenze & Eventi',
    },
    title: {
      sq: 'Hapet Regjistrimi për Kongresin e 4-të Ndërkombëtar të Biologjisë dhe Bioteknologjisë në Tiranë',
      en: 'Registration Opens for the 4th International Congress of Biology and Biotechnology in Tirana',
      it: 'Aperte le Registrazioni per il 4° Congresso Internazionale di Biologia e Biotecnologia a Tirana',
    },
    summary: {
      sq: 'Mbi 350 shkencëtarë nga 18 vende do të mblidhen në Pallatin e Kongreseve në Tiranë në Tetor 2026 për të diskutuar mbi inovacionet në mjekësinë gjenomike dhe biosigurinë.',
      en: 'Over 350 researchers from 18 nations will convene in Tirana for three days of keynotes on precision gene editing, regenerative biology, and regional biotech entrepreneurship.',
      it: 'Oltre 350 ricercatori provenienti da 18 paesi si riuniranno a Tirana per tre giorni di conferenze su editing genomico, biologia rigenerativa e biosicurezza.',
    },
    details: {
      sq: 'Kongresi do të përfshijë 4 sesione plenare, 48 prezantime me gojë dhe një ekspozitë të veglave bio-llogaritëse të inteligjencës artificiale. Anëtarët e SHBBSH përfitojnë bursa të plota pjesëmarrjeje.',
      en: 'The congress features 4 plenary lectures, 48 oral presentations, and a computational biology AI expo. SHBBSH members receive full attendance bursaries and travel fellowships.',
      it: 'Il congresso prevede 4 sessioni plenarie, 48 presentazioni orali e un\'esposizione di strumenti bioinformatici basati su IA. Borse di studio complete per i membri SHBBSH.',
    },
    leadScientist: 'Bordi Organizativ i SHBBSH',
    institution: 'Shoqata e Biologëve dhe Bioteknologëve të Shqipërisë',
    impactMetric: {
      label: { sq: 'Pjesëmarrës të Pritur', en: 'Expected Attendees', it: 'Partecipanti Previsti' },
      value: '350+ Shkencëtarë',
    },
    image: '/src/assets/images/biotech_hero_lab_1792692590732.jpg',
  },
];
