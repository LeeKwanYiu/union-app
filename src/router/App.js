import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Auth from './Auth'
import routerConfig from './routerConfig'
import store from '../store'

/**
 * App组件
 * 定义整个页面的布局
 */
class App extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <Router history={this.props.history}>
          <Switch>
            <Auth config={routerConfig} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
// export default connect(state => ({
//   number: state.number,
// }))(App);

export default App
