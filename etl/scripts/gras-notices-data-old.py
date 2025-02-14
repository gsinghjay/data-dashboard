'''
## Key Features

**Data Processing**
- Reads FDA GRAS notices data from CSV
- Processes filing dates and closure dates
- Categorizes intended uses
- Tracks FDA responses

**Data Cleaning**
- Standardizes substance names
- Creates proper date formats
- Handles missing values
- Categorizes FDA decisions

The resulting dataset can be used for correlation analysis with obesity trends.
'''

import pandas as pd
import numpy as np
from datetime import datetime

class GRASNoticesProcessor:
    def __init__(self):
        self.input_file = "data/downloaded/GRASNotices.csv"
        
    def read_data(self):
        """Read GRAS notices data from CSV, skipping header comments"""
        print("Reading GRAS notices data...")
        encodings = ['utf-8', 'latin1', 'cp1252', 'iso-8859-1']
        
        for encoding in encodings:
            try:
                print(f"Trying {encoding} encoding...")
                # Skip the first few lines of comments/notes
                df = pd.read_csv(self.input_file, skiprows=2, encoding=encoding)
                print(f"Successfully read file with {encoding} encoding")
                return df
            except UnicodeDecodeError:
                continue
            except Exception as e:
                print(f"Error with {encoding}: {e}")
                continue
        
        print("Failed to read file with any encoding")
        return pd.DataFrame()
    
    def process_data(self, df):
        """Process and clean the GRAS notices data"""
        print("Processing GRAS notices data...")
        
        # Clean column names
        df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')
        
        # Process dates
        date_columns = ['date_of_filing', 'date_of_closure']
        for col in date_columns:
            df[col] = pd.to_datetime(df[col], errors='coerce')
        
        # Extract year from filing date
        df['filing_year'] = df['date_of_filing'].dt.year
        
        # Clean GRN numbers
        df['grn_no'] = pd.to_numeric(df['gras_notice_(grn)_no.'].str.extract(r'(\d+)')[0], errors='coerce')
        
        # Categorize FDA responses
        df['fda_response'] = df["fda's_letter"].str.lower().fillna('unknown')
        
        # Add data source column for tracking
        df['data_source'] = 'GRAS_NOTICES'
        
        return df

def main():
    processor = GRASNoticesProcessor()
    
    # Read data
    df = processor.read_data()
    
    if df.empty:
        print("No data read")
        return
    
    # Process the data
    df = processor.process_data(df)
    
    # Save to CSV
    output_file = 'processed_gras_notices.csv'
    df.to_csv(output_file, index=False)
    print(f"\nData saved to {output_file}")
    
    # Print basic statistics
    print("\nBasic Statistics:")
    print(f"Total notices: {len(df)}")
    print(f"Year range: {df['filing_year'].min()} - {df['filing_year'].max()}")
    
    # Print FDA response statistics
    print("\nFDA Response Categories:")
    response_stats = df['fda_response'].value_counts()
    print(response_stats)
    
    # Print yearly submission trends
    print("\nYearly GRAS Notice Submissions:")
    yearly_stats = df.groupby('filing_year').size()
    print(yearly_stats)

if __name__ == "__main__":
    main() 