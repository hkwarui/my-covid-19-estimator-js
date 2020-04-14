const UI = (estimate) => {
  // Hide form and display estimates and data
  document.getElementById('formDisplay').style.display = 'none';
  document.getElementById('dataDisplay').style.display = 'block';
  document.getElementById('impactDisplay').style.display = 'block';
  document.getElementById('severeDisplay').style.display = 'block';

  // display data
  document.getElementById('d-population').textContent = estimate.data.population;
  document.getElementById('d-time-to-elapse').textContent = estimate.data.timeToElapse;
  document.getElementById('d-reported-cases').textContent = estimate.data.reportedCases;
  document.getElementById('d-total-hospital-beds').textContent = estimate.data.totalHospitalBeds;
  document.getElementById('d-period-type').textContent = estimate.data.periodType;

  // display impact estimate
  document.getElementById('i-currently-infected').textContent = estimate.impact.currentlyInfected;
  document.getElementById('i-infections-by-requested-time').textContent = estimate.impact.infectionsByRequestedTime;
  document.getElementById('i-severe-cases-by-requested-time').textContent = estimate.impact.severeCasesByRequestedTime;
  document.getElementById('i-hospital-beds-by-requested time').textContent = estimate.impact.hospitalBedsByRequestedTime;
  document.getElementById('i-cases-for-icu-by-requested-time').textContent = estimate.impact.casesForICUByRequestedTime;
  document.getElementById(
    'i-cases-for-ventilators-by-requested-time'
  ).textContent = estimate.impact.casesForVentilatorsByRequestedTime;
  document.getElementById('i-dollars-in-flight').textContent = estimate.impact.dollarsInFlight;

  // display severe impact estimates
  document.getElementById('s-currently-infected').textContent = estimate.impact.currentlyInfected;
  document.getElementById('s-infections-by-requested-time').textContent = estimate.severeImpact.infectionsByRequestedTime;
  document.getElementById('s-severe-cases-by-requested-time').textContent = estimate.severeImpact.severeCasesByRequestedTime;
  document.getElementById('s-hospital-beds-by-requested time').textContent = estimate.severeImpact.hospitalBedsByRequestedTime;
  document.getElementById('s-cases-for-icu-by-requested-time').textContent = estimate.severeImpact.casesForICUByRequestedTime;
  document.getElementById(
    's-cases-for-ventilators-by-requested-time'
  ).textContent = estimate.severeImpact.casesForVentilatorsByRequestedTime;
  document.getElementById('s-dollars-in-flight').textContent = estimate.severeImpact.dollarsInFlight;
};

export default UI;
