import React from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom'
import HeaderNav from './components/HeaderNav';
import MyUnion from '../MyUnion';
import Home from '../Home';
import Union from '../Union';
import Login from '../Login';
import styles from './index.less';

const { Content } = Layout
/**
 * App组件
 * 定义整个页面的布局
 */
class App extends React.Component {
  componentDidMount() {

  }

  render() {
    const pathname = window.location.pathname
    if (pathname === '/login')
      return (
        <Login />
      )
    else
      return (
        <Layout className={styles.root}>
          <HeaderNav />
          <Content>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/union" component={Union} />
              <Route path="/myUnion" component={MyUnion} />
              <Redirect to="/" />
            </Switch>
          </Content>
        </Layout>
      );
  }
}
// export default connect(state => ({
//   number: state.number,
// }))(App);

export default App
