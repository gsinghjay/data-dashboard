#!/usr/bin/env python3
"""
Test script to process 2022 ACS PUMS data.
This helps verify that process_data.py works correctly for the 2022 dataset.
"""

import os
import sys
import pandas as pd
import logging
import time
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('test_processing_2022.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Import functions from the main processing script
sys.path.append(str(Path(__file__).parent))
from process_data import process_year, calculate_fertility_rates, create_database

def main():
    """Process just the 2022 data as a test"""
    logger.info("Starting test data processing for 2022")
    start_time = time.time()
    
    # Process 2022 data
    year_data = process_year(2022)
    
    if year_data is not None:
        processing_time = time.time() - start_time
        logger.info(f"Successfully processed 2022 data, shape: {year_data.shape}")
        logger.info(f"Processing time: {processing_time:.2f} seconds")
        
        # Preview the raw data
        logger.info("First 5 rows of raw data:")
        print(year_data.head())
        
        # Calculate memory usage
        memory_usage = year_data.memory_usage(deep=True).sum() / (1024 * 1024)
        logger.info(f"Memory usage of dataframe: {memory_usage:.2f} MB")
        
        # Calculate fertility rates
        logger.info("Calculating fertility rates...")
        rates_start_time = time.time()
        fertility_rates = calculate_fertility_rates(year_data)
        rates_time = time.time() - rates_start_time
        
        logger.info(f"Calculated fertility rates, shape: {fertility_rates.shape}")
        logger.info(f"Fertility calculation time: {rates_time:.2f} seconds")
        
        # Preview the fertility rates data
        logger.info("First 5 rows of fertility rates data:")
        print(fertility_rates.head())
        
        # Create test database
        test_db_path = Path("scripts/data/db/test_fertility_2022.db")
        if test_db_path.exists():
            os.remove(test_db_path)
            
        # Redirect to test database
        from process_data import DB_FILE
        original_db_file = DB_FILE
        import process_data
        process_data.DB_FILE = test_db_path
        
        # Create the database
        logger.info("Creating test database...")
        db_start_time = time.time()
        create_database(fertility_rates)
        db_time = time.time() - db_start_time
        
        # Restore original DB_FILE
        process_data.DB_FILE = original_db_file
        
        logger.info(f"Test database created at {test_db_path}")
        logger.info(f"Database creation time: {db_time:.2f} seconds")
        
        # Verify database was created
        if test_db_path.exists():
            logger.info(f"Database size: {test_db_path.stat().st_size / 1024:.2f} KB")
            
        total_time = time.time() - start_time
        logger.info(f"Total test time: {total_time:.2f} seconds")
        logger.info("Test completed successfully")
    else:
        logger.error("Failed to process 2022 data. Check the logs for errors.")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main()) 