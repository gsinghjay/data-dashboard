# ACS PUMS Data Verification: 2006-2023

This document summarizes the verification of key data columns in the ACS PUMS person-level files from 2006-2023 and compares them against the data dictionary provided in `data-dictionary.md`.

## Verification Summary

All key columns (**SEX**, **AGEP**, **SCHL**, **FER**, **PWGTP**, and **ST/STATE**) are present in all years from 2006-2023, though their positions in the CSV structure vary between certain years. In 2023, the state column is named "STATE" instead of "ST".

## Column Positions by Year

| Year | ST/STATE | PWGTP | AGEP | FER | SCHL | SEX |
|------|----------|-------|------|-----|------|-----|
| 2006 | 5 (ST)   | 7     | 8    | 18  | 53   | 55  |
| 2007 | 5 (ST)   | 7     | 8    | 18  | 53   | 55  |
| 2008 | 5 (ST)   | 7     | 8    | 21  | 67   | 69  |
| 2009 | 5 (ST)   | 7     | 8    | 21  | 67   | 69  |
| 2010 | 5 (ST)   | 7     | 8    | 21  | 67   | 69  |
| 2011 | 5 (ST)   | 7     | 8    | 21  | 67   | 69  |
| 2012 | 5 (ST)   | 7     | 8    | 21  | 67   | 69  |
| 2013 | 5 (ST)   | 7     | 8    | 21  | 65   | 67  |
| 2014 | 5 (ST)   | 7     | 8    | 21  | 65   | 67  |
| 2015 | 5 (ST)   | 7     | 8    | 21  | 65   | 67  |
| 2016 | 5 (ST)   | 7     | 8    | 21  | 66   | 68  |
| 2017 | 7 (ST)   | 9     | 10   | 23  | 67   | 69  |
| 2018 | 7 (ST)   | 9     | 10   | 23  | 67   | 69  |
| 2019 | 7 (ST)   | 9     | 10   | 23  | 68   | 70  |
| 2020 | 7 (ST)   | 9     | 10   | 23  | 68   | 70  |
| 2021 | 7 (ST)   | 9     | 10   | 23  | 67   | 69  |
| 2022 | 7 (ST)   | 9     | 10   | 23  | 67   | 69  |
| 2023 | 7 (STATE)| 9     | 10   | 23  | 67   | 69  |

**Note**: There are significant column position changes between years:
- Between 2007-2008
- Minor changes between 2012-2013
- Minor changes between 2015-2016
- Major changes between 2016-2017
- Minor changes between 2018-2019
- Minor changes between 2020-2021
- Column name change in 2023 (ST → STATE)

## Column Values Verification

### 1. SEX
- **Data Dictionary**: 1 = Male, 2 = Female
- **Actual Data**: Confirmed values are 1 and 2 in all years checked (2006-2023)
- **Verdict**: ✅ Data dictionary is accurate

### 2. AGEP
- **Data Dictionary**: Age in years, integer values (0-99+)
- **Observed in samples**: Values like 19, 33, 25, 9, etc.
- **Verdict**: ✅ Data dictionary is accurate

### 3. SCHL (Educational Attainment)
- **Data Dictionary**: Values 01-24 representing different education levels
- **Actual Data**: Values range from 1.0 to 24.0, matching the data dictionary's categories
- **Verdict**: ✅ Data dictionary is accurate, though values are stored as decimals (e.g., 16.0 rather than 16)

### 4. FER (Birth in Past 12 Months)
- **Data Dictionary**: Empty values = N/A (male or age < 15 or > 50), 1 = Yes, 2 = No
- **Actual Data**: Empty values (representing N/A), 1.0 (Yes), and 2.0 (No)
- **Verdict**: ✅ Data dictionary is accurate

### 5. PWGTP (Person's Weight)
- **Data Dictionary**: Numeric weight for population estimation
- **Actual Data**: Numeric values like 73, 87, 66, etc.
- **Verdict**: ✅ Data dictionary is accurate

### 6. ST/STATE (State FIPS Codes)
- **Data Dictionary**: Numeric FIPS codes (01-56) for states
- **Actual Data**: Numeric values like 1 (seen in samples)
- **Column Name**: "ST" in 2006-2022, "STATE" in 2023
- **Verdict**: ✅ Data dictionary is accurate, though column name changes in 2023

## Important Considerations for Data Processing

1. **Column Position Changes**: Scripts must account for the different column positions across years, particularly the significant shifts between 2007-2008 and 2016-2017.
2. **Column Name Change**: In 2023, the state column is named "STATE" instead of "ST" but serves the same purpose.
3. **Decimal Format**: Some numeric values are stored with decimal points (e.g., 16.0 instead of 16).
4. **Missing Values**: For FER, empty/blank values are used instead of a specific code for N/A cases.
5. **Data Types**: When importing the data, ensure appropriate type conversion (e.g., converting "1.0" to 1 for categorical variables).

## Conclusion

The data dictionary in `data-dictionary.md` accurately describes the key columns in the 2006-2023 ACS PUMS files, with minor format differences noted above. These findings will guide the development of our data extraction and processing scripts to ensure consistent handling across all years. 