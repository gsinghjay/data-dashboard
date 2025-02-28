# Data Dictionary

This document provides detailed information about the datasets used in the data dashboard project. The data is now stored in a SQLite database instead of CSV files.

## Database Information
**Database File:** `food_safety_dashboard.db`  
**Location:** `etl/data/db/`  
**Size:** ~62MB  
**Tables:** 5 main tables, 2 views  
**Indexes:** 7 indexes for optimized queries

### Database Tables
| Table Name | Description | Records |
|------------|-------------|---------|
| fda_substances | FDA-regulated substances and their regulatory status | 3,971 |
| fsis_recalls | Food Safety and Inspection Service recall incidents | 975 |
| gras_notices | Generally Recognized as Safe (GRAS) notifications | 1,219 |
| who_obesity_data | WHO obesity statistics by location and demographics | 20,790 |
| cdc_obesity_data | US state-level obesity statistics with demographic breakdowns | 100,464 |

### Database Views
| View Name | Description |
|-----------|-------------|
| substances_by_category | Aggregated count of substances by category |
| obesity_trend_us | US obesity trend data by year |

### Database Indexes
| Index Name | Table | Column(s) |
|------------|-------|-----------|
| idx_fda_substances_year | fda_substances | approval_year |
| idx_fsis_recalls_year | fsis_recalls | year |
| idx_gras_notices_date | gras_notices | "Date of filing" |
| idx_who_obesity_year | who_obesity_data | DIM_TIME |
| idx_who_obesity_country | who_obesity_data | GEO_NAME_SHORT |
| idx_cdc_obesity_year | cdc_obesity_data | yearstart |
| idx_cdc_obesity_location | cdc_obesity_data | locationabbr |

## FDA Substances Table
**Table:** `fda_substances`  
**Records:** 3,971  
**Description:** Contains information about FDA-regulated substances and their regulatory status.
**Year Range:** 1990-1997

### Schema
```sql
CREATE TABLE IF NOT EXISTS "fda_substances" (
  "cas_number" TEXT,
  "substance_name" TEXT,
  "other_names" TEXT,
  "technical_effects" TEXT,
  "Reg col01" TEXT,
  "Reg col02" TEXT,
  "Reg col03" TEXT,
  "Reg col04" TEXT,
  "Reg col05" TEXT,
  "Reg col06" TEXT,
  "Reg add01" TEXT,
  "Reg add02" TEXT,
  "Reg add03" TEXT,
  "Reg add04" TEXT,
  "Reg add05" TEXT,
  "Reg add06" TEXT,
  "Reg add07" TEXT,
  "Reg add08" TEXT,
  "Reg add09" TEXT,
  "Reg add10" TEXT,
  "Reg add11" TEXT,
  "Reg add12" TEXT,
  "Reg add13" TEXT,
  "Reg add14" TEXT,
  "Reg add16" TEXT,
  "Reg add17" TEXT,
  "Reg add18" TEXT,
  "Reg add19" TEXT,
  "Reg add20" TEXT,
  "Reg prohibited189" TEXT,
  "Reg Administrative" TEXT,
  "regs Labeling & Standards " TEXT,
  "FEMA No" TEXT,
  "GRAS Pub No" TEXT,
  "Most Recent GRAS Pub Update" TEXT,
  "FEMA status" TEXT,
  "JECFA Flavor Number" TEXT,
  "data_source" TEXT,
  "approval_year" REAL,
  "category" TEXT
);
```

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| cas_number | Chemical Abstracts Service Registry Number | TEXT |
| substance_name | Name of the regulated substance | TEXT |
| other_names | Alternative names for the substance | TEXT |
| technical_effects | Technical purposes or effects of the substance (stored as JSON array) | TEXT |
| category | Category of the substance (e.g., Flavor, Sweetener) | TEXT |
| approval_year | Year the substance was approved | REAL |
| data_source | Origin of the data (always 'FDA_SUBSTANCES') | TEXT |

