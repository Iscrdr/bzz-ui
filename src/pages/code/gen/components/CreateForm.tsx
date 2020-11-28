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




  return (
    <Modal
      destroyOnClose
      title="创建数据库表"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
      <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="表名"
          name="tableName"

        >
          <Input placeholder="表名" />
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="注释"
          name="comments"
          rules={[{ required: true, message: '请输入至少5个字符的注释！', min: 5 }]}
        >
          <Input placeholder="请输入表说明" />
        </FormItem >

        <Form.Item
         labelCol={{ span: 5 }}
         wrapperCol={{ span: 15 }}
        name="className"
        label="类名"


      >
          <Input placeholder="请输入类名" />
      </Form.Item>

      <Form.Item
       labelCol={{ span: 5 }}
       wrapperCol={{ span: 15 }}
        name="classNameLower"
        label="首字母小写"
      >
        <Input placeholder="类名首字母小写" />
      </Form.Item>

      </Form>
    </Modal>
  );
};

export default CreateForm;
