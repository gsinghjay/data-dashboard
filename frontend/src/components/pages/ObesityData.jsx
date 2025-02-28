import React from 'react';
import WorldObesityMap from '../charts/WorldObesityMap';

const ObesityData = () => {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-globe-americas me-2"></i>
              <h5 className="card-title mb-0">Global Obesity Trends</h5>
            </div>
            <div className="card-body p-4" style={{ height: '700px' }}>
              <WorldObesityMap />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              Data source: World Health Organization (WHO) obesity statistics. Use the controls above to explore rates by year and gender.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObesityData; 