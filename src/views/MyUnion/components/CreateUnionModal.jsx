import React from 'react'
import { Form, Modal, Input, Select } from 'antd'
import type from '../../../config/type'

const { Option } = Select
const { TextArea } = Input;

const children = []
for (const key in type) {
  const label = type[key].label
  children.push(<Option key={key}>{label}</Option>)
}

const CreateUnionModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const handleChange = value => {
    form.setFieldsValue({
      type: value
    })
  }
  return (
    <Modal
      visible={visible}
      title="新建社团"
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
          name="unionName"
          label="社团名称"
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
          label="类型"
          name="type"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="选择社团"
            onChange={handleChange}
          >
            {children}
          </Select>,
        </Form.Item>
        <Form.Item
          name="introduction"
          label="介绍"
        >
          <TextArea row={10} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUnionModal;

