import React, { useState, useEffect } from 'react';
import BarChart from '../charts/BarChart';

const FDASubstances = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Sample data - replace with actual API call
    const sampleData = [
      { label: 'FLAVOR', value: 3077 },
      { label: 'TEXTURE', value: 292 },
      { label: 'PROCESSING', value: 222 },
      { label: 'NUTRIENT', value: 189 },
      { label: 'COLOR', value: 128 },
      { label: 'PRESERVATIVE', value: 114 }
    ];

    setData(sampleData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger rounded-0" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0">
              <h5 className="card-title mb-0">
                <i className="bi bi-box-seam me-2"></i>
                FDA Substances by Technical Effect
              </h5>
            </div>
            <div className="card-body">
              <BarChart data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDASubstances; 