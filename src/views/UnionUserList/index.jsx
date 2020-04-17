import React from 'react'
import { Table, Select } from 'antd'
import { matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import request from '../../store/request'

const { Option } = Select

const roles = {
  'super_admin': '超级管理员',
  'admin': '管理员',
  'user': '普通成员'
}

const roleArray = [
  { key: 'admin', label: '管理员' },
  { key: 'user', label: '普通成员' }
]

class UnionUserList extends React.Component {
  state = {
    data: [],
    loading: true,
  }

  componentDidMount() {
    const match = matchPath(window.location.pathname, {
      path: '/myunion/:unionId'
    })
    this.unionId = match.params.unionId
    this.init(this.unionId)
  }

  init = async (unionId = '') => {
    this.setState({
      loading: true
    })
    const result = await request({
      url: `/api/unions/${unionId}/users`,
      method: 'GET'
    })
    if (result.errorCode === 0) {
      const { data } = result
      this.setState({
        data,
        loading: false
      })
    }
  }

  handleChange = async (role, userId) => {
    const result = await request({
      url: '/api/unions/users/role',
      data: {
        role,
        userId,
        unionId: this.unionId
      },
      method: 'POST'
    })
    if (result.errorCode === 0) {
      await this.init(this.unionId)
    }
  }

  render() {
    const { data, loading } = this.state
    const { loginState } = this.props
    const userId = loginState.userInfo.id || ''
    const creator = data[0] ? data[0]._id : ''
    const ifSuper = userId === creator
    const columns = [
      {
        title: '成员ID',
        dataIndex: '_id',
        key: '_id',
        width: '20%'
      },
      {
        title: '成员姓名',
        align: 'center',
        dataIndex: 'name',
        key: 'name',
        width: '16%'
      },
      {
        title: '学生号',
        dataIndex: 'studentNum',
        align: 'center',
        key: 'studentNum',
        width: '16%'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        align: 'center',
        key: 'sex',
        render: sex => <span>{sex === 1 ? '男' : '女'}</span>,
        width: '20%'
      },
      {
        title: '等级',
        dataIndex: 'role',
        key: 'role',
        render: (role, row) => {
          if (ifSuper && role !== 'super_admin')
            return (
              <Select
                value={role}
                style={{ width: '80%' }}
                onChange={() => this.handleChange(role === 'admin' ? 'user' : 'admin', row._id)}
              >
                {
                  roleArray.map((item, index) => (
                    <Option key={index} value={item.key}>{item.label}</Option>
                  ))
                }
              </Select>
            )
          else
            return <span>{roles[role]}</span>
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, row) => {
          if (row.role !== 'super_admin')
            return <a>删除</a>
        }
      }
    ]
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
      />
    )
  }
}
export default connect(
  state => ({
    loginState: state.loginPage
  })
)(UnionUserList)