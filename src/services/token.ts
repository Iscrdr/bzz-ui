import request from '@/utils/request';
export interface TokenParamsType {
  ref: string;
}

export async function getMenuData(params: MenuParamsType) {
  return request('/api/oauthservice/getMenuData', {
    method: 'POST',
    data: { userName: 'admin' },
  });
}

export default token;