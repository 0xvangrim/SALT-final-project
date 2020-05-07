import { Op } from 'sequelize';
import DAL from '../DAL';
import config from '../config';

class Psychologist {
  findAll() {
    return DAL.DB.Psychologist.findAll({
      attributes: ['psychologistId'],
    });
  }

  findSummaryByIds(psychologistIds) {
    return DAL.DB.Psychologist.findAll({
      attributes: ['psychologistId', 'thumbnail'],
      include: [{
        model: DAL.DB.User,
        as: config.sequelize.ALIASES.USER,
        attributes: ['firstName', 'lastName'],
      }],
      where: {
        psychologistId: {
          [Op.in]: psychologistIds,
        },
      },
    });
  }
}

const instance = new Psychologist();
export default instance;
