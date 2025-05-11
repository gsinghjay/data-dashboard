# Data Dictionary: ACS PUMS Variables

This document provides code‐to‐label mappings for key variables in the ACS PUMS person-level CSV files (2005–2023).

## Data Dictionary Mappings

### 1. **SEX**

* **1** = Male
* **2** = Female

### 2. **AGEP**

* **Age in years**, integer values (0–99+)
* No special codes—every year of age is reported directly

### 3. **SCHL** (Educational Attainment)

| Code | Label                                        |
|:----:| :------------------------------------------- |
| 01   | No schooling completed                       |
| 02   | Nursery school, preschool                    |
| 03   | Kindergarten                                 |
| 04   | Grade 1                                      |
| 05   | Grade 2                                      |
| 06   | Grade 3                                      |
| 07   | Grade 4                                      |
| 08   | Grade 5                                      |
| 09   | Grade 6                                      |
| 10   | Grade 7                                      |
| 11   | Grade 8                                      |
| 12   | Grade 9                                      |
| 13   | Grade 10                                     |
| 14   | Grade 11                                     |
| 15   | 12th grade – no diploma                      |
| 16   | Regular high school diploma                  |
| 17   | GED or alternative credential                |
| 18   | Some college, but less than 1 year           |
| 19   | 1 or more years of college credit, no degree |
| 20   | Associate's degree                           |
| 21   | Bachelor's degree                            |
| 22   | Master's degree                              |
| 23   | Professional degree beyond a bachelor's      |
| 24   | Doctorate degree                             |

### 4. **FER** (Birth in Past 12 Months)

* [empty value] = N/A (male or age < 15 or > 50)
* **1** = Yes
* **2** = No

### 5. **PWGTP** (Person's Weight)

* **Numeric weight** for population estimation; no categorical codes
* Use directly in weighted sums

### 6. **ST** (State FIPS Codes)

State codes in the CSV files use the following FIPS codes:

| FIPS | State                | FIPS | State          |
|:----:| :------------------- |:----:| :------------- |
| 01   | Alabama              | 27   | Minnesota      |
| 02   | Alaska               | 28   | Mississippi    |
| 04   | Arizona              | 29   | Missouri       |
| 05   | Arkansas             | 30   | Montana        |
| 06   | California           | 31   | Nebraska       |
| 08   | Colorado             | 32   | Nevada         |
| 09   | Connecticut          | 33   | New Hampshire  |
| 10   | Delaware             | 34   | New Jersey     |
| 11   | District of Columbia | 35   | New Mexico     |
| 12   | Florida              | 36   | New York       |
| 13   | Georgia              | 37   | North Carolina |
| 15   | Hawaii               | 38   | North Dakota   |
| 16   | Idaho                | 39   | Ohio           |
| 17   | Illinois             | 40   | Oklahoma       |
| 18   | Indiana              | 41   | Oregon         |
| 19   | Iowa                 | 42   | Pennsylvania   |
| 20   | Kansas               | 44   | Rhode Island   |
| 21   | Kentucky             | 45   | South Carolina |
| 22   | Louisiana            | 46   | South Dakota   |
| 23   | Maine                | 47   | Tennessee      |
| 24   | Maryland             | 48   | Texas          |
| 25   | Massachusetts        | 49   | Utah           |
| 26   | Michigan             | 50   | Vermont        |
| 51   | Virginia             | 53   | Washington     |
| 54   | West Virginia        | 55   | Wisconsin      |
| 56   | Wyoming              |      |                |

---

## Usage Notes

* **Data Coverage**: Our collection includes CSV files for all years from 2005-2023, including 2020
* **Filtering**: When processing the CSV files, filter to `SEX==2` and `AGEP.between(15,50)`
* **Aggregation**: Group by `year`, `state`, and `education`, summing `PWGTP` separately for `FER==1` (births) and overall population, then compute:

  $$
    \text{Fertility Rate} = \frac{\text{Weighted Births}}{\text{Weighted Population}} \times 1{,}000
  $$

These variable codes and definitions will help translate the raw CSV data into meaningful categories for data visualization.
