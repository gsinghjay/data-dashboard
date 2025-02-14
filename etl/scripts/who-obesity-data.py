'''
## Key Features

**Data Processing**
- Reads WHO obesity data from CSV
- Handles country codes and names
- Processes time series data
- Cleans and formats rates and confidence intervals

**Data Cleaning**
- Converts rates to proper numeric format
- Handles missing values
- Creates proper datetime objects
- Standardizes country names for merging

The resulting dataset can be used for correlation analysis with other processed data sources.
'''

import pandas as pd
import numpy as np
from datetime import datetime

class WHODataProcessor:
    def __init__(self):
        self.input_file = "data/downloaded/BEFA58B_ALL_LATEST.csv"
        
    def read_data(self):
        """Read WHO obesity data from CSV"""
        print("Reading WHO obesity data...")
        df = pd.read_csv(self.input_file)
        return df
    
    def process_data(self, df):
        """Process and clean the WHO data"""
        print("Processing WHO data...")
        
        # Convert rates to numeric, handling any errors
        rate_columns = ['RATE_PER_100_N', 'RATE_PER_100_NL', 'RATE_PER_100_NU']
        for col in rate_columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
        
        # Convert year to datetime
        df['year'] = pd.to_datetime(df['DIM_TIME'].astype(str), format='%Y')
        
        # Create standardized columns for merging
        df['location'] = df['GEO_NAME_SHORT']
        df['obesity_rate'] = df['RATE_PER_100_N']
        df['confidence_lower'] = df['RATE_PER_100_NL']
        df['confidence_upper'] = df['RATE_PER_100_NU']
        
        # Add data source column for tracking
        df['data_source'] = 'WHO'
        
        return df

def main():
    processor = WHODataProcessor()
    
    # Read data
    df = processor.read_data()
    
    if df.empty:
        print("No data read")
        return
    
    # Process the data
    df = processor.process_data(df)
    
    # Save to CSV
    output_file = 'processed_who_obesity_data.csv'
    df.to_csv(output_file, index=False)
    print(f"\nData saved to {output_file}")
    
    # Print basic statistics
    print("\nBasic Statistics:")
    print(f"Total records: {len(df)}")
    print(f"Year range: {df['year'].min().year} - {df['year'].max().year}")
    print("\nAverage obesity rates by year (global):")
    yearly_avg = df.groupby(df['year'].dt.year)['obesity_rate'].mean()
    print(yearly_avg)
    
    # Print country coverage
    print(f"\nNumber of countries covered: {df['location'].nunique()}")

if __name__ == "__main__":
    main() 