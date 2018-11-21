import Taro from '@tarojs/taro'
import request from "../utils/request";
import delay from "../utils/delay";
import action from "../utils/action";

export default {
  namespace: 'search',
  state: {
    list: [],
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        list: payload
      };
    },
  },
  effects: {
    // 搜索新闻
    *getSearch({payload}, { call, put}) {
      let {data} = yield call(request, {
        url: 'https://www.toutiao.com/search_content/?offset=' + payload.offset + '&format=json&keyword=' + payload + '&autoload=true&count=20&cur_tab=1',
        jsonp:true
      });
      yield call(delay, 200);//增加延迟测试效果
      yield put(action("save", data))
    },
    // 更多搜索
    * getMoreSearch({payload}, { call, put,select}) {
      let list = yield select(state => state.search.list);
      let {data} = yield call(request, {
        url: 'https://www.toutiao.com/search_content/?offset=' + payload.offset + '&format=json&keyword=' + payload.keyword + '&autoload=true&count=20&cur_tab=1',
        jsonp:true
      });
      list.push(...data);
      yield call(delay, 200);//增加延迟测试效果
      yield put(action("save", list))
    },
  },
};
