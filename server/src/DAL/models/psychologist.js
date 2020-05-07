import Sequelize from 'sequelize';
import config from '../../config';
import crypto from '../../businessLayer/crypto';

class Psychologist extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      psychologistId: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      gender: DataTypes.ENUM(Object.values(config.sequelize.ENUMS.GENDERS)),
      phone: {
        type: DataTypes.STRING,
        get() {
          try {
            const encryptedPhone = this.getDataValue('phone');
            if (encryptedPhone) {
              return crypto.decrypt(encryptedPhone);
            }

            return null;
          } catch (error) {
            console.log('Could not decrypt psychologist phone', error);
            return null;
          }
        },
        set(value) {
          const phone = value ? crypto.encrypt(String(value)) : null;
          this.setDataValue('phone', phone);
        },
      },
      hsa: {
        type: DataTypes.STRING,
        get() {
          try {
            const encryptedHsa = this.getDataValue('hsa');
            if (encryptedHsa) {
              return crypto.decrypt(encryptedHsa);
            }

            return null;
          } catch (error) {
            console.log('Could not decrypt psychologist hsa', error);
            return null;
          }
        },
        set(value) {
          const hsa = value ? crypto.encrypt(String(value)) : null;
          this.setDataValue('hsa', hsa);
        },
      },
      headline: DataTypes.STRING,
      summary: DataTypes.TEXT,
      thumbnail: DataTypes.STRING,
      bigImage: DataTypes.STRING,
      createdAt: config.sequelize.DATA_TYPES.TIMESTAMP,
      updatedAt: config.sequelize.DATA_TYPES.TIMESTAMP,
    }, {
      sequelize,
      timestamps: false,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: config.sequelize.ALIASES.USER,
      foreignKey: config.sequelize.PRIMARY_KEYS.USERS,
    });
  }
}

export default Psychologist;
