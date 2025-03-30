import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getSubjectScores,
  getSubjectAccuracy,
  getSubjectCorrect,
  getSubjectIncorrect,
  getSubjectSkipped,
} from '../../utils/utils';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import Table from '../Table/Table';
import PieChart from '../Charts/PieChart';
import { Container, Grid, Paper, Collapse, Typography, Box } from '@mui/material';

const SubjectAnalysis = () => {
  const { subject } = useParams();

  const accuracyData = getSubjectAccuracy(subject).reduce(
    (acc, test) => {
      acc.correct += test.correct;
      acc.incorrect += test.incorrect;
      acc.skipped += test.skipped;
      return acc;
    },
    { correct: 0, incorrect: 0, skipped: 0 }
  );

  const pieChartData = [
    { name: 'Correct', value: accuracyData.correct },
    { name: 'Incorrect', value: accuracyData.incorrect },
    { name: 'Skipped', value: accuracyData.skipped },
  ];

  // State for chart visibility (initially closed)
  const [scoreOpen, setScoreOpen] = useState(false);
  const [correctOpen, setCorrectOpen] = useState(false);
  const [incorrectOpen, setIncorrectOpen] = useState(false);
  const [skippedOpen, setSkippedOpen] = useState(false);
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
        {subject.toUpperCase()} ANALYSIS
      </Typography>

      <Grid spacing={10}>
        {/* Table */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" style={{ fontWeight: 600, textAlign: 'center', padding: '8px 16px' }}>
              Table
            </Typography>
            <Table data={getSubjectAccuracy(subject)} subject={subject.toUpperCase()} />
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
                {`${subject.toUpperCase()} ACCURACY`}
              </Typography>
            </Box>
            <PieChart data={pieChartData} />
          </Paper>
        </Grid>
        {/* Line Charts */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setScoreOpen(!scoreOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 600, padding: '8px 16px' }}>
                {`${subject.toUpperCase()} SCORE CHART`}
              </Typography>
            </Box>
            <Collapse in={scoreOpen}>
              <LineChart data={getSubjectScores(subject)} dataKey="score" name={`${subject.toUpperCase()} Score`} />
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setCorrectOpen(!correctOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 600, padding: '8px 16px' }}>
                {`${subject.toUpperCase()} CORRECT CHART`}
              </Typography>
            </Box>
            <Collapse in={correctOpen}>
              <LineChart data={getSubjectCorrect(subject)} dataKey="correct" name={`${subject.toUpperCase()} Correct`} />
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setIncorrectOpen(!incorrectOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 600, padding: '8px 16px' }}>
                {`${subject.toUpperCase()} INCORRECT CHART`}
              </Typography>
            </Box>
            <Collapse in={incorrectOpen}>
              <LineChart data={getSubjectIncorrect(subject)} dataKey="incorrect" name={`${subject.toUpperCase()} Incorrect`} />
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setSkippedOpen(!skippedOpen)}
              style={{ cursor: 'pointer' }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 600, padding: '8px 16px' }}>
                {`${subject.toUpperCase()} SKIPPPED CHART`}
              </Typography>
            </Box>
            <Collapse in={skippedOpen}>
              <LineChart data={getSubjectSkipped(subject)} dataKey="skipped" name={`${subject.toUpperCase()} Skipped`} />
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
                  data={getSubjectAccuracy(subject)}
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

export default SubjectAnalysis;