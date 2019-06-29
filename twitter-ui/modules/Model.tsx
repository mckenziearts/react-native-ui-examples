import { NavigationScreenProp, DrawerItemsProps } from 'react-navigation';
import { Animated } from 'react-native';

export interface NavigationProps {
  navigation: NavigationScreenProp<any, any>
}

export interface IHomeStates {

}

export interface IMenuItemsProps {
  iconName: string
  title: string
  onPress: () => void
}

export interface INotificationsProps extends DrawerItemsProps {
  unreadMessagesCount: number
}

export interface INotificationsStates {
  
}

export interface IMessagesProps extends DrawerItemsProps {

}

export interface IMessagesStates {
  
}

export interface ISearchProps extends DrawerItemsProps {

}

export interface ISearchStates {
  
}
export interface IProfileProps extends NavigationProps {

}

export interface IProfileStates {
  scrollY: Animated.Value
}
