import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import FDASubstances from './components/pages/FDASubstances';
import ObesityData from './components/pages/ObesityData';

// Placeholder components for now
const Home = () => <div className="h1">Home Page</div>;
const FSISRecalls = () => <div className="h1">FSIS Recalls</div>;
const GRASNotices = () => <div className="h1">GRAS Notices</div>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fda-substances" element={<FDASubstances />} />
          <Route path="/fsis-recalls" element={<FSISRecalls />} />
          <Route path="/obesity-data" element={<ObesityData />} />
          <Route path="/gras-notices" element={<GRASNotices />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
