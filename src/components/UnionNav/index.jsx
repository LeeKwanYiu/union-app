import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { unionNavList } from '../../config/nav'
import style from './index.less'

const { Content, Sider } = Layout

const UnionNav = ({ children }) => {
  const { unionId } = useRouteMatch('/myunion/:unionId').params
  const history = useHistory()
  const navList = unionNavList(unionId)
  const [selectedKeys, setSelectedKeys] = useState([navList[0].key || ''])
  const handleSelect = ({ key }) => {
    setSelectedKeys([key])
  }
  const handleBack = () => history.push('/myunion')
  return (
    <Content className={style.root}>
      <div className={style.back}>
        <a onClick={handleBack}>
          <ArrowLeftOutlined />返回
        </a>
      </div>
      <Layout className={style.layout}>
        <Sider width={200} style={{ overflow: 'auto' }}>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            selectedKeys={selectedKeys}
            onSelect={handleSelect}
            theme="light"
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
        <Content className={style.content} style={{ overflow: 'auto' }}>
          {children}
        </Content>
      </Layout>
    </Content>
  )
}

export default UnionNav;