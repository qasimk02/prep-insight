// src/utils/utils.js

import data from '../data.json';

export const tests = data.tests;

export const getSubjectScores = (subject) => {
    return tests.map((test) => ({
        test: test.test,
        score: test[subject].score,
    }));
};

export const getSubjectCorrect = (subject) => {
    return tests.map((test) => ({
        test: test.test,
        correct: test[subject].correct * 4,
    }));
};

export const getSubjectIncorrect = (subject) => {
    return tests.map((test) => ({
        test: test.test,
        incorrect: test[subject].incorrect * 4,
    }));
};

export const getSubjectSkipped = (subject) => {
    return tests.map((test) => ({
        test: test.test,
        skipped: test[subject].skipped * 4,
    }));
};
export const getSubjectAccuracy = (subject) => {
    return tests.map((test) => ({
        test: test.test,
        score: test[subject].score,
        correct: test[subject].correct,
        incorrect: test[subject].incorrect,
        skipped: test[subject].skipped,
    }));
};

export const getTestWiseAccuracy = () => {
    return tests.map((test) => ({
        test: test.test,
        score: test.physics.score + test.chemistry.score + test.biology.score,
        correct: test.physics.correct + test.chemistry.correct + test.biology.correct,
        incorrect: test.physics.incorrect + test.chemistry.incorrect + test.biology.incorrect,
        skipped: test.physics.skipped + test.chemistry.skipped + test.biology.skipped
    }));
};

export const getTotalScores = () => {
    return tests.map((test) => ({
        test: test.test,
        total: test.total,
        score: test?.physics.score + test?.chemistry.score + test?.biology.score,
        correct: test?.physics.correct + test?.chemistry.correct + test?.biology.correct,
        incorrect: test?.physics.incorrect + test?.chemistry.incorrect + test?.biology.incorrect,
        skipped: test?.physics.skipped + test?.chemistry.skipped + test?.biology.skipped
    }));
};

export const getTotalCorrect = () => {
    return tests.map((test) => ({
        test: test.test,
        correct: (test?.physics.correct + test?.chemistry.correct + test?.biology.correct) * 4
    }));
};

export const getTotalIncorrect = () => {
    return tests.map((test) => ({
        test: test.test,
        incorrect: (test?.physics.incorrect + test?.chemistry.incorrect + test?.biology.incorrect) * 4
    }));
};

export const getTotalSkipped = () => {
    return tests.map((test) => ({
        test: test.test,
        skipped: (test?.physics.skipped + test?.chemistry.skipped + test?.biology.skipped) * 4
    }));
};

export const getRankAir = () => {
    return tests.map((test) => ({
        test: test.test,
        rank: test.rank_air,
    }));
};

export const getOverallAccuracy = () => {
    const overall = tests.reduce(
        (acc, test) => {
            acc.correct += test.physics.correct + test.chemistry.correct + test.biology.correct;
            acc.incorrect += test.physics.incorrect + test.chemistry.incorrect + test.biology.incorrect;
            acc.skipped += test.physics.skipped + test.chemistry.skipped + test.biology.skipped;
            return acc;
        },
        { correct: 0, incorrect: 0, skipped: 0 }
    );

    return [
        { name: 'Correct', value: overall.correct },
        { name: 'Incorrect', value: overall.incorrect },
        { name: 'Skipped', value: overall.skipped },
    ];
};