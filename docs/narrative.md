## 🎯 Project Goal

To quantify and visualize how a mother’s highest educational attainment correlates with her likelihood of having given birth in the past 12 months—across all U.S. states and over time—using ACS 1‑Year PUMS person‑level data downloaded for 2006–2023 (including 2020).

---

## ❓ Essential Question

> **How does a mother’s education level influence her recent fertility?**

---

## 📚 Data Scope & Acquisition

* **Years Covered**: 2006–2023, **including 2020** (manually downloaded; no API)&#x20;
* **Geography**: All 50 states + DC, via the **ST** (2006–2022) or **STATE** (2023) column&#x20;
* **Population**: Women aged 15–50 (standard reproductive age)
* **Files**: Individual yearly CSVs from the Census FTP site, consolidated locally

---

## 🔍 Data Verification & Structure

You’ve confirmed that in each year’s CSV (2006–2023) the key columns exist, though their **positions shift** and the state column renames in 2023:

| Year                                                                                                                   | ST/STATE Col Name & Position | PWGTP | AGEP | FER | SCHL   | SEX    |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----- | ---- | --- | ------ | ------ |
| 2006–2007                                                                                                              |  ST (col 5)                  |  7    |  8   |  18 |  53    |  55    |
| 2008–2012                                                                                                              |  ST (col 5)                  |  7    |  8   |  21 |  67    |  69    |
| 2013–2015                                                                                                              |  ST (col 5)                  |  7    |  8   |  21 |  65‑66 |  67‑68 |
| 2016                                                                                                                   |  ST (col 5)                  |  7    |  8   |  21 |  66    |  68    |
| 2017–2022                                                                                                              |  ST (col 7)                  |  9    |  10  |  23 |  67‑68 |  69‑70 |
| 2023                                                                                                                   |  STATE (col 7)               |  9    |  10  |  23 |  67    |  69    |
| *Verification summary: all key columns present each year, decimal formatting (e.g., 16.0) noted, blank = N/A for FER*  |                              |       |      |     |        |        |

---

## 🔑 Key Variables & Mappings

All code‐to‐label maps below come straight from your **data‑dictionary.md** file:

1. **SEX**

   * 1 = Male; 2 = Female&#x20;

2. **AGEP**

   * Age in years (0–99+), reported directly; no special codes&#x20;

3. **SCHL** (Educational Attainment)

   |  Code | Label                                 |
   | :---: | :------------------------------------ |
   | 01–03 | No schooling through Kindergarten     |
   | 04–14 | Grades 1–11                           |
   |   15  | 12th grade – no diploma               |
   |   16  | Regular high school diploma           |
   |   17  | GED or alternative credential         |
   |   18  | Some college, < 1 year                |
   |   19  | ≥ 1 year college credit, no degree    |
   |   20  | Associate’s degree                    |
   |   21  | Bachelor’s degree                     |
   |   22  | Master’s degree                       |
   |   23  | Professional degree beyond bachelor’s |
   |   24  | Doctorate degree                      |
   |       |                                       |

4. **FER** (Birth in Past 12 Months)

   * \[blank] = N/A (male or age < 15 or > 50), 1 = Yes, 2 = No&#x20;

5. **PWGTP** (Person Weight)

   * Continuous numeric weight; use directly for population/fertility sums&#x20;

6. **State FIPS**

   * 01 = Alabama … 56 = Wyoming (column `ST` pre‑2023; `STATE` in 2023)&#x20;

---

## ⚙️ Methodology

1. **Load & Standardize**

   * Read each CSV into Pandas, using your verification table to locate columns.
   * Rename `STATE` → `ST` for 2023 to unify.
   * Convert all code columns from decimal to integer where needed.

2. **Filter Sample**

   ```python
   df = df[(df.SEX == 2) & df.AGEP.between(15,50)]
   ```

3. **Map Labels**

   ```python
   df['education'] = df.SCHL.map(edu_map)
   df['state_name'] = df.ST.map(fips_to_state)
   ```

4. **Aggregate & Calculate**

   ```python
   summary = (
     df.groupby(['year','state_name','education'])
       .agg(
         births=('FER', lambda x: (x==1).mul(df.loc[x.index,'PWGTP']).sum()),
         population=('PWGTP','sum')
       )
       .reset_index()
   )
   summary['fertility_rate'] = summary.births / summary.population * 1000
   ```

5. **Output**

   * Save the aggregated CSV as your final data source for visualization.

---

## 📖 Story & Visualizations

1. **Bar Chart (Snapshot)**

   * Fertility rate by education for **2023**.
   * **Highlight:** steep drop in % births from high‑school to college and beyond.

2. **Line Chart (Trend)**

   * 2006–2023 fertility trends by education group.
   * **Highlight:** widening gap over time, especially post‑2010.

3. **Pie/Doughnut Chart (Childlessness Proxy)**

   * % of women 40–50 with no birth in past 12 months, by education (2023).
   * **Highlight:** dramatic rise in childlessness with advanced degrees.

4. **Choropleth Map (Geography)**

   * State‐level fertility rates (per 1,000) for each major education bracket in 2023.
   * **Highlight:** regional deviations (e.g., higher rates in the South vs. Northeast).
