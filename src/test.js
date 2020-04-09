const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType } = data;

  let factor = 0;
  if (periodType === 'days') {
    factor = Math.floor(timeToElapse / 3);
  }
  if (periodType === 'weeks') {
    factor = Math.floor((timeToElapse * 7) / 3);
  }
  if (periodType === 'months') {
    factor = Math.floor((timeToElapse * 30) / 3);
  }

  const impact = {
    currentlyInfected: reportedCases * 10,
    infectionsByRequestedTime: currentlyInfected * 1024
  };

  const severeImpact = {
    currentlyInfected: reportedCases * 50,
    infectionsByRequestedTime: currentlyInfected(2 ** factor)
    //severeCasesByRequestedTime: infectionsByRequestedTime * 0.15
  };

  return {
    data,
    impact: { currentlyInfected, infectionsByRequestedTime },
    severeImpact: { currentlyInfected, infectionsByRequestedTime }
  };
};

export default covid19ImpactEstimator;
