# Data Dictionary

This document provides detailed information about the processed datasets used in the data dashboard project.

## FDA Substances Dataset
**File:** `processed_fda_substances.csv`  
**Records:** 3,971 (3,972 including header)  
**Description:** Contains information about FDA-regulated substances and their regulatory status.
**Year Range:** 1990-1997

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| cas_reg_no_(or_other_id) | Chemical Abstracts Service Registry Number or alternative identifier | String |
| substance | Name of the regulated substance | String |
| other_names | Alternative names for the substance | String |
| used_for_(technical_effect) | Technical purposes or effects of the substance (raw) | String |
| technical_effects | Standardized list of technical effects (processed) | List[String] |
| fema_no | Flavor and Extract Manufacturers Association number | String |
| gras_pub_no | GRAS Publication Number | String |
| most_recent_gras_pub_update | Date of most recent GRAS publication update | String |
| fema_status | Current FEMA status | String |
| jecfa_flavor_number | Joint FAO/WHO Expert Committee on Food Additives flavor number | String |
| cas_reg_no | Standardized CAS Registry Number (Note: Currently stored in a non-standard format) | String |

### Technical Effects Distribution
Based on analysis of the dataset:
- FLAVOR: 77.5% of substances (3,077)
- TEXTURE: 7.4% of substances (292)
- PROCESSING: 5.6% of substances (222)
- NUTRIENT: 4.8% of substances (189)
- COLOR: 3.2% of substances (128)
- PRESERVATIVE: 2.9% of substances (114)

### Year Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| gras_pub_no_year | Extracted year from GRAS publication number | Integer |
| most_recent_gras_pub_update_year | Extracted year from GRAS update | Integer |
| reg_administrative_year | Extracted year from administrative info | Integer |
| regs_labeling_&_standards_year | Extracted year from labeling standards | Integer |
| approval_year | Final determined approval year | Integer |

### Regulatory Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| reg_col01 through reg_col06 | Primary regulatory classifications | String |
| reg_add01 through reg_add14, reg_add16 through reg_add20 | Additional regulatory information | String |
| reg_prohibited189 | Prohibited substance status | String |
| reg_administrative | Administrative regulatory information | String |
| regs_labeling_&_standards | Labeling and standards information | String |

### Metadata Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| data_source | Origin of the data (always 'FDA_SUBSTANCES') | String |
| processed_timestamp | When the record was processed | DateTime |

## FDA Approvals Summary Dataset
**File:** `fda_approvals_by_year.csv`  
**Records:** 33 (34 including header)  
**Description:** Annual summary of FDA substance approvals and cumulative totals.

### Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| year | Calendar year | Integer |
| new_approvals | Number of new substances approved in the year | Float |
| cumulative_approvals | Total approved substances up to and including the year | Float |
| pct_change | Percentage change in cumulative approvals from previous year | Float |

### Notes
- Covers the period from 1990 to 2022
- Shows significant approval activity from 1990-1997
- No new approvals recorded after 1997
- Final cumulative total (2,713) differs from the full substances dataset count (3,971)

## FSIS Recalls Dataset
**File:** `processed_fsis_recalls.csv`  
**Records:** 628 (629 including header)  
**Description:** Food Safety and Inspection Service recall incidents and details.

### Risk Level Distribution
- High - Class I: 919 recalls
- Low - Class II: 255 recalls
- Public Health Alert: 118 recalls
- Marginal - Class III: 72 recalls

### Top Recall Reasons
1. Product Contamination: 530 recalls
2. Misbranding, Unreported Allergens: 372 recalls
3. Produced Without Benefit of Inspection: 144 recalls
4. Misbranding: 76 recalls
5. Import Violation: 63 recalls

### Geographic Distribution (Top 10 States)
1. California: 211 recalls
2. Texas: 168 recalls
3. New York: 143 recalls
4. Pennsylvania: 125 recalls
5. Illinois: 122 recalls
6. Florida: 103 recalls
7. New Jersey: 101 recalls
8. Washington: 93 recalls
9. Ohio: 86 recalls
10. Virginia: 80 recalls

**Note:** All field names in this dataset (except `data_source`, `states`, `risk_level`, and `year`) are prefixed with `field_` to maintain consistency with the source data structure.

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| field_recall_number | Unique identifier for the recall | String |
| field_recall_date | Date the recall was initiated | Date |
| field_establishment | Name of the establishment issuing recall | String |
| field_states | Raw state information | String |
| field_product_items | Products subject to recall | String |
| field_risk_level | Raw risk level information | String |
| field_recall_classification | FDA recall classification | String |
| field_recall_reason | Reason for the recall | String |
| field_qty_recovered | Quantity of product recovered | Numeric |
| field_active_notice | Whether the recall is currently active | Boolean |
| field_closed_date | Date the recall was closed | Date |
| field_year | Year from recall date | Integer |
| year | Normalized year | Integer |
| field_closed_year | Year from closure date | Integer |

