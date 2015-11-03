/* eslint react/jsx-sort-props: 0 */  // Routes: path, component order is nicer
import React from 'react';
import Router, {Route, IndexRoute} from 'react-router';

import Root from './components/root.jsx';
import NotFound from './components/static/not-found.jsx';
import MainMap from './components/map/mainmap.jsx';

React.render((
  <Router>
    <Route path="/" component={Root}>
    <IndexRoute component={MainMap} />
    <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.body);
