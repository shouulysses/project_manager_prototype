import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../actions/AuthActions';
import SignupForm from '../../components/Auth/SignupForm';

class SignupContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.handleSignup = this.handleSignup.bind(this);
    //this.props.dispatch(Actions.initialState());
  }
  
  // Redirect if login
  componentDidUpdate(prevProps){
    if(this.props.isAuthenticated)
      this.context.router.push('/projects');
  }
  
  handleSignup(email, password, confirmPassword) {
    const creds = {email, password, confirmPassword};
    this.props.dispatch(Actions.signup(creds));
  }
  
  render() {
    return (
      <SignupForm 
        handleSignup = {this.handleSignup} 
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

SignupContainer.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

SignupContainer.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(SignupContainer);