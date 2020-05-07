export function misconductScoresAreLoading(boolean) {
  return {
    type: 'SCORES_ARE_LOADING',
    isLoading: boolean,
  };
}

export function updateMisconductScores(data) {
  return {
    type: 'UPDATE_MISCONDUCT_SCORES',
    data,
  };
}

export function misconductInfoLoading(boolean) {
  return {
    type: 'MISCONDUCT_INFO_LOADING',
    isLoading: boolean,
  };
}

export function updateMisconductInfo(data) {
  return {
    type: 'UPDATE_MISCONDUCT_INFO',
    data,
  };
}

export function updateMonth(month) {
  return {
    type: 'UPDATE_MONTH',
    month,
  };
}

export function scoresHasErrored() {
  return {
    type: 'SCORES_HAS_ERRORED',
  };
}

export function infoHasErrored() {
  return {
    type: 'INFO_HAS_ERRORED',
  };
}
