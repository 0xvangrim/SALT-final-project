import { combineReducers } from 'redux';

const meetingsPerWeek = 20;
const meetingsPerMonth = 80;

export function bookingStatisticsAreLoading(state = true, action) {
  switch (action.type) {
    case 'BOOKING_STATISTICS_ARE_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function patientStatisticsAreLoading(state = true, action) {
  switch (action.type) {
    case 'PATIENT_STATISTICS_ARE_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function updatePatientStatistics(state = [], action) {
  switch (action.type) {
    case 'UPDATE_PATIENT_STATISTICS':
      return action.stats;
    default:
      return state;
  }
}

export function updateBookingStatistics(state = [], action) {
  switch (action.type) {
    case 'UPDATE_BOOKING_STATISTICS':
      return action.stats;
    default:
      return state;
  }
}

export function updateWorkingQuota(state = { ratio: 1, meetingsPerWeek, meetingsPerMonth }, action) {
  switch (action.type) {
    case 'UPDATE_WORKING_QUOTA':
      return {
        ratio: action.quota,
        meetingsPerWeek: action.quota * meetingsPerWeek,
        meetingsPerMonth: action.quota * meetingsPerMonth,
      };
    default:
      return state;
  }
}

export function hasErrored(state = false, action) {
  switch (action.type) {
    case 'HAS_ERRORED':
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  bookingStatisticsAreLoading,
  patientStatisticsAreLoading,
  hasErrored,
  patients: updatePatientStatistics,
  bookings: updateBookingStatistics,
  quota: updateWorkingQuota,
});
