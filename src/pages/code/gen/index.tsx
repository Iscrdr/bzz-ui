import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';

import Space from "antd/lib/space";

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  console.log("fields:"+JSON.stringify(fields))

  const hide = message.loading('正在添加');
  try {
    await addRule(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {

  const hide = message.loading('正在修改');
  try {
    await updateRule(fields);
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {

  console.log("selectedRows:"+selectedRows);

  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
     await removeRule({
       ids: selectedRows.map((row) => row.id),
     });


    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
const timeSorter = (a:Date,b:Date) =>{
  let aTime = new Date(a).getTime();
  let bTime = new Date(b).getTime();
  return aTime - bTime;
}
const settingTable = (fields: FormValueType)=>{

  return;

}
const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  // @ts-ignore
  const columns: ProColumns<TableListItem>[] = [

    {
      title: '表名',
      dataIndex: 'tableName',
      sorter: (a, b) => a.tableName.length - b.tableName.length,
    },
    {
      title: '注释',
      search:false,
      dataIndex: 'comments',
    },
    {
      title: '类名',
      search:false,
      dataIndex: 'className',
    },
    {
      title: '类名首字母小写',
      search:false,
      dataIndex: 'classNameLower',
      sorter: (a, b) => a.classNameLower - b.classNameLower,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>

          <Space size="middle">
            <a
              onClick={() => {

                settingTable(record);
              }}
            >
              配置
            </a>
            <a
              onClick={() => {
                handleUpdateModalVisible(true);
                setStepFormValues(record);
              }}
            >
              修改
            </a>
            <a
              onClick={() => {
                const keys = [];
                keys.push(record);
                handleRemove(keys);
              }}
            >
              删除
            </a>
          </Space>


        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="数据库表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button key="show" icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          <Button key="show" icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
          导入
        </Button>,
        <Button  key="show" icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
        导出
      </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项 &nbsp;&nbsp;
            {/* <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span> */}
          </div>
        )}
        request={(params) => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }else{

          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
