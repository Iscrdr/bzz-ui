import React from 'react';
import { Form, Input, Select, Modal, DatePicker } from 'antd';

const FormItem = Form.Item;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const config = {
    rules: [{ type: 'object', required: true, message: '请选择日期' }],
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };


  
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option  value="86" selected >+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <Modal
      destroyOnClose
      title="新建用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
      <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="邮箱"
          name="email"
          rules={[
            {
              type: 'email',
              message: '不是正确的邮箱',
            },
            {
              required: true,
              message: '请输入您的邮箱！',
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="用户名"
          name="userName"
          rules={[{ required: true, message: '请输入至少2个字符的用户名！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem >
          
        <Form.Item
         labelCol={{ span: 5 }}
         wrapperCol={{ span: 15 }}
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
       labelCol={{ span: 5 }}
       wrapperCol={{ span: 15 }}
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请在输入一次密码',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('两次输入的密码不匹配！');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item   
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="生日"
          name="birthDay"
           {...config}>
        <DatePicker />
      </Form.Item>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: '请输入至少2个字符的昵称！', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="工号"
          name="workNum"
          rules={[{ required: true, message: '请输入工号', min: 2 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="手机号"
          name="mobile"
          rules={[{ required: true, message: '请输入手机号！' }]}
        >
          <Input placeholder="请输入" addonBefore={prefixSelector} style={{ width: '100%' }} />
        </FormItem>
        
      </Form>
    </Modal>
  );
};

export default CreateForm;
