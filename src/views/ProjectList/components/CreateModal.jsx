import React from 'react'
import { Form, Modal, Input } from 'antd'

const CreateModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="创建项目"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="form_in_modal"
        initialValues={{ projectName: null }}
      >
        <Form.Item
          name="projectName"
          label="项目名称"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection'
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateModal;