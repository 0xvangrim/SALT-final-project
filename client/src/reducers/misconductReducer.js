import { combineReducers } from 'redux';
import DateHelper from '../components/DateHelper';

export function misconductScoresAreLoading(state = true, action) {
  switch (action.type) {
    case 'SCORES_ARE_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function updateMisconductScores(state = [], action) {
  switch (action.type) {
    case 'UPDATE_MISCONDUCT_SCORES':
      return action.data.scores;
    default:
      return state;
  }
}

export function scoresHasErrored(state = false, action) {
  switch (action.type) {
    case 'SCORES_HAS_ERRORED':
      return true;
    default:
      return state;
  }
}

export function updateMisconductInfo(state = { isLoading: true, hasErrored: false, month: DateHelper.thisMonth() }, action) {
  switch (action.type) {
    case 'UPDATE_MISCONDUCT_INFO':
      return { ...state, data: action.data };
    case 'MISCONDUCT_INFO_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'INFO_HAS_ERRORED':
      return { ...state, hasErrored: true };
    case 'UPDATE_MONTH':
      return { ...state, month: action.month };
    default:
      return state;
  }
}

export default combineReducers({
  areLoading: misconductScoresAreLoading,
  data: updateMisconductScores,
  hasErrored: scoresHasErrored,
  info: updateMisconductInfo,
});
