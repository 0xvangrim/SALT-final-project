import Sequelize from 'sequelize';
import config from '../../config';
import crypto from '../../businessLayer/crypto';

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init({
      userId: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        get() {
          try {
            const encryptedEmail = this.getDataValue('email');
            if (encryptedEmail) {
              return crypto.decrypt(encryptedEmail);
            }

            return null;
          } catch (error) {
            logger.error('Could not decrypt user email', error);
            return null;
          }
        },
        set(value) {
          const email = value ? crypto.encrypt(String(value)) : null;
          this.setDataValue('email', email);
        },
      },
      nationalIdentity: {
        type: DataTypes.STRING,
        get() {
          try {
            const encryptedNationalIdentity = this.getDataValue(config.application.NATIONAL_IDENTITY);
            if (encryptedNationalIdentity) {
              return crypto.decrypt(encryptedNationalIdentity);
            }
            return null;
          } catch (error) {
            logger.error('Could not decrypt user national identity', error);
            return null;
          }
        },
        set(value) {
          const nationalIdentity = value ? crypto.encrypt(String(value)) : null;
          this.setDataValue(config.application.NATIONAL_IDENTITY, nationalIdentity);
        },
      },
      blocked: DataTypes.BOOLEAN,
      notificationToken: DataTypes.STRING,
      createdAt: config.sequelize.DATA_TYPES.TIMESTAMP,
      updatedAt: config.sequelize.DATA_TYPES.TIMESTAMP,
    }, {
      sequelize,
    });
  }
}

export default User;
