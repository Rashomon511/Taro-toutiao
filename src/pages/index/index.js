import Taro, {Component} from '@tarojs/taro'
import {View,Icon} from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import {connect} from '@tarojs/redux'
import './index.scss'
import Feed from '../../components/feed/feed'
import Nav from '../../components/nav/nav'
import action from '../../utils/action'


@connect(({feeds, loading}) => ({
  ...feeds,
  isLoad: loading.effects["feeds/getNews"],
  isLoadMore: loading.effects["feeds/getMoreNews"],
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
  };

  constructor() {
    super(...arguments);
    this.state = {
      newsType: '__all__'
    }
  }

  componentDidMount = () => {
    this.props.dispatch(action("feeds/getNews", '__all__'));
  };

  onPullDownRefresh = () => {
    this.props.dispatch(action("feeds/getNews"));
  };

  onReachBottom = () => {
    this.props.dispatch(action("feeds/getMoreNews"));
  };

  updateList = () => {
    this.props.dispatch(action("feeds/search",true));
  };
  getOtherNews = (type) => {
    this.props.dispatch(action("feeds/getNews", type));
    this.setState({
      newsType: type
    })
  }

  getMoreNews = () => {
    const { newsType } = this.state;
    this.props.dispatch(action("feeds/getMoreNews", newsType));
  }

  render() {
    const {list = [], isLoad, isLoadMore} = this.props;
    const {newsType} = this.state;
    return (
      <View className='wrap'>
        <View className='head'>
          <View className='search flex-wrp'>
            <AtIcon value='mail' size='24' color='#fff'></AtIcon>
            <View className='search-left'>
              Taro头条
            </View>
            <View className='search-right'>
              <View className='flex-wrp'>
                <Icon size='20' type='search' className='icon-search flex1' />
              </View>
            </View>
          </View>
          <Nav
            type={newsType}
            onChangeNew={this.getOtherNews}
          />
        </View>
        <View className='container'>
          {
            list.length ?
              <View>
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
                <View className='load-more' onClick={this.getMoreNews.bind(this)}>
                  {
                    isLoadMore ? <View>加载中...</View> : <View>加载更多。。。</View>
                  }
                </View>
              </View>
              :
              isLoad ? <View>加载中...</View> : <View>没有数据</View>
          }

        </View>
      </View>
    )
  }
}

