import Taro, {Component} from '@tarojs/taro'
import {View,Icon} from '@tarojs/components'
import { AtModal, AtIcon,AtActivityIndicator } from "taro-ui"
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
      isOpened: false,
      newsType: '__all__'
    }
  }

  componentDidMount = () => {
    this.props.dispatch(action("feeds/getNews", '__all__'));
  };

  onPullDownRefresh = () => {
    const { newsType } = this.state;
    this.props.dispatch(action("feeds/getNews", newsType));
  };

  onReachBottom = () => {
    const { newsType } = this.state;
    this.props.dispatch(action("feeds/getMoreNews", newsType));
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

  changeOpen = () => {
    this.setState({
      isOpened: true
    })
  }

  handleClose = () => {
    this.setState({
      isOpened: false
    })
  }

  goSearch = () => {
    Taro.navigateTo({url:`/pages/search/search`})
  }

  render() {
    const {list = [], isLoad, isLoadMore} = this.props;
    const {newsType,isOpened} = this.state;
    return (
      <View className='wrap'>
        <View className='head'>
          <View className='search flex-wrp'>
            <AtIcon value='mail' size='24' color='#fff' onClick={this.changeOpen}></AtIcon>
            <View className='search-left'>
              Taro头条
            </View>
            <View className='search-right' onClick={this.goSearch}>
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
        <View className='container index-container'>
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
                    isLoadMore ? <AtActivityIndicator content='加载中...' mode='center'></AtActivityIndicator> : <View>加载更多。。。</View>
                  }
                </View>
              </View>
              :
              isLoad ? <AtActivityIndicator content='加载中...' mode='center'></AtActivityIndicator> : <View>没有数据</View>
          }
          <AtModal
            isOpened={isOpened}
            title='标题'
            confirmText='确定'
            onClose={this.handleClose}
            onConfirm={this.handleClose}
            content='这个还没做呢！欢迎star该项目'
          />
        </View>
      </View>
    )
  }
}

