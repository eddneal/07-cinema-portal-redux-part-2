import {connect} from 'react-redux';
import {
  login,
  logout,
  closeLoginForm,
  showLoginForm
} from '../actions/login';
import Root from './../components/Root';

const mapStateToProps = (state) => ({
  user: state.login.user,
  showLoginForm: state.login.showLoginForm,
  loginError: state.login.loginError
});

const mapDispatchToProps = {
  onLogin: login,
  onLogOut: logout,
  onCloseLoginForm: closeLoginForm,
  onShowLoginForm: showLoginForm
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
