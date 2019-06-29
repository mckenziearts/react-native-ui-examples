import * as React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, StatusBar
} from 'react-native';
import Animated from 'react-native-reanimated';
import SvgUri from 'react-native-svg-uri';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';

import { displayCardNumber } from '../../helpers';
import colors from '../../colors';

const {
  interpolate, Extrapolate
} = Animated;

interface IHeaderProps {
  scrollY: Animated.Value<number>
  endHeightHeader: number
  startHeightHeader: number
  months: Array<string>
  dateOfToday: Date
  onPressBackIcon: any
  onPressCalendarIcon: any,
  card: any
}

const CardHeader: React.StatelessComponent<IHeaderProps> = ({
  scrollY, endHeightHeader, months, dateOfToday,
  onPressBackIcon, onPressCalendarIcon, card, startHeightHeader
}) => { 
  const cardArrayNumber = displayCardNumber(card.onlyShowLastNumber, card.cardNumber);
  const height = interpolate(scrollY, {
    inputRange: [0, startHeightHeader - endHeightHeader],
    outputRange: [startHeightHeader, endHeightHeader],
    extrapolate: Extrapolate.CLAMP
  });

  const topCardHeader = interpolate(height, {
    inputRange: [endHeightHeader, startHeightHeader],
    outputRange: [-55, 0],
    extrapolate: Extrapolate.CLAMP
  });
  
  const opacityCardHeader = interpolate(height, {
    inputRange: [endHeightHeader, startHeightHeader],
    outputRange: [0.35, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const topCardContainer = interpolate(height, {
    inputRange: [endHeightHeader, startHeightHeader],
    outputRange: [-40, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const opacityCardContainer = interpolate(height, {
    inputRange: [endHeightHeader, startHeightHeader],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const zIndex = interpolate(scrollY, {
    inputRange: [0, (startHeightHeader - endHeightHeader) / 2 , startHeightHeader - endHeightHeader],
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  return (
    <Animated.View style={[styles.headerContainer, { height, zIndex }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.blue, colors.blueNight]}
        style={styles.gradientContainer}
      >
        <Animated.View style={[styles.cardheader, { top: topCardHeader, opacity: opacityCardHeader }]}>
          <Text style={{ color: colors.green, fontSize: 11 }}>Available Balance</Text>
          <View style={{ flexDirection: 'row', marginVertical: 7, alignItems: 'center' }}>
            <SvgUri
              width="25"
              height="25"
              source={require('../../../assets/svg/dollar.svg')}
            />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25, paddingLeft: 5 }}>{card.amount}</Text>
          </View>
          <Text style={styles.headerDateStyle}>
            {`${months[dateOfToday.getMonth()]} ${dateOfToday.getDate()}, ${dateOfToday.getFullYear()}`}
          </Text>
        </Animated.View>
        <Animated.View style={[styles.cardContainer, { top: topCardContainer, opacity: opacityCardContainer }]}>
          <View style={[styles.slideElement]}>
            {
              cardArrayNumber.map((card, idx) => {
                return <Text style={styles.cardNumber} key={idx}>{card}</Text>
              })
            }
          </View>
          <View style={[styles.slideElement, { marginTop: 15 }]}>
            <View style={styles.textCardContainer}>
              <Text style={styles.textBottomCardTitle}>{'Expire'.toUpperCase()}</Text>
              <Icon
                name='md-arrow-dropright'
                type='ionicon'
                color='#fff'
                size={15}
                containerStyle={styles.iconContainer}
              />
              <Text style={{ color: '#fff', fontWeight: '500' }}>{card.expiredAt}</Text>
            </View>
            <View style={styles.textCardContainer}>
              <Text style={styles.textBottomCardTitle}>{'CVC Code'.toUpperCase()}</Text>
              <Icon
                name='md-arrow-dropright'
                type='ionicon'
                color={colors.white}
                size={15}
                containerStyle={styles.iconContainer}
              />
              <Text style={{ color: colors.white, fontWeight: '500' }}>{card.cvc}</Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
      <View style={[styles.depensesContainer]}>
        <View style={styles.depensesContainerStyle}>
          <View style={styles.depensesTitleContainer}>
            <Text style={styles.depensesTitle}>Income</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              type="ionicon"
              name="md-arrow-round-down"
              color={colors.brand.success}
              containerStyle={{ marginRight: 10 }}
              />
            <Text style={{ fontWeight: '500', color: colors.brand.success, fontSize: 13 }}>$ 9,302.00</Text>
          </View>
        </View>
        <View style={styles.diviser} />
        <View style={styles.depensesContainerStyle}>
          <View style={styles.depensesTitleContainer}>
            <Text style={styles.depensesTitle}>Expense</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon 
              type="ionicon"
              name="md-arrow-round-up"
              color={colors.brand.failure}
              containerStyle={{ marginRight: 10 }}
              />
            <Text style={{ fontWeight: '500', color: colors.brand.failure, fontSize: 13 }}>$ 2,790.00</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -90
  },
  gradientContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  cardheader: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    zIndex: 10
  },
  cardContainer: {
    position: 'relative',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 25,
    backgroundColor: '#253E54',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.22,
    borderRadius: 10,
    zIndex: 10
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
  iconContainer: {
    marginLeft: 5,
    marginRight: 10
  },
  depensesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -50,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.12
  },
  depensesContainerStyle: {
    alignItems: 'center'
  },
  depensesTitleContainer: {
    borderWidth: 1,
    borderColor: '#CFDDEA',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 20
  },
  depensesTitle: {
    color: '#34536D',
    fontSize: 12,
    fontWeight: '400'
  },
  diviser: {
    borderWidth: 1,
    height: 50,
    borderColor: '#f5f5f5'
  },
  movementsContainer: {
    paddingHorizontal: 20,
  },
  movementsTitleContainer: {
    marginTop: 30,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  movementTitle: {
    fontSize: 19,
    fontWeight: '500',
    color: colors.blue
  },
  movementContainerStyle: {
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: { width: 0.2, height: 0.1 },
    shadowRadius: 10,
    shadowOpacity: 0.12
  }
});

export default CardHeader;
