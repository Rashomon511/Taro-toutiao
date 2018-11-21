import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtIcon} from "taro-ui";
import {connect} from "@tarojs/redux";
import './article.scss'
import action from "../../utils/action";



@connect(({article, loading}) => ({
  ...article,
  isLoad: loading.effects["article/getArticle"],
}))
export default class Search extends Component {
  config = {
    navigationBarTitleText: '问题'
  }
  constructor() {
    super(...arguments)
  }

  componentWillMount = () => {
    this.props.dispatch(action("article/getArticle", '6626224354701083143'))
  };

  goHome = () => {
    Taro.navigateTo({url:`/`});
    this.props.dispatch(action("article/save", {}));
  }
  render () {
    return (
      <View className='article-wrap'>
        <View className='search-head'>
          <AtIcon value='chevron-left' size='24' color='#fff' onClick={this.goHome}></AtIcon>
        </View>
        <View>
          ddd
        </View>
      </View>
    )
  }
}



