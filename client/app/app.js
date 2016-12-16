import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './components/SearchResults'
import Index from './components/index'
import PrivateMessage from './components/messageframe';
import Profile_Settings from './components/Profile_Settings';
import Hot from './components/hot'
import { IndexRoute, Router, Route, browserHistory, Link, hashHistory } from 'react-router'
import ErrorBanner from './components/errorbanner';



ReactDOM.render((

  <Index />,
  <Router history={hashHistory}>
    <ErrorBanner />
    <Route path="/" component={Index}/>
    <Route path="messages" component={PrivateMessage}/>
    <Route path="search/" component={SearchResults}/>
    <Route path="search/:query" component={SearchResults}/>
    <Route path="settings/" component={Profile_Settings}/>
    <Route path="hot/" component={Hot}/>
  </Router>
),document.getElementById('debug'));
