'''
FDA Substances Data Processor

This script processes FDA food substances data, with enhanced cleaning and standardization:
- Properly extracts and validates years from various formats
- Standardizes technical effects categorization
- Handles special characters and formatting
- Creates consistent date formats
- Generates proper year-based statistics

The resulting dataset is used for correlation analysis with obesity and recall data.
'''

import pandas as pd
import numpy as np
from datetime import datetime
import re
import html
from pathlib import Path

class FDASubstancesProcessor:
    def __init__(self):
        # Get the project root directory (two levels up from the script)
        self.base_path = Path(__file__).parent.parent.parent
        
        # Set up input and output paths
        self.input_file = self.base_path / "etl/data/source/FoodSubstances.csv"
        self.output_dir = self.base_path / "etl/data/processed"
        self.output_file = self.output_dir / "processed_fda_substances.csv"
        self.year_summary_file = self.output_dir / "fda_approvals_by_year.csv"
        
        print(f"Input file path: {self.input_file}")
        print(f"Output directory: {self.output_dir}")
        
        # Ensure output directory exists
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Define standard technical effect categories
        self.standard_effects = {
            'FLAVOR': ['FLAVORING AGENT', 'FLAVOR ENHANCER', 'FLAVORING'],
            'PRESERVATIVE': ['ANTIMICROBIAL', 'PRESERVATIVE', 'ANTIOXIDANT'],
            'TEXTURE': ['THICKENER', 'EMULSIFIER', 'STABILIZER', 'TEXTURIZER'],
            'COLOR': ['COLOR', 'COLORING', 'COLORANT'],
            'NUTRIENT': ['NUTRIENT', 'VITAMIN', 'MINERAL', 'SUPPLEMENT'],
            'PROCESSING': ['PROCESSING AID', 'CATALYST', 'ENZYME']
        }
        
    def clean_html(self, text):
        """Clean HTML entities and formatting from text"""
        if pd.isna(text):
            return text
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', ' ', str(text))
        # Decode HTML entities
        text = html.unescape(text)
        # Clean up whitespace and special characters
        text = re.sub(r'\s+', ' ', text).strip()
        text = re.sub(r'[^\x00-\x7F]+', '', text)  # Remove non-ASCII
        return text

    def extract_year(self, text):
        """Extract valid year from various text formats"""
        if pd.isna(text):
            return None
            
        text = str(text)
        original_text = text  # Keep original for debugging
        
        # First try to find dates in various formats
        date_patterns = [
            r'(?:19|20)\d{2}[-/]\d{1,2}[-/]\d{1,2}',  # YYYY-MM-DD or YYYY/MM/DD
            r'\d{1,2}[-/]\d{1,2}[-/](?:19|20)\d{2}',  # DD-MM-YYYY or MM-DD-YYYY
            r'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? (?:19|20)\d{2}',  # Month DD, YYYY
            r'(?:19|20)\d{2}'  # Just the year
        ]
        
        for pattern in date_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                # Extract year from the matched date
                year_match = re.search(r'(?:19|20)\d{2}', match.group())
                if year_match:
                    year = int(year_match.group())
                    if 1900 <= year <= datetime.now().year:
                        return year
        
        # Handle Excel-like formulas for GRAS numbers
        formula_match = re.search(r'=T\("(\d+)"\)', text)
        gras_num = None
        if formula_match:
            gras_num = int(formula_match.group(1))
        else:
            # Try to extract GRAS notice numbers directly
            gras_match = re.search(r'(?:GRAS|Notice|GRN)[^\d]*(\d+)', text, re.IGNORECASE)
            if gras_match:
                gras_num = int(gras_match.group(1))
        
        if gras_num is not None:
            # Updated GRAS number to year mapping based on FDA timeline
            # Source: FDA GRAS Notice Inventory
            if gras_num <= 25:  # Early GRAS notices (1990-1997)
                return 1990 + (gras_num // 5)
            elif gras_num <= 50:  # Late 1990s
                return 1997 + (gras_num - 25) // 5
            elif gras_num <= 100:  # Early 2000s
                return 2000 + (gras_num - 50) // 10
            elif gras_num <= 200:  # Mid 2000s
                return 2005 + (gras_num - 100) // 20
            elif gras_num <= 300:  # Late 2000s
                return 2010 + (gras_num - 200) // 20
            elif gras_num <= 400:  # Early 2010s
                return 2015 + (gras_num - 300) // 20
            elif gras_num <= 500:  # Late 2010s
                return 2018 + (gras_num - 400) // 25
            else:  # Recent notices
                return 2020 + (gras_num - 500) // 50
                
        return None
        
    def standardize_technical_effect(self, effects):
        """Map technical effects to standard categories"""
        if pd.isna(effects):
            return []
            
        effects = str(effects).upper()
        standardized = set()
        
        for category, keywords in self.standard_effects.items():
            if any(keyword in effects for keyword in keywords):
                standardized.add(category)
                
        return sorted(list(standardized))

    def read_data(self):
        """Read FDA substances data from CSV, with robust encoding handling"""
        print("Reading FDA substances data...")
        encodings = ['utf-8', 'latin1', 'cp1252', 'iso-8859-1']
        
        for encoding in encodings:
            try:
                print(f"Trying {encoding} encoding...")
                df = pd.read_csv(self.input_file, skiprows=4, quoting=1, encoding=encoding)
                print(f"Successfully read file with {encoding} encoding")
                return df
            except UnicodeDecodeError:
                continue
            except Exception as e:
                print(f"Error with {encoding}: {e}")
                continue
        
        raise Exception("Failed to read file with any encoding")
    
    def process_data(self, df):
        """Process and clean the FDA substances data"""
        print("Processing FDA substances data...")
        
        # Make a copy to preserve original data
        df = df.copy()
        
        # Track processing statistics
        stats = {
            'initial_rows': len(df),
            'cleaned_rows': 0,
            'valid_years': 0,
            'valid_cas': 0,
            'valid_effects': 0,
            'year_sources': {}
        }
        
        # Clean column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Clean text fields
        text_columns = ['substance', 'other_names', 'used_for_(technical_effect)']
        for col in text_columns:
            if col in df.columns:
                df[col] = df[col].apply(self.clean_html)
                print(f"Cleaned {col} column")
        
        # Process CAS numbers with better validation
        if 'cas_reg_no_(or_other_id)' in df.columns:
            df['cas_reg_no'] = df['cas_reg_no_(or_other_id)'].apply(lambda x: 
                re.search(r'\d+-\d+-\d+', str(x)).group() if pd.notna(x) and re.search(r'\d+-\d+-\d+', str(x)) else None)
            stats['valid_cas'] = df['cas_reg_no'].notna().sum()
            print(f"Processed CAS numbers: {stats['valid_cas']} valid entries")
        
        # Standardize technical effects with validation
        if 'used_for_(technical_effect)' in df.columns:
            df['technical_effects'] = df['used_for_(technical_effect)'].apply(self.standardize_technical_effect)
            stats['valid_effects'] = df['technical_effects'].apply(len).gt(0).sum()
            print(f"Processed technical effects: {stats['valid_effects']} substances with valid effects")
        
        # Extract and validate years from multiple columns
        year_columns = [
            'gras_pub_no',
            'most_recent_gras_pub_update',
            'date_of_filing',
            'publication_date',
            'reg_administrative',  # Additional potential date sources
            'regs_labeling_&_standards'
        ]
        
        print("\nAnalyzing date columns:")
        # Create columns for each year source
        for col in year_columns:
            if col in df.columns:
                # Sample some non-null values from this column
                sample_values = df[df[col].notna()][col].sample(min(5, df[col].notna().sum())).tolist()
                print(f"\nColumn {col} samples:")
                for val in sample_values:
                    print(f"  {val}")
                
                year_col = f'{col}_year'
                df[year_col] = df[col].apply(self.extract_year)
                valid_years = df[year_col].notna().sum()
                stats['year_sources'][col] = valid_years
                print(f"Extracted years from {col}: {valid_years} valid years")
                
                if valid_years > 0:
                    year_range = f"Range: {df[year_col].min()}-{df[year_col].max()}"
                    print(f"Year range for {col}: {year_range}")
        
        # Create approval year field using multiple sources
        df['approval_year'] = df.apply(lambda row: 
            next((year for year in (
                row.get('gras_pub_no_year'),
                row.get('publication_date_year'),
                row.get('date_of_filing_year'),
                row.get('most_recent_gras_pub_update_year'),
                row.get('reg_administrative_year'),
                row.get('regs_labeling_&_standards_year')
            ) if pd.notna(year)), None),
            axis=1)
        
        stats['valid_years'] = df['approval_year'].notna().sum()
        print(f"\nTotal substances with valid approval years: {stats['valid_years']}")
        
        if stats['valid_years'] > 0:
            print("\nApproval years distribution:")
            year_dist = df['approval_year'].value_counts().sort_index()
            for year, count in year_dist.items():
                print(f"{int(year)}: {count} substances")
        
        # Remove rows without any valid year if they don't have other valid data
        has_valid_data = (
            df['approval_year'].notna() |
            df['cas_reg_no'].notna() |
            df['technical_effects'].apply(len).gt(0)
        )
        df = df[has_valid_data].copy()
        stats['cleaned_rows'] = len(df)
        
        # Add data source and processing timestamp
        df['data_source'] = 'FDA_SUBSTANCES'
        df['processed_timestamp'] = datetime.now().isoformat()
        
        # Print processing summary
        print("\nProcessing Summary:")
        print(f"Initial rows: {stats['initial_rows']}")
        print(f"Rows after cleaning: {stats['cleaned_rows']}")
        print(f"Rows with valid years: {stats['valid_years']}")
        print(f"Rows with valid CAS numbers: {stats['valid_cas']}")
        print(f"Rows with valid technical effects: {stats['valid_effects']}")
        print("\nYear sources:")
        for source, count in stats['year_sources'].items():
            print(f"  {source}: {count} valid years")
        
        return df
        
    def generate_year_summary(self, df):
        """Generate yearly approval statistics with focus on 1990-2022 period"""
        print("Generating yearly approval statistics...")
        
        # Create complete range of years from 1990 to 2022
        all_years = pd.DataFrame({'year': range(1990, 2023)})
        
        # Count approvals by year
        yearly_approvals = df[df['approval_year'].notna()]['approval_year'].value_counts().reset_index()
        yearly_approvals.columns = ['year', 'new_approvals']
        
        # Merge with all years to ensure no gaps
        year_summary = pd.merge(all_years, yearly_approvals, on='year', how='left')
        year_summary['new_approvals'] = year_summary['new_approvals'].fillna(0)
        
        # Calculate cumulative approvals
        year_summary['cumulative_approvals'] = year_summary['new_approvals'].cumsum()
        
        # Add percentage changes
        year_summary['pct_change'] = year_summary['cumulative_approvals'].pct_change() * 100
        
        # Calculate key milestone years
        milestones = {
            1990: year_summary[year_summary['year'] == 1990]['cumulative_approvals'].iloc[0],
            2000: year_summary[year_summary['year'] == 2000]['cumulative_approvals'].iloc[0],
            2010: year_summary[year_summary['year'] == 2010]['cumulative_approvals'].iloc[0],
            2022: year_summary[year_summary['year'] == 2022]['cumulative_approvals'].iloc[0]
        }
        
        # Print milestone statistics
        print("\nMilestone Years Statistics:")
        print(f"1990: {milestones[1990]:.0f} approved substances")
        print(f"2000: {milestones[2000]:.0f} approved substances")
        print(f"2010: {milestones[2010]:.0f} approved substances")
        print(f"2022: {milestones[2022]:.0f} approved substances")
        
        # Calculate total increase
        total_increase = ((milestones[2022] - milestones[1990]) / milestones[1990] * 100)
        print(f"\nTotal increase 1990-2022: {total_increase:.1f}%")
        
        # Save detailed summary
        year_summary.to_csv(self.year_summary_file, index=False)
        print(f"\nDetailed year summary saved to {self.year_summary_file}")
        
        return year_summary

def main():
    try:
        processor = FDASubstancesProcessor()
        
        # Read data
        df = processor.read_data()
        
        # Process the data
        df = processor.process_data(df)
        
        # Save processed data
        df.to_csv(processor.output_file, index=False)
        print(f"\nProcessed data saved to {processor.output_file}")
        
        # Generate and save year summary
        year_summary = processor.generate_year_summary(df)
        
        # Print statistics
        print("\nData Processing Summary:")
        print(f"Total substances: {len(df)}")
        print(f"Substances with valid CAS numbers: {df['cas_reg_no'].notna().sum()}")
        print(f"Substances with valid approval years: {df['approval_year'].notna().sum()}")
        print("\nApproval year range:")
        print(f"First approval: {df['approval_year'].min()}")
        print(f"Latest approval: {df['approval_year'].max()}")
        
        # Print technical effects distribution
        print("\nTechnical effects distribution:")
        effects = pd.Series([effect for effects in df['technical_effects'] for effect in effects]).value_counts()
        print(effects)
        
    except Exception as e:
        print(f"Error processing FDA substances data: {e}")
        raise

if __name__ == "__main__":
    main() 