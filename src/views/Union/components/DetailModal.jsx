import React from 'react'
import { Modal, Form } from 'antd'

class DetailModal extends React.Component {
  render() {
    const { visible, union, handleOk, handleCancel, okText } = this.props
    const { unionName, introduction } = union
    return (
      <Modal
        title="社团详情"
        onCancel={handleCancel}
        onOk={handleOk}
        visible={visible}
        okText={okText}
        cancelText="取消"
      >
        <Form>
          <Form.Item label="社团名称">
            {unionName}
          </Form.Item>
          <Form.Item label="社团简介">
            {introduction}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default DetailModal