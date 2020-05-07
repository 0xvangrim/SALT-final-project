import Sequelize from 'sequelize';
import User from './models/user';
import Patient from './models/patient';
import Psychologist from './models/psychologist';
import Slot from './models/slot';
import Template from './models/template';
import config from '../config';

class DAL {
  constructor() {
    this.setupSequelize();
    this.setupModels();
    this.bootstrap();
    this.init();
  }

  /** Main DB instance */
  get DB() {
    return this._db;
  }

  /** Initialize the connection to the DB */
  init() {
    // Run `.associate` if it exists,
    // ie create relationships in the ORM
    Object.values(this._models)
      .filter((model) => typeof model.associate === 'function')
      .forEach((model) => model.associate(this._models));

    this._db = {
      ...this._models,
      sequelize: this._sequelize,
    };
  }

  setupSequelize() {
    this._sequelize = new Sequelize(config.DB);
  }

  setupModels() {
    this._models = {
      User: User.init(this._sequelize, Sequelize),
      Patient: Patient.init(this._sequelize, Sequelize),
      Psychologist: Psychologist.init(this._sequelize, Sequelize),
      Slot: Slot.init(this._sequelize, Sequelize),
      Template: Template.init(this._sequelize, Sequelize),
    };
  }

  bootstrap() {
    this._slot = require('./models/slot').default;
  }
}

const instance = new DAL();
export default instance;
