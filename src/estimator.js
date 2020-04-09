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

  const impact = (reportedCases) => {
    const currentlyInfected = reportedCases * 10;
    const infectionsByRequestedTime = currentlyInfected * 2 ** factor;

    return {
      currentlyInfected,
      infectionsByRequestedTime
    };
  };

  const severeImpact = (reportedCases) => {
    const currentlyInfected = reportedCases * 50;
    const infectionsByRequestedTime = currentlyInfected(2 ** factor);
    const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime
    };
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
