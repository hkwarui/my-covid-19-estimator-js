const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType } = data;
  const impact = {};
  const severeImpact = {};

  if (periodType === 'months') {
    timeToElapse = timeToElapse * 30;
    return timeToElapse;
  }
  if (periodType === 'weeks') {
    timeToElapse = timeToElapse * 7;
    return timeToElapse;
  }
  if (periodType === 'days') {
    return timeToElapse;
  }

  const factor = 2 ** Math.trunc(timeToElapse / 3);

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * factor;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
