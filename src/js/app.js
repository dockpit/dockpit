import React from 'react'
import Router from 'react-router'
import { Route, DefaultRoute } from 'react-router'

import App from './views/App.jsx'
import Daily from './views/Daily.jsx'

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Daily}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

