import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './components/SearchResults'
import Index from './components/index'
import PrivateMessage from './components/messageframe';

import { IndexRoute, Router, Route, browserHistory, Link, hashHistory, Profile_Settings } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Index}/>
    <Route path="/messages" component={PrivateMessage}/>
    <Route path="search/" component={SearchResults}/>
    <Route path="search/:query" component={SearchResults}/>
  </Router>
),document.getElementById('debug'));
