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
    tableName: props.values.tableName,
    comments: props.values.comments,
    className: props.values.className,
    classNameLower: props.values.classNameLower,

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
      title="修改数据库表"
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
          tableName: formVals.tableName,
          comments: formVals.comments,
          className: formVals.className,
          classNameLower: formVals.classNameLower,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