### Technical Effects Distribution
Based on analysis of the dataset:
- Flavor: 76.3% of substances (3,028)
- Other: 7.3% of substances (290)
- Uncategorized: 4.6% of substances (183)
- Preservative: 2.9% of substances (114)
- Emulsifier: 2.8% of substances (112)
- Nutrient: 2.3% of substances (92)
- Stabilizer: 1.4% of substances (57)
- Color: 1.2% of substances (49)
- Sweetener: 0.6% of substances (23)
- pH Control: 0.5% of substances (19)

### Data Quality Notes
- Technical effects are stored as JSON arrays and need to be parsed when used
- Only 2 records have missing CAS numbers
- All substance names are present
- Some approval years are missing

## FSIS Recalls Table
**Table:** `fsis_recalls`  
**Records:** 975  
**Description:** Food Safety and Inspection Service recall incidents and details.
**Year Range:** Recent years (primarily 2023)

### Schema
```sql
CREATE TABLE IF NOT EXISTS "fsis_recalls" (
  "title" TEXT,
  "recall_number" TEXT,
  "recall_date" TIMESTAMP,
  "closed_date" TIMESTAMP,
  "establishment" TEXT,
  "risk_level_raw" TEXT,
  "recall_reason" TEXT,
  "recall_type" TEXT,
  "related_to_outbreak" INTEGER,
  "is_active" INTEGER,
  "products" TEXT,
  "processing_type" TEXT,
  "states" TEXT,
  "quantity_lbs" REAL,
  "year" INTEGER,
  "risk_level" TEXT,
  "data_source" TEXT
);
```

### Risk Level Distribution
- High - Class I: Most common risk level
- Low - Class II: Second most common
- Public Health Alert: Used for some notices
- Marginal - Class III: Least common

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| title | Title of the recall notice | TEXT |
| recall_number | Unique identifier for the recall | TEXT |
| recall_date | Date the recall was initiated | TIMESTAMP |
| closed_date | Date the recall was closed | TIMESTAMP |
| establishment | Name of the establishment issuing recall | TEXT |
| risk_level | Standardized risk level | TEXT |
| risk_level_raw | Raw risk level information | TEXT |
| recall_reason | Reason for the recall | TEXT |
| states | States affected (stored as JSON array) | TEXT |
| quantity_lbs | Quantity of product recalled in pounds | REAL |
| year | Year from recall date | INTEGER |
| data_source | Origin of the data (always 'FSIS_RECALLS') | TEXT |

### Data Quality Notes
- 110 records (11.3%) have missing quantity values
- All recall numbers are present
- States are stored as JSON arrays and need to be parsed when used
- Dates are stored in proper timestamp format

## GRAS Notices Table
**Table:** `gras_notices`  
**Records:** 1,219  
**Description:** Generally Recognized as Safe (GRAS) notifications and their status.
**Year Range:** 1998-2019

### Schema
```sql
CREATE TABLE IF NOT EXISTS "gras_notices" (
  "GRAS Notice (GRN) No." TEXT,
  "Substance" TEXT,
  "Intended Use" TEXT,
  "Basis" TEXT,
  "Notifier" TEXT,
  "Notifier Address" TEXT,
  "Date of filing" TEXT,
  "GRN Part 1" TEXT,
  "GRN Part 2" TEXT,
  "GRN Part 3" TEXT,
  "GRN Part 4" TEXT,
  "GRN Part 5" TEXT,
  "GRN Part 6" TEXT,
  "GRN Part 7" TEXT,
  "Date of closure" TEXT,
  "Date of correction letter" TEXT,
  "FDA's Letter" TEXT,
  "Date additional correspondence" TEXT,
  "Additional correspondence" TEXT,
  "Date additinoal correspondence 2" TEXT,
  "Additional correspondence 2" TEXT,
  "Date additional correspondence 3" TEXT,
  "Additional correspondence 3" TEXT,
  "Date additional correspondence 4" TEXT,
  "Additional correspondence 4" TEXT,
  "Resubmission" TEXT,
  "Resubmitted" TEXT,
  "Notes" TEXT,
  "Related submission" TEXT,
  "filing_year" REAL,
  "data_source" TEXT
);
```

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| GRAS Notice (GRN) No. | Original GRAS Notice Number (contains Excel formula artifacts) | TEXT |
| Substance | Name of the substance | TEXT |
| Intended Use | Intended use in food | TEXT |
| Basis | Basis for GRAS determination | TEXT |
| Notifier | Company/entity submitting notice | TEXT |
| Date of filing | Submission date | TEXT |
| Date of closure | Closure date | TEXT |
| FDA's Letter | FDA response letter reference | TEXT |
| filing_year | Year of filing | REAL |
| data_source | Origin of the data (always 'GRAS_NOTICES') | TEXT |

