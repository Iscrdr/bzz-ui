import request from '@/utils/request';

export async function getMenuData() {
  return request('/api/oauthservice/getMenuData', {
    method: 'POST',
    data: { userName: 'admin' },
  });
}