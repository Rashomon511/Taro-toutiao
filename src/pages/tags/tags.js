import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import {connect} from "@tarojs/redux";
import {AtIcon} from "taro-ui";
import './tags.scss'
import action from "../../utils/action";


@connect(({tags}) => ({
  ...tags,
}))
export default class Search extends Component {
  config = {
    navigationBarTitleText: '问题'
  }
  constructor() {
    super(...arguments)
  }
  goHome = () => {
    Taro.navigateTo({url:`/`});
  }
  deleteTags = (type) => {
    const {tags, otherTags} = this.props;
    const newData = tags.filter(item => item.type === type);
    otherTags.push(...newData);
    this.props.dispatch(action("tags/save", tags.filter(item => item.type !== type)))
    this.props.dispatch(action("tags/saveOther", otherTags))
  }

  addTags = (type) => {
    const {tags, otherTags} = this.props;
    const newData = otherTags.filter(item => item.type === type);
    tags.push(...newData);
    this.props.dispatch(action("tags/save", tags))
    this.props.dispatch(action("tags/saveOther", otherTags.filter(item => item.type !== type)))
  }
  render () {
    const {tags, otherTags} = this.props;
    return (
      <View className='tags-wrap'>
        <View className='tags-head'>
          <AtIcon value='chevron-left' size='24' color='#fff' onClick={this.goHome}></AtIcon>
          <Text className='tags-title'>频道管理</Text>
        </View>
        <View className='tags-content'>
          <View className='tags-text'>点击删除以下频道</View>
          <View className='tags-list'>
            {tags.map(item => <View onClick={this.deleteTags.bind(this,item.type)} className='tag-item'>{item.text}</View>)}
          </View>
        </View>
        <View className='tags-content'>
          <View className='tags-text'>点击增加以下频道</View>
          <View className='tags-list'>
            {otherTags.map(item => <View onClick={this.addTags.bind(this,item.type)} className='tag-item'>{item.text}</View>)}
          </View>
        </View>
      </View>
    )
  }
}



