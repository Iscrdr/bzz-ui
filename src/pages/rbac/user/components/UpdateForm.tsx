import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';
import moment from 'moment';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;


export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const config = {
    rules: [{ type: 'object', required: true, message: '请选择日期' }],
  };
  const [formVals, setFormVals] = useState<FormValueType>({
    email: props.values.email,
    userName: props.values.userName,
    nickName: props.values.nickName,
    key: props.values.key,
    workNum: props.values.workNum,
    mobile: props.values.mobile,
    birthDay: props.values.birthDay,
  });



  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;



  

  const renderContent = () => {
     
  
    return (
      <>
        
    
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
        <DatePicker   />
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
          <Input placeholder="请输入"  />
        </FormItem>
        
  
   
      </>
    );
  };

  const renderFooter = () => {
    
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleUpdate(values)}>
          确定
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="用户信息"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          key: formVals.key,
          userName: formVals.userName,
          email: formVals.email,
          workNum: formVals.workNum,
          nickName: formVals.nickName,
          mobile: formVals.mobile,
          birthDay:  moment(formVals.birthDay),
  
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
