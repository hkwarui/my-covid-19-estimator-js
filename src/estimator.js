const covid19ImpactEstimator = (data) => {
  const { reportedCases, timeToElapse, periodType } = data;
<<<<<<< HEAD
  const impact = {};
  const severeImpact = {};

  if (periodType === 'months') {
    timeToElapse = timeToElapse * 30;
    return timeToElapse;
=======

  let factor = 0;
  if (periodType === 'days') {
    factor = Math.floor(timeToElapse / 3);
>>>>>>> 1c2f1abdb15ed31de49ffc8632db3a1600da2b79
  }
  if (periodType === 'weeks') {
    timeToElapse = timeToElapse * 7;
    return timeToElapse;
  }
  if (periodType === 'days') {
    return timeToElapse;
  }

<<<<<<< HEAD
  const factor = 2 ** Math.trunc(timeToElapse / 3);

  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * factor;
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * factor;
=======
  const impact = () => {
    const currentlyInfected = reportedCases * 10;
    const infectionsByRequestedTime = currentlyInfected * 2 ** factor;

    return {
      currentlyInfected,
      infectionsByRequestedTime
    };
  };

  const severeImpact = () => {
    const currentlyInfected = reportedCases * 50;
    const infectionsByRequestedTime = currentlyInfected * 2 ** factor;
    const severeCasesByRequestedTime = infectionsByRequestedTime * 0.15;

    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime
    };
  };
>>>>>>> 1c2f1abdb15ed31de49ffc8632db3a1600da2b79

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
