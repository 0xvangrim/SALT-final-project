import config from '../../config';
import businessLayer from '../../businessLayer';

const { REDACTED_FOUR, REDACTED_FIVE, REDACTED_SIX } = config.sequelize.ENUMS.BOOKING_STATUSES;

class AdminController {
  async getMisconductScore(req, res) {
    const from = req.query.from && businessLayer.DateHelper.unix(req.query.from);
    const to = req.query.to && businessLayer.DateHelper.unix(req.query.to);
    const allScores = await businessLayer.MisconductScore.calculateAll(from, to);
    const sortedScores = [...allScores].sort((a, b) => b.score - a.score);

    const queriedScores = [];
    const offset = Number(req.query.offset) || 0;
    for (let i = offset; i < Math.min(Number(req.query.limit) + offset || sortedScores.length, sortedScores.length); i++) {
      if (!req.query.threshold || req.query.threshold <= sortedScores[i].score) {
        queriedScores.push(sortedScores[i]);
      }
    }

    // Aggregate scores with names and thumbnail
    const ids = queriedScores.map((x) => x.psychologistId);
    const psychologists = await businessLayer.Psychologist.findSummaryByIds(ids);

    queriedScores.forEach((x) => {
      const psychologist = psychologists.find((psy) => psy.psychologistId === x.psychologistId);
      x.firstName = psychologist.user.firstName;
      x.lastName = psychologist.user.lastName;
      x.thumbnail = psychologist.thumbnail;
    });

    res.json({ scores: queriedScores });
  }

  async getStatusCounts(req, res) {
    const from = req.query.from && businessLayer.DateHelper.unix(req.query.from);
    const to = req.query.to && businessLayer.DateHelper.unix(req.query.to);
    const redactedFourCountRequest = businessLayer.Slot.countStatusByPsychologist(
      req.params.id,
      from || businessLayer.DateHelper.startOfMonth(),
      to || businessLayer.DateHelper.endOfMonth(),
      REDACTED_FOUR,
    );

    const redactedFiveCountRequest = businessLayer.Slot.countStatusByPsychologist(
      req.params.id,
      from || businessLayer.DateHelper.startOfMonth(),
      to || businessLayer.DateHelper.endOfMonth(),
      REDACTED_FIVE,
    );

    const redactedSixCountRequest = businessLayer.Slot.countStatusByPsychologist(
      req.params.id,
      from || businessLayer.DateHelper.startOfMonth(),
      to || businessLayer.DateHelper.endOfMonth(),
      REDACTED_SIX,
    );

    res.json({
      redactedStatusFour: (await redactedFourCountRequest).toJSON().count,
      redactedStatusFive: (await redactedFiveCountRequest).toJSON().count,
      redactedStatusSix: (await redactedSixCountRequest).toJSON().count,
    });
  }
}

const instance = new AdminController();
export default instance;
