import React from 'react';
import WorldObesityMap from '../charts/WorldObesityMap';

const ObesityData = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Global Obesity Trends</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">World Obesity Map</h5>
              <p className="card-text text-muted mb-4">
                Explore global obesity rates across different years and demographics.
                Data source: World Health Organization (WHO) obesity statistics.
              </p>
              <WorldObesityMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObesityData; 