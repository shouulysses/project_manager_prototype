import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Link } from 'react-router';

//Import Images
import logo from '../../public/static/logo.png';

export default class SignupForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSignup = this.handleSignup.bind(this);
  }
  
  handleSignup = (e) => {
    e.preventDefault();
    this.props.handleSignup(this.email.value, this.password.value, this.confirmPassword.value);
  }
  
  render(){
    return (
      <div className="login-container">
        <div className="row login-box">
          <div className="col-12 col-md-6 left">
            <h1>Sign up</h1>
            <Form onSubmit={this.handleSignup}>
              <Form.Field>
                <label htmlFor="login-email" className="label-field"><span className="label-field-name">Email</span></label>
                <input ref={email => (this.email = email)} name="email" type="text" required />
              </Form.Field>
              <Form.Field>
                <label htmlFor="login-password" className="label-field"><span className="label-field-name">Password</span></label>
                <input ref={password => (this.password = password)} name="password" type="password" required />
              </Form.Field>
              <Form.Field>
                <label htmlFor="login-confirm-password" className="label-field"><span className="label-field-name">Confirm Password</span></label>
                <input ref={confirmPassword => (this.confirmPassword = confirmPassword)} name="confirmPassword" type="password" required />
              </Form.Field>
              <div className="btn-group">
                <Button type="submit">Sign In</Button>
              </div>
               { this.props.message }
            </Form>
            <div className="mt2">
              <Link to="/">I want to Log In</Link>
            </div>
          </div>
          <div className="col-12 col-md-6 right bg-sea-blue">
            <img src={ logo } />
          </div>
        </div>
      </div>
    );
  }
};

