# Data Processing Scripts

This directory contains scripts for processing the ACS PUMS data files and creating an SQLite database for the Educational Attainment and Fertility Rate Dashboard.

## Scripts Overview

- `download_acs_pumps.py` - Downloads ACS PUMS data files from the Census Bureau website
- `process_data.py` - Processes the downloaded data files and creates an SQLite database
- `test_process.py` - Tests the processing script with a single year of data

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

## Usage

### Running the Test Script

To test the data processing with just one year (2023):

```bash
python scripts/test_process.py
```

### Processing All Years

To process all years and create the complete database:

```bash
python scripts/process_data.py
```

This will:
1. Process each year's data (2006-2023)
2. Calculate fertility rates
3. Create the SQLite database at `scripts/data/db/fertility_education.db`

### Expected Runtime

- Test script (single year): ~5-10 minutes
- Full processing (all years): Several hours, depending on system performance

The script includes logging to track progress and identify any issues. 