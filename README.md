# Educational Attainment and Fertility Rate Dashboard

## 🎯 Project Goal

To quantify and visualize how a mother's highest educational attainment correlates with her likelihood of having given birth in the past 12 months—across all U.S. states and over time—using ACS 1‑Year PUMS person‑level data downloaded for 2008–2023 (including 2020).

## ❓ Essential Question

> **How does a mother's education level influence her recent fertility?**

## 📚 Data Scope & Acquisition

* **Years Covered**: 2008–2023, **including 2020** (manually downloaded; no API)
* **Geography**: All 50 states + DC, via the **ST** (2008–2022) or **STATE** (2023) column
* **Population**: Women aged 15–50 (standard reproductive age)
* **Files**: Individual yearly CSVs from the Census FTP site, processed into an SQLite database

> **Note on 2006-2007 Data**: While we have data for 2006-2007, these years only contain information for two education categories ("Less than High School" and "High School Diploma") instead of the full seven categories available from 2008 onward. For consistency in analysis and visualization, our primary focus is on 2008-2023.

## 🔍 Data Verification & Structure

We've confirmed that in each year's CSV (2008–2023) the key columns exist, though their **positions shift** and the state column renames in 2023:

| Year                                                                                                                   | ST/STATE Col Name & Position | PWGTP | AGEP | FER | SCHL   | SEX    |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----- | ---- | --- | ------ | ------ |
| 2008–2012                                                                                                              |  ST (col 5)                  |  7    |  8   |  21 |  67    |  69    |
| 2013–2015                                                                                                              |  ST (col 5)                  |  7    |  8   |  21 |  65‑66 |  67‑68 |
| 2016                                                                                                                   |  ST (col 5)                  |  7    |  8   |  21 |  66    |  68    |
| 2017–2022                                                                                                              |  ST (col 7)                  |  9    |  10  |  23 |  67‑68 |  69‑70 |
| 2023                                                                                                                   |  STATE (col 7)               |  9    |  10  |  23 |  67    |  69    |
| *Verification summary: all key columns present each year, decimal formatting (e.g., 16.0) noted, blank = N/A for FER*  |                              |       |      |     |        |        |

## 🔑 Key Variables & Mappings

All code‐to‐label maps below come from the data dictionary:

1. **SEX**
   * 1 = Male; 2 = Female

2. **AGEP**
   * Age in years (0–99+), reported directly; no special codes

3. **SCHL** (Educational Attainment)

   |  Code | Label                                 |
   | :---: | :------------------------------------ |
   | 01–03 | No schooling through Kindergarten     |
   | 04–14 | Grades 1–11                           |
   |   15  | 12th grade – no diploma               |
   |   16  | Regular high school diploma           |
   |   17  | GED or alternative credential         |
   |   18  | Some college, < 1 year                |
   |   19  | ≥ 1 year college credit, no degree    |
   |   20  | Associate's degree                    |
   |   21  | Bachelor's degree                     |
   |   22  | Master's degree                       |
   |   23  | Professional degree beyond bachelor's |
   |   24  | Doctorate degree                      |

4. **FER** (Birth in Past 12 Months)
   * \[blank] = N/A (male or age < 15 or > 50), 1 = Yes, 2 = No

5. **PWGTP** (Person Weight)
   * Continuous numeric weight; use directly for population/fertility sums

6. **State FIPS**
   * 01 = Alabama … 56 = Wyoming (column `ST` pre‑2023; `STATE` in 2023)

## 📊 Education Groups

For visualization clarity, we've grouped the detailed SCHL codes into 7 meaningful categories:

1. **Less than High School**: SCHL codes 01-15
2. **High School Diploma**: SCHL codes 16-17
3. **Some College**: SCHL codes 18-19
4. **Associate's Degree**: SCHL code 20
5. **Bachelor's Degree**: SCHL code 21
6. **Master's Degree**: SCHL code 22
7. **Professional/Doctorate Degree**: SCHL codes 23-24

## ⚙️ Data Processing Pipeline

