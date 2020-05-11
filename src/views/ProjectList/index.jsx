import React from 'react'
import { Table, Button, Form, Select, Input, message } from 'antd'
import { matchPath } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import request from '../../store/request'
import CreateModal from './components/CreateModal'

const moment = require('moment')
const { Option } = Select

class ProjectList extends React.Component {
  formRef = React.createRef();

  state = {
    data: [],
    visible: false
  }

  componentDidMount() {
    const match = matchPath(window.location.pathname, {
      path: '/myunion/:unionId'
    })
    this.unionId = match.params.unionId
    this.init(this.unionId)
  }

  init = async (unionId = '', query = { year: 'all', name: '' }) => {
    const result = await request({
      url: `/api/unions/${unionId}/projects?name=${query.name}&&year=${query.year}`,
      method: 'GET'
    })
    if (result.errorCode === 0) {
      const { data } = result
      this.setState({
        data,
      })
    }
  }

  onFinish = values => {
    this.init(this.unionId, values)
  }

  handleSelectChange = value => {
    this.formRef.current.setFieldsValue({
      year: value
    });
  }

  onEnter = ({ _id }) => {
    const { history } = this.props
    const { location } = history
    history.push(`${location.pathname}/${_id}`)
  }

  onCreate = async values => {
    const { loginState } = this.props
    const { userInfo } = loginState
    const { id } = userInfo
    const data = {
      ...values,
      unionId: this.unionId,
      creator: id
    }
    const result = await request({
      url: '/api/project',
      method: 'POST',
      data
    })
    if (result.errorCode === 0) {
      message.success('添加成功')
      this.setState({
        visible: false
      })
      await this.init(this.unionId)
    }
    else
      message.error('添加失败')
  }

  render() {
    const { data, visible } = this.state
    const { history } = this.props
    const columns = [
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
      {
        title: '项目ID',
        dataIndex: '_id',
        key: 'id'
      },
      {
        title: '项目名称',
        align: 'center',
        dataIndex: 'projectName',
        key: 'projectName'
      },
      {
        title: '任务数',
        align: 'center',
        dataIndex: 'taskNum',
        key: 'taskNum'
      },
      {
        key: 'operation',
        render: (_, row) => <a onClick={() => this.onEnter(row)}>点击进入</a>
      }
    ]
    return (
      <>
        <Form layout="inline" onFinish={this.onFinish} ref={this.formRef} initialValues={{ name: '', year: 'all' }}>
          <Form.Item name="name">
            <Input placeholder="输入项目名称" />
          </Form.Item>
          <Form.Item name="year" style={{ width: '10%', minWidth: 80 }}>
            <Select defaultValue="all" onChange={this.handleSelectChange}>
              <Option value="all">全部</Option>
              <Option value={2020}>2020</Option>
              <Option value={2019}>2019</Option>
              <Option value={2018}>2018</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => this.setState({ visible: true })}>添加</Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ marginTop: 20 }}
        />
        <CreateModal
          visible={visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
        />
      </>
    )
  }
}

export default connect(
  state => ({
    loginState: state.loginPage
  })
)(withRouter(ProjectList));