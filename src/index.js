import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App';
import SignUp from './SignUp'
import Registration from './Registration'
import ThankYou from './ThankYou'

render((
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ SignUp } />
        <Route path="signup" component={ SignUp } />
        <Route path="registration" component={ Registration } />
        <Route path="thankyou" component={ ThankYou } />
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
