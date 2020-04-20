import React, { useState } from 'react'
import { Menu, Layout } from 'antd'
import Note from './Note'

const { Header, Content } = Layout

const BottomPart = ({ taskId }) => {
  const [key, setKey] = useState(['annex'])
  const handleClick = e => setKey([e.key])
  return (
    <Layout style={{ height: '100%', background: '#fff' }}>
      <Header style={{ background: '#fff' }}>
        <Menu onClick={handleClick} selectedKeys={key} mode="horizontal" style={{ lineHeight: '64px' }}>
          <Menu.Item key="annex">
            相关附件
          </Menu.Item>
          <Menu.Item key="note">
            操作记录
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ height: '100%!important', padding: 30 }}>
        {
          key[0] === 'annex' ? (
            1
          ) : (
              <Note taskId={taskId} />
            )
        }
      </Content>
    </Layout>
  )
}

export default BottomPart;