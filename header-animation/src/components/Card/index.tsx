import React from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import { Icon, ListItem } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';

import CardHeader from '../CardHeader/index';
import Status from '../Status';

import cardsList from '../../cardsList';
import lists from '../../lists';
import colors from '../../colors';

const MAX_HEADER_HEIGHT = 350;
const MIN_HEADER_HEIGHT = 135;
const { interpolate, Extrapolate } = Animated;

interface ICardProps {
  endHeightHeader?: number
  startHeightHeader?: number
  navigation: NavigationScreenProp<any, any>
}

interface ICardStates {
  card: any
  dateOfToday: Date
  months: Array<string>
  scrollY: any
}

export default class Card extends React.Component<ICardProps, ICardStates> {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      borderColor: 'transparent'
    },
    // header: null
    headerLeft: (
      <View style={{ paddingLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Cards')}>
          <SvgUri
            width="20"
            height="20"
            source={require('../../../assets/svg/menu-bar.svg')}
            fill={colors.white}
          />
        </TouchableOpacity>
      </View>
    ),
    headerRight: (
      <View style={{ paddingRight: 20 }}>
        <TouchableOpacity onPress={() => alert('Calendar Picker Show')}>
          <SvgUri
            width="20"
            height="20"
            source={require('../../../assets/svg/calendar.svg')}
            fill={colors.white}
          />
        </TouchableOpacity>
      </View>
    )
  })

  constructor(props: ICardProps) {
    super(props);

    this.state = {
      card: {},
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
      scrollY: new Animated.Value(0)
    };
  }

  static defaultProps = {
    endHeightHeader: MIN_HEADER_HEIGHT,
    startHeightHeader: MAX_HEADER_HEIGHT
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    const result = cardsList.filter(card => card.id === id);
    
    this.setState({ card: result[0] });
  }

  componentWillUnmount() {
    this.setState({ scrollY: new Animated.Value(0) })
  }

  render() {
    const { dateOfToday, months, card, scrollY } = this.state;
    const { endHeightHeader, navigation, startHeightHeader } = this.props;

    return (
      <View style={styles.container}>
        <CardHeader
          scrollY={scrollY}
          dateOfToday={dateOfToday}
          months={months}
          onPressBackIcon={() => navigation.navigate('Cards')}
          onPressCalendarIcon={() => alert('Calendar Picker Show')}
          card={card}
          endHeightHeader={endHeightHeader}
          startHeightHeader={startHeightHeader}
        />
        <Animated.ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={onScroll({ y: scrollY })}
        >
          <Animated.View style={{ marginTop: startHeightHeader - 50 }}>
            <View style={[styles.movementsContainer]}>
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
                        <SvgUri width="30" height="30" source={list.avatar_url } />
                      }
                      title={list.name}
                      titleStyle={{ color: '#0E0E0E', fontSize: 15, marginBottom: 3 }}
                      subtitle={list.subtitle}
                      subtitleStyle={{ color: colors.violet, fontSize: 12 }}
                      containerStyle={styles.movementContainerStyle}
                      rightElement={
                        <Status action={list.action} amount={list.amount} />
                      }
                    />
                  ))
                }
              </View>
            </View>
          </Animated.View>
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
