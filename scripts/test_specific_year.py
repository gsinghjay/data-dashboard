#!/usr/bin/env python3
"""
Test script to process a specific year of ACS PUMS data.
Provides detailed timing and performance metrics for the processing steps.

Usage:
    python scripts/test_specific_year.py YEAR

Example:
    python scripts/test_specific_year.py 2018
"""

import os
import sys
import pandas as pd
import logging
import time
import argparse
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Import functions from the main processing script
sys.path.append(str(Path(__file__).parent))
from process_data import process_year, calculate_fertility_rates, create_database

def process_specific_year(year):
    """Process a specific year of ACS PUMS data with detailed metrics"""
    log_file = f"test_processing_{year}.log"
    file_handler = logging.FileHandler(log_file)
    file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
    logger.addHandler(file_handler)
    
    logger.info(f"Starting test data processing for year {year}")
    start_time = time.time()
    
    # Process the specified year
    logger.info(f"Step 1: Processing raw data for year {year}")
    step1_start = time.time()
    year_data = process_year(year)
    step1_time = time.time() - step1_start
    
    if year_data is None:
        logger.error(f"Failed to process year {year}. Check the logs for errors.")
        return 1
    
    # Log processing metrics
    processing_time = time.time() - start_time
    logger.info(f"Successfully processed {year} data, shape: {year_data.shape}")
    logger.info(f"Raw data processing time: {step1_time:.2f} seconds")
    
    # Preview the raw data
    logger.info("Sample of raw data:")
    print(year_data.head())
    
    # Calculate memory usage
    memory_usage = year_data.memory_usage(deep=True).sum() / (1024 * 1024)
    logger.info(f"Memory usage of dataframe: {memory_usage:.2f} MB")
    
    # Calculate fertility rates
    logger.info(f"Step 2: Calculating fertility rates for {year}")
    step2_start = time.time()
    fertility_rates = calculate_fertility_rates(year_data)
    step2_time = time.time() - step2_start
    
    logger.info(f"Calculated fertility rates, shape: {fertility_rates.shape}")
    logger.info(f"Fertility calculation time: {step2_time:.2f} seconds")
    
    # Preview the fertility rates data
    logger.info("Sample of fertility rates data:")
    print(fertility_rates.head())
    
    # Create test database
    test_db_path = Path(f"scripts/data/db/test_fertility_{year}.db")
    if test_db_path.exists():
        os.remove(test_db_path)
        
    # Redirect to test database
    from process_data import DB_FILE
    original_db_file = DB_FILE
    import process_data
    process_data.DB_FILE = test_db_path
    
    # Create the database
    logger.info(f"Step 3: Creating test database for {year}")
    step3_start = time.time()
    create_database(fertility_rates)
    step3_time = time.time() - step3_start
    
    # Restore original DB_FILE
    process_data.DB_FILE = original_db_file
    
    logger.info(f"Test database created at {test_db_path}")
    logger.info(f"Database creation time: {step3_time:.2f} seconds")
    
    # Verify database was created
    if test_db_path.exists():
        db_size = test_db_path.stat().st_size / 1024
        logger.info(f"Database size: {db_size:.2f} KB")
        
    total_time = time.time() - start_time
    logger.info(f"PERFORMANCE SUMMARY FOR YEAR {year}:")
    logger.info(f"Step 1 (Raw Data Processing): {step1_time:.2f}s ({step1_time/total_time*100:.1f}%)")
    logger.info(f"Step 2 (Fertility Calculation): {step2_time:.2f}s ({step2_time/total_time*100:.1f}%)")
    logger.info(f"Step 3 (Database Creation): {step3_time:.2f}s ({step3_time/total_time*100:.1f}%)")
    logger.info(f"Total processing time: {total_time:.2f} seconds")
    logger.info(f"Test for year {year} completed successfully")
    
    return 0

def main():
    """Main function to parse arguments and process a specific year"""
    parser = argparse.ArgumentParser(description='Process a specific year of ACS PUMS data')
    parser.add_argument('year', type=int, help='Year to process (2006-2023)')
    args = parser.parse_args()
    
    year = args.year
    if year < 2006 or year > 2023:
        print(f"Error: Year must be between 2006 and 2023, got {year}")
        return 1
    
    return process_specific_year(year)

if __name__ == "__main__":
    sys.exit(main()) 