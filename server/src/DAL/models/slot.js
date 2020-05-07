import Sequelize from 'sequelize';
import config from '../../config';

class Slot extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      slotId: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      startsAt: config.sequelize.DATA_TYPES.TIMESTAMP,
      endsAt: config.sequelize.DATA_TYPES.TIMESTAMP,
      payed: DataTypes.BOOLEAN,
      method: DataTypes.ENUM(Object.values(config.sequelize.ENUMS.BOOKING_METHODS)),
      status: DataTypes.ENUM(Object.values(config.sequelize.ENUMS.BOOKING_STATUSES)),
      createdAt: config.sequelize.DATA_TYPES.TIMESTAMP,
      updatedAt: config.sequelize.DATA_TYPES.TIMESTAMP,
    }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.Patient, {
      as: config.sequelize.ALIASES.PATIENT,
      foreignKey: config.sequelize.PRIMARY_KEYS.PATIENTS,
    });
    this.belongsTo(models.Psychologist, {
      as: config.sequelize.ALIASES.PSYCHOLOGIST,
      foreignKey: config.sequelize.PRIMARY_KEYS.PSYCHOLOGISTS,
    });
    this.belongsTo(models.Template, {
      as: config.sequelize.ALIASES.TEMPLATE,
      foreignKey: config.sequelize.PRIMARY_KEYS.TEMPLATES,
    });
  }

  /** getStartsAt as millis timestamp */
  getStartsAt() {
    return new Date(this.startsAt).getTime();
  }

  /** getEndsAt as millis timestamp */
  getEndsAt() {
    return new Date(this.endsAt).getTime();
  }

  /** Copies and formats dates to timestamps in millis */
  getFormated() {
    return {
      ...this.dataValues,
      startsAt: new Date(this.startsAt).getTime(),
      endsAt: new Date(this.endsAt).getTime(),
    };
  }
}

export default Slot;
