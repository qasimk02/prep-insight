import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSubjectScores,
  getSubjectAccuracy,
  getSubjectCorrect,
  getSubjectIncorrect,
  getSubjectSkipped,
} from "../../utils/utils";
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import Table from "../Table/Table";
import PieChart from "../Charts/PieChart";
import { Container, Grid, Paper, Collapse, Typography, Box } from "@mui/material";

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
    { name: "Correct", value: accuracyData.correct },
    { name: "Incorrect", value: accuracyData.incorrect },
    { name: "Skipped", value: accuracyData.skipped },
  ];

  // State for chart visibility (initially closed)
  const [scoreOpen, setScoreOpen] = useState(true);
  const [correctOpen, setCorrectOpen] = useState(true);
  const [incorrectOpen, setIncorrectOpen] = useState(true);
  const [skippedOpen, setSkippedOpen] = useState(true);
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
        {subject.toUpperCase()} ANALYSIS
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Table */}
        <Grid item xs={12} sm={12} md={6} display="flex" justifyContent="center">
          <Paper sx={{ p: 3, width: "100%", maxWidth: 500 }}>
            <Typography variant="h6" fontWeight={600} textAlign="center" pb={1}>
              Table
            </Typography>
            <Table data={getSubjectAccuracy(subject)} subject={subject.toUpperCase()} />
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} sm={12} md={6} display="flex" justifyContent="center">
          <Paper sx={{ p: 3, width: "100%", maxWidth: 500 }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => setPieChartOpen(!pieChartOpen)}
            >
              <Typography variant="h6" fontWeight={600} pb={1}>
                {`${subject.toUpperCase()} ACCURACY`}
              </Typography>
            </Box>
            <PieChart data={pieChartData} />
          </Paper>
        </Grid>

        {/* Line Charts */}
        {[
          { label: "SCORE", open: scoreOpen, setOpen: setScoreOpen, data: getSubjectScores(subject), dataKey: "score" },
          { label: "CORRECT", open: correctOpen, setOpen: setCorrectOpen, data: getSubjectCorrect(subject), dataKey: "correct" },
          { label: "INCORRECT", open: incorrectOpen, setOpen: setIncorrectOpen, data: getSubjectIncorrect(subject), dataKey: "incorrect" },
          { label: "SKIPPED", open: skippedOpen, setOpen: setSkippedOpen, data: getSubjectSkipped(subject), dataKey: "skipped" },
        ].map((chart, index) => (
          <Grid item xs={12} sm={6} md={6} key={index} display="flex" justifyContent="center">
            <Paper sx={{ p: 3, width: "100%", maxWidth: 500 }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ cursor: "pointer" }}
                onClick={() => chart.setOpen(!chart.open)}
              >
                <Typography variant="subtitle1" fontWeight={600} pb={1}>
                  {`${subject.toUpperCase()} ${chart.label} CHART`}
                </Typography>
              </Box>
              <Collapse in={chart.open}>
                <LineChart data={chart.data} dataKey={chart.dataKey} name={`${subject.toUpperCase()} ${chart.label}`} />
              </Collapse>
            </Paper>
          </Grid>
        ))}

        {/* Bar Chart */}
        <Grid item xs={12} display="flex" justifyContent="center">
          <Paper sx={{ p: 3, width: "100%", maxWidth: 600 }}>
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
                  data={getSubjectAccuracy(subject)}
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

export default SubjectAnalysis;
