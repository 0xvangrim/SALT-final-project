import sequelize, { Op } from 'sequelize';
import DAL from '../DAL';
import config from '../config';

class Slot {
  findAll() {
    return DAL.DB.Slot.findAll({

      include: [{
        model: DAL.DB.Patient,
        as: config.sequelize.ALIASES.PATIENT,
        attributes: ['phoneNumber'],
      }, {
        model: DAL.DB.Psychologist,
        as: config.sequelize.ALIASES.PSYCHOLOGIST,
        attributes: ['headline', 'summary'],
      }],
    });
  }

  findAllStatuses(from, to, statuses) {
    return DAL.DB.Slot.findAll({
      attributes: ['psychologistId', 'status'],
      where: {
        startsAt: {
          [Op.between]: [from, to],
        },
        status: {
          [Op.in]: statuses,
        },
      },
    });
  }

  findStartsAtByPsychologist(psychologistId, from, to, statuses, templateIds, payed) {
    const conditionalConditions = {};
    if (payed !== undefined) {
      conditionalConditions.payed = payed ? 1 : 0;
    }

    return DAL.DB.Slot.findAll({
      attributes: ['startsAt'],
      where: {
        psychologistId,
        startsAt: {
          [Op.between]: [from, to],
        },
        status: {
          [Op.in]: statuses,
        },
        templateId: {
          [Op.in]: templateIds,
        },
        ...conditionalConditions,
      },
    });
  }

  findAllStatusesByPsychologist(psychologistId, from, to, statuses) {
    return DAL.DB.Slot.findAll({
      attributes: ['psychologistId', 'status'],
      where: {
        psychologistId,
        startsAt: {
          [Op.between]: [from, to],
        },
        status: {
          [Op.in]: statuses,
        },
      },
    });
  }

  countAllByPsychologist(psychologistId, from, to, statuses, templateIds) {
    return DAL.DB.Slot.findOne({
      attributes: [
        [sequelize.fn('count', sequelize.col('slotId')), 'count'],
      ],
      where: {
        psychologistId,
        startsAt: {
          [Op.between]: [from, to],
        },
        status: {
          [Op.in]: statuses,
        },
        templateId: {
          [Op.in]: templateIds,
        },
      },

    });
  }

  countStatusByPsychologist(psychologistId, from, to, status) {
    return DAL.DB.Slot.findOne({
      attributes: [
        [sequelize.fn('count', sequelize.col('slotId')), 'count'],
      ],
      where: {
        psychologistId,
        status,
        startsAt: {
          [Op.between]: [from, to],
        },
      },
    });
  }

  sumMeetingLengthByPsychologist(psychologistId, from, to, statuses, templateIds, payed) {
    const conditionalConditions = {};
    if (payed !== undefined) {
      conditionalConditions.payed = payed ? 1 : 0;
    }

    return DAL.DB.Slot.findOne({
      attributes: [
        [sequelize.fn('sum', sequelize.fn('timestampdiff', sequelize.literal('minute'), sequelize.col('startsAt'), sequelize.col('endsAt'))), 'sum'],
        [sequelize.fn('count', sequelize.col('slotId')), 'count'],
      ],

      where: {
        psychologistId,
        startsAt: {
          [Op.between]: [from, to],
        },
        status: {
          [Op.in]: statuses,
        },
        templateId: {
          [Op.in]: templateIds,
        },
        ...conditionalConditions,
      },
    });
  }
}

const instance = new Slot();
export default instance;
