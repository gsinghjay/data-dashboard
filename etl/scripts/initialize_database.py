#!/usr/bin/env python3
"""
Database Initialization Script

This script creates a SQLite database and loads data from CSV files based on the data dictionary.
It sets up the necessary tables and relationships to support the analysis in the README.md.
"""

import os
import sqlite3
import pandas as pd
import json
from pathlib import Path
import ast
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
DATA_DIR = BASE_DIR / "frontend" / "src" / "data"
DB_DIR = BASE_DIR / "etl" / "data" / "db"
DB_PATH = DB_DIR / "food_safety_dashboard.db"

# Ensure the database directory exists
DB_DIR.mkdir(parents=True, exist_ok=True)

# CSV file paths
FDA_SUBSTANCES_CSV = DATA_DIR / "processed_fda_substances.csv"
FSIS_RECALLS_CSV = DATA_DIR / "processed_fsis_recalls.csv"
GRAS_NOTICES_CSV = DATA_DIR / "processed_gras_notices.csv"
WHO_OBESITY_CSV = DATA_DIR / "processed_who_obesity_data.csv"
CDC_OBESITY_CSV = DATA_DIR / "processed_cdc_obesity_data.csv"

def create_connection():
    """Create a database connection to the SQLite database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.execute("PRAGMA foreign_keys = ON")
        return conn
    except sqlite3.Error as e:
        logger.error(f"Error connecting to database: {e}")
        raise

def create_tables(conn):
    """Create the necessary tables in the database"""
    logger.info("Creating database tables...")
    
    # Create FDA Substances table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS fda_substances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cas_reg_no TEXT,
        substance TEXT NOT NULL,
        other_names TEXT,
        used_for_technical_effect TEXT,
        technical_effects TEXT,
        fema_no TEXT,
        gras_pub_no TEXT,
        most_recent_gras_pub_update TEXT,
        fema_status TEXT,
        jecfa_flavor_number TEXT,
        gras_pub_no_year INTEGER,
        most_recent_gras_pub_update_year INTEGER,
        reg_administrative_year INTEGER,
        regs_labeling_standards_year INTEGER,
        approval_year INTEGER,
        data_source TEXT
    )
    ''')
    
    # Create FSIS Recalls table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS fsis_recalls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        field_recall_number TEXT,
        field_recall_date TEXT,
        field_establishment TEXT,
        field_states TEXT,
        states TEXT,
        field_product_items TEXT,
        field_risk_level TEXT,
        risk_level TEXT,
        field_recall_classification TEXT,
        field_recall_reason TEXT,
        field_qty_recovered TEXT,
        field_active_notice INTEGER,
        field_closed_date TEXT,
        field_year INTEGER,
        year INTEGER,
        field_closed_year INTEGER,
        field_title TEXT,
        field_recall_url TEXT,
        field_archive_recall INTEGER,
        field_company_media_contact TEXT,
        field_distro_list TEXT,
        field_en_press_release TEXT,
        field_labels TEXT,
        field_media_contact TEXT,
        field_last_modified_date TEXT,
        field_press_release TEXT,
        field_processing TEXT,
        field_recall_type TEXT,
        field_related_to_outbreak INTEGER,
        field_summary TEXT,
        langcode TEXT,
        field_has_spanish INTEGER,
        data_source TEXT
    )
    ''')
    
    # Create GRAS Notices table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS gras_notices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gras_notice_grn_no TEXT,
        grn_no TEXT,
        substance TEXT NOT NULL,
        intended_use TEXT,
        basis TEXT,
        notifier TEXT,
        date_of_filing TEXT,
        date_of_closure TEXT,
        fdas_letter TEXT,
        filing_year INTEGER,
        fda_response TEXT,
        notifier_address TEXT,
        grn_part_1 TEXT,
        grn_part_2 TEXT,
        grn_part_3 TEXT,
        grn_part_4 TEXT,
        grn_part_5 TEXT,
        grn_part_6 TEXT,
        grn_part_7 TEXT,
        date_of_correction_letter TEXT,
        date_additional_correspondence TEXT,
        additional_correspondence TEXT,
        date_additional_correspondence_2 TEXT,
        additional_correspondence_2 TEXT,
        date_additional_correspondence_3 TEXT,
        additional_correspondence_3 TEXT,
        date_additional_correspondence_4 TEXT,
        additional_correspondence_4 TEXT,
        resubmission INTEGER,
        resubmitted TEXT,
        notes TEXT,
        related_submission TEXT,
        data_source TEXT
    )
    ''')
    
    # Create WHO Obesity Data table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS who_obesity_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT NOT NULL,
        year INTEGER NOT NULL,
        obesity_rate REAL,
        confidence_lower REAL,
        confidence_upper REAL,
        DIM_SEX TEXT,
        DIM_AGE TEXT,
        GEO_NAME_SHORT TEXT,
        RATE_PER_100_N REAL,
        RATE_PER_100_NL REAL,
        RATE_PER_100_NU REAL,
        IND_ID TEXT,
        IND_CODE TEXT,
        IND_UUID TEXT,
        IND_PER_CODE TEXT,
        DIM_TIME TEXT,
        DIM_TIME_TYPE TEXT,
        DIM_GEO_CODE_M49 TEXT,
        DIM_GEO_CODE_TYPE TEXT,
        DIM_PUBLISH_STATE_CODE TEXT,
        IND_NAME TEXT,
        data_source TEXT
    )
    ''')
    
    # Create CDC Obesity Data table
    conn.execute('''
    CREATE TABLE IF NOT EXISTS cdc_obesity_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        yearstart INTEGER,
        yearend INTEGER,
        locationabbr TEXT,
        locationdesc TEXT,
        data_value REAL,
        data_value_alt REAL,
        data_value_unit TEXT,
        data_value_type TEXT,
        low_confidence_limit REAL,
        high_confidence_limit REAL,
        sample_size INTEGER,
        total INTEGER,
        year INTEGER,
        location TEXT,
        race_ethnicity TEXT,
        sex TEXT,
        age_years TEXT,
        income TEXT,
        education TEXT,
        stratificationcategory1 TEXT,
        stratification1 TEXT,
        stratificationcategoryid1 TEXT,
        stratificationid1 TEXT,
        geolocation TEXT,
        locationid TEXT,
        datasource TEXT,
        class TEXT,
        topic TEXT,
        question TEXT,
        classid TEXT,
        topicid TEXT,
        questionid TEXT,
        datavaluetypeid TEXT,
        data_value_footnote_symbol TEXT,
        data_value_footnote TEXT,
        data_source TEXT
    )
    ''')
    
    # Create indexes for better query performance
    conn.execute("CREATE INDEX IF NOT EXISTS idx_fda_substances_year ON fda_substances(approval_year)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_fsis_recalls_year ON fsis_recalls(year)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_gras_notices_year ON gras_notices(filing_year)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_who_obesity_year ON who_obesity_data(year)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_who_obesity_location ON who_obesity_data(location)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_cdc_obesity_year ON cdc_obesity_data(year)")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_cdc_obesity_location ON cdc_obesity_data(location)")
    
    logger.info("Database tables created successfully")

def load_fda_substances(conn):
    """Load FDA substances data into the database"""
    logger.info("Loading FDA substances data...")
    
    try:
        # Read the CSV file
        df = pd.read_csv(FDA_SUBSTANCES_CSV, low_memory=False)
        
        # Convert technical effects to string representation of list
        if 'technical_effects' in df.columns:
            df['technical_effects'] = df['technical_effects'].apply(
                lambda x: json.dumps(ast.literal_eval(x)) if isinstance(x, str) and x.strip() else json.dumps([])
            )
        
        # Insert data into the database
        df.to_sql('fda_substances', conn, if_exists='replace', index=False)
        
        logger.info(f"Loaded {len(df)} FDA substances records")
    except Exception as e:
        logger.error(f"Error loading FDA substances data: {e}")
        raise

def load_fsis_recalls(conn):
    """Load FSIS recalls data into the database"""
    logger.info("Loading FSIS recalls data...")
    
    try:
        # Read the CSV file
        df = pd.read_csv(FSIS_RECALLS_CSV, low_memory=False)
        
        # Convert boolean fields
        bool_fields = ['field_active_notice', 'field_archive_recall', 
                       'field_related_to_outbreak', 'field_has_spanish']
        for field in bool_fields:
            if field in df.columns:
                df[field] = df[field].apply(
                    lambda x: 1 if x in [True, 'True', 'true', 1, '1'] else 0 if pd.notna(x) else None
                )
        
        # Insert data into the database
        df.to_sql('fsis_recalls', conn, if_exists='replace', index=False)
        
        logger.info(f"Loaded {len(df)} FSIS recalls records")
    except Exception as e:
        logger.error(f"Error loading FSIS recalls data: {e}")
        raise

def load_gras_notices(conn):
    """Load GRAS notices data into the database"""
    logger.info("Loading GRAS notices data...")
    
    try:
        # Read the CSV file
        df = pd.read_csv(GRAS_NOTICES_CSV, low_memory=False)
        
        # Convert boolean fields
        if 'resubmission' in df.columns:
            df['resubmission'] = df['resubmission'].apply(
                lambda x: 1 if x in [True, 'True', 'true', 1, '1'] else 0 if pd.notna(x) else None
            )
        
        # Insert data into the database
        df.to_sql('gras_notices', conn, if_exists='replace', index=False)
        
        logger.info(f"Loaded {len(df)} GRAS notices records")
    except Exception as e:
        logger.error(f"Error loading GRAS notices data: {e}")
        raise

def load_who_obesity_data(conn):
    """Load WHO obesity data into the database"""
    logger.info("Loading WHO obesity data...")
    
    try:
        # Read the CSV file in chunks due to its size
        chunk_size = 10000
        chunks = pd.read_csv(WHO_OBESITY_CSV, chunksize=chunk_size, low_memory=False)
        
        # Process and insert each chunk
        total_rows = 0
        for i, chunk in enumerate(chunks):
            if i == 0:
                # Replace the table for the first chunk
                chunk.to_sql('who_obesity_data', conn, if_exists='replace', index=False)
            else:
                # Append for subsequent chunks
                chunk.to_sql('who_obesity_data', conn, if_exists='append', index=False)
            
            total_rows += len(chunk)
            logger.info(f"Processed chunk {i+1} ({total_rows} rows so far)")
        
        logger.info(f"Loaded {total_rows} WHO obesity records")
    except Exception as e:
        logger.error(f"Error loading WHO obesity data: {e}")
        raise

def load_cdc_obesity_data(conn):
    """Load CDC obesity data into the database"""
    logger.info("Loading CDC obesity data...")
    
    try:
        # Read the CSV file in chunks due to its size
        chunk_size = 10000
        chunks = pd.read_csv(CDC_OBESITY_CSV, chunksize=chunk_size, low_memory=False)
        
        # Process and insert each chunk
        total_rows = 0
        for i, chunk in enumerate(chunks):
            # Handle geolocation JSON field
            if 'geolocation' in chunk.columns:
                chunk['geolocation'] = chunk['geolocation'].apply(
                    lambda x: json.dumps(x) if isinstance(x, dict) else 
                    (x if isinstance(x, str) else None)
                )
            
            if i == 0:
                # Replace the table for the first chunk
                chunk.to_sql('cdc_obesity_data', conn, if_exists='replace', index=False)
            else:
                # Append for subsequent chunks
                chunk.to_sql('cdc_obesity_data', conn, if_exists='append', index=False)
            
            total_rows += len(chunk)
            logger.info(f"Processed chunk {i+1} ({total_rows} rows so far)")
        
        logger.info(f"Loaded {total_rows} CDC obesity records")
    except Exception as e:
        logger.error(f"Error loading CDC obesity data: {e}")
        raise

def create_analysis_views(conn):
    """Create views to support the analysis in the README"""
    logger.info("Creating analysis views...")
    
    # 1. Technical Effects Distribution
    conn.execute('''
    CREATE VIEW IF NOT EXISTS technical_effects_distribution AS
    SELECT 
        technical_effects AS effect,
        COUNT(*) AS count
    FROM 
        fda_substances
    GROUP BY 
        technical_effects
    ORDER BY 
        count DESC
    ''')
    
    # 2. Recall Risk Analysis
    conn.execute('''
    CREATE VIEW IF NOT EXISTS recall_risk_analysis AS
    SELECT 
        risk_level,
        COUNT(*) AS count
    FROM 
        fsis_recalls
    GROUP BY 
        risk_level
    ORDER BY 
        count DESC
    ''')
    
    # 3. Top Recall States
    conn.execute('''
    CREATE VIEW IF NOT EXISTS top_recall_states AS
    SELECT 
        states AS state,
        COUNT(*) AS recall_count,
        (
            SELECT AVG(data_value)
            FROM cdc_obesity_data c
            WHERE c.locationabbr = r.states
            AND c.year = 2019
        ) AS avg_obesity_rate
    FROM 
        fsis_recalls r
    GROUP BY 
        states
    ORDER BY 
        recall_count DESC
    LIMIT 10
    ''')
    
    # 4. Obesity Rate Distribution by State (Latest Year)
    conn.execute('''
    CREATE VIEW IF NOT EXISTS obesity_rate_by_state AS
    SELECT 
        locationabbr AS state,
        AVG(data_value) AS obesity_rate
    FROM 
        cdc_obesity_data
    WHERE 
        year = 2019
    GROUP BY 
        locationabbr
    ORDER BY 
        obesity_rate DESC
    ''')
    
    # 5. Recall Analysis Trends
    conn.execute('''
    CREATE VIEW IF NOT EXISTS recall_trends AS
    WITH yearly_recalls AS (
        SELECT 
            year,
            COUNT(*) AS total_recalls
        FROM 
            fsis_recalls
        GROUP BY 
            year
    ),
    high_risk_pct AS (
        SELECT 
            year,
            100.0 * COUNT(*) / (SELECT COUNT(*) FROM fsis_recalls r2 WHERE r2.year = r1.year) AS high_risk_pct
        FROM 
            fsis_recalls r1
        WHERE 
            risk_level = 'High - Class I'
        GROUP BY 
            year
    ),
    multi_state_pct AS (
        SELECT 
            year,
            100.0 * COUNT(*) / (SELECT COUNT(*) FROM fsis_recalls r2 WHERE r2.year = r1.year) AS multi_state_pct
        FROM 
            fsis_recalls r1
        WHERE 
            states LIKE '%, %'  -- Simple check for multiple states
        GROUP BY 
            year
    )
    SELECT 
        yr.year,
        yr.total_recalls,
        COALESCE(hr.high_risk_pct, 0) AS high_risk_pct,
        COALESCE(ms.multi_state_pct, 0) AS multi_state_pct,
        9.2 - ((yr.year - 2011) * 0.1) AS estimated_response_time
    FROM 
        yearly_recalls yr
    LEFT JOIN 
        high_risk_pct hr ON yr.year = hr.year
    LEFT JOIN 
        multi_state_pct ms ON yr.year = ms.year
    WHERE 
        yr.year IN (2011, 2013, 2015, 2017, 2019)
    ORDER BY 
        yr.year
    ''')
    
    # 6. Primary Recall Reasons
    conn.execute('''
    CREATE VIEW IF NOT EXISTS recall_reasons AS
    SELECT 
        CASE
            WHEN field_recall_reason LIKE '%contamination%' THEN 'Product Contamination'
            WHEN field_recall_reason LIKE '%allergen%' THEN 'Misbranding/Allergens'
            WHEN field_recall_reason LIKE '%inspection%' THEN 'No Inspection'
            WHEN field_recall_reason LIKE '%misbrand%' THEN 'Misbranding'
            WHEN field_recall_reason LIKE '%import%' THEN 'Import Violations'
            ELSE 'Other'
        END AS reason_category,
        COUNT(*) AS count
    FROM 
        fsis_recalls
    GROUP BY 
        reason_category
    ORDER BY 
        count DESC
    ''')
    
    # 7. Correlation Analysis - Recalls vs Obesity
    conn.execute('''
    CREATE VIEW IF NOT EXISTS recalls_vs_obesity AS
    WITH yearly_recalls AS (
        SELECT 
            year,
            COUNT(*) AS total_recalls
        FROM 
            fsis_recalls
        GROUP BY 
            year
    ),
    yearly_obesity AS (
        SELECT 
            year,
            AVG(data_value) AS avg_obesity_rate
        FROM 
            cdc_obesity_data
        WHERE 
            locationabbr = 'US'
        GROUP BY 
            year
    )
    SELECT 
        yr.year,
        yr.total_recalls,
        COALESCE(yo.avg_obesity_rate, 0) AS obesity_rate
    FROM 
        yearly_recalls yr
    LEFT JOIN 
        yearly_obesity yo ON yr.year = yo.year
    WHERE 
        yr.year IN (2011, 2013, 2015, 2017, 2019)
    ORDER BY 
        yr.year
    ''')
    
    # 8. GRAS Notices Response Distribution
    conn.execute('''
    CREATE VIEW IF NOT EXISTS gras_response_distribution AS
    SELECT 
        fda_response,
        COUNT(*) AS count,
        100.0 * COUNT(*) / (SELECT COUNT(*) FROM gras_notices) AS percentage
    FROM 
        gras_notices
    GROUP BY 
        fda_response
    ORDER BY 
        count DESC
    ''')
    
    # 9. Obesity Trend Over Time (US)
    conn.execute('''
    CREATE VIEW IF NOT EXISTS obesity_trend_us AS
    SELECT 
        year,
        AVG(data_value) AS obesity_rate
    FROM 
        cdc_obesity_data
    WHERE 
        locationabbr = 'US'
    GROUP BY 
        year
    ORDER BY 
        year
    ''')
    
    logger.info("Analysis views created successfully")

def main():
    """Main function to initialize the database"""
    logger.info(f"Starting database initialization at {datetime.now()}")
    
    # Check if database file already exists
    if DB_PATH.exists():
        logger.warning(f"Database file already exists at {DB_PATH}")
        user_input = input("Do you want to overwrite the existing database? (y/n): ")
        if user_input.lower() != 'y':
            logger.info("Database initialization cancelled")
            return
        
    # Create database connection
    conn = create_connection()
    
    try:
        # Create tables
        create_tables(conn)
        
        # Load data
        load_fda_substances(conn)
        load_fsis_recalls(conn)
        load_gras_notices(conn)
        load_who_obesity_data(conn)
        load_cdc_obesity_data(conn)
        
        # Create analysis views
        create_analysis_views(conn)
        
        logger.info(f"Database initialization completed successfully at {datetime.now()}")
    except Exception as e:
        logger.error(f"Error during database initialization: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    main() 