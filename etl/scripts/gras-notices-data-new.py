'''
GRAS Notices Data Processor (Enhanced Version)

This script processes FDA GRAS notices data with improved date handling and validation:
- Robust date parsing for multiple formats
- Standardized date output formats
- Enhanced data validation and cleaning
- Detailed processing statistics
- Improved error handling and logging
'''

import pandas as pd
import numpy as np
from datetime import datetime
import re
from pathlib import Path
import logging
import html

class GRASNoticesProcessor:
    def __init__(self):
        # Set up paths using pathlib for cross-platform compatibility
        self.base_path = Path(__file__).parent.parent.parent
        self.input_file = self.base_path / "etl/data/source/GRASNotices.csv"
        self.output_dir = self.base_path / "etl/data/processed"
        self.output_file = self.output_dir / "processed_gras_notices.csv"
        
        # Ensure output directory exists
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Set up logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Define date format patterns
        self.date_patterns = [
            ('%m/%d/%Y', r'^\d{1,2}/\d{1,2}/\d{4}$'),
            ('%Y-%m-%d', r'^\d{4}-\d{2}-\d{2}$'),
            ('%B %d, %Y', r'^[A-Za-z]+ \d{1,2},? \d{4}$'),
            ('%Y', r'^\d{4}$')
        ]
        
        # Track processing statistics
        self.stats = {
            'total_records': 0,
            'valid_dates': {},
            'invalid_dates': {},
            'grn_numbers': 0,
            'fda_responses': {}
        }

    def parse_date(self, date_str):
        """Parse dates in various formats with validation"""
        if pd.isna(date_str):
            return None
            
        # Clean the input string
        date_str = str(date_str).strip().strip('"').strip()
        
        # Try each date pattern
        for date_format, pattern in self.date_patterns:
            if re.match(pattern, date_str):
                try:
                    parsed_date = datetime.strptime(date_str, date_format)
                    # Validate year is reasonable (between 1990 and current year)
                    if 1990 <= parsed_date.year <= datetime.now().year:
                        return parsed_date
                except ValueError:
                    continue
        
        # Try to extract date from more complex strings
        date_patterns = [
            r'(\d{1,2})[/-](\d{1,2})[/-](\d{4})',  # MM/DD/YYYY or DD/MM/YYYY
            r'(\d{4})[/-](\d{1,2})[/-](\d{1,2})',  # YYYY/MM/DD
            r'([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})'  # Month DD, YYYY
        ]
        
        for pattern in date_patterns:
            match = re.search(pattern, date_str)
            if match:
                try:
                    if pattern.startswith(r'(\d{4})'):
                        year, month, day = match.groups()
                    elif pattern.startswith(r'([A-Za-z]+)'):
                        month, day, year = match.groups()
                        # Convert month name to number
                        month = datetime.strptime(month, '%B').month
                    else:
                        month, day, year = match.groups()
                    
                    parsed_date = datetime(int(year), int(month), int(day))
                    if 1990 <= parsed_date.year <= datetime.now().year:
                        return parsed_date
                except (ValueError, TypeError):
                    continue
        
        # Log invalid date format
        self.logger.warning(f"Could not parse date: {date_str}")
        return None

    def clean_grn_number(self, grn_str):
        """Extract and validate GRN number"""
        if pd.isna(grn_str):
            return None
            
        # Clean the input string
        grn_str = str(grn_str).strip().strip('"').strip()
        
        # Handle Excel formula format
        excel_match = re.search(r'=T\("(\d+)"\)', grn_str)
        if excel_match:
            return int(excel_match.group(1))
        
        # Handle other formats (GRN X, plain number, etc.)
        num_match = re.search(r'(?:GRN\s*)?(\d+)', grn_str)
        if num_match:
            grn_num = int(num_match.group(1))
            # Validate GRN number is in reasonable range
            if 1 <= grn_num <= 1500:  # Adjust range as needed
                return grn_num
                
        self.logger.warning(f"Invalid GRN number: {grn_str}")
        return None

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
        
        # Clean up whitespace and special characters
        text = re.sub(r'\s+', ' ', text).strip()
        text = re.sub(r'<br\s*/?>', ' ', text, flags=re.IGNORECASE)
        
        # Remove non-ASCII characters while preserving common symbols
        text = ''.join(char if ord(char) < 128 or char in '•–—' else ' ' for char in text)
        
        return text.strip()

    def standardize_fda_response(self, response):
        """Standardize FDA response categories"""
        if pd.isna(response):
            return 'unknown'
            
        response = self.clean_text(str(response)).lower()
        
        # Define standard response categories
        categories = {
            'no questions': ['no questions', 'no further questions', 'fda has no questions'],
            'insufficient basis': ['insufficient basis', 'insufficient information'],
            'cease to evaluate': ['cease', 'ceased to evaluate', 'stopped evaluation', 'fda ceased to evaluate'],
            'withdrawn': ['withdraw', 'withdrawn', 'at the notifier\'s request'],
            'pending': ['pending', 'under evaluation', 'in progress']
        }
        
        for category, keywords in categories.items():
            if any(keyword in response for keyword in keywords):
                return category
                
        return 'other'

    def read_data(self):
        """Read GRAS notices data with robust encoding handling"""
        self.logger.info("Reading GRAS notices data...")
        
        encodings = ['utf-8', 'latin1', 'cp1252', 'iso-8859-1']
        
        for encoding in encodings:
            try:
                self.logger.info(f"Trying {encoding} encoding...")
                df = pd.read_csv(self.input_file, skiprows=2, encoding=encoding, quoting=1)
                self.logger.info(f"Successfully read file with {encoding} encoding")
                return df
            except UnicodeDecodeError:
                continue
            except Exception as e:
                self.logger.error(f"Error with {encoding}: {e}")
                continue
        
        raise Exception("Failed to read file with any encoding")

    def process_data(self, df):
        """Process and clean the GRAS notices data"""
        self.logger.info("Processing GRAS notices data...")
        
        # Track initial statistics
        self.stats['total_records'] = len(df)
        
        # Clean column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Clean text fields
        text_columns = ['substance', 'intended_use', 'basis', 'notifier', 'notifier_address']
        for col in text_columns:
            if col in df.columns:
                df[col] = df[col].apply(self.clean_text)
                self.logger.info(f"Cleaned {col} column")
        
        # Process dates with improved handling
        date_columns = ['date_of_filing', 'date_of_closure']
        for col in date_columns:
            if col in df.columns:
                df[col] = df[col].apply(self.parse_date)
                valid_dates = df[col].notna().sum()
                self.stats['valid_dates'][col] = valid_dates
                self.stats['invalid_dates'][col] = len(df) - valid_dates
                
        # Extract year from filing date
        df['filing_year'] = df['date_of_filing'].dt.year
        
        # Clean GRN numbers
        df['grn_no'] = df['gras_notice_(grn)_no.'].apply(self.clean_grn_number)
        self.stats['grn_numbers'] = df['grn_no'].notna().sum()
        
        # Standardize FDA responses
        df['fda_response'] = df["fda's_letter"].apply(self.standardize_fda_response)
        self.stats['fda_responses'] = df['fda_response'].value_counts().to_dict()
        
        # Add data source and processing timestamp
        df['data_source'] = 'GRAS_NOTICES'
        df['processed_timestamp'] = datetime.now().isoformat()
        
        return df

    def print_statistics(self, df):
        """Print detailed processing statistics"""
        self.logger.info("\nProcessing Statistics:")
        self.logger.info(f"Total records processed: {self.stats['total_records']}")
        
        self.logger.info("\nDate Processing Results:")
        for col, valid_count in self.stats['valid_dates'].items():
            invalid_count = self.stats['invalid_dates'][col]
            self.logger.info(f"{col}:")
            self.logger.info(f"  Valid dates: {valid_count}")
            self.logger.info(f"  Invalid dates: {invalid_count}")
            self.logger.info(f"  Success rate: {valid_count/len(df)*100:.1f}%")
        
        self.logger.info(f"\nValid GRN numbers: {self.stats['grn_numbers']}")
        
        self.logger.info("\nFDA Response Categories:")
        for category, count in self.stats['fda_responses'].items():
            self.logger.info(f"  {category}: {count}")
        
        if 'filing_year' in df.columns:
            year_range = df['filing_year'].agg(['min', 'max']).to_dict()
            self.logger.info(f"\nFiling year range: {year_range['min']} - {year_range['max']}")

def main():
    processor = GRASNoticesProcessor()
    
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