import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import './feed.scss'

export default class Feed extends Component {
  navigateTo(id) {
    Taro.navigateTo({url:`/content/${id}`})
  }
  render() {
    const { title, mediaName, commentCount, datetime, item_id,imgList, hasImg,imgUrl } = this.props;
    return (
      <View className='feed-item'>
        <View className='feed-source' onClick={this.navigateTo.bind(this,item_id)}>
          <View className='feed-title'>{title}</View>
          {
            hasImg &&
            <View className='feed-img'>
              {
                imgList.length === 0 ? <Image src={imgUrl}></Image> : imgList.map(item => <Image src={item.url}></Image>)
              }
            </View>
          }
          <View className='feed-info'>
            <View className='media-count'>
              <View className='media-name'>{mediaName}</View>
              <View className='comment-count'>评论{commentCount}</View>
            </View>
            <View className='data-time'>{datetime}</View>
          </View>
        </View>
      </View>
    )
  }
}
