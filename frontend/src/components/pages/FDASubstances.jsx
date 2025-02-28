import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import BarChart from '../charts/BarChart';
import { processFDASubstances } from '../../utils/dataProcessing';

const FDASubstances = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/src/data/processed_fda_substances.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        const rawData = d3.csvParse(csvText);
        
        // Process the data using our utility function
        const processedData = rawData.map(processFDASubstances);
        
        // Count technical effects
        const effectCounts = {};
        processedData.forEach(row => {
          if (row.technical_effects) {
            row.technical_effects.forEach(effect => {
              // Ensure effect is trimmed and not empty
              const trimmedEffect = effect.trim();
              if (trimmedEffect) {
                effectCounts[trimmedEffect] = (effectCounts[trimmedEffect] || 0) + 1;
              }
            });
          }
        });
        
        // Convert to array format for BarChart
        const chartData = Object.entries(effectCounts)
          .map(([label, value]) => ({ label, value }))
          .sort((a, b) => b.value - a.value);
        
        // Display all technical effects instead of just top 10
        setData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading FDA substances data:', error);
        setError('Failed to load FDA substances data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50 py-5">
        <div className="spinner-border text-primary rounded-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger rounded-0 m-3 d-flex align-items-center" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-box-seam me-2"></i>
              <h5 className="card-title mb-0">FDA Substances by Technical Effect</h5>
            </div>
            <div className="card-body p-4" style={{ height: '600px' }}>
              <BarChart data={data} />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              Showing {data.length} technical effects from {data.reduce((sum, item) => sum + item.value, 0)} total substances
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDASubstances; 