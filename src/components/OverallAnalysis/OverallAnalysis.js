import React from 'react';
import { getTotalScores, getRankAir, getTestWiseAccuracy, getOverallAccuracy, getTotalCorrect, getTotalIncorrect, getTotalSkipped } from '../../utils/utils';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';
import Table from '../Table/Table'; // Import the Table component
import styles from './OverallAnalysis.module.css';

const OverallAnalysis = () => {
  const tableData = getTotalScores().map((test, index) => ({
    test: test.test,
    total: test.total,
    score: test.score,
    correct : test.correct,
    incorrect: test.incorrect,
    skipped: test.skipped,
    rank: getRankAir()[index].rank,
  }));

  return (
    <div className={styles.container}>
      <LineChart data={getTotalScores()} dataKey="total" name="Total Score" />
      <LineChart data={getTotalCorrect()} dataKey="correct" name="Total Correct" />
      <LineChart data={getTotalIncorrect()} dataKey="incorrect" name="Total InCorrect" />
      <LineChart data={getTotalSkipped()} dataKey="skipped" name="Total Skipped" />
      <LineChart data={getRankAir()} dataKey="rank" name="AIR" />
      <BarChart
        data={getTestWiseAccuracy()}
        dataKeys={['correct', 'incorrect', 'skipped']}
        names={['Correct', 'Incorrect', 'Skipped']}
      />
      <PieChart data={getOverallAccuracy()} />
      <Table data={tableData} subject="Overall" /> {/* Add the Table component */}
    </div>
  );
};

export default OverallAnalysis;