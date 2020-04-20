import React from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import style from './TopPart.less'
import request from '../../../store/request'

class TopPart extends React.Component {
  state = {
    readOnly: true,
  }

  handleEditorChange = (editorContent) => {
    const { dispatch } = this.props
    console.log(editorContent.toHTML())
    dispatch({
      type: 'SET_EDITOR',
      payload: editorContent
    })
  }

  handleClick = async () => {
    const { taskListState, loginState, dispatch } = this.props
    const { editorContent, task, readOnly } = taskListState
    const { id } = loginState.userInfo
    const { _id } = task
    if (readOnly)
      dispatch({
        type: 'SET_READONLY',
        payload: false
      })
    else {
      const result = await request({
        url: `/api/tasks/${_id}`,
        method: 'POST',
        data: {
          detail: editorContent.toHTML(),
          userId: id
        }
      })
      if (result.errorCode === 0) {
        message.success('保存成功')
        dispatch({
          type: 'GET_TASK',
          params: {
            taskId: _id
          }
        })
      }
      else
        message.error('保存失败')
    }
  }

  render() {
    const { taskListState } = this.props
    const { task, editorContent, readOnly } = taskListState
    const { taskName, creator = {}, createdAt = '', updatedAt = '' } = task
    const controls = ['font-size', 'font-family', 'text-color', 'bold', 'italic', 'underline', 'strike-through', 'remove-styles', 'text-align']
    return (
      <>
        <div className={style.title}>
          <i className="iconfont iconBookmark" style={{ marginRight: 2, fontSize: 26 }} />
          {taskName}
        </div>
        <div className={style.description}>
          <span style={{ color: 'var(--color-text1-2,#85909e)' }}>
            {creator.name}创建于{createdAt}，最后更新于{updatedAt}
          </span>
          <Button style={{ float: 'right' }} type={readOnly ? "default" : "primary"} onClick={this.handleClick}>
            {readOnly ? "编辑" : "保存"}
          </Button>
        </div>
        <div className={style.editor}>
          <BraftEditor
            value={editorContent}
            onChange={this.handleEditorChange}
            controls={controls}
            readOnly={readOnly}
          />

        </div>
      </>
    )
  }
}

export default connect(
  state => ({
    taskListState: state.taskListPage,
    loginState: state.loginPage
  })
)(TopPart)