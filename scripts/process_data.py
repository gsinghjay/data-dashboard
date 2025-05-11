#!/usr/bin/env python3
"""
ACS PUMS Data Processing Script

This script processes ACS PUMS data from 2006-2023 into an SQLite database
for the Educational Attainment and Fertility Rate Dashboard.

The script:
1. Processes each year's person-level CSV files
2. Filters to women aged 15-50
3. Extracts relevant columns (state, education, fertility, etc.)
4. Calculates fertility rates by education level, state, and year
5. Creates an optimized SQLite database for visualization
"""

import os
import pandas as pd
import numpy as np
import sqlite3
from pathlib import Path
from tqdm import tqdm
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('acs_data_processing.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Constants
BASE_DATA_DIR = Path("acs_pums_data")
OUTPUT_DIR = Path("scripts/data/db")
DB_FILE = OUTPUT_DIR / "fertility_education.db"
YEARS = range(2006, 2024)  # 2006 to 2023

# Column names that we need to extract
REQUIRED_COLUMNS = ["ST", "PWGTP", "AGEP", "FER", "SCHL", "SEX"]

# Education level groupings
EDUCATION_GROUPS = {
    # Group name: list of SCHL codes
    "Less than High School": list(range(1, 16)),  # 01-15
    "High School Diploma": [16, 17],              # 16-17 (Regular HS diploma, GED)
    "Some College": [18, 19],                     # 18-19 (Some college)
    "Associate's Degree": [20],                   # 20 (Associate's degree)
    "Bachelor's Degree": [21],                    # 21 (Bachelor's degree)
    "Master's Degree": [22],                      # 22 (Master's degree)
    "Professional/Doctorate Degree": [23, 24]     # 23-24 (Professional/Doctorate)
}

# State FIPS code to name mapping
STATE_NAMES = {
    1: "Alabama", 2: "Alaska", 4: "Arizona", 5: "Arkansas", 6: "California",
    8: "Colorado", 9: "Connecticut", 10: "Delaware", 11: "District of Columbia",
    12: "Florida", 13: "Georgia", 15: "Hawaii", 16: "Idaho", 17: "Illinois",
    18: "Indiana", 19: "Iowa", 20: "Kansas", 21: "Kentucky", 22: "Louisiana",
    23: "Maine", 24: "Maryland", 25: "Massachusetts", 26: "Michigan", 27: "Minnesota",
    28: "Mississippi", 29: "Missouri", 30: "Montana", 31: "Nebraska", 32: "Nevada",
    33: "New Hampshire", 34: "New Jersey", 35: "New Mexico", 36: "New York",
    37: "North Carolina", 38: "North Dakota", 39: "Ohio", 40: "Oklahoma",
    41: "Oregon", 42: "Pennsylvania", 44: "Rhode Island", 45: "South Carolina",
    46: "South Dakota", 47: "Tennessee", 48: "Texas", 49: "Utah", 50: "Vermont",
    51: "Virginia", 53: "Washington", 54: "West Virginia", 55: "Wisconsin", 56: "Wyoming"
}

def process_year(year):
    """Process a single year of ACS PUMS data"""
    logger.info(f"Processing data for year {year}")
    
    # Define file path
    year_dir = BASE_DATA_DIR / str(year)
    csv_path = year_dir / f"person_records_{year}.csv"
    
    if not csv_path.exists():
        logger.error(f"CSV file for year {year} not found: {csv_path}")
        return None
    
    try:
        # Column positions from verification document for fallback
        column_positions = {
            # Year: {column: position}
            2006: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 18, "SCHL": 53, "SEX": 55},
            2007: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 18, "SCHL": 53, "SEX": 55},
            2008: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 21, "SCHL": 67, "SEX": 69},
            2009: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 21, "SCHL": 67, "SEX": 69},
            2010: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 21, "SCHL": 67, "SEX": 69},
            2011: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 21, "SCHL": 67, "SEX": 69},
            2012: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 21, "SCHL": 67, "SEX": 69},
            2013: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 21, "SCHL": 65, "SEX": 67},
            2014: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 21, "SCHL": 65, "SEX": 67},
            2015: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 21, "SCHL": 65, "SEX": 67},
            2016: {"ST": 5, "PWGTP": 7, "AGEP": 8, "FER": 21, "SCHL": 66, "SEX": 68},
            2017: {"ST": 7, "PWGTP": 9, "AGEP": 10, "FER": 23, "SCHL": 67, "SEX": 69},
            2018: {"ST": 7, "PWGTP": 9, "AGEP": 10, "FER": 23, "SCHL": 67, "SEX": 69},
            2019: {"ST": 7, "PWGTP": 9, "AGEP": 10, "FER": 23, "SCHL": 68, "SEX": 70},
            2020: {"ST": 7, "PWGTP": 9, "AGEP": 10, "FER": 23, "SCHL": 68, "SEX": 70},
            2021: {"ST": 7, "PWGTP": 9, "AGEP": 10, "FER": 23, "SCHL": 67, "SEX": 69},
            2022: {"ST": 7, "PWGTP": 9, "AGEP": 10, "FER": 23, "SCHL": 67, "SEX": 69},
            2023: {"STATE": 7, "PWGTP": 9, "AGEP": 10, "FER": 23, "SCHL": 67, "SEX": 69}
        }

        # For 2023, the column name is STATE instead of ST
        columns_to_use = REQUIRED_COLUMNS.copy()
        if year == 2023:
            columns_to_use[0] = "STATE"  # Replace ST with STATE
        
        # First check if the file has a header
        with open(csv_path, 'r') as f:
            first_line = f.readline().strip()
        
        # Check if file has a header by looking for column names
        has_header = any(col in first_line for col in ["AGEP", "SEX", "SCHL", "FER"])
        
        logger.info(f"File has header: {has_header}")
        
        if has_header:
            # Read the CSV file using column names
            df = pd.read_csv(
                csv_path,
                usecols=columns_to_use,
                dtype={
                    "PWGTP": "int32",
                    "AGEP": "int16",
                    "SEX": "int8",
                    "SCHL": "float32",  # Some values have decimal points
                    "FER": "float32"    # Some values have decimal points
                },
                header=0,
                low_memory=False
            )
        else:
            # Fallback to position-based reading if no header
            logger.info(f"No header detected, using column positions from verification document")
            if year not in column_positions:
                logger.error(f"No column position data for year {year}, cannot process")
                return None
                
            # Get column positions for this year
            positions = column_positions[year]
            
            # Create a list of columns to use by position (0-indexed for pandas)
            cols_by_position = [positions[col] - 1 if col in positions else None for col in columns_to_use]
            
            # Remove any None values (columns not found)
            cols_by_position = [pos for pos in cols_by_position if pos is not None]
            
            # Read CSV using positions
            df = pd.read_csv(
                csv_path,
                usecols=cols_by_position,
                header=None,
                names=columns_to_use,
                dtype={
                    "PWGTP": "int32",
                    "AGEP": "int16", 
                    "SEX": "int8",
                    "SCHL": "float32",
                    "FER": "float32"
                },
                low_memory=False
            )
        
        # Standardize the state column name if needed
        if year == 2023:
            df = df.rename(columns={"STATE": "ST"})
        
        logger.info(f"Successfully read data for year {year}, shape: {df.shape}")
        
        # Filter to women (SEX=2) of reproductive age (15-50)
        df = df[(df["SEX"] == 2) & (df["AGEP"] >= 15) & (df["AGEP"] <= 50)]
        logger.info(f"After filtering to women aged 15-50, shape: {df.shape}")
        
        # Convert categorical values to integers if they have decimal points
        df["SCHL"] = df["SCHL"].fillna(0).astype("int16")
        df["FER"] = df["FER"].fillna(0).astype("int8")
        
        # Add a year column
        df["YEAR"] = year
        
        return df
    
    except Exception as e:
        logger.error(f"Error processing year {year}: {e}")
        return None

