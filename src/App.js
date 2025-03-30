import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navigation from './components/Navigation/Navigation';
import OverallAnalysis from './components/OverallAnalysis/OverallAnalysis';
import SubjectAnalysis from './components/SubjectAnalysis/SubjectAnalysis';

function App() {
  return (
    <Router>
      <Box sx={{ overflowX: 'hidden', width: '100vw', minHeight: '100vh' }}>
        <Navigation />
        <Container maxWidth="lg" sx={{ mt: 3, px: { xs: 2, sm: 4 } }}>
          <Routes>
            <Route path="/" element={<OverallAnalysis />} />
            <Route path="/:subject" element={<SubjectAnalysis />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
