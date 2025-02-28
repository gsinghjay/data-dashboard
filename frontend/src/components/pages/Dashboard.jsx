import React, { useState } from 'react';
import FSMAImplementationChart from '../charts/FSMAImplementationChart';
import TechnicalEffectsChart from '../charts/TechnicalEffectsChart';
import RecallRiskChart from '../charts/RecallRiskChart';
import TopRecallStatesChart from '../charts/TopRecallStatesChart';
import ObesityRateChart from '../charts/ObesityRateChart';
import RecallTrendChart from '../charts/RecallTrendChart';
import RecallReasonsChart from '../charts/RecallReasonsChart';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-question-circle me-2"></i>
                    <h5 className="card-title mb-0">Essential Question</h5>
                  </div>
                  <div className="card-body p-4">
                    <p className="lead">How have U.S. food safety regulations since 2011 impacted public health outcomes and regulatory effectiveness?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-file-text me-2"></i>
                    <h5 className="card-title mb-0">Executive Summary</h5>
                  </div>
                  <div className="card-body p-4">
                    <p>Our comprehensive analysis of 2011-2019 reveals a complex regulatory landscape. While approximately 3,000 chemicals entered the food supply through GRAS self-determinations, FSMA implementation strengthened oversight through mandatory controls. Analysis of 104,272 CDC records and 20,790 WHO observations shows obesity rates increased from 31.48% to 35.2%, suggesting multiple contributing factors beyond regulatory frameworks.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'regulatory':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-calendar-range me-2"></i>
                    <h5 className="card-title mb-0">FSMA Implementation Timeline</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '500px' }}>
                    <FSMAImplementationChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This chart illustrates the parallel implementation of FSMA regulations and corresponding health metrics.
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="card rounded-0 shadow-sm h-100">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-pie-chart me-2"></i>
                    <h5 className="card-title mb-0">Technical Effects Distribution</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '400px' }}>
                    <TechnicalEffectsChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This pie chart reveals a significant imbalance in approved substances, with flavor enhancers dominating at 77.2%.
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card rounded-0 shadow-sm h-100">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-graph-up me-2"></i>
                    <h5 className="card-title mb-0">Recall Risk Analysis</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '400px' }}>
                    <RecallRiskChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This hierarchical diagram shows the distribution of food safety incidents by risk level.
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'geographic':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-geo-alt me-2"></i>
                    <h5 className="card-title mb-0">Top Recall States (2011-2019)</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '500px' }}>
                    <TopRecallStatesChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This geographic analysis reveals a complex relationship between recall frequency and obesity rates.
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-bar-chart me-2"></i>
                    <h5 className="card-title mb-0">Obesity Rate Distribution</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '400px' }}>
                    <ObesityRateChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This comparison highlights the significant geographic disparity in obesity rates.
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'statistical':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-table me-2"></i>
                    <h5 className="card-title mb-0">Recall Analysis Trends</h5>
                  </div>
                  <div className="card-body p-4">
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Year</th>
                            <th>Total Recalls</th>
                            <th>High Risk %</th>
                            <th>Multi-State %</th>
                            <th>Response Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2011</td>
                            <td>89</td>
                            <td>62.4%</td>
                            <td>38.2%</td>
                            <td>9.2 days</td>
                          </tr>
                          <tr>
                            <td>2013</td>
                            <td>94</td>
                            <td>64.8%</td>
                            <td>40.1%</td>
                            <td>8.8 days</td>
                          </tr>
                          <tr>
                            <td>2015</td>
                            <td>103</td>
                            <td>66.2%</td>
                            <td>41.5%</td>
                            <td>8.6 days</td>
                          </tr>
                          <tr>
                            <td>2017</td>
                            <td>108</td>
                            <td>66.9%</td>
                            <td>42.3%</td>
                            <td>8.5 days</td>
                          </tr>
                          <tr>
                            <td>2019</td>
                            <td>112</td>
                            <td>67.4%</td>
                            <td>43.2%</td>
                            <td>8.4 days</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6 mb-4 mb-md-0">
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
                    This distribution of recall triggers shows that product contamination (38.9%) and allergen-related issues (27.3%) account for two-thirds of all recalls.
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card rounded-0 shadow-sm h-100">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-graph-up me-2"></i>
                    <h5 className="card-title mb-0">Recall Incidents vs Obesity Rates</h5>
                  </div>
                  <div className="card-body p-4" style={{ height: '400px' }}>
                    <RecallTrendChart />
                  </div>
                  <div className="card-footer bg-light rounded-0 text-muted small">
                    <i className="bi bi-info-circle me-2"></i>
                    This dual-axis chart reveals parallel trends between recall incidents and obesity rates.
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'conclusion':
        return (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-check-circle me-2"></i>
                    <h5 className="card-title mb-0">Conclusion</h5>
                  </div>
                  <div className="card-body p-4">
                    <p>Our analysis of 104,272 CDC records and 20,790 WHO observations reveals a complex relationship between food safety regulations and public health outcomes. While FSMA implementation has improved safety metrics (67.4% high-risk recall identification, 43.2% multi-state coordination), the parallel increase in obesity rates (31.48% to 35.2%) suggests the need for a more comprehensive approach to public health regulation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <div className="card rounded-0 shadow-sm">
                  <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
                    <i className="bi bi-clipboard-data me-2"></i>
                    <h5 className="card-title mb-0">Methodology</h5>
                  </div>
                  <div className="card-body p-4">
                    <p>Analysis based on:</p>
                    <ul>
                      <li>CDC Obesity Data: 104,272 records</li>
                      <li>WHO Global Data: 20,790 records</li>
                      <li>FDA Substances: 3,971 records</li>
                      <li>GRAS Notices: 1,219 records</li>
                      <li>Recall Data: 1,364 records</li>
                    </ul>
                    <p>Statistical validation:</p>
                    <ul>
                      <li>Confidence level: 95%</li>
                      <li>Data completeness: 97.7%</li>
                      <li>Geographic coverage: All 50 states plus territories</li>
                      <li>Time period: 2011-2019</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return <div>Select a section to view</div>;
    }
  };

  return (
    <div className="container-fluid p-3">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card rounded-0 shadow-sm">
            <div className="card-header bg-dark text-white rounded-0 d-flex align-items-center">
              <i className="bi bi-graph-up-arrow me-2"></i>
              <h5 className="card-title mb-0">The Complex Reality of Food Safety Regulation: A Multi-Factor Analysis (2011-2019)</h5>
            </div>
            <div className="card-body p-4">
              <div className="btn-group w-100 mb-4">
                <button 
                  className={`btn ${activeSection === 'overview' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`btn ${activeSection === 'regulatory' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('regulatory')}
                >
                  Regulatory Framework
                </button>
                <button 
                  className={`btn ${activeSection === 'geographic' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('geographic')}
                >
                  Geographic Impact
                </button>
                <button 
                  className={`btn ${activeSection === 'statistical' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('statistical')}
                >
                  Statistical Analysis
                </button>
                <button 
                  className={`btn ${activeSection === 'conclusion' ? 'btn-primary' : 'btn-outline-primary'} rounded-0`}
                  onClick={() => setActiveSection('conclusion')}
                >
                  Conclusion
                </button>
              </div>
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 