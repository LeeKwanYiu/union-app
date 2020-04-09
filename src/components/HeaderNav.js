import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Avatar } from 'antd'
import { connect } from 'react-redux'
import { UserOutlined } from '@ant-design/icons';
import { navList } from '../config/nav'
import styles from './HeaderNav.less'
import UserAvatar from './UserAvatar'

const { Header } = Layout

/*
  定义头部内容哦
*/
class HeaderNav extends React.Component {
  state = {
    selectedKeys: [navList[0].key || '']
  }

  componentDidMount() {
    this.handleRefresh();
    const { dispatch } = this.props
    dispatch({
      type: 'GET_USER_INFO'
    })
  }

  // 刷新时保持高亮
  handleRefresh = () => {
    const { pathname } = window.location
    const key = pathname.split('/')[1] || 'home'
    this.setState({
      selectedKeys: [key]
    })
  }

  // 点击后更新选择的key
  handleSelect = ({ key }) => {
    this.setState({
      selectedKeys: [key]
    })
  }

  render() {
    const { selectedKeys } = this.state
    const { pathname } = window.location
    // 不同页面头部的不同展示
    const head = pathname === '/' ? "first-page" : "other-page"
    const menu = pathname === '/' ? "firstpage-menu" : "menu"
    return (
      <div className={styles.root}>
        <Header className={head}>
          <div className={styles.user}>
            <UserAvatar />
          </div>
          <Menu
            mode="horizontal"
            theme="dark"
            selectedKeys={selectedKeys}
            onSelect={this.handleSelect}
            style={{ lineHeight: '64px' }}
            className={menu}
          >
            {
              navList.map(item => {
                const {
                  key = '',
                  path = '',
                  title = ''
                } = item
                return (
                  <Menu.Item
                    key={key}
                    style={{ width: 120, fontSize: '1rem', textAlign: 'center' }}
                  >
                    <Link to={path}>
                      <span>{title}</span>
                    </Link>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Header>
      </div>
    )
  }
}

export default connect(
  state => ({
    loginState: state.loginPage
  })
)(HeaderNav)