import Taro from '@tarojs/taro'
import action from "../utils/action";
import request from "../utils/request";
import delay from "../utils/delay";

export default {
  namespace: 'feeds',
  state: {
    list: [],
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
    saveMore(state, {payload: list}) {
      return {...state, list: [...state.list, ...list]};
    },
  },
  effects: {
    // 获取新闻
    * getNews({payload}, {call, put}) {
      let {data} = yield call(request, {
        url: 'https://m.toutiao.com/list/?tag=' + payload + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000),
        jsonp:true
      });
      yield call(delay, 200);//增加延迟测试效果
      yield put(action("save", {list: data}))
    },
    //获取更多新闻
    * getMoreNews({payload}, {call, put, select}) {
      let list = yield select(state => state.feeds.list);
      let {data} = yield call(request, {
        url: 'https://m.toutiao.com/list/?tag=' + payload + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000),
        jsonp:true
      });
      list.push(...data)
      yield call(delay, 200);//增加延迟测试效果
      yield put(action("save", {list: list}))
    },

    // 刷新新闻
    *refreshNews({payload}, {call, put}) {
      let {data} = yield call(request, {
        url: 'https://m.toutiao.com/list/?tag=' + payload.type + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000),
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("saveMore", data))
    },
  },
};
