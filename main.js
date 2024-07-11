// index.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const calculateStakingRewards = (params) => {
const {
stakingAmount,
stakingDuration,
annualInterestRate,
compoundingFrequency
} = params;

const secondsInYear = 31536000;
const stakingDurationInSeconds = stakingDuration * secondsInYear;

const interestRatePerSecond = annualInterestRate / 100 / secondsInYear;
const compoundingPeriods = stakingDurationInSeconds / compoundingFrequency;

let balance = stakingAmount;
for (let i = 0; i < compoundingPeriods; i++) {
balance += balance * interestRatePerSecond * compoundingFrequency;
}

const rewards = balance - stakingAmount;
return rewards;
};

app.post('/calculate-staking-rewards', (req, res) => {
const params = req.body;
const rewards = calculateStakingRewards(params);
res.json({ rewards });
});

app.listen(3000, () => {
console.log('API server running on port 3000');
});
