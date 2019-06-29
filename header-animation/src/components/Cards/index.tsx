import React from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity
} from 'react-native';
import Animated from 'react-native-reanimated';
import SvgUri from 'react-native-svg-uri';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Icon, ListItem } from 'react-native-elements'
import { onScroll } from 'react-native-redash';
import { NavigationScreenProp } from 'react-navigation';

import Header from '../Header';
import CreditCard from '../CreditCard';
import Status from '../Status';
import cardsList from '../../cardsList';
import lists from '../../lists';
import colors from '../../colors';

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

interface ICardsProps {
  navigation: NavigationScreenProp<any, any>
  endHeaderheight?: number
  scrollY?: Animated.Value<number>
}

interface ICardsState {
  dateOfToday: Date
  months: Array<string>
  activeSlide: number
}

export default class Cards extends React.Component<ICardsProps, ICardsState> {
  static navigationOptions = {
    header: null
  }

  constructor(props: ICardsProps) {
    super(props);

    this.state = {
      dateOfToday: new Date(),
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      activeSlide: 0
    };
  }

  static defaultProps = {
    scrollY: new Animated.Value(0),
    endHeaderheight: 90
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Card', { id: item.id })}
        activeOpacity={1}
      >
        <CreditCard
          cardTypeIcon={item.cardTypeIcon}
          amount={item.amount}
          cardNumber={item.cardNumber}
          expiredAt={item.expiredAt}
          cvc={item.cvc}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { dateOfToday, months, activeSlide } = this.state;
    const { scrollY, endHeaderheight } = this.props;


    return (
      <View style={styles.container}>
        <Header
          scrollY={scrollY}
          endHeaderheight={endHeaderheight}
          dateOfToday={dateOfToday}
          months={months}
        />
        <Animated.ScrollView
          onScroll={onScroll({ y: scrollY })}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
        >
          <View style={styles.cardsContainer}>
            <Carousel
              data={cardsList}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
            <Pagination
              dotsLength={cardsList.length}
              activeDotIndex={activeSlide}
              dotStyle={{
                width: 15,
                height: 15,
                borderRadius: 10,
                marginHorizontal: 8,
                backgroundColor: '#77B0CF'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          <View style={styles.depensesContainer}>
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
                <Text style={{ fontWeight: 'bold', color: colors.brand.success, fontSize: 15 }}>$ 9,302.00</Text>
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
                <Text style={{ fontWeight: 'bold', color: colors.brand.failure, fontSize: 15 }}>$ 2,790.00</Text>
              </View>
            </View>
          </View>
          <View style={styles.movementsContainer}>
            <View style={styles.movementsTitleContainer}>
              <Text style={styles.movementTitle}>Detail of movements</Text>
              <Icon type="ionicon" name="ios-calendar" color={colors.blue} />
            </View>
            <View>
              {
                lists.map((list, i) => (
                  <ListItem
                    key={i}
                    leftElement={
                      <SvgUri width="35" height="35" source={list.avatar_url } />
                    }
                    title={list.name}
                    titleStyle={{ color: '#0E0E0E', fontSize: 16, marginBottom: 3 }}
                    subtitle={list.subtitle}
                    subtitleStyle={{ color: colors.violet, fontSize: 13 }}
                    containerStyle={styles.movementContainerStyle}
                    rightElement={
                      <Status action={list.action} amount={list.amount} />
                    }
                  />
                ))
              }
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  cardsContainer: {
    marginTop: 10
  },
  depensesContainer: {
    position: 'relative',
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
    paddingVertical: 7,
    paddingHorizontal: 16,
    marginBottom: 7,
    borderRadius: 20
  },
  depensesTitle: {
    color: '#34536D',
    fontSize: 13,
    fontWeight: '500'
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
    fontWeight: '300',
    color: colors.blue
  },
  movementContainerStyle: {
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.32
  }
});
