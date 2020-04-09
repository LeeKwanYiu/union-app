import React from 'react'
import { Tag, Table, Button, Popconfirm } from 'antd'
import { connect } from 'react-redux'
import types from '../../config/type'

const color = ['magenta', 'orange', 'red', 'volcano', 'blue', 'lime', 'cyan']
const pageSize = 2


class Application extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'APPLICATION_GET',
      payload: {
        currentPage: 1,
        pageSize,
      }
    })
  }

  handleChange = ({ current }) => {
    const { dispatch } = this.props
    dispatch({
      type: 'APPLICATION_GET',
      payload: {
        currentPage: current,
        pageSize,
      }
    })
  }

  confirm = (id, operation, currentPage) => {
    const data = { id, operation }
    const { dispatch } = this.props
    console.log(currentPage)
    dispatch({
      type: 'OPERATION',
      payload: data,
      refresh_payload: {
        currentPage,
        pageSize
      }
    })
  }

  render() {
    const { applicationState } = this.props
    const {
      currentPage,
      pageSize,
      list,
      loading,
      total
    } = applicationState
    const pagination = { pageSize, total, current: currentPage }
    const columns = [
      {
        title: '时间',
        dataIndex: 'createdAt',
        key: 'createdAt'
      },
      {
        title: '申请人ID',
        key: 'creator',
        dataIndex: 'creator'
      },
      {
        title: '申请人名称',
        key: 'name',
        dataIndex: 'name'
      },
      {
        title: '社团名称',
        key: 'unionName',
        dataIndex: 'unionName'
      },
      {
        title: '社团类型',
        dataIndex: 'type',
        key: 'type',
        render: type => {
          return type.map((item, index) => (
            <Tag color={color[index]} key={index}>{types[item].label}</Tag>
          ))
        }
      },
      {
        title: '操作',
        key: 'operation',
        render: row => {
          const { id } = row
          return (
            <span>
              <Popconfirm
                title="确定通过吗"
                onConfirm={() => this.confirm(id, 'pass', currentPage)}
                okText="通过"
                cancelText="取消"
              >
                <a>通过</a>
              </Popconfirm>
              <Popconfirm
                title="审核不通过"
                onConfirm={() => this.confirm(id, 'reject', currentPage)}
                okText="不通过"
                cancelText="取消"
              >
                <Button type="link">不通过</Button>
              </Popconfirm>
            </span>
          )
        }
      }
    ]
    return (
      <Table
        columns={columns}
        dataSource={list}
        pagination={pagination}
        loading={loading}
        onChange={this.handleChange}
      />
    )
  }
}

export default connect(
  state => ({
    applicationState: state.applicationPage
  })
)(Application);