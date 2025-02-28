# Food Safety Data Analysis ETL Scripts

This directory contains scripts to extract, transform, and load (ETL) data from CSV files into a SQLite database, and then generate analysis and visualizations based on the data.

## Directory Structure

```
etl/
├── data/
│   ├── db/                  # Database files
│   └── analysis/            # Analysis output files
├── scripts/
│   ├── initialize_database.py  # Script to create and populate the database
│   ├── generate_analysis.py    # Script to generate analysis and visualizations
│   └── run_analysis.py         # Script to run the complete pipeline
└── README.md                # This file
```

## Prerequisites

- Python 3.8 or higher
- Required Python packages (install using `pip install -r requirements.txt`):
  - pandas
  - matplotlib
  - seaborn
  - numpy

## Usage

### Running the Complete Pipeline

To run the complete analysis pipeline (database initialization and analysis generation):

```bash
python etl/scripts/run_analysis.py
```

This will:
1. Create a SQLite database from the CSV files
2. Generate analysis and visualizations
3. Create a summary report

### Running Individual Steps

#### Initialize Database

To only initialize the database from CSV files:

```bash
python etl/scripts/initialize_database.py
```

This will create a SQLite database at `etl/data/db/food_safety_dashboard.db` and populate it with data from the CSV files in `frontend/src/data/`.

#### Generate Analysis

To only generate analysis and visualizations (requires the database to be initialized first):

```bash
python etl/scripts/generate_analysis.py
```

This will create analysis files and visualizations in `etl/data/analysis/`.

## Output

The analysis output includes:

- CSV files with processed data
- Visualizations in PNG format
- A summary report in Markdown format (`summary_report.md`)

## Database Schema

The database contains the following tables:

- `fda_substances`: FDA-regulated substances and their technical effects
- `fsis_recalls`: Food Safety and Inspection Service recall incidents
- `gras_notices`: Generally Recognized as Safe (GRAS) notifications
- `who_obesity_data`: World Health Organization obesity statistics
- `cdc_obesity_data`: CDC US state-level obesity statistics

## Analysis Views

The database includes several views to support the analysis:

- `technical_effects_distribution`: Distribution of technical effects in FDA substances
- `recall_risk_analysis`: Distribution of recalls by risk level
- `top_recall_states`: States with the highest number of recalls
- `obesity_rate_by_state`: Obesity rates by state
- `recall_trends`: Trends in recall incidents over time
- `recall_reasons`: Primary reasons for recalls
- `recalls_vs_obesity`: Correlation between recalls and obesity rates
- `gras_response_distribution`: Distribution of FDA responses to GRAS notices
- `obesity_trend_us`: Trend in US obesity rates over time

## Data Sources

The analysis is based on the following data sources:

- FDA Substances Database
- FSIS Recalls
- GRAS Notices
- WHO Global Obesity Data
- CDC US Obesity Data

For more information about the data, see the data dictionary at `frontend/src/data/data-dictionary.md`. 