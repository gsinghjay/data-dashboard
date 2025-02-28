#!/usr/bin/env python3
"""
Run Analysis Script

This script runs the complete analysis pipeline:
1. Initialize the database from CSV files
2. Generate analysis and visualizations
"""

import os
import subprocess
import sys
from pathlib import Path
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Define paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
SCRIPTS_DIR = BASE_DIR / "etl" / "scripts"
DB_DIR = BASE_DIR / "etl" / "data" / "db"
OUTPUT_DIR = BASE_DIR / "etl" / "data" / "analysis"

def check_dependencies():
    """Check if required dependencies are installed"""
    logger.info("Checking dependencies...")
    
    try:
        import pandas
        import matplotlib
        import seaborn
        import numpy
        logger.info("All required dependencies are installed")
        return True
    except ImportError as e:
        logger.error(f"Missing dependency: {e}")
        logger.info("Please install required dependencies using: pip install -r requirements.txt")
        return False

def run_script(script_path, description):
    """Run a Python script and handle errors"""
    logger.info(f"Running {description}...")
    
    try:
        result = subprocess.run(
            [sys.executable, script_path],
            check=True,
            text=True,
            capture_output=True
        )
        
        # Log the output
        for line in result.stdout.splitlines():
            logger.info(line)
        
        logger.info(f"{description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"Error running {description}: {e}")
        
        # Log the error output
        for line in e.stderr.splitlines():
            logger.error(line)
        
        return False

def main():
    """Main function to run the complete analysis pipeline"""
    logger.info(f"Starting analysis pipeline at {datetime.now()}")
    
    # Check dependencies
    if not check_dependencies():
        return
    
    # Run database initialization
    db_init_script = SCRIPTS_DIR / "initialize_database.py"
    if not run_script(db_init_script, "database initialization"):
        return
    
    # Run analysis generation
    analysis_script = SCRIPTS_DIR / "generate_analysis.py"
    if not run_script(analysis_script, "analysis generation"):
        return
    
    # Print summary
    logger.info(f"Analysis pipeline completed successfully at {datetime.now()}")
    logger.info(f"Database created at: {DB_DIR / 'food_safety_dashboard.db'}")
    logger.info(f"Analysis results saved to: {OUTPUT_DIR}")
    logger.info(f"Summary report: {OUTPUT_DIR / 'summary_report.md'}")

if __name__ == "__main__":
    main() 