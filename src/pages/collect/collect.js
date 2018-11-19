import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import {connect} from "@tarojs/redux";
import collect from '../../asset/collect.json'
import Feed from '../../components/feed/feed'
import action from "../../utils/action";
import './collect.scss'

@connect(({collect, loading}) => ({
  ...collect,
  isLoad: loading.effects["collect/getNews"],
}))
export default class Collect extends Component {
  config = {
    navigationBarTitleText: '收藏'
  };
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  componentDidMount = () => {
    this.props.dispatch(action("collect/save", {list:collect.data}));
  };
  goGithub = () => {
    Taro.redirectTo({url: '/'})
  }
  render () {
    const {list = [], isLoad} = this.props;
    const tabList = [{ title: '默认收藏' }, { title: '本地收藏' }];
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0} >
          <View className='collect'>
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
                  </View>
                  :
                  isLoad ? <View>加载中...</View> : <View>没有数据</View>
              }

            </View>
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style='padding: 100px 50px;text-align: center;'>
            <Text>暂时没有哦！</Text>
            <Text onClick={this.goGithub}>去这里</Text>
          </View>
        </AtTabsPane>
      </AtTabs>
    )
  }
}

