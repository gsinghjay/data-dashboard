#!/usr/bin/env python3
"""
Enhanced Data Verification Script for Food Safety and Obesity Analysis
This script analyzes correlations between food safety regulations and obesity rates
to support the thesis: "What are the potential health implications of US food safety 
regulations when correlated with obesity rate over time?"
"""

import pandas as pd
import numpy as np
from pathlib import Path
from datetime import datetime
import json
from typing import Dict, Any, List
from scipy import stats

class DataVerifier:
    def __init__(self):
        """Initialize paths and load datasets"""
        self.base_path = Path('etl/data/processed')
        self.datasets = self._load_datasets()
        self.results = {}
        
    def _load_datasets(self) -> Dict[str, pd.DataFrame]:
        """Load all processed datasets"""
        try:
            return {
                'fda': pd.read_csv(self.base_path / 'processed_fda_substances.csv'),
                'gras': pd.read_csv(self.base_path / 'processed_gras_notices.csv'),
                'who': pd.read_csv(self.base_path / 'processed_who_obesity_data.csv'),
                'cdc': pd.read_csv(self.base_path / 'processed_cdc_obesity_data.csv'),
                'recalls': pd.read_csv(self.base_path / 'processed_fsis_recalls.csv'),
                'fda_yearly': pd.read_csv(self.base_path / 'fda_approvals_by_year.csv')
            }
        except FileNotFoundError as e:
            print(f"Error loading datasets: {e}")
            raise

    def get_csv_headers(self) -> Dict[str, List[str]]:
        """Get headers from all CSV files in the processed directory"""
        headers = {}
        try:
            for file_path in self.base_path.glob('*.csv'):
                if file_path.name.endswith('.old'):  # Skip backup files
                    continue
                try:
                    # Read just the header row
                    df = pd.read_csv(file_path, nrows=0)
                    headers[file_path.name] = list(df.columns)
                except Exception as e:
                    print(f"Error reading headers from {file_path.name}: {e}")
        except Exception as e:
            print(f"Error accessing processed directory: {e}")
        return headers

    def analyze_dataset(self, name: str, df: pd.DataFrame) -> Dict[str, Any]:
        """Generate basic statistics for a dataset"""
        return {
            'record_count': len(df),
            'column_count': len(df.columns),
            'null_percentages': df.isnull().mean().sort_values(ascending=False).head().to_dict(),
            'memory_usage': df.memory_usage(deep=True).sum() / 1024 / 1024  # MB
        }

    def verify_fda_substances(self) -> Dict[str, Any]:
        """Verify FDA substances statistics"""
        df = self.datasets['fda']
        
        # Technical effects analysis
        tech_effects = df['technical_effects'].str.strip('[]').str.split(',').explode()
        tech_effects = tech_effects.str.strip().str.strip("'").value_counts()
        
        return {
            'total': int(len(df)),
            'technical_effects': {
                effect: int(count) for effect, count in tech_effects.items()
                if pd.notna(effect) and effect
            },
            'cas_validation_rate': float(df['cas_reg_no'].notna().mean() * 100),
            'year_range': {
                'start': float(df['approval_year'].min()),
                'end': float(df['approval_year'].max())
            }
        }

    def verify_gras_notices(self) -> Dict[str, Any]:
        """Verify GRAS notices statistics"""
        df = self.datasets['gras']
        
        return {
            'total': int(len(df)),
            'response_distribution': {
                str(k): int(v) for k, v in df['fda_response'].value_counts().to_dict().items()
            },
            'validation_rates': {
                'filing_dates': float(df['date_of_filing'].notna().mean() * 100),
                'closure_dates': float(df['date_of_closure'].notna().mean() * 100)
            },
            'year_range': {
                'start': float(df['filing_year'].min()),
                'end': float(df['filing_year'].max())
            }
        }

    def verify_obesity_data(self) -> Dict[str, Any]:
        """Verify WHO and CDC obesity statistics"""
        who_df = self.datasets['who']
        cdc_df = self.datasets['cdc']
        
        # Extract years from date fields
        who_years = who_df['DIM_TIME'].astype(int)  # Already in year format
        cdc_years = pd.to_datetime(cdc_df['year']).dt.year
        
        # Calculate CDC obesity rate change
        cdc_2011 = float(cdc_df[cdc_df['year'].str.startswith('2011')]['data_value'].mean())
        cdc_2023 = float(cdc_df[cdc_df['year'].str.startswith('2023')]['data_value'].mean())
        
        return {
            'who': {
                'total_records': int(len(who_df)),
                'year_range': {
                    'start': int(who_years.min()),
                    'end': int(who_years.max())
                }
            },
            'cdc': {
                'total_records': int(len(cdc_df)),
                'year_range': {
                    'start': int(cdc_years.min()),
                    'end': int(cdc_years.max())
                },
                'obesity_rates': {
                    '2011': cdc_2011,
                    '2023': cdc_2023,
                    'change': cdc_2023 - cdc_2011
                }
            }
        }

    def analyze_temporal_correlations(self) -> Dict[str, Any]:
        """Analyze correlations between food safety metrics and obesity rates over time"""
        
        # Prepare yearly metrics
        yearly_metrics = pd.DataFrame()
        
        try:
            # FDA approvals by year
            fda_yearly = self.datasets['fda_yearly'].set_index('year')['new_approvals']
            yearly_metrics['fda_approvals'] = fda_yearly
            
            # GRAS notices by year
            gras_yearly = self.datasets['gras']['filing_year'].value_counts().sort_index()
            yearly_metrics['gras_notices'] = gras_yearly
            
            # FSIS recalls by year
            recalls_yearly = self.datasets['recalls']['year'].value_counts().sort_index()
            yearly_metrics['recalls'] = recalls_yearly
            
            # CDC obesity rates (average across states per year)
            cdc_yearly = self.datasets['cdc'].groupby('year')['data_value'].mean()
            yearly_metrics['obesity_rate'] = cdc_yearly
            
            # Calculate correlations
            correlations = {}
            for metric in ['fda_approvals', 'gras_notices', 'recalls']:
                if metric in yearly_metrics.columns:
                    # Align years and calculate correlation
                    metric_data = yearly_metrics[metric].dropna()
                    obesity_data = yearly_metrics['obesity_rate'].dropna()
                    common_years = metric_data.index.intersection(obesity_data.index)
                    
                    if len(common_years) > 1:  # Need at least 2 points for correlation
                        correlation = stats.pearsonr(
                            metric_data[common_years].astype(float),
                            obesity_data[common_years].astype(float)
                        )
                        correlations[metric] = {
                            'correlation': float(correlation[0]),
                            'p_value': float(correlation[1]),
                            'years_analyzed': len(common_years),
                            'year_range': f"{min(common_years)}-{max(common_years)}"
                        }
                    else:
                        correlations[metric] = {
                            'correlation': None,
                            'p_value': None,
                            'years_analyzed': len(common_years),
                            'year_range': "Insufficient data for correlation"
                        }
        except Exception as e:
            print(f"Warning: Error in correlation analysis: {e}")
            return {}
        
        return correlations

    def analyze_risk_patterns(self) -> Dict[str, Any]:
        """Analyze patterns in food safety risks"""
        recalls_df = self.datasets['recalls']
        
        # Risk level distribution
        risk_levels = recalls_df['risk_level'].value_counts().to_dict()
        
        # Most common recall reasons
        recall_reasons = recalls_df['recall_reason'].value_counts().head(5).to_dict()
        
        # Geographic distribution
        state_distribution = {}
        for states in recalls_df['states'].dropna():
            if isinstance(states, str):
                for state in states.split('|'):  # Changed from comma to pipe since that's how we store it
                    state = state.strip()
                    if state != 'Nationwide':
                        state_distribution[state] = state_distribution.get(state, 0) + 1
        
        return {
            'risk_levels': {str(k): int(v) for k, v in risk_levels.items()},
            'top_recall_reasons': {str(k): int(v) for k, v in recall_reasons.items()},
            'state_distribution': {k: v for k, v in sorted(state_distribution.items(), 
                                                         key=lambda x: x[1], reverse=True)[:10]}
        }

    def analyze_obesity_trends(self) -> Dict[str, Any]:
        """Analyze detailed obesity trends"""
        cdc_df = self.datasets['cdc']
        
        try:
            # Calculate year-over-year changes
            yearly_rates = cdc_df.groupby('year')['data_value'].mean()
            yoy_changes = yearly_rates.pct_change() * 100
            
            # Find states with highest/lowest rates
            latest_year = cdc_df['year'].max()
            latest_data = cdc_df[cdc_df['year'] == latest_year]
            
            # Group by state (locationabbr) and get mean values
            state_rates = latest_data.groupby('locationabbr')['data_value'].mean()
            highest_states = state_rates.nlargest(5)
            lowest_states = state_rates.nsmallest(5)
            
            return {
                'yearly_rates': yearly_rates.to_dict(),
                'yoy_changes': yoy_changes.to_dict(),
                'state_extremes': {
                    'highest': highest_states.to_dict(),
                    'lowest': lowest_states.to_dict()
                }
            }
        except Exception as e:
            print(f"Warning: Error in obesity trend analysis: {e}")
            return {
                'yearly_rates': {},
                'yoy_changes': {},
                'state_extremes': {'highest': {}, 'lowest': {}}
            }

    def generate_markdown_report(self) -> str:
        """Generate markdown report with all statistics"""
        template = """# Data Verification Report
Generated: {timestamp}

## FDA Substances
- Total Records: {fda_total:,}
- CAS Number Validation Rate: {fda_cas_rate:.1f}%
- Year Range: {fda_year_start:.0f} - {fda_year_end:.0f}

### Technical Effects Distribution
{technical_effects}

## GRAS Notices
- Total Records: {gras_total:,}
- Filing Dates Validation: {gras_filing_rate:.1f}%
- Closure Dates Validation: {gras_closure_rate:.1f}%
- Year Range: {gras_year_start:.0f} - {gras_year_end:.0f}

### FDA Response Distribution
{response_distribution}

## Obesity Data

### WHO Statistics
- Total Records: {who_total:,}
- Year Range: {who_year_start:.0f} - {who_year_end:.0f}

### CDC Statistics
- Total Records: {cdc_total:,}
- Year Range: {cdc_year_start:.0f} - {cdc_year_end:.0f}
- Obesity Rate Change:
  - 2011: {cdc_2011:.2f}%
  - 2023: {cdc_2023:.2f}%
  - Change: {cdc_change:+.2f}%
"""
        
        # Format technical effects
        tech_effects = '\n'.join([
            f"- {effect}: {count:,} ({count/self.results['fda']['total']*100:.1f}%)"
            for effect, count in self.results['fda']['technical_effects'].items()
        ])
        
        # Format FDA responses
        responses = '\n'.join([
            f"- {response}: {count:,} ({count/self.results['gras']['total']*100:.1f}%)"
            for response, count in self.results['gras']['response_distribution'].items()
        ])
        
        # Prepare formatting values
        format_values = {
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'technical_effects': tech_effects,
            'response_distribution': responses,
            'fda_total': self.results['fda']['total'],
            'fda_cas_rate': self.results['fda']['cas_validation_rate'],
            'fda_year_start': self.results['fda']['year_range']['start'],
            'fda_year_end': self.results['fda']['year_range']['end'],
            'gras_total': self.results['gras']['total'],
            'gras_filing_rate': self.results['gras']['validation_rates']['filing_dates'],
            'gras_closure_rate': self.results['gras']['validation_rates']['closure_dates'],
            'gras_year_start': self.results['gras']['year_range']['start'],
            'gras_year_end': self.results['gras']['year_range']['end'],
            'who_total': self.results['obesity']['who']['total_records'],
            'who_year_start': self.results['obesity']['who']['year_range']['start'],
            'who_year_end': self.results['obesity']['who']['year_range']['end'],
            'cdc_total': self.results['obesity']['cdc']['total_records'],
            'cdc_year_start': self.results['obesity']['cdc']['year_range']['start'],
            'cdc_year_end': self.results['obesity']['cdc']['year_range']['end'],
            'cdc_2011': self.results['obesity']['cdc']['obesity_rates']['2011'],
            'cdc_2023': self.results['obesity']['cdc']['obesity_rates']['2023'],
            'cdc_change': self.results['obesity']['cdc']['obesity_rates']['change']
        }
        
        return template.format(**format_values)

    def verify_all(self) -> None:
        """Run all verifications and store results"""
        print("Starting enhanced verification process...")
        
        # Run existing verifications
        self.results = {
            'fda': self.verify_fda_substances(),
            'gras': self.verify_gras_notices(),
            'obesity': self.verify_obesity_data()
        }
        
        # Add new analyses
        self.results.update({
            'temporal_correlations': self.analyze_temporal_correlations(),
            'risk_patterns': self.analyze_risk_patterns(),
            'obesity_trends': self.analyze_obesity_trends()
        })
        
        # Generate enhanced report
        report = self.generate_enhanced_report()
        report_path = Path('verification/verification_report.md')
        report_path.parent.mkdir(exist_ok=True)
        report_path.write_text(report)
        
        # Save raw results
        results_path = Path('verification/verification_results.json')
        with results_path.open('w') as f:
            json.dump(self.results, f, indent=2)
        
        print(f"\nEnhanced verification complete!")
        print(f"Report saved to: {report_path}")
        print(f"Raw results saved to: {results_path}")

    def generate_enhanced_report(self) -> str:
        """Generate enhanced markdown report with correlation analysis"""
        # Start with basic report
        report = self.generate_markdown_report()
        
        # Add headers section
        headers = self.get_csv_headers()
        headers_section = "\n## CSV Headers\n\n"
        for filename, cols in headers.items():
            headers_section += f"### {filename}\n"
            for i, col in enumerate(cols, 1):
                headers_section += f"{i}. {col}\n"
            headers_section += "\n"
        
        # Add correlation analysis section
        correlations = self.results.get('temporal_correlations', {})
        risk_patterns = self.results.get('risk_patterns', {})
        obesity_trends = self.results.get('obesity_trends', {})
        
        correlation_section = """
## Correlation Analysis

### Food Safety Regulations vs Obesity Rates
"""
        for metric, data in correlations.items():
            if data is None:
                continue
            correlation = data.get('correlation')
            p_value = data.get('p_value')
            correlation_section += f"""
#### {metric.replace('_', ' ').title()} vs Obesity Rate
- Correlation Coefficient: {f"{correlation:.3f}" if correlation is not None else "Insufficient data"}
- Statistical Significance (p-value): {f"{p_value:.3f}" if p_value is not None else "Not applicable"}
- Time Period Analyzed: {data.get('year_range', 'Unknown')} ({data.get('years_analyzed', 0)} years)
"""

        risk_section = """
## Food Safety Risk Analysis

### Recall Risk Levels
"""
        for level, count in risk_patterns.get('risk_levels', {}).items():
            risk_section += f"- {level}: {count:,}\n"

        risk_section += "\n### Top Recall Reasons\n"
        for reason, count in risk_patterns.get('top_recall_reasons', {}).items():
            risk_section += f"- {reason}: {count:,}\n"

        obesity_section = """
## Detailed Obesity Analysis

### States with Highest Obesity Rates (Latest Year)
"""
        for state, rate in obesity_trends.get('state_extremes', {}).get('highest', {}).items():
            obesity_section += f"- {state}: {rate:.1f}%\n"

        obesity_section += "\n### States with Lowest Obesity Rates (Latest Year)\n"
        for state, rate in obesity_trends.get('state_extremes', {}).get('lowest', {}).items():
            obesity_section += f"- {state}: {rate:.1f}%\n"

        # Combine all sections
        return report + headers_section + correlation_section + risk_section + obesity_section

def main():
    """Main execution function"""
    try:
        verifier = DataVerifier()
        verifier.verify_all()
    except Exception as e:
        print(f"Error during verification: {e}")
        raise

if __name__ == "__main__":
    main() 