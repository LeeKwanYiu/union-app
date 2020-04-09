import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { adminNav } from '../config/nav'

const { Sider } = Layout

class SiderNav extends React.Component {
  state = {
    selectedKeys: [adminNav[0].key || '']
  }

  componentDidMount() {
    this.handleRefresh()
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
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={this.handleSelect}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            adminNav.map(item => {
              const {
                key = '',
                path = '',
                title = ''
              } = item
              return (
                <Menu.Item
                  key={key}
                >
                  <Link to={path}>
                    <span>{title}</span>
                  </Link>
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Sider>
    )
  }
}

export default SiderNav