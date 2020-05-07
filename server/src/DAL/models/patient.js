import Sequelize from 'sequelize';
import moment from 'moment';
import config from '../../config';
import crypto from '../../businessLayer/crypto';

class Patient extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        patientId: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.INTEGER,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          get() {
            try {
              const encryptedPhoneNumber = this.getDataValue('phoneNumber');
              if (encryptedPhoneNumber) {
                return crypto.decrypt(encryptedPhoneNumber);
              }

              return null;
            } catch (error) {
              logger.error('Could not decrypt patient phoneNumber', error);
              return null;
            }
          },
          set(value) {
            const phoneNumber = value ? crypto.encrypt(String(value)) : null;
            this.setDataValue('phoneNumber', phoneNumber);
          },
        },
        freeCardNumber: DataTypes.STRING,
        freeCardExpiryDate: {
          type: config.sequelize.DATA_TYPES.TIMESTAMP,
          get() {
            try {
              const freeCardExpiryDate = this.getDataValue('freeCardExpiryDate');
              if (freeCardExpiryDate) {
                return moment(date)
                  .add(moment(freeCardExpiryDate).utcOffset(), 'm')
                  .utc().unix();
              }

              return null;
            } catch (error) {
              logger.error('Could not change the date to unix for freeCardExpiryDate', error);
              return null;
            }
          },
        },
        termsAndConditions: DataTypes.BOOLEAN,
        createdAt: config.sequelize.DATA_TYPES.TIMESTAMP,
        updatedAt: config.sequelize.DATA_TYPES.TIMESTAMP,
      },
      { sequelize, timestamps: false },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      as: config.sequelize.ALIASES.USER,
      foreignKey: config.sequelize.PRIMARY_KEYS.USERS,
    });
  }
}

export default Patient;
