import Taro, {Component} from '@tarojs/taro'
import {View, Input, Image,Icon} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './index.scss'
import Feed from '../../components/feed/feed'
import searchPng from '../../asset/images/search.png'
import lightingPng from '../../asset/images/lighting.png'

import action from '../../utils/action'

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

  render() {
    const {list = [], isLoad, isLoadMore} = this.props;
    return (
      <View>
        <View className='search flex-wrp'>
          <View className='search-left'>
            泰罗头条
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
                  feed_source_img={item.feed_source_img}
                  feed_source_name={item.feed_source_name}
                  feed_source_txt={item.feed_source_txt}
                  question={item.question}
                  answer_ctnt={item.answer_ctnt}
                  good_num={item.good_num}
                  comment_num={item.comment_num}
                />
              }) :
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

