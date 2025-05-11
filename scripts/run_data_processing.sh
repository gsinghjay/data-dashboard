#!/bin/bash
# Data Processing Pipeline for Educational Attainment and Fertility Rate Dashboard
# This script runs the full data processing pipeline:
# 1. Tests processing with one year (2023)
# 2. If successful, processes all years in parallel
# 3. Verifies the database creation

set -e  # Exit on error

echo "==== Educational Attainment and Fertility Rate Dashboard ===="
echo "==== Data Processing Pipeline ===="
echo

# Directory setup
mkdir -p scripts/data/db

# Step 1: Test with one year
echo "Step 1: Testing with 2023 data..."
python scripts/test_process.py
if [ $? -ne 0 ]; then
    echo "ERROR: Test processing failed. Aborting."
    exit 1
fi

echo
echo "Test successful. Moving to full processing."
echo

# Step 2: Ask for confirmation before processing all years
read -p "Process all years (2006-2023)? This may take several hours. (y/n) " confirm
if [[ $confirm != [yY] && $confirm != [yY][eE][sS] ]]; then
    echo "Aborted by user."
    exit 0
fi

# Step 3: Process all years in parallel
echo
echo "Step 2: Processing all years in parallel..."
# Get number of available CPUs
CPU_COUNT=$(nproc)
WORKERS=$((CPU_COUNT - 1))
if [ $WORKERS -lt 1 ]; then
    WORKERS=1
fi

echo "Using $WORKERS worker processes"
python scripts/parallel_process.py --workers $WORKERS
if [ $? -ne 0 ]; then
    echo "ERROR: Parallel processing failed. Aborting."
    exit 1
fi

# Step 4: Verify database
echo
echo "Step 3: Verifying database..."
DB_PATH="scripts/data/db/fertility_education.db"
if [ -f "$DB_PATH" ]; then
    DB_SIZE=$(du -h "$DB_PATH" | cut -f1)
    echo "Database created successfully: $DB_PATH ($DB_SIZE)"
    
    # Show table counts
    echo
    echo "Database Contents:"
    echo "- Fertility Rates: $(sqlite3 $DB_PATH "SELECT COUNT(*) FROM fertility_rates") records"
    echo "- Education Groups: $(sqlite3 $DB_PATH "SELECT COUNT(*) FROM education_groups") records"
    echo "- States: $(sqlite3 $DB_PATH "SELECT COUNT(*) FROM states") records"
    echo
    echo "Sample Data (National Trends):"
    sqlite3 $DB_PATH "SELECT * FROM national_trends LIMIT 10"
else
    echo "ERROR: Database not found at $DB_PATH"
    exit 1
fi

echo
echo "==== Data Processing Complete ===="
echo "The database is ready for use in the dashboard."
echo 