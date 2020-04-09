import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import request from '../store/request'
import PageLayout from '../components/PageLayout'
import Login from '../views/Login'


function verify(token, pathname) {
  request({
    url: '/api/verify',
    method: "POST",
    data: {
      token
    }
  }).then(({ errorCode }) => {
    console.log(errorCode)
    if (errorCode !== 0)
      return {
        ifLogin: false,
        pathname: '/login'
      }
    else
      return {
        ifLogin: true,
        pathname,
      }
  }).catch(() => {
    return {
      ifLogin: false,
      pathname: '/login'
    }
  })
}


class Auth extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'GET_USER_INFO'
    })
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { location } = nextProps
  //   const { pathname } = location
  //   const prevPath = prevState.pathname
  //   console.log(pathname, prevPath)
  //   if (pathname !== prevPath) {
  //     const token = localStorage.getItem('token')
  //     if (token) {
  //       verify(token, pathname)
  //     }
  //     else {
  //       return {
  //         ifLogin: false,
  //         pathname: '/login'
  //       }
  //     }
  //   }
  //   return null
  // }

  render() {
    const { location, config, loginState } = this.props
    const { userInfo } = loginState
    const { pathname } = location
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('union_role')
    if (pathname === '/login' && !token) {
      return <Route exact path='/login' component={Login} />
    }
    if (token) {
      if (role === 'user') {
        const targetUserRouter = config.user.find(v => v.path === pathname)
        if (pathname === '/login' && !targetUserRouter) {
          return <Redirect to='/' />
        }
        if (targetUserRouter) {
          return (
            <PageLayout role={role}>
              <Route path={pathname} component={targetUserRouter.component} />
            </PageLayout>
          )
        }
        else {
          return <Redirect to='/' />
        }
      }
      if (role === 'admin') {
        const targetAdminRouter = config.admin.find(v => v.path === pathname)
        if (pathname === '/login' && !targetAdminRouter) {
          return <Redirect to='/application' />
        }
        if (targetAdminRouter) {
          return (
            <PageLayout role={role}>
              <Route path={pathname} component={targetAdminRouter.component} />
            </PageLayout>
          )
        }
        else
          return <Redirect to='/application' />
      }
    } else {
      return <Redirect to='/login' />
    }
  }
}

export default connect(
  state => ({
    loginState: state.loginPage
  })
)(Auth)
