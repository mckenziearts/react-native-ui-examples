import * as React from "react";
import {
  StyleSheet, View, Text, StatusBar
} from "react-native";
import Animated from "react-native-reanimated";
import SvgUri from 'react-native-svg-uri';

import colors from '../../colors';

const START_HEADER = 120;

const {
  interpolate, Extrapolate
} = Animated;

interface IHeaderProps {
  scrollY: Animated.Value<number>
  endHeaderheight: number
  months: Array<string>
  dateOfToday: Date
}

const Header: React.StatelessComponent<IHeaderProps> = ({
  scrollY, endHeaderheight, months, dateOfToday
}) => {
  const height = interpolate(scrollY, {
    inputRange: [0, 45],
    outputRange: [START_HEADER, endHeaderheight],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = interpolate(height, {
    inputRange: [endHeaderheight, START_HEADER],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const top = interpolate(height, {
    inputRange: [endHeaderheight, START_HEADER],
    outputRange: [-25, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  
  const borderBottomWidth = interpolate(height, {
    inputRange: [endHeaderheight, START_HEADER],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  
  return (
    <Animated.View 
      style={
        [styles.headerContainer, {
          height, borderBottomWidth
        }]
      }
    >
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerTopStyle}>
        <Text style={styles.headerTitle}>All my accounts</Text>
        <SvgUri
          width="20"
          height="20"
          source={require('../../../assets/svg/menu-bar.svg')}
        />
      </View>
      <Animated.View style={{ position: 'relative', top, opacity }}>
        <Text style={styles.headerDateStyle}>
          {`${months[dateOfToday.getMonth()]} ${dateOfToday.getDate()}, ${dateOfToday.getFullYear()}`}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomColor: '#AEBECD'
  },
  headerTopStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  headerTitle: {
    color: '#34536D',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerDateStyle: {
    color: '#8495D0',
    fontSize: 13
  },
  slideElement: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardNumber: {
    color: '#AEBECD',
    fontSize: 17,
    fontWeight: '500'
  },
  textCardContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textBottomCardTitle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 8
  },
});

export default Header;