### Data Quality Notes
- GRN numbers have Excel formula artifacts (=T("1")) that should be cleaned
- Some fields contain HTML tags that should be properly rendered or stripped
- All substance values are present
- Filing years are properly calculated

## WHO Obesity Data Table
**Table:** `who_obesity_data`  
**Records:** 20,790  
**Description:** World Health Organization obesity statistics by location and demographics.
**Year Range:** 1990-2022

### Schema
```sql
CREATE TABLE IF NOT EXISTS "who_obesity_data" (
  "IND_ID" TEXT,
  "IND_CODE" TEXT,
  "IND_UUID" TEXT,
  "IND_PER_CODE" TEXT,
  "DIM_TIME" INTEGER,
  "DIM_TIME_TYPE" TEXT,
  "DIM_GEO_CODE_M49" INTEGER,
  "DIM_GEO_CODE_TYPE" TEXT,
  "DIM_PUBLISH_STATE_CODE" TEXT,
  "IND_NAME" TEXT,
  "GEO_NAME_SHORT" TEXT,
  "DIM_SEX" TEXT,
  "DIM_AGE" TEXT,
  "RATE_PER_100_N" REAL,
  "RATE_PER_100_NL" REAL,
  "RATE_PER_100_NU" REAL,
  "data_source" TEXT
);
```

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| DIM_TIME | Year of measurement | INTEGER |
| GEO_NAME_SHORT | Country or region name | TEXT |
| DIM_SEX | Gender category (MALE, FEMALE, TOTAL) | TEXT |
| DIM_AGE | Age group (e.g., Y_GE18 for 18 years and older) | TEXT |
| RATE_PER_100_N | Obesity rate per 100 people (nominal) | REAL |
| RATE_PER_100_NL | Obesity rate per 100 people (lower bound) | REAL |
| RATE_PER_100_NU | Obesity rate per 100 people (upper bound) | REAL |
| data_source | Origin of the data (always 'WHO_OBESITY') | TEXT |

### Data Quality Notes
- No missing rate values
- Country names, sex, and age categories are standardized
- Years are properly formatted as integers

## CDC Obesity Data Table
**Table:** `cdc_obesity_data`  
**Records:** 100,464  
**Description:** Contains detailed US state-level obesity statistics with demographic breakdowns.
**Year Range:** 2011-2023

