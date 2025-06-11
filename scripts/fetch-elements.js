const axios = require('axios');
const fs = require('fs');
const path = require('path');

// GitHub repository URL
const REPO_URL = 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json';

// Target directory and file
const DATA_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(DATA_DIR, 'elements.json');

async function fetchElements() {
  try {
    console.log('Fetching periodic table data from GitHub...');
    const response = await axios.get(REPO_URL);
    const data = response.data;
    
    // Process the data to match our schema if needed
    const processedData = {
      elements: data.elements.map(element => {
        // Make sure the element data matches our ElementData interface
        return {
          name: element.name,
          symbol: element.symbol,
          atomicNumber: element.number,
          atomicMass: element.atomic_mass || 0,
          category: element.category || 'unknown',
          phase: element.phase || 'unknown',
          density: element.density || 0,
          boil: element.boil || 0,
          melt: element.melt || 0,
          discoveredBy: element.discovered_by || 'Unknown',
          yearDiscovered: element.year || 'Unknown',
          source: element.source || '',
          summary: element.summary || '',
          electronConfiguration: element.electron_configuration || '',
          electronAffinity: element.electron_affinity || 0,
          electronegativityPauling: element.electronegativity_pauling || null,
          ionizationEnergies: element.ionization_energies || []
        };
      })
    };
    
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(processedData, null, 2));
    console.log(`Periodic table data saved to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Error fetching or processing periodic table data:', error.message);
    process.exit(1);
  }
}

fetchElements();