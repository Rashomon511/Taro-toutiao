import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './tags.scss'

export default class Search extends Component {
  config = {
    navigationBarTitleText: '问题'
  }
  constructor() {
    super(...arguments)
  }
  navigateTo(url) {
    Taro.navigateTo({url:url})
  }
  render () {
    return (
      <View>
        tags
      </View>
    )
  }
}



