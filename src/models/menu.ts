
import { Reducer } from 'redux';
// @ts-ignore
import { Effect } from '@/models/connect';
import { getMenuData } from '@/services/menu'; // 通过后台返回特定的数组json或者mock模拟数据
export interface MenuModelState {
  menuData: any[];
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    fetchMenuData: Effect;
  };
  reducers: {
    save: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',
  state: {
    menuData: [],
  },
  effects: {
    // @ts-ignore
    *fetchMenuData({ payload, callback }, { call, put }) {

      const response = yield call(getMenuData);
      callback(response);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    // });

    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        menuData: action.payload || [],
      };
    },
  },
};
export default MenuModel;
