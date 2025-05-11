#!/usr/bin/env python3
"""
Parallel Processing Script for ACS PUMS Data

This script processes all years of ACS PUMS data (2006-2023) in parallel
using multiprocessing to improve performance.

Usage:
    python scripts/parallel_process.py [--workers N]

Options:
    --workers N    Number of worker processes to use (default: CPU count - 1)
"""

import os
import sys
import argparse
import multiprocessing as mp
import pandas as pd
import logging
from pathlib import Path
from datetime import datetime

# Configure logging
log_file = f"parallel_processing_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Import functions from main processing script
sys.path.append(str(Path(__file__).parent))
from process_data import process_year, calculate_fertility_rates, create_database, YEARS

def process_year_wrapper(year):
    """Wrapper function for process_year to be used in multiprocessing"""
    try:
        logger.info(f"Starting processing for year {year}")
        result = process_year(year)
        if result is not None:
            logger.info(f"Completed processing for year {year}, shape: {result.shape}")
            return result
        else:
            logger.error(f"Failed to process year {year}")
            return None
    except Exception as e:
        logger.error(f"Error in process_year_wrapper for year {year}: {e}")
        return None

def main():
    """Main function to process all years in parallel"""
    parser = argparse.ArgumentParser(description='Process ACS PUMS data in parallel')
    parser.add_argument('--workers', type=int, default=max(1, mp.cpu_count() - 1),
                        help='Number of worker processes (default: CPU count - 1)')
    args = parser.parse_args()
    
    workers = args.workers
    logger.info(f"Starting parallel processing with {workers} workers")
    
    # Create a pool of worker processes
    pool = mp.Pool(processes=workers)
    
    # Process all years in parallel
    year_data_list = pool.map(process_year_wrapper, YEARS)
    
    # Close the pool
    pool.close()
    pool.join()
    
    # Filter out None results
    year_data_list = [data for data in year_data_list if data is not None]
    
    # Check if we have data
    if not year_data_list:
        logger.error("No years were processed successfully")
        return 1
    
    # Combine all years
    logger.info("Combining data from all years")
    combined_data = pd.concat(year_data_list, ignore_index=True)
    logger.info(f"Combined data shape: {combined_data.shape}")
    
    # Calculate fertility rates
    logger.info("Calculating fertility rates")
    fertility_rates = calculate_fertility_rates(combined_data)
    logger.info(f"Fertility rates data shape: {fertility_rates.shape}")
    
    # Create database
    logger.info("Creating SQLite database")
    create_database(fertility_rates)
    
    logger.info("Processing completed successfully")
    return 0

if __name__ == "__main__":
    sys.exit(main()) 