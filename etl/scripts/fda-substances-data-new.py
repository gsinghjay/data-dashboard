'''
FDA Substances Data Processor (Enhanced Version)

This script processes FDA food substances data with improved handling:
- Advanced year extraction from multiple sources
- Proper CAS number validation
- Enhanced technical effects categorization
- Improved data validation and cleaning
- Detailed processing statistics
'''

import pandas as pd
import numpy as np
from datetime import datetime
import re
from pathlib import Path
import logging
import html

class FDASubstancesProcessor:
    def __init__(self):
        # Set up paths using pathlib for cross-platform compatibility
        self.base_path = Path(__file__).parent.parent.parent
        self.input_file = self.base_path / "etl/data/source/FoodSubstances.csv"
        self.output_dir = self.base_path / "etl/data/processed"
        self.output_file = self.output_dir / "processed_fda_substances.csv"
        self.year_summary_file = self.output_dir / "fda_approvals_by_year.csv"
        
        # Ensure output directory exists
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Set up logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Define standard technical effect categories
        self.standard_effects = {
            'FLAVOR': ['FLAVORING AGENT', 'FLAVOR ENHANCER', 'FLAVORING'],
            'PRESERVATIVE': ['ANTIMICROBIAL', 'PRESERVATIVE', 'ANTIOXIDANT'],
            'TEXTURE': ['THICKENER', 'EMULSIFIER', 'STABILIZER', 'TEXTURIZER'],
            'COLOR': ['COLOR', 'COLORING', 'COLORANT'],
            'NUTRIENT': ['NUTRIENT', 'VITAMIN', 'MINERAL', 'SUPPLEMENT'],
            'PROCESSING': ['PROCESSING AID', 'CATALYST', 'ENZYME']
        }
        
        # Track processing statistics
        self.stats = {
            'total_records': 0,
            'valid_cas': 0,
            'valid_years': 0,
            'valid_effects': 0,
            'year_sources': {},
            'effect_categories': {}
        }
        
    def validate_cas_number(self, cas_str):
        """Validate CAS Registry Number format and checksum"""
        if pd.isna(cas_str):
            return None
            
        # Clean the input string
        cas_str = str(cas_str).strip().strip('"').strip()
        
        # Extract numbers in format: XXXXXXX-XX-X or plain numbers
        match = re.search(r'(\d+)[-]?(\d{2})[-]?(\d)', cas_str)
        if not match:
            return None
            
        # Get the parts and ensure proper format
        base, branch, check = match.groups()
        formatted = f"{base}-{branch}-{check}"
        
        # Calculate checksum
        digits = list(base + branch)
        total = sum(int(digit) * (len(digits) - i) for i, digit in enumerate(digits))
        checksum = total % 10
        
        # Validate checksum
        if checksum == int(check):
            return formatted
            
        return None

    def extract_year(self, text):
        """Extract valid year from text with improved validation"""
        if pd.isna(text):
            return None
            
        text = str(text).strip().strip('"').strip()
        
        # First check for CAS number pattern
        if re.match(r'^\d+-\d+-\d+$', text):
            return None
            
        # Look for years in various formats
        year_patterns = [
            r'(?:19|20)\d{2}[-/]\d{1,2}[-/]\d{1,2}',  # YYYY-MM-DD
            r'\d{1,2}[-/]\d{1,2}[-/](?:19|20)\d{2}',  # DD-MM-YYYY or MM-DD-YYYY
            r'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? (?:19|20)\d{2}',  # Month DD, YYYY
            r'(?:19|20)\d{2}(?!\d)',  # Just year (not part of larger number)
            r'GRN[^\d]*(\d+)',  # GRN number
            r'=T\("(\d+)"\)'  # Excel formula
        ]
        
        for pattern in year_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                # Handle GRN numbers differently
                if 'GRN' in pattern or '=T' in pattern:
                    grn_num = int(match.group(1))
                    # Map GRN numbers to approximate years based on known timeline
                    if grn_num <= 25:
                        return 1990 + (grn_num // 5)
                    elif grn_num <= 50:
                        return 1997 + (grn_num - 25) // 5
                    else:
                        return None
                
                # Extract year from date formats
                year_match = re.search(r'(?:19|20)\d{2}', match.group())
                if year_match:
                    year = int(year_match.group())
                    if 1990 <= year <= datetime.now().year:
                        return year
                        
        return None

    def standardize_technical_effect(self, effects):
        """Map technical effects to standard categories with improved matching"""
        if pd.isna(effects):
            return []
            
        # Clean and standardize the input
        effects = self.clean_text(str(effects))
        effects = effects.upper()
        standardized = set()
        
        # Clean up the effects string
        effects = re.sub(r'[^\w\s]', ' ', effects)
        effects = ' '.join(effects.split())
        
        for category, keywords in self.standard_effects.items():
            if any(keyword in effects for keyword in keywords):
                standardized.add(category)
                self.stats['effect_categories'][category] = self.stats['effect_categories'].get(category, 0) + 1
                
        return sorted(list(standardized))

    def clean_text(self, text):
        """Clean text fields with improved handling"""
        if pd.isna(text):
            return text
            
        # Remove quotes and extra spaces
        text = str(text).strip().strip('"').strip()
        
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', ' ', text)
        
        # Decode HTML entities
        text = html.unescape(text)
        
        # Replace HTML diamonds with bullet points
        text = text.replace('&diams;', '•')
        
        # Clean up whitespace and special characters
        text = re.sub(r'\s+', ' ', text).strip()
        text = re.sub(r'<br\s*/?>', ' ', text, flags=re.IGNORECASE)
        
        # Remove non-ASCII characters while preserving common symbols
        text = ''.join(char if ord(char) < 128 or char in '•–—' else ' ' for char in text)
        
        return text.strip()

    def read_data(self):
        """Read FDA substances data with robust encoding handling"""
        self.logger.info("Reading FDA substances data...")
        
        encodings = ['utf-8', 'latin1', 'cp1252', 'iso-8859-1']
        
        for encoding in encodings:
            try:
                self.logger.info(f"Trying {encoding} encoding...")
                df = pd.read_csv(self.input_file, skiprows=4, encoding=encoding, quoting=1)
                self.logger.info(f"Successfully read file with {encoding} encoding")
                return df
            except UnicodeDecodeError:
                continue
            except Exception as e:
                self.logger.error(f"Error with {encoding}: {e}")
                continue
        
        raise Exception("Failed to read file with any encoding")

    def process_data(self, df):
        """Process and clean the FDA substances data"""
        self.logger.info("Processing FDA substances data...")
        
        # Track initial statistics
        self.stats['total_records'] = len(df)
        
        # Clean column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Clean text fields
        text_columns = ['substance', 'other_names', 'used_for_(technical_effect)']
        for col in text_columns:
            if col in df.columns:
                df[col] = df[col].apply(self.clean_text)
                self.logger.info(f"Cleaned {col} column")
        
        # Process CAS numbers with validation
        if 'cas_reg_no_(or_other_id)' in df.columns:
            df['cas_reg_no'] = df['cas_reg_no_(or_other_id)'].apply(self.validate_cas_number)
            self.stats['valid_cas'] = df['cas_reg_no'].notna().sum()
            self.logger.info(f"Processed CAS numbers: {self.stats['valid_cas']} valid entries")
        
        # Standardize technical effects
        if 'used_for_(technical_effect)' in df.columns:
            df['technical_effects'] = df['used_for_(technical_effect)'].apply(self.standardize_technical_effect)
            self.stats['valid_effects'] = df['technical_effects'].apply(len).gt(0).sum()
            self.logger.info(f"Processed technical effects: {self.stats['valid_effects']} substances with valid effects")
        
        # Extract years from multiple sources
        year_columns = [
            'gras_pub_no',
            'most_recent_gras_pub_update',
            'reg_administrative',
            'regs_labeling_&_standards'
        ]
        
        # Create columns for each year source
        for col in year_columns:
            if col in df.columns:
                year_col = f'{col}_year'
                df[year_col] = df[col].apply(self.extract_year)
                valid_years = df[year_col].notna().sum()
                self.stats['year_sources'][col] = valid_years
                self.logger.info(f"Extracted years from {col}: {valid_years} valid years")
        
        # Create final approval year using priority order
        df['approval_year'] = df.apply(lambda row: 
            next((year for year in (
                row.get('gras_pub_no_year'),
                row.get('most_recent_gras_pub_update_year'),
                row.get('reg_administrative_year'),
                row.get('regs_labeling_&_standards_year')
            ) if pd.notna(year)), None),
            axis=1)
        
        self.stats['valid_years'] = df['approval_year'].notna().sum()
        
        # Create year summary
        year_summary = pd.DataFrame()
        if self.stats['valid_years'] > 0:
            yearly_counts = df['approval_year'].value_counts().sort_index()
            year_summary['year'] = yearly_counts.index
            year_summary['new_approvals'] = yearly_counts.values
            year_summary['cumulative_approvals'] = yearly_counts.cumsum()
            year_summary['pct_change'] = year_summary['cumulative_approvals'].pct_change() * 100
            
            # Save year summary
            year_summary.to_csv(self.year_summary_file, index=False)
            self.logger.info(f"Year summary saved to {self.year_summary_file}")
        
        # Add data source and processing timestamp
        df['data_source'] = 'FDA_SUBSTANCES'
        df['processed_timestamp'] = datetime.now().isoformat()
        
        return df

    def print_statistics(self, df):
        """Print detailed processing statistics"""
        self.logger.info("\nProcessing Statistics:")
        self.logger.info(f"Total records processed: {self.stats['total_records']}")
        self.logger.info(f"Valid CAS numbers: {self.stats['valid_cas']}")
        self.logger.info(f"Valid approval years: {self.stats['valid_years']}")
        self.logger.info(f"Valid technical effects: {self.stats['valid_effects']}")
        
        self.logger.info("\nYear Sources:")
        for source, count in self.stats['year_sources'].items():
            self.logger.info(f"  {source}: {count} valid years")
        
        self.logger.info("\nTechnical Effect Categories:")
        for category, count in self.stats['effect_categories'].items():
            self.logger.info(f"  {category}: {count} substances")
        
        if 'approval_year' in df.columns and df['approval_year'].notna().any():
            year_range = df['approval_year'].agg(['min', 'max']).to_dict()
            self.logger.info(f"\nApproval year range: {year_range['min']} - {year_range['max']}")

def main():
    processor = FDASubstancesProcessor()
    
    try:
        # Read data
        df = processor.read_data()
        
        # Process the data
        df = processor.process_data(df)
        
        # Save to CSV
        df.to_csv(processor.output_file, index=False)
        processor.logger.info(f"\nData saved to {processor.output_file}")
        
        # Print statistics
        processor.print_statistics(df)
        
    except Exception as e:
        processor.logger.error(f"Error processing data: {e}")
        raise

if __name__ == "__main__":
    main() 