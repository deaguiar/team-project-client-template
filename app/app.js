import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './components/SearchResults'
import Index from './components/index'
import { IndexRoute, Router, Route, browserHistory, Link, hashHistory } from 'react-router'



/*
ReactDOM.render((
<Index />
),document.getElementById('debug'));
*/

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Index}/>
    <Route path="search/" component={SearchResults}/>
  </Router>
),document.getElementById('debug'));

/*
ReactDOM.render((
  <SearchResults />
),document.getElementById('search-results'));*/
