import React from 'react'
import { Menu, Dropdown, Avatar, Drawer, List, Typography, Button, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import request from '../../store/request'

class UserAvatar extends React.Component {
  state = {
    msgVisible: false
  }

  componentDidMount() {

  }


  handlelogout = () => {
    const { history } = this.props
    localStorage.removeItem('token')
    history.push('/login')
  };

  showDrawer = () => {
    this.setState({
      msgVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      msgVisible: false,
    });
  };

  handleClick = ({ key }) => {
    switch (key) {
      case 'logout':
        this.handlelogout()
        break;
      case 'message':
        this.showDrawer()
        break;
      default:
        break;
    }
  };

  handleRead = async () => {
    const { dispatch } = this.props
    await request({
      url: '/api/user/message',
      method: 'DELETE'
    })
    dispatch({
      type: 'GET_USER_INFO'
    })
  }

  render() {
    const { loginState } = this.props
    const { userInfo } = loginState
    const { msgVisible } = this.state
    const { message = [], name = '' } = userInfo
    const msgCount = message.length
    const menu = (
      <Menu onClick={this.handleClick}>
        <div style={{ padding: '0px 12px' }}>
          <span>{name}</span>
        </div>
        <Menu.Divider />
        {
          userInfo.role === 'user' && (
            <Menu.Item key="message">
              <Badge count={msgCount} offset={[3, -3]}>
                消息通知
              </Badge>
            </Menu.Item>
          )
        }
        <Menu.Item key="user">
          个人信息
        </Menu.Item>
        <Menu.Item key="logout">
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <Dropdown overlay={menu}>
          <Badge dot={msgCount > 0} offset={[0, 3]}>
            <Avatar shape="square" size={64} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Badge>
        </Dropdown>
        <Drawer
          title="消息通知"
          onClose={this.onClose}
          visible={msgVisible}
          placement="left"
          width="400"
        >
          <Button type="primary" size="small" onClick={this.handleRead} disabled={msgCount === 0}>已读</Button>
          <List
            dataSource={message}
            renderItem={item => (
              <List.Item>
                <Typography.Text mark>{item.createdAt}</Typography.Text> {item.detail}
              </List.Item>
            )}
          />
        </Drawer>
      </>
    )
  }
}

export default connect(
  state => ({
    loginState: state.loginPage
  })
)(withRouter(UserAvatar))