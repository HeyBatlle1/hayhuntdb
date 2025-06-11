import elementsData from '@/data/elements.json';
import { ElementData } from '@/types/element';

// Helper function to set x,y positions for elements
function setElementPositions(elements: ElementData[]): ElementData[] {
  // Standard periodic table layout mapping
  const positionMap: Record<number, { x: number, y: number }> = {
    // Period 1
    1: { x: 1, y: 1 }, // H
    2: { x: 18, y: 1 }, // He
    
    // Period 2
    3: { x: 1, y: 2 }, // Li
    4: { x: 2, y: 2 }, // Be
    5: { x: 13, y: 2 }, // B
    6: { x: 14, y: 2 }, // C
    7: { x: 15, y: 2 }, // N
    8: { x: 16, y: 2 }, // O
    9: { x: 17, y: 2 }, // F
    10: { x: 18, y: 2 }, // Ne
    
    // Period 3
    11: { x: 1, y: 3 }, // Na
    12: { x: 2, y: 3 }, // Mg
    13: { x: 13, y: 3 }, // Al
    14: { x: 14, y: 3 }, // Si
    15: { x: 15, y: 3 }, // P
    16: { x: 16, y: 3 }, // S
    17: { x: 17, y: 3 }, // Cl
    18: { x: 18, y: 3 }, // Ar
    
    // Period 4 (including transition metals)
    19: { x: 1, y: 4 }, // K
    20: { x: 2, y: 4 }, // Ca
    21: { x: 3, y: 4 }, // Sc
    22: { x: 4, y: 4 }, // Ti
    23: { x: 5, y: 4 }, // V
    24: { x: 6, y: 4 }, // Cr
    25: { x: 7, y: 4 }, // Mn
    26: { x: 8, y: 4 }, // Fe
    27: { x: 9, y: 4 }, // Co
    28: { x: 10, y: 4 }, // Ni
    29: { x: 11, y: 4 }, // Cu
    30: { x: 12, y: 4 }, // Zn
    31: { x: 13, y: 4 }, // Ga
    32: { x: 14, y: 4 }, // Ge
    33: { x: 15, y: 4 }, // As
    34: { x: 16, y: 4 }, // Se
    35: { x: 17, y: 4 }, // Br
    36: { x: 18, y: 4 }, // Kr
    
    // Period 5
    37: { x: 1, y: 5 }, // Rb
    38: { x: 2, y: 5 }, // Sr
    39: { x: 3, y: 5 }, // Y
    40: { x: 4, y: 5 }, // Zr
    41: { x: 5, y: 5 }, // Nb
    42: { x: 6, y: 5 }, // Mo
    43: { x: 7, y: 5 }, // Tc
    44: { x: 8, y: 5 }, // Ru
    45: { x: 9, y: 5 }, // Rh
    46: { x: 10, y: 5 }, // Pd
    47: { x: 11, y: 5 }, // Ag
    48: { x: 12, y: 5 }, // Cd
    49: { x: 13, y: 5 }, // In
    50: { x: 14, y: 5 }, // Sn
    51: { x: 15, y: 5 }, // Sb
    52: { x: 16, y: 5 }, // Te
    53: { x: 17, y: 5 }, // I
    54: { x: 18, y: 5 }, // Xe
    
    // Period 6 (including lanthanides)
    55: { x: 1, y: 6 }, // Cs
    56: { x: 2, y: 6 }, // Ba
    57: { x: 3, y: 8 }, // La
    58: { x: 4, y: 8 }, // Ce
    59: { x: 5, y: 8 }, // Pr
    60: { x: 6, y: 8 }, // Nd
    61: { x: 7, y: 8 }, // Pm
    62: { x: 8, y: 8 }, // Sm
    63: { x: 9, y: 8 }, // Eu
    64: { x: 10, y: 8 }, // Gd
    65: { x: 11, y: 8 }, // Tb
    66: { x: 12, y: 8 }, // Dy
    67: { x: 13, y: 8 }, // Ho
    68: { x: 14, y: 8 }, // Er
    69: { x: 15, y: 8 }, // Tm
    70: { x: 16, y: 8 }, // Yb
    71: { x: 17, y: 8 }, // Lu
    72: { x: 4, y: 6 }, // Hf
    73: { x: 5, y: 6 }, // Ta
    74: { x: 6, y: 6 }, // W
    75: { x: 7, y: 6 }, // Re
    76: { x: 8, y: 6 }, // Os
    77: { x: 9, y: 6 }, // Ir
    78: { x: 10, y: 6 }, // Pt
    79: { x: 11, y: 6 }, // Au
    80: { x: 12, y: 6 }, // Hg
    81: { x: 13, y: 6 }, // Tl
    82: { x: 14, y: 6 }, // Pb
    83: { x: 15, y: 6 }, // Bi
    84: { x: 16, y: 6 }, // Po
    85: { x: 17, y: 6 }, // At
    86: { x: 18, y: 6 }, // Rn
    
    // Period 7 (including actinides)
    87: { x: 1, y: 7 }, // Fr
    88: { x: 2, y: 7 }, // Ra
    89: { x: 3, y: 9 }, // Ac
    90: { x: 4, y: 9 }, // Th
    91: { x: 5, y: 9 }, // Pa
    92: { x: 6, y: 9 }, // U
    93: { x: 7, y: 9 }, // Np
    94: { x: 8, y: 9 }, // Pu
    95: { x: 9, y: 9 }, // Am
    96: { x: 10, y: 9 }, // Cm
    97: { x: 11, y: 9 }, // Bk
    98: { x: 12, y: 9 }, // Cf
    99: { x: 13, y: 9 }, // Es
    100: { x: 14, y: 9 }, // Fm
    101: { x: 15, y: 9 }, // Md
    102: { x: 16, y: 9 }, // No
    103: { x: 17, y: 9 }, // Lr
    104: { x: 4, y: 7 }, // Rf
    105: { x: 5, y: 7 }, // Db
    106: { x: 6, y: 7 }, // Sg
    107: { x: 7, y: 7 }, // Bh
    108: { x: 8, y: 7 }, // Hs
    109: { x: 9, y: 7 }, // Mt
    110: { x: 10, y: 7 }, // Ds
    111: { x: 11, y: 7 }, // Rg
    112: { x: 12, y: 7 }, // Cn
    113: { x: 13, y: 7 }, // Nh
    114: { x: 14, y: 7 }, // Fl
    115: { x: 15, y: 7 }, // Mc
    116: { x: 16, y: 7 }, // Lv
    117: { x: 17, y: 7 }, // Ts
    118: { x: 18, y: 7 }, // Og
  };

  return elements.map(element => ({
    ...element,
    xpos: positionMap[element.atomicNumber]?.x || 0,
    ypos: positionMap[element.atomicNumber]?.y || 0
  }));
}

// Function to normalize element categories to match our standard set
function normalizeCategories(elements: ElementData[]): ElementData[] {
  const categoryMapping: Record<string, string> = {
    "noble gas": "noble gas",
    "alkali metal": "alkali metal",
    "alkaline earth metal": "alkaline earth metal",
    "transition metal": "transition metal",
    "post-transition metal": "post-transition metal",
    "metalloid": "metalloid",
    "nonmetal": "nonmetal",
    "polyatomic nonmetal": "nonmetal",
    "diatomic nonmetal": "nonmetal",
    "halogen": "halogen",
    "lanthanoid": "lanthanide",
    "lanthanide": "lanthanide",
    "actinoid": "actinide",
    "actinide": "actinide",
  };

  return elements.map(element => ({
    ...element,
    category: categoryMapping[element.category.toLowerCase()] || element.category
  }));
}

export async function getElements(): Promise<ElementData[]> {
  try {
    // Process the elements data
    const elementsWithPositions = setElementPositions(elementsData.elements);
    const normalizedElements = normalizeCategories(elementsWithPositions);
    return normalizedElements;
  } catch (error) {
    console.error("Error loading elements data:", error);
    return [];
  }
}