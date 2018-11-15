import Taro, { Component } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components'
import more from '../../asset/images/more.png'
import './feed.scss'

export default class Feed extends Component {
  navigateTo(url) {
    console.log(url)
    // Taro.navigateTo({url:url})
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
                imgList.length === 0 ? <Image src={imgUrl} className='item-more'></Image> : imgList.map(item => <Image src={item.url} className='item-more'></Image>)
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
