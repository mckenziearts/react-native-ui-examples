import React from 'react';
import { Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconBadge from 'react-native-icon-badge';
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import Drawer from '../components/Drawer';
import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';
import ProfileScreen from '../screens/Profile';
import ListsScreen from '../screens/Lists';
import MomentsScreen from '../screens/Moments';
import SearchScreen from '../screens/Search';
import NotificationsScreen from '../screens/Notifications';
import MessagesScreen from '../screens/Messages';
import SignetsScreen from '../screens/Signets'

const { width } = Dimensions.get('window');

let unreadMessagesCount = 0;
let unreadNotificationsCount = 5;

const AppScreen = createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
  Profile: ProfileScreen,
  Lists: ListsScreen,
  Signets: SignetsScreen,
  Moments: MomentsScreen
}, {
  initialRouteName: 'Home'
});

const TabScreen = createBottomTabNavigator({
  Home: {
    screen: AppScreen,
    navigationOptions: {
      tabBarLabel: () => null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={tintColor} size={30} />
      )
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarLabel: () => null,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-search" color={tintColor} size={30} />
      )
    }
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: ({ screenProps }) => ({
      tabBarLabel: () => null,
      tabBarIcon: ({ tintColor }) => (
        <IconBadge
          MainElement={<Icon name='ios-notifications-outline' size={30} color={tintColor} />}
          BadgeElement={<Text style={{ color: 'white' }}>{unreadNotificationsCount}</Text>}
          Hidden={unreadNotificationsCount === 0}
          IconBadgeStyle={{
            position:'absolute',
            top: -3,
            right: -10,
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3CABF7'
          }}
        />
      )
    })
  },
  Messages: {
    screen: MessagesScreen,
    navigationOptions: ({ screenProps }) => ({
      tabBarLabel: () => null,
      tabBarIcon: ({ tintColor }) => (
        <IconBadge
          MainElement={<Icon name="ios-chatboxes" color={tintColor} size={30} />}
          BadgeElement={<Text style={{ color: 'white' }}>{unreadMessagesCount}</Text>}
          Hidden={unreadMessagesCount === 0}
          IconBadgeStyle={{
            position:'absolute',
            top: -3,
            right: -10,
            minWidth: 20,
            height: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3CABF7'
          }}
        />
      )
    })
  }
}, {
  tabBarOptions: {
    activeTintColor: '#3CABF7',
    inactiveTintColor: '#97A2B1',
    style: {
      backgroundColor: '#172334',
      borderTopColor: '#97A2B1',
      borderTopWidth: 1
    },
  }
});

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: TabScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  }
},{
  drawerBackgroundColor: '#172334',
  contentComponent: Drawer,
  drawerWidth: width - 50
});

export default createAppContainer(MyDrawerNavigator);
