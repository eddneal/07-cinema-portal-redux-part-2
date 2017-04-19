import axios from './../api/axios';

const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  user
});

const loginFailed = (error) => ({
  type: 'LOGIN_FAIL',
  error
});

export const login = (credentials) => {
  return (dispatch) => {
    return axios.post('/login', credentials).then(
      () => dispatch(loginSuccess(credentials)),
      (error) => dispatch(loginFailed(error))
    );
  }
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const showLoginForm = () => ({
  type: 'SHOW_LOGIN_FORM'
});

export const closeLoginForm = () => ({
  type: 'CLOSE_LOGIN_FORM'
});
