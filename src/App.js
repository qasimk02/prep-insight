import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'; // Assuming Navigation component is in this path
import OverallAnalysis from './components/OverallAnalysis/OverallAnalysis'; // Assuming OverallAnalysis component is in this path
import SubjectAnalysis from './components/SubjectAnalysis/SubjectAnalysis'; // Assuming SubjectAnalysis component is in this path

function App() {
  return (
    <Router>
      <Navigation />
      <div style={{ marginTop: '20px' }}> {/* Add margin here */}
        <Routes>
          <Route path="/" element={<OverallAnalysis />} />
          <Route path="/:subject" element={<SubjectAnalysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;