We've created a comprehensive data processing pipeline to transform the raw ACS PUMS data into an analysis-ready SQLite database:

1. **Load & Standardize**
   * Process each year individually using `scripts/process_data.py`
   * Handle column position changes between years
   * Rename `STATE` → `ST` for 2023 to unify column names

2. **Filter Sample**
   ```python
   df = df[(df.SEX == 2) & df.AGEP.between(15,50)]
   ```

3. **Map Education Groups**
   * Group the 24 SCHL codes into 7 meaningful categories

4. **Aggregate & Calculate**
   * Group by year, state, and education group
   * Sum weights (PWGTP) for total women and births
   * Calculate fertility rate = (weighted births / weighted population) * 1,000

5. **Database Structure**
   * Main `fertility_rates` table with year, state, education group, and fertility metrics
   * Lookup tables for `education_groups` and `states`
   * Optimized views for common visualization patterns:
     * `national_trends`: National trends by education and year
     * `state_comparison`: State comparison for the most recent year
     * `education_comparison`: Education level comparisons across years
   * Indices for improved query performance

## 📖 Planned Visualizations

1. **Bar Chart (Snapshot)**
   * Fertility rate by education for **2023**
   * **Highlight:** steep drop in % births from high‑school to college and beyond

2. **Line Chart (Trend)**
   * 2008–2023 fertility trends by education group
   * **Highlight:** widening gap over time, especially post‑2010

3. **Pie/Doughnut Chart (Childlessness Proxy)**
   * % of women 40–50 with no birth in past 12 months, by education (2023)
   * **Highlight:** dramatic rise in childlessness with advanced degrees

4. **Choropleth Map (Geography)**
   * State‐level fertility rates (per 1,000) for each major education bracket in 2023
   * **Highlight:** regional deviations (e.g., higher rates in the South vs. Northeast)

## 🛠️ Technology Stack

* **Data Processing**: Python 3.9+, Pandas 2.0.0, SQLite, NumPy 1.23.5
* **Frontend**: Next.js 15.3.2, TypeScript 5.8.3, Material UI 5.11.0
* **State Management**: React Context API
* **Visualization**: D3.js 7.8.0 with React integration
* **API Layer**: Next.js API Routes with better-sqlite3
* **Deployment**: Vercel

## 🎨 Visualization Features

* **Interactive Bar Chart**
  * Displays fertility rates by education level
  * Allows year selection (2008-2023)
  * Supports year-to-year comparison mode
  * Shows detailed statistics on hover
  * Responsive design for all screen sizes

* **Planned Additional Visualizations**
  * Trend analysis with interactive line charts
  * Geographic patterns with choropleth maps
  * Education comparison views
  * Narrative-driven data exploration

## 🚀 Project Status

- [x] Data verification and documentation
- [x] Data processing pipeline implementation
- [x] Database setup and schema design
- [x] Full data processing (all years 2006-2023)
- [x] Frontend project scaffolding
- [x] API layer implementation
- [ ] Core UI components (in progress)
- [ ] Visualization components (in progress)
  - [x] FertilityBarChart - Shows fertility rates by education level
  - [ ] Line chart for trends over time
  - [ ] Choropleth map for geographic patterns
  - [ ] Comparison visualizations
- [ ] Narrative structure implementation
- [ ] Performance optimization
- [ ] Deployment configuration
- [ ] Testing 

## 📢 Current Development Focus

We are currently focused on:

1. **Enhancing Visualization Components**
   * Refining the FertilityBarChart for better user experience
   * Implementing year comparison features
   * Developing additional visualization types

2. **Building Narrative Structure**
   * Creating a cohesive storytelling approach
   * Designing section components for guided exploration
   * Implementing smooth transitions between data insights

3. **Improving UI Components**
   * Developing filter controls for data exploration
   * Implementing responsive layouts for all device sizes
   * Creating accessible components following WCAG guidelines

The core API layer and data processing pipeline are complete, with visualization components actively being developed to create an engaging, informative user experience. 