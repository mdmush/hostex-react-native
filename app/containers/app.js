import React from 'react';
import { View, Text } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Houses from '../pages/House/Houses';
import HouseStatus from '../pages/House/Status';
import Messages from '../pages/Message/Messages';
import Mine from '../pages/Setting/Mine';
import Workbench from '../pages/Workbench/Workbench';

import HouseDetail from '../pages/House/Detail';
import MessageDetail from '../pages/Message/Detail';
import Login from '../pages/Login/Login';
import More from '../pages/Setting/More';
import EmptyHouses from '../pages/Workbench/EmptyHouses';
import GroupSelect from '../pages/House/GroupSelect';

import Splash from '../pages/Splash';

const TabContainer = createBottomTabNavigator(
  {
    MessageList: {
      screen: Messages,
      navigationOptions: () => ({
        tabBarLabel: '消息',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-chatboxes" size={25} color={tintColor} />
        )
      })
    },
    HouseStatus: {
      screen: HouseStatus,
      navigationOptions: () => ({
        tabBarLabel: '房态',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-list-box" size={25} color={tintColor} />
        )
      })
    },
    Workbench: {
      screen: Workbench,
      navigationOptions: () => ({
        tabBarLabel: '工作台',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-list-box" size={25} color={tintColor} />
        )
      })
    },
    HouseList: {
      screen: Houses,
      navigationOptions: () => ({
        tabBarLabel: '房源',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-home" size={25} color={tintColor} />
        )
      })
    },
    Mine: {
      screen: Mine,
      navigationOptions: () => ({
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-person-add" size={25} color={tintColor} />
        )
      })
    }
  },
  {
    initialRouteName: 'Workbench',
    tabBarOptions: {
      //当前选中的tab bar的文本颜色和图标颜色
      activeTintColor: '#4BC1D2',
      //当前未选中的tab bar的文本颜色和图标颜色
      inactiveTintColor: '#000',
      //是否显示tab bar的图标，默认是false
      showIcon: true,
      //showLabel - 是否显示tab bar的文本，默认是true
      showLabel: true,
      //是否将文本转换为大小，默认是true
      upperCaseLabel: false,
      //material design中的波纹颜色(仅支持Android >= 5.0)
      pressColor: '#788493',
      //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
      pressOpacity: 0.8,
      //tab bar的样式
      style: {
        backgroundColor: '#fff',
        paddingBottom: 1,
        borderTopWidth: 0.2,
        paddingTop: 1,
        borderTopColor: '#ccc'
      },
      //tab bar的文本样式
      labelStyle: {
        fontSize: 11,
        margin: 1
      },
      //tab 页指示符的样式 (tab页下面的一条线).
      indicatorStyle: { height: 0 }
    },
    //tab bar的位置, 可选值： 'top' or 'bottom'
    tabBarPosition: 'bottom',
    //是否允许滑动切换tab页
    swipeEnabled: true,
    //是否在切换tab页时使用动画
    animationEnabled: false,
    //是否懒加载
    lazy: true,
    //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
    backBehavior: 'none'
  }
);

const App = createStackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: () => ({
        header: null
      })
    },
    Home: {
      // screen: Home,
      screen: TabContainer,
      navigationOptions: ({ navigation }) => ({
        header: null,
        gesturesEnabled: false
      })
    },
    HouseDetail: {
      screen: HouseDetail,
      navigationOptions: () => ({
        header: null
      })
    },
    GroupSelect: { screen: GroupSelect },
    MessageDetail: { screen: MessageDetail },
    Login: {
      screen: Login,
      navigationOptions: () => ({
        header: null
      })
    },
    More: { screen: More },
    EmptyHouses: { screen: EmptyHouses }
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        // backgroundColor: '#3e9ce9'
      },
      headerTitleStyle: {
        color: '#000',
        fontSize: 16
      }
      // headerTintColor: '#fff'
    }
  }
);

export default App;
