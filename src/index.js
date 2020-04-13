
import covid19ImpactEstimator from './estimator.js';
import UI from './ui.js';

const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  }
};
const estimate = { data };

document.getElementById('dataDisplay').style.display = 'none';
document.getElementById('impactDisplay').style.display = 'none';
document.getElementById('severeDisplay').style.display = 'none';

document.getElementById('goEstimate').addEventListener('submit', (e) => {
  e.preventDefault();
  data.timeToElapse = document.getElementById('data-time-to-elapse').value;
  data.reportedCases = document.getElementById('data-reported-cases').value;
  data.totalHospitalBeds = document.getElementById('data-total-hospital-beds').value;
  data.periodType = document.getElementById('data-period-type').value;
  data.population = document.getElementById('data-population').value;
  estimate.impact = covid19ImpactEstimator(data).impact;
  estimate.severeImpact = covid19ImpactEstimator(data).severeImpact;
  UI(estimate);
});

const estimateData = () => estimate;
module.exports = estimateData;
