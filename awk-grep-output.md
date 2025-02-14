# Data Analysis Results

## Basic Data Exploration

### CSV Headers
```
FDA Substances Headers:
cas_reg_no_(or_other_id),substance,other_names,used_for_(technical_effect),reg_col01,reg_col02,reg_col03,reg_col04,reg_col05,reg_col06,reg_add01,reg_add02,reg_add03,reg_add04,reg_add05,reg_add06,reg_add07,reg_add08,reg_add09,reg_add10,reg_add11,reg_add12,reg_add13,reg_add14,reg_add16,reg_add17,reg_add18,reg_add19,reg_add20,reg_prohibited189,reg_administrative,regs_labeling_&_standards,fema_no,gras_pub_no,most_recent_gras_pub_update,fema_status,jecfa_flavor_number,cas_reg_no,technical_effects,gras_pub_no_year,most_recent_gras_pub_update_year,reg_administrative_year,regs_labeling_&_standards_year,approval_year,data_source,processed_timestamp

GRAS Notices Headers:
gras_notice_(grn)_no.,substance,intended_use,basis,notifier,notifier_address,date_of_filing,grn_part_1,grn_part_2,grn_part_3,grn_part_4,grn_part_5,grn_part_6,grn_part_7,date_of_closure,date_of_correction_letter,fda's_letter,date_additional_correspondence,additional_correspondence,date_additinoal_correspondence_2,additional_correspondence_2,date_additional_correspondence_3,additional_correspondence_3,date_additional_correspondence_4,additional_correspondence_4,resubmission,resubmitted,notes,related_submission,filing_year,grn_no,fda_response,data_source,processed_timestamp

WHO Obesity Headers:
IND_ID,IND_CODE,IND_UUID,IND_PER_CODE,DIM_TIME,DIM_TIME_TYPE,DIM_GEO_CODE_M49,DIM_GEO_CODE_TYPE,DIM_PUBLISH_STATE_CODE,IND_NAME,GEO_NAME_SHORT,DIM_SEX,DIM_AGE,RATE_PER_100_N,RATE_PER_100_NL,RATE_PER_100_NU,year,location,obesity_rate,confidence_lower,confidence_upper,data_source

CDC Obesity Headers:
yearstart,yearend,locationabbr,locationdesc,datasource,class,topic,question,data_value_unit,data_value_type,data_value,data_value_alt,low_confidence_limit,high_confidence_limit,sample_size,race_ethnicity,geolocation,classid,topicid,questionid,datavaluetypeid,locationid,stratificationcategory1,stratification1,stratificationcategoryid1,stratificationid1,sex,age_years,income,education,data_value_footnote_symbol,data_value_footnote,total,year,location

GRAS Notices Column Numbers:
     1	gras_notice_(grn)_no.
     2	substance
     3	intended_use
     4	basis
     5	notifier
     6	notifier_address
     7	date_of_filing
     8	grn_part_1
     9	grn_part_2
    10	grn_part_3
    11	grn_part_4
    12	grn_part_5
    13	grn_part_6
    14	grn_part_7
    15	date_of_closure
    16	date_of_correction_letter
    17	fda's_letter
    18	date_additional_correspondence
    19	additional_correspondence
    20	date_additinoal_correspondence_2
    21	additional_correspondence_2
    22	date_additional_correspondence_3
    23	additional_correspondence_3
    24	date_additional_correspondence_4
    25	additional_correspondence_4
    26	resubmission
    27	resubmitted
    28	notes
    29	related_submission
    30	filing_year
    31	grn_no
    32	fda_response
    33	data_source
    34	processed_timestamp
```

## FDA Substances Analysis

### Record Count
```
Total FDA substances (excluding header):
3971
```

### Technical Effects Distribution
```
FLAVOR: 3078
TEXTURE: 292
PROCESSING: 222
NUTRIENT: 189
COLOR: 129
PRESERVATIVE: 114
```

### Year Range Analysis
```
Earliest approval year:
1990
Latest approval year:
1997
```

## GRAS Notices Analysis

