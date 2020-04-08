const covid19ImpactEstimator = (data) => {
  data;
  const impact = () => {
    const currentlyInfected = reportedCases * 10;
    const infectionsByRequestedTime = currentlyInfected * 1024;
  };

  const severeImpact = () => {
    const currentlyInfected = reportedCases * 50;
    const infectionsByRequestedTime = currentlyInfected * 1024;
  };
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
