import React from 'react'
import { Table, message, Select } from 'antd'
import { matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import request from '../../store/request'
import CreateTaskModal from './components/CreateTaskModal'

const stateLabel = ['未处理', '审核中', '已完成']

const { Option } = Select

class TaskList extends React.Component {
  state = {
    data: [],
    users: [],
    admins: [],
    visible: false,
    open: false
  }

  async componentDidMount() {
    const match = matchPath(window.location.pathname, {
      path: '/myunion/:unionId/projects/:projectId'
    })
    this.unionId = match.params.unionId
    this.projectId = match.params.projectId
    await this.getUserList()
    setTimeout(this.init, 0)
  }

  // 获取用户
  getUserList = async () => {
    const result = await request({
      url: `/api/unions/${this.unionId}/users`,
      method: 'GET'
    })
    if (result.errorCode === 0) {
      const { data } = result
      this.setState({
        users: data.filter(v => v.role === 'user'),
        admins: data.filter(v => v.role === 'admin' || v.role === 'super_admin')
      })
    }
  }

  init = async () => {
    const { loginState } = this.props
    console.log(loginState)
    const { id } = loginState.userInfo
    const { admins } = this.state
    const result = await request({
      url: `/api/projects/${this.projectId}`,
      method: 'GET'
    })
    if (result.errorCode === 0) {
      const { data } = result
      console.log(admins.find(v => v._id === id), admins, id)
      data.forEach((item, index) => {
        if (item.user.id === id || admins.find(v => v._id === id))
          data[index].open = undefined
        else
          data[index].open = false
      })
      this.setState({
        data,
      })
    }
  }


  onCreate = async values => {
    const { loginState } = this.props
    const result = await request({
      url: '/api/tasks',
      data: {
        ...values,
        creatorId: loginState.userInfo.id,
        projectId: this.projectId
      },
      method: 'POST'
    })
    if (result.errorCode === 0) {
      message.success('新建成功')
      await this.init()
    }
    else {
      message.error('新建失败')
    }
    this.setState({
      visible: false
    })
  }

  handleDropDown = open => {
    if (open !== undefined)
      message.error('暂无编辑权限')
  }

  render() {
    const { data, users, visible } = this.state
    const columns = [
      {
        title: '任务ID',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName'
      },
      {
        title: '创建者',
        dataIndex: 'creator',
        key: 'creator',
        render: creator => <span>{creator.name}</span>
      },
      {
        title: '指派者',
        dataIndex: 'user',
        key: 'user',
        render: user => <span>{user.name}</span>
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
        title: '状态',
        dataIndex: 'taskState',
        key: 'taskState',
        render: (state, row) =>
          <Select value={state} style={{ width: '100%' }} onDropdownVisibleChange={() => this.handleDropDown(row.open)} open={row.open}>
            {
              stateLabel.map((item, index) =>
                <Option key={index} value={index}>{item}</Option>
              )
            }
          </Select>
      },
      {
        title: '操作',
        key: 'operation',
        render: () => (
          <a>查看详情</a>
        )
      }
    ]
    return (
      <>
        <div style={{ overflow: 'hidden', marginBottom: 20 }}>
          <a style={{ float: 'right', marginRight: 10 }} onClick={() => this.setState({ visible: true })}>+创建任务</a>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <CreateTaskModal
          visible={visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
          users={users}
        />
      </>
    )
  }
}


export default connect(
  state => ({
    loginState: state.loginPage
  })
)(TaskList)