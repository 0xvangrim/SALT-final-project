import dotenv from 'dotenv';

dotenv.config();

class Config {
  constructor() {
    this.initConfig();
  }

  get jwt() {
    return this._jwt;
  }

  get sequelize() {
    return this._sequelize;
  }

  get crypto() {
    return this._crypto;
  }

  get application() {
    return this._application;
  }

  get DB() {
    return this._db;
  }

  get sequelize() {
    return this._sequelize;
  }

  initConfig() {
    if (!process.env.JWT_SECRET) {
      throw 'Cannot configure without setting JWT secret in process.env.JWT_SECRET';
    }

    this._application = {
      NATIONAL_IDENTITY: 'nationalIdentity',
    };

    this._crypto = {
      encryptionType: process.env.CRYPTO_ENCRYPTION_TYPE,
      decryptionType: process.env.CRYPTO_DECRYPTION_TYPE,
      keyType: process.env.CRYPTO_KEY_TYPE,
      ivType: process.env.CRYPTO_IV_TYPE,
      key: process.env.CRYPTO_KEY,
      iv: process.env.CRYPTO_IV,
    };

    this._jwt = {
      expiresIn: parseInt(process.env.JWT_EXPIRATION) || 7200,
      algorithm: process.env.JWT_ALGORITHM || 'HS256',
      secret: process.env.JWT_SECRET,
    };

    this._db = {
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_CONNECTION || 'mysql',
      seederStorage: 'sequelize',
      dialectOptions: {
        charset: 'utf8mb4',
      },
      logging: (str) => {
        if (process.env.DB_LOGGING == 'true') {
          console.log(str);
        }
      },
    };

    this._sequelize = {
      PRIMARY_KEYS: {
        USERS: 'userId',
        PATIENTS: 'patientId',
        PSYCHOLOGISTS: 'psychologistId',
        SLOTS: 'slotId',
        TEMPLATES: 'templateId',
      },
      DATA_TYPES: {
        TIMESTAMP: 'TIMESTAMP',
      },
      ENUMS: {
        BOOKING_STATUSES: {
          REDACTED_ONE: 'REDACTED_ONE',
          REDACTED_TWO: 'REDACTED_TWO',
          REDACTED_THREE: 'REDACTED_THREE',
          REDACTED_FOUR: 'REDACTED_FOUR',
          REDACTED_FIVE: 'REDACTED_FIVE',
          REDACTED_SIX: 'REDACTED_SIX',
        },
        GENDERS: {
          MALE: 'M',
          FEMALE: 'F',
        },
        BOOKING_METHODS: {
          VIDEO: 'VIDEO',
          CHAT: 'CHAT',
        },
      },
      ALIASES: {
        USER: 'user',
        USERS: 'users',
        PATIENT: 'patient',
        PATIENTS: 'patients',
        PSYCHOLOGIST: 'psychologist',
        PSYCHOLOGISTS: 'psychologists',
        SLOT: 'slot',
        SLOTS: 'slots',
        TEMPLATE: 'template',
      },
    };
  }
}

const instance = new Config();
export default instance;
