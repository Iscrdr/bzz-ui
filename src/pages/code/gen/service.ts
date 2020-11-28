import request from 'umi-request';
import { TableListParams,TableListItem } from './data.d';

export async function queryRule(params: TableListParams) {


  return request(`/api/codegen/codegen/code/table?tableName=sys_user`,{
    method: 'GET',

  });
}

export async function removeRule(params:  number[] ) {
  // params['id'] = params?.key;
  // delete params?.key;


console.log(`key :${ JSON.stringify(params)}`);
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function updateRule(params: TableListItem) {
  const promise = request('/api/rbacservice/rbac/user/update');
  return [];
}

export async function checkRule(params: TableListItem) {

  return request('/api/rbacservice/rbac/user/checkrule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
