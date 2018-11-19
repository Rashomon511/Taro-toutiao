import Taro from '@tarojs/taro'

export default {
  namespace: 'collect',
  state: {
    list: [],
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
  },
};
