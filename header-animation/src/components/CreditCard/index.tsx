import React from 'react';
import {
  StyleSheet, Text, View, ImageBackground, ImageURISource
} from 'react-native';
import { Icon } from 'react-native-elements'
import SvgUri from 'react-native-svg-uri';

import { displayCardNumber } from '../../helpers';

const horizontalMargin = 20;
const slideWidth = 280;

const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

interface ICreditCardProps {
  amount: string
  cardNumber: string
  expiredAt: string
  cvc: string
  cardTypeIcon: ImageURISource
  backgroundImage?: ImageURISource
  currencyIcon?: ImageURISource
  onlyShowLastNumber?: boolean
}

const CreditCard: React.StatelessComponent<ICreditCardProps> = ({
  backgroundImage, cardTypeIcon, currencyIcon, amount,
  cardNumber, onlyShowLastNumber, expiredAt, cvc
}) => {
  const cardArrayNumber = displayCardNumber(onlyShowLastNumber, cardNumber);

  return (
    <View style={styles.slide}>
      <ImageBackground
        source={backgroundImage}
        style={{ width: '100%', height: '100%' }}
        borderRadius={10}
      >
        <View  style={styles.slideElement}>
          <View style={{ padding: 25 }}>
            <SvgUri
              width="70"
              height="30"
              source={cardTypeIcon}
            />
            <SvgUri
              width="35"
              height="40"
              source={require('../../../assets/svg/sim-card.svg')}
            />
          </View>
          <View style={{ padding: 25, marginTop: 15 }}>
            <Text style={{ color: '#96C279', fontSize: 12, textAlign: 'center' }}>Available Balance</Text>
            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
              <SvgUri
                width="20"
                height="20"
                source={currencyIcon}
              />
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, paddingLeft: 5 }}>{amount}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.slideElement, { paddingHorizontal: 25, marginTop: 1 }]}>
          {
            cardArrayNumber.map((card, idx) => {
              return <Text style={styles.cardNumber} key={idx}>{card}</Text>
            })
          }
        </View>
        <View style={[styles.slideElement, { paddingHorizontal: 25, marginTop: 15 }]}>
          <View style={styles.textCardContainer}>
            <Text style={styles.textBottomCardTitle}>{'Expire'.toUpperCase()}</Text>
            <Icon
              name='md-arrow-dropright'
              type='ionicon'
              color='#fff'
              size={15}
              containerStyle={styles.iconContainer}
            />
            <Text style={{ color: '#fff', fontWeight: '500' }}>{expiredAt}</Text>
          </View>
          <View style={styles.textCardContainer}>
            <Text style={styles.textBottomCardTitle}>{'CVC Code'.toUpperCase()}</Text>
            <Icon
              name='md-arrow-dropright'
              type='ionicon'
              color='#fff'
              size={15}
              containerStyle={styles.iconContainer}
            />
            <Text style={{ color: '#fff', fontWeight: '500' }}>{cvc}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

CreditCard.defaultProps = {
  backgroundImage: require('../../../assets/card-bg.png'),
  currencyIcon: require('../../../assets/svg/dollar.svg'),
  onlyShowLastNumber: false
}

const styles = StyleSheet.create({
  slide: {
    width: itemWidth,
    height: itemHeight
  },
  slideElement: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardNumber: {
    color: '#AEBECD',
    fontSize: 18,
    fontWeight: '500'
  },
  textCardContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textBottomCardTitle: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 8
  },
  iconContainer: {
    marginLeft: 5,
    marginRight: 10
  }
});

export default CreditCard;
