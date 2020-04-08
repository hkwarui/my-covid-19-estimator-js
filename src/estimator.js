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

  const impact = () => {
    const currentlyInfected = reportedCases * 10;
    const infectionsByRequestedTime = currentlyInfected * 2 ** factor;
  };

  const severeImpact = () => {
    const currentlyInfected = reportedCases * 50;
    const infectionsByRequestedTime = currentlyInfected * 2 ** factor;
  };

  return {
    data,
    impact: { currentlyInfected, infectionsByRequestedTime },
    severeImpact: { currentlyInfected, infectionsByRequestedTime }
  };
};

export default covid19ImpactEstimator;
