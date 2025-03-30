import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OverallAnalysis from './components/OverallAnalysis/OverallAnalysis';
import SubjectAnalysis from './components/SubjectAnalysis/SubjectAnalysis';
import Navigation from './components/Navigation/Navigation';
import './index.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<OverallAnalysis />} />
        <Route path="/:subject" element={<SubjectAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;