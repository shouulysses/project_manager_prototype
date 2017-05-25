import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/AuthActions';
import LoginForm from '../../components/Auth/LoginForm';

class LoginContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.handleLogin = this.handleLogin.bind(this);
    //this.props.dispatch(Actions.initialState());
  }
  
  // Redirect if login
  componentDidUpdate(prevProps){
    if(this.props.isAuthenticated)
      this.context.router.push('/projects');
  }
  
  handleLogin(email, password) {
    const creds = {email, password};
    this.props.dispatch(Actions.loginUser(creds));
  }
  
  render() {
    return (
      <LoginForm 
        handleLogin = {this.handleLogin} 
        message = {this.props.message}
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    isFetching: store.auth.isFetching,
    isAuthenticated: store.auth.isAuthenticated,
    message: store.auth.message
  };
}

LoginContainer.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

LoginContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(LoginContainer);