import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './App';
import SignUp from './SignUp'
import Registration from './Registration'
import ThankYou from './ThankYou'
import Activate from './Activate'
import End from './End'

render((
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Registration } />
        <Route path="signup" component={ SignUp } />
        <Route path="registration" component={ Registration } />
        <Route path="thankyou" component={ ThankYou } />
        <Route path="activate" component={ Activate } />
        <Route path="end" component={ End } />
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
