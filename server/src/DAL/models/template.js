import Sequelize from 'sequelize';
import config from '../../config';

class Template extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      templateId: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      allowParallel: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      allowCustomLength: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      allowInPast: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      isDirect: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      isMeeting: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
      name: DataTypes.STRING,
      color: DataTypes.STRING,
      defaultLength: DataTypes.INTEGER,
      createdAt: config.sequelize.DATA_TYPES.TIMESTAMP,
      updatedAt: config.sequelize.DATA_TYPES.TIMESTAMP,
    }, { sequelize });
  }
}

export default Template;
