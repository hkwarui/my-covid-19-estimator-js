const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType, region } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;
  const population = avgDailyIncomePopulation;
  const income = avgDailyIncomeInUSD;
  const beds = data.totalHospitalBeds * 0.35;
  const impact = {};
  const severeImpact = {};

  if (periodType === 'months') {
    data.timeToElapse *= 30;
  } else if (periodType === 'weeks') {
    data.timeToElapse *= 7;
  }

  const days = data.timeToElapse;
  const factor = 2 ** Math.trunc(days / 3);

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected * factor);
  const infections = impact.infectionsByRequestedTime;
  impact.severeCasesByRequestedTime = (infections * 0.15);
  impact.hospitalBedsByRequestedTime = Math.trunc(beds - impact.severeCasesByRequestedTime);

  impact.casesForICUByRequestedTime = Math.trunc((infections * 0.05);
  impact.casesForVentilatorsByRequestedTime = Math.trunc(infections * 0.02);
  impact.dollarsInFlight = (infections * population * income * days);

  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected * factor);
  const severeInfection = severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeInfection * 0.15);
  const severeCases = severeImpact.severeCasesByRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(beds - severeCases);
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeInfection * 0.05);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc((severeInfection * 0.02);
  severeImpact.dollarsInFlight = (severeInfection * population * income * days);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
