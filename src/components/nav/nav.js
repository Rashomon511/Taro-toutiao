import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtIcon} from "taro-ui";
import './nav.scss'

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
export default class Nav extends Component {
  getNews = (type) => {
    this.props.onChangeNew(type)
  }
  render() {
    const {type} = this.props;
    return (
      <View className='nav'>
        <View className='nav-list'>
          {nav.map(item => <View onClick={this.getNews.bind(this,item.type)} className='nav-item'>
            {item.type == type ? <View className='item-active'>{item.text}</View> : item.text}
            </View>)}
        </View>
        <View className='nav-icon'>
          <AtIcon value='add' size='24' color='#d43d3d'></AtIcon>
        </View>
      </View>
    )
  }
}
