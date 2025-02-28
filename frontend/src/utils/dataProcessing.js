// Data processing utilities

/**
 * Cleans Excel-style formulas from string values
 * @param {string} value - The value to clean
 * @returns {string} - Cleaned value
 */
export const cleanExcelFormula = (value) => {
  if (typeof value !== 'string') return value;
  // Remove Excel formula wrapper and quotes
  return value.replace(/^=T\("([^"]+)"\)$/, '$1');
};

/**
 * Processes FDA Substances data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processFDASubstances = (row) => {
  const cleanedRow = {};
  for (const [key, value] of Object.entries(row)) {
    cleanedRow[key] = cleanExcelFormula(value);
    // Convert technical_effects from string to array if it exists
    if (key === 'technical_effects' && value) {
      cleanedRow[key] = value.replace(/[\[\]']/g, '').split(',').map(item => item.trim());
    }
  }
  return cleanedRow;
};

/**
 * Processes FSIS Recalls data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processFSISRecalls = (row) => {
  // List of all US state abbreviations
  const allStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    'DC'
  ];

  // Process states field
  let states = [];
  if (row.states) {
    // Clean up the states field
    const statesValue = row.states.toString().trim().toLowerCase();
    
    // Check for nationwide recalls
    if (statesValue.includes('nationwide') || 
        statesValue.includes('national') || 
        statesValue.includes('all states')) {
      // If nationwide recall, include all states
      states = [...allStates];
    } else {
      // Try to extract state abbreviations
      const statePattern = new RegExp(allStates.join('|'), 'gi');
      const matches = statesValue.toUpperCase().match(statePattern) || [];
      states = [...new Set(matches)]; // Remove duplicates
    }
  }

  // Clean up other fields
  return {
    ...row,
    states,
    quantity_lbs: parseFloat(row.quantity_lbs) || 0,
    year: parseInt(row.year) || null,
    risk_level: row.risk_level || row.risk_level_raw
  };
};

/**
 * Processes GRAS Notices data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processGRASNotices = (row) => {
  const cleanedRow = {};
  for (const [key, value] of Object.entries(row)) {
    cleanedRow[key] = cleanExcelFormula(value);
  }
  // Convert numeric fields
  cleanedRow.filing_year = parseInt(cleanedRow.filing_year) || null;
  cleanedRow.grn_no = parseInt(cleanedRow.grn_no) || null;
  return cleanedRow;
};

/**
 * Processes WHO Obesity data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processWHOObesity = (row) => {
  return {
    ...row,
    // Convert numeric fields
    obesity_rate: parseFloat(row.obesity_rate) || 0,
    confidence_lower: parseFloat(row.confidence_lower) || 0,
    confidence_upper: parseFloat(row.confidence_upper) || 0,
    RATE_PER_100_N: parseFloat(row.RATE_PER_100_N) || 0,
    RATE_PER_100_NL: parseFloat(row.RATE_PER_100_NL) || 0,
    RATE_PER_100_NU: parseFloat(row.RATE_PER_100_NU) || 0,
    // Convert year string to Date object
    year: new Date(row.year)
  };
};

/**
 * Processes CDC Obesity data
 * @param {Object} row - Raw data row
 * @returns {Object} - Cleaned data row
 */
export const processCDCObesity = (row) => {
  return {
    ...row,
    // Convert numeric fields
    data_value: parseFloat(row.data_value) || 0,
    data_value_alt: parseFloat(row.data_value_alt) || 0,
    low_confidence_limit: parseFloat(row.low_confidence_limit) || 0,
    high_confidence_limit: parseFloat(row.high_confidence_limit) || 0,
    sample_size: parseInt(row.sample_size) || 0,
    total: parseInt(row.total) || 0,
    year: parseInt(row.year) || null,
    // Parse geolocation JSON if it exists
    geolocation: row.geolocation ? JSON.parse(row.geolocation) : null
  };
}; 