### Schema
```sql
CREATE TABLE IF NOT EXISTS "cdc_obesity_data" (
  "yearstart" INTEGER,
  "yearend" INTEGER,
  "locationabbr" TEXT,
  "locationdesc" TEXT,
  "datasource" TEXT,
  "class" TEXT,
  "topic" TEXT,
  "question" TEXT,
  "data_value_unit" INTEGER,
  "data_value_type" TEXT,
  "data_value" REAL,
  "data_value_alt" REAL,
  "low_confidence_limit" REAL,
  "high_confidence_limit" REAL,
  "sample_size" REAL,
  "race_ethnicity" TEXT,
  "geolocation" TEXT,
  "classid" TEXT,
  "topicid" TEXT,
  "questionid" TEXT,
  "datavaluetypeid" TEXT,
  "locationid" INTEGER,
  "stratificationcategory1" TEXT,
  "stratification1" TEXT,
  "stratificationcategoryid1" TEXT,
  "stratificationid1" TEXT,
  "sex" TEXT,
  "age_years" TEXT,
  "income" TEXT,
  "education" TEXT,
  "data_value_footnote_symbol" TEXT,
  "data_value_footnote" TEXT,
  "total" TEXT,
  "year" INTEGER,
  "location" TEXT,
  "data_source" TEXT
);
```

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| yearstart | Start year of the data point | INTEGER |
| yearend | End year of the data point | INTEGER |
| locationabbr | State abbreviation | TEXT |
| locationdesc | Full state name | TEXT |
| topic | Topic category (e.g., "Obesity / Weight Status") | TEXT |
| question | Survey question text | TEXT |
| data_value | Obesity rate value | REAL |
| low_confidence_limit | Lower confidence interval | REAL |
| high_confidence_limit | Upper confidence interval | REAL |
| sample_size | Size of sample surveyed | REAL |
| year | Normalized year value | INTEGER |
| location | Normalized location name | TEXT |
| data_source | Origin of the data (always 'CDC_OBESITY') | TEXT |

### Demographic Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| race_ethnicity | Race/ethnicity category | TEXT |
| sex | Gender category | TEXT |
| age_years | Age group category | TEXT |
| income | Income bracket | TEXT |
| education | Education level | TEXT |

### Data Quality Notes
- 9,815 records (9.8%) have missing data values
- Some demographic fields (sex, age_years) have missing values
- Topics and questions are consistent
- Location abbreviations are standardized

## Database Views

### Substances by Category View
```sql
CREATE VIEW substances_by_category AS
  SELECT 
    category,
    COUNT(*) as count
  FROM 
    fda_substances
  WHERE 
    category IS NOT NULL
  GROUP BY 
    category
  ORDER BY 
    count DESC;
```

### Obesity Trend US View
```sql
CREATE VIEW obesity_trend_us AS
  SELECT 
    yearstart as year,
    AVG(data_value) as avg_obesity_rate
  FROM 
    cdc_obesity_data
  WHERE 
    topic = 'Obesity / Weight Status' AND
    question LIKE '%obesity%' AND
    data_value IS NOT NULL AND
    locationabbr = 'US'
  GROUP BY 
    yearstart
  ORDER BY 
    yearstart;
```

## Accessing the Database

### SQLite Command Line
```bash
# Connect to the database
sqlite3 etl/data/db/food_safety_dashboard.db

# List all tables
.tables

# View schema
.schema

# Run a query
SELECT * FROM fda_substances LIMIT 5;
```

### JavaScript/Node.js (with better-sqlite3)
```javascript
const Database = require('better-sqlite3');
const db = new Database('etl/data/db/food_safety_dashboard.db');

// Query example
const substances = db.prepare('SELECT * FROM fda_substances LIMIT 5').all();
console.log(substances);

// Close the connection when done
db.close();
```

### Python (with sqlite3)
```python
import sqlite3

# Connect to the database
conn = sqlite3.connect('etl/data/db/food_safety_dashboard.db')
cursor = conn.cursor()

# Query example
cursor.execute('SELECT * FROM fda_substances LIMIT 5')
substances = cursor.fetchall()
print(substances)

# Close the connection when done
conn.close()
```

## Notes
- All datasets include a `data_source` field to track the origin of the data
- Dates are typically stored in ISO format (YYYY-MM-DD) or as TIMESTAMP
- Missing values are represented as NULL values in the database
- Some fields contain JSON arrays that need to be parsed when used (e.g., technical_effects, states)
- The database includes indexes on commonly queried fields for better performance
- Views provide pre-aggregated data for common queries