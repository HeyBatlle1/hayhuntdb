import { ElementData } from '@/types/element';

// Complete IUPAC dataset with all 118 elements
const COMPLETE_ELEMENTS_DATA = [
  // Period 1
  { number: 1, symbol: 'H', name: 'Hydrogen', atomic_mass: 1.008, category: 'nonmetal', phase: 'gas', block: 's', period: 1, group: 1, electron_configuration: '1s¹', electronegativity_pauling: 2.20, discovered_by: 'Henry Cavendish', year: 1766 },
  { number: 2, symbol: 'He', name: 'Helium', atomic_mass: 4.0026, category: 'noble gas', phase: 'gas', block: 's', period: 1, group: 18, electron_configuration: '1s²', electronegativity_pauling: null, discovered_by: 'Pierre Janssen', year: 1868 },
  
  // Period 2
  { number: 3, symbol: 'Li', name: 'Lithium', atomic_mass: 6.94, category: 'alkali metal', phase: 'solid', block: 's', period: 2, group: 1, electron_configuration: '[He] 2s¹', electronegativity_pauling: 0.98, discovered_by: 'Johan August Arfwedson', year: 1817 },
  { number: 4, symbol: 'Be', name: 'Beryllium', atomic_mass: 9.0122, category: 'alkaline earth metal', phase: 'solid', block: 's', period: 2, group: 2, electron_configuration: '[He] 2s²', electronegativity_pauling: 1.57, discovered_by: 'Louis Nicolas Vauquelin', year: 1798 },
  { number: 5, symbol: 'B', name: 'Boron', atomic_mass: 10.81, category: 'metalloid', phase: 'solid', block: 'p', period: 2, group: 13, electron_configuration: '[He] 2s² 2p¹', electronegativity_pauling: 2.04, discovered_by: 'Joseph Louis Gay-Lussac', year: 1808 },
  { number: 6, symbol: 'C', name: 'Carbon', atomic_mass: 12.011, category: 'nonmetal', phase: 'solid', block: 'p', period: 2, group: 14, electron_configuration: '[He] 2s² 2p²', electronegativity_pauling: 2.55, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 7, symbol: 'N', name: 'Nitrogen', atomic_mass: 14.007, category: 'nonmetal', phase: 'gas', block: 'p', period: 2, group: 15, electron_configuration: '[He] 2s² 2p³', electronegativity_pauling: 3.04, discovered_by: 'Daniel Rutherford', year: 1772 },
  { number: 8, symbol: 'O', name: 'Oxygen', atomic_mass: 15.999, category: 'nonmetal', phase: 'gas', block: 'p', period: 2, group: 16, electron_configuration: '[He] 2s² 2p⁴', electronegativity_pauling: 3.44, discovered_by: 'Joseph Priestley', year: 1774 },
  { number: 9, symbol: 'F', name: 'Fluorine', atomic_mass: 18.998, category: 'halogen', phase: 'gas', block: 'p', period: 2, group: 17, electron_configuration: '[He] 2s² 2p⁵', electronegativity_pauling: 3.98, discovered_by: 'André-Marie Ampère', year: 1886 },
  { number: 10, symbol: 'Ne', name: 'Neon', atomic_mass: 20.180, category: 'noble gas', phase: 'gas', block: 'p', period: 2, group: 18, electron_configuration: '[He] 2s² 2p⁶', electronegativity_pauling: null, discovered_by: 'William Ramsay', year: 1898 },
  
  // Period 3
  { number: 11, symbol: 'Na', name: 'Sodium', atomic_mass: 22.990, category: 'alkali metal', phase: 'solid', block: 's', period: 3, group: 1, electron_configuration: '[Ne] 3s¹', electronegativity_pauling: 0.93, discovered_by: 'Humphry Davy', year: 1807 },
  { number: 12, symbol: 'Mg', name: 'Magnesium', atomic_mass: 24.305, category: 'alkaline earth metal', phase: 'solid', block: 's', period: 3, group: 2, electron_configuration: '[Ne] 3s²', electronegativity_pauling: 1.31, discovered_by: 'Joseph Black', year: 1755 },
  { number: 13, symbol: 'Al', name: 'Aluminum', atomic_mass: 26.982, category: 'post-transition metal', phase: 'solid', block: 'p', period: 3, group: 13, electron_configuration: '[Ne] 3s² 3p¹', electronegativity_pauling: 1.61, discovered_by: 'Hans Christian Ørsted', year: 1825 },
  { number: 14, symbol: 'Si', name: 'Silicon', atomic_mass: 28.085, category: 'metalloid', phase: 'solid', block: 'p', period: 3, group: 14, electron_configuration: '[Ne] 3s² 3p²', electronegativity_pauling: 1.90, discovered_by: 'Jöns Jacob Berzelius', year: 1824 },
  { number: 15, symbol: 'P', name: 'Phosphorus', atomic_mass: 30.974, category: 'nonmetal', phase: 'solid', block: 'p', period: 3, group: 15, electron_configuration: '[Ne] 3s² 3p³', electronegativity_pauling: 2.19, discovered_by: 'Hennig Brand', year: 1669 },
  { number: 16, symbol: 'S', name: 'Sulfur', atomic_mass: 32.06, category: 'nonmetal', phase: 'solid', block: 'p', period: 3, group: 16, electron_configuration: '[Ne] 3s² 3p⁴', electronegativity_pauling: 2.58, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', atomic_mass: 35.45, category: 'halogen', phase: 'gas', block: 'p', period: 3, group: 17, electron_configuration: '[Ne] 3s² 3p⁵', electronegativity_pauling: 3.16, discovered_by: 'Carl Wilhelm Scheele', year: 1774 },
  { number: 18, symbol: 'Ar', name: 'Argon', atomic_mass: 39.948, category: 'noble gas', phase: 'gas', block: 'p', period: 3, group: 18, electron_configuration: '[Ne] 3s² 3p⁶', electronegativity_pauling: null, discovered_by: 'Lord Rayleigh', year: 1894 },
  
  // Period 4
  { number: 19, symbol: 'K', name: 'Potassium', atomic_mass: 39.098, category: 'alkali metal', phase: 'solid', block: 's', period: 4, group: 1, electron_configuration: '[Ar] 4s¹', electronegativity_pauling: 0.82, discovered_by: 'Humphry Davy', year: 1807 },
  { number: 20, symbol: 'Ca', name: 'Calcium', atomic_mass: 40.078, category: 'alkaline earth metal', phase: 'solid', block: 's', period: 4, group: 2, electron_configuration: '[Ar] 4s²', electronegativity_pauling: 1.00, discovered_by: 'Humphry Davy', year: 1808 },
  { number: 21, symbol: 'Sc', name: 'Scandium', atomic_mass: 44.956, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 3, electron_configuration: '[Ar] 3d¹ 4s²', electronegativity_pauling: 1.36, discovered_by: 'Lars Fredrik Nilson', year: 1879 },
  { number: 22, symbol: 'Ti', name: 'Titanium', atomic_mass: 47.867, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 4, electron_configuration: '[Ar] 3d² 4s²', electronegativity_pauling: 1.54, discovered_by: 'William Gregor', year: 1791 },
  { number: 23, symbol: 'V', name: 'Vanadium', atomic_mass: 50.942, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 5, electron_configuration: '[Ar] 3d³ 4s²', electronegativity_pauling: 1.63, discovered_by: 'Andrés Manuel del Río', year: 1801 },
  { number: 24, symbol: 'Cr', name: 'Chromium', atomic_mass: 51.996, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 6, electron_configuration: '[Ar] 3d⁵ 4s¹', electronegativity_pauling: 1.66, discovered_by: 'Louis Nicolas Vauquelin', year: 1797 },
  { number: 25, symbol: 'Mn', name: 'Manganese', atomic_mass: 54.938, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 7, electron_configuration: '[Ar] 3d⁵ 4s²', electronegativity_pauling: 1.55, discovered_by: 'Carl Wilhelm Scheele', year: 1774 },
  { number: 26, symbol: 'Fe', name: 'Iron', atomic_mass: 55.845, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 8, electron_configuration: '[Ar] 3d⁶ 4s²', electronegativity_pauling: 1.83, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 27, symbol: 'Co', name: 'Cobalt', atomic_mass: 58.933, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 9, electron_configuration: '[Ar] 3d⁷ 4s²', electronegativity_pauling: 1.88, discovered_by: 'Georg Brandt', year: 1735 },
  { number: 28, symbol: 'Ni', name: 'Nickel', atomic_mass: 58.693, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 10, electron_configuration: '[Ar] 3d⁸ 4s²', electronegativity_pauling: 1.91, discovered_by: 'Axel Fredrik Cronstedt', year: 1751 },
  { number: 29, symbol: 'Cu', name: 'Copper', atomic_mass: 63.546, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 11, electron_configuration: '[Ar] 3d¹⁰ 4s¹', electronegativity_pauling: 1.90, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 30, symbol: 'Zn', name: 'Zinc', atomic_mass: 65.38, category: 'transition metal', phase: 'solid', block: 'd', period: 4, group: 12, electron_configuration: '[Ar] 3d¹⁰ 4s²', electronegativity_pauling: 1.65, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 31, symbol: 'Ga', name: 'Gallium', atomic_mass: 69.723, category: 'post-transition metal', phase: 'solid', block: 'p', period: 4, group: 13, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p¹', electronegativity_pauling: 1.81, discovered_by: 'Lecoq de Boisbaudran', year: 1875 },
  { number: 32, symbol: 'Ge', name: 'Germanium', atomic_mass: 72.630, category: 'metalloid', phase: 'solid', block: 'p', period: 4, group: 14, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p²', electronegativity_pauling: 2.01, discovered_by: 'Clemens Winkler', year: 1886 },
  { number: 33, symbol: 'As', name: 'Arsenic', atomic_mass: 74.922, category: 'metalloid', phase: 'solid', block: 'p', period: 4, group: 15, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p³', electronegativity_pauling: 2.18, discovered_by: 'Albertus Magnus', year: 1250 },
  { number: 34, symbol: 'Se', name: 'Selenium', atomic_mass: 78.971, category: 'nonmetal', phase: 'solid', block: 'p', period: 4, group: 16, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p⁴', electronegativity_pauling: 2.55, discovered_by: 'Jöns Jacob Berzelius', year: 1817 },
  { number: 35, symbol: 'Br', name: 'Bromine', atomic_mass: 79.904, category: 'halogen', phase: 'liquid', block: 'p', period: 4, group: 17, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p⁵', electronegativity_pauling: 2.96, discovered_by: 'Antoine Jérôme Balard', year: 1826 },
  { number: 36, symbol: 'Kr', name: 'Krypton', atomic_mass: 83.798, category: 'noble gas', phase: 'gas', block: 'p', period: 4, group: 18, electron_configuration: '[Ar] 3d¹⁰ 4s² 4p⁶', electronegativity_pauling: 3.00, discovered_by: 'William Ramsay', year: 1898 },
  
  // Period 5
  { number: 37, symbol: 'Rb', name: 'Rubidium', atomic_mass: 85.468, category: 'alkali metal', phase: 'solid', block: 's', period: 5, group: 1, electron_configuration: '[Kr] 5s¹', electronegativity_pauling: 0.82, discovered_by: 'Robert Bunsen', year: 1861 },
  { number: 38, symbol: 'Sr', name: 'Strontium', atomic_mass: 87.62, category: 'alkaline earth metal', phase: 'solid', block: 's', period: 5, group: 2, electron_configuration: '[Kr] 5s²', electronegativity_pauling: 0.95, discovered_by: 'William Cruickshank', year: 1787 },
  { number: 39, symbol: 'Y', name: 'Yttrium', atomic_mass: 88.906, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 3, electron_configuration: '[Kr] 4d¹ 5s²', electronegativity_pauling: 1.22, discovered_by: 'Johan Gadolin', year: 1794 },
  { number: 40, symbol: 'Zr', name: 'Zirconium', atomic_mass: 91.224, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 4, electron_configuration: '[Kr] 4d² 5s²', electronegativity_pauling: 1.33, discovered_by: 'Martin Heinrich Klaproth', year: 1789 },
  { number: 41, symbol: 'Nb', name: 'Niobium', atomic_mass: 92.906, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 5, electron_configuration: '[Kr] 4d⁴ 5s¹', electronegativity_pauling: 1.6, discovered_by: 'Charles Hatchett', year: 1801 },
  { number: 42, symbol: 'Mo', name: 'Molybdenum', atomic_mass: 95.95, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 6, electron_configuration: '[Kr] 4d⁵ 5s¹', electronegativity_pauling: 2.16, discovered_by: 'Carl Wilhelm Scheele', year: 1778 },
  { number: 43, symbol: 'Tc', name: 'Technetium', atomic_mass: 98, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 7, electron_configuration: '[Kr] 4d⁵ 5s²', electronegativity_pauling: 1.9, discovered_by: 'Emilio Segrè', year: 1937 },
  { number: 44, symbol: 'Ru', name: 'Ruthenium', atomic_mass: 101.07, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 8, electron_configuration: '[Kr] 4d⁷ 5s¹', electronegativity_pauling: 2.2, discovered_by: 'Karl Ernst Claus', year: 1844 },
  { number: 45, symbol: 'Rh', name: 'Rhodium', atomic_mass: 102.91, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 9, electron_configuration: '[Kr] 4d⁸ 5s¹', electronegativity_pauling: 2.28, discovered_by: 'William Hyde Wollaston', year: 1803 },
  { number: 46, symbol: 'Pd', name: 'Palladium', atomic_mass: 106.42, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 10, electron_configuration: '[Kr] 4d¹⁰', electronegativity_pauling: 2.20, discovered_by: 'William Hyde Wollaston', year: 1803 },
  { number: 47, symbol: 'Ag', name: 'Silver', atomic_mass: 107.87, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 11, electron_configuration: '[Kr] 4d¹⁰ 5s¹', electronegativity_pauling: 1.93, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 48, symbol: 'Cd', name: 'Cadmium', atomic_mass: 112.41, category: 'transition metal', phase: 'solid', block: 'd', period: 5, group: 12, electron_configuration: '[Kr] 4d¹⁰ 5s²', electronegativity_pauling: 1.69, discovered_by: 'Karl Samuel Leberecht Hermann', year: 1817 },
  { number: 49, symbol: 'In', name: 'Indium', atomic_mass: 114.82, category: 'post-transition metal', phase: 'solid', block: 'p', period: 5, group: 13, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p¹', electronegativity_pauling: 1.78, discovered_by: 'Ferdinand Reich', year: 1863 },
  { number: 50, symbol: 'Sn', name: 'Tin', atomic_mass: 118.71, category: 'post-transition metal', phase: 'solid', block: 'p', period: 5, group: 14, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p²', electronegativity_pauling: 1.96, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 51, symbol: 'Sb', name: 'Antimony', atomic_mass: 121.76, category: 'metalloid', phase: 'solid', block: 'p', period: 5, group: 15, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p³', electronegativity_pauling: 2.05, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 52, symbol: 'Te', name: 'Tellurium', atomic_mass: 127.60, category: 'metalloid', phase: 'solid', block: 'p', period: 5, group: 16, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p⁴', electronegativity_pauling: 2.1, discovered_by: 'Franz-Joseph Müller von Reichenstein', year: 1782 },
  { number: 53, symbol: 'I', name: 'Iodine', atomic_mass: 126.90, category: 'halogen', phase: 'solid', block: 'p', period: 5, group: 17, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p⁵', electronegativity_pauling: 2.66, discovered_by: 'Bernard Courtois', year: 1811 },
  { number: 54, symbol: 'Xe', name: 'Xenon', atomic_mass: 131.29, category: 'noble gas', phase: 'gas', block: 'p', period: 5, group: 18, electron_configuration: '[Kr] 4d¹⁰ 5s² 5p⁶', electronegativity_pauling: 2.60, discovered_by: 'William Ramsay', year: 1898 },
  
  // Period 6
  { number: 55, symbol: 'Cs', name: 'Cesium', atomic_mass: 132.91, category: 'alkali metal', phase: 'solid', block: 's', period: 6, group: 1, electron_configuration: '[Xe] 6s¹', electronegativity_pauling: 0.79, discovered_by: 'Robert Bunsen', year: 1860 },
  { number: 56, symbol: 'Ba', name: 'Barium', atomic_mass: 137.33, category: 'alkaline earth metal', phase: 'solid', block: 's', period: 6, group: 2, electron_configuration: '[Xe] 6s²', electronegativity_pauling: 0.89, discovered_by: 'Humphry Davy', year: 1808 },
  
  // Lanthanides (57-71)
  { number: 57, symbol: 'La', name: 'Lanthanum', atomic_mass: 138.91, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 5d¹ 6s²', electronegativity_pauling: 1.1, discovered_by: 'Carl Gustaf Mosander', year: 1839 },
  { number: 58, symbol: 'Ce', name: 'Cerium', atomic_mass: 140.12, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f¹ 5d¹ 6s²', electronegativity_pauling: 1.12, discovered_by: 'Jöns Jacob Berzelius', year: 1803 },
  { number: 59, symbol: 'Pr', name: 'Praseodymium', atomic_mass: 140.91, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f³ 6s²', electronegativity_pauling: 1.13, discovered_by: 'Carl Auer von Welsbach', year: 1885 },
  { number: 60, symbol: 'Nd', name: 'Neodymium', atomic_mass: 144.24, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f⁴ 6s²', electronegativity_pauling: 1.14, discovered_by: 'Carl Auer von Welsbach', year: 1885 },
  { number: 61, symbol: 'Pm', name: 'Promethium', atomic_mass: 145, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f⁵ 6s²', electronegativity_pauling: 1.13, discovered_by: 'Charles D. Coryell', year: 1945 },
  { number: 62, symbol: 'Sm', name: 'Samarium', atomic_mass: 150.36, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f⁶ 6s²', electronegativity_pauling: 1.17, discovered_by: 'Lecoq de Boisbaudran', year: 1879 },
  { number: 63, symbol: 'Eu', name: 'Europium', atomic_mass: 151.96, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f⁷ 6s²', electronegativity_pauling: 1.2, discovered_by: 'Eugène-Anatole Demarçay', year: 1901 },
  { number: 64, symbol: 'Gd', name: 'Gadolinium', atomic_mass: 157.25, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f⁷ 5d¹ 6s²', electronegativity_pauling: 1.2, discovered_by: 'Jean Charles Galissard de Marignac', year: 1880 },
  { number: 65, symbol: 'Tb', name: 'Terbium', atomic_mass: 158.93, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f⁹ 6s²', electronegativity_pauling: 1.1, discovered_by: 'Carl Gustaf Mosander', year: 1843 },
  { number: 66, symbol: 'Dy', name: 'Dysprosium', atomic_mass: 162.50, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f¹⁰ 6s²', electronegativity_pauling: 1.22, discovered_by: 'Lecoq de Boisbaudran', year: 1886 },
  { number: 67, symbol: 'Ho', name: 'Holmium', atomic_mass: 164.93, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f¹¹ 6s²', electronegativity_pauling: 1.23, discovered_by: 'Per Teodor Cleve', year: 1878 },
  { number: 68, symbol: 'Er', name: 'Erbium', atomic_mass: 167.26, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f¹² 6s²', electronegativity_pauling: 1.24, discovered_by: 'Carl Gustaf Mosander', year: 1843 },
  { number: 69, symbol: 'Tm', name: 'Thulium', atomic_mass: 168.93, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f¹³ 6s²', electronegativity_pauling: 1.25, discovered_by: 'Per Teodor Cleve', year: 1879 },
  { number: 70, symbol: 'Yb', name: 'Ytterbium', atomic_mass: 173.05, category: 'lanthanide', phase: 'solid', block: 'f', period: 6, group: null, electron_configuration: '[Xe] 4f¹⁴ 6s²', electronegativity_pauling: 1.1, discovered_by: 'Jean Charles Galissard de Marignac', year: 1878 },
  { number: 71, symbol: 'Lu', name: 'Lutetium', atomic_mass: 174.97, category: 'lanthanide', phase: 'solid', block: 'd', period: 6, group: 3, electron_configuration: '[Xe] 4f¹⁴ 5d¹ 6s²', electronegativity_pauling: 1.27, discovered_by: 'Carl Auer von Welsbach', year: 1907 },
  
  // Period 6 continued
  { number: 72, symbol: 'Hf', name: 'Hafnium', atomic_mass: 178.49, category: 'transition metal', phase: 'solid', block: 'd', period: 6, group: 4, electron_configuration: '[Xe] 4f¹⁴ 5d² 6s²', electronegativity_pauling: 1.3, discovered_by: 'Dirk Coster', year: 1923 },
  { number: 73, symbol: 'Ta', name: 'Tantalum', atomic_mass: 180.95, category: 'transition metal', phase: 'solid', block: 'd', period: 6, group: 5, electron_configuration: '[Xe] 4f¹⁴ 5d³ 6s²', electronegativity_pauling: 1.5, discovered_by: 'Anders Gustaf Ekeberg', year: 1802 },
  { number: 74, symbol: 'W', name: 'Tungsten', atomic_mass: 183.84, category: 'transition metal', phase: 'solid', block: 'd', period: 6, group: 6, electron_configuration: '[Xe] 4f¹⁴ 5d⁴ 6s²', electronegativity_pauling: 2.36, discovered_by: 'Juan José Elhuyar', year: 1783 },
  { number: 75, symbol: 'Re', name: 'Rhenium', atomic_mass: 186.21, category: 'transition metal', phase: 'solid', block: 'd', period: 6, group: 7, electron_configuration: '[Xe] 4f¹⁴ 5d⁵ 6s²', electronegativity_pauling: 1.9, discovered_by: 'Ida Noddack', year: 1925 },
  { number: 76, symbol: 'Os', name: 'Osmium', atomic_mass: 190.23, category: 'transition metal', phase: 'solid', block: 'd', period: 6, group: 8, electron_configuration: '[Xe] 4f¹⁴ 5d⁶ 6s²', electronegativity_pauling: 2.2, discovered_by: 'Smithson Tennant', year: 1803 },
  { number: 77, symbol: 'Ir', name: 'Iridium', atomic_mass: 192.22, category: 'transition metal', phase: 'solid', block: 'd', period: 6, group: 9, electron_configuration: '[Xe] 4f¹⁴ 5d⁷ 6s²', electronegativity_pauling: 2.20, discovered_by: 'Smithson Tennant', year: 1803 },
  { number: 78, symbol: 'Pt', name: 'Platinum', atomic_mass: 195.08, category: 'transition metal', phase: 'solid', block: 'd', period: 6, group: 10, electron_configuration: '[Xe] 4f¹⁴ 5d⁹ 6s¹', electronegativity_pauling: 2.28, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 79, symbol: 'Au', name: 'Gold', atomic_mass: 196.97, category: 'transition metal', phase: 'solid', block: 'd', period: 6, group: 11, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', electronegativity_pauling: 2.54, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 80, symbol: 'Hg', name: 'Mercury', atomic_mass: 200.59, category: 'transition metal', phase: 'liquid', block: 'd', period: 6, group: 12, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', electronegativity_pauling: 2.00, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 81, symbol: 'Tl', name: 'Thallium', atomic_mass: 204.38, category: 'post-transition metal', phase: 'solid', block: 'p', period: 6, group: 13, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', electronegativity_pauling: 1.62, discovered_by: 'William Crookes', year: 1861 },
  { number: 82, symbol: 'Pb', name: 'Lead', atomic_mass: 207.2, category: 'post-transition metal', phase: 'solid', block: 'p', period: 6, group: 14, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', electronegativity_pauling: 2.33, discovered_by: 'Ancient', year: 'Ancient' },
  { number: 83, symbol: 'Bi', name: 'Bismuth', atomic_mass: 208.98, category: 'post-transition metal', phase: 'solid', block: 'p', period: 6, group: 15, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', electronegativity_pauling: 2.02, discovered_by: 'Claude François Geoffroy', year: 1753 },
  { number: 84, symbol: 'Po', name: 'Polonium', atomic_mass: 209, category: 'metalloid', phase: 'solid', block: 'p', period: 6, group: 16, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', electronegativity_pauling: 2.0, discovered_by: 'Marie Curie', year: 1898 },
  { number: 85, symbol: 'At', name: 'Astatine', atomic_mass: 210, category: 'halogen', phase: 'solid', block: 'p', period: 6, group: 17, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', electronegativity_pauling: 2.2, discovered_by: 'Dale R. Corson', year: 1940 },
  { number: 86, symbol: 'Rn', name: 'Radon', atomic_mass: 222, category: 'noble gas', phase: 'gas', block: 'p', period: 6, group: 18, electron_configuration: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', electronegativity_pauling: 2.2, discovered_by: 'Friedrich Ernst Dorn', year: 1900 },
  
  // Period 7
  { number: 87, symbol: 'Fr', name: 'Francium', atomic_mass: 223, category: 'alkali metal', phase: 'solid', block: 's', period: 7, group: 1, electron_configuration: '[Rn] 7s¹', electronegativity_paulling: 0.7, discovered_by: 'Marguerite Perey', year: 1939 },
  { number: 88, symbol: 'Ra', name: 'Radium', atomic_mass: 226, category: 'alkaline earth metal', phase: 'solid', block: 's', period: 7, group: 2, electron_configuration: '[Rn] 7s²', electronegativity_pauling: 0.9, discovered_by: 'Marie Curie', year: 1898 },
  
  // Actinides (89-103)
  { number: 89, symbol: 'Ac', name: 'Actinium', atomic_mass: 227, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 6d¹ 7s²', electronegativity_pauling: 1.1, discovered_by: 'André-Louis Debierne', year: 1899 },
  { number: 90, symbol: 'Th', name: 'Thorium', atomic_mass: 232.04, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 6d² 7s²', electronegativity_pauling: 1.3, discovered_by: 'Jöns Jacob Berzelius', year: 1829 },
  { number: 91, symbol: 'Pa', name: 'Protactinium', atomic_mass: 231.04, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f² 6d¹ 7s²', electronegativity_pauling: 1.5, discovered_by: 'Kasimir Fajans', year: 1913 },
  { number: 92, symbol: 'U', name: 'Uranium', atomic_mass: 238.03, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f³ 6d¹ 7s²', electronegativity_pauling: 1.38, discovered_by: 'Martin Heinrich Klaproth', year: 1789 },
  { number: 93, symbol: 'Np', name: 'Neptunium', atomic_mass: 237, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f⁴ 6d¹ 7s²', electronegativity_pauling: 1.36, discovered_by: 'Edwin McMillan', year: 1940 },
  { number: 94, symbol: 'Pu', name: 'Plutonium', atomic_mass: 244, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f⁶ 7s²', electronegativity_pauling: 1.28, discovered_by: 'Glenn T. Seaborg', year: 1940 },
  { number: 95, symbol: 'Am', name: 'Americium', atomic_mass: 243, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f⁷ 7s²', electronegativity_pauling: 1.3, discovered_by: 'Glenn T. Seaborg', year: 1944 },
  { number: 96, symbol: 'Cm', name: 'Curium', atomic_mass: 247, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f⁷ 6d¹ 7s²', electronegativity_pauling: 1.3, discovered_by: 'Glenn T. Seaborg', year: 1944 },
  { number: 97, symbol: 'Bk', name: 'Berkelium', atomic_mass: 247, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f⁹ 7s²', electronegativity_pauling: 1.3, discovered_by: 'Glenn T. Seaborg', year: 1949 },
  { number: 98, symbol: 'Cf', name: 'Californium', atomic_mass: 251, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f¹⁰ 7s²', electronegativity_pauling: 1.3, discovered_by: 'Glenn T. Seaborg', year: 1950 },
  { number: 99, symbol: 'Es', name: 'Einsteinium', atomic_mass: 252, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f¹¹ 7s²', electronegativity_pauling: 1.3, discovered_by: 'Albert Ghiorso', year: 1952 },
  { number: 100, symbol: 'Fm', name: 'Fermium', atomic_mass: 257, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f¹² 7s²', electronegativity_pauling: 1.3, discovered_by: 'Albert Ghiorso', year: 1952 },
  { number: 101, symbol: 'Md', name: 'Mendelevium', atomic_mass: 258, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f¹³ 7s²', electronegativity_pauling: 1.3, discovered_by: 'Albert Ghiorso', year: 1955 },
  { number: 102, symbol: 'No', name: 'Nobelium', atomic_mass: 259, category: 'actinide', phase: 'solid', block: 'f', period: 7, group: null, electron_configuration: '[Rn] 5f¹⁴ 7s²', electronegativity_pauling: 1.3, discovered_by: 'Albert Ghiorso', year: 1958 },
  { number: 103, symbol: 'Lr', name: 'Lawrencium', atomic_mass: 266, category: 'actinide', phase: 'solid', block: 'd', period: 7, group: 3, electron_configuration: '[Rn] 5f¹⁴ 6d¹ 7s²', electronegativity_pauling: 1.3, discovered_by: 'Albert Ghiorso', year: 1961 },
  
  // Period 7 continued
  { number: 104, symbol: 'Rf', name: 'Rutherfordium', atomic_mass: 267, category: 'transition metal', phase: 'solid', block: 'd', period: 7, group: 4, electron_configuration: '[Rn] 5f¹⁴ 6d² 7s²', electronegativity_pauling: null, discovered_by: 'Soviet scientists', year: 1964 },
  { number: 105, symbol: 'Db', name: 'Dubnium', atomic_mass: 268, category: 'transition metal', phase: 'solid', block: 'd', period: 7, group: 5, electron_configuration: '[Rn] 5f¹⁴ 6d³ 7s²', electronegativity_pauling: null, discovered_by: 'Soviet scientists', year: 1967 },
  { number: 106, symbol: 'Sg', name: 'Seaborgium', atomic_mass: 269, category: 'transition metal', phase: 'solid', block: 'd', period: 7, group: 6, electron_configuration: '[Rn] 5f¹⁴ 6d⁴ 7s²', electronegativity_pauling: null, discovered_by: 'Lawrence Berkeley Laboratory', year: 1974 },
  { number: 107, symbol: 'Bh', name: 'Bohrium', atomic_mass: 270, category: 'transition metal', phase: 'solid', block: 'd', period: 7, group: 7, electron_configuration: '[Rn] 5f¹⁴ 6d⁵ 7s²', electronegativity_pauling: null, discovered_by: 'GSI Helmholtzzentrum', year: 1981 },
  { number: 108, symbol: 'Hs', name: 'Hassium', atomic_mass: 269, category: 'transition metal', phase: 'solid', block: 'd', period: 7, group: 8, electron_configuration: '[Rn] 5f¹⁴ 6d⁶ 7s²', electronegativity_pauling: null, discovered_by: 'GSI Helmholtzzentrum', year: 1984 },
  { number: 109, symbol: 'Mt', name: 'Meitnerium', atomic_mass: 278, category: 'transition metal', phase: 'solid', block: 'd', period: 7, group: 9, electron_configuration: '[Rn] 5f¹⁴ 6d⁷ 7s²', electronegativity_pauling: null, discovered_by: 'GSI Helmholtzzentrum', year: 1982 },
  { number: 110, symbol: 'Ds', name: 'Darmstadtium', atomic_mass: 281, category: 'transition metal', phase: 'solid', block: 'd', period: 7, group: 10, electron_configuration: '[Rn] 5f¹⁴ 6d⁸ 7s²', electronegativity_pauling: null, discovered_by: 'GSI Helmholtzzentrum', year: 1994 },
  { number: 111, symbol: 'Rg', name: 'Roentgenium', atomic_mass: 282, category: 'transition metal', phase: 'solid', block: 'd', period: 7, group: 11, electron_configuration: '[Rn] 5f¹⁴ 6d⁹ 7s²', electronegativity_pauling: null, discovered_by: 'GSI Helmholtzzentrum', year: 1994 },
  { number: 112, symbol: 'Cn', name: 'Copernicium', atomic_mass: 285, category: 'transition metal', phase: 'solid', block: 'd', period: 7, group: 12, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', electronegativity_pauling: null, discovered_by: 'GSI Helmholtzzentrum', year: 1996 },
  { number: 113, symbol: 'Nh', name: 'Nihonium', atomic_mass: 286, category: 'post-transition metal', phase: 'solid', block: 'p', period: 7, group: 13, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', electronegativity_pauling: null, discovered_by: 'RIKEN', year: 2004 },
  { number: 114, symbol: 'Fl', name: 'Flerovium', atomic_mass: 289, category: 'post-transition metal', phase: 'solid', block: 'p', period: 7, group: 14, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', electronegativity_pauling: null, discovered_by: 'Joint Institute for Nuclear Research', year: 1999 },
  { number: 115, symbol: 'Mc', name: 'Moscovium', atomic_mass: 290, category: 'post-transition metal', phase: 'solid', block: 'p', period: 7, group: 15, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', electronegativity_pauling: null, discovered_by: 'Joint Institute for Nuclear Research', year: 2003 },
  { number: 116, symbol: 'Lv', name: 'Livermorium', atomic_mass: 293, category: 'post-transition metal', phase: 'solid', block: 'p', period: 7, group: 16, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', electronegativity_pauling: null, discovered_by: 'Joint Institute for Nuclear Research', year: 2000 },
  { number: 117, symbol: 'Ts', name: 'Tennessine', atomic_mass: 294, category: 'halogen', phase: 'solid', block: 'p', period: 7, group: 17, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', electronegativity_pauling: null, discovered_by: 'Joint Institute for Nuclear Research', year: 2010 },
  { number: 118, symbol: 'Og', name: 'Oganesson', atomic_mass: 294, category: 'noble gas', phase: 'solid', block: 'p', period: 7, group: 18, electron_configuration: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', electronegativity_pauling: null, discovered_by: 'Joint Institute for Nuclear Research', year: 2002 }
];

// Complete position mapping for all 118 elements
function convertToIUPACFormat(elements: any[]): ElementData[] {
  const positionMap: Record<number, { x: number, y: number }> = {
    // Period 1
    1: { x: 1, y: 1 }, 2: { x: 18, y: 1 },
    
    // Period 2
    3: { x: 1, y: 2 }, 4: { x: 2, y: 2 }, 5: { x: 13, y: 2 }, 6: { x: 14, y: 2 }, 7: { x: 15, y: 2 }, 8: { x: 16, y: 2 }, 9: { x: 17, y: 2 }, 10: { x: 18, y: 2 },
    
    // Period 3
    11: { x: 1, y: 3 }, 12: { x: 2, y: 3 }, 13: { x: 13, y: 3 }, 14: { x: 14, y: 3 }, 15: { x: 15, y: 3 }, 16: { x: 16, y: 3 }, 17: { x: 17, y: 3 }, 18: { x: 18, y: 3 },
    
    // Period 4
    19: { x: 1, y: 4 }, 20: { x: 2, y: 4 }, 21: { x: 3, y: 4 }, 22: { x: 4, y: 4 }, 23: { x: 5, y: 4 }, 24: { x: 6, y: 4 }, 25: { x: 7, y: 4 }, 26: { x: 8, y: 4 }, 27: { x: 9, y: 4 }, 28: { x: 10, y: 4 }, 29: { x: 11, y: 4 }, 30: { x: 12, y: 4 }, 31: { x: 13, y: 4 }, 32: { x: 14, y: 4 }, 33: { x: 15, y: 4 }, 34: { x: 16, y: 4 }, 35: { x: 17, y: 4 }, 36: { x: 18, y: 4 },
    
    // Period 5
    37: { x: 1, y: 5 }, 38: { x: 2, y: 5 }, 39: { x: 3, y: 5 }, 40: { x: 4, y: 5 }, 41: { x: 5, y: 5 }, 42: { x: 6, y: 5 }, 43: { x: 7, y: 5 }, 44: { x: 8, y: 5 }, 45: { x: 9, y: 5 }, 46: { x: 10, y: 5 }, 47: { x: 11, y: 5 }, 48: { x: 12, y: 5 }, 49: { x: 13, y: 5 }, 50: { x: 14, y: 5 }, 51: { x: 15, y: 5 }, 52: { x: 16, y: 5 }, 53: { x: 17, y: 5 }, 54: { x: 18, y: 5 },
    
    // Period 6 (main table, excluding lanthanides)
    55: { x: 1, y: 6 }, 56: { x: 2, y: 6 }, 72: { x: 4, y: 6 }, 73: { x: 5, y: 6 }, 74: { x: 6, y: 6 }, 75: { x: 7, y: 6 }, 76: { x: 8, y: 6 }, 77: { x: 9, y: 6 }, 78: { x: 10, y: 6 }, 79: { x: 11, y: 6 }, 80: { x: 12, y: 6 }, 81: { x: 13, y: 6 }, 82: { x: 14, y: 6 }, 83: { x: 15, y: 6 }, 84: { x: 16, y: 6 }, 85: { x: 17, y: 6 }, 86: { x: 18, y: 6 },
    
    // Period 7 (main table, excluding actinides)
    87: { x: 1, y: 7 }, 88: { x: 2, y: 7 }, 104: { x: 4, y: 7 }, 105: { x: 5, y: 7 }, 106: { x: 6, y: 7 }, 107: { x: 7, y: 7 }, 108: { x: 8, y: 7 }, 109: { x: 9, y: 7 }, 110: { x: 10, y: 7 }, 111: { x: 11, y: 7 }, 112: { x: 12, y: 7 }, 113: { x: 13, y: 7 }, 114: { x: 14, y: 7 }, 115: { x: 15, y: 7 }, 116: { x: 16, y: 7 }, 117: { x: 17, y: 7 }, 118: { x: 18, y: 7 },
    
    // Lanthanides (separate positioning for special layout)
    57: { x: 1, y: 8 }, 58: { x: 2, y: 8 }, 59: { x: 3, y: 8 }, 60: { x: 4, y: 8 }, 61: { x: 5, y: 8 }, 62: { x: 6, y: 8 }, 63: { x: 7, y: 8 }, 64: { x: 8, y: 8 }, 65: { x: 9, y: 8 }, 66: { x: 10, y: 8 }, 67: { x: 11, y: 8 }, 68: { x: 12, y: 8 }, 69: { x: 13, y: 8 }, 70: { x: 14, y: 8 }, 71: { x: 15, y: 8 },
    
    // Actinides (separate positioning for special layout)
    89: { x: 1, y: 9 }, 90: { x: 2, y: 9 }, 91: { x: 3, y: 9 }, 92: { x: 4, y: 9 }, 93: { x: 5, y: 9 }, 94: { x: 6, y: 9 }, 95: { x: 7, y: 9 }, 96: { x: 8, y: 9 }, 97: { x: 9, y: 9 }, 98: { x: 10, y: 9 }, 99: { x: 11, y: 9 }, 100: { x: 12, y: 9 }, 101: { x: 13, y: 9 }, 102: { x: 14, y: 9 }, 103: { x: 15, y: 9 }
  };

  // Extended oxidation states data
  const oxidationStatesMap: Record<number, { common: number[], all: number[] }> = {
    1: { common: [1], all: [-1, 1] },
    2: { common: [0], all: [0] },
    3: { common: [1], all: [1] },
    4: { common: [2], all: [1, 2] },
    5: { common: [3], all: [-1, 1, 2, 3] },
    6: { common: [2, 4], all: [-4, -3, -2, -1, 1, 2, 3, 4] },
    7: { common: [-3, 3, 5], all: [-3, -2, -1, 1, 2, 3, 4, 5] },
    8: { common: [-2], all: [-2, -1, 1, 2] },
    9: { common: [-1], all: [-1] },
    10: { common: [0], all: [0] },
    11: { common: [1], all: [-1, 1] },
    12: { common: [2], all: [1, 2] },
    13: { common: [3], all: [1, 2, 3] },
    14: { common: [4], all: [-4, -3, -2, -1, 1, 2, 3, 4] },
    15: { common: [-3, 3, 5], all: [-3, -2, -1, 1, 2, 3, 4, 5] },
    16: { common: [-2, 4, 6], all: [-2, -1, 1, 2, 3, 4, 5, 6] },
    17: { common: [-1, 1, 3, 5, 7], all: [-1, 1, 2, 3, 4, 5, 6, 7] },
    18: { common: [0], all: [0] },
    19: { common: [1], all: [-1, 1] },
    20: { common: [2], all: [1, 2] },
    26: { common: [2, 3], all: [-2, -1, 1, 2, 3, 4, 5, 6] }
  };

  // Create element data for all elements
  const processedElements = COMPLETE_ELEMENTS_DATA.map(element => {
    const atomicNumber = element.number;
    const position = positionMap[atomicNumber] || { x: 0, y: 0 };
    const oxidationData = oxidationStatesMap[atomicNumber] || { common: [0], all: [0] };
    
    // Enhanced applications and hazards
    const applications = getApplications(atomicNumber, element.name);
    const hazards = getHazards(atomicNumber, element.name);

    return {
      name: element.name,
      symbol: element.symbol,
      atomicNumber: atomicNumber,
      atomicMass: element.atomic_mass,
      atomicMassUncertainty: 0.001,
      category: normalizeCategory(element.category),
      block: element.block as 's' | 'p' | 'd' | 'f',
      period: element.period,
      group: element.group,
      phase: element.phase as 'solid' | 'liquid' | 'gas' | 'unknown',
      density: getDensity(atomicNumber),
      meltingPoint: getMeltingPoint(atomicNumber),
      boilingPoint: getBoilingPoint(atomicNumber),
      crystallStructure: getCrystalStructure(atomicNumber),
      electronConfiguration: element.electron_configuration,
      electronConfigurationNoble: getNobleGasConfiguration(element.electron_configuration),
      oxidationStates: oxidationData.all,
      commonOxidationStates: oxidationData.common,
      electronegativity: element.electronegativity_pauling,
      ionizationEnergies: getIonizationEnergies(atomicNumber),
      atomicRadius: getAtomicRadius(atomicNumber),
      ionicRadius: null,
      discoveredBy: element.discovered_by,
      yearDiscovered: element.year,
      naturalAbundance: getNaturalAbundance(atomicNumber),
      isotopes: getIsotopes(atomicNumber, element.atomic_mass),
      hazards,
      applications,
      source: 'IUPAC 2016',
      summary: getSummary(element.name, element.symbol, atomicNumber, element.category),
      xpos: position.x,
      ypos: position.y
    } as ElementData;
  });

  return processedElements.sort((a, b) => a.atomicNumber - b.atomicNumber);
}

// Helper functions
function normalizeCategory(category: string): string {
  const categoryMap: Record<string, string> = {
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
  
  return categoryMap[category.toLowerCase()] || category;
}

function getNobleGasConfiguration(fullConfig: string): string {
  // Simplified noble gas notation conversion
  if (fullConfig.includes('[')) return fullConfig;
  return fullConfig; // Return full for now
}

function getAtomicRadius(atomicNumber: number): number | null {
  const radii: Record<number, number> = {
    1: 53, 2: 31, 3: 167, 4: 112, 5: 87, 6: 67, 7: 56, 8: 48, 9: 42, 10: 38,
    11: 190, 12: 145, 13: 118, 14: 111, 15: 98, 16: 88, 17: 79, 18: 71,
    19: 243, 20: 194, 21: 184, 22: 176, 23: 171, 24: 166, 25: 161, 26: 156, 
    27: 152, 28: 149, 29: 145, 30: 142, 31: 136, 32: 125, 33: 114, 34: 103, 
    35: 94, 36: 88, 37: 265, 38: 219, 39: 212, 40: 206, 41: 198, 42: 190,
    43: 183, 44: 178, 45: 173, 46: 169, 47: 165, 48: 161, 49: 156, 50: 145,
    51: 133, 52: 123, 53: 115, 54: 108, 55: 298, 56: 253, 57: 195, 58: 185,
    72: 208, 73: 200, 74: 193, 75: 188, 76: 185, 77: 180, 78: 177, 79: 174,
    80: 171, 81: 156, 82: 154, 83: 143, 84: 135, 85: 127, 86: 120
  };
  
  return radii[atomicNumber] || null;
}

function getDensity(atomicNumber: number): number | null {
  const densities: Record<number, number> = {
    1: 0.00008988, 2: 0.0001785, 3: 0.534, 4: 1.85, 5: 2.34, 6: 2.267, 7: 0.0012506, 8: 0.001429, 9: 0.001696, 10: 0.0008999,
    11: 0.968, 12: 1.738, 13: 2.70, 14: 2.3296, 15: 1.823, 16: 2.07, 17: 0.003214, 18: 0.0017837,
    19: 0.89, 20: 1.54, 21: 2.985, 22: 4.506, 23: 6.11, 24: 7.15, 25: 7.21, 26: 7.874, 27: 8.86, 28: 8.912, 29: 8.933, 30: 7.134,
    31: 5.91, 32: 5.323, 33: 5.776, 34: 4.809, 35: 3.1028, 36: 0.003733,
    37: 1.532, 38: 2.64, 39: 4.472, 40: 6.52, 41: 8.57, 42: 10.28, 43: 11, 44: 12.37, 45: 12.41, 46: 12.023, 47: 10.501, 48: 8.69,
    49: 7.31, 50: 7.287, 51: 6.685, 52: 6.232, 53: 4.933, 54: 0.005887,
    55: 1.93, 56: 3.62, 57: 6.15, 72: 13.31, 73: 16.4, 74: 19.25, 75: 20.8, 76: 22.61, 77: 22.56, 78: 21.46, 79: 19.282, 80: 13.5336,
    81: 11.85, 82: 11.342, 83: 9.807, 84: 9.32, 85: 7, 86: 0.00973
  };
  
  return densities[atomicNumber] || null;
}

function getMeltingPoint(atomicNumber: number): number | null {
  const meltingPoints: Record<number, number> = {
    1: 14.01, 2: 0.95, 3: 453.85, 4: 1560, 5: 2349, 6: 3915, 7: 63.15, 8: 54.36, 9: 53.53, 10: 24.56,
    11: 371.0, 12: 923, 13: 933.47, 14: 1687, 15: 317.3, 16: 388.36, 17: 171.6, 18: 83.8,
    19: 336.7, 20: 1115, 21: 1814, 22: 1941, 23: 2183, 24: 2180, 25: 1519, 26: 1811, 27: 1768, 28: 1728, 29: 1357.77, 30: 692.88,
    31: 302.91, 32: 1211.4, 33: 1090, 34: 494, 35: 265.8, 36: 115.79,
    37: 312.46, 38: 1050, 39: 1799, 40: 2128, 41: 2750, 42: 2896, 43: 2430, 44: 2607, 45: 2237, 46: 1828.05, 47: 1234.93, 48: 594.22,
    49: 429.75, 50: 505.08, 51: 903.78, 52: 722.66, 53: 386.85, 54: 161.4,
    55: 301.7, 56: 1000, 57: 1193, 72: 2506, 73: 3290, 74: 3695, 75: 3459, 76: 3306, 77: 2719, 78: 2041.4, 79: 1337.33, 80: 234.43,
    81: 577, 82: 600.61, 83: 544.7, 84: 527, 85: 575, 86: 202
  };
  
  return meltingPoints[atomicNumber] || null;
}

function getBoilingPoint(atomicNumber: number): number | null {
  const boilingPoints: Record<number, number> = {
    1: 20.28, 2: 4.22, 3: 1615, 4: 2742, 5: 4200, 6: 4098, 7: 77.36, 8: 90.20, 9: 85.03, 10: 27.07,
    11: 1156, 12: 1363, 13: 2792, 14: 3538, 15: 550, 16: 717.87, 17: 239.11, 18: 87.3,
    19: 1032, 20: 1757, 21: 3109, 22: 3560, 23: 3680, 24: 2944, 25: 2334, 26: 3134, 27: 3200, 28: 3186, 29: 2835, 30: 1180,
    31: 2673, 32: 3106, 33: 887, 34: 958, 35: 332, 36: 119.93,
    37: 961, 38: 1655, 39: 3609, 40: 4682, 41: 5017, 42: 4912, 43: 4538, 44: 4423, 45: 3968, 46: 3236, 47: 2435, 48: 1040,
    49: 2345, 50: 2875, 51: 1860, 52: 1261, 53: 457.4, 54: 165.03,
    55: 944, 56: 2170, 57: 3737, 72: 4876, 73: 5731, 74: 5828, 75: 5869, 76: 5285, 77: 4701, 78: 4098, 79: 3129, 80: 629.88,
    81: 1746, 82: 2022, 83: 1837, 84: 1235, 85: 610, 86: 211.3
  };
  
  return boilingPoints[atomicNumber] || null;
}

function getCrystalStructure(atomicNumber: number): string | null {
  const structures: Record<number, string> = {
    1: 'hexagonal', 2: 'face-centered cubic', 3: 'body-centered cubic',
    4: 'hexagonal', 5: 'rhombohedral', 6: 'hexagonal', 7: 'hexagonal',
    8: 'cubic', 9: 'cubic', 10: 'face-centered cubic', 11: 'body-centered cubic',
    12: 'hexagonal', 13: 'face-centered cubic', 14: 'diamond cubic',
    15: 'cubic', 16: 'orthorhombic', 17: 'orthorhombic', 18: 'face-centered cubic',
    19: 'body-centered cubic', 20: 'face-centered cubic', 21: 'hexagonal',
    22: 'hexagonal', 23: 'body-centered cubic', 24: 'body-centered cubic',
    25: 'cubic', 26: 'body-centered cubic', 27: 'hexagonal', 28: 'face-centered cubic',
    29: 'face-centered cubic', 30: 'hexagonal', 31: 'orthorhombic', 32: 'diamond cubic',
    33: 'rhombohedral', 34: 'hexagonal', 35: 'orthorhombic', 36: 'face-centered cubic',
    47: 'face-centered cubic', 79: 'face-centered cubic'
  };
  
  return structures[atomicNumber] || null;
}

function getIonizationEnergies(atomicNumber: number): number[] {
  // Simplified ionization energies (first ionization energy in eV)
  const ionizationEnergies: Record<number, number[]> = {
    1: [13.598], 2: [24.587], 3: [5.392], 4: [9.323], 5: [8.298], 6: [11.260], 7: [14.534], 8: [13.618], 9: [17.423], 10: [21.565],
    11: [5.139], 12: [7.646], 13: [5.986], 14: [8.152], 15: [10.487], 16: [10.360], 17: [12.968], 18: [15.760],
    19: [4.341], 20: [6.113], 21: [6.562], 22: [6.828], 23: [6.746], 24: [6.767], 25: [7.434], 26: [7.902], 27: [7.881], 28: [7.640], 29: [7.726], 30: [9.394],
    31: [5.999], 32: [7.900], 33: [9.815], 34: [9.752], 35: [11.814], 36: [14.000]
  };
  
  return ionizationEnergies[atomicNumber] || [0];
}

function getNaturalAbundance(atomicNumber: number): number | null {
  // Earth's crust abundance in ppm
  const abundances: Record<number, number> = {
    1: 1400, 2: 0.008, 3: 20, 4: 2.8, 5: 10, 6: 200, 7: 19, 8: 461000,
    9: 585, 10: 0.005, 11: 23600, 12: 23300, 13: 82300, 14: 282000,
    15: 1050, 16: 350, 17: 145, 18: 3.5, 19: 20900, 20: 41500,
    26: 56300, 29: 60, 30: 70, 47: 0.075, 79: 0.004
  };
  
  return abundances[atomicNumber] || null;
}

function getIsotopes(atomicNumber: number, atomicMass: number): Array<{
  massNumber: number;
  abundance?: number;
  halfLife?: string;
  isStable: boolean;
}> {
  // Simplified isotope data
  const commonIsotopes: Record<number, Array<{massNumber: number, abundance?: number, halfLife?: string, isStable: boolean}>> = {
    1: [
      { massNumber: 1, abundance: 99.9885, isStable: true },
      { massNumber: 2, abundance: 0.0115, isStable: true },
      { massNumber: 3, halfLife: '12.3 years', isStable: false }
    ],
    6: [
      { massNumber: 12, abundance: 98.93, isStable: true },
      { massNumber: 13, abundance: 1.07, isStable: true },
      { massNumber: 14, halfLife: '5730 years', isStable: false }
    ],
    8: [
      { massNumber: 16, abundance: 99.757, isStable: true },
      { massNumber: 17, abundance: 0.038, isStable: true },
      { massNumber: 18, abundance: 0.205, isStable: true }
    ]
  };
  
  return commonIsotopes[atomicNumber] || [
    { massNumber: Math.round(atomicMass), abundance: 100, isStable: atomicNumber <= 83 }
  ];
}

function getApplications(atomicNumber: number, name: string): string[] {
  const applications: Record<number, string[]> = {
    1: ['Fuel for fuel cells', 'Rocket fuel', 'Welding gas', 'Hydrogenation processes'],
    2: ['Balloons and airships', 'Breathing gas for deep diving', 'Cooling systems', 'Leak detection'],
    3: ['Lithium-ion batteries', 'Psychiatric medication', 'Ceramics and glass', 'Lubricating greases'],
    4: ['Aerospace alloys', 'Nuclear reactors', 'X-ray windows', 'Gyroscopes'],
    5: ['Glass and ceramics', 'Neutron absorber', 'Semiconductors', 'Rocket fuel additive'],
    6: ['Steel production', 'Pencils (graphite)', 'Diamond tools', 'Carbon dating'],
    7: ['Fertilizers', 'Explosives', 'Liquid nitrogen cooling', 'Food packaging'],
    8: ['Respiration', 'Steel production', 'Water treatment', 'Rocket propellant'],
    9: ['Toothpaste', 'Teflon production', 'Uranium enrichment', 'Refrigerants'],
    10: ['Lighting', 'Lasers', 'Cryogenic applications', 'Sign lighting'],
    11: ['Street lighting', 'Table salt', 'Soap production', 'Heat transfer'],
    12: ['Alloys', 'Fireworks', 'Medicine (antacids)', 'Photography'],
    13: ['Packaging', 'Construction', 'Transportation', 'Electrical conductors'],
    14: ['Computer chips', 'Solar cells', 'Glass production', 'Steel alloys'],
    15: ['Fertilizers', 'Detergents', 'Explosives', 'Pesticides'],
    16: ['Rubber vulcanization', 'Fertilizers', 'Gunpowder', 'Pharmaceuticals'],
    17: ['Water purification', 'Bleaching', 'PVC production', 'Disinfectants'],
    18: ['Light bulbs', 'Welding protection', 'Medical imaging', 'Preservation'],
    26: ['Steel production', 'Construction', 'Automotive industry', 'Magnetic materials'],
    29: ['Electrical wiring', 'Plumbing', 'Coins', 'Heat exchangers'],
    47: ['Jewelry', 'Electronics', 'Photography', 'Antimicrobial coatings'],
    79: ['Jewelry', 'Electronics', 'Dentistry', 'Investment commodity'],
    80: ['Thermometers', 'Dental fillings', 'Fluorescent lamps', 'Switches'],
    82: ['Batteries', 'Ammunition', 'Radiation shielding', 'Weights'],
    92: ['Nuclear fuel', 'Weapons', 'Medical isotopes', 'Dating techniques']
  };
  
  return applications[atomicNumber] || [`${name} has various industrial and research applications.`];
}

function getHazards(atomicNumber: number, name: string): string[] {
  const hazards: Record<number, string[]> = {
    1: ['Highly flammable', 'Explosive when mixed with air', 'Asphyxiant in confined spaces'],
    2: ['Asphyxiant', 'High pressure gas hazard'],
    3: ['Caustic', 'Reactive with water', 'Toxic'],
    4: ['Toxic', 'Carcinogenic', 'Lung disease'],
    5: ['Toxic', 'Skin irritant'],
    9: ['Highly toxic', 'Corrosive', 'Can cause severe burns'],
    17: ['Toxic gas', 'Corrosive', 'Respiratory irritant'],
    33: ['Highly toxic', 'Carcinogenic'],
    80: ['Highly toxic', 'Bioaccumulative', 'Nervous system damage'],
    82: ['Toxic heavy metal', 'Neurological damage', 'Bioaccumulative'],
    84: ['Highly radioactive', 'Extremely toxic', 'Carcinogenic'],
    86: ['Radioactive', 'Carcinogenic', 'Radon gas accumulation risk'],
    92: ['Radioactive', 'Toxic', 'Fissile material']
  };
  
  // Add general radioactivity warning for unstable elements
  const baseHazards = hazards[atomicNumber] || [];
  if (atomicNumber > 83) { // Elements beyond bismuth are generally radioactive
    if (baseHazards.length === 0) {
      baseHazards.push('Radioactive', 'Potential health hazard');
    }
  }
  
  return baseHazards;
}

function getSummary(name: string, symbol: string, atomicNumber: number, category: string): string {
  const summaries: Record<number, string> = {
    1: 'Hydrogen is the lightest and most abundant element in the universe, essential for stellar fusion and water formation.',
    2: 'Helium is the second lightest element, inert and used in balloons, diving, and cryogenic applications.',
    3: 'Lithium is the lightest metal, crucial for rechargeable batteries and mood-stabilizing medications.',
    6: 'Carbon forms the backbone of all organic molecules and exists in multiple allotropes including diamond and graphite.',
    7: 'Nitrogen makes up 78% of Earth\'s atmosphere and is essential for proteins and nucleic acids.',
    8: 'Oxygen is essential for respiration and combustion, making up 21% of Earth\'s atmosphere.',
    26: 'Iron is the most abundant element on Earth by mass and crucial for steel production and biological oxygen transport.',
    29: 'Copper has been used by humans for over 10,000 years and is essential for electrical applications.',
    47: 'Silver has the highest electrical and thermal conductivity of all elements and natural antimicrobial properties.',
    79: 'Gold is chemically inert, highly conductive, and has been valued as currency and jewelry for millennia.',
    92: 'Uranium is the heaviest naturally occurring element and the primary fuel for nuclear power generation.'
  };
  
  return summaries[atomicNumber] || 
    `${name} is a ${category} with atomic number ${atomicNumber}. It has important applications in science and industry.`;
}

// Load and convert elements data
export const IUPAC_ELEMENTS: ElementData[] = convertToIUPACFormat(COMPLETE_ELEMENTS_DATA);

// Utility functions
export function getElementByAtomicNumber(atomicNumber: number): ElementData | undefined {
  return IUPAC_ELEMENTS.find(el => el.atomicNumber === atomicNumber);
}

export function getElementBySymbol(symbol: string): ElementData | undefined {
  return IUPAC_ELEMENTS.find(el => el.symbol === symbol);
}

export function getElementsByPeriod(period: number): ElementData[] {
  return IUPAC_ELEMENTS.filter(el => el.period === period);
}

export function getElementsByGroup(group: number): ElementData[] {
  return IUPAC_ELEMENTS.filter(el => el.group === group);
}

export function getLanthanides(): ElementData[] {
  return IUPAC_ELEMENTS.filter(el => el.atomicNumber >= 57 && el.atomicNumber <= 71);
}

export function getActinides(): ElementData[] {
  return IUPAC_ELEMENTS.filter(el => el.atomicNumber >= 89 && el.atomicNumber <= 103);
}

export const ELEMENT_CATEGORIES = {
  "alkali metal": "#FF6B6B",
  "alkaline earth metal": "#4ECDC4", 
  "transition metal": "#45B7D1",
  "post-transition metal": "#96CEB4",
  "metalloid": "#FFEAA7",
  "nonmetal": "#DDA0DD",
  "halogen": "#98D8C8",
  "noble gas": "#F7DC6F",
  "lanthanide": "#BB8FCE",
  "actinide": "#F1948A",
  "unknown": "#BDC3C7"
};

export const BLOCK_COLORS = {
  "s": "#FF6B6B",
  "p": "#4ECDC4", 
  "d": "#45B7D1",
  "f": "#FFEAA7"
};

export const STATE_COLORS = {
  "solid": "#2C3E50",
  "liquid": "#3498DB",
  "gas": "#E74C3C", 
  "unknown": "#95A5A6"
};