### Normalized Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| states | Standardized state information | List[String] |
| risk_level | Standardized risk level | String |

### Additional Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| field_title | Title of the recall notice | String |
| field_recall_url | URL to the recall notice | String |
| field_archive_recall | Archive status | Boolean |
| field_company_media_contact | Company media contact information | String |
| field_distro_list | Distribution list | String |
| field_en_press_release | English press release | String |
| field_labels | Product labels | String |
| field_media_contact | Media contact information | String |
| field_last_modified_date | Last modification date | Date |
| field_press_release | Press release content | String |
| field_processing | Processing information | String |
| field_recall_type | Type of recall | String |
| field_related_to_outbreak | Related outbreak information | Boolean |
| field_summary | Summary of recall | String |
| langcode | Language code | String |
| field_has_spanish | Spanish version availability | Boolean |
| data_source | Origin of the data (always 'FSIS_RECALLS') | String |

## GRAS Notices Dataset
**File:** `processed_gras_notices.csv`  
**Records:** 1,219 (1,220 including header)  
**Description:** Generally Recognized as Safe (GRAS) notifications and their status.
**Year Range:** 1998-2019

### Data Completeness
- Filing Dates: 55.5% complete
- Closure Dates: 92.5% complete

### FDA Response Distribution
- No Questions: 74.7% of notices (911)
- Cease to Evaluate: 16.4% of notices (200)
- Pending: 7.5% of notices (92)
- Other: 1.3% of notices (16)

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| gras_notice_(grn)_no. | Original GRAS Notice Number | String |
| grn_no | Normalized GRAS Notice Number | String |
| substance | Name of the substance | String |
| intended_use | Intended use in food | String |
| basis | Basis for GRAS determination | String |
| notifier | Company/entity submitting notice | String |
| date_of_filing | Submission date | Date |
| date_of_closure | Closure date | Date |
| fda's_letter | FDA response letter reference | String |
| filing_year | Year of filing | Integer |
| fda_response | FDA's standardized response type | String |

### Additional Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| notifier_address | Address of notifying entity | String |
| grn_part_1 through grn_part_7 | Different parts of GRN submission | String |
| date_of_correction_letter | Date of any correction letter | Date |
| date_additional_correspondence | First additional correspondence date | Date |
| additional_correspondence | First additional correspondence content | String |
| date_additional_correspondence_2 | Second additional correspondence date | Date |
| additional_correspondence_2 | Second additional correspondence content | String |
| date_additional_correspondence_3 | Third additional correspondence date | Date |
| additional_correspondence_3 | Third additional correspondence content | String |
| date_additional_correspondence_4 | Fourth additional correspondence date | Date |
| additional_correspondence_4 | Fourth additional correspondence content | String |
| resubmission | Resubmission status | Boolean |
| resubmitted | Resubmission information | String |
| notes | Additional notes | String |
| related_submission | Related submissions | String |
| data_source | Origin of the data (always 'GRAS_NOTICES') | String |

## WHO Obesity Data
**File:** `processed_who_obesity_data.csv`  
**Records:** 20,790 (20,791 including header)  
**Description:** World Health Organization obesity statistics by location and demographics.
**Year Range:** 1990-2022

### Data Completeness
- Gender Data: 100% complete
- Age Data: 100% complete
- Confidence Intervals: 100% complete

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| location | Country or region | String |
| year | Year of measurement | Integer |
| obesity_rate | Obesity rate per 100 people | Float |
| confidence_lower | Lower bound of confidence interval | Float |
| confidence_upper | Upper bound of confidence interval | Float |
| DIM_SEX | Gender category | String |
| DIM_AGE | Age group (Note: Uses WHO numeric codes, see Age Group Codes section) | String |
| GEO_NAME_SHORT | Short geographical name | String |
| RATE_PER_100_N | Rate per 100 people (nominal) | Float |
| RATE_PER_100_NL | Rate per 100 people (lower bound) | Float |
| RATE_PER_100_NU | Rate per 100 people (upper bound) | Float |
| data_source | Origin of the data (always 'WHO_OBESITY') | String |

### Age Group Codes
The dataset uses WHO numeric codes for age groups. These codes need further documentation and standardization. Current observations show:
- Codes range from 1 to 958
- Appear to represent different age ranges and demographic groupings
- Further documentation from WHO sources needed for complete interpretation
- Data cleaning may be required to standardize age group representations

