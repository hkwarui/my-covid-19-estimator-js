const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType } = data;
  const dayFactor = Math.floor(timeToElapse / 3);
  const weekFactor = Math.floor((timeToElapse * 7) / 3);
  const monthFactor = Math.floor((timeToElapse * 30) / 3);

  const impact = () => {
    const currentlyInfected = reportedCases * 10;
    let infectionsByRequestedTime = 0;

    if (periodType === 'days') {
      infectionsByRequestedTime = currentlyInfected * dayFactor;
      return infectionsByRequestedTime;
    }
    if (periodType === 'weeks') {
      infectionsByRequestedTime = currentlyInfected * weekFactor;
      return infectionsByRequestedTime;
    }
    if (periodType === 'months') {
      infectionsByRequestedTime = currentlyInfected * monthFactor;
      return infectionsByRequestedTime;
    }

    return {
      currentlyInfected,
      infectionsByRequestedTime
    };
  };

  const severeImpact = () => {
    const currentlyInfected = reportedCases * 50;
    let infectionsByRequestedTime = 0;

    if (periodType === 'days') {
      infectionsByRequestedTime = currentlyInfected * dayFactor;
      return infectionsByRequestedTime;
    }
    if (periodType === 'weeks') {
      infectionsByRequestedTime = currentlyInfected * weekFactor;

      return infectionsByRequestedTime;
    }
    if (periodType === 'months') {
      infectionsByRequestedTime = currentlyInfected * monthFactor;
      return infectionsByRequestedTime;
    }

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
