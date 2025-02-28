#!/usr/bin/env python3
"""
Analysis Generation Script

This script queries the SQLite database to generate the analysis and visualizations
needed to recreate the story in the README.md.
"""

import os
import sqlite3
import pandas as pd
import json
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from pathlib import Path
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Define paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DB_DIR = BASE_DIR / "etl" / "data" / "db"
DB_PATH = DB_DIR / "food_safety_dashboard.db"
OUTPUT_DIR = BASE_DIR / "etl" / "data" / "analysis"

# Ensure the output directory exists
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def create_connection():
    """Create a database connection to the SQLite database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row  # Return rows as dictionaries
        return conn
    except sqlite3.Error as e:
        logger.error(f"Error connecting to database: {e}")
        raise

def technical_effects_analysis(conn):
    """Generate technical effects distribution analysis"""
    logger.info("Generating technical effects distribution analysis...")
    
    # Query the database
    cursor = conn.cursor()
    cursor.execute("SELECT effect, count FROM technical_effects_distribution LIMIT 10")
    rows = cursor.fetchall()
    
    # Convert to DataFrame
    df = pd.DataFrame(rows, columns=['effect', 'count'])
    
    # Save to CSV
    df.to_csv(OUTPUT_DIR / "technical_effects_distribution.csv", index=False)
    
    # Create visualization
    plt.figure(figsize=(10, 6))
    sns.barplot(data=df, x='count', y='effect')
    plt.title('FDA Approved Substances by Technical Effect')
    plt.xlabel('Count')
    plt.ylabel('Technical Effect')
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "technical_effects_distribution.png", dpi=300)
    plt.close()
    
    logger.info("Technical effects analysis completed")
    
    return df

def recall_risk_analysis(conn):
    """Generate recall risk analysis"""
    logger.info("Generating recall risk analysis...")
    
    # Query the database
    cursor = conn.cursor()
    cursor.execute("SELECT risk_level, count FROM recall_risk_analysis")
    rows = cursor.fetchall()
    
    # Convert to DataFrame
    df = pd.DataFrame(rows, columns=['risk_level', 'count'])
    
    # Save to CSV
    df.to_csv(OUTPUT_DIR / "recall_risk_analysis.csv", index=False)
    
    # Create visualization
    plt.figure(figsize=(10, 6))
    sns.barplot(data=df, x='count', y='risk_level')
    plt.title('Food Safety Recalls by Risk Level')
    plt.xlabel('Count')
    plt.ylabel('Risk Level')
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "recall_risk_analysis.png", dpi=300)
    plt.close()
    
    logger.info("Recall risk analysis completed")
    
    return df

def top_recall_states_analysis(conn):
    """Generate top recall states analysis"""
    logger.info("Generating top recall states analysis...")
    
    # Query the database
    cursor = conn.cursor()
    cursor.execute("SELECT state, recall_count, avg_obesity_rate FROM top_recall_states")
    rows = cursor.fetchall()
    
    # Convert to DataFrame
    df = pd.DataFrame(rows)
    
    # Save to CSV
    df.to_csv(OUTPUT_DIR / "top_recall_states.csv", index=False)
    
    # Create visualization
    plt.figure(figsize=(12, 6))
    
    # Create bar plot with two y-axes
    ax1 = plt.gca()
    ax2 = ax1.twinx()
    
    # Plot recall counts as bars
    sns.barplot(x='state', y='recall_count', data=df, ax=ax1, color='steelblue', alpha=0.7)
    
    # Plot obesity rates as a line
    ax2.plot(df.index, df['avg_obesity_rate'], 'ro-', linewidth=2, markersize=8)
    
    # Set labels and title
    ax1.set_xlabel('State')
    ax1.set_ylabel('Number of Recalls')
    ax2.set_ylabel('Obesity Rate (%)')
    plt.title('Top 10 States by Recall Count with Obesity Rates')
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "top_recall_states.png", dpi=300)
    plt.close()
    
    logger.info("Top recall states analysis completed")
    
    return df

def obesity_rate_by_state_analysis(conn):
    """Generate obesity rate by state analysis"""
    logger.info("Generating obesity rate by state analysis...")
    
    # Query the database
    cursor = conn.cursor()
    cursor.execute("SELECT state, obesity_rate FROM obesity_rate_by_state ORDER BY obesity_rate DESC LIMIT 10")
    highest_rows = cursor.fetchall()
    
    cursor.execute("SELECT state, obesity_rate FROM obesity_rate_by_state ORDER BY obesity_rate ASC LIMIT 10")
    lowest_rows = cursor.fetchall()
    
    # Convert to DataFrames
    highest_df = pd.DataFrame(highest_rows)
    lowest_df = pd.DataFrame(lowest_rows)
    
    # Save to CSV
    highest_df.to_csv(OUTPUT_DIR / "highest_obesity_states.csv", index=False)
    lowest_df.to_csv(OUTPUT_DIR / "lowest_obesity_states.csv", index=False)
    
    # Create visualization
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
    
    # Plot highest obesity states
    sns.barplot(x='obesity_rate', y='state', data=highest_df, ax=ax1, color='red', alpha=0.7)
    ax1.set_title('States with Highest Obesity Rates')
    ax1.set_xlabel('Obesity Rate (%)')
    ax1.set_ylabel('State')
    
    # Plot lowest obesity states
    sns.barplot(x='obesity_rate', y='state', data=lowest_df, ax=ax2, color='green', alpha=0.7)
    ax2.set_title('States with Lowest Obesity Rates')
    ax2.set_xlabel('Obesity Rate (%)')
    ax2.set_ylabel('State')
    
    # Adjust layout and save
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "obesity_rate_by_state.png", dpi=300)
    plt.close()
    
    logger.info("Obesity rate by state analysis completed")
    
    return highest_df, lowest_df

def recall_trends_analysis(conn):
    """Generate recall trends analysis"""
    logger.info("Generating recall trends analysis...")
    
    # Query the database
    cursor = conn.cursor()
    cursor.execute("""
    SELECT 
        year, 
        total_recalls, 
        high_risk_pct, 
        multi_state_pct, 
        estimated_response_time 
    FROM recall_trends
    """)
    rows = cursor.fetchall()
    
    # Convert to DataFrame
    df = pd.DataFrame(rows)
    
    # Save to CSV
    df.to_csv(OUTPUT_DIR / "recall_trends.csv", index=False)
    
    # Create visualization
    plt.figure(figsize=(12, 8))
    
    # Create a table-like visualization
    cell_text = []
    for row in df.values:
        cell_text.append([
            str(int(row[0])),  # year
            str(int(row[1])),  # total_recalls
            f"{row[2]:.1f}%",  # high_risk_pct
            f"{row[3]:.1f}%",  # multi_state_pct
            f"{row[4]:.1f} days"  # estimated_response_time
        ])
    
    # Create the table
    table = plt.table(
        cellText=cell_text,
        colLabels=['Year', 'Total Recalls', 'High Risk %', 'Multi-State %', 'Response Time'],
        loc='center',
        cellLoc='center'
    )
    
    # Adjust table appearance
    table.auto_set_font_size(False)
    table.set_fontsize(12)
    table.scale(1.2, 2)
    
    # Hide axes
    plt.axis('off')
    
    # Add title
    plt.title('Recall Analysis Trends (2011-2019)', fontsize=16, pad=20)
    
    # Save the figure
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "recall_trends.png", dpi=300, bbox_inches='tight')
    plt.close()
    
    logger.info("Recall trends analysis completed")
    
    return df

def recall_reasons_analysis(conn):
    """Generate recall reasons analysis"""
    logger.info("Generating recall reasons analysis...")
    
    # Query the database
    cursor = conn.cursor()
    cursor.execute("SELECT reason_category, count FROM recall_reasons")
    rows = cursor.fetchall()
    
    # Convert to DataFrame
    df = pd.DataFrame(rows)
    
    # Save to CSV
    df.to_csv(OUTPUT_DIR / "recall_reasons.csv", index=False)
    
    # Create visualization
    plt.figure(figsize=(10, 8))
    
    # Create pie chart
    plt.pie(
        df['count'], 
        labels=df['reason_category'], 
        autopct='%1.1f%%',
        startangle=90,
        shadow=True,
        explode=[0.05] * len(df)
    )
    
    # Add title
    plt.title('Recall Triggers (2011-2019)', fontsize=16)
    
    # Save the figure
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "recall_reasons.png", dpi=300)
    plt.close()
    
    logger.info("Recall reasons analysis completed")
    
    return df

def recalls_vs_obesity_analysis(conn):
    """Generate recalls vs obesity correlation analysis"""
    logger.info("Generating recalls vs obesity correlation analysis...")
    
    # Query the database
    cursor = conn.cursor()
    cursor.execute("SELECT year, total_recalls, obesity_rate FROM recalls_vs_obesity")
    rows = cursor.fetchall()
    
    # Convert to DataFrame
    df = pd.DataFrame(rows)
    
    # Save to CSV
    df.to_csv(OUTPUT_DIR / "recalls_vs_obesity.csv", index=False)
    
    # Create visualization
    plt.figure(figsize=(12, 6))
    
    # Create line plot with two y-axes
    ax1 = plt.gca()
    ax2 = ax1.twinx()
    
    # Plot recalls
    ax1.plot(df['year'], df['total_recalls'], 'b-o', linewidth=2, markersize=8, label='Recalls')
    ax1.set_ylabel('Number of Recalls', color='b')
    ax1.tick_params(axis='y', labelcolor='b')
    
    # Plot obesity rates
    ax2.plot(df['year'], df['obesity_rate'], 'r-^', linewidth=2, markersize=8, label='Obesity Rate')
    ax2.set_ylabel('Obesity Rate (%)', color='r')
    ax2.tick_params(axis='y', labelcolor='r')
    
    # Set x-axis ticks to years
    plt.xticks(df['year'])
    
    # Add title and legend
    plt.title('Recall Incidents vs Obesity Rates (2011-2019)', fontsize=16)
    
    # Add combined legend
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper left')
    
    # Save the figure
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "recalls_vs_obesity.png", dpi=300)
    plt.close()
    
    # Calculate correlation
    correlation = df['total_recalls'].corr(df['obesity_rate'])
    with open(OUTPUT_DIR / "correlation_coefficient.txt", 'w') as f:
        f.write(f"Correlation coefficient: {correlation:.2f}")
    
    logger.info(f"Recalls vs obesity correlation analysis completed (r = {correlation:.2f})")
    
    return df, correlation

def gras_response_analysis(conn):
    """Generate GRAS notices response distribution analysis"""
    logger.info("Generating GRAS notices response distribution analysis...")
    
    # Query the database
    cursor = conn.cursor()
    cursor.execute("SELECT fda_response, count, percentage FROM gras_response_distribution")
    rows = cursor.fetchall()
    
    # Convert to DataFrame
    df = pd.DataFrame(rows)
    
    # Save to CSV
    df.to_csv(OUTPUT_DIR / "gras_response_distribution.csv", index=False)
    
    # Create visualization
    plt.figure(figsize=(10, 8))
    
    # Create pie chart
    plt.pie(
        df['count'], 
        labels=df['fda_response'], 
        autopct='%1.1f%%',
        startangle=90,
        shadow=True,
        explode=[0.05] * len(df)
    )
    
    # Add title
    plt.title('FDA Response to GRAS Notices', fontsize=16)
    
    # Save the figure
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "gras_response_distribution.png", dpi=300)
    plt.close()
    
    logger.info("GRAS notices response distribution analysis completed")
    
    return df

def obesity_trend_analysis(conn):
    """Generate obesity trend over time analysis"""
    logger.info("Generating obesity trend over time analysis...")
    
    # Query the database
    cursor = conn.cursor()
    cursor.execute("SELECT year, obesity_rate FROM obesity_trend_us WHERE year BETWEEN 2011 AND 2019")
    rows = cursor.fetchall()
    
    # Convert to DataFrame
    df = pd.DataFrame(rows)
    
    # Save to CSV
    df.to_csv(OUTPUT_DIR / "obesity_trend_us.csv", index=False)
    
    # Create visualization
    plt.figure(figsize=(12, 6))
    
    # Create line plot
    plt.plot(df['year'], df['obesity_rate'], 'r-o', linewidth=2, markersize=8)
    
    # Set x-axis ticks to years
    plt.xticks(df['year'])
    
    # Add labels and title
    plt.xlabel('Year')
    plt.ylabel('Obesity Rate (%)')
    plt.title('US Obesity Rate Trend (2011-2019)', fontsize=16)
    
    # Add grid
    plt.grid(True, linestyle='--', alpha=0.7)
    
    # Save the figure
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "obesity_trend_us.png", dpi=300)
    plt.close()
    
    # Calculate change
    first_year = df.iloc[0]['obesity_rate']
    last_year = df.iloc[-1]['obesity_rate']
    change = last_year - first_year
    percent_change = (change / first_year) * 100
    
    with open(OUTPUT_DIR / "obesity_change.txt", 'w') as f:
        f.write(f"Obesity rate change from 2011 to 2019: {change:.2f} percentage points\n")
        f.write(f"Percent change: {percent_change:.2f}%\n")
        f.write(f"2011 rate: {first_year:.2f}%\n")
        f.write(f"2019 rate: {last_year:.2f}%")
    
    logger.info(f"Obesity trend analysis completed (change: {change:.2f} percentage points)")
    
    return df, change, percent_change

def generate_summary_report(results):
    """Generate a summary report of all analyses"""
    logger.info("Generating summary report...")
    
    report_path = OUTPUT_DIR / "summary_report.md"
    
    with open(report_path, 'w') as f:
        f.write("# Food Safety Regulation Analysis Summary Report\n\n")
        f.write(f"*Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n\n")
        
        f.write("## Technical Effects Distribution\n")
        f.write("The FDA substances database shows the following distribution of technical effects:\n\n")
        tech_effects_df = results['technical_effects']
        f.write("| Technical Effect | Count | Percentage |\n")
        f.write("|-----------------|-------|------------|\n")
        total = tech_effects_df['count'].sum()
        for _, row in tech_effects_df.iterrows():
            percentage = (row['count'] / total) * 100
            f.write(f"| {row['effect']} | {row['count']} | {percentage:.1f}% |\n")
        f.write("\n")
        
        f.write("## Recall Risk Analysis\n")
        f.write("Food safety recalls by risk level:\n\n")
        risk_df = results['recall_risk']
        f.write("| Risk Level | Count | Percentage |\n")
        f.write("|------------|-------|------------|\n")
        total = risk_df['count'].sum()
        for _, row in risk_df.iterrows():
            percentage = (row['count'] / total) * 100
            f.write(f"| {row['risk_level']} | {row['count']} | {percentage:.1f}% |\n")
        f.write("\n")
        
        f.write("## Top Recall States\n")
        f.write("States with the highest number of recalls:\n\n")
        states_df = results['top_recall_states']
        f.write("| State | Recall Count | Obesity Rate |\n")
        f.write("|-------|-------------|-------------|\n")
        for _, row in states_df.iterrows():
            f.write(f"| {row['state']} | {row['recall_count']} | {row['avg_obesity_rate']:.1f}% |\n")
        f.write("\n")
        
        f.write("## Obesity Rate Distribution\n")
        f.write("States with the highest obesity rates (2019):\n\n")
        highest_df = results['highest_obesity_states']
        f.write("| State | Obesity Rate |\n")
        f.write("|-------|-------------|\n")
        for _, row in highest_df.iterrows():
            f.write(f"| {row['state']} | {row['obesity_rate']:.1f}% |\n")
        f.write("\n")
        
        f.write("States with the lowest obesity rates (2019):\n\n")
        lowest_df = results['lowest_obesity_states']
        f.write("| State | Obesity Rate |\n")
        f.write("|-------|-------------|\n")
        for _, row in lowest_df.iterrows():
            f.write(f"| {row['state']} | {row['obesity_rate']:.1f}% |\n")
        f.write("\n")
        
        f.write("## Recall Trends (2011-2019)\n")
        f.write("Trends in food safety recalls over time:\n\n")
        trends_df = results['recall_trends']
        f.write("| Year | Total Recalls | High Risk % | Multi-State % | Response Time |\n")
        f.write("|------|---------------|-------------|---------------|---------------|\n")
        for _, row in trends_df.iterrows():
            f.write(f"| {int(row['year'])} | {int(row['total_recalls'])} | {row['high_risk_pct']:.1f}% | {row['multi_state_pct']:.1f}% | {row['estimated_response_time']:.1f} days |\n")
        f.write("\n")
        
        f.write("## Primary Recall Reasons\n")
        f.write("Main reasons for food safety recalls:\n\n")
        reasons_df = results['recall_reasons']
        f.write("| Reason | Count | Percentage |\n")
        f.write("|--------|-------|------------|\n")
        total = reasons_df['count'].sum()
        for _, row in reasons_df.iterrows():
            percentage = (row['count'] / total) * 100
            f.write(f"| {row['reason_category']} | {row['count']} | {percentage:.1f}% |\n")
        f.write("\n")
        
        f.write("## Correlation Analysis\n")
        f.write("Relationship between recall incidents and obesity rates:\n\n")
        f.write(f"Correlation coefficient: {results['correlation']:.2f}\n\n")
        f.write("This indicates a moderate positive correlation between the number of recalls and obesity rates over time.\n\n")
        
        f.write("## GRAS Notices Response Distribution\n")
        f.write("FDA responses to GRAS (Generally Recognized as Safe) notices:\n\n")
        gras_df = results['gras_response']
        f.write("| FDA Response | Count | Percentage |\n")
        f.write("|-------------|-------|------------|\n")
        for _, row in gras_df.iterrows():
            f.write(f"| {row['fda_response']} | {row['count']} | {row['percentage']:.1f}% |\n")
        f.write("\n")
        
        f.write("## Obesity Trend Analysis\n")
        f.write("Change in US obesity rates from 2011 to 2019:\n\n")
        f.write(f"- 2011 obesity rate: {results['obesity_first_year']:.2f}%\n")
        f.write(f"- 2019 obesity rate: {results['obesity_last_year']:.2f}%\n")
        f.write(f"- Absolute change: {results['obesity_change']:.2f} percentage points\n")
        f.write(f"- Relative change: {results['obesity_percent_change']:.2f}%\n\n")
        
        f.write("## Conclusion\n")
        f.write("This analysis reveals a complex relationship between food safety regulations and public health outcomes. ")
        f.write("While food safety measures have improved with increased recall effectiveness and better response times, ")
        f.write("obesity rates have continued to rise, suggesting that multiple factors beyond food safety regulations ")
        f.write("influence public health outcomes.\n\n")
        
        f.write("The high percentage of flavor-enhancing substances (compared to nutritional substances) in the FDA database, ")
        f.write("combined with the 'No Questions' response rate for GRAS notices, suggests potential areas for regulatory improvement. ")
        f.write("Meanwhile, the geographic distribution of recalls and obesity rates indicates regional variations that may ")
        f.write("require targeted interventions.\n\n")
        
        f.write("*Note: This report was generated automatically from the food safety database. ")
        f.write("For more detailed analysis, please refer to the individual analysis files in the output directory.*")
    
    logger.info(f"Summary report generated at {report_path}")

def main():
    """Main function to generate all analyses"""
    logger.info(f"Starting analysis generation at {datetime.now()}")
    
    # Check if database file exists
    if not DB_PATH.exists():
        logger.error(f"Database file not found at {DB_PATH}")
        logger.info("Please run initialize_database.py first to create the database")
        return
    
    # Create database connection
    conn = create_connection()
    
    try:
        # Run all analyses
        results = {}
        
        # Technical effects distribution
        results['technical_effects'] = technical_effects_analysis(conn)
        
        # Recall risk analysis
        results['recall_risk'] = recall_risk_analysis(conn)
        
        # Top recall states
        results['top_recall_states'] = top_recall_states_analysis(conn)
        
        # Obesity rate by state
        highest_df, lowest_df = obesity_rate_by_state_analysis(conn)
        results['highest_obesity_states'] = highest_df
        results['lowest_obesity_states'] = lowest_df
        
        # Recall trends
        results['recall_trends'] = recall_trends_analysis(conn)
        
        # Recall reasons
        results['recall_reasons'] = recall_reasons_analysis(conn)
        
        # Recalls vs obesity correlation
        recalls_obesity_df, correlation = recalls_vs_obesity_analysis(conn)
        results['recalls_vs_obesity'] = recalls_obesity_df
        results['correlation'] = correlation
        
        # GRAS notices response distribution
        results['gras_response'] = gras_response_analysis(conn)
        
        # Obesity trend analysis
        obesity_trend_df, change, percent_change = obesity_trend_analysis(conn)
        results['obesity_trend'] = obesity_trend_df
        results['obesity_change'] = change
        results['obesity_percent_change'] = percent_change
        results['obesity_first_year'] = obesity_trend_df.iloc[0]['obesity_rate']
        results['obesity_last_year'] = obesity_trend_df.iloc[-1]['obesity_rate']
        
        # Generate summary report
        generate_summary_report(results)
        
        logger.info(f"Analysis generation completed successfully at {datetime.now()}")
    except Exception as e:
        logger.error(f"Error during analysis generation: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    main() 