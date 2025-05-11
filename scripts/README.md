# Data Processing Scripts

This directory contains scripts for processing the ACS PUMS data files and creating an SQLite database for the Educational Attainment and Fertility Rate Dashboard.

## Scripts Overview

- `process_data.py` - Main script for processing the ACS PUMS data files
- `test_process.py` - Tests the processing script with a single year of data
- `test_process_2022.py` - Test script with more detailed metrics for 2022
- `test_specific_year.py` - Configurable test script to process any specific year with detailed metrics
- `process_all_years_sequentially.sh` - Shell script to process all years one by one
- `combine_databases.py` - Combines individual year databases into a final comprehensive database

## Data Processing Approach

The data processing workflow follows these steps:

1. **Data Extraction**: Read the CSV files for each year, handling year-specific column positions
2. **Data Filtering**: Filter to women of reproductive age (15-50)
3. **Data Aggregation**: Calculate fertility rates by education level, state, and year
4. **Database Creation**: Create an optimized SQLite database with appropriate tables, indices, and views

## Database Schema

The SQLite database contains the following tables and views:

### Tables

- **fertility_rates**: Main table with fertility rates by year, state, and education group
  - `id`: Primary key
  - `year`: Year (2006-2023)
  - `state_code`: State FIPS code
  - `state_name`: State name
  - `education_group`: Education level group
  - `women_count`: Weighted count of women
  - `births`: Weighted count of births
  - `fertility_rate`: Fertility rate per 1,000 women

- **education_groups**: Lookup table for education level groups
  - `id`: Primary key
  - `name`: Group name
  - `schl_codes`: Comma-separated list of SCHL codes in this group
  - `display_order`: Order for display

- **states**: Lookup table for state codes and names
  - `code`: State FIPS code (primary key)
  - `name`: State name

### Views

- **national_trends**: National fertility trends by education level and year
- **state_comparison**: State comparison for the most recent year
- **education_comparison**: Education comparison across all years

## Education Level Groupings

The SCHL codes from the ACS PUMS data are grouped into the following education level categories:

1. **Less than High School**: SCHL codes 01-15
2. **High School Diploma**: SCHL codes 16-17
3. **Some College**: SCHL codes 18-19
4. **Associate's Degree**: SCHL code 20
5. **Bachelor's Degree**: SCHL code 21
6. **Master's Degree**: SCHL code 22
7. **Professional/Doctorate Degree**: SCHL codes 23-24

## Note on 2006-2007 Data

While our database contains data from 2006-2007, these years only include information for two education categories ("Less than High School" and "High School Diploma") rather than the full seven categories available from 2008 onward. For consistency in analysis and visualization, our primary focus is on the 2008-2023 period.

## Usage

### Running the Test Script for a Specific Year

To test the data processing with a specific year:

```bash
python scripts/test_specific_year.py 2023
```

### Processing All Years Sequentially

To process all years sequentially:

```bash
./scripts/process_all_years_sequentially.sh
```

This will:
1. Process each year's data (2006-2023) one by one
2. Calculate fertility rates for each year
3. Create individual SQLite databases for each year

### Combining Individual Databases

After processing all years individually, combine them into a final database:

```bash
python scripts/combine_databases.py
```

This will create the combined SQLite database at `scripts/data/db/fertility_education.db`

### Expected Runtime

- Test script (single year): ~5-10 minutes
- Full sequential processing (all years): Several hours, depending on system performance
- Database combination: ~10-15 minutes

The scripts include logging to track progress and identify any issues. The logs are saved to:
- `acs_data_processing.log` - Log for individual year processing
- `combine_databases.log` - Log for database combination process 