def calculate_fertility_rates(all_data):
    """Calculate fertility rates by education level, state, and year"""
    logger.info("Calculating fertility rates")
    
    # Group data by year, state, and education group
    results = []
    
    # Iterate through each year
    for year in all_data["YEAR"].unique():
        year_data = all_data[all_data["YEAR"] == year]
        
        # Iterate through each state
        for state_code in year_data["ST"].unique():
            state_data = year_data[year_data["ST"] == state_code]
            
            # Iterate through education groups
            for group_name, schl_codes in EDUCATION_GROUPS.items():
                # Get data for this education group
                group_data = state_data[state_data["SCHL"].isin(schl_codes)]
                
                if len(group_data) > 0:
                    # Calculate total women in this group (sum of weights)
                    total_women = group_data["PWGTP"].sum()
                    
                    # Calculate women who gave birth (FER=1)
                    births = group_data[group_data["FER"] == 1]["PWGTP"].sum()
                    
                    # Calculate fertility rate per 1,000 women
                    fertility_rate = (births / total_women) * 1000 if total_women > 0 else 0
                    
                    # Add result to the list
                    results.append({
                        "year": year,
                        "state_code": int(state_code),
                        "state_name": STATE_NAMES.get(int(state_code), "Unknown"),
                        "education_group": group_name,
                        "women_count": int(total_women),
                        "births": int(births),
                        "fertility_rate": round(fertility_rate, 2)
                    })
    
    # Convert to DataFrame
    return pd.DataFrame(results)

