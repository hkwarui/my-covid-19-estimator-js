const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse } = data;
  const factor = Math.floor(timeToElapse / 3);

  const impact = () => {
    const currentlyInfected = reportedCases * 10;
    const infectionsByRequestedTime = currentlyInfected * 1024;

    return {
      currentlyInfected,
      infectionsByRequestedTime
    };
  };

  const severeImpact = () => {
    const currentlyInfected = reportedCases * 50;
    const infectionsByRequestedTime = currentlyInfected(2 ** factor_);

    return {
      currentlyInfected,
      infectionsByRequestedTime
    };
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
