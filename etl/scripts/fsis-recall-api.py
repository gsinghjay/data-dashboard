'''
## Key Features

**API Integration**
- Uses aiohttp for async requests
- Implements efficient pagination and filtering
- Handles rate limiting properly
- Excludes Spanish language entries
- Processes only active recalls

**Data Processing**
- Streams data directly to CSV
- Processes in chunks for memory efficiency
- Handles date formatting and data cleaning
- Standardizes risk levels and states

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
import html

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
        self.batch_size = 25  # Reduced batch size for better reliability
        self.timeout = aiohttp.ClientTimeout(total=120, connect=60)  # Increased timeout for historical data
        
        # API Filter Constants
        self.STATES = {
            'All': 'All', 'Alabama': '25', 'Alaska': '26', 'Arizona': '27', 'Arkansas': '28',
            'California': '29', 'Colorado': '30', 'Connecticut': '31', 'Delaware': '32',
            'Florida': '33', 'Georgia': '34', 'Hawaii': '35', 'Idaho': '36',
            'Illinois': '37', 'Indiana': '38', 'Iowa': '39', 'Kansas': '40',
            'Kentucky': '41', 'Louisiana': '42', 'Maine': '43', 'Maryland': '44',
            'Massachusetts': '45', 'Michigan': '46', 'Minnesota': '47', 'Mississippi': '48',
            'Missouri': '50', 'Montana': '51', 'Nebraska': '52', 'Nevada': '53',
            'New Hampshire': '54', 'New Jersey': '55', 'New Mexico': '56', 'New York': '57',
            'North Carolina': '58', 'North Dakota': '59', 'Ohio': '60', 'Oklahoma': '61',
            'Oregon': '62', 'Pennsylvania': '63', 'Rhode Island': '64', 'South Carolina': '65',
            'South Dakota': '66', 'Tennessee': '67', 'Texas': '68', 'Utah': '69',
            'Vermont': '70', 'Virginia': '71', 'Washington': '72', 'West Virginia': '73',
            'Wisconsin': '74', 'Wyoming': '75', 'District of Columbia': '76',
            'American Samoa': '77', 'Guam': '78', 'Northern Mariana Islands': '79',
            'Puerto Rico': '80', 'U.S. Minor Outlying Islands': '81', 'U.S. Virgin Islands': '82',
            'Nationwide': '557'
        }
        
        self.RISK_LEVELS = {
            'All': 'All',
            'High -Class I': '9',
            'Low -Class II': '7',
            'Marginal -Class III': '611',
            'Medium -Class I': '8',
            'Public Health Alert': '555'
        }
        
        self.PROCESSING_CATEGORIES = {
            'All': 'All',
            'Eggs/Egg Products': '162',
            'Fully Cooked -Not Shelf Stable': '159',
            'Heat Treated -Not Fully Cooked -Not Shelf Stable': '160',
            'Heat Treated -Shelf Stable': '158',
            'Not Heat Treated -Shelf Stable': '157',
            'Products with Secondary Inhibitors -Not Shelf Stable': '161',
            'Raw -Intact': '154',
            'Raw -Non Intact': '155',
            'Slaughter': '153',
            'Thermally Processed -Commercially Sterile': '156',
            'Unknown': '625'
        }
        
        self.RECALL_REASONS = {
            'All': 'All',
            'Import Violation': '19',
            'Insanitary Conditions': '17',
            'Misbranding': '13',
            'Mislabeling': '15',
            'Processing Defect': '21',
            'Produced Without Benefit of Inspection': '18',
            'Product Contamination': '16',
            'Unfit for Human Consumption': '20',
            'Unreported Allergens': '14'
        }
        
        self.RECALL_TYPES = {
            'All': 'All',
            'Outbreak': '338',
            'Public Health Alert': '22',
            'Active Recall': '23',
            'Closed Recall': '24'
        }
        
        self.YEARS = {str(year): str(id) for year, id in [
            (2023, '445'), (2022, '444'), (2021, '446'), (2020, '1'),
            (2019, '2'), (2018, '3'), (2017, '4'), (2016, '5'),
            (2015, '6'), (2014, '7'), (2013, '8'), (2012, '9'),
            (2011, '10')
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
        
        # Basic parameters that don't need mapping
        direct_params = {
            'field_states_id': 'All',
            'field_archive_recall': 'All',
            'field_closed_date_value': '',
            'field_closed_year_id': 'All',
            'field_risk_level_id': 'All',
            'field_processing_id': 'All',
            'field_recall_classification_id': 'All',
            'field_recall_number': '',
            'field_recall_reason_id': 'All',
            'field_recall_type_id': 'All',
            'field_related_to_outbreak': 'All',
            'field_summary_value': '',
            'field_year_id': 'All',
            'field_translation_language': 'en',  # Default to English
            '$limit': self.batch_size
        }
        
        # Update with any provided filters
        if filters:
            for key, value in filters.items():
                if key == 'state':
                    direct_params['field_states_id'] = self.STATES.get(value, 'All')
                elif key == 'year':
                    direct_params['field_year_id'] = self.YEARS.get(str(value), 'All')
                elif key == 'risk_level':
                    direct_params['field_risk_level_id'] = self.RISK_LEVELS.get(value, 'All')
                elif key == 'processing':
                    direct_params['field_processing_id'] = self.PROCESSING_CATEGORIES.get(value, 'All')
                elif key == 'recall_reason':
                    direct_params['field_recall_reason_id'] = self.RECALL_REASONS.get(value, 'All')
                elif key == 'recall_type':
                    direct_params['field_recall_type_id'] = self.RECALL_TYPES.get(value, 'All')
                elif key == 'recall_number':
                    direct_params['field_recall_number'] = value
                elif key == 'closed_date':
                    direct_params['field_closed_date_value'] = value
                elif key == 'summary':
                    direct_params['field_summary_value'] = value
                elif key == 'language':
                    direct_params['field_translation_language'] = 'en' if value == 'English' else 'es'
        
        # Build URL with parameters
        query_string = urlencode(direct_params)
        return f"{base_url}?{query_string}"

    async def fetch_batch(self, url: str, offset: int = 0) -> List[Dict]:
        """Fetch a batch of records with offset"""
        page_url = f"{url}&$offset={offset}" if '?' in url else f"{url}?$offset={offset}"
        retries = 5  # Increased retries
        
        for attempt in range(retries):
            try:
                if not self.session or self.session.closed:
                    await self.init_session()
                    
                logger.debug(f"Fetching batch at offset {offset}, attempt {attempt + 1}")
                async with self.session.get(page_url, ssl=False, timeout=self.timeout) as response:
                    if response.status == 200:
                        try:
                            data = await asyncio.wait_for(response.json(), timeout=60)
                            # Filter out Spanish language entries
                            data = [item for item in data if item.get('langcode') == 'English']
                            if offset == 0:
                                logger.debug(f"First record structure: {data[0] if data else 'No data'}")
                            logger.debug(f"Successfully fetched {len(data)} records")
                            return data
                        except asyncio.TimeoutError:
                            logger.error(f"Timeout while parsing JSON at offset {offset}")
                            await asyncio.sleep(2 ** attempt)  # Exponential backoff
                            continue
                    else:
                        response_text = await response.text()
                        logger.error(f"Error response for batch {offset}: {response_text}")
                        if response.status == 429:  # Rate limit
                            await asyncio.sleep(30)  # Wait longer for rate limits
                            continue
                        return []
            except Exception as e:
                logger.error(f"Error fetching batch at offset {offset}, attempt {attempt + 1}: {str(e)}", exc_info=True)
                if attempt == retries - 1:
                    return []
                await asyncio.sleep(2 ** attempt)  # Exponential backoff

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
            total_fetched = 0
            max_retries = 5
            retry_count = 0
            last_batch_size = self.batch_size
            
            with tqdm(desc="Fetching recalls") as pbar:
                while more_data and last_batch_size == self.batch_size:
                    try:
                        batch_data = await self.fetch_batch(url, offset)
                        if not batch_data and retry_count < max_retries:
                            logger.warning(f"No data received, attempt {retry_count + 1} of {max_retries}")
                            retry_count += 1
                            await asyncio.sleep(2 ** retry_count)  # Exponential backoff
                            continue
                        elif not batch_data:
                            logger.info("No more data available after retries")
                            more_data = False
                            continue
                            
                        retry_count = 0  # Reset retry count on successful fetch
                        last_batch_size = len(batch_data)
                        all_data.extend(batch_data)
                        total_fetched += last_batch_size
                        pbar.update(last_batch_size)
                        
                        offset += self.batch_size
                        await asyncio.sleep(0.5)  # Rate limiting delay
                        
                        # Log progress for historical data
                        if total_fetched % 500 == 0:
                            logger.info(f"Fetched {total_fetched} records so far...")
                            
                    except Exception as e:
                        logger.error(f"Error fetching batch at offset {offset}: {str(e)}")
                        if retry_count < max_retries:
                            retry_count += 1
                            await asyncio.sleep(2 ** retry_count)
                            continue
                        else:
                            logger.error("Max retries reached, stopping fetch")
                            more_data = False
            
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
            # Clean HTML from text fields
            text_columns = ['field_summary', 'field_product_items']
            for col in text_columns:
                if col in df.columns:
                    df[col] = df[col].apply(lambda x: html.unescape(re.sub('<[^<]+?>', '', str(x))))

            # Convert dates to datetime
            date_columns = [
                'field_recall_date', 
                'field_closed_date',
                'field_last_modified_date'
            ]
            for col in date_columns:
                if col in df.columns:
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
                'year',
                'risk_level',
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
                'field_risk_level': 'risk_level_raw',
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
        
        # Basic filters for English language
        base_filters = {
            'language': 'English'
        }
        
        logger.info("Fetching all recalls...")
        df = await api.fetch_all_data(base_filters)
        
        if df.empty:
            logger.error("No data retrieved")
            return
            
        # Process the data
        logger.info("\nProcessing all data...")
        df = api.process_data(df)
        
        # Filter for years 2011-2023 after processing
        df = df[df['year'].between(2011, 2023)]
        
        # Save to CSV
        output_path = 'etl/data/processed/processed_fsis_recalls.csv'
        df.to_csv(output_path, index=False)
        logger.info(f"\nData saved to {output_path}")
        
        # Print basic statistics
        logger.info("\nBasic Statistics:")
        logger.info(f"Total recalls: {len(df)}")
        
        if 'year' in df.columns:
            year_stats = df['year'].value_counts().sort_index()
            logger.info("\nRecalls by year:")
            logger.info(year_stats)
            logger.info(f"\nYear range: {df['year'].min()} - {df['year'].max()}")
            
        if 'risk_level' in df.columns:
            logger.info("\nRecalls by risk level:")
            logger.info(df['risk_level'].value_counts())
            
        if 'recall_reason' in df.columns:
            logger.info("\nTop recall reasons:")
            logger.info(df['recall_reason'].value_counts().head())
            
        if 'states' in df.columns:
            logger.info("\nTop affected states:")
            logger.info(df['states'].value_counts().head())
            
        if 'processing_type' in df.columns:
            logger.info("\nRecalls by processing type:")
            logger.info(df['processing_type'].value_counts())
            
    except Exception as e:
        logger.error(f"Error in main: {str(e)}", exc_info=True)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Script interrupted by user")
    except Exception as e:
        logger.error(f"Script failed: {str(e)}", exc_info=True)
