# Data Verification Report
Generated: 2025-02-14 01:05:35

## FDA Substances
- Total Records: 3,971
- CAS Number Validation Rate: 82.5%
- Year Range: 1990 - 1997

### Technical Effects Distribution
- FLAVOR: 3,077 (77.5%)
- TEXTURE: 292 (7.4%)
- PROCESSING: 222 (5.6%)
- NUTRIENT: 189 (4.8%)
- COLOR: 128 (3.2%)
- PRESERVATIVE: 114 (2.9%)

## GRAS Notices
- Total Records: 1,219
- Filing Dates Validation: 55.5%
- Closure Dates Validation: 92.5%
- Year Range: 1998 - 2019

### FDA Response Distribution
- no questions: 911 (74.7%)
- cease to evaluate: 200 (16.4%)
- pending: 92 (7.5%)
- other: 16 (1.3%)

## Obesity Data

### WHO Statistics
- Total Records: 20,790
- Year Range: 1990 - 2022

### CDC Statistics
- Total Records: 104,272
- Year Range: 2011 - 2023
- Obesity Rate Change:
  - 2011: 31.48%
  - 2023: 37.36%
  - Change: +5.89%

## CSV Headers

### processed_fda_substances.csv
1. cas_reg_no_(or_other_id)
2. substance
3. other_names
4. used_for_(technical_effect)
5. reg_col01
6. reg_col02
7. reg_col03
8. reg_col04
9. reg_col05
10. reg_col06
11. reg_add01
12. reg_add02
13. reg_add03
14. reg_add04
15. reg_add05
16. reg_add06
17. reg_add07
18. reg_add08
19. reg_add09
20. reg_add10
21. reg_add11
22. reg_add12
23. reg_add13
24. reg_add14
25. reg_add16
26. reg_add17
27. reg_add18
28. reg_add19
29. reg_add20
30. reg_prohibited189
31. reg_administrative
32. regs_labeling_&_standards
33. fema_no
34. gras_pub_no
35. most_recent_gras_pub_update
36. fema_status
37. jecfa_flavor_number
38. cas_reg_no
39. technical_effects
40. gras_pub_no_year
41. most_recent_gras_pub_update_year
42. reg_administrative_year
43. regs_labeling_&_standards_year
44. approval_year
45. data_source
46. processed_timestamp

### processed_cdc_obesity_data.csv
1. yearstart
2. yearend
3. locationabbr
4. locationdesc
5. datasource
6. class
7. topic
8. question
9. data_value_unit
10. data_value_type
11. data_value
12. data_value_alt
13. low_confidence_limit
14. high_confidence_limit
15. sample_size
16. race_ethnicity
17. geolocation
18. classid
19. topicid
20. questionid
21. datavaluetypeid
22. locationid
23. stratificationcategory1
24. stratification1
25. stratificationcategoryid1
26. stratificationid1
27. sex
28. age_years
29. income
30. education
31. data_value_footnote_symbol
32. data_value_footnote
33. total
34. year
35. location

### fda_approvals_by_year.csv
1. year
2. new_approvals
3. cumulative_approvals
4. pct_change

### processed_gras_notices.csv
1. gras_notice_(grn)_no.
2. substance
3. intended_use
4. basis
5. notifier
6. notifier_address
7. date_of_filing
8. grn_part_1
9. grn_part_2
10. grn_part_3
11. grn_part_4
12. grn_part_5
13. grn_part_6
14. grn_part_7
15. date_of_closure
16. date_of_correction_letter
17. fda's_letter
18. date_additional_correspondence
19. additional_correspondence
20. date_additinoal_correspondence_2
21. additional_correspondence_2
22. date_additional_correspondence_3
23. additional_correspondence_3
24. date_additional_correspondence_4
25. additional_correspondence_4
26. resubmission
27. resubmitted
28. notes
29. related_submission
30. filing_year
31. grn_no
32. fda_response
33. data_source
34. processed_timestamp

### processed_who_obesity_data.csv
1. IND_ID
2. IND_CODE
3. IND_UUID
4. IND_PER_CODE
5. DIM_TIME
6. DIM_TIME_TYPE
7. DIM_GEO_CODE_M49
8. DIM_GEO_CODE_TYPE
9. DIM_PUBLISH_STATE_CODE
10. IND_NAME
11. GEO_NAME_SHORT
12. DIM_SEX
13. DIM_AGE
14. RATE_PER_100_N
15. RATE_PER_100_NL
16. RATE_PER_100_NU
17. year
18. location
19. obesity_rate
20. confidence_lower
21. confidence_upper
22. data_source

### processed_fsis_recalls.csv
1. title
2. recall_number
3. recall_date
4. closed_date
5. establishment
6. risk_level_raw
7. recall_reason
8. recall_type
9. related_to_outbreak
10. is_active
11. products
12. processing_type
13. states
14. quantity_lbs
15. year
16. risk_level
17. data_source


## Correlation Analysis

### Food Safety Regulations vs Obesity Rates

#### Fda Approvals vs Obesity Rate
- Correlation Coefficient: Insufficient data
- Statistical Significance (p-value): Not applicable
- Time Period Analyzed: Insufficient data for correlation (0 years)

#### Gras Notices vs Obesity Rate
- Correlation Coefficient: Insufficient data
- Statistical Significance (p-value): Not applicable
- Time Period Analyzed: Insufficient data for correlation (0 years)

#### Recalls vs Obesity Rate
- Correlation Coefficient: Insufficient data
- Statistical Significance (p-value): Not applicable
- Time Period Analyzed: Insufficient data for correlation (0 years)

## Food Safety Risk Analysis

### Recall Risk Levels
- High - Class I: 919
- Low - Class II: 255
- Public Health Alert: 118
- Marginal - Class III: 72

### Top Recall Reasons
- Product Contamination: 530
- Misbranding, Unreported Allergens: 372
- Produced Without Benefit of Inspection: 144
- Misbranding: 76
- Import Violation: 63

## Detailed Obesity Analysis

### States with Highest Obesity Rates (Latest Year)
- NH: 39.2%
- AK: 39.2%
- MT: 39.2%
- ME: 38.9%
- ND: 38.7%

### States with Lowest Obesity Rates (Latest Year)
- PR: 28.8%
- OK: 34.6%
- MO: 34.7%
- WV: 35.1%
- NC: 35.5%
