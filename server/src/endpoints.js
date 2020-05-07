import SlotContoller from './executor/slots/slotController';
import UserController from './executor/user/userController';
import AdminController from './executor/admin/adminController';
import StatisticsBookingController from './executor/statistics/psychologistBookingController';
import StatisticsPatientController from './executor/statistics/psychologistPatientController';

import middleware from './middleware';

const endpoints = {};

endpoints.ping = {
  url: '/v1/ping',
  method: 'get',
  handler: (req, res) => {
    res.status(200).send('pong');
  },
};

endpoints.login = {
  url: '/v1/user/login',
  method: 'post',
  handler: UserController.login,
  middleware: [],
};

endpoints.getSlots = {
  url: '/v1/slot',
  method: 'get',
  handler: SlotContoller.getAllSlots,
  middleware: [middleware.validToken],
};

endpoints.getMisconductScore = {
  url: '/v1/admin/misconduct-score',
  method: 'get',
  handler: AdminController.getMisconductScore,
  middleware: [middleware.validToken],
};

endpoints.getStatusesCount = {
  url: '/v1/admin/status-count/:id',
  method: 'get',
  handler: AdminController.getStatusCounts,
  middleware: [middleware.validToken],
};

endpoints.getBookingStatistics = {
  url: '/v1/statistics/psychologist/:id/booking',
  method: 'get',
  handler: StatisticsBookingController.getBookingStatistics,
  middleware: [middleware.validToken],
};

endpoints.getPatientStatistics = {
  url: '/v1/statistics/psychologist/:id/patient',
  method: 'get',
  handler: StatisticsPatientController.getPatientStatistics,
  middleware: [middleware.validToken],
};

module.exports = endpoints;
