export type ElementCategory = 
  | 'alkali metal'
  | 'alkaline earth metal'
  | 'transition metal'
  | 'post-transition metal'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export interface ElementData {
  // Basic IUPAC data
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicMass: number;
  atomicMassUncertainty?: number;
  category: ElementCategory;
  block: 's' | 'p' | 'd' | 'f';
  period: number;
  group: number | null; // null for lanthanides/actinides
  
  // Physical properties
  phase: 'solid' | 'liquid' | 'gas' | 'unknown';
  density: number | null; // g/cm³ at STP
  meltingPoint: number | null; // K
  boilingPoint: number | null; // K
  crystallStructure: string | null;
  
  // Chemical properties
  electronConfiguration: string;
  electronConfigurationNoble: string;
  oxidationStates: number[];
  commonOxidationStates: number[];
  electronegativity: number | null; // Pauling scale
  ionizationEnergies: number[]; // eV
  atomicRadius: number | null; // pm
  ionicRadius: { [key: string]: number } | null; // pm for different oxidation states
  
  // Additional academic data
  discoveredBy: string;
  yearDiscovered: number | string;
  naturalAbundance: number | null; // %
  isotopes: {
    massNumber: number;
    abundance?: number; // % for stable isotopes
    halfLife?: string; // for radioactive
    isStable: boolean;
  }[];
  
  // Safety and applications
  hazards: string[];
  applications: string[];
  
  // Metadata
  source: string;
  summary: string;
  xpos?: number;
  ypos?: number;
}

export interface PeriodicTableConfig {
  colorScheme: 'category' | 'block' | 'state' | 'electronegativity' | 'atomic-radius';
  showUncertainties: boolean;
  temperatureUnit: 'K' | 'C';
  showElectronConfig: 'full' | 'noble' | 'none';
  theme: 'light' | 'dark';
}

export interface ElementComparison {
  elements: ElementData[];
  properties: string[];
}