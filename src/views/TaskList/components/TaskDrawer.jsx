import React from 'react'
import { Drawer, Row, Col } from 'antd'
import style from './TaskDrawer.less'
import RightPart from './RightPart'
import BottomPart from './BottomPart'
import TopPart from './TopPart'
import { connect } from 'react-redux'

class TaskDrawer extends React.Component {
  componentDidMount() {

  }

  render() {
    const { visible, onClose, taskListState } = this.props
    const { task } = taskListState
    return (
      <Drawer placement="right" onClose={onClose} visible={visible} width={1130} title="TEXT" className={style.root}>
        <Row>
          <Col span={18} className="left">
            <div className="top">
              <TopPart />
            </div>
            <div className="bottom">
              <BottomPart taskId={task._id} />
            </div>
          </Col>
          <Col span={6} className={style.right}>
            <RightPart task={task} />
          </Col>
        </Row>
      </Drawer>
    )
  }
}

export default connect(
  state => ({
    taskListState: state.taskListPage
  })
)(TaskDrawer)