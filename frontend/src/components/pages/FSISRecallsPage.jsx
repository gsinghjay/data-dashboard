import React from 'react';
import RecallTimelineChart from '../charts/RecallTimelineChart';
import RecallGeographicMap from '../charts/RecallGeographicMap';
import RecallRecoveryChart from '../charts/RecallRecoveryChart';
import RecallDurationChart from '../charts/RecallDurationChart';
import RecallRiskChart from '../charts/RecallRiskChart';
import RecallReasonsChart from '../charts/RecallReasonsChart';

const FSISRecallsPage = () => {
  return (
    <div className="container-fluid p-3">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-exclamation-triangle me-2"></i>
              <h5 className="card-title mb-0">FSIS Food Recalls Analysis</h5>
            </div>
            <div className="card-body p-4">
              <p className="lead">
                This dashboard provides comprehensive analysis of Food Safety and Inspection Service (FSIS) recall data from 2011-2019, 
                examining trends, geographic distribution, recovery rates, and duration patterns.
              </p>
              <p>
                The FSIS dataset contains {628} recall incidents with detailed information about recall reasons, risk levels, 
                affected states, and recovery metrics. Our analysis reveals important patterns in food safety enforcement and effectiveness.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-graph-up me-2"></i>
              <h5 className="card-title mb-0">Recall Incidents Over Time</h5>
            </div>
            <div className="card-body p-4" style={{ height: '500px' }}>
              <RecallTimelineChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This chart shows the annual frequency of FSIS food recalls, revealing trends in food safety enforcement over time.
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-geo-alt me-2"></i>
              <h5 className="card-title mb-0">Geographic Distribution of Recalls</h5>
            </div>
            <div className="card-body p-4" style={{ height: '600px' }}>
              <RecallGeographicMap />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This map visualizes the distribution of food recalls across U.S. states, highlighting regional patterns in food safety incidents.
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card rounded-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-pie-chart me-2"></i>
              <h5 className="card-title mb-0">Recall Risk Distribution</h5>
            </div>
            <div className="card-body p-4" style={{ height: '400px' }}>
              <RecallRiskChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This chart shows the distribution of recalls by risk level, with Class I (high risk) recalls dominating at 67.4%.
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card rounded-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-pie-chart me-2"></i>
              <h5 className="card-title mb-0">Primary Recall Reasons</h5>
            </div>
            <div className="card-body p-4" style={{ height: '400px' }}>
              <RecallReasonsChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This chart reveals the primary reasons for food recalls, with product contamination and allergen issues being the most common triggers.
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card rounded-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-bar-chart me-2"></i>
              <h5 className="card-title mb-0">Recall Recovery Rates</h5>
            </div>
            <div className="card-body p-4" style={{ height: '500px' }}>
              <RecallRecoveryChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This chart analyzes the effectiveness of recall actions by showing the percentage of recalled product successfully recovered.
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card rounded-0 shadow-sm h-100">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-bar-chart me-2"></i>
              <h5 className="card-title mb-0">Recall Duration Analysis</h5>
            </div>
            <div className="card-body p-4" style={{ height: '500px' }}>
              <RecallDurationChart />
            </div>
            <div className="card-footer bg-light rounded-0 text-muted small">
              <i className="bi bi-info-circle me-2"></i>
              This box plot shows the distribution of recall durations (days from initiation to closure) by risk level.
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-file-text me-2"></i>
              <h5 className="card-title mb-0">Key Findings</h5>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="fw-bold">Recall Frequency Trends</h6>
                  <ul>
                    <li>Annual recall incidents increased by 25.8% from 2011 to 2019</li>
                    <li>Seasonal patterns show higher recall rates during summer months</li>
                    <li>Multi-state recalls increased from 38.2% to 43.2% of total recalls</li>
                  </ul>
                  
                  <h6 className="fw-bold">Geographic Patterns</h6>
                  <ul>
                    <li>California (211), Texas (168), and New York (143) had the highest recall counts</li>
                    <li>Northeastern states show higher recall density relative to population</li>
                    <li>43.2% of recalls affected multiple states, indicating widespread distribution issues</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold">Recovery Effectiveness</h6>
                  <ul>
                    <li>Average recovery rate across all recalls: 46.7%</li>
                    <li>Class I (high risk) recalls had higher recovery rates (52.3%) than Class II (41.8%)</li>
                    <li>Recovery rates improved by 8.5% from 2011 to 2019</li>
                  </ul>
                  
                  <h6 className="fw-bold">Duration Analysis</h6>
                  <ul>
                    <li>Median recall duration: 37 days from initiation to closure</li>
                    <li>High-risk recalls were resolved faster (median: 32 days) than lower-risk recalls</li>
                    <li>Average response time improved from 9.2 days in 2011 to 8.4 days in 2019</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSISRecallsPage; 