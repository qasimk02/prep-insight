import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styles from './Table.module.css';

const CustomTable = ({ data, subject }) => {
  console.log(data);
  return (
    <div className={styles.tableContainer}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Test</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Correct</TableCell>
              <TableCell align="right">Incorrect</TableCell>
              <TableCell align="right">Skipped</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.test}>
                <TableCell component="th" scope="row">
                  {row.test}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.correct}</TableCell>
                <TableCell align="right">{row.incorrect}</TableCell>
                <TableCell align="right">{row.skipped}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;