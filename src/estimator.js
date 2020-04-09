const covid19ImpactEstimator = (data) => {
  const { reportedCases, periodType } = data;
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
