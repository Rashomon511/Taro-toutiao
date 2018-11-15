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
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("save", {list: data}))
    },
    // 获取文章
    *getArticle({payload}, {call, put}) {
      let {data} = yield call(request, {
        url: 'https://m.toutiao.com/i' + payload.id + '/info/'
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("saveMore", data))
    },
    * search(_, {all, call, put}) {
      Taro.showLoading({
        title: '搜索中...',
      });
      try {
        let loadPro = yield put(action("load"));
        yield call(() => loadPro);
      } finally {
        Taro.hideLoading();
      }
    },
    //获取更多新闻
    * getMoreNews({payload}, {all, call, put}) {
      // console.log(payload)
      let {data} = yield call(request, {
        url: 'https://m.toutiao.com/list/?tag=' + payload.type + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000)
      });
      console.log(data);
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("save", {list: data}))
    },
    // 获取段子
    *getJokes({payload}, {all, call, put}) {
      // console.log(payload)
      let {data} = yield call(request, {
        url: 'https://www.toutiao.com/api/article/feed/?category=essay_joke&utm_source=toutiao&widen=1&max_behot_time=1500114422&max_behot_time_tmp=1500114422&tadrequire=true&as=A1F52966E9EEF00&cp=59692E6FD0E09E1'
      });
      console.log(data);
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("save", {list: data}))
    },

    // 搜索新闻
    *getSearch({payload}, {all, call, put}) {
      // console.log(payload)
      let {data} = yield call(request, {
        url: 'https://www.toutiao.com/search_content/?offset=' + payload.offset + '&format=json&keyword=' + payload.keyword + '&autoload=true&count=20&cur_tab=1'
      });
      console.log(data);
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("save", {list: data}))
    },

    // 更多搜索
    * getMoreSearch({payload}, {all, call, put}) {
      let {data} = yield call(request, {
        url: 'https://www.toutiao.com/search_content/?offset=' + payload.offset + '&format=json&keyword=' + payload.keyword + '&autoload=true&count=20&cur_tab=1'
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("saveMore", data))
    },

    // 刷新新闻
    *refreshNews({payload}, {all, call, put}) {
      let {data} = yield call(request, {
        url: 'https://m.toutiao.com/list/?tag=' + payload.type + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000),
      });
      yield call(delay, 2000);//增加延迟测试效果
      yield put(action("saveMore", data))
    },
  },
};
