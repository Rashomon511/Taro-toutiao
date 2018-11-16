import Taro, {Component} from '@tarojs/taro'
import {View, Input,Icon} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import Feed from '../../components/feed/feed'
import action from '../../utils/action'

const nav =  [
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
    ]
@connect(({feeds, loading}) => ({
  ...feeds,
  isLoad: loading.effects["feeds/getNews"],
  isLoadMore: loading.effects["feeds/loadMore"],
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount = () => {
    this.props.dispatch(action("feeds/getNews", '__all__'));
  };

  onPullDownRefresh = () => {
    this.props.dispatch(action("feeds/getNews"));
  };

  onReachBottom = () => {
    this.props.dispatch(action("feeds/loadMore"));
  };

  updateList = () => {
    this.props.dispatch(action("feeds/search",true));
  };
  getOtherNews = (type) => {
    this.props.dispatch(action("feeds/getNews", type));
  }

  render() {
    const {list = [], isLoad, isLoadMore} = this.props;
    return (
      <View>
        <View className='search flex-wrp'>
          <View className='search-left'>
            Taro头条
          </View>
          <View className='search-right'>
            <View className='flex-wrp'>
              <Icon size='16' type='search' className='flex1' />
              <View className='flex6'><Input type='text' placeholder='搜索...' placeholderClass='search-placeholder' /></View>
            </View>
          </View>
        </View>
        <View className='container'>
          {
            list.length ?
              <View>
                <View className='nav-list'>
                  {nav.map(item => <View onClick={this.getOtherNews.bind(this,item.type)}>{item.text}</View>)}
                </View>
                {
                  list.map(item => {
                    return <Feed
                      key={item}
                      title={item.title}
                      mediaName={item.media_name}
                      commentCount={item.comment_count}
                      datetime={item.datetime}
                      item_id={item.item_id}
                      hasImg={item.has_image}
                      imgList={item.image_list}
                      imgUrl={item.image_url}
                    />
                  })
                }
                <View className='load-more'>加载更多。。。</View>
              </View>
              :
              isLoad ? <View>加载中...</View> : <View>没有数据</View>
          }
          {
            isLoadMore && <View>加载中...</View>
          }
        </View>
      </View>
    )
  }
}

