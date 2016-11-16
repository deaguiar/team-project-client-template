import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './components/SearchResults'
import Index from './components/index'
import PrivateMessage from './components/messageframe';
import Profile_Settings from './components/Profile_Settings';

import { IndexRoute, Router, Route, browserHistory, Link, hashHistory } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Index}/>
    <Route path="messages" component={PrivateMessage}/>
    <Route path="search/" component={SearchResults}/>
    <Route path="search/:query" component={SearchResults}/>
    <Route path="settings/" component={Profile_Settings}/>
  </Router>
),document.getElementById('debug'));
