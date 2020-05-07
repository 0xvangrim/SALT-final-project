
class BusinessLayer {
  constructor() {
    this.bootstrap();
  }

  get DateHelper() {
    return this._dateHelper;
  }

  get Slot() {
    return this._slot;
  }

  get Psychologist() {
    return this._psychologist;
  }

  get MisconductScore() {
    return this._misconductScore;
  }

  get Template() {
    return this._template;
  }

  get PsychologistStatistics() {
    return this._psychologistStatistics;
  }

  get DateHelper() {
    return this._dateHelper;
  }

  bootstrap() {
    this._dateHelper = require('./dateHelper').default;
    this._slot = require('./slot').default;
    this._psychologist = require('./psychologist').default;
    this._misconductScore = require('./misconductScore').default;
    this._template = require('./template').default;
    this._psychologistStatistics = require('./statistics').psychologistInstance;
    this._dateHelper = require('./dateHelper').default;
  }
}

const instance = new BusinessLayer();
export default instance;
