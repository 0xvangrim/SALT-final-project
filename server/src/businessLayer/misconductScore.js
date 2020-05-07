import DateHelper from './dateHelper';
import Slot from './slot';
import Psychologist from './psychologist';
import config from '../config';

const { REDACTED_FOUR, REDACTED_FIVE, REDACTED_SIX } = config.sequelize.ENUMS.BOOKING_STATUSES;

const misconductPrecomputeLimit = 6;

// These MUST sum to 1
const misconductWeights = {
  [REDACTED_SIX]: 0.5,
  [REDACTED_FOUR]: 0.2,
  [REDACTED_FIVE]: 0.3,
};

const sumStatusesByPsychologist = (psychologistId, status, data) => data.filter((x) => x.status === status && x.psychologistId === psychologistId).length;

const highestStatusCount = (psychologistIds, status, data) => {
  let highestCount = 0;
  for (let i = 0; i < psychologistIds.length; i++) {
    const currentCount = sumStatusesByPsychologist(psychologistIds[i], status, data);
    if (currentCount > highestCount) {
      highestCount = currentCount;
    }
  }
  return highestCount;
};

const averageStatus = (psychologistIds, status, data) => {
  const sum = psychologistIds.reduce((acc, cur) => acc + sumStatusesByPsychologist(cur, status, data), 0);
  return sum / psychologistIds.length;
};

const medianValues = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const calculateScoreForPsychologist = (psychologistId, statuses, data, boundaries) => {
  const psychologistStatusCount = {};
  statuses.forEach((status) => {
    psychologistStatusCount[status] = sumStatusesByPsychologist(psychologistId, status, data);
  });

  const score = statuses.reduce((acc, cur) => {
    const scaledPsychologistStatusCount = Math.max(psychologistStatusCount[cur] - boundaries.average[cur], 0);
    const scaledStatusCountMax = boundaries.highest[cur] - boundaries.average[cur];

    return acc + Math.min(scaledPsychologistStatusCount / scaledStatusCountMax, 1) * misconductWeights[cur];
  }, 0);

  return {
    psychologistId,
    score: Math.round((score + Number.EPSILON) * 100) / 100,
  };
};

class MisconductScoreDynamic {
  // TODO: These should be replaced with calls to set and get from a database if the dynamic scoring gets used
  get boundaries() {
    return this._boundaries;
  }

  set boundaries(data) {
    this._boundaries = data;
  }

  /**
     * Computes necessary values to generate misconduct scores.
     * These values are the median of the highest count of misconduct statuses per psychologist per month
     * and the median of the average of the count of misconduct statuses per psychologist per month.
     */
  async precomputeBoundaries() {
    const psychologistIds = (await Psychologist.findAll()).map((x) => x.toJSON().psychologistId);
    const statuses = Object.keys(misconductWeights);
    const from = DateHelper.startOfMonth();
    const to = DateHelper.endOfMonth();

    const allHighestValues = {};
    const allAverageValues = {};

    // Loop over the previous months up until (misconductPrecomputeLimit)
    for (let i = 1; i <= misconductPrecomputeLimit; i++) {
      const data = await Slot.findAllStatuses(
        DateHelper.subtract(from, i, 'month'),
        DateHelper.subtract(to, i, 'month'),
        statuses,
      );

      if (data.length === 0) {
        break;
      }

      // Save highest count and average count per status
      statuses.forEach((status) => {
        if (!allHighestValues[status]) {
          allHighestValues[status] = [];
        }
        allHighestValues[status].push(highestStatusCount(psychologistIds, status, data));

        if (!allAverageValues[status]) {
          allAverageValues[status] = [];
        }
        allAverageValues[status].push(averageStatus(psychologistIds, status, data));
      });
    }

    const medianHighestValue = {};
    const medianAverageValue = {};

    statuses.forEach((status) => {
      medianHighestValue[status] = medianValues(allHighestValues[status]);
      medianAverageValue[status] = medianValues(allAverageValues[status]);
    });

    this.boundaries = {
      highest: medianHighestValue,
      average: medianAverageValue,
    };
  }

  async calculateAll(from = DateHelper.startOfMonth(), to = DateHelper.endOfMonth()) {
    await this.precomputeBoundaries(); // TODO: Change this to run every month instead of here

    const { boundaries } = this;
    const statuses = Object.keys(misconductWeights);
    const psychologistIds = (await Psychologist.findAll()).map((x) => x.toJSON().psychologistId);

    const data = await Slot.findAllStatuses(
      from,
      to,
      statuses,
    );

    const scores = psychologistIds.map((psychologistId) => calculateScoreForPsychologist(psychologistId, statuses, data, boundaries));

    return scores;
  }

  async calculateForPsychologist(psychologistId, from = DateHelper.startOfMonth(), to = DateHelper.endOfMonth()) {
    await this.precomputeBoundaries(); // TODO: Change this to run every month instead of here

    const { boundaries } = this;
    const statuses = Object.keys(misconductWeights);

    const data = await Slot.findAllStatusesByPsychologist(
      psychologistId,
      from,
      to,
      statuses,
    );

    return calculateScoreForPsychologist(psychologistId, statuses, data, boundaries);
  }
}

const instance = new MisconductScoreDynamic();
export default instance;