### Record Count
```
Total GRAS notices (excluding header):
1219
```

### Date Analysis
```
Filing date range:
Earliest year:
1998
Latest year:
2014

Sample of dates and years (first 10 records):
"=T(""1"")",Archer Daniels Midland Company,
"=T(""2"")", and other food products",
"=T(""3"")", OH 43465",
"=T(""4"")", NW; Suite 416; Washington,
"=T(""5"")",Hawaii International Seafood Inc.,
"=T(""6"")","Five Garret Mountain Plaza; West Paterson,
"=T(""7"")", PA 19087",
"=T(""8"")", NC 27525-0576",
"=T(""9"")", IL 60192",
"=T(""10"")",1998-10-28,1998.0
```

## Obesity Data Analysis

### Record Counts
```
WHO data: 20790
CDC data: 104272
```

### Average US Obesity Rates
```
2011: 31.48%
2023: 37.36%
```

### Year Range Analysis
```
WHO data year range:
Earliest year:
1990
Latest year:
2022

CDC data year range:
Earliest year:
2011
Latest year:
2023
```

## Advanced Statistical Analysis

### Basic Statistics
```
Mean: 31.85%
Std Dev: 10.42%
Count: 93505
```

### Median Obesity Rate
```
Median: 28.90%
```

### Demographic Analysis
| Gender   | Age Group       | Avg Rate | Count |
|----------|-----------------|----------|-------|
| Percent of adults aged 18 years and older who have an overweight classification | 2016            |    34.61 |  1389 |
| Percent of adults aged 18 years and older who have an overweight classification | 2017            |    34.51 |  1372 |
| Percent of adults aged 18 years and older who have an overweight classification | 2018            |    34.10 |  1369 |
| Percent of adults aged 18 years and older who have an overweight classification | 2019            |    34.13 |  1343 |
| Percent of adults aged 18 years and older who have obesity | 2020            |    32.41 |  1368 |
| Percent of adults aged 18 years and older who have obesity | 2021            |    34.03 |  1377 |
| Percent of adults who report consuming vegetables less than one time daily | 2017            |    19.90 |  1369 |
| Percent of adults who report consuming vegetables less than one time daily | 2019            |    21.97 |  1334 |
| Percent of adults who report consuming fruit less than one time daily | 2021            |    41.22 |  1372 |
| Percent of adults who engage in muscle-strengthening activities on 2 or more days a week | 2011            |    29.24 |  1332 |
| Percent of adults who engage in muscle-strengthening activities on 2 or more days a week | 2013            |    29.65 |  1315 |
| Percent of adults who engage in muscle-strengthening activities on 2 or more days a week | 2015            |    30.02 |  1356 |
| Percent of adults who engage in muscle-strengthening activities on 2 or more days a week | 2017            |    29.88 |  1369 |
| Percent of adults who engage in muscle-strengthening activities on 2 or more days a week | 2019            |    34.78 |  1340 |
| Percent of adults who engage in no leisure-time physical activity | 2011            |    26.49 |  1332 |
| Percent of adults who engage in no leisure-time physical activity | 2012            |    23.90 |  1336 |
| Percent of adults who engage in no leisure-time physical activity | 2013            |    26.85 |  1318 |
| Percent of adults who engage in no leisure-time physical activity | 2014            |    24.24 |  1376 |
| Percent of adults who engage in no leisure-time physical activity | 2015            |    27.05 |  1358 |
| Percent of adults who engage in no leisure-time physical activity | 2016            |    24.90 |  1399 |
| Percent of adults who engage in no leisure-time physical activity | 2017            |    27.97 |  1372 |
| Percent of adults who engage in no leisure-time physical activity | 2018            |    25.63 |  1377 |
| Percent of adults who engage in no leisure-time physical activity | 2019            |    27.77 |  1346 |
| Percent of adults aged 18 years and older who have an overweight classification | 2020            |    34.10 |  1368 |
| Percent of adults aged 18 years and older who have an overweight classification | 2021            |    33.53 |  1377 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic physical activity and engage in muscle-strengthening activities on 2 or more days a week | 2011            |    20.17 |  1326 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic physical activity and engage in muscle-strengthening activities on 2 or more days a week | 2013            |    19.99 |  1312 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic physical activity and engage in muscle-strengthening activities on 2 or more days a week | 2015            |    20.12 |  1353 |
| Percent of adults aged 18 years and older who have obesity | 2011            |    27.74 |  1332 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic physical activity and engage in muscle-strengthening activities on 2 or more days a week | 2017            |    19.78 |  1368 |
| Percent of adults aged 18 years and older who have obesity | 2012            |    28.00 |  1332 |
| Percent of adults aged 18 years and older who have obesity | 2013            |    28.82 |  1344 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic physical activity and engage in muscle-strengthening activities on 2 or more days a week | 2019            |    22.07 |  1333 |
| Percent of adults aged 18 years and older who have obesity | 2014            |    29.34 |  1369 |
| Percent of adults aged 18 years and older who have obesity | 2015            |    29.53 |  1361 |
| Percent of adults aged 18 years and older who have obesity | 2016            |    30.09 |  1389 |
| Percent of adults aged 18 years and older who have obesity | 2017            |    30.96 |  1372 |
| Percent of adults aged 18 years and older who have obesity | 2018            |    31.63 |  1369 |
| Percent of adults aged 18 years and older who have obesity | 2019            |    32.36 |  1343 |
| Percent of adults who report consuming vegetables less than one time daily | 2021            |    21.90 |  1372 |
| Percent of adults who report consuming fruit less than one time daily | 2017            |    37.46 |  1370 |
| Percent of adults who report consuming fruit less than one time daily | 2019            |    40.75 |  1338 |
| Percent of adults who engage in no leisure-time physical activity | 2020            |    24.93 |  1382 |
| Percent of adults who engage in no leisure-time physical activity | 2021            |    25.43 |  1388 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2011            |    50.42 |  1328 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2013            |    49.90 |  1312 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2015            |    50.28 |  1354 |
| Percent of adults who achieve at least 300 minutes a week of moderate-intensity aerobic physical activity or 150 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2011            |    31.21 |  1325 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2017            |    48.81 |  1369 |
| Percent of adults who achieve at least 300 minutes a week of moderate-intensity aerobic physical activity or 150 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2013            |    31.20 |  1312 |
| Percent of adults who achieve at least 150 minutes a week of moderate-intensity aerobic physical activity or 75 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2019            |    49.74 |  1337 |
| Percent of adults aged 18 years and older who have an overweight classification | 2011            |    35.07 |  1332 |
| Percent of adults who achieve at least 300 minutes a week of moderate-intensity aerobic physical activity or 150 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2015            |    31.35 |  1354 |
| Percent of adults aged 18 years and older who have an overweight classification | 2012            |    35.21 |  1332 |
| Percent of adults aged 18 years and older who have an overweight classification | 2013            |    34.94 |  1344 |
| Percent of adults who achieve at least 300 minutes a week of moderate-intensity aerobic physical activity or 150 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2017            |    30.32 |  1368 |
| Percent of adults aged 18 years and older who have an overweight classification | 2014            |    34.71 |  1369 |
| Percent of adults who achieve at least 300 minutes a week of moderate-intensity aerobic physical activity or 150 minutes a week of vigorous-intensity aerobic activity (or an equivalent combination) | 2019            |    31.41 |  1337 |
| Percent of adults aged 18 years and older who have an overweight classification | 2015            |    35.04 |  1361 |

### Geographic Analysis
```
VI                   33.81      3.80       70.20      422       
GU                   33.20      7.30       75.50      1300      
LA                   32.94      7.80       69.10      1717      
AK                   32.93      2.30       76.20      1744      
NM                   32.80      1.90       73.80      1751      
PR                   32.73      1.70       66.80      1134      
AR                   32.67      5.40       65.80      1730      
WY                   32.58      9.60       73.30      1636      
WI                   32.45      8.20       71.40      1756      
MS                   32.43      5.10       63.90      1569      
```
