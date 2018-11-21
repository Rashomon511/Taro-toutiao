import Taro, { Component } from '@tarojs/taro'
import { View,Input } from '@tarojs/components'
import {connect} from "@tarojs/redux"
import {AtActivityIndicator, AtIcon} from "taro-ui";
import './search.scss'
import action from "../../utils/action";
import Feed from "../../components/feed/feed";


@connect(({search, loading}) => ({
  ...search,
  isLoad: loading.effects["search/getSearch"],
  isLoadMore: loading.effects["search/getMoreSearch"],
}))
export default class Search extends Component {
  config = {
    navigationBarTitleText: '搜索'
  }
  constructor() {
    super(...arguments);
    this.state = {
      value: '',
    }
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  goHome = () => {
    Taro.navigateTo({url:`/`});
    this.props.dispatch(action("search/save", []));
  }

  searchNews = () => {
    const {value} = this.state;
    this.props.dispatch(action("search/getSearch", value));
  }
  getMoreSearch = () => {
    const {value} = this.state;
    this.props.dispatch(action("search/getMoreSearch", value));
  }
  render () {
    const {list = [], isLoad, isLoadMore} = this.props;
    return (
        <View className='wrap'>
          <View className='search-head'>
            <AtIcon value='chevron-left' size='24' color='#fff' onClick={this.goHome}></AtIcon>
            <Input type='text' placeholder='请输入关键字' placeholderClass='search-placeholder' onChange={this.onChange} />
            <View className='search-button' onClick={this.searchNews}>搜索</View>
          </View>
          <View className='container search-container'>
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
                  <View className='load-more' onClick={this.getMoreSearch.bind(this)}>
                    {
                      isLoadMore ? <AtActivityIndicator content='加载中...' mode='center'></AtActivityIndicator> : <View>加载更多。。。</View>
                    }
                  </View>
                </View>
                :
                isLoad ? <AtActivityIndicator content='加载中...' mode='center'></AtActivityIndicator> : <View>没有数据</View>
            }
          </View>
        </View>
    )
  }
}



