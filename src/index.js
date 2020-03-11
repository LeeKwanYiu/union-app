import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import App from './views/App';
import * as serviceWorker from './serviceWorker';

import './common.less';

ReactDom.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
