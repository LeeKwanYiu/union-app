import React from 'react'
import { Form, Modal, Input, Select } from 'antd'
import type from '../../../config/type'

const { Option } = Select

const getOptions = users => users.map(item => <Option key={item._id}>{item.name}</Option>)

const CreateTaskModal = ({ visible, onCreate, onCancel, users }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const handleChange = value => {
    form.setFieldsValue({
      userId: value
    })
  }
  const children = getOptions(users)
  return (
    <Modal
      visible={visible}
      title="新建任务"
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
        {...layout}
        name="form_in_modal"
        initialValues={{ introduction: '' }}
      >
        <Form.Item
          name="taskName"
          label="任务名称"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="指派人"
          name="userId"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select
            style={{ width: '100%' }}
            placeholder="选择指派人"
            onChange={handleChange}
          >
            {children}
          </Select>,
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;

