const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType } = data;
  const impact = {};
  const severeImpact = {};

  let days = timeToElapse;
  if (periodType === 'months') {
    days *= 30;
    return days;
  }
  if (periodType === 'weeks') {
    days *= 7;
    return days;
  }

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
