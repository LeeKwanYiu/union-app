import React from 'react'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import request from '../../../store/request'


class AnnexUpload extends React.Component {
  state = {
    fileList: [
      {
        uid: '-1',
        name: 'test.xls',
        status: 'done',
        url: 'http://127.0.0.1:3002/file/5ea1a874dc40f75b24dda1d8-3.14未报平安表.xls',
        // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'yyy.png',
        status: 'error',
      },
    ]
  }

  customRequest = async data => {
    const { taskListState, loginState, dispatch } = this.props
    const { task } = taskListState
    const { userInfo } = loginState
    const { _id } = task
    const formData = new FormData();
    formData.append('file', data.file)
    formData.append('name', userInfo.name)
    const result = await request({
      url: `/api/upload/${_id}`,
      data: formData,
      method: 'POST'
    })
    if (result.errorCode === 0) {
      message.success('上传成功')
      dispatch({
        type: 'GET_TASK',
        params: {
          taskId: _id
        }
      })
    } else
      message.error('上传失败')
  }

  onRemove = async file => {
    const { taskListState, loginState, dispatch } = this.props
    const { task } = taskListState
    const { userInfo } = loginState
    const { _id } = task
    const { uid } = file
    const result = await request({
      url: `/api/tasks/${_id}/files/${uid}`,
      data: { name: userInfo.name },
      method: 'DELETE'
    })
    if (result.errorCode === 0) {
      message.success('删除成功')
      dispatch({
        type: 'GET_TASK',
        params: {
          taskId: _id
        }
      })
    } else
      message.error('删除失败')
  }

  render() {
    const { taskListState } = this.props
    const { task } = taskListState
    const { files = [] } = task
    const props2 = {
      listType: 'picture',
      fileList: files,
      className: 'upload-list-inline',
      customRequest: this.customRequest,
      onRemove: this.onRemove
      // onPreview: file => {
      //   download(file.url, file.name)
      // }
    };
    return (
      <>
        <Upload {...props2}>
          <Button>
            <UploadOutlined /> Upload
          </Button>
        </Upload>
      </>
    )
  }
}

export default connect(
  state => ({
    taskListState: state.taskListPage,
    loginState: state.loginPage
  })
)(AnnexUpload)