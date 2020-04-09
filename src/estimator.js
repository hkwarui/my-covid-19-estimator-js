const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType } = data;
  const impact = {};
  const severeImpact = {};

  if (periodType === 'months') {
    data.timeToElapse *= 30;
    return data.timeToElapse;
  }
  if (periodType === 'weeks') {
    data.timeToElapse *= 7;
    return data.timeToElapse;
  }
  if (periodType === 'days') {
    return data.timeToElapse;
  }

  const factor = 2 ** Math.trunc(data.timeToElapse / 3);

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * factor;
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
