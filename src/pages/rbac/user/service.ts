import request from 'umi-request';
import { TableListParams,TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {

  const page = {};
  if(params?.hasOwnProperty("pageSize")){
    page['pageSize'] = params?.pageSize;
  }
  if(params?.hasOwnProperty("current")){
    page['current'] = params?.current;
  }

  if(params?.hasOwnProperty("createTime")){
    const  createTime = params?.createTime;
    params['beginTime'] = createTime[0];
    params['endTime'] = createTime[1];

  }

  delete params?.createTime;
  delete params?.pageSize;
  delete params?.current;

  console.info("page:"+JSON.stringify(page)+",sysUser:"+JSON.stringify(params));

  return request('/api/rbacservice/rbac/user/list',{
  method: 'POST',
  data: {
    page:page,
    baseEntity:params
  },
});
}

export async function removeRule(params:  number[] ) {
  // params['id'] = params?.key;
  // delete params?.key;
  
  
console.log("key :"+ JSON.stringify(params));
  return request('/api/rbacservice/rbac/user/delete', {
    method: 'POST',
    data:  params,
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/rbacservice/rbac/user/add', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function updateRule(params: TableListItem) {
  delete params?.userid;
  console.log("update params:"+JSON.stringify(params))
  return request('/api/rbacservice/rbac/user/update', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function checkRule(params: TableListItem) {
  console.log("params:"+JSON.stringify(params))
  return request('/api/rbacservice/rbac/user/checkrule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}