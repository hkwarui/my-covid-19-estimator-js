const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType } = data;
  const dayFactor = Math.floor(timeToElapse / 3);
  const weekFactor = Math.floor((timeToElapse * 7) / 3);
  const monthFactor = Math.floor((timeToElapse * 30) / 3);

  const impact = () => {
    const currentlyInfected = reportedCases * 10;
    let infectionsByRequestedTime = 0;

    if (periodType === 'days') {
      return (infectionsByRequestedTime = currentlyInfected * dayFactor);
    }
    if (periodType === 'weeks') {
      return (infectionsByRequestedTime = currentlyInfected * weekFactor);
    }
    if (periodType === 'months') {
      return (infectionsByRequestedTime = currentlyInfected * monthFactor);
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
      return (infectionsByRequestedTime = currentlyInfected * dayFactor);
    }
    if (periodType === 'weeks') {
      return (infectionsByRequestedTime = currentlyInfected * weekFactor);
    }
    if (periodType === 'months') {
      return (infectionsByRequestedTime = currentlyInfected * monthFactor);
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
