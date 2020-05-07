import { combineReducers } from 'redux';
import statisticsReducer from './statisticsReducer';
import userReducer from './userReducer';
import misconductReducer from './misconductReducer';

const rootReducer = combineReducers({
  statistics: statisticsReducer,
  misconductScores: misconductReducer,
  user: userReducer,
});

export default rootReducer;
