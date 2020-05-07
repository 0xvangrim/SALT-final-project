export function userLoggedIn(boolean) {
  return {
    type: 'USER_LOGGED_IN',
    loggedIn: boolean,
  };
}

export function userInfo(id, userType, token) {
  return {
    type: 'USER_INFO',
    id,
    userType,
    token,
  };
}

export function loginFailed() {
  return {
    type: 'LOGIN_FAILED',
  };
}
