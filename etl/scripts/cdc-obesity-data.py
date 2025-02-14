'''
## Key Features

**Pagination Handling**
- Implements proper pagination using limit and offset parameters
- Respects API rate limits with sleep intervals
- Handles potential connection errors

**Data Processing**
- Converts data values to proper numeric format
- Handles percentage values
- Creates proper datetime objects for temporal analysis
- Cleans location information

**Error Handling**
- Gracefully handles API errors
- Validates responses
- Provides feedback on data retrieval progress

To use the script, simply run it and it will:
1. Fetch all available data from the CDC API
2. Process and clean the data
3. Save it to a CSV file
4. Display basic statistics about the dataset

The resulting dataset can be used for correlation analysis with the FSIS recall data we retrieved earlier.
'''

import pandas as pd
import requests
from time import sleep
import json

class CDCDataFetcher:
    def __init__(self):
        self.base_url = "https://data.cdc.gov/resource/hn4x-zwk7.json"
        self.total_records = None
    
    def get_total_count(self):
        """Get total number of records using $select=count(*) query"""
        count_url = f"{self.base_url}?$select=count(*)"
        response = requests.get(count_url)
        if response.status_code == 200:
            return int(response.json()[0]['count'])
        return 0
    
    def fetch_data_with_pagination(self, batch_size=1000):
        """Fetch all data using pagination"""
        all_data = []
        offset = 0
        
        if not self.total_records:
            self.total_records = self.get_total_count()
        
        while offset < self.total_records:
            url = f"{self.base_url}?$limit={batch_size}&$offset={offset}"
            try:
                response = requests.get(url)
                response.raise_for_status()
                batch_data = response.json()
                
                if not batch_data:
                    break
                
                # Debug print first record
                if offset == 0:
                    print("\nFirst record structure:")
                    print(json.dumps(batch_data[0], indent=2))
                    
                all_data.extend(batch_data)
                offset += batch_size
                
                # Respect rate limits
                sleep(0.1)
                
            except requests.exceptions.RequestException as e:
                print(f"Error fetching data at offset {offset}: {e}")
                break
                
        return pd.DataFrame(all_data)
    
    def process_data(self, df):
        """Process and clean the CDC data"""
        # Convert data value to numeric, handling percentages
        df['data_value'] = pd.to_numeric(df['data_value'], errors='coerce')
        
        # Convert yearstart to datetime
        df['year'] = pd.to_datetime(df['yearstart'], format='%Y')
        
        # Create location column
        df['location'] = df['locationdesc'].fillna(df['locationabbr'])
        
        return df

def main():
    fetcher = CDCDataFetcher()
    
    print("Fetching CDC obesity data...")
    df = fetcher.fetch_data_with_pagination()
    
    if df.empty:
        print("No data retrieved")
        return
    
    # Process the data
    df = fetcher.process_data(df)
    
    # Save to CSV
    output_file = 'cdc_obesity_data.csv'
    df.to_csv(output_file, index=False)
    print(f"\nData saved to {output_file}")
    
    # Print basic statistics
    print("\nBasic Statistics:")
    print(f"Total records: {len(df)}")
    print(f"Year range: {df['year'].min().year} - {df['year'].max().year}")
    print("\nAverage obesity rates by year:")
    yearly_avg = df.groupby(df['year'].dt.year)['data_value'].mean()
    print(yearly_avg)

if __name__ == "__main__":
    main()
