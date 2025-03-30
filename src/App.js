import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box, Dialog, DialogContent, Typography } from "@mui/material";
import Navigation from "./components/Navigation/Navigation";
import OverallAnalysis from "./components/OverallAnalysis/OverallAnalysis";
import SubjectAnalysis from "./components/SubjectAnalysis/SubjectAnalysis";
import data from "./data.json"; 
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const quotes = data.quotes; // ✅ Use imported data
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    setQuoteOpen(true);
  }, []); // Runs on every visit & refresh

  const handleCloseQuote = () => {
    setQuoteOpen(false);
  };

  return (
    <Router>
      {/* Motivational Quote Modal */}

      <Dialog
        open={quoteOpen}
        onClose={handleCloseQuote}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            boxShadow: 5,
            textAlign: "center",
            maxWidth: 400,
            mx: "auto",
            position: "relative"
          }
        }}
      >
        {/* Close (X) Button in Top-Right */}
        <IconButton
          aria-label="close"
          onClick={handleCloseQuote}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.600"
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Quote Content */}
        <DialogContent>
          <Typography
            variant="h6"
            sx={{ fontStyle: "italic", fontSize: 18, mt: 1 }}
          >
            "{quote}"
          </Typography>
        </DialogContent>
      </Dialog>



      {/* Main Layout */}
      <Box sx={{ overflowX: "hidden", width: "100vw", minHeight: "100vh" }}>
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
