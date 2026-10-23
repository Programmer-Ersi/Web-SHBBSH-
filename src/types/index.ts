export interface PipelineProgram {
  id: string;
  code: string;
  name: string;
  modality: string;
  therapeuticArea: string;
  targetGene: string;
  indication: string;
  phase: string;
  progressPercent: number;
  description: string;
  keyPublicationDoi?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  searchSources?: Array<{ title?: string; uri: string }>;
  isThinking?: boolean;
}

export interface PdbStructureData {
  id: string;
  pdbId?: string;
  title: string;
  organism: string;
  resolution?: string;
  method: string;
  releaseDate: string;
  description?: string;
}

export interface PubChemCompoundData {
  cid: number;
  name: string;
  title?: string;
  molecularFormula: string;
  formula?: string;
  molecularWeight: number;
  mw?: number;
  xLogP?: number;
  xlogp?: number;
  hBondDonorCount: number;
  hbd?: number;
  hBondAcceptorCount: number;
  hba?: number;
  canonicalSmiles: string;
  smiles?: string;
  iupacName?: string;
  image2dUrl?: string;
  lipinski?: {
    passes?: boolean;
    ruleOfFiveScore?: string | number;
    mwPass?: boolean;
    logpPass?: boolean;
    hbdPass?: boolean;
    hbaPass?: boolean;
    violations?: string[];
  };
}

export interface PubMedArticle {
  pmid: string;
  title: string;
  journal: string;
  pubDate: string;
  authors: string[];
  abstractSnippet?: string;
  doi?: string;
  url?: string;
}

export interface ClinicalTrialStudy {
  nctId: string;
  title?: string;
  briefTitle: string;
  overallStatus: string;
  conditions: string[];
  interventions: string[];
  phase?: string[];
  sponsor: string;
}

export interface SavedNote {
  id?: string;
  userId: string;
  title: string;
  content: string;
  targetGene?: string;
  tags?: string[];
  createdAt: any;
  updatedAt?: any;
}

export interface SavedStructure {
  id?: string;
  userId: string;
  pdbId: string;
  title: string;
  organism?: string;
  resolution?: string;
  createdAt: any;
}
