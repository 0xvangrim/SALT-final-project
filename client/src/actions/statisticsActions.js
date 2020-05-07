export function bookingStatisticsAreLoading(boolean) {
  return {
    type: 'BOOKING_STATISTICS_ARE_LOADING',
    isLoading: boolean,
  };
}

export function patientStatisticsAreLoading(boolean) {
  return {
    type: 'PATIENT_STATISTICS_ARE_LOADING',
    isLoading: boolean,
  };
}

export function updatePatientStatistics(stats) {
  return {
    type: 'UPDATE_PATIENT_STATISTICS',
    stats,
  };
}

export function updateBookingStatistics(stats) {
  return {
    type: 'UPDATE_BOOKING_STATISTICS',
    stats,
  };
}

export function updateWorkingQuota(quota) {
  return {
    type: 'UPDATE_WORKING_QUOTA',
    quota,
  };
}

export function hasErrored() {
  return {
    type: 'HAS_ERRORED',
  };
}
