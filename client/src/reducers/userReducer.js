import { combineReducers } from 'redux';

export function userLoggedIn(state = false, action) {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return action.loggedIn;
    default:
      return state;
  }
}

export function userInfo(state = {}, action) {
  switch (action.type) {
    case 'USER_INFO':
      return {
        id: action.id,
        type: action.userType,
        token: action.token,
      };
    default:
      return state;
  }
}

export function loginFailed(state = false, action) {
  switch (action.type) {
    case 'LOGIN_FAILED':
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  loggedIn: userLoggedIn,
  info: userInfo,
  loginFailed,
});
