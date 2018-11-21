import Taro from '@tarojs/taro'
import request from "../utils/request";
import delay from "../utils/delay";
import action from "../utils/action";

export default {
  namespace: 'article',
  state: {
    article: {},
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        article: payload
      };
    },
  },
  effects: {
    // 获取文章
    *getArticle({payload}, {call, put}) {
      let {data} = yield call(request, {
        url: 'https://m.toutiao.com/i' + payload + '/info/',
        jsonp:true
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("saveMore", data))
    },
  },
};