def create_database(fertility_data):
    """Create and populate the SQLite database"""
    logger.info(f"Creating SQLite database at {DB_FILE}")
    
    # Create output directory if it doesn't exist
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    # Connect to SQLite database
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Create tables
    logger.info("Creating tables")
    
    # Main fertility rates table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS fertility_rates (
        id INTEGER PRIMARY KEY,
        year INTEGER,
        state_code INTEGER,
        state_name TEXT,
        education_group TEXT,
        women_count INTEGER,
        births INTEGER,
        fertility_rate REAL
    )
    ''')
    
    # Education groups lookup table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS education_groups (
        id INTEGER PRIMARY KEY,
        name TEXT,
        schl_codes TEXT,
        display_order INTEGER
    )
    ''')
    
    # States lookup table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS states (
        code INTEGER PRIMARY KEY,
        name TEXT
    )
    ''')
    
    # Insert data into tables
    logger.info("Inserting data into tables")
    
    # Insert fertility data
    fertility_data.to_sql('fertility_rates_temp', conn, if_exists='replace', index=False)
    cursor.execute('''
    INSERT INTO fertility_rates (year, state_code, state_name, education_group, women_count, births, fertility_rate)
    SELECT year, state_code, state_name, education_group, women_count, births, fertility_rate
    FROM fertility_rates_temp
    ''')
    cursor.execute('DROP TABLE fertility_rates_temp')
    
    # Insert education groups
    for i, (group_name, schl_codes) in enumerate(EDUCATION_GROUPS.items()):
        cursor.execute(
            'INSERT INTO education_groups (name, schl_codes, display_order) VALUES (?, ?, ?)',
            (group_name, ','.join(map(str, schl_codes)), i)
        )
    
    # Insert states
    for code, name in STATE_NAMES.items():
        cursor.execute('INSERT INTO states (code, name) VALUES (?, ?)', (code, name))
    
    # Create indices for faster queries
    logger.info("Creating indices")
    cursor.execute('CREATE INDEX idx_fertility_year ON fertility_rates (year)')
    cursor.execute('CREATE INDEX idx_fertility_state ON fertility_rates (state_code)')
    cursor.execute('CREATE INDEX idx_fertility_education ON fertility_rates (education_group)')
    
    # Create specialized views for common visualizations
    logger.info("Creating views")
    
    # View for national trends by education and year
    cursor.execute('''
    CREATE VIEW IF NOT EXISTS national_trends AS
    SELECT 
        year,
        education_group,
        SUM(women_count) as total_women,
        SUM(births) as total_births,
        CASE WHEN SUM(women_count) > 0 
            THEN ROUND((SUM(births) * 1000.0 / SUM(women_count)), 2)
            ELSE 0
        END as fertility_rate
    FROM fertility_rates
    GROUP BY year, education_group
    ORDER BY year, education_group
    ''')
    
    # View for state comparison for the most recent year
    cursor.execute('''
    CREATE VIEW IF NOT EXISTS state_comparison AS
    SELECT 
        state_code,
        state_name,
        education_group,
        women_count,
        births,
        fertility_rate
    FROM fertility_rates
    WHERE year = (SELECT MAX(year) FROM fertility_rates)
    ORDER BY state_name, education_group
    ''')
    
    # View for education comparison across all years
    cursor.execute('''
    CREATE VIEW IF NOT EXISTS education_comparison AS
    SELECT 
        year,
        education_group,
        SUM(women_count) as total_women,
        SUM(births) as total_births,
        CASE WHEN SUM(women_count) > 0 
            THEN ROUND((SUM(births) * 1000.0 / SUM(women_count)), 2)
            ELSE 0
        END as fertility_rate
    FROM fertility_rates
    GROUP BY year, education_group
    ORDER BY year, education_group
    ''')
    
    # Commit changes and close connection
    conn.commit()
    conn.close()
    
    logger.info("Database creation complete")

def main():
    """Main function to process all years and create the database"""
    logger.info("Starting ACS PUMS data processing")
    
    all_years_data = []
    
    # Process each year
    for year in tqdm(YEARS, desc="Processing Years"):
        year_data = process_year(year)
        if year_data is not None:
            all_years_data.append(year_data)
    
    # If we have data for at least one year
    if all_years_data:
        # Combine all years
        combined_data = pd.concat(all_years_data, ignore_index=True)
        logger.info(f"Combined data shape: {combined_data.shape}")
        
        # Calculate fertility rates
        fertility_rates = calculate_fertility_rates(combined_data)
        logger.info(f"Fertility rates data shape: {fertility_rates.shape}")
        
        # Create database
        create_database(fertility_rates)
        
        logger.info("Data processing completed successfully")
    else:
        logger.error("No data was processed. Check the logs for errors.")

if __name__ == "__main__":
    main() 