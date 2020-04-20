import React from 'react'
import { connect } from 'react-redux'
import { Form, Select, message } from 'antd'
import stateLabel from '../stateLabel'
import request from '../../../store/request'

const { Option } = Select

class RightPart extends React.Component {
  state = {
    taskState: this.props.task.taskState,
    _id: this.props.task._id
  }

  // 当传入的task不同时更新taskState，为受控组件使用
  // static getDerivedStateFromProps(nextProps, preState) {
  //   const { task } = nextProps
  //   if (task._id !== preState._id) {
  //     return {
  //       taskState: task.taskState,
  //       _id: task._id
  //     }
  //   }
  //   return null;
  // }

  // 选中
  handleSelect = async value => {
    const { loginState, dispatch } = this.props
    const { id } = loginState.userInfo
    const { _id = '' } = this.props.task
    const result = await request({
      url: `/api/tasks/${_id}`,
      method: 'POST',
      data: {
        taskState: value,
        userId: id
      }
    })
    if (result.errorCode === 0) {
      message.success('更改状态成功')
      dispatch({
        type: 'GET_TASK',
        params: {
          taskId: _id
        }
      })
    }
    else
      message.error('更改状态失败')
  }

  // 下拉时触发
  handleDropDown = open => {
    if (open !== undefined)
      message.error('暂无编辑权限')
  }

  render() {
    const { _id, open, user = {}, creator = {}, createdAt, updatedAt, taskState } = this.props.task
    return (
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 17, offset: 1 }}
      >
        <Form.Item label="ID">
          {_id}
        </Form.Item>
        <Form.Item label="状态">
          <Select
            value={taskState}
            style={{ width: '100%' }}
            onDropdownVisibleChange={() => this.handleDropDown(open)} open={open}
            onSelect={this.handleSelect}
          >
            {
              stateLabel.map((item, index) =>
                <Option key={index} value={index}>{item}</Option>
              )
            }
          </Select>
        </Form.Item>
        <Form.Item label="指派给">
          {user.name}
        </Form.Item>
        <Form.Item label="创建者">
          {creator.name}
        </Form.Item>
        <Form.Item label="创建时间">
          {createdAt}
        </Form.Item>
        <Form.Item label="更新时间">
          {updatedAt}
        </Form.Item>
      </Form>
    )
  }
}

export default connect(
  state => ({
    loginState: state.loginPage,
    taskListState: state.taskListPage,
  })
)(RightPart)