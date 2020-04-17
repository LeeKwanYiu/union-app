import React from 'react'
import { Table, Button, message, Popconfirm } from 'antd'
import { matchPath } from 'react-router-dom'
import request from '../../store/request'

const moment = require('moment')

class UnionApplication extends React.Component {
  state = {
    data: []
  }

  componentDidMount() {
    const match = matchPath(window.location.pathname, {
      path: '/myunion/:unionId'
    })
    this.unionId = match.params.unionId
    this.init(this.unionId)
  }

  init = async (unionId = '') => {
    const result = await request({
      url: `/api/unions/${unionId}/application`,
      method: 'GET'
    })
    if (result.errorCode === 0) {
      const { data } = result
      this.setState({
        data,
      })
    }
  }

  confirm = async params => {
    const { _id, operation } = params
    const result = await request({
      url: `/api/unions/${this.unionId}/application/${_id}?operation=${operation}`,
      method: 'DELETE'
    })
    if (result.errorCode === 0)
      message.success('操作成功')
    else
      message.error('操作不成功')
    this.init(this.unionId)
  }

  render() {
    const { data } = this.state
    const columns = [
      {
        title: '申请时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
      {
        title: '申请ID',
        dataIndex: '_id',
        key: 'id'
      },
      {
        title: '申请人',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '申请人ID',
        dataIndex: 'userId',
        key: 'userId'
      },
      {
        title: '操作',
        key: 'operation',
        render: row => {
          const { _id } = row
          return (
            <span>
              <Popconfirm
                title="确定通过吗"
                onConfirm={() => this.confirm({ _id, operation: 'pass' })}
                okText="通过"
                cancelText="取消"
              >
                <a>通过</a>
              </Popconfirm>
              <Popconfirm
                title="审核不通过"
                onConfirm={() => this.confirm({ _id, operation: 'reject' })}
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
      <>
        <div style={{ margin: '10px 0', overflow: 'hidden' }}>
          <Button type="danger" style={{ float: "right" }}>全部删除</Button>
          <Button type="primary" style={{ float: "right", marginRight: 10 }}>全部通过</Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </>
    )
  }
}

export default UnionApplication;