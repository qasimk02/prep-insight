import React from 'react';
import { useParams } from 'react-router-dom';
import { getSubjectScores, getSubjectAccuracy, getSubjectCorrect, getSubjectIncorrect, getSubjectSkipped } from '../../utils/utils';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import Table from '../Table/Table';
import PieChart from '../Charts/PieChart';
import styles from './SubjectAnalysis.module.css';

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


  return (
    <div className={styles.container}>
      <LineChart data={getSubjectScores(subject)} dataKey="score" name={`${subject} Score`} />
      <LineChart data={getSubjectCorrect(subject)} dataKey="correct" name={`${subject} Correct`} />
      <LineChart data={getSubjectIncorrect(subject)} dataKey="incorrect" name={`${subject} Incorrect`} />
      <LineChart data={getSubjectSkipped(subject)} dataKey="skipped" name={`${subject} Skipped`} />
      <BarChart
        data={getSubjectAccuracy(subject)}
        dataKeys={['correct', 'incorrect', 'skipped']}
        names={['Correct', 'Incorrect', 'Skipped']}
      />
      <PieChart data={pieChartData} />
      <Table data={getSubjectAccuracy(subject)} subject={subject} />
    </div>
  );
};

export default SubjectAnalysis;