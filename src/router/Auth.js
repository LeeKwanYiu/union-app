import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import Login from '../views/Login'
import NotFound from '../views/NotFound'

class Auth extends Component {
  render() {
    const { location, config } = this.props
    const { pathname } = location
    const token = localStorage.getItem('token')
    const targetRouterConfig = config.find(v => v.path === pathname)
    if (pathname === '/login') {
      return <Route exact path='/login' component={Login} />
    }
    if (token) {
      //这里用app包裹组件是因为app里有除登录页和404页的其他页面公用的头部组件和侧边菜单组件
      if (targetRouterConfig && pathname !== '/404') {
        return (
          <PageLayout>
            <Route path={pathname} component={targetRouterConfig.component} />
          </PageLayout>
        )
      }
      else if (pathname === '/404') {
        return <Route exact path='/404' component={NotFound} />
      }
      else {
        // 如果路由不合法，重定向到 404 页面
        return <Redirect to='/404' />
      }

    } else {
      return <Redirect to='/login' />
    }
  }
}

export default Auth;