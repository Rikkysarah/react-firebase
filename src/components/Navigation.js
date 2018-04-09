import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>
Navigation.contextTypes = {
  authUser: PropTypes.object,
};

const NavigationAuth = () =>
<div className="row">
  <ul>
    <div className="col-md-3">
      <li><Link to={routes.LANDING}>Landing</Link></li>
    </div>
    <div className="col-md-3">
     <li><Link to={routes.HOME}>Home</Link></li>
    </div>
    <div className="col-md-3">
      <li><Link to={routes.ACCOUNT}>Account</Link></li>
    </div>
    <div className="col-md-3">
      <li><SignOutButton /></li>
    </div>
    
  </ul>
  </div>

const NavigationNonAuth = () =>

<h3 className="well">
 <Link to={routes.SIGN_UP}>Welcome</Link>
 </h3>
 


export default Navigation;
