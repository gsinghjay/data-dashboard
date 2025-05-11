import Database from 'better-sqlite3';
import path from 'path';
import { FertilityRate, EducationGroup, State } from '../types/data';

// Initialize database connection
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    try {
      // Resolve the path to the database file
      const dbPath = path.resolve(process.cwd(), 'scripts/data/db/fertility_education.db');
      db = new Database(dbPath, { readonly: true });
      
      // Remove pragma statements since we're in readonly mode
      console.log('Database connection established');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw new Error('Database connection failed');
    }
  }
  return db;
}

// Helper function to close the database connection
export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}

// Function to get all education groups
export function getEducationGroups(): EducationGroup[] {
  try {
    const db = getDb();
    return db.prepare('SELECT * FROM education_groups ORDER BY display_order').all() as EducationGroup[];
  } catch (error) {
    console.error('Error fetching education groups:', error);
    return [];
  }
}

// Function to get all states
export function getStates(): State[] {
  try {
    const db = getDb();
    return db.prepare('SELECT * FROM states ORDER BY name').all() as State[];
  } catch (error) {
    console.error('Error fetching states:', error);
    return [];
  }
}

// Function to get fertility rates with filtering options
export function getFertilityRates(options: {
  year?: number | number[];
  state_code?: string | string[];
  education_group?: string | string[];
  limit?: number;
}): FertilityRate[] {
  try {
    const db = getDb();
    
    let query = 'SELECT * FROM fertility_rates WHERE 1=1';
    const params: any[] = [];
    
    // Build WHERE clauses based on provided filters
    if (options.year) {
      if (Array.isArray(options.year)) {
        query += ` AND year IN (${options.year.map(() => '?').join(',')})`;
        params.push(...options.year);
      } else {
        query += ' AND year = ?';
        params.push(options.year);
      }
    }
    
    if (options.state_code) {
      if (Array.isArray(options.state_code)) {
        query += ` AND state_code IN (${options.state_code.map(() => '?').join(',')})`;
        params.push(...options.state_code);
      } else {
        query += ' AND state_code = ?';
        params.push(options.state_code);
      }
    }
    
    if (options.education_group) {
      if (Array.isArray(options.education_group)) {
        query += ` AND education_group IN (${options.education_group.map(() => '?').join(',')})`;
        params.push(...options.education_group);
      } else {
        query += ' AND education_group = ?';
        params.push(options.education_group);
      }
    }
    
    // Add limit if specified
    if (options.limit) {
      query += ' LIMIT ?';
      params.push(options.limit);
    }
    
    // Prepare and execute the query
    const stmt = db.prepare(query);
    return stmt.all(...params) as FertilityRate[];
  } catch (error) {
    console.error('Error fetching fertility rates:', error);
    return [];
  }
}

// Function to get national trends from the view
export function getNationalTrends(options: {
  year?: number | number[];
  education_group?: string | string[];
}): any[] {
  try {
    const db = getDb();
    
    let query = 'SELECT * FROM national_trends WHERE 1=1';
    const params: any[] = [];
    
    if (options.year) {
      if (Array.isArray(options.year)) {
        query += ` AND year IN (${options.year.map(() => '?').join(',')})`;
        params.push(...options.year);
      } else {
        query += ' AND year = ?';
        params.push(options.year);
      }
    }
    
    if (options.education_group) {
      if (Array.isArray(options.education_group)) {
        query += ` AND education_group IN (${options.education_group.map(() => '?').join(',')})`;
        params.push(...options.education_group);
      } else {
        query += ' AND education_group = ?';
        params.push(options.education_group);
      }
    }
    
    query += ' ORDER BY year, education_group';
    
    const stmt = db.prepare(query);
    return stmt.all(...params);
  } catch (error) {
    console.error('Error fetching national trends:', error);
    return [];
  }
}

// Function to get state comparison data
export function getStateComparison(options: {
  education_group?: string | string[];
  year?: number;
}): any[] {
  try {
    const db = getDb();
    
    // Instead of using the state_comparison view which only has the most recent year,
    // query the fertility_rates table directly to support filtering by year
    let query = `
      SELECT year, state_code, state_name, education_group, women_count, births, fertility_rate 
      FROM fertility_rates 
      WHERE 1=1
    `;
    const params: any[] = [];
    
    // Add year filter if provided, otherwise use the most recent year
    if (options.year) {
      query += ' AND year = ?';
      params.push(options.year);
    } else {
      query += ' AND year = (SELECT MAX(year) FROM fertility_rates)';
    }
    
    if (options.education_group) {
      if (Array.isArray(options.education_group)) {
        query += ` AND education_group IN (${options.education_group.map(() => '?').join(',')})`;
        params.push(...options.education_group);
      } else {
        query += ' AND education_group = ?';
        params.push(options.education_group);
      }
    }
    
    query += ' ORDER BY state_name';
    
    const stmt = db.prepare(query);
    return stmt.all(...params);
  } catch (error) {
    console.error('Error fetching state comparison:', error);
    return [];
  }
}

// Function to get education comparison data
export function getEducationComparison(options: {
  year?: number | number[];
  state_code?: string | string[];
}): any[] {
  try {
    const db = getDb();
    
    let query = 'SELECT * FROM education_comparison WHERE 1=1';
    const params: any[] = [];
    
    if (options.year) {
      if (Array.isArray(options.year)) {
        query += ` AND year IN (${options.year.map(() => '?').join(',')})`;
        params.push(...options.year);
      } else {
        query += ' AND year = ?';
        params.push(options.year);
      }
    }
    
    if (options.state_code) {
      if (Array.isArray(options.state_code)) {
        query += ` AND state_code IN (${options.state_code.map(() => '?').join(',')})`;
        params.push(...options.state_code);
      } else {
        query += ' AND state_code = ?';
        params.push(options.state_code);
      }
    }
    
    query += ' ORDER BY year, display_order';
    
    const stmt = db.prepare(query);
    return stmt.all(...params);
  } catch (error) {
    console.error('Error fetching education comparison:', error);
    return [];
  }
}

// Function to get summary statistics
export function getSummaryStats(): any {
  try {
    const db = getDb();
    
    const yearRange = db.prepare('SELECT MIN(year) as minYear, MAX(year) as maxYear FROM fertility_rates').get();
    const totalRecords = db.prepare('SELECT COUNT(*) as count FROM fertility_rates').get();
    const educationGroupCount = db.prepare('SELECT COUNT(*) as count FROM education_groups').get();
    const stateCount = db.prepare('SELECT COUNT(*) as count FROM states').get();
    
    return {
      yearRange,
      totalRecords,
      educationGroupCount,
      stateCount
    };
  } catch (error) {
    console.error('Error fetching summary stats:', error);
    return {
      yearRange: { minYear: 2006, maxYear: 2023 },
      totalRecords: { count: 0 },
      educationGroupCount: { count: 0 },
      stateCount: { count: 0 }
    };
  }
} 