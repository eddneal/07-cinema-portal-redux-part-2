const initialState = {
  user: null,
  showLoginForm: false,
  loginError: ''
};

const userIdentity = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_LOGIN_FORM':
      return {...state, showLoginForm: true};
    case 'CLOSE_LOGIN_FORM':
      return {...state, showLoginForm: false, loginError: ''};
    case 'LOGIN_SUCCESS':
      return {...state, user: action.user, showLoginForm: false, loginError: ''};
    case 'LOGIN_FAIL':
      return {...state, loginError: 'Login attempt failed.'};
    case 'LOGOUT':
      return {...state, user: null};
    default:
      return state;
  }
};

export default  userIdentity;
