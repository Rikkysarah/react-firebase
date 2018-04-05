import React, { Component } from 'react';
import  { 
    Link,
withRouter,
} from 'react-router-dom';
  
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

import FaServer from 'react-icons/lib/fa/server';
const SignUpPage = ({history}) =>

<SignUpForm history={history} />
//</div>
// Initialize the state of the component
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
        username,
        email,
        passwordOne,
      } = this.state;

      const {
        history,
      } = this.props;
  
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
              // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
          history.push(routes.HOME);
        });
  
      event.preventDefault();
  }

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      //Validation

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';
    return (
      <div className="row">
      <div className="col-md-8">
      <div className="container">
      <div>
      <h3>Sign Up For An Account</h3>
      <p>  </p>
      <p>It's super fast and easy</p>
      </div>
      <form onSubmit={this.onSubmit}>
        <div className="row">
        <div className="col-md-6">
          <input 
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="First Name"
        />
        </div>
        <div className="col-md-6">
          <input 
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Last Name"
        />
        </div>
        </div>
        <div className="form-group">
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        </div>
        <div className="form-group">
        <span>
        <input
          value={passwordOne} 
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password" />
                
        </span>
      
        </div>
        <div className="form-group">
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        </div>
        <p>Got an invite code?</p>
        <button disabled={isInvalid}  type="submit" class="btn btn-primary">
          Next
        </button>

        { error && <p>{error.message}</p> }
      </form>
      </div>
      </div>
      <div className="col-md-4">
      <div className="cont">
       <FaServer style={{left:"140px",position:"relative", width:"100px", height:"70px"}}/>
        <h4 style={{textAlign:"center", padding:"20px 10px"}}>Personal Details</h4>
        <p style={{textAlign:"center"}}>We'll like to meet you. Please fill in<br/> 
        your name, email, password and phone <br/>
        number to create an account</p>
        <div className="contact">
          <p style={{textAlign:"center"}}>Need help? <a href="#">Contact Us</a></p>
        </div>
      </div>
      </div>
      </div>
  
    );
  }
}

const SignUpLink = () =>
  <div className="account">
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
  <div className="account">
  <p>
    By clicking on
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
    You agree to our <a href="#">terms & conditions</a> and<a href="#">Privacy policy</a>
  </p>
  </div>
  </div>
  
//export default SignUpPage;

export default withRouter(SignUpPage);
export {
  SignUpForm,
  SignUpLink,
};