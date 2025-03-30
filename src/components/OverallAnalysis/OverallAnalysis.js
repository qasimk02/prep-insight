import React, { useMemo, useState } from 'react';
import {
  getTotalScores,
  getRankAir,
  getTestWiseAccuracy,
  getOverallAccuracy,
  getTotalCorrect,
  getTotalIncorrect,
  getTotalSkipped,
} from '../../utils/utils';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';
import Table from '../Table/Table';
import {
  Container,
  Grid,
  Paper,
  Collapse,
  Typography,
  Box,
} from '@mui/material';

const OverallAnalysis = () => {
  const tableData = useMemo(() => {
    return getTotalScores().map((test, index) => ({
      test: test.test,
      total: test.total,
      score: test.score,
      correct: test.correct,
      incorrect: test.incorrect,
      skipped: test.skipped,
      rank: getRankAir()[index].rank,
    }));
  }, []);

  // State for individual LineChart visibility (initially closed)
  const [totalScoreOpen, setTotalScoreOpen] = useState(true);
  const [totalCorrectOpen, setTotalCorrectOpen] = useState(true);
  const [totalIncorrectOpen, setTotalIncorrectOpen] = useState(true);
  const [totalSkippedOpen, setTotalSkippedOpen] = useState(true);
  const [airOpen, setAirOpen] = useState(true);

  // State for other chart visibility (initially closed)
  const [barChartOpen, setBarChartOpen] = useState(true);
  const [pieChartOpen, setPieChartOpen] = useState(true);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 3,
          textTransform: "capitalize",
          color: "#3f51b5",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        OVERALL ANALYSIS
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="center"
      >
        {/* Table */}
        <Grid item xs={12} sm={12} md={6} display="flex" justifyContent="center">
          <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, width: "100%", maxWidth: 500 }}>
            <Typography variant="h6" fontWeight={600} textAlign="center" pb={1}>
              Table
            </Typography>
            <Table data={tableData} subject="Overall" />
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} sm={12} md={6} display="flex" justifyContent="center">
          <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, width: "100%", maxWidth: 500 }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => setPieChartOpen(!pieChartOpen)}
            >
              <Typography variant="h6" fontWeight={600} pb={1}>
                OVERALL ACCURACY
              </Typography>
            </Box>
            <PieChart data={getOverallAccuracy()} />
          </Paper>
        </Grid>

        {/* Line Charts */}
        {[
          { label: "TOTAL SCORE CHART", open: totalScoreOpen, setOpen: setTotalScoreOpen, data: getTotalScores(), dataKey: "total" },
          { label: "TOTAL CORRECT CHART", open: totalCorrectOpen, setOpen: setTotalCorrectOpen, data: getTotalCorrect(), dataKey: "correct" },
          { label: "TOTAL INCORRECT CHART", open: totalIncorrectOpen, setOpen: setTotalIncorrectOpen, data: getTotalIncorrect(), dataKey: "incorrect" },
          { label: "TOTAL SKIPPED CHART", open: totalSkippedOpen, setOpen: setTotalSkippedOpen, data: getTotalSkipped(), dataKey: "skipped" },
        ].map((chart, index) => (
          <Grid item xs={12} sm={6} md={6} key={index} display="flex" justifyContent="center">
            <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, width: "100%", maxWidth: 500 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ cursor: "pointer" }}
                onClick={() => chart.setOpen(!chart.open)}
              >
                <Typography variant="subtitle1" fontWeight={600} pb={1}>
                  {chart.label}
                </Typography>
              </Box>
              <Collapse in={chart.open}>
                <LineChart data={chart.data} dataKey={chart.dataKey} name={chart.label} />
              </Collapse>
            </Paper>
          </Grid>
        ))}

        {/* AIR Chart */}
        <Grid item xs={12} display="flex" justifyContent="center">
          <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, width: "100%", maxWidth: 600 }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => setAirOpen(!airOpen)}
            >
              <Typography variant="subtitle1" fontWeight={600} pb={1}>
                AIR CHART
              </Typography>
            </Box>
            <Collapse in={airOpen}>
              <LineChart data={getRankAir()} dataKey="rank" name="AIR" />
            </Collapse>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} display="flex" justifyContent="center">
          <Paper sx={{
            p: { xs: 2, sm: 3, md: 4 }, width: "100%", maxWidth: { xs: "100%", sm: "90%", md: 600 },
            overflowX: "auto",
          }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => setBarChartOpen(!barChartOpen)}
            >
              <Typography variant="h6" fontWeight={600} pb={1}>
                Analysis at One Place
              </Typography>
            </Box>
            <Collapse in={barChartOpen}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <BarChart
                  data={getTestWiseAccuracy()}
                  dataKeys={["correct", "incorrect", "skipped"]}
                  names={["Correct", "Incorrect", "Skipped"]}
                />
              </Box>
            </Collapse>
          </Paper>
        </Grid>
      </Grid>
    </Container>

  );
};

export default OverallAnalysis;