import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {connect} from "@tarojs/redux";
import {AtIcon} from "taro-ui";
import './nav.scss'


@connect(({tags}) => ({
  ...tags,
}))
export default class Nav extends Component {
  getNews = (type) => {
    this.props.onChangeNew(type)
  }

  goTags = () => {
    Taro.navigateTo({url:`/pages/tags/tags`});
  }
  render() {
    const {type, tags} = this.props;
    return (
      <View className='nav'>
        <View className='nav-list'>
          {tags.map(item => <View onClick={this.getNews.bind(this,item.type)} className='nav-item'>
            {item.type == type ? <View className='item-active'>{item.text}</View> : item.text}
            </View>)}
        </View>
        <View className='nav-icon'>
          <AtIcon value='add' size='24' color='#d43d3d' onClick={this.goTags}></AtIcon>
        </View>
      </View>
    )
  }
}
