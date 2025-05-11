#!/bin/bash

# Process ACS PUMS data for all years sequentially
# This approach is more reliable than parallel processing since it processes one year at a time
# and avoids memory issues.

echo "Starting sequential processing of all years (2006-2023)"
echo "======================================================="

# Create the output directory if it doesn't exist
mkdir -p scripts/data/db

# List of years to process
years=(2006 2007 2008 2009 2010 2011 2012 2013 2014 2015 2016 2017 2018 2019 2020 2021 2022 2023)

# Total number of years
total=${#years[@]}
current=0

# Process each year
for year in "${years[@]}"; do
    current=$((current + 1))
    echo ""
    echo "[$current/$total] Processing year $year..."
    
    # Run the test_specific_year.py script for this year
    python scripts/test_specific_year.py $year
    
    # Check if processing was successful
    if [ $? -eq 0 ]; then
        echo "[$current/$total] ✅ Year $year completed successfully"
    else
        echo "[$current/$total] ❌ Error processing year $year"
    fi
    
    echo "Progress: $current/$total years processed ($(( (current * 100) / total ))%)"
    echo "------------------------------------------------------"
done

echo ""
echo "Creating final combined database..."

# Combine all individual databases into a final database
# Create a script to do this and run it
cat > scripts/combine_databases.py << 'EOL'
#!/usr/bin/env python3
"""
Script to combine all individual year databases into a final database.
"""
import os
import sqlite3
import glob
from pathlib import Path
import pandas as pd
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('combine_databases.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def main():
    """Combine all individual year databases into a final database"""
    # Define paths
    db_dir = Path("scripts/data/db")
    final_db_path = db_dir / "fertility_education.db"
    
    # Find all year-specific databases
    year_dbs = glob.glob(str(db_dir / "test_fertility_*.db"))
    year_dbs.sort()  # Sort to process in order
    
    if not year_dbs:
        logger.error("No year-specific databases found!")
        return 1
        
    logger.info(f"Found {len(year_dbs)} year-specific databases")
    
    # Create the final database
    if final_db_path.exists():
        os.remove(final_db_path)
        
    # Connect to the final database
    final_conn = sqlite3.connect(final_db_path)
    final_cursor = final_conn.cursor()
    
    # Create tables (copy structure from the first database)
    first_db = year_dbs[0]
    first_conn = sqlite3.connect(first_db)
    
    # Get table creation statements
    table_schemas = {}
    for row in first_conn.execute("SELECT name, sql FROM sqlite_master WHERE type='table'"):
        table_name, table_sql = row
        table_schemas[table_name] = table_sql
        
    # Get view creation statements
    view_schemas = {}
    for row in first_conn.execute("SELECT name, sql FROM sqlite_master WHERE type='view'"):
        view_name, view_sql = row
        view_schemas[view_name] = view_sql
        
    first_conn.close()
    
    # Create tables in the final database
    for table_name, table_sql in table_schemas.items():
        final_cursor.execute(table_sql)
        logger.info(f"Created table {table_name} in final database")
    
    # Process each year database
    all_fertility_data = []
    
    for year_db in year_dbs:
        year = Path(year_db).stem.replace("test_fertility_", "")
        logger.info(f"Processing database for year {year}")
        
        # Connect to year database
        year_conn = sqlite3.connect(year_db)
        
        # Extract data from fertility_rates table
        df = pd.read_sql_query("SELECT * FROM fertility_rates", year_conn)
        all_fertility_data.append(df)
        
        # Extract education_groups and states tables (only from first database)
        if year_db == year_dbs[0]:
            education_groups = pd.read_sql_query("SELECT * FROM education_groups", year_conn)
            states = pd.read_sql_query("SELECT * FROM states", year_conn)
            
            # Insert into final database
            education_groups.to_sql('education_groups', final_conn, if_exists='append', index=False)
            states.to_sql('states', final_conn, if_exists='append', index=False)
            
            logger.info("Inserted education_groups and states lookup tables")
        
        year_conn.close()
    
    # Combine all fertility data
    combined_fertility = pd.concat(all_fertility_data, ignore_index=True)
    logger.info(f"Combined fertility data shape: {combined_fertility.shape}")
    
    # Insert into final database
    combined_fertility.to_sql('fertility_rates', final_conn, if_exists='append', index=False)
    logger.info("Inserted combined fertility data into final database")
    
    # Create indices
    final_cursor.execute('CREATE INDEX idx_fertility_year ON fertility_rates (year)')
    final_cursor.execute('CREATE INDEX idx_fertility_state ON fertility_rates (state_code)')
    final_cursor.execute('CREATE INDEX idx_fertility_education ON fertility_rates (education_group)')
    logger.info("Created indices on final database")
    
    # Create views
    for view_name, view_sql in view_schemas.items():
        final_cursor.execute(view_sql)
        logger.info(f"Created view {view_name} in final database")
    
    # Commit and close
    final_conn.commit()
    final_conn.close()
    
    # Verify final database size
    db_size = final_db_path.stat().st_size / (1024 * 1024)  # Size in MB
    logger.info(f"Final database created at {final_db_path}, size: {db_size:.2f} MB")
    logger.info("Database combination completed successfully")
    
    return 0

if __name__ == "__main__":
    main()
EOL

# Make the combine script executable
chmod +x scripts/combine_databases.py

# Run the combine script
python scripts/combine_databases.py

# Check if the final database was created successfully
if [ -f "scripts/data/db/fertility_education.db" ]; then
    echo "✅ Final database created successfully!"
    echo "Database location: scripts/data/db/fertility_education.db"
    echo "Database size: $(du -h scripts/data/db/fertility_education.db | cut -f1)"
else
    echo "❌ Error creating final database"
fi

echo ""
echo "Processing completed at $(date)"
echo "=======================================================" 