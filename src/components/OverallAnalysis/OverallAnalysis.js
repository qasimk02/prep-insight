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
  const [totalScoreOpen, setTotalScoreOpen] = useState(false);
  const [totalCorrectOpen, setTotalCorrectOpen] = useState(false);
  const [totalIncorrectOpen, setTotalIncorrectOpen] = useState(false);
  const [totalSkippedOpen, setTotalSkippedOpen] = useState(false);
  const [airOpen, setAirOpen] = useState(false);

  // State for other chart visibility (initially closed)
  const [barChartOpen, setBarChartOpen] = useState(false);
  const [pieChartOpen, setPieChartOpen] = useState(false);

  return (
    <Container maxWidth="lg">

      <Typography
        variant="h4"
        align="center"
        style={{
          fontWeight: 700,
          marginBottom: '24px',
          textTransform: 'capitalize',
          color: '#3f51b5',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        OVERALL ANALYSIS
      </Typography>

      {/* Table */}
      <Grid spacing={10}>

        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" style={{ fontWeight: 600, textAlign: 'center', padding: '8px 16px' }}>Table</Typography>
            <Table data={tableData} subject="Overall" />
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setPieChartOpen(!pieChartOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="h6" style={{ fontWeight: 600, padding: '8px 16px' }}>
                OVERALL ACCURACY
              </Typography>
            </Box>
            <PieChart data={getOverallAccuracy()} />
          </Paper>
        </Grid>

        {/* Line Charts */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setTotalScoreOpen(!totalScoreOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 600, padding: '8px 16px' }}>
                TOTAL SCORE CHART
              </Typography>
            </Box>
            <Collapse in={totalScoreOpen}>
              <LineChart data={getTotalScores()} dataKey="total" name="Total Score" />
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setTotalCorrectOpen(!totalCorrectOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 600, padding: '8px 16px' }}>
                TOTAL CORRECT CHART
              </Typography>
            </Box>
            <Collapse in={totalCorrectOpen}>
              <LineChart data={getTotalCorrect()} dataKey="correct" name="Total Correct" />
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setTotalIncorrectOpen(!totalIncorrectOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 600, padding: '8px 16px' }}>
                TOTAL INCORRECT CHART
              </Typography>
            </Box>
            <Collapse in={totalIncorrectOpen}>
              <LineChart data={getTotalIncorrect()} dataKey="incorrect" name="Total InCorrect" />
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setTotalSkippedOpen(!totalSkippedOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 600, padding: '8px 16px' }}>
                TOTAL SKIPPED CHART
              </Typography>
            </Box>
            <Collapse in={totalSkippedOpen}>
              <LineChart data={getTotalSkipped()} dataKey="skipped" name="Total Skipped" />
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setAirOpen(!airOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 600, padding: '8px 16px' }}>
                AIR CHART
              </Typography>
            </Box>
            <Collapse in={airOpen}>
              <LineChart data={getRankAir()} dataKey="rank" name="AIR" />
            </Collapse>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setBarChartOpen(!barChartOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="h6" style={{ fontWeight: 600, padding: '8px 16px' }}>
                Analysis at One Place
              </Typography>
            </Box>
            <Collapse in={barChartOpen}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <BarChart
                  data={getTestWiseAccuracy()}
                  dataKeys={['correct', 'incorrect', 'skipped']}
                  names={['Correct', 'Incorrect', 'Skipped']}
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