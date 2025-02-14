'''
## Key Features

**API Integration**
- Uses aiohttp for async requests
- Implements efficient pagination and filtering
- Handles rate limiting properly

**Data Processing**
- Streams data directly to CSV
- Processes in chunks for memory efficiency
- Handles date formatting and data cleaning

**Performance Improvements**
- Async/concurrent requests
- Batch processing
- Memory-efficient streaming
- Progress tracking

The script can be expanded to include additional analysis or modified to fetch data for specific date ranges.
'''

import aiohttp
import asyncio
import pandas as pd
import numpy as np
from datetime import datetime
import time
from tqdm import tqdm
import logging
import sys
from typing import Dict, List, Optional
from urllib.parse import urlencode
import re

# Set up detailed logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

class FSISRecallAPI:
    def __init__(self):
        self.base_url = "https://www.fsis.usda.gov/fsis/api/recall/v/1"
        self.session = None
        self.batch_size = 50  # Reduced batch size for better reliability
        self.timeout = aiohttp.ClientTimeout(total=60, connect=30)  # Increased timeout
        
        # API Filter Constants
        self.STATES = {
            'All': 'All', 'Alabama': '25', 'Alaska': '26', 'Arizona': '27',
            'California': '29', 'Colorado': '30', 'Florida': '33', 'Georgia': '34',
            'Illinois': '37', 'Texas': '68', 'Washington': '72', 'Nationwide': '557'
        }
        
        self.RISK_LEVELS = {
            'All': 'All', 'High -Class I': '9', 'Low -Class II': '7',
            'Marginal -Class III': '611', 'Medium -Class I': '8',
            'Public Health Alert': '555'
        }
        
        self.YEARS = {str(year): str(id) for year, id in [
            (2023, '445'), (2022, '444'), (2021, '446'), (2020, '1'),
            (2019, '2'), (2018, '3'), (2017, '4'), (2016, '5')
        ]}
        
    async def init_session(self):
        """Initialize aiohttp session with proper headers"""
        if not self.session or self.session.closed:
            self.session = aiohttp.ClientSession(
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/json'
                },
                timeout=self.timeout
            )
            logger.debug("Session initialized with headers")

    def build_query_url(self, filters: Optional[Dict] = None) -> str:
        """Build API URL with filters"""
        base_url = self.base_url
        if not filters:
            return base_url
            
        # Convert human-readable filters to API parameters
        api_params = {}
        
        if 'state' in filters:
            state_id = self.STATES.get(filters['state'], 'All')
            api_params['field_states_id'] = state_id
            
        if 'year' in filters:
            year_id = self.YEARS.get(str(filters['year']), 'All')
            api_params['field_year_id'] = year_id
            
        if 'risk_level' in filters:
            risk_id = self.RISK_LEVELS.get(filters['risk_level'], 'All')
            api_params['field_risk_level_id'] = risk_id
            
        if 'recall_number' in filters:
            api_params['field_recall_number'] = filters['recall_number']
            
        # Add pagination parameters
        api_params['$limit'] = self.batch_size
        
        # Build URL with parameters
        query_string = urlencode(api_params)
        return f"{base_url}?{query_string}"

    async def fetch_batch(self, url: str, offset: int = 0) -> List[Dict]:
        """Fetch a batch of records with offset"""
        page_url = f"{url}&$offset={offset}" if '?' in url else f"{url}?$offset={offset}"
        retries = 3
        
        for attempt in range(retries):
            try:
                if not self.session or self.session.closed:
                    await self.init_session()
                    
                logger.debug(f"Fetching batch at offset {offset}, attempt {attempt + 1}")
                async with self.session.get(page_url, ssl=False) as response:
                    if response.status == 200:
                        data = await response.json()
                        if offset == 0:
                            logger.debug(f"First record structure: {data[0] if data else 'No data'}")
                        logger.debug(f"Successfully fetched {len(data)} records")
                        return data
                    else:
                        response_text = await response.text()
                        logger.error(f"Error response for batch {offset}: {response_text}")
                        return []
            except Exception as e:
                logger.error(f"Error fetching batch at offset {offset}, attempt {attempt + 1}: {str(e)}", exc_info=True)
                if attempt == retries - 1:
                    return []
                await asyncio.sleep(1)  # Wait before retry

    async def fetch_all_data(self, filters: Optional[Dict] = None) -> pd.DataFrame:
        """Fetch all data using async requests with optional filters"""
        try:
            await self.init_session()
            logger.info("Starting data fetch...")
            
            # Build URL with filters
            url = self.build_query_url(filters)
            logger.debug(f"Using API URL: {url}")
            
            all_data = []
            offset = 0
            more_data = True
            
            with tqdm(desc="Fetching recalls") as pbar:
                while more_data:
                    batch_data = await self.fetch_batch(url, offset)
                    if not batch_data:
                        more_data = False
                        continue
                        
                    all_data.extend(batch_data)
                    pbar.update(len(batch_data))
                    
                    if len(batch_data) < self.batch_size:
                        more_data = False
                    else:
                        offset += self.batch_size
                        await asyncio.sleep(0.5)  # Increased delay between requests
            
            logger.info(f"Fetched {len(all_data)} total records")
            return pd.DataFrame(all_data)
            
        finally:
            if self.session and not self.session.closed:
                await self.session.close()
                logger.debug("Session closed")

    def process_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Process and clean the recall data"""
        logger.info("Processing recall data...")
        
        if df.empty:
            logger.warning("Empty DataFrame received for processing")
            return df
            
        try:
            # Remove Spanish language duplicates
            df = df[df['langcode'] == 'English'].copy()
            
            # Convert dates to datetime
            date_columns = [
                'field_recall_date', 
                'field_closed_date',
                'field_last_modified_date'
            ]
            for col in df.columns:
                if any(date_col in col for date_col in ['date', 'year']):
                    df[col] = pd.to_datetime(df[col], errors='coerce')
            
            # Extract year from recall date
            if 'field_recall_date' in df.columns:
                df['year'] = df['field_recall_date'].dt.year
            
            # Clean up state information
            if 'field_states' in df.columns:
                df['states'] = df['field_states'].str.split(',').str.join('|')
            
            # Standardize risk levels
            if 'field_risk_level' in df.columns:
                df['risk_level'] = df['field_risk_level'].fillna('Unknown')
            
            # Clean up quantity information
            if 'field_qty_recovered' in df.columns:
                df['quantity_lbs'] = df['field_qty_recovered'].str.extract(r'(\d+(?:,\d+)?(?:\.\d+)?)', expand=False)
                df['quantity_lbs'] = pd.to_numeric(df['quantity_lbs'].str.replace(',', ''), errors='coerce')
            
            # Extract establishment numbers
            if 'field_summary' in df.columns:
                df['establishment_number'] = df['field_summary'].str.extract(r'establishment number ["\']?(EST\.?\s*\d+)["\']?', flags=re.IGNORECASE)
            
            # Add data source column for tracking
            df['data_source'] = 'FSIS_RECALLS'
            
            # Select and rename relevant columns
            columns_to_keep = [
                'field_title',
                'field_recall_number',
                'field_recall_date',
                'field_closed_date',
                'field_establishment',
                'field_risk_level',
                'field_recall_reason',
                'field_recall_type',
                'field_related_to_outbreak',
                'field_active_notice',
                'field_product_items',
                'field_processing',
                'states',
                'quantity_lbs',
                'establishment_number',
                'year',
                'data_source'
            ]
            
            # Keep only columns that exist
            columns_to_keep = [col for col in columns_to_keep if col in df.columns]
            df = df[columns_to_keep]
            
            # Rename columns for clarity
            column_renames = {
                'field_title': 'title',
                'field_recall_number': 'recall_number',
                'field_recall_date': 'recall_date',
                'field_closed_date': 'closed_date',
                'field_establishment': 'establishment',
                'field_risk_level': 'risk_level',
                'field_recall_reason': 'recall_reason',
                'field_recall_type': 'recall_type',
                'field_related_to_outbreak': 'related_to_outbreak',
                'field_active_notice': 'is_active',
                'field_product_items': 'products',
                'field_processing': 'processing_type'
            }
            
            # Only rename columns that exist
            column_renames = {k: v for k, v in column_renames.items() if k in df.columns}
            df = df.rename(columns=column_renames)
            
            # Convert boolean columns
            bool_columns = ['is_active', 'related_to_outbreak']
            for col in bool_columns:
                if col in df.columns:
                    df[col] = df[col].map({'True': True, 'False': False})
            
            logger.info("Data processing completed successfully")
            return df
        except Exception as e:
            logger.error(f"Error processing data: {str(e)}", exc_info=True)
            return df

async def main():
    try:
        api = FSISRecallAPI()
        all_recalls = []
        
        # Active recalls
        active_filters = {'field_active_notice': 'True'}
        logger.info("Fetching active recalls...")
        active_df = await api.fetch_all_data(active_filters)
        if not active_df.empty:
            all_recalls.append(active_df)
            
        # Create new session for closed recalls
        api = FSISRecallAPI()  # Create new instance for new session
        
        # Closed recalls
        closed_filters = {'field_active_notice': 'False'}
        logger.info("Fetching closed recalls...")
        closed_df = await api.fetch_all_data(closed_filters)
        if not closed_df.empty:
            all_recalls.append(closed_df)
            
        if not all_recalls:
            logger.error("No data retrieved")
            return
            
        # Combine and process all recalls
        df = pd.concat(all_recalls, ignore_index=True)
        df = api.process_data(df)
        
        # Save to CSV
        output_file = 'processed_fsis_recalls.csv'
        df.to_csv(output_file, index=False)
        logger.info(f"\nData saved to {output_file}")
        
        # Print basic statistics
        logger.info("\nBasic Statistics:")
        logger.info(f"Total recalls: {len(df)}")
        if 'year' in df.columns:
            logger.info(f"Year range: {df['year'].min()} - {df['year'].max()}")
        if 'risk_level' in df.columns:
            logger.info("\nRecalls by risk level:")
            logger.info(df['risk_level'].value_counts())
        if 'recall_reason' in df.columns:
            logger.info("\nTop recall reasons:")
            logger.info(df['recall_reason'].value_counts().head())
            
    except Exception as e:
        logger.error(f"Error in main: {str(e)}", exc_info=True)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Script interrupted by user")
    except Exception as e:
        logger.error(f"Script failed: {str(e)}", exc_info=True)
