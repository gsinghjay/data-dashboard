#!/usr/bin/env python3
"""
Test script to process a single year of ACS PUMS data.
This helps verify that process_data.py works correctly before processing all years.
"""

import os
import sys
import pandas as pd
import logging
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('test_processing.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Import functions from the main processing script
sys.path.append(str(Path(__file__).parent))
from process_data import process_year, calculate_fertility_rates, create_database

def main():
    """Process just the 2023 data as a test"""
    logger.info("Starting test data processing for 2023")
    
    # Process 2023 data
    year_data = process_year(2023)
    
    if year_data is not None:
        logger.info(f"Successfully processed 2023 data, shape: {year_data.shape}")
        
        # Preview the raw data
        logger.info("First 5 rows of raw data:")
        print(year_data.head())
        
        # Calculate fertility rates
        fertility_rates = calculate_fertility_rates(year_data)
        logger.info(f"Calculated fertility rates, shape: {fertility_rates.shape}")
        
        # Preview the fertility rates data
        logger.info("First 5 rows of fertility rates data:")
        print(fertility_rates.head())
        
        # Create test database
        test_db_path = Path("scripts/data/db/test_fertility.db")
        if test_db_path.exists():
            os.remove(test_db_path)
            
        # Redirect to test database
        from process_data import DB_FILE
        original_db_file = DB_FILE
        import process_data
        process_data.DB_FILE = test_db_path
        
        # Create the database
        create_database(fertility_rates)
        
        # Restore original DB_FILE
        process_data.DB_FILE = original_db_file
        
        logger.info(f"Test database created at {test_db_path}")
        logger.info("Test completed successfully")
        
        # Verify database was created
        if test_db_path.exists():
            logger.info(f"Database size: {test_db_path.stat().st_size / 1024:.2f} KB")
    else:
        logger.error("Failed to process 2023 data. Check the logs for errors.")

if __name__ == "__main__":
    main() 