import Taro from '@tarojs/taro'

export default {
  namespace: 'tags',
  state: {
    tags: [
      {url: '/home', type: '__all__', text: '推荐'},
      {url: '/home', type: 'news_hot', text: '热点'},
      {url: '/home', type: 'news_society', text: '社会'},
      {url: '/home', type: 'news_entertainment', text: '娱乐'},
      {url: '/home', type: 'news_tech', text: '科技'},
      {url: '/home', type: 'news_car', text: '汽车'},
      {url: '/home', type: 'news_sports', text: '体育'},
      {url: '/home', type: 'news_finance', text: '财经'},
      {url: '/home', type: 'news_military', text: '军事'},
      {url: '/home', type: 'news_world', text: '国际'},
      {url: '/home', type: 'news_fashion', text: '时尚'}
    ],
    otherTags: [
      {url: '/home', type: 'news_game', text: '游戏'},
      {url: '/home', type: 'news_travel', text: '旅游'},
      {url: '/home', type: 'news_history', text: '历史'},
      {url: '/home', type: 'news_discovery', text: '探索'},
      {url: '/home', type: 'news_food', text: '美食'},
      {url: '/home', type: 'news_baby', text: '育儿'},
      {url: '/home', type: 'news_regimen', text: '养生'},
      {url: '/home', type: 'news_story', text: '故事'},
      {url: '/home', type: 'news_essay', text: '美文'},
    ]
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        tags: payload
      };
    },
    saveOther(state, {payload}) {
      return {
        ...state,
        otherTags: payload
      };
    },
  },
  effects: {
  },
};
