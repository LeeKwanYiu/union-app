import React from 'react'
import { Timeline } from 'antd'
import { connect } from 'react-redux'

const NoteItem = ({ detail, time }) => (
  <div>
    <span>{detail}</span>
    <span style={{ float: 'right', color: '#a1a1a1' }}>{time}</span>
  </div>
)

const Note = ({ taskListState = {} }) => {
  const { task } = taskListState
  const { message = [] } = task
  return (
    <Timeline mode="left">
      {
        message.map((item, index) => (
          <Timeline.Item key={index}>
            <NoteItem detail={item.detail} time={item.time} />
          </Timeline.Item>
        ))
      }
    </Timeline>
  )
}

export default connect(
  state => ({
    taskListState: state.taskListPage
  })
)(Note)