### Metadata and Identification Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| IND_ID | Indicator ID | String |
| IND_CODE | Indicator code | String |
| IND_UUID | Unique identifier | String |
| IND_PER_CODE | Period code | String |
| DIM_TIME | Time dimension | String |
| DIM_TIME_TYPE | Type of time measurement | String |
| DIM_GEO_CODE_M49 | Geographic code (M49 standard) | String |
| DIM_GEO_CODE_TYPE | Type of geographic code | String |
| DIM_PUBLISH_STATE_CODE | Publication state code | String |
| IND_NAME | Indicator name | String |

## CDC US Obesity Dataset
**File:** `processed_cdc_obesity_data.csv`  
**Records:** 104,272 (104,273 including header)  
**Description:** Contains detailed US state-level obesity statistics with demographic breakdowns.
**Year Range:** 2011-2023
**Obesity Rate Change:** 31.48% (2011) to 37.36% (2023), +5.89% increase

### Data Completeness
- Gender Data: 100% complete
- Age Data: 85.2% complete
- Race/Ethnicity Data: 100% complete
- Income Data: 100% complete
- Education Data: 89.7% complete

### Geographic Coverage
The dataset covers 55 US states and territories, including:
- All 50 US states
- District of Columbia (DC)
- Territories: Guam (GU), Puerto Rico (PR), US Virgin Islands (VI)
- Aggregate US statistics

Latest obesity rates (2023):
- Highest: NH, AK, MT (39.2%), ME (38.9%), ND (38.7%)
- Lowest: PR (28.8%), OK (34.6%), MO (34.7%), WV (35.1%), NC (35.5%)

### Data Quality Notes
- Race/Ethnicity categories require cleaning and standardization
- Some unexpected values observed in the race/ethnicity field
- Age and education fields show partial completeness
- Consider standardizing demographic categories across all records

### Core Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| yearstart | Start year of the data point | Integer |
| yearend | End year of the data point | Integer |
| locationabbr | State abbreviation | String |
| locationdesc | Full state name | String |
| data_value | Obesity rate value | Float |
| data_value_alt | Alternative data value | Float |
| data_value_unit | Unit of measurement | String |
| data_value_type | Type of measurement | String |
| low_confidence_limit | Lower confidence interval | Float |
| high_confidence_limit | Upper confidence interval | Float |
| sample_size | Size of sample surveyed | Integer |
| total | Total population represented | Integer |
| year | Normalized year value | Integer |
| location | Normalized location name | String |

### Demographic Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| race_ethnicity | Race/ethnicity category | String |
| sex | Gender category | String |
| age_years | Age group category | String |
| income | Income bracket | String |
| education | Education level | String |
| stratificationcategory1 | Primary stratification category | String |
| stratification1 | Primary stratification value | String |
| stratificationcategoryid1 | Category ID | String |
| stratificationid1 | Stratification ID | String |

### Geographic Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| geolocation | Combined geolocation data containing latitude, longitude, and human address | JSON Object |
| locationid | Location identifier | String |

### Metadata Fields
| Column Name | Description | Data Type |
|------------|-------------|------------|
| datasource | Data source (always 'BRFSS') | String |
| class | Classification category | String |
| topic | Topic category | String |
| question | Survey question text | String |
| classid | Class identifier | String |
| topicid | Topic identifier | String |
| questionid | Question identifier | String |
| datavaluetypeid | Value type identifier | String |
| data_value_footnote_symbol | Symbol for footnote reference | String |
| data_value_footnote | Explanatory footnote text | String |

## Notes
- All datasets include a `data_source` field to track the origin of the data
- Dates are typically stored in ISO format (YYYY-MM-DD)
- Missing values are represented as empty strings or NULL values
- Some fields may contain multiple values separated by delimiters
- Record counts shown include the header row in the total count
- Commands used to verify this data dictionary:
  ```bash
  # Count records
  wc -l etl/data/processed/processed_*.csv
  
  # View and sort headers
  head -n 1 etl/data/processed/processed_fda_substances.csv | tr ',' '\n' | sort
  head -n 1 etl/data/processed/processed_fsis_recalls.csv | tr ',' '\n' | sort
  head -n 1 etl/data/processed/processed_gras_notices.csv | tr ',' '\n' | sort
  head -n 1 etl/data/processed/processed_who_obesity_data.csv | tr ',' '\n' | sort
  head -n 1 etl/data/processed/processed_cdc_obesity_data.csv | tr ',' '\n' | sort
  ```