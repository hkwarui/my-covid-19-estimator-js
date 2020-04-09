const covid19ImpactEstimator = (data) => {
  const {
    reportedCases, periodType, totalHospitalBeds, region
  } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;
  const population = avgDailyIncomePopulation;
  const income = avgDailyIncomeInUSD;
  const beds = totalHospitalBeds * 0.35;
  const impact = {};
  const severeImpact = {};

  if (periodType === 'months') {
    data.timeToElapse *= 30;
  } else if (periodType === 'weeks') {
    data.timeToElapse *= 7;
  }

  const days = data.timeToElapse;
  const factor = 2 ** Math.trunc(days / 3);
  const severeCases = severeImpact.severeCasesByRequestedTime;

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  impact.hospitalBedsByRequestedTime = Math.ceil(beds - impact.severeCasesByRequestedTime);
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  impact.casesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  impact.dollarsInFlight = impact.infectionsByRequestedTime * population * income * days;

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  severeImpact.hospitalBedsByRequestedTime = Math.ceil(beds - severeCases);
  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * population * income * days;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
