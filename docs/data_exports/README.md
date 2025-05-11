# Data Exports for Education and Fertility Dashboard

This directory contains CSV exports from our SQLite database to help with visualization design. Below is a description of each file:

## Core Reference Tables

1. **education_groups.csv**
   - Contains the 7 education categories with their display order
   - Fields: id, name, schl_codes, display_order

2. **states.csv**
   - Contains all 51 geographic entities (50 states + DC) with their codes
   - Fields: code, name

## Aggregated Data Views

3. **national_trends.csv**
   - National-level data aggregated by year and education group (2006-2023)
   - Fields: year, education_group, total_women, total_births, fertility_rate

4. **state_comparison.csv**
   - Most recent year's data (2023) for comparing states across education levels
   - Fields: state_code, state_name, education_group, women_count, births, fertility_rate

5. **education_comparison.csv**
   - Education-level comparisons across all years
   - Fields: year, education_group, total_women, total_births, fertility_rate

## Specialized Datasets

6. **fertility_rates_sample.csv**
   - Sample of raw fertility rate data from selected years (2008, 2015, 2023)
   - Fields: year, state_name, education_group, women_count, births, fertility_rate

7. **pandemic_comparison.csv**
   - Comparison of pre-pandemic and pandemic years (2019-2021) by education level
   - Fields: year, education_group, total_women, total_births, fertility_rate

8. **highest_bachelors_states.csv**
   - Top 10 states with highest fertility rates for women with Bachelor's degrees
   - Fields: state_name, education_group, fertility_rate

9. **lowest_bachelors_states.csv**
   - Top 10 states with lowest fertility rates for women with Bachelor's degrees
   - Fields: state_name, education_group, fertility_rate

## Data Definitions

- **fertility_rate**: Births per 1,000 women aged 15-50
- **women_count/total_women**: Weighted count of women in the sample
- **births/total_births**: Weighted count of births in the past 12 months
- **education_group**: One of the 7 education categories
- **year**: Year of the data (2006-2023)
- **state_name/state_code**: State name or FIPS code

## Key Insights From The Data

1. **Education-Fertility Relationship**
   - Professional/Doctorate degree holders have the highest fertility rate (64.76 in 2023)
   - Less than High School has the lowest fertility rate (31.91 in 2023)
   - The relationship is not linear - fertility generally rises with education level

2. **Time Trends**
   - Overall fertility has declined from 58.44 (2008) to 51.21 (2023)
   - "Less than High School" shows the most dramatic decline
   - Higher education levels maintain more stable rates over time

3. **Geographic Patterns**
   - Significant regional variations (e.g., Utah's 82.5 vs. DC's 18.82 for Bachelor's)
   - States ranking high for one education level may rank differently for others
   - Regional clusters suggest cultural and economic influences

4. **Pandemic Effects**
   - Different impacts across education groups
   - Higher education levels showed more resilience
   - "Professional/Doctorate" had the strongest recovery 